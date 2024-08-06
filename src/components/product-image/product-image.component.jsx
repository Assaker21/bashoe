import { useState } from "react";
import "./product-image.component.scss";

export default function ProductImage({ images, type, style }) {
  const [position, setPosition] = useState(1);

  if (type == "Slider") {
    return (
      <div
        style={{
          ...style,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        ].map((value) => (
          <img
            key={"Image " + value}
            src={images[0]?.url.replace(
              "<number>",
              String(value).padStart(2, "0")
            )}
            alt=""
            style={{ display: "none" }}
          />
        ))}
        <img
          style={{ maxWidth: "500px", width: "100%", borderRadius: "0.75rem" }}
          src={images[0]?.url.replace(
            "<number>",
            String(position).padStart(2, "0")
          )}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
          }}
        />
        <input
          type="range"
          value={position}
          max={36}
          min={1}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {images.map((image) => {
          return (
            <img
              style={{
                height: "300px",
                borderRadius: "0.75rem",
              }}
              key={"Image " + image.id}
              src={image.url}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
              }}
            />
          );
        })}
      </div>
    );
  }
}
