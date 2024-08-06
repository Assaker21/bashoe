import { useEffect, useRef, useState } from "react";
import imagesApi from "../../api/images.api";
import Input from "../input/input.component";
import "./image-input.component.scss";
import { BACKEND_URL } from "../../consts";
import { ChevronDown } from "lucide-react";
import { OverlayPanel } from "primereact/overlaypanel";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ImageInput({ ...rest }) {
  const overlayPanel = useRef();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState({ fetch: true, upload: false });
  const [images, setImages] = useState([]);

  const findManyImages = async () => {
    setLoading((curr) => ({ ...curr, fetch: true }));
    const { ok, data } = await imagesApi.findMany({ what: "all" });
    if (ok) {
      setImages(data);
    }

    setLoading((curr) => ({ ...curr, fetch: false }));
    return data;
  };

  const uploadImage = async (e) => {
    setLoading((curr) => ({ ...curr, upload: true }));
    const { ok, data } = await imagesApi.upload(e.target.files);
    if (ok) {
      const newData = await findManyImages();
      rest.onChange({
        target: {
          value: BACKEND_URL + "/" + newData[images.length - 1].url,
        },
      });

      overlayPanel.current.toggle(e);
    }

    setLoading((curr) => ({ ...curr, upload: false }));
  };

  useEffect(() => {
    findManyImages();
  }, []);

  return (
    <div className="image-input-container">
      <Input {...rest} />
      <button
        className="with-icon"
        onClick={(e) => {
          overlayPanel.current.toggle(e);
        }}
      >
        Select <ChevronDown size={16} />
      </button>

      <OverlayPanel ref={overlayPanel}>
        <div className="image-input-all-images-container">
          <header>
            <span>Select image</span>
            <button
              className={loading.upload ? "disabled" : ""}
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              {!loading.upload ? (
                "Upload"
              ) : (
                <ProgressSpinner
                  style={{
                    height: "12px",
                    width: "30px",
                    padding: 0,
                    opacity: 1,
                  }}
                  strokeWidth="8"
                />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={uploadImage}
            />
          </header>
          <div className="image-input-all-images">
            {images?.map((image) => {
              return (
                <img
                  onClick={(e) => {
                    rest.onChange({
                      target: { value: BACKEND_URL + "/" + image.url },
                    });
                    overlayPanel.current.toggle(e);
                  }}
                  key={image.url}
                  src={BACKEND_URL + "/" + image.url}
                  alt="shoe"
                />
              );
            })}
          </div>
        </div>
      </OverlayPanel>
    </div>
  );
}
