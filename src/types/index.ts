import { BoxProps } from "@chakra-ui/react";
// import { SingleValue } from "chakra-react-select";
import { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

type GetLayoutFunc = (page: ReactElement) => ReactElement;

export type NextPageWithLayout = NextPage & {
  getLayout?: GetLayoutFunc;
  requireAuth?: boolean;
};
export type Children = {
  children: ReactNode;
};
export interface SidebarProps extends BoxProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

// export type SelectorOptionValue = SingleValue<{
//   value?: string;
//   label: string;
// }>;

export type Menu = {
  code: string;
  icon: string;
  id: string;
  label: string;
  moduleId: string;
  path: string;
  sequence: number;
  status: boolean;
  children: Array<Menu> | [];
};

export type CursorType = { cursor: string; isCurrent: boolean; page: number };

export type PageEdge<T> = {
  cursor: string;
  node: T;
};

export type PageCursors = {
  around: CursorType[];
  next: CursorType;
  previous: CursorType;
};

export type DataType<T> = {
  pageCursors: PageCursors;
  pageEdges: PageEdge<T>[];
  totalCount: number;
  uniquePatients?: any;
};

export type QueryParamsType = {
  term?: string;
  status?: boolean;
  size?: number;
  direction?: string;
  memberNo?: string | number;
  cursor?: string;
  mode?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: string;
  departmentId?: string;
  [key: string]: any;
};
export type PrefixParamsType = {
  id: string;
  prefix: string;
  status: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export interface ListProps {
  id: number;
  name: string;
  description: string;
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export type DepartmentType = {
  name: string;
  description?: string;
  // status?: boolean;
};

export type EditDepartmentType = {
  name?: string;
  description?: string;
  status?: boolean;
};

export type CreateDepartmentType = {
  name?: string;
  description?: string;
  // status?: boolean;
};

export type CreateStaffType = {
  firstName: string;
  lastName: string;
  departmentId: string;
  email: string;
};

export type StaffType = {
  firstName: string;
  lastName: string;
  gender?: string;
  status?: boolean;
  department: {
    name: string;
  };
};

export type CreateAdminType = {
 firstName: string;
  lastName: string;
  email: string;
}

export type CategoryType = {
  name: string;
  description?: string;
}

export type UpdatePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type ComplaintFeedbackType = {
  rating?: string;
  comment: string;
}
