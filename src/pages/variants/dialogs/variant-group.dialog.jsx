import FormDialog from "../../../components/dialogs/form-dialog.component";
import { useEffect, useState } from "react";
import variantsApi from "../../../api/variants.api";
import Input from "../../../components/input/input.component";

export default function VariantGroupDialog({
  variantGroup,
  setVariantGroups,
  mode,
  visible,
  refresh,
  ...rest
}) {
  const [localVariantGroup, setLocalVariantGroup] = useState({});
  const [updatedVariantGroup, setUpdatedVariantGroup] = useState({});
  const [loading, setLoading] = useState({ save: false });

  useEffect(() => {
    setLocalVariantGroup(variantGroup);
    setUpdatedVariantGroup({});
  }, [variantGroup]);

  useEffect(() => {
    if (visible) {
      if (mode == "edit") {
        setLocalVariantGroup(variantGroup);
      } else {
        setLocalVariantGroup({ description: "", sku: "" });
      }

      setUpdatedVariantGroup({});
    }
  }, [visible, mode]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    if (mode == "edit") {
      console.log("Sent: ", updatedVariantGroup);
      const { ok, data } = await variantsApi.updateGroup(
        { id: variantGroup.id },
        updatedVariantGroup
      );

      console.log("Sent data: ", data);

      if (ok) {
        refresh && (await refresh());
        setUpdatedVariantGroup({});
      }
    } else {
      const { ok, data } = await variantsApi.createGroup(updatedVariantGroup);

      if (ok) {
        refresh && (await refresh());
        setUpdatedVariantGroup({});
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
        mode == "create"
          ? "Create variant group"
          : `Variant group #${variantGroup?.id}`
      }
      saveEnabled={JSON.stringify(updatedVariantGroup)?.trim() != "{}"}
      onSave={onSave}
      saveLoading={Boolean(loading?.save)}
    >
      <Input
        label={"Description"}
        value={localVariantGroup?.description || ""}
        onChange={(e) => {
          setLocalVariantGroup((curr) => ({
            ...curr,
            description: e.target.value,
          }));

          setUpdatedVariantGroup((curr) => ({
            ...curr,
            description: e.target.value,
          }));
        }}
        placeholder="Description"
      />
    </FormDialog>
  );
}
