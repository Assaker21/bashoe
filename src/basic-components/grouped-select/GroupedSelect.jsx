import ListSubheader from "@mui/material/ListSubheader";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function GroupedSelect({ allValues, values, setValues }) {
  const [displayValue, setDisplayValue] = React.useState([]);

  React.useEffect(() => {
    const value = values.map(({ itemVariants }) => {
      return itemVariants.map(({ description }) => description);
    });

    setDisplayValue(value.filter((value) => value.length !== 0));
  }, [values]);

  return (
    <div>
      <FormControl sx={{ mt: 0.5, minWidth: 120, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Variants</InputLabel>

        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          label="Variants"
          multiple
          fullWidth
          value={displayValue}
          onChange={() => {}}
          input={<OutlinedInput label="Variants" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          variant="filled"
        >
          {allValues.map((value, valueIndex) => {
            const answer = values[valueIndex];
            return [
              <ListSubheader key={valueIndex + "-header"}>
                <Checkbox
                  checked={
                    value.itemVariants.length === answer.itemVariants.length
                  }
                  indeterminate={
                    value.itemVariants.length !== answer.itemVariants.length &&
                    answer.itemVariants.length !== 0
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (!checked) {
                      const newValues = [...values];
                      newValues[valueIndex].itemVariants = [];
                      setValues(newValues);
                    } else {
                      const newValues = [...values];
                      newValues[valueIndex].itemVariants = value.itemVariants;
                      setValues(newValues);
                    }
                  }}
                />
                {value.description}
              </ListSubheader>,
              ...value.itemVariants.map(({ id, description }) => (
                <MenuItem key={description + id} value={id}>
                  &nbsp;&nbsp;
                  <Checkbox
                    checked={
                      answer.itemVariants.findIndex(
                        (variant) => variant.id == id
                      ) !== -1
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (!checked) {
                        const newValues = [...values];

                        newValues[valueIndex].itemVariants =
                          answer.itemVariants.filter((itemVariant) => {
                            return itemVariant.id !== id;
                          });
                        setValues(newValues);
                      } else {
                        const newValues = [...values];
                        newValues[valueIndex].itemVariants.push({
                          id,
                          description,
                        });
                        setValues(newValues);
                      }
                    }}
                  />
                  <ListItemText primary={description} />
                </MenuItem>
              )),
            ];
          })}
        </Select>
      </FormControl>
    </div>
  );
}
