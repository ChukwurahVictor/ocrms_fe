"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FiHome, FiUser, FiBriefcase, FiSettings } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { MdStickyNote2 } from "react-icons/md";
import SideBar from "@/components/nav/sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const userObj =
    typeof window !== "undefined" &&
    JSON.parse(window.sessionStorage.getItem("userData") as string);

  console.log('user', userObj);
  console.log('user', userObj?.userRole);
  
  const UserNavItems: any[] = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: FiHome,
    },
    {
      label: "Complaints",
      path: "/admin/complaints",
      icon: MdStickyNote2,
    },
    {
      label: "Departments",
      path: "/admin/departments",
      icon: FiUser,
    },
    {
      label: "Staff",
      path: "/admin/staff",
      icon: FiUser,
    },
    ...(userObj?.user.userRole === "Admin" // TO DO: change to super admin
      ? [
          {
            label: "Admin",
            path: "/admin/admins",
            icon: FiUser,
          },
        ]
      : []),
    {
      label: "Categories",
      path: "/admin/category",
      icon: FiSettings,
    },
    {
      label: "Notifications",
      path: "/admin/notifications",
      icon: IoNotifications,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: FiSettings,
    },
  ];
  // if (userObj.role === "Admin") {
  //   UserNavItems.push({
  //     label: "Admin",
  //     path: "/admin/admin",
  //     icon: FiUser,
  //   });
  // }

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
