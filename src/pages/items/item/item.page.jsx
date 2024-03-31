import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs.component";
import { useGeneralContext } from "../../../contexts/context";
import { useEffect, useState } from "react";
import PreloadImages from "../../../basic-components/preload-images/preload-images.component";
import GroupedSelect from "../../../basic-components/grouped-select/GroupedSelect";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import itemsServices from "../../../services/itemsServices";

import "./item.page.scss";

export default function Item() {
  const params = useParams();
  const categorySku = params.categorySku;
  const itemSku = params.itemSku;
  const { getCategoryBySku, categories } = useGeneralContext();
  const category = getCategoryBySku(categorySku);

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(1);
  const [allPossibleImages, setAllPossibleImages] = useState([]);
  const [image, setImage] = useState(
    "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60"
  );
  const [clickingImage, setClickingImage] = useState(false);
  const [itemVariantGroups, setItemVariantGroups] = useState(null);

  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState({
    name: "",
    sku: "",
    description: "",
    images: [
      {
        url: "",
      },
    ],
    price: 0,
    itemVariantGroups: [
      {
        id: 1,
        description: "Size",
        itemVariants: [],
      },
      {
        id: 2,
        description: "Color",
        itemVariants: [],
      },
    ],
    categories: [{ sku: "", description: "" }],
  });

  async function handleCreateItem() {
    item.itemVariants = [];
    item.itemVariantGroups.map(({ itemVariants }) => {
      item.itemVariants = [...item.itemVariants, ...itemVariants];
    });

    setLoading("Loading...");
    const [ok, data] = await itemsServices.createItem(item);
    if (ok) {
      console.log("data: ", data);
      navigate("/" + item.categories[0].sku + "/" + item.sku);
    } else {
      console.log("error: ", data);
    }

    setLoading(false);
  }

  async function handleUpdateItem() {
    item.itemVariants = [];
    item.itemVariantGroups.map(({ itemVariants }) => {
      item.itemVariants = [...item.itemVariants, ...itemVariants];
    });

    setLoading("Updating...");
    const [ok, data] = await itemsServices.updateItem(item);
    if (ok) {
      console.log("data: ", data);
      setItem(data);
    } else {
      console.log("error: ", data);
    }
    setLoading(false);
  }

  async function handleDelete() {
    console.log("DELETING");
    setLoading("Deleting...");
    const [ok, data] = await itemsServices.removeItem({ id: item.id });
    if (ok) {
      navigate("/");
    }
    setLoading(false);
  }

  async function getItemVariantGroups() {
    setLoading("Loading...");
    const [ok, data] = await itemsServices.getItemVariants();
    if (ok) {
      setItemVariantGroups(data);
    } else {
      console.log("error: ", data);
    }

    setLoading(false);
  }

  async function getItem() {
    if (!itemSku) return;

    setLoading("Loading...");
    const [ok, data] = await itemsServices.getItems({
      itemSku,
    });

    if (ok) {
      console.log("Data: ", data);
      setItem(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    getItemVariantGroups();
  }, []);

  useEffect(() => {
    if (categorySku) {
      getItem();
    } else {
      setItem({
        name: "",
        sku: "",
        description: "",
        images: [
          {
            url: "",
          },
        ],
        price: 0,
        itemVariantGroups: [
          {
            id: 1,
            description: "Size",
            itemVariants: [],
          },
          {
            id: 2,
            description: "Color",
            itemVariants: [],
          },
        ],
        categories: [{ sku: "", description: "" }],
      });
    }
  }, [categorySku]);

  useEffect(() => {
    const _allPossibleImages = [];
    if (item?.imagesType === "One-by-one") {
      setSelectedImage(0);
      for (var i = 1; i < item?.images?.length; i++) {
        _allPossibleImages.push(item?.images[i].url);
      }
    } else {
      setSelectedImage(1);
      for (var i = 1; i < 37; i++) {
        _allPossibleImages.push(
          item?.images[0].url.replace("<number>", String(i).padStart(2, "0"))
        );
      }
    }

    setAllPossibleImages(_allPossibleImages);

    setImage(
      item.images[0]?.url.replace(
        "<number>",
        String(selectedImage).padStart(2, "0")
      )
    );
  }, [item.images]);

  useEffect(() => {
    if (item?.imagesType === "One-by-one") {
      setImage(item?.images[selectedImage]?.url);
    } else {
      setImage(
        item?.images[0].url.replace(
          "<number>",
          String(selectedImage).padStart(2, "0")
        )
      );
    }
  }, [item, selectedImage]);

  return (
    <section className="single-item">
      <Breadcrumbs
        items={[
          {
            name: "Home",
            to: "/",
          },
          {
            name: category?.description,
            to: `/${category?.sku}`,
          },
          {
            name: item.name,
            to: `/${category?.sku}/${itemSku}`,
          },
        ]}
      />

      {!loading && itemVariantGroups && (
        <>
          <PreloadImages images={allPossibleImages} />
          <button onClick={handleDelete} style={{ width: "100px" }}>
            DELETE
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (item.id) handleUpdateItem();
              else handleCreateItem();
            }}
          >
            <Box display="flex" flexDirection={"column"} gap={1} sx={{ mb: 3 }}>
              <TextField
                label="Name"
                size="small"
                fullWidth
                required
                variant="filled"
                value={item.name}
                onChange={(e) => {
                  setItem({ ...item, name: e.target.value });
                }}
              />
              <TextField
                label="Sku"
                size="small"
                fullWidth
                required
                variant="filled"
                value={item.sku}
                onChange={(e) => {
                  setItem({ ...item, sku: e.target.value });
                }}
              />
              <TextField
                label="Description"
                size="small"
                fullWidth
                multiline
                rows={4}
                required
                variant="filled"
                value={item.description}
                onChange={(e) => {
                  setItem({ ...item, description: e.target.value });
                }}
              />
              <TextField
                label="Price"
                size="small"
                type="number"
                fullWidth
                required
                variant="filled"
                value={item.price}
                onChange={(e) => {
                  setItem({ ...item, price: e.target.value });
                }}
              />
              <TextField
                label="Images"
                size="small"
                fullWidth
                multiline
                value={item.images.map((image) => image.url).join("\n")}
                rows={4}
                required
                variant="filled"
                onChange={(e) => {
                  const value = e.target.value;
                  const newImages = [];
                  value.split("\n").map((url) => {
                    if (url.trim() === "") return;
                    newImages.push({ url: url });
                  });
                  setItem({ ...item, images: [...newImages] });
                }}
              />
              <TextField
                value={item?.imagesType || ""}
                onChange={(e, value) => {
                  setItem({
                    ...item,
                    imagesType: e.target.value,
                  });
                }}
                select
                required
                label="Images type"
              >
                <MenuItem value={"One-by-one"}>One-by-one</MenuItem>
                <MenuItem value={"Slider"}>Slider</MenuItem>
              </TextField>
              <TextField
                value={item.categories[0].sku}
                onChange={(e, value) => {
                  setItem({
                    ...item,
                    categories: [getCategoryBySku(e.target.value)],
                  });
                }}
                select
                required
                label="Category"
              >
                {categories.map((category) => {
                  return (
                    <MenuItem
                      key={"Category: " + category.sku}
                      value={category.sku}
                    >
                      {category.description}
                    </MenuItem>
                  );
                })}
              </TextField>
              <GroupedSelect
                allValues={itemVariantGroups}
                values={item.itemVariantGroups}
                setValues={(newValue) => {
                  setItem({ ...item, itemVariantGroups: newValue });
                }}
                required
              />
            </Box>
            <div className="single-item-container">
              <div className="single-item-image-container">
                <>
                  <img
                    draggable={false}
                    className={
                      "single-item-image" +
                      (item?.imagesType === "One-by-one" ? "" : " drag")
                    }
                    src={image}
                    onMouseMove={(e) => {
                      e.preventDefault();
                      if (item?.imagesType === "One-by-one") return;
                      if (!clickingImage) return;

                      const rect = e.target.getBoundingClientRect();
                      const x = Math.min(
                        Math.max(1 - (e.clientX - rect.left) / rect.width, 0),
                        1
                      );

                      setSelectedImage(Math.floor(x * 36 + 1));
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (item?.imagesType === "One-by-one") return;
                      setClickingImage(true);
                    }}
                    onMouseUp={(e) => {
                      e.preventDefault();
                      if (item?.imagesType === "One-by-one") return;
                      setClickingImage(false);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      if (item?.imagesType === "One-by-one") return;
                      if (!clickingImage) return;

                      const rect = e.target.getBoundingClientRect();
                      const x = Math.min(
                        Math.max(
                          1 - (e.touches[0].clientX - rect.left) / rect.width,
                          0
                        ),
                        1
                      );
                      console.log(x);

                      setSelectedImage(Math.floor(x * 36 + 1));
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      if (item?.imagesType === "One-by-one") return;
                      setClickingImage(true);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      if (item?.imagesType === "One-by-one") return;
                      setClickingImage(false);
                    }}
                  />
                  {item?.imagesType === "One-by-one" ? (
                    <div className="single-item-all-images-container">
                      {item?.images.map(({ url }, index) => (
                        <img
                          key={"all-images-" + index}
                          src={url}
                          onClick={() => {
                            setSelectedImage(index);
                          }}
                          className={
                            "single-item-all-images-image" +
                            (selectedImage == index ? " selected" : "")
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <Slider
                      sx={{ maxWidth: "300px" }}
                      valueLabelDisplay="off"
                      min={1}
                      max={36}
                      value={selectedImage}
                      onChange={(e) => {
                        console.log(e);
                        setSelectedImage(e.target.value);
                      }}
                    />
                  )}
                </>
              </div>
              <div className="single-item-info-container">
                <span className="single-item-name">{item.name}</span>
                <span className="single-item-price">${item.price}</span>
                <span className="single-item-description">
                  {item?.description?.split("\n").map((line) => (
                    <>
                      <p>{line}</p>
                      <br />
                    </>
                  ))}
                </span>
                {item.itemVariantGroups.map(
                  ({ id, description, itemVariants }) => {
                    if (itemVariants.length === 0) return null;
                    return (
                      <div
                        className="single-item-variants-container"
                        key={id + description}
                      >
                        <span className="single-item-variant-name">
                          {description}
                        </span>
                        <div className="single-item-variant-table">
                          {itemVariants.map((itemVariant, index) => {
                            return (
                              <button
                                key={`${description}: ${index}`}
                                className="single-item-variant"
                                type="button"
                              >
                                {itemVariant.url && (
                                  <img
                                    className="single-item-variant-image"
                                    src={itemVariant.url}
                                  />
                                )}
                                {itemVariant.description}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
                <button type="submit" className="single-item-button">
                  Save
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {loading && loading}
    </section>
  );
}
