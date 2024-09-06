"use client";

import React from "react";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import { CreateAdminType } from "@/types";
import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import SideDrawer from "@/components/popups/sideDrawer";
import { useGenericForm } from "@/hooks/form";
import { CreateAdminSchema, CreateStaffSchema } from "@/schema";
import { useFetchAllDepartments } from "@/services/queries/department";
import { useCreateAdminMutation } from "@/services/mutations/admin.mutation";

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAdmin = ({ isOpen, setIsOpen }: PropType) => {
  const { mutateAsync: createAdmin, isLoading } = useCreateAdminMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useGenericForm<CreateAdminType>(CreateAdminSchema, {
    firstName: "",
    lastName: "",
    email: "",
  });

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  const submit = async (data: any) => {
    const result = await createAdmin(data);

    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Staff created successfully!");
        setIsOpen(false);
        reset();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  };

  return (
    <SideDrawer header="Create Admin" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(submit)}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <>
          <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"} flex={"1"}>
            <AppInput
              id="firstName"
              label="First Name"
              placeholder="Enter first name"
              isRequired
              {...register("firstName")}
              errorMessage={errors.firstName?.message}
            />
            <AppInput
              id="lastName"
              label="Last Name"
              placeholder="Enter last name"
              isRequired
              {...register("lastName")}
              errorMessage={errors.lastName?.message}
            />
            <AppInput
              id="email"
              label="Email"
              placeholder="Enter email"
              isRequired
              {...register("email")}
              errorMessage={errors.email?.message}
            />
          </Flex>
          <Flex mt={"6rem"} px={"2rem"} justify={"space-between"} pb="1rem">
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
      </form>
    </SideDrawer>
  );
};

export default CreateAdmin;
