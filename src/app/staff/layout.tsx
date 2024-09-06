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

import SideBar from "@/components/nav/sidebar";


const StaffLayout = ({ children }: { children: ReactNode }) => {
    const StaffNavItems: any[] = [
      {
        label: "Dashboard",
        path: "/staff/dashboard",
        icon: RxDashboard,
      },
      {
        label: "My Account",
        path: "/staff/my-account",
        icon: MdStickyNote2,
      },
      // {
      //   label: "Notifications",
      //   path: "/staff/notifications",
      //   icon: IoNotifications,
      // },
      {
        label: "Settings",
        path: "/staff/settings",
        icon: FiSettings,
      },
    ];

    const [navSize, changeNavSize] = useState("large");

    const childrenStyle = {
      marginLeft: navSize === "large" ? "200px" : "73px",
      transition: "margin 0.3s ease",
    };
    return (
      <Flex minH="100vh" bg="#fff" direction="row">
        <Flex w="100%">
          <SideBar
            navItems={StaffNavItems}
            navSize={navSize}
            changeNavSize={changeNavSize}
          />
          <Box style={childrenStyle} w={navSize == "small" ? "100%" : "83%"}>
            {children}
          </Box>
        </Flex>
      </Flex>
    );
};

export default StaffLayout;
