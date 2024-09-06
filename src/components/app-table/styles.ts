import { TableStyles } from "react-data-table-component";

export const customTableStyles: TableStyles = {
  table: {
    style: {
      height: "fit-content",
    },
  },
  headRow: {
    style: {
      display: "flex",
      gap: ".5rem",
      height: "53px",
      backgroundColor: "#0F62FE",
      padding: "16px 32px",
    },
  },
  headCells: {
    style: {
      padding: "0",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "20px",
      color: "#FFF",
    },
  },
  rows: {
    style: {
      display: "flex",
      gap: "0.5rem",
      padding: "16px 32px",
    },
  },
  cells: {
    style: {
      padding: "0",
      color: "#000000CC",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20.8px",
      minWidth: "unset",
      // overflowX: "auto",
    },
  },
  tableWrapper: {
    style: {
      overflowX: "auto",
    },
  },
};
