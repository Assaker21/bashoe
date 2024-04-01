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
            console.log("VALUE: ", values);
            return [
              <ListSubheader key={valueIndex + "-header"}>
                <Checkbox
                  checked={
                    value.itemVariants.length === answer?.itemVariants.length
                  }
                  indeterminate={
                    value.itemVariants.length !== answer?.itemVariants.length &&
                    answer?.itemVariants.length !== 0
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
              ...value.itemVariants.map((itemVariant) => (
                <MenuItem
                  key={itemVariant.description + itemVariant.id}
                  value={itemVariant.id}
                >
                  &nbsp;&nbsp;
                  <Checkbox
                    checked={
                      answer?.itemVariants.findIndex(
                        (variant) => variant.id == itemVariant.id
                      ) !== -1
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (!checked) {
                        const newValues = [...values];

                        newValues[valueIndex].itemVariants =
                          answer?.itemVariants.filter((_itemVariant) => {
                            return _itemVariant.id !== itemVariant.id;
                          });
                        setValues(newValues);
                      } else {
                        const newValues = [...values];
                        newValues[valueIndex].itemVariants.push(itemVariant);
                        setValues(newValues);
                      }
                    }}
                  />
                  <ListItemText primary={itemVariant.description} />
                </MenuItem>
              )),
            ];
          })}
        </Select>
      </FormControl>
    </div>
  );
}
