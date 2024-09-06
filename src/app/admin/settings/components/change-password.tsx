"use client";

import React from "react";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import SideDrawer from "@/components/popups/sideDrawer";
import { useGenericForm } from "@/hooks/form";
import { UpdatePasswordSchema } from "@/schema";
import { UpdatePasswordType } from "@/types";
import { useChangePasswordMutation } from "@/services/mutations/auth.mutation";

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword = ({ isOpen, setIsOpen }: PropType) => {
  const { mutateAsync: updatePassword, isLoading } =
    useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useGenericForm<UpdatePasswordType>(UpdatePasswordSchema, {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const submit = async (data: any) => {
    const { confirmNewPassword, ...rest } = data;
    const result = await updatePassword(rest);
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(
          result?.message || "Password changed Successfully!"
        );
        setIsOpen(false);
        reset();
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
      throw new Error(error);
    };
  };

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <SideDrawer header="Change Password" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(submit)}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"} flex={"1"}>
          <AppInput
            id="oldPassword"
            type="password"
            label="Enter Old Password"
            placeholder="Enter old password"
            isRequired
            {...register("oldPassword")}
            errorMessage={errors.oldPassword?.message}
          />
          <AppInput
            id="newPassword"
            type="password"
            label="Enter New Password"
            placeholder="Enter new password"
            {...register("newPassword")}
            errorMessage={errors.newPassword?.message}
          />
          <AppInput
            id="confirmPassword"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm password"
            {...register("confirmNewPassword")}
            errorMessage={errors.confirmNewPassword?.message}
          />
        </Flex>
        <Flex
          mt={"12rem"}
          justify={"space-between"}
          alignItems={"center"}
          w={"full"}
          px={4}
          pb="1rem"
        >
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

export default ChangePassword;
