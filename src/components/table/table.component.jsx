import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";

export default function DenseTable({ columns, rows, loading, variant }) {
  return (
    <TableContainer
      sx={{ position: "relative", width: "100%" }}
      component={Paper}
      variant={variant || "outlined"}
    >
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              return (
                <TableCell
                  key={"Column: " + index}
                  align={column.align}
                  width={column.width || "auto"}
                  sx={{ fontWeight: "bold" }}
                >
                  {column.description}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            var isCollapsible = columns[0].accessor === "collapsible";

            const value = [
              <TableRow
                key={"Row: " + index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column, columnIndex) => {
                  return (
                    <TableCell
                      scope="row"
                      component="th"
                      key={"Row: " + index + " - Column: " + columnIndex}
                      align={column.align}
                    >
                      {row[column.accessor]}
                    </TableCell>
                  );
                })}
              </TableRow>,
            ];

            if (isCollapsible) {
              value.push(
                <TableCell
                  colSpan={columns.length}
                  sx={{
                    p: 0,
                    m: 0,
                    pl: "60px",
                    border: row.collapsed ? null : "none",
                  }}
                >
                  <Collapse
                    sx={{ width: "100%" }}
                    in={row.collapsed}
                    key={"Collapse: " + index}
                  >
                    {row.collapsibleContent}
                  </Collapse>
                </TableCell>
              );
            }
            return value;
          })}
        </TableBody>
      </Table>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffffaa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </TableContainer>
  );
}
