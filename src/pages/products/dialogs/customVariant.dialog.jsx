import FormDialog from "../../../components/dialogs/form-dialog.component";
import { useEffect, useState } from "react";
import Input from "../../../components/input/input.component";
import variantsApi from "../../../api/variants.api";
import DropDown from "../../../components/dropdown/dropdown.component";
import ImageInput from "../../../components/image-input/image-input.component";

export default function CustomVariantDialog({
  variant,
  product,
  setProduct,
  mode,
  visible,
  refresh,
  ...rest
}) {
  const [localVariant, setLocalVariant] = useState({});
  const [updatedVariant, setUpdatedVariant] = useState({});
  const [loading, setLoading] = useState({ save: false });

  useEffect(() => {
    if (variant) {
      setLocalVariant(variant);
      setUpdatedVariant({});
    } else {
      setLocalVariant({});
      setUpdatedVariant({});
    }
  }, [variant]);

  useEffect(() => {
    if (visible) {
      if (mode == "edit") {
        setLocalVariant(variant);
      } else {
        setLocalVariant({ url: "" });
      }

      setUpdatedVariant({});
    }
  }, [visible, mode]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    const { ok, data } = await variantsApi.updateSingleCustom(
      { id: variant.id },
      updatedVariant
    );

    if (ok) {
      refresh && (await refresh());
      setUpdatedVariant({});
    }

    setLoading({ ...loading, save: false });
    rest.setVisible(false);
    rest.onClose && rest.onClose();
  };

  return (
    <FormDialog
      {...rest}
      visible={visible}
      header={mode == "create" ? "Add variant" : `Edit variant #${variant?.id}`}
      saveEnabled={JSON.stringify(updatedVariant)?.trim() != "{}"}
      onSave={onSave}
      saveLoading={Boolean(loading?.save)}
    >
      <Input
        label={"Description"}
        value={localVariant?.description || ""}
        onChange={(e) => {
          setLocalVariant((curr) => ({
            ...curr,
            description: e.target.value,
          }));

          setUpdatedVariant((curr) => ({
            ...curr,
            description: e.target.value,
          }));
        }}
        placeholder="Description"
      />
      <ImageInput
        label={"Url"}
        value={localVariant?.url || ""}
        onChange={(e) => {
          setLocalVariant((curr) => ({
            ...curr,
            url: e.target.value,
          }));

          setUpdatedVariant((curr) => ({
            ...curr,
            url: e.target.value,
          }));
        }}
        placeholder="Url"
      />
      <DropDown
        values={["Enabled", "Disabled"]}
        value={localVariant.enabled ? "Enabled" : "Disabled"}
        setValue={(newValue) => {
          setLocalVariant((curr) => ({
            ...curr,
            enabled: newValue == "Enabled",
          }));

          setUpdatedVariant((curr) => ({
            ...curr,
            enabled: newValue == "Enabled",
          }));
        }}
        label={"Status"}
        placeholder={"Status"}
      />
    </FormDialog>
  );
}
