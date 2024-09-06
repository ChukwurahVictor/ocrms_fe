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
import { useSignupMutation } from "@/services/mutations/auth.mutation";
import { useRouter } from "next/navigation";
// import { Text } from "@/components/app-text";
import { SignUpType } from "@/types/auth";
import AuthLayout from "../layout";

const SignUp = () => {
  const router = useRouter();
  const signupMutation = useSignupMutation();
  const { mutateAsync: signup, isLoading } = signupMutation;

  const formHook = useForm<SignUpType>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  } as { resolver: Resolver<any> });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  const submit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    const { confirmPassword, ...signupData } = data;
    const result = await signup(signupData);
    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result.message || "Signup Successful!");
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
            Create your OCRMS Account
          </Text>
          <Text fontWeight={400} fontSize={"16px"} mt={"1rem"}>
            Enter your details
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
                  id="firstName"
                  type="text"
                  label="First Name"
                  placeholder="Enter first name"
                  register={register("firstName")}
                  errorMessage={errors.firstName?.message}
                />
                <AppInput
                  id="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Enter last name"
                  register={register("lastName")}
                  errorMessage={errors.lastName?.message}
                />
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
                <AppInput
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="********"
                  register={register("confirmPassword")}
                  errorMessage={errors.confirmPassword?.message}
                />
              </Flex>
              <AppButton
                loading={isLoading}
                type="submit"
                variant="primary"
                width="full"
                backgroundColor={"color.lightBlue"}
              >
                Sign Up
              </AppButton>
            </form>
            <Flex justify={"center"} alignItems={"center"} mt={"2rem"}>
              <Text mr={"1rem"}>Already have an account? </Text>

              <Link href="/auth/login">
                <Text variant="label" color="color.lightBlue" cursor="pointer">
                  Login
                </Text>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

SignUp.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default SignUp;
