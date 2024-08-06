import FormDialog from "../../../components/dialogs/form-dialog.component";
import { useEffect, useState } from "react";
import Input from "../../../components/input/input.component";
import imagesApi from "../../../api/images.api";
import ImageInput from "../../../components/image-input/image-input.component";

export default function ImageDialog({
  image,
  product,
  setProduct,
  mode,
  visible,
  refresh,
  ...rest
}) {
  const [localImage, setLocalImage] = useState({});
  const [updatedImage, setUpdatedImage] = useState({});
  const [loading, setLoading] = useState({ save: false });

  useEffect(() => {
    setLocalImage(image);
    setUpdatedImage({});
  }, [image]);

  useEffect(() => {
    if (visible) {
      if (mode == "edit") {
        setLocalImage(image);
      } else {
        setLocalImage({ url: "" });
      }

      setUpdatedImage({});
    }
  }, [visible, mode]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    if (mode == "edit") {
      const { ok, data } = await imagesApi.updateSingle(
        { id: image.id },
        updatedImage
      );

      if (ok) {
        refresh && (await refresh());
        setUpdatedImage({});
      }
    } else {
      const { ok, data } = await imagesApi.createSingle({
        ...updatedImage,
        itemId: product.id,
      });

      if (ok) {
        refresh && (await refresh());
        setUpdatedImage({});
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
      header={mode == "create" ? "Add image" : `Edit Image #${image?.id}`}
      saveEnabled={JSON.stringify(updatedImage)?.trim() != "{}"}
      onSave={onSave}
      saveLoading={Boolean(loading?.save)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <img
          src={
            product.imagesType == "Slider"
              ? localImage?.url?.replace("<number>", "01")
              : localImage?.url
          }
          alt=""
          style={{ width: "200px", borderRadius: "0.5rem" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
          }}
        />
        {product.imagesType == "Slider" && (
          <img
            src={
              product.imagesType == "Slider"
                ? localImage?.url?.replace("<number>", "10")
                : localImage?.url
            }
            alt=""
            style={{ width: "200px", borderRadius: "0.5rem" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
            }}
          />
        )}
        {product.imagesType == "Slider" && (
          <img
            src={
              product.imagesType == "Slider"
                ? localImage?.url?.replace("<number>", "18")
                : localImage?.url
            }
            alt=""
            style={{ width: "200px", borderRadius: "0.5rem" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
            }}
          />
        )}
        {product.imagesType == "Slider" && (
          <img
            src={
              product.imagesType == "Slider"
                ? localImage?.url?.replace("<number>", "28")
                : localImage?.url
            }
            alt=""
            style={{ width: "200px", borderRadius: "0.5rem" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
            }}
          />
        )}
      </div>
      <ImageInput
        label={"Url"}
        value={localImage?.url || ""}
        onChange={(e) => {
          setLocalImage((curr) => ({
            ...curr,
            url: e.target.value,
          }));

          setUpdatedImage((curr) => ({
            ...curr,
            url: e.target.value,
          }));
        }}
        placeholder="Url"
      />
    </FormDialog>
  );
}
