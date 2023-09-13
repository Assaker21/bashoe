import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.component.scss";

const Navbar = ({ query, setQuery }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [search, setSearch] = useState(query.get("search"));

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
          <Link className="menu-item" to="/orders">
            Orders
          </Link>
          <Link className="menu-item" to="/">
            Items
          </Link>
          <Link className="menu-item" to="/others">
            Categories and shipping
          </Link>
        </div>
        <hr />
      </nav>
    </>
  );
};

export default Navbar;
