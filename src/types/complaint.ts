export interface CreateComplaintType {
  title: string;
  description: string;
  categoryId: string;
  image?: string | any;
}

export type ComplaintType = {
  title: string;
};

export type ComplaintSummaryType = {
  status: string;
  count: number;
};

export type AssignComplaintType = {
  departmentId: string;
}

export type UpdateComplaintType = {
  categoryId?: string;
  status?: string;
  priorityLevel?: string;
}