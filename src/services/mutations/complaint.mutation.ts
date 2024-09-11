import { AssignComplaintType, CreateComplaintType, UpdateComplaintType } from "@/types/complaint";
import axios from "../axios";
import urls from "../urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComplaintMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["createComplaint"],
    async (complaint: CreateComplaintType) => {
      const res = await axios.post(urls.complaints, complaint);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchAllComplaints"],
        });
        queryClient.invalidateQueries({
          queryKey: ["fetchComplaintSummary"],
        });
      },
    }
  );
}

export const useAssignComplaintMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["assignComplaint", id],
    async (complaint: AssignComplaintType) => {
      const res = await axios.post(urls.assignComplaints(id), complaint);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchComplaint"],
        });

        queryClient.invalidateQueries({
          queryKey: ["fetchAllComplaints"],
        });
      },
    }
  );
}

export const useUpdateComplaintMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(["updateComplaint", id],
    async (complaint: UpdateComplaintType) => {
      const res = await axios.patch(urls.fetchComplaint(id), complaint);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchComplaint"],
        });

        queryClient.invalidateQueries({
          queryKey: ["fetchAllComplaints"],
        });
      },
    }
  )
}

export const useAddComplaintFeedbackMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(["addComplaintFeedback", id],
    async (feedback: any) => {
      const res = await axios.post(urls.addComplaintFeedback(id), feedback);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchAllComplaints"],
        });
      },
    }
  )
}