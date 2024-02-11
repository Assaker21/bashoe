import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import "./others.page.scss";
import { useNavigate } from "react-router-dom";

const Others = () => {
  const [init, setInit] = useState(null);
  const [categories, setCategories] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    try {
      setLoading(true);

      const values = await Promise.all([
        req.get("/categories"),
        req.get("/settings"),
      ]);

      var { data } = values[0];
      setCategories(data);
      var { data } = values[1];
      setSettings(data);

      setLoading(false);
    } catch (error) {
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  const saveInfo = async () => {
    try {
      setLoading(true);

      const values = await Promise.all([
        req.post("/categories", categories),
        req.post("/settings", settings),
      ]);

      var { data } = values[0];
      setCategories(data);

      var { data } = values[1];
      setSettings(data);

      setLoading(false);
    } catch (error) {
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="other">
        {!loading && (
          <>
            <div className="container">
              <label> Shipping Fee </label>
              <input
                type="number"
                min="0"
                defaultValue={settings.shippingFee}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    shippingFee: Number(e.target.value),
                  });
                }}
              />
            </div>
            <div className="container">
              <label> Categories </label>
              <textarea
                rows={categories.length + 1}
                defaultValue={categories
                  .map((category, index) => {
                    return `${category.description} - ${category._id}${
                      index + 1 == categories.length ? "" : "\n"
                    }`;
                  })
                  .join("")}
                onChange={(e) => {
                  setCategories(
                    e.target.value
                      .split("\n")
                      .map((v) => {
                        if (v.split(" - ")[0] !== "") {
                          if (v.split(" - ")[1]) {
                            return {
                              _id: v.split(" - ")[1],
                              description: v.split(" - ")[0],
                            };
                          } else {
                            return {
                              description: v.split(" - ")[0],
                            };
                          }
                        }
                      })
                      .filter((e) => e)
                  );
                }}
              ></textarea>
            </div>

            <button
              className="save-button"
              onClick={() => {
                saveInfo();
              }}
            >
              Save
            </button>
          </>
        )}

        {loading && <>Loading...</>}
      </div>
    </>
  );
};

export default Others;
