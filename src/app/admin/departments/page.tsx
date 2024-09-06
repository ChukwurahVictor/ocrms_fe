"use client";

import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";

import AppTable from "@/components/app-table";
import { Box, Flex, Text, InputGroup, InputLeftElement, Input, Select } from "@chakra-ui/react";
import { useFetchAllDepartments } from "@/services/queries/department";
import AppCard from "@/components/app-card";
import { SearchIcon } from "@chakra-ui/icons";
import { generalFormElementStyle } from "@/utils/styles";
import AppButton from "@/components/app-button";
import Header from "@/components/nav/header";
import Loader from "@/components/loader";
import CreateDepartment from "./components/create-department";
import { useAdminDepartmentsColumns } from "@/components/app-table/columns/admin-departments";
import Details from "./components/details";

const Department = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleAction = (action: string, row: any) => {
    if (action === "View") {
      setIsOpen(true);
      setSelected(row);
    }
  };
   const tableColumns = useAdminDepartmentsColumns(handleAction);

  const { data: departments, isLoading, isSuccess } = useFetchAllDepartments();
  console.log('departments', departments);

  const cardData = [
    {
      title: "Total No. of Departments",
      count: departments?.length,
    },
  ]

  return (
    <Flex flexDir={"column"} w="100%">
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Departments" />
      </Flex>
      <Flex
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        mt={8}
        mb={4}
        px={2}
      >
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={24}
        >
          Department List
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
              Create New Department
            </AppButton>
          </Flex>
          <Flex flexDir={'column'} m={"auto"} w="100%" mt={"1rem"}>
            <AppTable columns={tableColumns} data={departments} pagination />
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

      <CreateDepartment isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
    </Flex>
  );
};

export default Department;
