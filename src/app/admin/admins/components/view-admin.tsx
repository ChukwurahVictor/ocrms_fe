import { StaffType } from '@/types';
import { Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react'

const ViewStaff = ({ data }: { data: StaffType }) => {
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
        <Text color="text.blue">Fist Name: </Text>
        <Text>{data?.firstName ?? "N/A"}</Text>
      </Grid>
      <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
        <Text color="text.blue">Last Name: </Text>
        <Text>{data?.lastName ?? "N/A"}</Text>
      </Grid>
      <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
        <Text color="text.blue">Status: </Text>
        <Text>{data?.status ? "Active" : "Inactive"}</Text>
      </Grid>
    </Flex>
  );
};

export default ViewStaff