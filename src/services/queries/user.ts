import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import urls from "../urls";

// export const useFetchUserProfile = () => {
//   return useQuery(["fetchUserProfile"], async () => {
//     const { data } = await axios.get(urls.profile);
//     return data.data;
//   });
// };

export const useFetchUserProfile = () => {
  return useQuery(["fetchUserProfile"], async () => {
    const { data } = await axios.get(urls.profile);
    return data.data;
  });
};