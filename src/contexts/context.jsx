import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import categoriesServices from "../services/categories-services";
import listsServices from "../services/lists-services";

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState([]);
  const [shippingFee, setShippingFee] = useState(4);
  const [itemList, setItemList] = useState(null);

  async function fetch() {
    var [ok, data] = await categoriesServices.getCategories();
    if (ok) {
      setCategories(data);
    }

    [ok, data] = await listsServices.getLists();
    if (ok) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].type === "item-list") {
          setItemList(data[i]);
          break;
        }
      }
    }
  }

  function getCategoryBySku(categorySku) {
    if (categorySku === "all")
      return {
        description: "All",
        sku: "all",
      };
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].sku == categorySku) {
        return { ...categories[i] };
      }
    }
  }

  function addToCart(item) {
    const index = cart.findIndex(
      (cartItem) =>
        cartItem.item.id === item.item.id && cartItem.variant === item.variant
    );
    console.log("Index: ", index);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].quantity += 1;
      setCart(newCart);
      return;
    } else {
      setCart([...cart, item]);
    }
  }

  const calculateSubtotal = useCallback(() => {
    var subtotal = 0;
    cart?.map((item) => (subtotal += item.item.price * item.quantity));
    return subtotal;
  }, [cart]);

  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + shippingFee;
  }, [cart]);

  const getNumberOfItems = useCallback(() => {
    var count = 0;
    cart?.map((item) => (count += item.quantity));
    return count;
  }, [cart]);

  useEffect(() => {
    console.log("Cart has been changed");
    if (cart) localStorage.setItem("cart", JSON.stringify(cart));
    else setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, [cart]);

  useEffect(() => {
    console.log("Categories have been changed");
  }, [categories]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        categories,
        setCategories,
        calculateSubtotal,
        calculateTotal,
        shippingFee,
        getCategoryBySku,
        getNumberOfItems,
        itemList,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export function useGeneralContext() {
  return useContext(GeneralContext);
}
