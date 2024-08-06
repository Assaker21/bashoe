import FormDialog from "../../../components/dialogs/form-dialog.component";
import { useEffect, useState } from "react";
import variantsApi from "../../../api/variants.api";
import Input from "../../../components/input/input.component";
import { useParams } from "react-router-dom";

export default function VariantDialog({
  variant,
  setVariants,
  mode,
  visible,
  refresh,
  ...rest
}) {
  const [localVariant, setLocalVariant] = useState({});
  const [updatedVariant, setUpdatedVariant] = useState({});
  const [loading, setLoading] = useState({ save: false });
  const params = useParams();

  useEffect(() => {
    setLocalVariant(variant);
    setUpdatedVariant({});
  }, [variant]);

  useEffect(() => {
    if (visible) {
      if (mode == "edit") {
        setLocalVariant(variant);
      } else {
        setLocalVariant({ description: "" });
      }

      setUpdatedVariant({});
    }
  }, [visible, mode]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    if (mode == "edit") {
      const { ok, data } = await variantsApi.updateSingle(
        { id: variant.id },
        updatedVariant
      );

      if (ok) {
        refresh && (await refresh());
        setUpdatedVariant({});
      }
    } else {
      const { ok, data } = await variantsApi.createSingle({
        ...updatedVariant,
        variantGroupId: Number(params.id),
      });

      if (ok) {
        refresh && (await refresh());
        setUpdatedVariant({});
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
      header={mode == "create" ? "Create variant" : `Variant #${variant?.id}`}
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
    </FormDialog>
  );
}
