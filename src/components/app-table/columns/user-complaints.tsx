"use client";

import { useMemo } from "react";
import { TableColumn } from "react-data-table-component";
import Action from "@/components/actions";
import { AppStatus } from "@/components/app-status";

type PropType = {
  handleAction: (_action: string, _row: any) => void;
};

export const useUserComplaintsColumns = (
  handleAction: PropType["handleAction"]
) => {
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        name: "S/N",
        selector: (row, index) => index! + 1,
        width: "3rem",
      },
      {
        name: "Complaint ID",
        selector: row => row?.referenceNo,
        minWidth: "10rem",
      },
      {
        name: "Title",
        selector: row => row?.title,
        minWidth: "15rem",
      },
      {
        name: "Category",
        selector: row => row?.category?.name,
      },
      {
        name: "Status",
        cell: row => <AppStatus label={row?.status} />,
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
