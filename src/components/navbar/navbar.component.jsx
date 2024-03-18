import "./navbar.style.scss";

import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../contexts/context.jsx";
import BasicPopover from "../../basic-components/basic-popover/basic-popover.component.jsx";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useScreenDimensions from "../../custom-hooks/useScreenDimensions.jsx";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Line from "../../basic-components/line/line.component.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";

function CategoriesMenu({ setMenuOpen }) {
  const { categories } = useGeneralContext();

  return (
    <div className="small-navbar-categories-container">
      {categories?.map((category) => (
        <>
          <Link
            to={`/${category.sku}`}
            onClick={() => setMenuOpen(false)}
            className="small-navbar-category"
          >
            {category.description}
            <ArrowForwardIcon />
          </Link>
          <Line />
        </>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { categories } = useGeneralContext();
  const { width, height } = useScreenDimensions();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState("");

  return (
    <>
      {width > 800 && (
        <div className="navbar">
          <section className="navbar-container">
            <div className="navbar-top-container">
              <Link to="/" className="navbar-logo">
                HoopHouseAdmin
              </Link>
              <div className="navbar-buttons">
                <Link to="/settings" className="navbar-button">
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </Link>
                <Link to="/orders" className="navbar-button">
                  <IconButton>
                    <AttachMoneyIcon />
                  </IconButton>
                </Link>
                <Link to="/new" className="navbar-button">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Link>
              </div>
            </div>
            <div className="navbar-bottom-container">
              <div className="navbar-categories">
                {[{ sku: "all", description: "All" }, ...categories].map(
                  (category, index) => {
                    return (
                      <div
                        className="navbar-category-container"
                        key={`Category ${category.sku}`}
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
                  sx={{
                    width: "100vw",
                    height: "calc(100vh - 55px)",
                    paddingTop: "55px",
                  }}
                  role="presentation"
                  onClick={() => setMenuOpen(true)}
                  className="small-navbar-box-container"
                >
                  {menu == "categories" && (
                    <CategoriesMenu setMenuOpen={setMenuOpen} />
                  )}
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
                    HoopHouseAdmin
                  </Link>
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
