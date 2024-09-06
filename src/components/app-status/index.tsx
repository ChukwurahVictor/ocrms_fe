import { Statuses } from "@/utils/enums";
import { Tag, TagLabel, Text } from "@chakra-ui/react";
import React from "react";

type TagProps = {
  label: string;
  style?: React.CSSProperties;
  text?: string;
};

const AppStatus = ({ label, style, text }: TagProps) => {
  const backgrounds: Record<string, string> = {
    [Statuses.Pending]: "#FDF1C5",
    [Statuses.Resolved]: "#D0FED5",
    [Statuses.InProgress]: "#D0FED5",
    [Statuses.Closed]: "#F5C9C9",
    [Statuses.Archived]: "#FDF1C5",
    [Statuses.Draft]: "#CEE4E2A6",
  };
  const colors: Record<string, string> = {
    [Statuses.Pending]: "#A96C34",
    [Statuses.Resolved]: "#0C7BAA",
    [Statuses.InProgress]: "#0C7BAA",
    [Statuses.Closed]: "#FF0808",
    [Statuses.Archived]: "#A96C34",
    [Statuses.Draft]: "#006458",
  };
  return (
    // <Tag
    //   style={style}
    //   size={"xs"}
    //   borderRadius="0"
    //   variant="solid"
    //   color={colors[label]}
    //   background={backgrounds[label]}
    // >
    //   <TagLabel p={".7rem"} fontSize={"1.2rem"}>
    //     {text ? text : label}
    //   </TagLabel>
    // </Tag>
    <Text color={colors[label]}>{text ? text : label}</Text>
  );
};

export { AppStatus };
