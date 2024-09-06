'use client';

import ActionsButton from "@/components/actions";
import AppCard from "@/components/app-card";
import Card from "@/components/dashboard/card";
import Header from "@/components/nav/header";
import { generalFormElementStyle } from "@/utils/styles";
import { SearchIcon } from "@chakra-ui/icons";
import {  Flex, Box, Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useFetchAllComplaints, useFetchComplaintSummary } from "@/services/queries/complaint";
import ComplaintSummary from "./components/summary";
import { reformData } from "@/utils";
import AppDataTable from "@/components/app-table";
import Loader from "@/components/loader";
import AppInput from "@/components/app-input";
import AppSelect from "@/components/app-select";
import Details from "./components/details";
import AppButton from "@/components/app-button";
import { useRouter } from "next/navigation";
import { useUserComplaintsColumns } from "@/components/app-table/columns/user-complaints";

const Dashboard = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const userObj =
    typeof window !== 'undefined' &&
    JSON.parse(window.sessionStorage.getItem('userData') as string);

   const { data: complaint, isLoading, isSuccess } = useFetchAllComplaints();
   const complaints = complaint?.pageEdges;

   const {
     data: complaintSummary,
     isLoading: loading,
     isSuccess: success,
   } = useFetchComplaintSummary();

    const handleAction = (action: string, row: any) => {
      if (action === "View") {
        setIsOpen(true);
        setSelected(row);
      }
    };

  const tableColumns = useUserComplaintsColumns(handleAction);
  return (
    <>
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
        <AppButton onClick={() => {
          router.push('/users/dashboard/create-complaint')
        }} width={'27rem'}>Create New Complaint</AppButton>
      </Flex>
      <Box my="2rem" px={2}>
        <AppDataTable
          columns={tableColumns}
          data={complaints}
          loading={isLoading}
          pagination
        />
      </Box>
      <Details
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        data={selected}
      />
    </>
  );
}

export default Dashboard;
