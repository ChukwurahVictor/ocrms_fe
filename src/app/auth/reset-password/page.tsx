"use client";

import themes from "@/utils/themes";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "@/schema";
import AppInput from "@/components/app-input";
import Link from "next/link";
import AppButton from "@/components/app-button";
import { useResetPasswordMutation, useSignupMutation } from "@/services/mutations/auth.mutation";
import { useRouter } from "next/navigation";
// import { Text } from "@/components/app-text";
import { ResetPasswordType } from "@/types/auth";
import AuthLayout from "../layout";

const ResetPassword = () => {
  const router = useRouter();
  const resetPassworMutation = useResetPasswordMutation();
  const { mutateAsync: resetPassword, isLoading } = resetPassworMutation;

  const formHook = useForm<ResetPasswordType>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  } as { resolver: Resolver<any> });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  const submit: SubmitHandler<ResetPasswordType> = async (
    data: ResetPasswordType
  ) => {
    const { confirmNewPassword, ...rest } = data;
    const result = await resetPassword(rest);
    console.log("result", result);
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result.message || "Password Reset Successful!");
        // if (result.result.user.isAdmin) {
        //   return router.push("/admin/dashboard");
        // }
        return router.push("/auth/login");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
      throw new Error(error);
    }
  };

  return (
    <>
      <Flex justify="center" my="3rem" flexDir={"column"}>
        <Flex
          justify="center"
          my="3rem"
          flexDir={"column"}
          alignItems={"center"}
        >
          <Text fontWeight={600} fontSize={"24px"}>
            Reset your Password
          </Text>
        </Flex>
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width={{ base: "100%", md: "70%" }}
          m="auto"
        >
          <Box>
            <form onSubmit={handleSubmit(submit)}>
              <Flex
                width={{ base: "30rem", sm: "40rem", md: "25rem" }}
                gap="2rem"
                justifyContent={"center"}
                direction={"column"}
                mb="2rem"
              >
                <AppInput
                  id="newPassword"
                  type="password"
                  label="New Password"
                  placeholder="********"
                  register={register("newPassword")}
                  errorMessage={errors.newPassword?.message}
                />
                <AppInput
                  id="confirmNewPassword"
                  type="password"
                  label="Confirm New Password"
                  placeholder="********"
                  register={register("confirmNewPassword")}
                  errorMessage={errors.confirmNewPassword?.message}
                />
              </Flex>
              <AppButton
                loading={isLoading}
                type="submit"
                variant="primary"
                width="full"
                backgroundColor={"color.lightBlue"}
              >
                Reset Password
              </AppButton>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

ResetPassword.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default ResetPassword;
