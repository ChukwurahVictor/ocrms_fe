import axios from "../axios";
import urls from "../urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAdminType } from "@/types";

export const useCreateAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["createAdmin"],
    async (admin: CreateAdminType) => {
      const res = await axios.post(urls.admin, admin);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchAllAdmins"],
        });
      },
    }
  );
};
