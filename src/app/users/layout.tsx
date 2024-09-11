"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { MdStickyNote2 } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

import SideBar from "@/components/nav/sidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const UserNavItems: any[] = [
    {
      label: "Dashboard",
      path: "/users/dashboard",
      icon: MdDashboard,
    },
    {
      label: "My Account",
      path: "/users/my-account",
      icon: MdStickyNote2,
    },
    {
      label: "Settings",
      path: "/users/settings",
      icon: FiSettings,
    },
  ];

  const [navSize, changeNavSize] = useState("large");

  const childrenStyle = {
    marginLeft: navSize === "large" ? "200px" : "100px",
  };

  return (
    <Flex minH="100vh" bg="#fff" direction="row">
      <Box as="aside">
        <SideBar
          navItems={UserNavItems}
          navSize={navSize}
          changeNavSize={changeNavSize}
        />
      </Box>
      <Box
        as="main"
        style={childrenStyle}
        w={navSize == "small" ? "100%" : "85%"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default UserLayout;
