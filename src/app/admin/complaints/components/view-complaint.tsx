import { AppStatus } from "@/components/app-status";
import { Flex, Text, Grid } from "@chakra-ui/react";

const ViewComplaint = ({ data }: { data: any }) => {
    return (
      <Flex
        gap={6}
        flexDir="column"
        px="1.5rem"
        my="1rem"
        fontSize="1.1rem"
        fontWeight={500}
      >
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Requested By: </Text>
          <Text>{data?.title}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Complaint ID: </Text>
          <Text>{data?.referenceNo}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Title: </Text>
          <Text>{data?.title}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Priority: </Text>
          <Text>{data?.priorityLevel}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Category: </Text>
          <Text>{data?.category?.name}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Status: </Text>
          <AppStatus label={data?.status} />
          {/* <Text>{data?.status}</Text> */}
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Assigned To: </Text>
          <Text>{data?.department?.name ?? "N/A"}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" gap="1rem" lineHeight={"1.5rem"}>
          <Text color="text.blue">Description: </Text>
          <Text>{data?.description}</Text>
        </Grid>
      </Flex>
    );
}

export default ViewComplaint;
