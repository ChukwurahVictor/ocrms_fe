import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import urls from "../urls";

export const useFetchAllDepartments = () => {
  return useQuery(["fetchAllDepartments"], async () => {
    const { data } = await axios.get(urls.departments);
    return data.data;
  });
};

export const useFetchDepartment = (id: string) => {
    return useQuery(
      ["fetchDepartment", id],
      async () => {
        const { data } = await axios.get(urls.fetchDepartments(id));
        return data.data;
      },
      { enabled: !!id }
    );
}
