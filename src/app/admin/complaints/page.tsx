"use client";

import Action from "@/components/actions";
import AppCard from "@/components/app-card";
import {
  useFetchAllComplaints,
  useFetchComplaintSummary,
} from "@/services/queries/complaint";
import { reformData } from "@/utils";
import { generalFormElementStyle } from "@/utils/styles";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AppInput from "@/components/app-input";
import AppSelect from "@/components/app-select";
import { useAdminComplaintsColumns } from "@/components/app-table/columns/admin-complaints";
import AppDataTable from "@/components/app-table";
import Details from "./components/details";
import Loader from "@/components/loader";
import Header from "@/components/nav/header";
import { useRouter } from "next/navigation";

const tableData = [
  {
    id: 1,
    title: "Complaint A",
    description: "Description A",
    complaintId: "CA123",
  },
  {
    id: 2,
    title: "Complaint B",
    description: "Description B",
    complaintId: "CB456",
  },
  {
    id: 3,
    title: "Complaint C",
    description: "Description C",
    complaintId: "CC789",
  },
];

const Complaints = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [data, setData] = useState(null);

  const { data: complaint, isLoading, isSuccess } = useFetchAllComplaints();
  const complaints = complaint?.pageEdges;

  const { data: complaintSummary, isLoading: loading, isSuccess: success } =
    useFetchComplaintSummary();

  const handleAction = (action: string, row: any) => {
    if (action === "View") {
      router.push(`complaints/${row.id}`)
    }
  };

  const tableColumns = useAdminComplaintsColumns(handleAction);
  return (
    <Flex flexDir={"column"}>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Complaints" />
      </Flex>
      <Flex
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        my={8}
        px={2}
      >
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={24}
        >
          Complaints Order
        </Text>
      </Flex>
      {loading && <Loader />}
      {success && (
        <Flex
          gap={2}
          justifyContent="space-between"
          flexWrap="wrap"
          w="full"
          px={2}
          flexDir={{ base: 'column', md: 'row' }}
        >
          {complaintSummary?.map((item: any, index: number) => (
            <AppCard key={index} title={item.status} count={item.count} />
          ))}
        </Flex>
      )}
      <Box my="2rem" px={2}>
        <AppDataTable
          columns={tableColumns}
          data={complaints}
          loading={isLoading}
          pagination
        />
      </Box>
      {/* <Details
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        data={selected}
      /> */}
    </Flex>
  );
};

export default Complaints;
