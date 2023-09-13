import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import "./others.page.scss";
import { useNavigate } from "react-router-dom";

const Others = () => {
  const [init, setInit] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    try {
      setLoading(true);
      const res = await req.get("/init");
      setInit(res.data);
      setLoading(false);
    } catch (error) {
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  const saveInfo = async () => {
    try {
      setLoading(true);
      const res = await req.post("/init", {
        ...init
      });
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
                defaultValue={init.shippingFee}
                onChange={(e) => {
                  setInit((i) => {
                    const newInit = { ...i };
                    newInit.shippingFee = Number(e.target.value);
                    return newInit;
                  });
                }}
              />
            </div>
            <div className="container">
              <label> Categories </label>
              <textarea
                rows={init.cats.length + 5}
                defaultValue={init.cats.toString().replaceAll(",", "\n")}
                onChange={(e) => {
                  setInit((i) => {
                    const newInit = { ...i };
                    newInit.cats = e.target.value.trim().split("\n");
                    return newInit;
                  });
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
