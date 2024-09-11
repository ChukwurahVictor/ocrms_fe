import { AppStatus } from "@/components/app-status";
import {
  Flex,
  Text,
  Grid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Image from "next/image";

const ViewComplaint = ({ data }: { data: any }) => {
  return (
    <>
      <Tabs py={5}>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Media</Tab>
          {data?.status == "Resolved" && <Tab>Feedbacks</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              gap={6}
              flexDir="column"
              px="1.5rem"
              my="1rem"
              fontSize="1rem"
              fontWeight={500}
            >
              <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
                <Text color="text.blue">Complaint ID: </Text>
                <Text>{data?.referenceNo}</Text>
              </Grid>
              <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
                <Text color="text.blue">Title: </Text>
                <Text>{data?.title}</Text>
              </Grid>
              <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
                <Text color="text.blue">Category: </Text>
                <Text>{data?.category?.name}</Text>
              </Grid>
              <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
                <Text color="text.blue">Status: </Text>
                <AppStatus label={data?.status} style={{ width: "7rem"}} />
              </Grid>
              <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
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
            <Flex
              gap={6}
              flexDir="column"
              px="1.5rem"
              my="1rem"
              fontSize="1.1rem"
              fontWeight={500}
            >
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
            </Flex>
          </TabPanel>
          {data?.status == "Resolved" && (
            <TabPanel>
              <Flex
                gap={6}
                flexDir="column"
                px="1.5rem"
                my="1rem"
                fontSize="1rem"
                fontWeight={500}
              >
                {data?.feedback?.length ? (
                  data?.feedback?.map((feedback: any) => (
                    <Grid
                      templateColumns="1fr 2fr"
                      key={feedback?.id}
                      mt={1}
                    >
                      <Text color="text.blue">{feedback?.user?.firstName}: </Text>
                      <Text lineHeight={'1.2'}>{feedback.comment}</Text>
                    </Grid>
                  ))
                ) : (
                  <p>No Feedback to display.</p>
                )}
              </Flex>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ViewComplaint;
