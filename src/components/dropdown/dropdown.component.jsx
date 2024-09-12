import { useEffect } from "react";
import "./dropdown.component.scss";
import { Dropdown } from "primereact/dropdown";
import { TreeSelect } from "primereact/treeselect";

export default function DropDown({
  values,
  value,
  setValue,
  placeholder,
  optionLabel,
  optionGroupLabel,
  optionGroupChildren,
  cascade,
  label,
  ...rest
}) {
  if (cascade) {
    return (
      <div className="input-container">
        <label>{label}</label>
        <TreeSelect
          value={value}
          onChange={(e) => setValue(e.value)}
          options={values}
          metaKeySelection={false}
          selectionMode="multiple"
          display="chip"
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  } else {
    return (
      <div className="input-container">
        <label>{label}</label>
        <Dropdown
          options={values}
          value={value}
          onChange={(e) => setValue(e.value)}
          optionLabel={optionLabel}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
}
