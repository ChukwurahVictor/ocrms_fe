import { Button, Text } from "@chakra-ui/react";

export enum Actions {
  View = "View",
  Edit = "Edit",
  Delete = "Delete",
}

export interface ActionType {
  label?: `${Actions}` | string;
  loading?: boolean;
  cta?: () => void;
  status?: boolean | string;
  disabled?: boolean;
  infoText?: string;
}

interface ActionsPropsType {
  actions: ActionType[];
}

const Action = ({ actions }: ActionsPropsType) => {
  return (
    <>
      {actions?.map((action, idx) => (
        <Button
          key={idx}
          onClick={action.cta}
          size="sm"
          bg="#0F62FE"
          _hover={"brand.dark"}
          color="white"
          px="5px"
          py="4px"
          fontWeight={400}
          fontSize={14}
          isLoading={action.loading}
          disabled={action.disabled}
          mr={2}
        >
          {action.label}
        </Button>
      ))}
    </>
  );
};

export default Action;
