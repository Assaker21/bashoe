import "./navbar.style.scss";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Icon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../contexts/context.jsx";
import BasicPopover from "../../basic-components/basic-popover/basic-popover.component.jsx";
import Cart from "../cart/cart.component.jsx";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useScreenDimensions from "../../custom-hooks/useScreenDimensions.jsx";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Line from "../../basic-components/line/line.component.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function CategoriesMenu() {
  const { categories } = useGeneralContext();

  return (
    <div className="small-navbar-categories-container">
      {categories?.map((category) => (
        <>
          <Link to={`/${category.sku}`} className="small-navbar-category">
            {category.description}
            <ArrowForwardIcon />
          </Link>
          <Line />
        </>
      ))}
    </div>
  );
}

function SearchMenu() {
  return (
    <div className="small-navbar-drawer-search-container">Type anything...</div>
  );
}

function CartMenu() {
  const { cart, setCart } = useGeneralContext();
  return <div className="navbar-cart-container">cart shows up here!</div>;
}

export default function Navbar() {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const { cart, categories } = useGeneralContext();
  const { width, height } = useScreenDimensions();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState("");

  return (
    <>
      {width > 800 && (
        <div className="navbar">
          <section className="navbar-container">
            <Drawer
              open={menuOpen}
              anchor="right"
              onClose={() => setMenuOpen(false)}
              className="small-navbar-drawer-container"
            >
              <Box
                sx={{ width: "300px", height: "100vh" }}
                role="presentation"
                onClick={() => setMenuOpen(false)}
                className="small-navbar-box-container"
              >
                {menu == "cart" && <CartMenu />}
              </Box>
            </Drawer>
            <div className="navbar-top-container">
              <Link to="/" className="navbar-logo">
                HoopHouse
              </Link>
              <div
                className={`navbar-search-container ${
                  searchInputFocused && "focus"
                }`}
              >
                <SearchIcon className="navbar-search-icon" fontSize="small" />
                <input
                  placeholder="Search for brand, color, etc."
                  className={`navbar-search-input`}
                  onFocus={() => setSearchInputFocused(true)}
                  onBlur={() => setSearchInputFocused(false)}
                />
              </div>
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
            </div>
            <div className="navbar-bottom-container">
              <div className="navbar-categories">
                {categories.map((category, index) => {
                  return (
                    <div
                      className="navbar-category-container"
                      key={`Category ${category.sku}`}
                    >
                      <Link to={`/${category.sku}`} className="navbar-category">
                        {category.description}
                      </Link>
                      <div className="navbar-category-border"></div>
                    </div>
                  );
                })}
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
                open={menuOpen}
                anchor="top"
                onClose={() => setMenuOpen(false)}
                className="small-navbar-drawer-container"
              >
                <Box
                  sx={{ width: "100vw", height: "100vh", paddingTop: "55px" }}
                  role="presentation"
                  onClick={() => setMenuOpen(false)}
                  className="small-navbar-box-container"
                >
                  {menu == "categories" && <CategoriesMenu />}
                  {menu == "search" && <SearchMenu />}
                  {menu == "cart" && <CartMenu />}
                </Box>
              </Drawer>

              {!(menu == "search" && menuOpen) && (
                <>
                  <Link to="/" className="small-navbar-logo flex-center">
                    <IconButton
                      onClick={() => {
                        setMenu("categories");
                        setMenuOpen(!menuOpen);
                      }}
                    >
                      {!menuOpen ? <MenuIcon /> : <CloseIcon />}
                    </IconButton>
                    HoopHouse
                  </Link>

                  <div className="flex-center">
                    <IconButton
                      onClick={() => {
                        setMenu("search");
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
                      onFocus={() => setSearchInputFocused(true)}
                      onBlur={() => setSearchInputFocused(false)}
                    />
                  </div>
                  <IconButton
                    className="small-navbar-search-close-button"
                    onClick={() => {
                      setMenu("search");
                      setMenuOpen(false);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </div>
            <div className="small-navbar-bottom-container"></div>
          </section>
          <div className="small-navbar-offset"></div>
        </div>
      )}
    </>
  );
}
