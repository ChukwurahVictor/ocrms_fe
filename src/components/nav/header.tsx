import { Box, Text } from '@chakra-ui/react';
import React from 'react'

type PropType = {
    text: string;
}
const Header = ({ text } : PropType) => {
  return (
    <Box py={7} bg="white" px={2} /*borderBottom="6px solid #F4F4F4"*/>
      <Text color="#000000CC" fontSize={24} fontWeight={500}>
        {text}
      </Text>
    </Box>
  );
}

export default Header