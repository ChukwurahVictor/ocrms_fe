import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import urls from "../urls";

export const useFetchAllComplaints = () => {
  return useQuery(["fetchAllComplaints"], async () => {
    const { data } = await axios.get(urls.complaints);
    console.log("res", data);
    return data.data;
  });
};

export const useFetchComplaint = (id: string) => {
  return useQuery(["fetchComplaint"], async () => {
    const { data } = await axios.get(urls.fetchComplaint(id));
    console.log("data: ", data);
    return data.data;
  });
};

export const useFetchComplaintSummary = () => {
  return useQuery(["fetchComplaintSummary"], async () => {
    const { data } = await axios.get(urls.fetchComplaintSummary);
    return data.data;
  });
};

export const useFetchFrequentComplaintStats = () => {
  return useQuery(["fetchFrequentComplaintStats"], async () => {
    const { data } = await axios.get(urls.fetchFrequentComplaintStats);
    return data.data;
  });
}

export const useUrgencyLevelComplaintStats = () => {
  return useQuery(["fetchUrgencyLevelComplaintStats"], async () => {
    const { data } = await axios.get(urls.fetchUrgencyLevelStats);
    return data.data;
  });
}

export const useFetchOpenComplaintStats = () => {
  return useQuery(["fetchFetchOpenComplaintStats"], async () => {
    const { data } = await axios.get(urls.fetchOpenComplaintStats);
    return data.data;
  });
}
