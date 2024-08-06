import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../components/page-header/page-header.component";
import Datatable from "../../../components/datatable/datatable.component";
import { useEffect, useMemo, useState } from "react";
import categoriesApi from "../../../api/categories.api";
import CategoryDialog from "../dialogs/category.dialog";
import { ArrowRight } from "lucide-react";
import useQuery from "../../../hooks/useQuery";

export default function AllCategories() {
  const params = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();

  const [loading, setLoading] = useState({ fetch: true });
  const [categories, setCategories] = useState();
  const [selected, setSelected] = useState({ id: Number(query.get("item")) });
  const [visible, setVisible] = useState(Boolean(query.get("item")));
  const [mode, setMode] = useState("edit");
  const [parentCategory, setParentCategory] = useState();

  const findManyCategories = async (id0) => {
    setLoading({ ...loading, fetch: true });
    const { ok, data } = await categoriesApi.findMany({
      parentCategoryId: id0 || Number(params.id0),
    });

    if (ok) {
      setCategories(data.subcategories);
      setParentCategory(data);
    }

    if (query.get("item")) {
      setSelected(
        data.subcategories.find(
          (element) => element.id == Number(query.get("item"))
        )
      );
    }

    setLoading({ ...loading, fetch: false });
  };

  useEffect(() => {
    findManyCategories();
  }, [params.id0]);

  const categoryRows = useMemo(() => {
    return (
      categories?.map((category) => {
        return {
          id: category.id,
          description: category.description,
          sku: category.sku,
          sequenceNumber: category.sequenceNumber,
          enter: category.id,
        };
      }) || []
    );
  }, [categories]);

  const updateCategories = async (newCategories) => {
    const updated = [];

    newCategories.map((category, index) => {
      if (category.sequenceNumber != index) {
        category.sequenceNumber = index;
        updated.push({ ...category });
      }
      return category;
    });

    if (updated.length > 0) {
      setLoading({ ...loading, update: true });
      const promises = updated.map((value) =>
        categoriesApi.updateSingle(
          { id: value.id },
          { sequenceNumber: value.sequenceNumber }
        )
      );

      await Promise.all(promises);

      setLoading({ ...loading, update: false });

      await findManyCategories();
    }
  };

  const removeCategories = async (toBeDeleted) => {
    setLoading({ ...loading, remove: true });

    const promises = toBeDeleted.map((element) =>
      categoriesApi.deleteSingle({ id: element.id })
    );

    await Promise.all(promises);

    setLoading({ ...loading, remove: false });

    await findManyCategories();
  };

  return (
    <section>
      <CategoryDialog
        visible={visible}
        setVisible={setVisible}
        loading={loading.fetch}
        value={selected}
        category={selected}
        setCategories={setCategories}
        onClose={() => {
          navigate(location.pathname);
        }}
        mode={mode}
      />
      <PageHeader
        title={params.id0 ? parentCategory?.description || "..." : "Categories"}
        hasBack={Boolean(params.id0)}
        onClickBack={() => {
          let newPath = location.pathname.split("/");

          newPath.pop();
          newPath = newPath
            .reduce((acc, curr) => acc + "/" + curr, "")
            .replace("//", "/");
          navigate(newPath);
        }}
      />
      <Datatable
        buttons={{
          create: {
            onClick: () => {
              setVisible(true);
              setMode("create");
            },
          },
          remove: { onClick: removeCategories },
        }}
        loading={loading.fetch || loading.update || loading.remove}
        name="Category"
        data={categoryRows}
        setData={updateCategories}
        reorderableRows={true}
        selectable={true}
        onRowClick={(e) => {
          const row = e.data;
          setSelected(row);
          setVisible(true);
          setMode("edit");
          navigate(location.pathname + `?item=${selected.id}`);
        }}
        onRemoveClick={(e) => {}}
        columns={[
          {
            field: "id",
            header: "Id",
            sortable: true,
            style: { width: "100px" },
          },
          {
            field: "description",
            header: "Description",
          },
          { field: "sku", header: "Sku" },
          {
            field: "enter",
            header: "",
            body: (row) => (
              <button
                className="icon text"
                onClick={() => {
                  navigate(location.pathname + "/" + row.id);
                }}
              >
                Subcategories
                <ArrowRight size={20} className="icon-item" />
              </button>
            ),
            style: { width: "100px" },
          },
        ]}
      />
    </section>
  );
}
