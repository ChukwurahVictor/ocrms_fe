import { CategoryType } from "@/types";
import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

const ViewCategory = ({ data }: { data: CategoryType }) => {
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
        <Text>{data?.name ?? "N/A"}</Text>
      </Grid>
      <Grid templateColumns="1fr 2fr" gap="1rem">
        <Text color="text.blue">Last Name: </Text>
        <Text fontSize={"1rem"} lineHeight={"1.2"}>{data?.description ?? "N/A"}</Text>
      </Grid>
    </Flex>
  );
};

export default ViewCategory;
