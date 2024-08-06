import "./navigation.component.scss";
import { useEffect, useState } from "react";
import routes from "../../routes";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navigation() {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <nav>
      <h1>Hoop house admin</h1>
      <ul>
        {routes.map((route) => {
          if (route.hidden) return;
          return (
            <li
              key={route.key}
              onClick={() => {
                setSelected(route.key);
                navigate(route.key);
              }}
              className={selected === route.key ? "selected" : ""}
            >
              {route.icon}
              {route.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
