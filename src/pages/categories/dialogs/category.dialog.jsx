import "./category.dialog.scss";
import FormDialog from "../../../components/dialogs/form-dialog.component";
import { useEffect, useState } from "react";
import categoriesApi from "../../../api/categories.api";
import Input from "../../../components/input/input.component";
import { useParams } from "react-router-dom";

export default function CategoryDialog({
  category,
  setCategories,
  mode,
  visible,
  ...rest
}) {
  const [localCategory, setLocalCategory] = useState({});
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [loading, setLoading] = useState({ save: false });
  const params = useParams();

  useEffect(() => {
    setLocalCategory(category);
    setUpdatedCategory({});
  }, [category]);

  useEffect(() => {
    if (visible) {
      if (mode == "edit") {
        setLocalCategory(category);
      } else {
        setLocalCategory({ description: "", sku: "" });
      }

      setUpdatedCategory({});
    }
  }, [visible, mode]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    if (mode == "edit") {
      const { ok, data } = await categoriesApi.updateSingle(
        { id: category.id },
        updatedCategory
      );

      console.log("Finished update: ", data);

      if (ok) {
        console.log("Started fetch...");
        const { ok, data } = await categoriesApi.findMany({
          parentCategoryId: category.parentCategoryId,
        });

        console.log("Finished fetch: ", data);

        if (ok) {
          setCategories(data.subcategories);
          setUpdatedCategory({});
        }
      }
    } else {
      const { ok, data } = await categoriesApi.createSingle(
        params.id0
          ? {
              ...updatedCategory,
              parentCategoryId: Number(params.id0),
            }
          : updatedCategory
      );

      if (ok) {
        setCategories(data.subcategories);
        setUpdatedCategory({});
      }
    }

    setLoading({ ...loading, save: false });
    rest.setVisible(false);
    rest.onClose && rest.onClose();
  };

  return (
    <FormDialog
      {...rest}
      visible={visible}
      header={
        mode == "create" ? "Create category" : `Category #${category?.id}`
      }
      saveEnabled={JSON.stringify(updatedCategory)?.trim() != "{}"}
      onSave={onSave}
      saveLoading={Boolean(loading?.save)}
    >
      <Input
        label={"Description"}
        value={localCategory?.description || ""}
        onChange={(e) => {
          setLocalCategory((curr) => ({
            ...curr,
            description: e.target.value,
          }));

          setUpdatedCategory((curr) => ({
            ...curr,
            description: e.target.value,
          }));
        }}
        placeholder="Description"
      />

      <Input
        label={"Sku"}
        value={localCategory?.sku || ""}
        onChange={(e) => {
          setLocalCategory((curr) => ({ ...curr, sku: e.target.value }));

          setUpdatedCategory((curr) => ({ ...curr, sku: e.target.value }));
        }}
        placeholder="Sku"
      />
    </FormDialog>
  );
}
