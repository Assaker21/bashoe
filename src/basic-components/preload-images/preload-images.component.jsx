import React, { useEffect } from "react";

export default function PreloadImages({ images }) {
  return (
    <div
      style={{
        width: "1px",
        height: "1px",
        visibility: "hidden",
        overflow: "hidden",
      }}
    >
      {images?.map((image, index) => {
        return <img src={image} key={`Image: ${index}`} />;
      })}
    </div>
  );
}
