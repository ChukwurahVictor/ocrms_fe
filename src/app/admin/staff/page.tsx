"use client";

import AppButton from "@/components/app-button";
import AppCard from "@/components/app-card";
import AppDataTable from "@/components/app-table";
import { useAdminStaffColumns } from "@/components/app-table/columns/admin-staff";
import Loader from "@/components/loader";
import Header from "@/components/nav/header";
import { useFetchAllStaff } from "@/services/queries/staff";
import { reformData } from "@/utils";
import { generalFormElementStyle } from "@/utils/styles";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CreateStaff from "./components/create-staff";
import Details from "./components/details";

const Staff = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { data: staff, isLoading, isSuccess } = useFetchAllStaff();

  const cardData = [
    {
      title: "Total No. of Staff",
      count: staff?.length,
    },
  ];

  const handleAction = (action: string, row: any) => {
    if (action === "View") {
      setIsOpen(true);
      setSelected(row);
    }
  };
  const tableColumns = useAdminStaffColumns(handleAction);
  return (
    <Flex flexDir={"column"} w="100%">
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Staff" />
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
          Staff List
        </Text>
      </Flex>
      {isLoading && <Loader />}
      {isSuccess && (
        <Flex w="100%" flexDir={"column"} px={2}>
          <Flex gap={2} alignItems="center" flexWrap="wrap" my={8}>
            {cardData.map((item, index) => (
              <AppCard key={index} title={item.title} count={item.count} />
            ))}
          </Flex>
          <Flex alignItems={"center"} gap={8}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="#525252" />
              </InputLeftElement>
              <Input
                placeholder="Search"
                width={"50%"}
                style={{ ...generalFormElementStyle }}
                _placeholder={{
                  fontSize: "12px",
                  color: "#A8A8A8",
                  pl: "2rem",
                }}
                type="search"
                pl="4rem"
              />
            </InputGroup>
            <AppButton onClick={() => setIsAddOpen(true)}>
              Create New Staff
            </AppButton>
          </Flex>
          <Flex flexDir={'column'} m={"auto"} w="100%" mt={"1rem"}>
            <AppDataTable columns={tableColumns} data={staff} pagination/>
          </Flex>
        </Flex>
      )}

      <Details
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        data={selected}
      />
      <CreateStaff isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
    </Flex>
  );
};

export default Staff;
