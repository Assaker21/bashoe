import CategoryList from "../../components/category-list/category-list.component";
import ItemList from "../../components/item-list/item-list.component";
import WideList from "../../components/wide-list/wide-list.component";

import { useEffect, useState } from "react";

import Line from "../../basic-components/line/line.component";

import listsServices from "../../services/listsServices";

import "./home.page.scss";

export default function Home() {
  /*{
      type: "wide-list",
      position: "home",
      content: [
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
      ],
    },
    {
      type: "item-list",
      position: "home",
      description: "Popular This Week",
      content: ["", "", "", "", "", ""],
    },
    {
      type: "category-list",
      position: "home",
      description: "Nice categories",
      content: [
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
      ],
    },
    {
      type: "wide-list",
      position: "home",
      content: [
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
        "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x",
      ],
    },
    {
      type: "item-list",
      position: "home",
      description: "Popular This Week",
      content: ["", "", "", "", "", ""],
    },
    {
      type: "category-list",
      position: "home",
      description: "Nice categories",
      content: [
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
        {
          url: "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80",
          description: "Jordan",
        },
      ],
    }, */
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    //if (loading) return;

    setLoading(true);

    const [ok, data] = await listsServices.updateLists(content);
    if (ok) {
      setContent(data);
    }

    setLoading(false);
  }

  async function fetch() {
    const [ok, data] = await listsServices.getLists();
    if (ok) {
      console.log(data);
      if (data.length > 0) {
        setContent(data);
      }
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <section className="home">
        {content?.map((list, index) => {
          if (list.type === "wide-list")
            return (
              <>
                <WideList
                  value={list}
                  onChange={(newValue) => {
                    const newContent = [...content];
                    newContent[index] = newValue;
                    setContent(newContent);
                  }}
                />
                <Line />
              </>
            );
          if (list.type === "item-list")
            return (
              <>
                <ItemList
                  value={list}
                  onChange={(newValue) => {
                    const newContent = [...content];
                    newContent[index] = newValue;
                    setContent(newContent);
                  }}
                />
                <Line />
              </>
            );
          if (list.type === "category-list")
            return (
              <>
                <CategoryList
                  value={list}
                  onChange={(newValue) => {
                    const newContent = [...content];
                    newContent[index] = newValue;
                    setContent(newContent);
                  }}
                />
                <Line />
              </>
            );
        })}
      </section>
      <button onClick={handleSave} className="floating-save-button">
        {loading ? "Loading" : "Save"}
      </button>
    </>
  );
}
