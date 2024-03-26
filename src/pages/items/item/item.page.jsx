import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs.component";
import { useGeneralContext } from "../../../contexts/context";

import "./item.page.scss";
import React, { useEffect, useState } from "react";
import PreloadImages from "../../../basic-components/preload-images/preload-images.component";
import Line from "../../../basic-components/line/line.component";
import ItemList from "../../../components/item-list/item-list.component";
import Slider from "@mui/material/Slider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import itemsServices from "../../../services/items-services";
import Helmet from "react-helmet";

export default function Item() {
  const { categorySku, itemSku } = useParams();
  const { getCategoryBySku, addToCart, itemList } = useGeneralContext();
  const category = getCategoryBySku(categorySku);

  const [item, setItem] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  const [selectedImage, setSelectedImage] = useState(1);
  const [allPossibleImages, setAllPossibleImages] = useState([]);
  const [image, setImage] = useState("");
  const [clickingImage, setClickingImage] = useState(false);

  async function fetch() {
    setItem(null);
    const [ok, data] = await itemsServices.getItems({ categorySku, itemSku });
    if (ok) {
      setItem(data);
      console.log("Item: ", data);
    }
  }

  useEffect(() => {
    fetch();
  }, [itemSku, categorySku]);

  useEffect(() => {
    const _allPossibleImages = [];
    for (var i = 1; i < 37; i++) {
      _allPossibleImages.push(
        item?.images[0].url.replace("<number>", String(i).padStart(2, "0"))
      );
    }
    setAllPossibleImages(_allPossibleImages);

    setCartItem({
      item,
      variant: item?.itemVariantGroups[0].itemVariants[0],
      quantity: 1,
    });
  }, [item]);

  useEffect(() => {
    setImage(
      item?.images[0].url.replace(
        "<number>",
        String(selectedImage).padStart(2, "0")
      )
    );
  }, [item, selectedImage]);

  return (
    <section className="single-item">
      <Helmet>
        <meta property="og:title" content={item?.name || ""} />
        <meta property="og:description" content={item?.description || ""} />
        <meta
          property="og:image"
          content={item?.images[0]?.url?.replace("<number>", "01") || ""}
        />
      </Helmet>
      <Breadcrumbs
        items={[
          {
            name: "Home",
            to: "/",
          },
          {
            name: category?.description,
            to: `/${categorySku}`,
          },
          {
            name: item?.name,
            to: `/${categorySku}/${itemSku}`,
          },
        ]}
      />
      <PreloadImages images={allPossibleImages} />

      <div className="single-item-container">
        <div className="single-item-image-container">
          {item ? (
            <>
              <img
                draggable={false}
                className="single-item-image"
                src={image}
                onMouseMove={(e) => {
                  e.preventDefault();
                  if (!clickingImage) return;

                  const rect = e.target.getBoundingClientRect();
                  const x = Math.min(
                    Math.max(1 - (e.clientX - rect.left) / rect.width, 0),
                    1
                  );

                  setSelectedImage(Math.floor(x * 36 + 1));
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setClickingImage(true);
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  setClickingImage(false);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  if (!clickingImage) return;

                  const rect = e.target.getBoundingClientRect();
                  const x = Math.min(
                    Math.max(
                      1 - (e.touches[0].clientX - rect.left) / rect.width,
                      0
                    ),
                    1
                  );
                  console.log(x);

                  setSelectedImage(Math.floor(x * 36 + 1));
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setClickingImage(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setClickingImage(false);
                }}
              />
              <Slider
                sx={{ maxWidth: "300px" }}
                valueLabelDisplay="off"
                min={1}
                max={36}
                value={selectedImage}
                onChange={(e) => {
                  console.log(e);
                  setSelectedImage(e.target.value);
                }}
              />
            </>
          ) : (
            <Skeleton />
          )}
        </div>
        <div className="single-item-info-container">
          <span className="single-item-name">{item?.name || <Skeleton />}</span>
          <span className="single-item-price">
            {(item?.price && "$" + item?.price) || <Skeleton />}
          </span>
          <span className="single-item-description">
            {item?.description?.split("\n").map((line) => (
              <>
                <p>{line}</p>
                <br />
              </>
            )) || <Skeleton />}
          </span>
          <div className="single-item-variants-container">
            {item?.itemVariantGroups.map((group, groupIndex) => {
              if (
                item?.itemVariantGroups[groupIndex].itemVariants?.length === 0
              )
                return;
              return (
                <React.Fragment key={"Group: " + group.id}>
                  <span className="single-item-variant-name">
                    {item?.itemVariantGroups[groupIndex].description}
                  </span>
                  <div className="single-item-variant-table">
                    {item?.itemVariantGroups[groupIndex].itemVariants.map(
                      (variant, index) => {
                        return (
                          <button
                            key={`Variant: ${variant.id}`}
                            className={
                              variant === cartItem?.variant
                                ? "single-item-variant selected"
                                : "single-item-variant"
                            }
                            onClick={() => {
                              setCartItem({
                                ...cartItem,
                                variant: variant,
                                quantity: 1,
                              });
                            }}
                          >
                            {
                              item?.itemVariantGroups[groupIndex].itemVariants[
                                index
                              ].description
                            }
                          </button>
                        );
                      }
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          {item ? (
            <button
              className="single-item-button"
              onClick={() => {
                addToCart(cartItem);
              }}
            >
              Add To Cart
            </button>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
      <Line />
      <ItemList value={itemList} />
    </section>
  );
}
