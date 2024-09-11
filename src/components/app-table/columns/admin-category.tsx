"use client";

import { useMemo } from "react";
import { TableColumn } from "react-data-table-component";
import Action from "@/components/actions";
import { AppStatus } from "@/components/app-status";
import moment from "moment";

type PropType = {
  handleAction: (_action: string, _row: any) => void;
};

export const useAdminCategoryColumns = (
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
        name: "Name",
        selector: row => row?.name,
        width: "10rem",
      },
      {
        name: "Description",
        cell: row => row?.description ?? "N/A",
      },
      {
        name: "Created On",
        cell: row => moment(row?.createdAt).format("DD MM YYYY"),
        width: "8rem",
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
        width: "5rem",
        center: true,
      },
    ],
    [handleAction]
  );

  return columns;
};
