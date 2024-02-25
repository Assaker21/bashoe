import React, { createContext, useContext, useEffect, useState } from "react";

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState([
    { description: "Sneakers", sku: "sneakers" },
    { description: "Jackets", sku: "jackets" },
    { description: "Short", sku: "shorts" },
    { description: "Balls", sku: "balls" },
    { description: "Jerseys", sku: "jerseys" },
    { description: "Socks", sku: "socks" },
  ]);

  function getCategoryBySku(categorySku) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].sku == categorySku) {
        return { ...categories[i] };
      }
    }
  }

  useEffect(() => {
    console.log("Cart has been changed");
  }, [cart]);

  useEffect(() => {
    console.log("Categories have been changed");
  }, [categories]);

  return (
    <GeneralContext.Provider
      value={{ cart, setCart, categories, setCategories, getCategoryBySku }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export function useGeneralContext() {
  return useContext(GeneralContext);
}
