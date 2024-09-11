import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import { useGenericForm } from "@/hooks/form";
import { AddFeedbackSchema } from "@/schema";
import { useAddComplaintFeedbackMutation } from "@/services/mutations/complaint.mutation";
import { ComplaintFeedbackType } from "@/types";
import { Flex } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";

type PropType = {
  data?: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddFeedback = ({ data, setIsOpen, setIsEditing }: PropType) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useGenericForm<ComplaintFeedbackType>(AddFeedbackSchema, {
    comment: "",
  });

  const { mutateAsync: addFeedback, isLoading } =
    useAddComplaintFeedbackMutation(data?.id);

  const cancel = () => {
    reset();
    setIsEditing(false);
    setIsOpen(false);
  };

  const onSubmit = async (formData: any) => {
    const result = await addFeedback(formData);

    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Feedback added successfully!");
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
    <Flex
      direction="column"
      h="100vh"
      p="1rem"
    >
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
          <AppInput
            id="comment"
            label="Comment"
            isRequired
            isTextArea
            _placeholder={"Enter Feedback"}
            register={register("comment")}
            errorMessage={errors.comment?.message as string}
          />
          <Flex gap={4} pb={"1rem"}>
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

export default AddFeedback;
