import Dashboard from "../../pages/dashboard/dashboard.page";
import App from "../app/app.layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../../routes";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {routes.map((route) => {
            return (
              <Route
                key={route.key}
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
}
