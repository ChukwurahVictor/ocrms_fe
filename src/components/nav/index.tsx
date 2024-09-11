'use client';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import AppButton from '@/components/app-button';
import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

// import OctohealthLogo from '/public/octohealth_logo.png';

import SideBar from './sidebar';
import toast from 'react-hot-toast';

const Navbar = ({ isSideBarOpen }: { isSideBarOpen: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    window.sessionStorage.removeItem("userData");
    toast.success("Logout Successful!");
    window.location.href = "auth/login";
  };

  return (
    <Flex as="header" justify="space-between" align={"center"}>
      <Box>
        <Flex direction={"row"} gap={4} align={"center"}>
          {!isSideBarOpen && (
            <Button onClick={onOpen} p={0}>
              <Icon as={GiHamburgerMenu} boxSize={5} />
            </Button>
          )}
          <Link href={"/"}>
            <Image src="" alt="logo" priority />
          </Link>
        </Flex>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent maxW="12rem">
            <DrawerCloseButton size="md" />
            <DrawerBody p="0">
              {/* <SideBar /> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      <Flex display={{ base: "block", lg: "none" }}>
        <Link href="/">
          <Image src="" alt="logo" priority />
        </Link>
      </Flex>
      {/* <Flex gap="4" alignItems="center">
        <Menu>
          <MenuButton as={AppButton} rightIcon={<ChevronDownIcon />}>
            Admin User
          </MenuButton>
          <MenuList shadow="lg" w=".4rem">
            <MenuItem py=".75rem" px=".75rem" as={Flex} align={"center"} justify={"center"}>
              <Link href="#">Change Password</Link>
            </MenuItem>
            <MenuItem
              onClick={() => handleLogout()}
              py=".75rem"
              px=".75rem"
              as={Flex}
              align={"center"}
              justify={"center"}
              mx="auto"
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex> */}
    </Flex>
  );
};

export default Navbar;
