import { Flex, Text } from "@chakra-ui/react";

interface PropType {
  title: string;
  count: number;
}

const AppCard = ({ title, count }: PropType) => {
  const iconSize = 8;

  return (
    <Flex
      borderRadius={0}
      p={4}
      w={{ base: "100%", md: "23%" }}
      h={132}
      flexDir="column"
      gap={8}
      bg="#F4F4F4"
    >
      <Text color="#000000CC" fontSize={14}>
        {title}
      </Text>
      <Text color="#000000CC" fontSize={{ base: 32, md: 64 }}>
        {count}
      </Text>
    </Flex>
  );
};

export default AppCard;
