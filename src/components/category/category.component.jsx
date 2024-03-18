import "./category.component.scss";

import { TextField } from "@mui/material";

export default function Category({ value, edit, onChange }) {
  return (
    <div className="list-category">
      {!edit && (
        <>
          <img className="list-category-image" src={value?.url} />
          <span className="list-category-name">{value?.description}</span>
        </>
      )}
      {edit && (
        <>
          <TextField
            label="Description"
            size="small"
            fullWidth
            value={value.description}
            onChange={(e) => {
              const newValue = { ...value };
              newValue.description = e.target.value;
              onChange(newValue);
            }}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Url"
            size="small"
            fullWidth
            value={value.url}
            onChange={(e) => {
              const newValue = { ...value };
              newValue.url = e.target.value;
              onChange(newValue);
            }}
          />
        </>
      )}
    </div>
  );
}
