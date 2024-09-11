import { Flex } from "@chakra-ui/react";
import TableDrawer from "@/components/popups/tableDrawer";
import AppButton from "@/components/app-button";
import ViewCategory from "./view-category";

type PropType = {
  isOpen: boolean;
  isEditing: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
};

const Details = ({
  isOpen,
  setIsOpen,
  isEditing,
  setIsEditing,
  data,
}: PropType) => {
  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
  };

  return (
    <TableDrawer
      isOpen={isOpen}
      handleClose={handleClose}
      header={isEditing ? "Edit Category" : "Category Details"}
      footer={
        <Flex alignItems="center" w="full">
          <AppButton
            w="full"
            backgroundColor="bg.red"
            hoverBackgroundColor="bg.darkRed"
            onClick={() => handleClose()}
          >
            Close
          </AppButton>
        </Flex>
      }
    >
      {<ViewCategory data={data} />}
    </TableDrawer>
  );
};

export default Details;
