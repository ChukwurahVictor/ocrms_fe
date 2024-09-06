"use client";

import React from "react";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import { CategoryType } from "@/types";
import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import SideDrawer from "@/components/popups/sideDrawer";
import { useGenericForm } from "@/hooks/form";
import { CreateCategorySchema } from "@/schema";
import { useCreateCategoryMutation } from "@/services/mutations/category.mutation";

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategory = ({ isOpen, setIsOpen }: PropType) => {
  const { mutateAsync: createCategory, isLoading } =
    useCreateCategoryMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useGenericForm<CategoryType>(CreateCategorySchema, {
    name: "",
    description: "",
  });

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  const submit = async (data: any) => {
    console.log(data);
    const result = await createCategory(data);

    try {
      if (!result) {
        return;
      }
      if (result) {
        console.log("result", result);
        toast.success(result?.message || "Category created successfully!");
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
    <SideDrawer header="Create Category" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submit)}>
            <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"}>
              <AppInput
                isRequired
                id="Name"
                label="Name"
                placeholder="Enter name"
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
            <Flex mt={"16rem"} px={"2rem"} justify={"space-between"}>
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
          </Flex>
      </form>
    </SideDrawer>
  );
};

export default CreateCategory;
