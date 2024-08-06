import { useState } from "react";
import "./tabber.component.scss";

export default function Tabber({ tabs, defaultSelected, lockTabs }) {
  const [selected, setSelected] = useState(defaultSelected || 0);

  return (
    <div className="tabber">
      <header className="tabber">
        {tabs?.map((tab, index) => (
          <button
            className={`${
              selected == index ||
              lockTabs.findIndex((value) => value == index) !== -1
                ? "disabled"
                : ""
            }`}
            key={index}
            onClick={() => {
              setSelected(index);
            }}
          >
            {tab.header}
          </button>
        ))}
      </header>
      <main>{tabs[selected].content}</main>
    </div>
  );
}
