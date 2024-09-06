"use client";

import {
  Flex,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppStatus } from "@/components/app-status";
import Loader from "@/components/loader";
import { useFetchComplaint } from "@/services/queries/complaint";
import Header from "@/components/nav/header";
import Image from "next/image";
import AppButton from "@/components/app-button";
import AssignComplaint from "./components/assign-complaints";
import UpdateComplaint from "./components/update-complaint";

const ViewComplaint = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const id = pathname!.replace("/admin/complaints/", "");
  const { data, isLoading, isSuccess } = useFetchComplaint(id);

  return (
    <>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Complaints" />
      </Flex>
      <Flex my={5} px={2} justify={"space-between"} alignItems={"center"}>
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={24}
        >
          View Complaint
        </Text>
        <Flex gap={2}>
          <AppButton width="10px" onClick={() => setIsUpdateOpen(true)}>
            Update
          </AppButton>
          <AppButton
            width="10px"
            backgroundColor={"green"}
            hoverBackgroundColor={"green"}
            onClick={() => setIsAssignOpen(true)}
          >
            Assign
          </AppButton>
          <AppButton
            width="10px"
            backgroundColor={"red"}
            hoverBackgroundColor={"red"}
            onClick={() => router.back()}
          >
            Back
          </AppButton>
        </Flex>
      </Flex>
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <Tabs py={5}>
            <TabList>
              <Tab>Details</Tab>
              <Tab>Media</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex
                  gap={6}
                  flexDir="column"
                  px="1.5rem"
                  my="1rem"
                  fontSize="1.1rem"
                  fontWeight={500}
                >
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Requested By: </Text>
                    <Text>{data?.title}</Text>
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Complaint ID: </Text>
                    <Text>{data?.referenceNo}</Text>
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Title: </Text>
                    <Text>{data?.title}</Text>
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Priority: </Text>
                    <Text>{data?.priorityLevel}</Text>
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Category: </Text>
                    <Text>{data?.category?.name}</Text>
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Status: </Text>
                    <AppStatus label={data?.status} />
                    {/* <Text>{data?.status}</Text> */}
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text color="text.blue">Assigned To: </Text>
                    <Text>{data?.department?.name ?? "N/A"}</Text>
                  </Grid>
                  <Grid
                    templateColumns="1fr 2fr"
                    gap="1rem"
                    lineHeight={"1.5rem"}
                  >
                    <Text color="text.blue">Description: </Text>
                    <Text>{data?.description}</Text>
                  </Grid>
                </Flex>
              </TabPanel>
              <TabPanel>
                {/* <Flex> */}
                {data?.images?.length ? (
                  data?.images?.map((image: any, index: number) => (
                    <Image
                      key={index}
                      src={image.image}
                      alt="logo"
                      width={800}
                      height={800}
                      style={{
                        height: "5rem",
                        width: "5rem",
                        margin: "1rem",
                      }}
                    />
                  ))
                ) : (
                  <p>No Image to display.</p>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
      <AssignComplaint
        complaintId={id}
        isOpen={isAssignOpen}
        setIsOpen={setIsAssignOpen}
      />
      <UpdateComplaint
        complaintId={id}
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
      />
    </>
  );
};

export default ViewComplaint;
