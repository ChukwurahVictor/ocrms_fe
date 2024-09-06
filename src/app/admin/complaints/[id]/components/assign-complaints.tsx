"use client";

import React from "react";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import AppButton from "@/components/app-button";
import AppSelect from "@/components/app-select";
import Loader from "@/components/loader";
import SideDrawer from "@/components/popups/sideDrawer";
import { useGenericForm } from "@/hooks/form";
import { AssignComplaintSchema } from "@/schema";
import { useFetchAllDepartments } from "@/services/queries/department";
import { useAssignComplaintMutation } from "@/services/mutations/complaint.mutation";
import { AssignComplaintType } from "@/types/complaint";

type PropType = {
  complaintId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AssignComplaint = ({ isOpen, setIsOpen, complaintId }: PropType) => {
  const { mutateAsync: assignComplaint, isLoading } =
    useAssignComplaintMutation(complaintId);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useGenericForm<AssignComplaintType>(AssignComplaintSchema, {
    departmentId: "",
  });

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  const submit = async (data: any) => {
    const result = await assignComplaint(data);

    try {
      if (!result) {
        return;
      }
      if (result) {
        console.log("result", result);
        toast.success("Complaint assigned successfully!");
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
    data: departments,
    isLoading: loading,
    isSuccess,
  } = useFetchAllDepartments();
  const departmentOptions = departments?.map((department: any) => ({
    label: department.name,
    value: department.id,
  }));

  return (
    <SideDrawer header="Assign Complaint" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submit)}>
        {loading && <Loader />}
        {isSuccess && (
          <>
            <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"}>
              <AppSelect
                label="Assign To"
                placeholder="Select Department"
                options={departmentOptions}
                errorMessage={errors.departmentId?.message}
                onChange={(e: any) => {
                  setValue("departmentId", e.value);
                }}
              />
            </Flex>
            <Flex mt={"24rem"} px={"2rem"} justify={"space-between"}>
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

export default AssignComplaint;
