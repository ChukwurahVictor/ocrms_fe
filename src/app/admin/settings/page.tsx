"use client";

import AppButton from "@/components/app-button";
import Header from "@/components/nav/header";
import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ChangePassword from "./components/change-password";

const AdminSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Settings" />
      </Flex>
      <Flex
        justifyContent={"space-between"}
        my={8}
        alignItems={"center"}
        px={2}
      >
        <Text
          whiteSpace="nowrap"
          color="#000000CC"
          fontWeight={500}
          fontSize={18}
        >
          Change Password
        </Text>
        <AppButton onClick={() => setIsOpen(true)}>Edit</AppButton>
      </Flex>
      <ChangePassword isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AdminSettings;
