import "./images.page.scss";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import imagesServices from "../../services/imagesServices";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

/*[
    {
      url: `https://picsum.photos/id/${
        Math.floor(Math.random() * 237) + 1
      }/600/300`,
    },
    {
      url: `https://picsum.photos/id/${
        Math.floor(Math.random() * 237) + 1
      }/600/300`,
    },
    {
      url: `https://picsum.photos/id/${
        Math.floor(Math.random() * 237) + 1
      }/600/400`,
    },
    {
      url: `https://picsum.photos/id/${
        Math.floor(Math.random() * 237) + 1
      }/600/300`,
    },
    {
      url: `https://picsum.photos/id/${
        Math.floor(Math.random() * 237) + 1
      }/600/300`,
    },
  ] */

export default function Images() {
  const [images, setImages] = useState(null);
  const [maxImages, setMaxImages] = useState(20);

  async function fetch() {
    const [ok, data] = await imagesServices.getImages();
    if (ok) {
      setImages(data);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  function copyToClipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Make the textarea out of viewport
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select and copy the text inside the textarea
    textarea.select();
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textarea);
  }

  async function handleUploadImages(files) {
    const [ok, data] = await imagesServices.uploadFiles(null, files);

    if (ok) {
      setImages(data);
    }
  }

  return (
    <section className="images">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Images", to: "/images" },
        ]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Images</h1>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          sx={{ fontWeight: "bold" }}
        >
          Upload image
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              handleUploadImages(e.target.files);
            }}
            multiple
          />
        </Button>
      </Box>

      <div>
        <ImageList cols={3} gap={8}>
          {images
            ?.map((item, index) => (
              <>
                {index < maxImages && (
                  <ImageListItem key={`Image: ${item.id}`}>
                    <img
                      onClick={() => {
                        copyToClipboard(
                          item.url.includes("http")
                            ? item.url
                            : process.env.REACT_APP_API_BASE_URL +
                                "/" +
                                item.url
                        );
                      }}
                      style={{ objectFit: "contain" }}
                      className="images-image"
                      src={
                        item.url.includes("http")
                          ? item.url.replace("<number>", "01")
                          : process.env.REACT_APP_API_BASE_URL + "/" + item.url
                      }
                      alt={
                        item.url.includes("http")
                          ? item.url.replace("<number>", "01")
                          : process.env.REACT_APP_API_BASE_URL + "/" + item.url
                      }
                    />
                  </ImageListItem>
                )}
              </>
            ))
            .filter((a) => a)}
        </ImageList>
        {images?.length > maxImages && (
          <Button
            variant="contained"
            onClick={() => {
              setMaxImages(maxImages + 20);
            }}
          >
            Load more
          </Button>
        )}
      </div>
    </section>
  );
}
