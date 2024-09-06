"use client";

import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

import Navbar from "../nav";
import SideBar from "../nav/sidebar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex minH="100vh" flexDir={"row"} gap={4}>
      <Flex>
        <SideBar />
        {children}
      </Flex>
    </Flex>
  );
};

export default ProtectedLayout;
