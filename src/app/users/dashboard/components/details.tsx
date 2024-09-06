import { Flex } from "@chakra-ui/react";
import TableDrawer from "@/components/popups/tableDrawer";
import AppButton from "@/components/app-button";
import ViewComplaint from "./view-complaint";
import AddFeedback from "./add-feedback";

type PropType = {
  isOpen: boolean;
  isEditing: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
};

const Details = ({ isOpen, setIsOpen, isEditing, setIsEditing, data }: PropType) => {
    const handleClose = () => {
        setIsOpen(false);
        setIsEditing(false);
    }

    return (
      <TableDrawer
        isOpen={isOpen}
        handleClose={handleClose}
        header={isEditing ? "Add Feedback" : "Complaint Details"}
        footer={
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            w="full"
          >
            {/* <AppButton w="full" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Update details" : "Edit"}</AppButton> */}
            {data?.status == "Resolved" && !isEditing ? (
              <AppButton w="full" onClick={() => setIsEditing(!isEditing)}>
                Give Feedback
              </AppButton>
            ) : null}
            {!isEditing && (
              <AppButton
                w="full"
                backgroundColor="bg.red"
                hoverBackgroundColor="bg.darkRed"
                onClick={() => handleClose()}
              >
                Close
              </AppButton>
            )}
          </Flex>
        }
      >
        {isEditing ? (
          <AddFeedback
            data={data}
            setIsOpen={setIsOpen}
            setIsEditing={setIsEditing}
          />
        ) : (
          <ViewComplaint data={data} />
        )}
      </TableDrawer>
    );
}

export default Details;
