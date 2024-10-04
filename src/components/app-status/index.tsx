import { Statuses } from "@/utils/enums";
import { Box, Tag, TagLabel, Text } from "@chakra-ui/react";
import React from "react";

type TagProps = {
  label: string;
  style?: React.CSSProperties;
  text?: string;
};

const AppStatus = ({ label, style, text }: TagProps) => {
  const backgrounds: Record<string, string> = {
    [Statuses.Pending]: "#FFF5CC",
    [Statuses.Resolved]: "#D1FADF",
    [Statuses.InProgress]: "#CCE5FF",
    [Statuses.Closed]: "#F8D7DA",
    [Statuses.Archived]: "#E0E0E0",
    [Statuses.Draft]: "#E8F5E9",
    [Statuses.Escalated]: "#FFE4E4",
    [Statuses.Active]: "#D1FADF",
    [Statuses.InActive]: "#F8D7DA",
  };

  const colors: Record<string, string> = {
    [Statuses.Pending]: "#A67C00",
    [Statuses.Resolved]: "#2E7D32",
    [Statuses.InProgress]: "#004085",
    [Statuses.Closed]: "#721C24",
    [Statuses.Archived]: "#757575",
    [Statuses.Draft]: "#388E3C",
    [Statuses.Escalated]: "#D32F2F",
    [Statuses.Active]: "#2E7D32",
    [Statuses.InActive]: "#721C24",
  };
  const formatLabel = (label: string) => {
    if (label === Statuses.InProgress) {
      return "In progress";
    }
    return label;
  };
  return (
    <Tag
      style={style}
      size={"xs"}
      borderRadius="0"
      variant="solid"
      color={colors[label]}
      background={backgrounds[label]}
      pl={2}
    >
      <Box
        as="span"
        display="inline-block"
        width="0.5rem"
        height="0.5rem"
        backgroundColor={colors[label]}
        borderRadius="50%"
        marginRight="0.3rem"
      />
      <TagLabel p={".6rem"} fontSize={".8rem"}>
        {text ? text : formatLabel(label)}
      </TagLabel>
    </Tag>
    // <Text color={colors[label]}>{text ? text : label}</Text>
  );
};

export { AppStatus };
