"use client";

import { useMemo } from "react";
import { TableColumn } from "react-data-table-component";
import Action from "@/components/actions";

type PropType = {
  handleAction: (_action: string, _row: any) => void;
};

export const useAdminDepartmentsColumns = (
  handleAction: PropType["handleAction"]
) => {
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "S/N",
        selector: (row, index) => index! + 1,
      },
      {
        name: "Name",
        selector: row => row?.name,
      },
      {
        name: "Status",
        selector: row => row?.status ? 'Active' : 'Inactive',
      },
      {
        name: "Actions",
        cell: row => (
          <Action
            actions={[
              {
                label: "View",
                cta: () => handleAction("View", row),
              },
            ]}
          />
        ),
      },
    ],
    [handleAction]
  );

  return columns;
};
