import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs.component";
import { useGeneralContext } from "../../../contexts/context";

import "./item.page.scss";
import React, { useEffect, useMemo, useState } from "react";
import PreloadImages from "../../../basic-components/preload-images/preload-images.component";
import Line from "../../../basic-components/line/line.component";
import ItemList from "../../../components/item-list/item-list.component";
import Slider from "@mui/material/Slider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import itemsServices from "../../../services/items-services";
import Helmet from "react-helmet";
import contentsServices from "../../../services/contents-services";

export default function Item() {
  const { categorySku, itemSku } = useParams();
  const { getCategoryBySku, addToCart } = useGeneralContext();
  const category = getCategoryBySku(categorySku);
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  const [selectedImage, setSelectedImage] = useState(1);
  const [allPossibleImages, setAllPossibleImages] = useState([]);
  const [image, setImage] = useState("");
  const [clickingImage, setClickingImage] = useState(false);
  const [itemList, setItemList] = useState();

  async function fetch() {
    setItem(null);

    let [ok, data] = await itemsServices.getItems({
      categorySku,
      itemSku,
      enabledItemCustomVariants: true,
    });
    if (ok) {
      setItem(data);
      console.log("Item: ", data);
    }

    [ok, data] = await contentsServices.getContent({
      location: "Single Item Page",
    });
    if (ok) {
      if (data[0]) setItemList(data[0]);
    }
  }

  const itemVariantGroups = useMemo(() => {
    if (!item?.itemCustomVariants) return [];

    const groups = [];
    item?.itemCustomVariants?.forEach((variant) => {
      const group = variant.itemVariantGroup;
      let index = groups.findIndex((savedGroup) => savedGroup.id == group.id);

      if (index === -1) {
        groups.push(group);
        group.itemVariants = [];
        index = groups.length - 1;
      }

      groups[index].itemVariants.push({
        id: variant.id,
        description: variant.description,
        url: variant.url,
        itemVariantGroup: {
          id: group.id,
          description: group.description,
        },
      });
    });

    return groups;
  }, [item]);

  useEffect(() => {
    fetch();
  }, [itemSku, categorySku]);

  useEffect(() => {
    const _allPossibleImages = [];
    if (item?.imagesType === "One-by-one") {
      setSelectedImage(0);
      for (var i = 1; i < item?.images?.length; i++) {
        _allPossibleImages.push(item?.images[i].url);
      }
    } else {
      setSelectedImage(1);
      for (var i = 1; i < 37; i++) {
        _allPossibleImages.push(
          item?.images[0]?.url?.replace("<number>", String(i).padStart(2, "0"))
        );
      }
    }

    setAllPossibleImages(_allPossibleImages);

    const variants = {};
    itemVariantGroups?.map((element) => {
      variants[element.id] = {
        ...element.itemVariants[0],
      };
    });

    setCartItem({
      item,
      variants: variants,
      quantity: 1,
    });
  }, [item]);

  useEffect(() => {
    if (item?.imagesType === "One-by-one") {
      setImage(item?.images[selectedImage]?.url);
    } else {
      setImage(
        item?.images[0]?.url?.replace(
          "<number>",
          String(selectedImage).padStart(2, "0")
        )
      );
    }
  }, [item, selectedImage]);

  return (
    <section className="single-item">
      <Breadcrumbs
        items={[
          {
            name: "Home",
            to: "/",
          },
          ...location.pathname
            .slice(1)
            .split("/")
            .map((element, index) => {
              let to = "";
              const elements = location.pathname.split("/");
              for (let i = 0; i < elements.length; i++) {
                to += `/${elements[i]}`;
                if (i == index + 1) {
                  break;
                }
              }
              to = to.replace("//", "/");
              let name = element
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return {
                name: name,
                to: to,
              };
            })
            .filter((element) => element.name !== "Product"),
        ]}
      />
      <PreloadImages images={allPossibleImages} />

      <div className="single-item-container">
        <div className="single-item-image-container">
          {item ? (
            <>
              <img
                draggable={false}
                className={
                  "single-item-image" +
                  (item?.imagesType === "One-by-one" ? "" : " drag")
                }
                src={image}
                onMouseMove={(e) => {
                  e.preventDefault();
                  if (item?.imagesType === "One-by-one") return;
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
                  if (item?.imagesType === "One-by-one") return;
                  setClickingImage(true);
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  if (item?.imagesType === "One-by-one") return;
                  setClickingImage(false);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  if (item?.imagesType === "One-by-one") return;
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
                  if (item?.imagesType === "One-by-one") return;
                  setClickingImage(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  if (item?.imagesType === "One-by-one") return;
                  setClickingImage(false);
                }}
              />
              {item?.imagesType === "One-by-one" ? (
                <div className="single-item-all-images-container">
                  {item?.images.map(({ url }, index) => (
                    <img
                      key={"all-images-" + index}
                      src={url}
                      onClick={() => {
                        setSelectedImage(index);
                      }}
                      className={
                        "single-item-all-images-image" +
                        (selectedImage == index ? " selected" : "")
                      }
                    />
                  ))}
                </div>
              ) : (
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
              )}
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
            {item?.description?.split("\n").map((line) => <p>{line}</p>) || (
              <Skeleton />
            )}
          </span>
          <div className="single-item-variants-container">
            {itemVariantGroups.map((group, groupIndex) => {
              if (itemVariantGroups[groupIndex].itemVariants?.length === 0)
                return;
              return (
                <React.Fragment key={"Group: " + group.id}>
                  <span className="single-item-variant-name">
                    {itemVariantGroups[groupIndex].description}
                  </span>
                  <div className="single-item-variant-table">
                    {itemVariantGroups[groupIndex].itemVariants.map(
                      (variant, index) => {
                        return (
                          <button
                            key={`Variant: ${variant.id}`}
                            className={
                              cartItem?.variants[group.id]?.id == variant.id
                                ? "single-item-variant selected"
                                : "single-item-variant"
                            }
                            onClick={() => {
                              let variants = cartItem?.variants || {};
                              variants[group.id] = variant;

                              console.log("VARIANTS: ", variants);

                              setCartItem({
                                ...cartItem,
                                variant: variants,
                                quantity: 1,
                              });
                            }}
                          >
                            {itemVariantGroups[groupIndex].itemVariants[index]
                              .url && (
                              <img
                                className="single-item-variant-image"
                                src={
                                  itemVariantGroups[groupIndex].itemVariants[
                                    index
                                  ].url
                                }
                              />
                            )}
                            {
                              itemVariantGroups[groupIndex].itemVariants[index]
                                .description
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
                const newCartItem = { ...cartItem };
                newCartItem.variants = Object.keys(newCartItem.variants).map(
                  (key) => ({
                    ...newCartItem.variants[key],
                  })
                );
                addToCart(newCartItem);
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
      {itemList && <ItemList value={itemList} />}
    </section>
  );
}
