"use client";

import React from "react";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import AppButton from "@/components/app-button";
import AppSelect from "@/components/app-select";
import Loader from "@/components/loader";
import SideDrawer from "@/components/popups/sideDrawer";
import { useGenericForm } from "@/hooks/form";
import { UpdateComplaintSchema } from "@/schema";
import { UpdateComplaintType } from "@/types/complaint";
import { Priority, Statuses } from "@/utils/enums";
import { useFetchAllCategory } from "@/services/queries/category";
import { useUpdateComplaintMutation } from "@/services/mutations/complaint.mutation";

type PropType = {
  complaintId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateComplaint = ({ isOpen, setIsOpen, complaintId }: PropType) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useGenericForm<UpdateComplaintType>(UpdateComplaintSchema, {
    categoryId: "",
    status: "",
    priorityLevel: "",
  });

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  const { mutateAsync: updateComplaint, isLoading } = useUpdateComplaintMutation(complaintId);

  const submit = async (data: any) => {
    const { priorityLevel, categoryId, status, ...rest } = data;

    const filteredData = {
      ...rest,
      ...(priorityLevel ? { priorityLevel } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(status ? { status } : {}),
    };
    const result = await updateComplaint(filteredData);

    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success("Complaint updated successfully!");
        setIsOpen(false);
        reset();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  };

  const {
    data: categories,
    isLoading: loading,
    isSuccess,
  } = useFetchAllCategory();

  const categoryOptions = categories?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <SideDrawer header="Update Complaint" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submit)}>
        {loading && <Loader />}
        {isSuccess && (
          <>
            <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"}>
              <AppSelect
                label="Status"
                placeholder="Select Status"
                options={[
                  { label: Statuses.Pending, value: Statuses.Pending },
                  { label: Statuses.InProgress, value: Statuses.InProgress },
                  { label: Statuses.Resolved, value: Statuses.Resolved },
                  { label: Statuses.Closed, value: Statuses.Closed },
                  { label: Statuses.Escalated, value: Statuses.Escalated },
                  { label: Statuses.Archived, value: Statuses.Archived },
                ]}
                errorMessage={errors.status?.message}
                onChange={(e: any) => {
                  setValue("status", e.value);
                }}
              />
              <AppSelect
                label="Priority Level"
                placeholder="Select Priority Level"
                options={[
                  { label: Priority.Low, value: Priority.Low },
                  { label: Priority.Medium, value: Priority.Medium },
                  { label: Priority.High, value: Priority.High },
                  { label: Priority.Urgent, value: Priority.Urgent },
                ]}
                errorMessage={errors.priorityLevel?.message}
                onChange={(e: any) => {
                  setValue("priorityLevel", e.value);
                }}
              />
              <AppSelect
                label="Category"
                placeholder="Select Category"
                options={categoryOptions}
                errorMessage={errors.categoryId?.message}
                onChange={(e: any) => {
                  setValue("categoryId", e.value);
                }}
              />
            </Flex>
            <Flex mt={"12rem"} px={"2rem"} justify={"space-between"}>
              <AppButton
                variant="outline"
                w="full"
                backgroundColor="bg.red"
                hoverBackgroundColor="bg.darkRed"
                onClick={() => cancel()}
              >
                Cancel
              </AppButton>
              <AppButton type="submit" w="full" loading={isLoading}>
                Submit
              </AppButton>
            </Flex>
          </>
        )}
      </form>
    </SideDrawer>
  );
};

export default UpdateComplaint;
