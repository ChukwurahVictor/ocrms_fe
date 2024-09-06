import Header from '@/components/nav/header'
import { Flex } from '@chakra-ui/react'
import React from 'react'

const Notifications = () => {
  return (
    <>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Notifications" />
      </Flex>
    </>
  )
}

export default Notifications