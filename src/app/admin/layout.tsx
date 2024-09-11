"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FiUser, FiSettings } from "react-icons/fi";
import { MdDashboard, MdStickyNote2, MdGroups2 } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import SideBar from "@/components/nav/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const userObj =
    typeof window !== "undefined" &&
    JSON.parse(window.sessionStorage.getItem("userData") as string);
  
  const UserNavItems: any[] = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: MdDashboard,
    },
    {
      label: "Complaints",
      path: "/admin/complaints",
      icon: MdStickyNote2,
    },
    {
      label: "Departments",
      path: "/admin/departments",
      icon: MdGroups2,
    },
    {
      label: "Staff",
      path: "/admin/staff",
      icon: FiUser,
    },
    ...(userObj?.user.userRole === "Super_Admin"
      ? [
          {
            label: "Admin",
            path: "/admin/admins",
            icon: RiAdminFill,
          },
        ]
      : []),
    {
      label: "Categories",
      path: "/admin/category",
      icon: BiCategory,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: FiSettings,
    },
  ];

  const [navSize, changeNavSize] = useState("large");

  const childrenStyle = {
    marginLeft: navSize === "large" ? "208px" : "73px",
    transition: "margin 0.3s ease",
  };
  return (
    <Flex>
      <Box as="aside">
        <SideBar navItems={UserNavItems} navSize={navSize} changeNavSize={changeNavSize} />
      </Box>
       <Box as="main" style={childrenStyle} w={navSize == 'small' ? '95%': '83%'} alignItems={'center'}>
          {children}
       </Box>
    </Flex>
  );
};

export default AdminLayout;
