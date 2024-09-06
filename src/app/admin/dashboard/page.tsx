"use client";

import AppCard from "@/components/app-card";
import AppInput from "@/components/app-input";
import AppSelect from "@/components/app-select";
import CustomAreaChart from "@/components/charts/area";
import CustomBarChart from "@/components/charts/bar";
import CustomPieChart from "@/components/charts/pie";
import Loader from "@/components/loader";
import Header from "@/components/nav/header";
import {
  useFetchComplaintSummary,
  useFetchFrequentComplaintStats,
  useFetchOpenComplaintStats,
  useUrgencyLevelComplaintStats,
} from "@/services/queries/complaint";
import { Flex, Box, Text } from "@chakra-ui/react";

const AdminDashboard = () => {
  const userObj =
    typeof window !== "undefined" &&
    JSON.parse(window.sessionStorage.getItem("userData") as string);

  const {
    data: complaintSummary,
    isLoading: loading,
    isSuccess: success,
  } = useFetchComplaintSummary();

  const {
    data: frequentComplaints,
    isLoading,
    isSuccess,
  } = useFetchFrequentComplaintStats();
  console.log("frequentComplaints", frequentComplaints);
  
  const {
    data: urgencyLevelComplaints,
    isLoading: urgencyLoading,
    isSuccess: urgencySuccess,
  } = useUrgencyLevelComplaintStats();
  console.log("urgencyLevelComplaints", urgencyLevelComplaints);
  
  const {
    data: openComplaints,
    isLoading: openLoading,
    isSuccess: openSuccess,
  } = useFetchOpenComplaintStats();
  console.log("OpenComplaints", openComplaints);
  
  return (
    <Flex flexDir={"column"} px={2}>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Dashboard" />
      </Flex>
      <Flex
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        my={8}
      >
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={24}
        >
          Welcome, {userObj?.user?.firstName ?? "N/A"}
        </Text>
        <AppSelect
          placeholder="Last 7 Days"
          options={[
            { label: "Last 7 Days", value: "last-7-days" },
            { label: "Last 30 Days", value: "last-30-days" },
            { label: "Last 90 Days", value: "last-90-days" },
            { label: "Last 180 Days", value: "last-180-days" },
          ]}
        />
        <AppSelect
          placeholder="Filter"
          options={[
            { label: "Open", value: "open" },
            { label: "In Progress", value: "in-progress" },
            { label: "On Hold", value: "on-hold" },
          ]}
        />
      </Flex>
      <Flex
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        w="full"
      >
        {loading && <Loader />}
        {success && (
          <>
            {complaintSummary?.map((item: any, index: number) => (
              <AppCard key={index} title={item.status} count={item.count} />
            ))}
          </>
        )}
      </Flex>
      <Flex
        gap={2}
        alignItems="center"
        justify={"space-between"}
        my="2rem"
        flexWrap="wrap"
      >
        {openLoading && <Loader />}
        {openSuccess && (
          <CustomAreaChart
            data={openComplaints}
            w={"60%"}
            title="Total Open complaints"
          />
        )}
        {isLoading && <Loader />}
        {isSuccess && (
          <CustomBarChart
            data={frequentComplaints}
            w={"35%"}
            title="Most Frequent Complaint"
          />
        )}
      </Flex>
      <Flex
        gap={2}
        alignItems="center"
        // justify={'space-evenly'}
        mb="2rem"
        flexWrap="wrap"
      >
        {urgencyLoading && <Loader />}
        {urgencySuccess && 
          <>
            <CustomPieChart
              data={urgencyLevelComplaints}
              w={"46%"}
              title="Urgency Level Report"
            />
            <CustomPieChart
              data={urgencyLevelComplaints}
              w={"46%"}
              title="Urgency Level Report"
            />
          </>
        }
      </Flex>
    </Flex>
  );
};

export default AdminDashboard;
