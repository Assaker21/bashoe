import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "./datatable.component.css";
import "./datatable.component.scss";
import { useEffect, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import { buildConfirmation } from "../dialogs/confirmation-dialog.component";

export default function Datatable({
  name,
  columns,
  data,
  setData,
  reorderableRows,
  selectable,
  loading,
  buttons,
  ...rest
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selected, setSelected] = useState(null);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="datatable-header">
      {selectable && (
        <span className="selection-counter">
          {selected?.length || 0} / {data?.length || 0}
        </span>
      )}
      <input
        className="search-input compact"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Search for anything..."
      />
      {buttons?.create && (
        <button className="primary" onClick={buttons.create.onClick}>
          Add new {name.toLowerCase()}
        </button>
      )}
      {buttons?.remove && (
        <button
          className={`error ${selected?.length > 0 ? "" : "disabled"}`}
          onClick={() => {
            buildConfirmation(
              `Delete selected ${name.toLowerCase()}s?`,
              <span>
                {`Are you sure you want to delete all selected items?`}
                <br />
                <br />
                {`${selected.length} ${name.toLowerCase()}${
                  selected?.length === 1 ? "" : "s"
                } will be deleted.`}
              </span>,
              () => {
                buttons.remove.onClick(selected);
              },
              () => {
                console.log("Rejected!");
              }
            );
          }}
        >
          Delete {selected?.length || 0} {name.toLowerCase()}
          {selected?.length === 1 ? "" : "s"}
        </button>
      )}
      {buttons?.enable && (
        <button
          className={`primary ${selected?.length > 0 ? "" : "disabled"}`}
          onClick={() => {
            buttons.enable.onClick(selected);
          }}
        >
          Enable {selected?.length || 0} {name.toLowerCase()}
          {selected?.length === 1 ? "" : "s"}
        </button>
      )}

      {buttons?.disable && (
        <button
          className={`error ${selected?.length > 0 ? "" : "disabled"}`}
          onClick={() => {
            buttons.disable.onClick(selected);
          }}
        >
          Disable {selected?.length || 0} {name.toLowerCase()}
          {selected?.length === 1 ? "" : "s"}
        </button>
      )}

      {buttons?.save && (
        <button className="primary" onClick={buttons.save.onClick}>
          Save
        </button>
      )}
      {buttons?.edit && (
        <button
          className={`primary ${selected?.length == 1 ? "" : "disabled"}`}
          onClick={buttons.edit.onClick}
        >
          Edit
        </button>
      )}
    </div>
  );

  return (
    <DataTable
      loading={Boolean(loading)}
      size="medium"
      filters={filters}
      dataKey="id"
      reorderableRows={reorderableRows}
      removableSort
      value={data}
      tableStyle={{ minWidth: "15rem", opacity: loading ? 0.3 : 1 }}
      header={header}
      onRowReorder={(e) => setData(e.value)}
      selectionMode="checkbox"
      selection={selected}
      onSelectionChange={(e) => setSelected(e.value)}
      {...rest}
    >
      {selectable && (
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
      )}
      {reorderableRows && <Column rowReorder style={{ width: "3rem" }} />}

      {columns.map((column, index) => (
        <Column {...column} key={"Column: " + index}></Column>
      ))}
    </DataTable>
  );
}
