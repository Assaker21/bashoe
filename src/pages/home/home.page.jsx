import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.component.jsx";
import req from "../../utils/req.js";
import "./home.page.scss";
import { useNavigate } from "react-router-dom";

const Home = ({ query, setQuery }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState(null);

  useEffect(() => {
    /*window.addEventListener("cats&shipping", () => {
      setCats(JSON.parse(localStorage.getItem("cats")));
    });*/
    getCategories();
  }, []);

  const navigate = useNavigate();
  if (query.get("id")) {
    navigate("/item?id=" + query.get("id"));
  } else if (query.get("cart")) {
    navigate("/cart");
  } else if (query.get("checkout")) {
    navigate("/checkout");
  }

  var search = query.get("search");
  var cat = query.get("cat");

  const getItems = async () => {
    try {
      setLoading(true);
      var res;

      search = query.get("search");
      cat = query.get("cat");

      if (search != null && cat != null && cat != "All") {
        res = await req.get(`/items?search=${search}&cat=${cat}`);
      } else if (search != null) {
        res = await req.get(`/items?search=${search}`);
      } else if (cat != null && cat != "All") {
        res = await req.get(`/items?cat=${cat}`);
      } else {
        res = await req.get(`/items`);
      }

      const newItems = res.data;
      newItems.map((item, index) => {
        if (!item?.cat) return;
        console.log("CAT: " + item.cat);
        newItems[index].cat = getCategoryById(item.cat);
      });
      setItems(newItems);
      setLoading(false);
    } catch (error) {
      console.log("API ERROR: " + error);
      setLoading(false);
    }
  };

  const getCategories = async () => {
    const { data } = await req.get("/categories");
    setCats(data);
  };

  const getCategoryById = (id) => {
    for (var i = 0; i < cats.length; i++) {
      if (cats[i]._id == id) {
        return cats[i].description;
      }
    }
  };

  useEffect(() => {
    if (cats) getItems();
  }, [query, cats]);

  return (
    <>
      <div className="home">
        {search && search != "" && <>Searching for {`"${search}"`}</>}
        {cats && (
          <div className="filter-sort">
            <div className="filter">
              <span>Filter by Category: </span>
              <select
                name="cat"
                onChange={(e) => {
                  navigate(
                    "/?cat=" +
                      e.target.value +
                      (search ? "&search=" + search : "")
                  );
                  //setCat(e.target.value);
                  setQuery(new URLSearchParams(window.location.search));
                }}
                defaultValue={cat}
              >
                <option value="All">All</option>
                {cats.map((cat) => {
                  return (
                    <option key={"_" + cat._id} value={cat._id}>
                      {cat.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
        {
          <div className="items">
            {!loading &&
              items != null &&
              items.length > 0 &&
              items.map((item) => <Item key={item._id} item={item} />)}
            {!loading && (items == null || items.length == 0) && (
              <>We could not find anything. Try something else.</>
            )}
            {loading && <>Loading...</>}
          </div>
        }
      </div>
    </>
  );
};
export default Home;
