import AppButton from "@/components/app-button";
import AppSelect from "@/components/app-select";
import { useGenericForm } from "@/hooks/form";
import { UpdateComplaintSchema } from "@/schema";
import { useUpdateComplaintMutation } from "@/services/mutations/complaint.mutation";
import { UpdateComplaintType } from "@/types/complaint";
import { Statuses } from "@/utils/enums";
import { Flex } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";

type PropType = {
  data?: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateComplaint = ({ data, setIsOpen, setIsEditing }: PropType) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useGenericForm<UpdateComplaintType>(UpdateComplaintSchema, {
    status: "",
  });

  const { mutateAsync: updateComplaint, isLoading } =
    useUpdateComplaintMutation(data?.id);

  const cancel = () => {
    reset();
    setIsEditing(false);
    setIsOpen(false);
  };

  const onSubmit = async (formData: any) => {
    const result = await updateComplaint(formData);

    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.data?.message || "Complaint updated successfully!");
        setIsOpen(false);
        setIsEditing(false);
        reset();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  };
  return (
    <Flex direction="column" h="100vh" p="1rem">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Flex
          gap={6}
          flexDir="column"
          px="1.5rem"
          my="1rem"
          fontSize="1.1rem"
          fontWeight={500}
          flexGrow={1}
        >
          <AppSelect
            label="Status"
            placeholder="Select Status"
            options={[
              { label: Statuses.Closed, value: Statuses.Closed },
              { label: Statuses.Archived, value: Statuses.Archived },
            ]}
            errorMessage={errors.status?.message}
            onChange={(e: any) => {
              setValue("status", e.value);
            }}
          />
          <Flex gap={4}>
            <AppButton
              mt="auto"
              backgroundColor="bg.red"
              hoverBackgroundColor="bg.darkRed"
              onClick={() => cancel()}
            >
              Cancel
            </AppButton>
            <AppButton type="submit" mt="auto" loading={isLoading}>
              Submit
            </AppButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default UpdateComplaint;
