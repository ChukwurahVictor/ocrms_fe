"use client";

import type { ReactNode } from "react";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";

export type Children = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Children) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <Flex alignItems="center">
      {isLargerThan800 && (
        <Flex
          w={{ base: "60%", md: "45%", "2xl": "60%" }}
          align={"center"}
          bg={"color.lightBlue"}
          h={"120vh"}
          flexDir={"column"}
        >
          <Text color={"white"} fontWeight={600} fontSize={"24"} pt={"5rem"}>
            A better way to manage and Resolve{" "}
          </Text>
          <Text color={"white"} fontWeight={600} fontSize={"24"} pt={"1rem"}>
            Complaints
          </Text>
        </Flex>
      )}
      <Flex
        // width={{ xs: "50%", md: "50%" }}
        justify={"center"}
        alignItems={"center"}
        mx={"auto"}
        h={"120vh"}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthLayout;