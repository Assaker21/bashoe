import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function SelectItem({ items, value, onChange }) {
  return (
    <TextField
      select
      value={value}
      onChange={(value) => {
        onChange(JSON.parse(value.target.value));
      }}
      label=""
      size="small"
    >
      {items
        .map((item) => ({ value: JSON.stringify(item), label: item.name }))
        .map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
}
