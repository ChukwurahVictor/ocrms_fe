"use client";

import AppButton from "@/components/app-button";
import Header from "@/components/nav/header";
import { useFetchUserProfile } from "@/services/queries/user";
import { Avatar, Box, Flex, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import EditDetails from "./components/edit-details";
import Loader from "@/components/loader";
import Image from "next/image";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isSuccess } = useFetchUserProfile();
  return (
    <>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="My Account" />
      </Flex>
      <Flex my={8} px={2}>
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={24}
        >
          User
        </Text>
      </Flex>
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <Flex justifyContent={"space-between"} my={8} px={2}>
            <Flex gap={4} alignItems={"center"}>
              {data?.profileImgUrl ? 
              <Image
                src={data?.profileImgUrl}
                alt="logo"
                width={300}
                height={300}
                style={{
                  height: '4rem',
                  width: '4rem',
                }}
              />: 
                <Avatar></Avatar>
                }
                
              <Flex flexDir={"column"} gap={2}>
                <Text fontWeight={500} fontSize={20}>
                  {data?.firstName + ' ' + data?.lastName}
                </Text>
                <Text>{data?.email}</Text>
              </Flex>
            </Flex>
            <AppButton
              width="16px"
              onClick={() => {
                console.log('Clicked');
                setIsOpen(true);
              }}
            >
              Edit
            </AppButton>
          </Flex>
          <Flex mt={"4rem"} flexDir={"column"} px={2}>
            <Text
              whiteSpace="nowrap"
              color="#000000CC"
              fontWeight={500}
              fontSize={24}
            >
              Personal Information
            </Text>
            <Flex my={"4rem"} flexDir={"column"} gap={24}>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <Text
                    color={"typography.gray"}
                    variant="label"
                    fontWeight="semiBold"
                  >
                    First Name
                  </Text>
                  <Text variant="heading6" fontWeight="medium">
                    {data?.firstName ?? 'N/A'}
                  </Text>
                </Box>
                <Box>
                  <Text
                    color={"typography.gray"}
                    variant="label"
                    fontWeight="semiBold"
                  >
                    Last Name
                  </Text>
                  <Text variant="heading6" fontWeight="medium">
                    {data?.lastName ?? 'N/A'}
                  </Text>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <Text
                    color={"typography.gray"}
                    variant="label"
                    fontWeight="semiBold"
                  >
                    Email
                  </Text>
                  <Text variant="heading6" fontWeight="medium">
                    {data?.email}
                  </Text>
                </Box>
                <Box>
                  <Text
                    color={"typography.gray"}
                    variant="label"
                    fontWeight="semiBold"
                  >
                    Phone
                  </Text>
                  <Text variant="heading6" fontWeight="medium">
                    {data?.phone ?? 'N/A'}
                  </Text>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <Text
                    color={"typography.gray"}
                    variant="label"
                    fontWeight="semiBold"
                  >
                    Date of Birth
                  </Text>
                  <Text variant="heading6" fontWeight="medium">
                    {data?.dateOfBirth ?? 'N/A'}
                  </Text>
                </Box>
                <Box>
                  <Text
                    color={"typography.gray"}
                    variant="label"
                    fontWeight="semiBold"
                  >
                    Gender
                  </Text>
                  <Text variant="heading6" fontWeight="medium">
                    {data?.gender ?? 'N/A'}
                  </Text>
                </Box>
              </SimpleGrid>
            </Flex>
          </Flex>
        </>
      )}
      <EditDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
      />
    </>
  );
};

export default Account;
