"use client";

import AppCard from "@/components/app-card";
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
import { Flex, Text } from "@chakra-ui/react";

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
  
  const {
    data: urgencyLevelComplaints,
    isLoading: urgencyLoading,
    isSuccess: urgencySuccess,
  } = useUrgencyLevelComplaintStats();
  
  const {
    data: openComplaints,
    isLoading: openLoading,
    isSuccess: openSuccess,
  } = useFetchOpenComplaintStats();
  
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
