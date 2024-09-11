"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schema";
import AppInput from "@/components/app-input";
import Link from "next/link";
import AppButton from "@/components/app-button";
import { useLoginMutation } from "@/services/mutations/auth.mutation";
import { useRouter } from "next/navigation";
import { LoginType } from "@/types/auth";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const { mutateAsync: login, isLoading } = loginMutation;

  const formHook = useForm<LoginType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  } as { resolver: Resolver<any> });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  const submit: SubmitHandler<LoginType> = async (data: LoginType) => {
    const result = await login(data);
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Login Successful!");
        sessionStorage.setItem("userData", JSON.stringify(result?.data));

        // route user to dashboard
        if (result?.data?.user?.userRole == "Admin" || result?.data?.user?.userRole == "Super_Admin") {
          return router.push("/admin/dashboard");
        } else if (result?.data?.user?.userRole == "Staff") {
          return router.push("/staff/dashboard");
        } else {
          return router.push("/users/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
      throw new Error(error);
    }
  };

  return (
    <Flex flexDir={"column"} w={"100%"} mx={"auto"}>
      <Flex justify="center" mb="3rem">
        <Flex
          justify="center"
          my="1rem"
          flexDir={"column"}
          alignItems={"center"}
        >
          <Text fontWeight={600} fontSize={"24px"}>
            Log in to your OCRMS Account
          </Text>
          <Text fontWeight={400} fontSize={"16px"} mt={"1rem"}>
            Enter your login details
          </Text>
        </Flex>
      </Flex>
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={{ xs: "80%", sm: "80%", md: "70%" }}
        m="auto"
      >
        <Box>
          <form onSubmit={handleSubmit(submit)}>
            <Flex
              width={{ base: "30rem", sm: "40rem", md: "25rem" }}
              gap="2rem"
              justifyContent={"center"}
              direction={"column"}
            >
              <AppInput
                id="email"
                type="email"
                label="Email"
                placeholder="johndoe@email.com"
                register={register("email")}
                errorMessage={errors.email?.message}
              />
              <AppInput
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                register={register("password")}
                errorMessage={errors.password?.message}
              />
            </Flex>
            <Flex justify={"end"} mt={"2rem"}>
              <Link href="/auth/request-reset-password">
                <Text variant="label" color="typography.wine" cursor="pointer">
                  Forgot Password?
                </Text>
              </Link>
            </Flex>
            <AppButton
              loading={isLoading}
              type="submit"
              variant="primary"
              mt="3rem"
              width="full"
              backgroundColor={"color.lightBlue"}
            >
              Login
            </AppButton>
          </form>
          <Flex justify={"center"} alignItems={"center"} mt={"1rem"}>
            <Text mr={".3rem"}>Don’t have an account? </Text>

            <Link href="/auth/signup">
              <Text variant="label" color="brand.primary" cursor="pointer">
                Sign Up
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
