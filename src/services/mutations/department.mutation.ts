import axios from "../axios";
import urls from "../urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDepartmentType } from "@/types";

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["createDepartment"],
    async (department: CreateDepartmentType) => {
      const res = await axios.post(urls.departments, department);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchAllDepartments"],
        });
      },
    }
  );
};
