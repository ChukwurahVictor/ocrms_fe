import { Flex, Text } from '@chakra-ui/react';
import React from 'react'
import toast from 'react-hot-toast';
import { MdLogout } from "react-icons/md";

type PropType = {
    text: string;
}
const Header = ({ text } : PropType) => {
  const handleLogout = () => {
    window.sessionStorage.removeItem("userData");
    toast.success("Sign out Successful!");
    window.location.href = "/auth/login";
  };
  return (
    <Flex
      py={5}
      bg="white"
      px={2}
      alignItems={"center"}
      justify={"space-between"}
      w="100%"
    >
      <Text color="#000000CC" fontSize={24} fontWeight={500}>
        {text}
      </Text>

      <MdLogout
        size={"2rem"}
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
        title='Sign out'
      />
    </Flex>
  );
}

export default Header