import AppCard from '@/components/app-card';
import Loader from '@/components/loader';
import { useFetchComplaintSummary } from '@/services/queries/complaint';
import { ComplaintSummaryType } from '@/types/complaint';
import { Flex } from '@chakra-ui/react';
import React from 'react'

const ComplaintSummary = () => {
    const { data: complaintSummary, isLoading, isSuccess } =
      useFetchComplaintSummary();
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Flex gap={2} alignItems="center" flexWrap="wrap" my={8}>
          {complaintSummary?.map((item: ComplaintSummaryType, index: number) => (
            <AppCard key={index} title={item.status} count={item.count} />
          ))}
        </Flex>
      )}
    </>
  );
}

export default ComplaintSummary