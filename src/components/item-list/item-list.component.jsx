import Item from "../item/item.component";
import TextField from "@mui/material/TextField";
import "./item-list.component.scss";

export default function ItemList({ value, onChange }) {
  return (
    <div className="item-list">
      <TextField
        className="item-list-title"
        value={value.description}
        size="small"
        onChange={(e) => {
          const newValue = { ...value };
          newValue.description = e.target.value;
          onChange(newValue);
        }}
      />
      <div className="item-list-items">
        {value.content.map((_, index) => (
          <Item
            edit
            item={value.content[index]}
            onChange={(newValue) => {
              const newContent = [...value.content];
              newContent[index] = newValue;
              onChange({ ...value, content: newContent });
            }}
          />
        ))}
      </div>
      <span className="item-list-title">{value.description}</span>
      <div className="item-list-items">
        {value.content.map((_, index) => (
          <Item item={value.content[index]} />
        ))}
      </div>
    </div>
  );
}
