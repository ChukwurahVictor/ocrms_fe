'use client'
import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { NavbarLink } from "./navbar-link";
import { IconType } from "react-icons";

type PropType = {
  navItems: {
    label: string;
    path: string;
    icon?: IconType;
  }[];
  navSize: string;
  changeNavSize: React.Dispatch<React.SetStateAction<string>>;
};

const SideBar = ({ navItems, navSize, changeNavSize }: PropType) => {
  const [user, setUser] = useState({
    firstName: null, lastName: null, userRole: null
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = window.sessionStorage.getItem("userData");
       if (userData) {
         setUser(JSON.parse(userData).user);
       }
    }
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("userData");
  }

  return (
    <Flex
      h="100vh"
      pos="fixed"
      backgroundColor={"#F4F4F4"}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      gap=".5rem"
      justifyContent="space-between"
      pr=".5rem"
    >
      <Flex
        bg="white"
        p="5%"
        maxH={70}
        h="100%"
        pos="relative"
        alignItems="center"
      >
        <Text color="#000000CC" fontWeight={500} fontSize={24} display={navSize == 'small' ? 'none' : 'block'}>
          Logo
        </Text>
        <IconButton
          aria-label="icon"
          background="none"
          pos="absolute"
          size={navSize == 'small' ? 'lg' : 'sm'}
          // top="0"
          right="2"
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
      </Flex>
      <Flex
        flexDir="column"
        w="100%"
        h="100%"
        flexGrow={1}
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
        bg="white"
        gap="1rem"
        py="2rem"
      >
        {navItems?.map((item, index) => {
          return (
            <NavbarLink
              key={index}
              href={item.path}
              icon={item.icon}
              tabName={navSize == "small" ? null! : item.label}
              isMobile={navSize === "small"}
              size={navSize}
              onclose={() => {
                if (navSize == "small") changeNavSize("large");
                else changeNavSize("small");
              }}
            />
          );
        })}
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        bg="white"
      >
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={2}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h6" size="sm" mb=".25rem">
              {user?.firstName + " " + user?.lastName}
            </Heading>
            <Text color="gray" fontSize={10}>
              {user?.userRole}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;