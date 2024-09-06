"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequestResetPasswordSchema } from "@/schema";
import AppInput from "@/components/app-input";
import AppButton from "@/components/app-button";
import {
    useRequestResetPasswordMutation,
} from "@/services/mutations/auth.mutation";
import { useRouter } from "next/navigation";
import { RequestResetPasswordType } from "@/types/auth";
import AuthLayout from "../layout";

const RequestResetPassword = () => {
  const router = useRouter();
  const requestResetPasswordMutation = useRequestResetPasswordMutation();
  const { mutateAsync: requestResetPassword, isLoading } =
    requestResetPasswordMutation;

  const formHook = useForm<RequestResetPasswordType>({
    resolver: yupResolver(RequestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  } as { resolver: Resolver<any> });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  const submit: SubmitHandler<RequestResetPasswordType> = async (
    data: RequestResetPasswordType
  ) => {
    const result = await requestResetPassword(data);
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result.message || "Password Reset Successful!");
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
            Request Reset Password
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
                  id="email"
                  type="text"
                  label="Email"
                  placeholder="Enter Email"
                  register={register("email")}
                  errorMessage={errors.email?.message}
                />
              </Flex>
              <AppButton
                loading={isLoading}
                type="submit"
                variant="primary"
                width="full"
                backgroundColor={"color.lightBlue"}
              >
                Request Reset Password
              </AppButton>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

RequestResetPassword.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default RequestResetPassword;
