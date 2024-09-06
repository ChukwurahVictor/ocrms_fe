"use client";

import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { IoNotifications } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { MdStickyNote2 } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

import Navbar from "@/components/nav";
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
    // {
    //   label: "Notifications",
    //   path: "/users/notifications",
    //   icon: IoNotifications,
    // },
    {
      label: "Settings",
      path: "/users/settings",
      icon: FiSettings,
    },
  ];

  const [navSize, changeNavSize] = useState("large");

  const childrenStyle = {
    marginLeft: navSize === "large" ? "200px" : "100px",
    // transition: "margin 0.3s ease",
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
