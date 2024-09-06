'use client';

import AppButton from "@/components/app-button";
import AppCard from "@/components/app-card";
import AppInput from "@/components/app-input";
import AppSelect from "@/components/app-select";
import AppDataTable from "@/components/app-table";
import { useUserComplaintsColumns } from "@/components/app-table/columns/user-complaints";
import Loader from "@/components/loader";
import Header from "@/components/nav/header";
import { useFetchAllComplaints, useFetchComplaintSummary } from "@/services/queries/complaint";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const StaffDashboard = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selected, setSelected] = useState<any>(null);

  const userObj =
    typeof window !== "undefined" &&
    JSON.parse(window.sessionStorage.getItem("userData") as string);

  const { data: complaint, isLoading, isSuccess } = useFetchAllComplaints();
  const complaints = complaint?.pageEdges;

  const {
    data: complaintSummary,
    isLoading: loading,
    isSuccess: success,
  } = useFetchComplaintSummary();

  const handleAction = (action: string, row: any) => {
    if (action === "View") {
      router.push(`dashboard/complaints/${row.id}`);
    }
  };
  const tableColumns = useUserComplaintsColumns(handleAction);
  return (
    <Flex flexDir={"column"}>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Dashboard" />
      </Flex>
      <Flex my={8} px={2}>
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={24}
        >
          Welcome, {userObj?.user?.firstName ?? "N/A"}
        </Text>
      </Flex>
      {loading && <Loader />}
      {success && (
        <Flex
          gap={2}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          w="full"
          px={2}
        >
          {complaintSummary?.map((item: any, index: number) => (
            <AppCard key={index} title={item.status} count={item.count} />
          ))}
        </Flex>
      )}
      <Flex
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        my={8}
        px={2}
      >
        <AppInput
          id="admin-complaints_search"
          placeholder="What are you looking for today?"
          type="search"
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
      <Box my="2rem" px={2}>
        <AppDataTable
          columns={tableColumns}
          data={complaints}
          loading={isLoading}
          pagination
        />
      </Box>
    </Flex>
  );
};

export default StaffDashboard;
