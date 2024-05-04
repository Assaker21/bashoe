import React, { createContext, useContext, useEffect, useState } from "react";
import categoriesServices from "../services/categoriesServices";
import itemsServices from "../services/itemsServices";

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function updateAuthentication(value) {
    setIsAuthenticated(value);
  }

  function getCategoryBySku(categorySku) {
    if (categorySku === "all") return { sku: "all", description: "All" };
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].sku == categorySku) {
        return { ...categories[i] };
      }
    }
  }

  async function getCategories() {
    const [ok, data] = await categoriesServices.getCategories();
    if (ok) {
      setCategories(data);
    } else {
      console.log("error: ", data);
    }
  }

  async function getItems() {
    const [ok, data] = await itemsServices.getItems();
    if (ok) {
      setItems(data);
    } else {
      console.log("error: ", data);
    }
  }

  useEffect(() => {
    console.log("Cart has been changed");
  }, [cart]);

  useEffect(() => {
    console.log("Categories have been changed");
  }, [categories]);

  useEffect(() => {
    if (isAuthenticated) {
      getCategories();
      getItems();
    }
  }, [isAuthenticated]);

  return (
    <GeneralContext.Provider
      value={{
        cart,
        setCart,
        categories,
        setCategories,
        getCategoryBySku,
        items,
        setItems,
        updateAuthentication,
        isAuthenticated,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export function useGeneralContext() {
  return useContext(GeneralContext);
}
