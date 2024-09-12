import { useEffect, useState } from "react";
import DropDown from "../../dropdown/dropdown.component";
import Input from "../../input/input.component";
import productsApi from "../../../api/products.api";
import { useDebounce } from "primereact/hooks";

export default function ItemsDropDown({ initialValue, onChange }) {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [search, debouncedValue, setSearch] = useDebounce("", 400);

  const handleSearch = async (query) => {
    if (!query || query == "") return setValues([]);

    setLoading(true);

    const { ok, data } = await productsApi.findMany({ search: query });
    if (ok) {
      setValues(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    console.log("OLD VALUE: ", value);
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    console.log("VALUE: ", value);
    onChange({ value });
  }, [value]);

  return (
    <DropDown
      filter={true}
      filterTemplate={
        <div style={{ margin: "8px" }}>
          <Input
            label="Search for products"
            placeholder={"Enter product name..."}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      }
      emptyMessage={
        <span style={{ padding: "8px" }}>
          {!debouncedValue
            ? "No results found. Enter product name to search"
            : loading
            ? "Loading..."
            : "No results found."}
        </span>
      }
      optionLabel="name"
      loading={loading}
      values={values}
      value={value}
      setValue={setValue}
      placeholder={"Items"}
      label={"Items"}
      className="w-full md:w-14rem"
    />
  );
}
