'use client';

import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
} from '@chakra-ui/react';

type PropType = {
  isOpen: boolean;
  handleClose: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  header: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const TableDrawer = ({ isOpen, handleClose, size = 'sm', header, children, footer }: PropType) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => handleClose()}
      returnFocusOnClose={false}
      closeOnOverlayClick={false}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent mt="7vh" p={0}>
        <DrawerCloseButton size="sm" bg="#DE0D0D" color="white" borderRadius="4rem" />
        <DrawerHeader fontWeight={600} color="text.blue" fontSize="1.2rem">
          {header}
        </DrawerHeader>

        <DrawerBody p={0}>{children}</DrawerBody>

        {footer && <DrawerFooter w="full" px={"1.5rem"}>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default TableDrawer;
