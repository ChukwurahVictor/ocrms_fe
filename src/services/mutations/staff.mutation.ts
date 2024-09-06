import axios from "../axios";
import urls from "../urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateStaffType } from "@/types";

export const useCreateStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["createStaff"],
    async (staff: CreateStaffType) => {
      const res = await axios.post(urls.staff, staff);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchAllStaff"],
        });
      },
    }
  );
};
