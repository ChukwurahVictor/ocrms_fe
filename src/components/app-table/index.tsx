"use client";

import DataTable, { TableColumn, TableProps } from "react-data-table-component";
import { customTableStyles } from "./styles";
import Loader from "../loader";

type PropType<T> = {
  columns: TableColumn<T>[];
  loading?: boolean;
} & TableProps<T>;

const AppDataTable = <T,>({ columns, loading, ...props }: PropType<T>) => {
  return (
    <DataTable
      style={{ overflowX: "auto" }}
      responsive={false}
      columns={columns}
      customStyles={customTableStyles}
      {...props}
      progressComponent={<Loader />}
      progressPending={loading}
    />
  );
};

export default AppDataTable;
