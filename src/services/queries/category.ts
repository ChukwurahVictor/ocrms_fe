import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import urls from "../urls";

export const useFetchAllCategory = () => {
  return useQuery(["fetchAllCategory"], async () => {
    const { data } = await axios.get(urls.category);
    console.log("res", data);
    return data.data;
  });
};
