import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.component.jsx";
import req from "../../utils/req.js";
import "./home.page.scss";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ query, setQuery }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const cats = JSON.parse(localStorage.getItem("cats"));

  var search = query.get("search");
  var cat = query.get("cat");

  const getItems = async () => {
    try {
      setLoading(true);
      var res;

      search = query.get("search");
      cat = query.get("cat");

      if (search != null && cat != null && cat != "All") {
        console.log("both");
        res = await req.get(`/items?search=${search}&cat=${cat}`);
      } else if (search != null) {
        console.log("search");
        res = await req.get(`/items?search=${search}`);
      } else if (cat != null && cat != "All") {
        console.log("cat");
        res = await req.get(`/items?cat=${cat}`);
      } else {
        console.log("none");
        res = await req.get(`/items`);
      }

      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log("API ERROR: " + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
    console.log("query changed");
  }, [query]);

  const navigate = useNavigate();

  return (
    <>
      <div className="home">
        {search && search != "" && <>Searching for {`"${search}"`}</>}
        <div className="filter-sort">
          <div className="filter">
            <span>Filter by Category: </span>
            <select
              name="cat"
              onChange={(e) => {
                navigate("/?cat=" + e.target.value + (search ? "&search=" + search : ""));
                //setCat(e.target.value);
                setQuery(new URLSearchParams(window.location.search));
              }}
              defaultValue={cat}
            >
              <option value="All">All</option>
              {cats.map((cat) => {
                return (
                  <option key={"_" + cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          {/*<div className="sort">
            <span>Sort by: </span>
            <select name="sortby">
              <option value="Relevance">Relevance</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
            </div>*/}
        </div>
        {
          <div className="items">
            {!loading && items != null && items.length > 0 && items.map((item) => <Item key={item._id} item={item} />)}
            {!loading && (items == null || items.length == 0) && <>We could not find anything. Try something else.</>}
            {loading && <>Loading...</>}
          </div>
        }
      </div>
    </>
  );
};
export default Home;
