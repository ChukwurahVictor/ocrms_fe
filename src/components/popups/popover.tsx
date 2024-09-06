"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverBody,
  Flex,
} from "@chakra-ui/react";

type PropType = {
  actions: {
    action: string;
  }[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: (_name: string) => void;
  handleClose: () => void;
};

const CustomPopover = ({
  actions,
  isOpen,
  setIsOpen,
  handleClick,
  handleClose,
}: PropType) => {
  return (
    <Popover
      isLazy
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={() => handleClose()}
      placement="auto-end"
    >
      <PopoverContent
        bgColor="bg.lightD"
        maxW="fit-content"
        w="full"
        borderRadius="0"
      >
        <PopoverBody
          as={Flex}
          flexDir="column"
          align="flex-start"
          py={0}
          className="divide-y divide-bg-light"
        >
          {actions?.length > 0 &&
            actions?.map((action, index) => (
              <Button
                key={`${action?.action}-${index}`}
                variant="unstyled"
                w="100%"
                onClick={() => {
                  handleClick(action?.action);
                  setIsOpen(false);
                }}
                fontWeight={400}
                fontSize={"0.875rem"}
                color={"text.ash"}
                textAlign="left"
                className="font-sans"
              >
                {action?.action}
              </Button>
            ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
