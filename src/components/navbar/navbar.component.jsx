import "./navbar.style.scss";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Icon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { useEffect, useMemo, useState } from "react";
import { useGeneralContext } from "../../contexts/context.jsx";
import BasicPopover from "../../basic-components/basic-popover/basic-popover.component.jsx";
import Cart from "../cart/cart.component.jsx";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useScreenDimensions from "../../custom-hooks/useScreenDimensions.jsx";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Line from "../../basic-components/line/line.component.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router-dom";
import debounce from "../../utils/debounce.js";
import itemsServices from "../../services/items-services.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Divider } from "@mui/material";

function CategoriesMenu({ setMenuOpen }) {
  const { categories } = useGeneralContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lastCategories, setLastCategories] = useState([]);

  const categoriesToDisplay = useMemo(() => {
    if (!lastCategories || !lastCategories.length) {
      return categories;
    } else {
      return lastCategories[lastCategories.length - 1].subcategories;
    }
  }, [lastCategories, categories]);

  return (
    <div className="small-navbar-categories-container">
      {lastCategories[lastCategories.length - 1] && (
        <>
          <div className="small-navbar-category-title-container">
            <IconButton
              onClick={() => {
                setLastCategories((curr) => {
                  const newLastCategories = [...curr];
                  newLastCategories.pop();
                  return newLastCategories;
                });
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            {/*lastCategories.map((category, index) => {
              return (
                <>
                  <span
                    className={`small-navbar-category-title ${
                      lastCategories.length - 1 == index ? "highlight" : ""
                    }`}
                  >
                    {category?.description}
                  </span>
                  {lastCategories.length - 1 != index && (
                    <ArrowForwardIcon style={{ fontSize: "16px" }} />
                  )}
                </>
              );
            })*/}
            <span className={`small-navbar-category-title`}>
              {lastCategories[lastCategories.length - 1]?.description}
            </span>
          </div>
          <Line />
        </>
      )}
      {categoriesToDisplay?.map((category) => (
        <>
          <div
            onClick={() => {
              navigate(`/${category.sku}`);
              setMenuOpen(false);
            }}
            className="small-navbar-category"
          >
            <span>{category.description}</span>
            {category?.subcategories?.length > 0 ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(category);
                  setLastCategories((curr) => {
                    const newLastCategories = [...curr];
                    newLastCategories.push(category);
                    return newLastCategories;
                  });
                }}
                style={{
                  borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
                  borderRadius: "0px",
                  minHeight: "200px !important",
                  margin: 0,
                  marginTop: "-1px",
                  marginRight: "-24px",
                  padding: "24px",
                  paddingRight: "48px",
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            ) : (
              <div
                style={{
                  minHeight: "200px !important",
                  margin: 0,
                  marginTop: "-2px",
                  marginRight: "-24px",
                  padding: "36px 1px",
                }}
              />
            )}
          </div>
          <Line />
        </>
      ))}
    </div>
  );
}

function SearchMenu({ items, searching, setMenuOpen, setSearch }) {
  function handleClick() {
    setMenuOpen(false);
    setSearch("");
    console.log("Clicked");
  }

  return (
    <div className="small-navbar-drawer-search-container">
      {searching && (
        <div className="small-navbar-drawer-items">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1].map(() => {
            return (
              <>
                <SearchItem />
              </>
            );
          })}
        </div>
      )}
      {!searching && !items && "Type anything..."}
      {!searching && items && items.length === 0 && "Nothing found."}
      {!searching && items && items.length > 0 && (
        <div className="small-navbar-drawer-items">
          {items.map((item) => {
            return (
              <>
                <SearchItem item={item} onClick={handleClick} />
                <Line />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SearchItem({ item, onClick }) {
  return (
    <>
      {item ? (
        <Link
          to={`/${
            item?.categories?.length > 0 ? item.categories[0]?.sku : "all"
          }/${item.sku}`}
          className="search-item-container"
          onClick={onClick}
        >
          <img
            className="search-item-image"
            src={item.images[0].url.replace("<number>", "01")}
          />
          <div className="search-item-info">
            <span className="search-item-name">{item.name}</span>
          </div>
        </Link>
      ) : (
        <Skeleton style={{ height: "100px", width: "100%" }} />
      )}
    </>
  );
}

function CartMenu({ setMenuOpen }) {
  return <Cart setMenuOpen={setMenuOpen} />;
}

export default function Navbar() {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const params = useParams();
  const { cart, categories } = useGeneralContext();
  const { width, height } = useScreenDimensions();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesWideMenuOpen, setCategoriesWideMenuOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState(null);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    if (search === "") setMenuOpen(false);
    else setMenuOpen(true);
    setSearching(true);
    const searchDebounced = debounce(() => {
      Search();
    }, 1000);
    searchDebounced();
  }, [search]);

  async function Search() {
    if (search === "") {
      setSearchItems(null);
      setSearching(false);

      return;
    }
    const [ok, data] = await itemsServices.getItems({ search });
    if (ok) {
      setSearchItems(data);
      setSearching(false);
    }
  }

  return (
    <>
      {width > 800 && (
        <div className="navbar">
          <section
            className={
              "navbar-container" + (menu === "search" ? " overlay" : "")
            }
          >
            <Drawer
              disableEnforceFocus
              open={menuOpen}
              anchor={menu === "search" ? "top" : "right"}
              onClose={() => setMenuOpen(false)}
              className="small-navbar-drawer-container"
            >
              <Box
                sx={{
                  width: menu === "search" ? "100%" : "300px",
                  height: menu === "search" ? "calc(100vh - 140px)" : "100vh",
                  paddingTop: menu === "search" ? "140px" : "",
                }}
                role="presentation"
                onClick={() => {
                  if (!menuOpen) setMenuOpen(true);
                }}
                className="small-navbar-box-container"
              >
                {menu === "cart" && <CartMenu setMenuOpen={setMenuOpen} />}
                {menu === "search" && (
                  <SearchMenu
                    setMenuOpen={setMenuOpen}
                    setSearch={setSearch}
                    searching={searching}
                    items={searchItems}
                  />
                )}
              </Box>
            </Drawer>
            <div className="navbar-top-container">
              <Link to="/" className="navbar-logo">
                <img
                  style={{
                    width: "50px",
                  }}
                  src="/images/hoophouse-logo-white-512.jpg"
                  alt="logo"
                />
                HoopHouse
              </Link>
              <div
                className={`navbar-search-container ${
                  false && searchInputFocused && "focus"
                }`}
              >
                <SearchIcon className="navbar-search-icon" fontSize="small" />
                <input
                  placeholder="Search for brand, color, etc."
                  className="navbar-search-input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    console.log("TARGET: ", e.target.value);
                  }}
                  onClick={() => {
                    setSearchInputFocused(true);
                    if (!menuOpen) {
                      setSearchItems(null);
                      //setMenuOpen(true);
                      setMenu("search");
                    }
                  }}
                  onBlur={() => {
                    setSearchInputFocused(false);
                  }}
                />
              </div>
              {menu === "search" && menuOpen ? (
                <IconButton
                  size="large"
                  onClick={() => {
                    setMenuOpen(false);
                    //setMenu("search");
                    setSearch("");
                  }}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  onClick={() => {
                    setMenuOpen(true);
                    setMenu("cart");
                  }}
                >
                  <Badge
                    badgeContent={cart?.length || 0}
                    color="primary"
                    variant="dot"
                  >
                    <ShoppingBagIcon fontSize="large" />
                  </Badge>
                </IconButton>
              )}
            </div>
            <div className="navbar-bottom-container">
              <div className="navbar-categories">
                {[{ sku: "all", description: "All" }, ...categories].map(
                  (category, index) => {
                    return (
                      <div
                        className={
                          "navbar-category-container" +
                          (params?.categorySku === category.sku
                            ? " selected"
                            : "")
                        }
                        key={`Category ${category.sku}`}
                        onPointerEnter={() => {
                          if (category.subcategories?.length > 0)
                            setCategoriesWideMenuOpen(category);
                        }}
                      >
                        <Link
                          to={`/${category.sku}`}
                          className="navbar-category"
                        >
                          {category.description}
                        </Link>
                        <div className="navbar-category-border"></div>
                      </div>
                    );
                  }
                )}
              </div>
              <div
                className={`navbar-subcategories ${
                  categoriesWideMenuOpen ? "open" : ""
                }`}
                onPointerLeave={() => {
                  setCategoriesWideMenuOpen(false);
                }}
              >
                <div className="navbar-subcategories-container">
                  {categoriesWideMenuOpen?.subcategories?.map((subcategory) => {
                    return (
                      <div className="navbar-subcategories-column">
                        <Link
                          to={`${categoriesWideMenuOpen.sku}/${subcategory.sku}`}
                          className="navbar-subcateogries-title"
                        >
                          {subcategory.description}
                        </Link>
                        {subcategory.subcategories?.length > 0 && (
                          <div className="navbar-subcategories-subcategories">
                            {subcategory.subcategories.map((sub2) => {
                              return (
                                <Link
                                  to={`${categoriesWideMenuOpen.sku}/${subcategory.sku}/${sub2.sku}`}
                                >
                                  {sub2.description}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <div className="navbar-offset"></div>
        </div>
      )}
      {width < 800 && (
        <div className="small-navbar">
          <section className="small-navbar-container">
            <div className="small-navbar-top-container">
              <Drawer
                disableEnforceFocus
                open={menuOpen}
                anchor="top"
                onClose={() => setMenuOpen(false)}
                className="small-navbar-drawer-container"
              >
                <Box
                  sx={{
                    width: "100vw",
                    height: "calc(100vh - 55px)",
                    paddingTop: "55px",
                  }}
                  role="presentation"
                  onClick={() => {
                    if (!menuOpen) setMenuOpen(true);
                  }}
                  className="small-navbar-box-container"
                >
                  {menu == "categories" && (
                    <CategoriesMenu setMenuOpen={setMenuOpen} />
                  )}
                  {menu == "search" && (
                    <SearchMenu
                      setMenuOpen={setMenuOpen}
                      setSearch={setSearch}
                      searching={searching}
                      items={searchItems}
                    />
                  )}
                  {menu == "cart" && <CartMenu setMenuOpen={setMenuOpen} />}
                </Box>
              </Drawer>

              {!(menu == "search" && menuOpen) && (
                <>
                  <div className="flex-center">
                    <IconButton
                      onClick={() => {
                        setMenu("categories");
                        setMenuOpen(!menuOpen);
                      }}
                    >
                      {!menuOpen ? <MenuIcon /> : <CloseIcon />}
                    </IconButton>
                    <Link to="/" className="small-navbar-logo flex-center">
                      HoopHouse
                    </Link>
                  </div>

                  <div className="flex-center">
                    <IconButton
                      onClick={() => {
                        setMenu("search");
                        setSearchItems(null);
                        setMenuOpen(true);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      size="medium"
                      onClick={() => {
                        setMenu("cart");
                        if (menu == "cart") setMenuOpen(!menuOpen);
                        else setMenuOpen(true);
                      }}
                    >
                      <Badge
                        badgeContent={cart?.length || 0}
                        color="primary"
                        variant="dot"
                      >
                        <ShoppingBagIcon fontSize="medium" />
                      </Badge>
                    </IconButton>
                  </div>
                </>
              )}
              {menu == "search" && menuOpen && (
                <>
                  <div
                    className={`small-navbar-search-container ${
                      searchInputFocused && "focus"
                    }`}
                  >
                    <SearchIcon
                      className="small-navbar-search-icon"
                      fontSize="small"
                    />
                    <input
                      placeholder="Search for brand, color, etc."
                      className={`small-navbar-search-input`}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      onClick={() => {
                        setSearchInputFocused(true);
                        if (!menuOpen) {
                          setSearchItems(null);
                          //setMenuOpen(true);
                          setMenu("search");
                        }
                      }}
                      onBlur={() => setSearchInputFocused(false)}
                    />
                  </div>
                  <IconButton
                    className="small-navbar-search-close-button"
                    onClick={() => {
                      setMenu("search");
                      setMenuOpen(false);
                      setSearch("");
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </div>
            <div className={`small-navbar-bottom-container`}></div>
          </section>
          <div className="small-navbar-offset"></div>
        </div>
      )}
    </>
  );
}
