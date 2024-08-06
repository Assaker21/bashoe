import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/page-header/page-header.component";
import "./product.page.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import productsApi from "../../../api/products.api";
import ProductImage from "../../../components/product-image/product-image.component";
import Input from "../../../components/input/input.component";
import { Dropdown } from "primereact/dropdown";
import DropDown from "../../../components/dropdown/dropdown.component";
import Datatable from "../../../components/datatable/datatable.component";
import ImageDialog from "../dialogs/image.dialog";
import imagesApi from "../../../api/images.api";
import categoriesApi from "../../../api/categories.api";
import useDebounce from "../../../hooks/useDebounce";
import Tabber from "../../../components/tabber/tabber.component";
import { ProgressSpinner } from "primereact/progressspinner";
import variantsApi from "../../../api/variants.api";
import CustomVariantDialog from "../dialogs/customVariant.dialog";

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const debounce = useDebounce();

  const [product, setProduct] = useState();
  const [updatedProduct, setUpdatedProduct] = useState({});

  const [categories, setCategories] = useState();

  const [loading, setLoading] = useState({});
  const [visible, setVisible] = useState({
    image: false,
  });
  const [mode, setMode] = useState({
    image: "edit",
  });
  const [selected, setSelected] = useState({ image: null });

  const refresh = async () => {
    const { ok, data } = await productsApi.findMany({
      itemSku: params.sku,
    });

    if (ok) {
      setProduct(data);
      navigate("/products/" + data.sku);
      setUpdatedProduct({});
    }
  };

  const initialFetch = async () => {
    setLoading({ ...loading, fetch: true });

    const promises = [findManyCategories()];
    if (params.sku != "new") promises.push(refresh());

    await Promise.all(promises);

    console.log("Categories: ", categories);

    setLoading({ ...loading, fetch: false });
  };

  const findManyCategories = async () => {
    const { ok, data } = await categoriesApi.findMany({ recursive: true });
    if (ok) {
      setCategories(data);
    }
  };

  const findSingleProduct = async () => {
    setLoading({ ...loading, fetch: true });
    await refresh();

    setLoading({ ...loading, fetch: false });
  };

  const updateSingleProduct = async () => {
    setLoading({ ...loading, update: true });
    const { ok, data } = await productsApi.updateSingle(
      { sku: params.sku },
      updatedProduct
    );

    if (ok) {
      setUpdatedProduct({});
    }

    await findSingleProduct();
    setLoading((curr) => ({ ...curr, update: false }));
  };

  const updateSingleProductDebounced = debounce(updateSingleProduct, 1000);

  useEffect(() => {
    if (
      updatedProduct &&
      JSON.stringify(updatedProduct) != "{}" &&
      updatedProduct.imagesType
    ) {
      updateSingleProduct();
    }
  }, [updatedProduct]);

  const imageRows = useMemo(() => {
    return (
      product?.images?.map((image) => {
        return {
          id: image.id,
          image: image.url,
          url: image.url,
        };
      }) || []
    );
  }, [product]);

  const createSingleProduct = async () => {
    setLoading({ ...loading, fetch: true });
    const { ok, data } = await productsApi.createSingle(product);
    if (ok) {
      navigate(`/products/${product.sku}`);
      window.location.reload();
    }
    setLoading({ ...loading, fetch: false });
  };

  useEffect(() => {
    if (params.sku == "new") {
      setProduct({
        name: "",
        description: "",
        sku: "",
        price: 0,
        imagesType: "",
        images: [],
        categories: [],
        itemVariants: [],
      });
    }
    initialFetch();
  }, []);

  const categoriesDropdownOptions = useMemo(() => {
    return (
      categories?.map((category) => {
        return formatCategoryForDropdown(category);
      }) || []
    );
  }, [categories]);

  function formatCategoryForDropdown(category) {
    return {
      key: category.id,
      label: category.description,
      children: category?.subcategories.map((subcategory) => {
        return formatCategoryForDropdown(subcategory);
      }),
    };
  }

  const selectedCategories = useMemo(() => {
    const object = {};
    product?.categories?.map((category) => {
      object[category.id] = true;
    });
    return object;
  }, [product]);

  function findParentKeys(key, nodeList, parentKeys = []) {
    for (let node of nodeList) {
      if (key == node.key) {
        return parentKeys;
      } else {
        const keysFound = findParentKeys(key, node?.children || [], [
          ...parentKeys,
          node.key,
        ]);

        if (keysFound) return keysFound;
      }
    }

    return null;
  }

  function findCategoryById(id, categories) {
    if (!categories) return null;
    for (let category of categories) {
      if (category.id == id) {
        return category;
      }
      if (category.subcategories?.length > 0) {
        const found = findCategoryById(id, category.subcategories);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  const updateImages = async (newImages) => {
    const updated = [];

    newImages.map((image, index) => {
      if (image.sequenceNumber != index) {
        image.sequenceNumber = index;
        updated.push({ ...image });
      }
      return image;
    });

    if (updated.length > 0) {
      setLoading({ ...loading, update: true });
      const promises = updated.map((value) =>
        imagesApi.updateSingle(
          { id: value.id },
          { sequenceNumber: value.sequenceNumber }
        )
      );

      await Promise.all(promises);

      setLoading({ ...loading, update: false });

      await findSingleProduct();
    }
  };

  return (
    <section>
      <PageHeader
        title={
          params?.sku == "new"
            ? "New product"
            : product?.name
            ? product.name
            : "..."
        }
        hasBack
        onClickBack={() => {
          let newPath = location.pathname.split("/");

          newPath.pop();
          newPath = newPath
            .reduce((acc, curr) => acc + "/" + curr, "")
            .replace("//", "/");
          navigate(newPath);
        }}
        loading={loading.fetch}
      />
      {product && (
        <div className="product-container">
          <Tabber
            lockTabs={params?.sku == "new" ? [1, 2] : []}
            tabs={[
              {
                header: "Details",
                content: (
                  <section className="section">
                    <header>
                      <h2>Details</h2>
                      <button
                        className={`primary ${
                          JSON.stringify(updatedProduct) == "{}" ||
                          loading.update
                            ? "disabled"
                            : ""
                        }`}
                        onClick={() => {
                          if (params?.sku == "new") {
                            createSingleProduct();
                          } else {
                            updateSingleProduct();
                          }
                        }}
                      >
                        {loading.update ? (
                          <ProgressSpinner
                            style={{
                              height: "12px",
                              width: "30px",
                              padding: 0,
                              opacity: 1,
                            }}
                          />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </header>

                    <main>
                      <Input
                        value={product.sku}
                        label={"Sku"}
                        onChange={(e) => {
                          setProduct((curr) => ({
                            ...curr,
                            sku: e.target.value,
                          }));
                          setUpdatedProduct((curr) => ({
                            ...curr,
                            sku: e.target.value,
                          }));
                        }}
                      />
                      <Input
                        value={product.name}
                        label={"Name"}
                        onChange={(e) => {
                          setProduct((curr) => ({
                            ...curr,
                            name: e.target.value,
                          }));
                          setUpdatedProduct((curr) => ({
                            ...curr,
                            name: e.target.value,
                          }));
                        }}
                      />
                      <DropDown
                        cascade={true}
                        values={categoriesDropdownOptions}
                        onChange={(e) => {
                          const selectedKeys = e.value;

                          const allKeys = Object.keys(selectedKeys);
                          let result = [];

                          allKeys.forEach((key) => {
                            const parentKeys =
                              findParentKeys(key, categoriesDropdownOptions) ||
                              [];

                            parentKeys.forEach((parentKey) => {
                              result.push(Number(parentKey));
                            });

                            result.push(Number(key));
                          });

                          result = [...new Set(result)];

                          const allCategories = result.map((key) =>
                            findCategoryById(key, categories)
                          );

                          setProduct((curr) => ({
                            ...curr,
                            categories: allCategories,
                          }));

                          const olds = Object.keys(selectedCategories).map(
                            (key) => Number(key)
                          );

                          const news = result;

                          const removed = olds.filter(
                            (item) => !news.includes(item)
                          );
                          const added = news.filter(
                            (item) => !olds.includes(item)
                          );

                          setUpdatedProduct((curr) => ({
                            ...curr,
                            categories: {
                              connect: [
                                ...(curr?.categories?.connect || []),
                                ...added.map((id) => ({ id: id })),
                              ],
                              disconnect: [
                                ...(curr?.categories?.disconnect || []),
                                ...removed.map((id) => ({ id: id })),
                              ],
                            },
                          }));

                          console.log("SELECTED: ", allCategories);
                        }}
                        label={"Categories"}
                        value={selectedCategories}
                      />
                      <Input
                        type="number"
                        value={product.price}
                        label={"Price"}
                        onChange={(e) => {
                          setProduct((curr) => ({
                            ...curr,
                            price: e.target.value,
                          }));
                          setUpdatedProduct((curr) => ({
                            ...curr,
                            price: e.target.value,
                          }));
                        }}
                      />
                      <Input
                        label={"Description"}
                        textarea
                        rows={20}
                        value={product.description}
                        onChange={(e) => {
                          setProduct((curr) => ({
                            ...curr,
                            description: e.target.value,
                          }));
                          setUpdatedProduct((curr) => ({
                            ...curr,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </main>
                  </section>
                ),
              },
              {
                header: "Images",
                content: (
                  <section className="section">
                    <ImageDialog
                      product={product}
                      visible={visible.image}
                      setVisible={(newValue) => {
                        setVisible({ ...visible, image: newValue });
                      }}
                      loading={loading.fetch}
                      value={selected.image}
                      image={selected.image}
                      setProduct={setProduct}
                      onClose={() => {}}
                      refresh={refresh}
                      mode={mode.image}
                    />

                    <header>
                      <h2>Images</h2>
                      <Dropdown
                        options={["Slider", "One-by-one"]}
                        placeholder="Image type"
                        value={product.imagesType}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            imagesType: e.target.value,
                          });

                          setUpdatedProduct((curr) => ({
                            ...curr,
                            imagesType: e.target.value,
                          }));
                        }}
                      />
                    </header>

                    <main>
                      <ProductImage
                        images={product.images}
                        type={product.imagesType}
                      />
                      {product.imagesType == "Slider" && false && (
                        <Input
                          label="Image url"
                          style={{ width: "100%" }}
                          value={product?.images[0].url}
                          onChange={(e) => {
                            setProduct((curr) => {
                              const newValue = { ...curr };
                              newValue.images[0].url = e.target.value;
                              return newValue;
                            });
                          }}
                        />
                      )}

                      {
                        <Datatable
                          buttons={{
                            create: {
                              onClick: () => {
                                setVisible({ ...visible, image: true });
                                setMode({ ...mode, image: "create" });
                              },
                            },
                            remove: {
                              onClick: async (toBeDeleted) => {
                                setLoading({ ...loading, remove: true });

                                const promises = toBeDeleted.map((element) =>
                                  imagesApi.deleteSingle({ id: element.id })
                                );

                                await Promise.all(promises);

                                setLoading({ ...loading, remove: false });

                                await refresh();
                              },
                            },
                          }}
                          loading={
                            loading.fetch || loading.update || loading.remove
                          }
                          name="Image"
                          data={imageRows}
                          setData={updateImages}
                          reorderableRows={true}
                          selectable={true}
                          onRowClick={(e) => {
                            const row = e.data;
                            setSelected({ ...selected, image: row });
                            setVisible({ ...visible, image: true });
                            setMode({ ...mode, image: "edit" });
                          }}
                          columns={[
                            {
                              field: "id",
                              header: "Id",
                              sortable: true,
                            },
                            {
                              field: "image",
                              header: "Image",
                              body: (row) => (
                                <img
                                  style={{
                                    height: "100px",
                                    borderRadius: "0.5rem",
                                  }}
                                  alt=""
                                  src={row.image}
                                />
                              ),
                            },

                            {
                              field: "url",
                              header: "Image",
                            },
                          ]}
                        />
                      }
                    </main>
                  </section>
                ),
              },
              {
                header: "Variants",
                content: (
                  <Variants
                    props={{
                      loading,
                      setLoading,
                      product,
                      setProduct,
                      refresh,
                      setVisible,
                      setSelected,
                      setMode,
                      visible,
                      selected,
                      mode,
                      findSingleProduct,
                    }}
                  />
                ),
              },
            ]}
          />
        </div>
      )}
    </section>
  );
}

function Variants({ props }) {
  const {
    loading,
    setLoading,
    product,
    setProduct,
    refresh,
    setVisible,
    setSelected,
    setMode,
    visible,
    selected,
    mode,
    findSingleProduct,
  } = props;

  const variantRows = useMemo(() => {
    return (
      product?.itemCustomVariants?.map((variant) => {
        return {
          id: variant.id,
          description: variant.description,
          url: variant.url,
          enabled: variant.enabled,
          variantGroup: {
            id: variant.itemVariantGroup.id,
            description: variant.itemVariantGroup.description,
          },
        };
      }) || []
    );
  }, [product]);

  const updateVariants = async (newVariants) => {
    const updated = [];

    newVariants.map((variant, index) => {
      if (variant.sequenceNumber != index) {
        variant.sequenceNumber = index;
        updated.push({ ...variant });
      }
      return variant;
    });

    if (updated.length > 0) {
      setLoading({ ...loading, update: true });
      const promises = updated.map((value) =>
        variantsApi.updateSingleCustom(
          { id: value.id },
          { sequenceNumber: value.sequenceNumber }
        )
      );

      await Promise.all(promises);

      setLoading({ ...loading, update: false });

      await findSingleProduct();
    }
  };

  return (
    <section className="section">
      <CustomVariantDialog
        product={product}
        visible={visible.variant}
        setVisible={(newValue) => {
          setVisible({ ...visible, variant: newValue });
        }}
        loading={loading.fetch}
        value={selected.variant}
        variant={selected.variant}
        setProduct={setProduct}
        onClose={() => {}}
        refresh={refresh}
        mode={mode.variant}
      />
      <header>
        <h2>Variants</h2>
      </header>

      <main>
        <Datatable
          buttons={{
            enable: {
              onClick: async (toBeEnabled) => {
                setLoading({ ...loading, update: true });

                const promises = toBeEnabled.map((element) =>
                  variantsApi.updateSingleCustom(
                    { id: element.id },
                    { enabled: true }
                  )
                );

                await Promise.all(promises);

                setLoading({ ...loading, update: false });

                await refresh();
              },
            },
            disable: {
              onClick: async (toBeDisabled) => {
                setLoading({ ...loading, update: true });

                const promises = toBeDisabled.map((element) =>
                  variantsApi.updateSingleCustom(
                    { id: element.id },
                    { enabled: false }
                  )
                );

                await Promise.all(promises);

                setLoading({ ...loading, update: false });

                await refresh();
              },
            },
          }}
          loading={loading.fetch || loading.update || loading.remove}
          data={variantRows}
          name="Variant"
          setData={updateVariants}
          rowGroupMode="subheader"
          groupRowsBy="variantGroup.description"
          rowGroupHeaderTemplate={(data) => (
            <span>{data.variantGroup.description}</span>
          )}
          reorderableRows={true}
          selectable={true}
          onRowClick={(e) => {
            const row = e.data;
            setSelected({ ...selected, variant: row });
            setVisible({ ...visible, variant: true });
            setMode({ ...mode, variant: "edit" });
          }}
          columns={[
            {
              field: "id",
              header: "Id",
              sortable: true,
              style: { width: "20px" },
            },
            {
              field: "description",
              header: "Description",
            },
            {
              field: "image",
              header: "Image",
              body: (row) => {
                if (row.url && row.url != "") {
                  return (
                    <img
                      style={{
                        height: "100px",
                        borderRadius: "0.5rem",
                      }}
                      alt=""
                      src={row.url}
                    />
                  );
                } else return "";
              },
            },
            {
              field: "enabled",
              header: "Status",
              body: (row) => (
                <div className={`chip ${row.enabled ? "primary" : "warning"}`}>
                  {row.enabled ? "Enabled" : "Disabled"}
                </div>
              ),
            },
          ]}
        />
      </main>
    </section>
  );
}
