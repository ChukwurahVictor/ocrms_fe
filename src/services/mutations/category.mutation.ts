import axios from "../axios";
import urls from "../urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "@/types";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["createCategory"],
    async (category: CategoryType) => {
      const res = await axios.post(urls.category, category);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["fetchAllCategory"],
        });
      },
    }
  );
};
