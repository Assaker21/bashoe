import Category from "../category/category.component";

import { TextField } from "@mui/material";

import "./category-list.component.scss";

export default function CategoryList({ value, onChange }) {
  return (
    <div className="category-list">
      <TextField
        fullWidth
        size="small"
        value={value?.description}
        onChange={(e) => {
          onChange({ ...value, description: e.target.value });
        }}
      />
      <div className="category-list-items">
        {value.content.map((item, index) => (
          <Category
            edit
            value={item}
            onChange={(newValue) => {
              const newContent = [...value.content];
              newContent[index] = newValue;
              onChange({ ...value, content: newContent });
            }}
          />
        ))}
      </div>
      <span className="category-list-title">{value?.description}</span>
      <div className="category-list-items">
        {value.content.map((item) => (
          <Category value={item} />
        ))}
      </div>
    </div>
  );
}
