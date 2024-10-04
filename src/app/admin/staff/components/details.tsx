import { Flex } from "@chakra-ui/react";
import TableDrawer from "@/components/popups/tableDrawer";
import AppButton from "@/components/app-button";
import EditStaff from "./edit-staff";
import ViewStaff from "./view-staff";
import { useDisableStaffMutation, useEnableStaffMutation, useResendStaffWelcomeMutation } from "@/services/mutations/staff.mutation";
import toast from "react-hot-toast";

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
  const { mutateAsync: enableStaff, isLoading: enableLoading } = useEnableStaffMutation(data?.id);
  const { mutateAsync: disableStaff, isLoading: disableLoading } = useDisableStaffMutation(data?.id);
  const { mutateAsync: resendWelcome, isLoading: resendLoading } = useResendStaffWelcomeMutation(data?.id);

  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
  };

  const handleEnableStaff = async () => {
    const result = await enableStaff();
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Staff Enabled successfully!");
        handleClose();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  }
  const handleDisableStaff = async () => {
    const result = await disableStaff();
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Staff Disabled successfully!");
        handleClose();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  }

  const handleResendWelcomeMail = async () => {
    const result = await resendWelcome();
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Welcome Email resent successfully!");
        handleClose();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  }

  return (
    <TableDrawer
      isOpen={isOpen}
      handleClose={handleClose}
      header={isEditing ? "Edit Staff" : "Staff Details"}
      footer={
        <Flex alignItems="center" w="full" justify={"space-between"} gap={4}>
          <AppButton
            w="full"
            loading={resendLoading}
            onClick={handleResendWelcomeMail}
          >
            Resend Welcome Email
          </AppButton>
          {data?.status ? (
            <AppButton
              loading={disableLoading}
              backgroundColor="bg.red"
              hoverBackgroundColor="bg.darkRed"
              onClick={handleDisableStaff}
            >
              Disable
            </AppButton>
          ) : (
            <AppButton
              loading={enableLoading}
              backgroundColor={"bg.green"}
              hoverBackgroundColor={"bg.darkGreen"}
              onClick={handleEnableStaff}
            >
              Enable
            </AppButton>
          )}
        </Flex>
      }
    >
      {isEditing ? (
        <EditStaff data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <ViewStaff data={data} />
      )}
    </TableDrawer>
  );
};

export default Details;
