import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs.component";
import { useGeneralContext } from "../../../contexts/context";

import "./item.page.scss";
import { useEffect, useState } from "react";
import PreloadImages from "../../../basic-components/preload-images/preload-images.component";
import Line from "../../../basic-components/line/line.component";
import ItemList from "../../../components/item-list/item-list.component";

export default function Item() {
  const { categorySku, itemSku } = useParams();
  const { getCategoryBySku } = useGeneralContext();
  const category = getCategoryBySku(categorySku);

  const [selectedImage, setSelectedImage] = useState(1);
  const [baseImage, setBaseImage] = useState(
    "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Black-Cool-Grey/Images/Nike-Kobe-11-EM-Low-Black-Cool-Grey/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635281372&h=320&q=60"
  );
  const [allPossibleImages, setAllPossibleImages] = useState([]);
  const [image, setImage] = useState(
    "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img01.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60"
  );
  const [clickingImage, setClickingImage] = useState(false);

  const name = "Jordan 4 Retro Bred Reimagined (GS)";
  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

  useEffect(() => {
    const _allPossibleImages = [];
    for (var i = 1; i < 37; i++) {
      _allPossibleImages.push(
        baseImage.replace("<number>", String(i).padStart(2, "0"))
      );
    }
    setAllPossibleImages(_allPossibleImages);
  }, [baseImage]);

  useEffect(() => {
    setImage(
      baseImage.replace("<number>", String(selectedImage).padStart(2, "0"))
    );
  }, [selectedImage]);

  return (
    <section className="single-item">
      <Breadcrumbs
        items={[
          {
            name: "Home",
            to: "/",
          },
          {
            name: category.description,
            to: `/${category.sku}`,
          },
          {
            name: name,
            to: `/${category.sku}/${itemSku}`,
          },
        ]}
      />
      <PreloadImages images={allPossibleImages} />

      <div className="single-item-container">
        <div className="single-item-image-container">
          <img
            draggable={false}
            className="single-item-image"
            src={image}
            onMouseMove={(e) => {
              e.preventDefault();
              if (!clickingImage) return;

              const rect = e.target.getBoundingClientRect();
              const x = 1 - (e.clientX - rect.left) / rect.width;

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
              const x = 1 - (e.clientX - rect.left) / rect.width;

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
          <input
            className="single-item-image-slider"
            type="range"
            id="slider"
            name="slider"
            min="1"
            max="36"
            value={selectedImage}
            onChange={(e) => {
              setSelectedImage(e.target.value);
            }}
          />
        </div>
        <div className="single-item-info-container">
          <span className="single-item-name">
            Jordan 4 Retro Bred Reimagined
          </span>
          <span className="single-item-price">$79</span>
          <span className="single-item-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis veritatis dolores, animi et, necessitatibus illum quod
            natus atque in voluptatibus, voluptate minima doloribus nesciunt
            blanditiis illo nostrum facilis provident omnis. Praesentium,
            inventore. Atque dolor mollitia quidem quos similique maxime harum
            optio illo aliquam esse provident, sint perspiciatis dolorem quaerat
            culpa!
          </span>
          <div className="single-item-variants-container">
            <span className="single-item-variant-name">Size</span>
            <div className="single-item-variant-table">
              {sizes.map((size, index) => {
                return (
                  <button
                    key={`Size: ${index}`}
                    className="single-item-variant"
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <button className="single-item-button">Add To Cart</button>
        </div>
      </div>
      <Line />
      <ItemList />
    </section>
  );
}
