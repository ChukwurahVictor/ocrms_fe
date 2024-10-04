import { AppStatus } from "@/components/app-status";
import { Flex, Text, Grid } from "@chakra-ui/react";

const ViewDepartment = ({ data }: { data: any }) => {
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
          <Text color="text.blue">Name: </Text>
          <Text>{data?.name}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Description: </Text>
          <Text>{data?.description ?? "N/A"}</Text>
        </Grid>
        <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
          <Text color="text.blue">Status: </Text>
          <AppStatus
            label={data?.status ? "Active" : "Inactive"}
            style={{ width: "6rem" }}
          />
        </Grid>
      </Flex>
    );
}

export default ViewDepartment;
