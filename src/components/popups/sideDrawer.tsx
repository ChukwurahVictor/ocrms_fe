'use client';

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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  header: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const SideDrawer = ({ isOpen, setIsOpen, size = 'md', header, children, footer }: PropType) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      returnFocusOnClose={false}
      closeOnOverlayClick={false}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent mt="7vh" p={0}>
        <DrawerCloseButton size="sm" />
        <DrawerHeader bg="bg.lightD" fontWeight={500} color="text.dark" fontSize="1.1rem">
          {header}
        </DrawerHeader>

        <DrawerBody p={0}>{children}</DrawerBody>

        {footer && <DrawerFooter p={0}>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
