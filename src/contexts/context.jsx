import React, { createContext, useContext, useEffect, useState } from "react";
import categoriesServices from "../services/categoriesServices";

/*[
    { id: 1, description: "Sneakers", sku: "sneakers" },
    { id: 2, description: "Jackets", sku: "jackets" },
    { id: 3, description: "Short", sku: "shorts" },
    { id: 4, description: "Balls", sku: "balls" },
    { id: 5, description: "Jerseys", sku: "jerseys" },
    { id: 6, description: "Socks", sku: "socks" },
  ] */

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState(null);

  function getCategoryBySku(categorySku) {
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

  useEffect(() => {
    console.log("Cart has been changed");
  }, [cart]);

  useEffect(() => {
    console.log("Categories have been changed");
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <GeneralContext.Provider
      value={{ cart, setCart, categories, setCategories, getCategoryBySku }}
    >
      {categories && children}
    </GeneralContext.Provider>
  );
}

export function useGeneralContext() {
  return useContext(GeneralContext);
}
