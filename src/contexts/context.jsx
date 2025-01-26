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
    let [ok, data] = await categoriesServices.getCategories({
      recursive: true,
    });
    if (ok) {
      console.log("Categories: ", data);
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

  function getCategoryBySku(categorySku, parent) {
    if (categorySku === "all")
      return {
        description: "All",
        sku: "all",
      };
    if (parent) {
      for (var i = 0; i < parent?.subcategories.length; i++) {
        if (parent?.subcategories[i].sku == categorySku) {
          return { ...parent?.subcategories[i] };
        }
      }
    }
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].sku == categorySku) {
        return { ...categories[i] };
      }
    }
  }

  function getCategoriesBySkus(...categorySkus) {
    let parent = null;
    return categorySkus.map((categorySku) => {
      const category = getCategoryBySku(categorySku, parent);
      parent = category;
      return category;
    });
  }

  function addToCart(item) {
    const index = cart.findIndex(
      (cartItem) =>
        cartItem.item.id === item.item?.id && cartItem.variant === item.variant
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
    cart?.map((item) => (subtotal += item.item?.price * item.quantity));
    return subtotal;
  }, [cart]);

  const calculateFee = useCallback(() => {
    return calculateSubtotal() * 0.1 * 0;
  }, [cart, calculateSubtotal]);

  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + shippingFee + calculateFee();
  }, [cart, calculateFee]);

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
        calculateFee,
        calculateTotal,
        shippingFee,
        getCategoryBySku,
        getCategoriesBySkus,
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
