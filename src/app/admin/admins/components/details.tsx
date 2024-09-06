import { Flex } from "@chakra-ui/react";
import TableDrawer from "@/components/popups/tableDrawer";
import AppButton from "@/components/app-button";
// import EditStaff from "./edit-staff";
import ViewStaff from "./view-admin";

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
      header={isEditing ? "Edit Staff" : "Staff Details"}
      footer={
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          w="full"
        >
          {/* <AppButton w="full" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Update details" : "Edit"}
          </AppButton> */}
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
      {/*isEditing ? <EditStaff data={data} /> : */<ViewStaff data={data} />}
    </TableDrawer>
  );
};

export default Details;
