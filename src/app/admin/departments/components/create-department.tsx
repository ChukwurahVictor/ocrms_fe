"use client";

import React from "react";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import SideDrawer from "@/components/popups/sideDrawer";
import { useGenericForm } from "@/hooks/form";
import { CreateDepartmentSchema } from "@/schema";
import { useCreateDepartmentMutation } from "@/services/mutations/department.mutation";
import { CreateDepartmentType } from "@/types";

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateDepartment = ({ isOpen, setIsOpen }: PropType) => {
  const { mutateAsync: createDepartment, isLoading } =
    useCreateDepartmentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useGenericForm<CreateDepartmentType>(CreateDepartmentSchema, {
    name: "",
    description: ""
  });

  const submit = async (data: any) => {
    const result = await createDepartment(data);

    try {
      if(!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Department created successfully!");
        setIsOpen(false);
        reset();
        return;
      }
    } catch(err: any) {
        toast.error(err?.message || "An error occurred");
        throw new Error(err);
    }
  };

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <SideDrawer
      header="Create Department"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form
        onSubmit={handleSubmit(submit)}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"} flex={"1"}>
          <AppInput
            id="name"
            label="Name"
            placeholder="Enter name"
            isRequired
            {...register("name")}
            errorMessage={errors.name?.message}
          />
          <AppInput
            id="description"
            label="Description"
            placeholder="Enter description"
            {...register("description")}
            errorMessage={errors.description?.message}
          />
        </Flex>
        <Flex mt={"18rem"} px={"2rem"} justify={"space-between"} pb="1rem">
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
      </form>
    </SideDrawer>
  );
};

export default CreateDepartment;