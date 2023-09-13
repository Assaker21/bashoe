import React, { useEffect, useMemo, useState } from "react";
import Cart from "../cart/cart.component.jsx";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.component.scss";

const Navbar = ({ query, setQuery }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [search, setSearch] = useState(query.get("search"));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [cats, setCats] = useState(localStorage.getItem("cats") ? JSON.parse(localStorage.getItem("cats")) : ["none"]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [isCartOpen]);

  useEffect(() => {
    window.addEventListener("cats&shipping", () => {
      setCats(JSON.parse(localStorage.getItem("cats")));
    });
  }, []);

  useEffect(() => {
    if (cart) {
      if (localStorage.getItem("cart") != JSON.stringify(cart)) {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      if (cart != null || localStorage.getItem != null) {
        localStorage.setItem("cart", null);
        window.dispatchEvent(new Event("storage"));
      }
    }
    return () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  }, [cart]);

  const navigate = useNavigate();

  const handleResize = () => {
    if (window.matchMedia("(max-width: 580px)").matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const handleSearch = (e) => {
    try {
      e.preventDefault();
      navigate("/?search=" + search + (query.get("cat") ? "&cat=" + query.get("cat") : ""));
      setQuery(new URLSearchParams(window.location.search));
    } catch (error) {
      console.log("SEARCH ERROR: " + error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", () => {
      setCart(JSON.parse(localStorage.getItem("cart")));
    });
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="main">
          <Link
            className="title"
            onClick={() => {
              navigate("/?cat=All");
              setQuery(new URLSearchParams(window.location.search));
            }}
          >
            BASHOE
          </Link>
          {!isSmallScreen && (
            <form className="search search-big" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Bashoe"
                defaultValue={query.get("search")}
                onChange={(e) => {
                  console.log("Search value: " + e.target.value);
                  setSearch(e.target.value);
                }}
              />
              <button>
                <i className="bx bx-search-alt-2"></i>
              </button>
            </form>
          )}
          <button className="cart">
            <i
              className="bx bx-cart"
              onClick={() => {
                setIsCartOpen(!isCartOpen);
              }}
            >
              <span className="cart-amount-inside">{cart ? cart.length : 0}</span>
            </i>
            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} cart={cart} setCart={setCart} />}
          </button>
        </div>
        {isSmallScreen && (
          <form className="search-small" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Bashoe"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button>
              <i className="bx bx-search-alt-2"></i>
            </button>
          </form>
        )}
        <hr />
        <div className="menu">
          {cats.map((cat) => {
            return (
              <Link
                key={cat}
                className="menu-item"
                onClick={() => {
                  navigate("/?cat=" + cat + (search ? "&search=" + search : ""));
                  setQuery(new URLSearchParams(window.location.search));
                }}
              >
                {cat}
              </Link>
            );
          })}
        </div>
        <hr />
      </nav>
    </>
  );
};

export default Navbar;
