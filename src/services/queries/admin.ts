import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import urls from "../urls";

export const useFetchAllAdmins = () => {
  return useQuery(["fetchAllAdmins"], async () => {
    const { data } = await axios.get(urls.admin);
    return data.data;
  });
};

export const useFetchAdmin = (id: string) => {
  return useQuery(["fetchAdmin"], async () => {
    const { data } = await axios.get(urls.fetchAdmin(id));
    return data.data;
  });
};
