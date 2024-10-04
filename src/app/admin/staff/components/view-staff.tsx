import { AppStatus } from '@/components/app-status';
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
        <Text>{data?.firstName}</Text>
      </Grid>
      <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
        <Text color="text.blue">Last Name: </Text>
        <Text>{data?.lastName ?? "N/A"}</Text>
      </Grid>
      <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
        <Text color="text.blue">Email: </Text>
        <Text>{data?.email ?? "N/A"}</Text>
      </Grid>
      <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
        <Text color="text.blue">Status: </Text>
        <AppStatus label={data?.status ? "Active" : "Inactive"} style={{ width: '6rem'}} />
      </Grid>
      <Grid templateColumns="1fr 2fr" alignItems="center" gap="1rem">
        <Text color="text.blue">Department: </Text>
        <Text>{data?.department?.name}</Text>
      </Grid>
    </Flex>
  );
};

export default ViewStaff