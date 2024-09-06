import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import urls from "../urls";

export const useFetchAllStaff = () => {
  return useQuery(["fetchAllStaff"], async () => {
    const { data } = await axios.get(urls.staff);
    return data.data;
  });
};

export const useFetchStaff = (id: string) => {
  return useQuery(["fetchStaff"], async () => {
    const { data } = await axios.get(urls.fetchStaff(id));
    return data.data;
  });
};
