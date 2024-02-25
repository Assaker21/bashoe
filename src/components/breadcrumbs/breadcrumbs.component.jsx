import "./breadcrumbs.component.scss";

import { Link } from "react-router-dom";
import React from "react";

export default function Breadcrumbs({ items }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => {
        return (
          <React.Fragment key={`breadcrumb: ${index}`}>
            <span
              className={`breadcrumb ${
                index == items.length - 1 && "selected"
              }`}
            >
              <Link className="breadcrumb-link" to={item.to}>
                {item.name}
              </Link>
            </span>
            {index != items.length - 1 && (
              <span className="breadcrumb delimiter">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
