'use client';

import AppButton from '@/components/app-button';
import AppInput from '@/components/app-input';
import AppSelect from '@/components/app-select';
import Header from '@/components/nav/header'
import { CreateComplaintSchema } from '@/schema';
import axios from '@/services/axios';
import { useCreateComplaintMutation } from '@/services/mutations/complaint.mutation';
import { useFetchAllCategory } from '@/services/queries/category';
import urls from '@/services/urls';
import { CreateComplaintType } from '@/types/complaint';
import { Flex, Grid, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Resolver, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import ImageIconInput from '@/components/image-icon-input';
import ImageInput from '@/components/image-input';

const CreateComplaint = () => {
  const router = useRouter();
  const createComplaintMutation = useCreateComplaintMutation();
  const { mutateAsync: createComplaint, isLoading } = createComplaintMutation;

  const formHook = useForm<CreateComplaintType>({
    resolver: yupResolver(CreateComplaintSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      image: "",
    },
  } as { resolver: Resolver<CreateComplaintType> });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formHook;
  
  const submit = async (data: CreateComplaintType) => {
    console.log('data', data);
    const formData = new FormData();

    // Append images to FormData
    if ( data?.image ) {
      formData.append("image", data?.image);
    }
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("categoryId", data?.categoryId);

    const token = JSON.parse(sessionStorage.getItem("userData") || "{}").token;

    const result = await axios({
      method: "post",
      url: urls.complaints,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.data?.message || "Complaint created Successfully!");
        return router.push("/users/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
      throw new Error(error);
    }
  };

  const { data: categories, isLoading: loading, isSuccess } = useFetchAllCategory();
  const categoryOptions = categories?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));
  
  return (
    <>
      <Flex borderBottom="8px solid #F4F4F4">
        <Header text="Complaints" />
      </Flex>
      <Flex my={8} flexDir={"column"} px={2}>
        <Flex alignItems={"center"} justify={"space-between"}>
          <Text whiteSpace="nowrap" fontWeight={500} fontSize={24}>
            Complaint Form
          </Text>
          <AppButton onClick={() => router.back()}>Back</AppButton>
        </Flex>

        <form onSubmit={handleSubmit(submit)}>
          <Flex
            mt={"4rem"}
            gap={4}
            flexDir="column"
            fontSize="1.1rem"
            fontWeight={500}
            w={"70%"}
            px={2}
          >
            <Grid templateColumns="1fr 3fr" gap="1rem">
              <Text>Title</Text>
              <AppInput
                id="title"
                type="text"
                // w={"32rem"}
                placeholder="Complaint Title"
                register={register("title")}
                errorMessage={errors.title?.message}
              />
            </Grid>
            <Grid templateColumns="1fr 3fr" gap="1rem">
              <Text>Category</Text>
              <AppSelect
                placeholder="Select Category"
                options={categoryOptions}
                errorMessage={errors.categoryId?.message}
                onChange={(e: any) => {
                  setValue("categoryId", e.value);
                }}
              />
            </Grid>
            <Grid templateColumns="1fr 3fr" gap="1rem">
              <Text>Description</Text>
              <AppInput
                isTextArea
                id="description"
                type="text"
                // w={"32rem"}
                _placeholder="Complaint Description"
                register={register("description")}
                errorMessage={errors.description?.message}
              />
            </Grid>
            <Grid templateColumns="1fr 3fr" gap="1rem">
              <Flex></Flex>
              <Flex flexDir={"column"} gap={1}>
                <Text>Upload Image</Text>
                <Text fontSize={"12px"} color={"#525252"}>
                  Only .jpg and .png files. 5 MB max file size
                </Text>
              </Flex>
            </Grid>
            <Grid templateColumns="1fr 3fr" gap="1rem">
              <Text>Add Image</Text>
              <Flex alignItems={"start"}>
                {/* <ImageIconInput title={"image"} handler={formHook} /> */}
                <ImageInput title={'image'} handler={formHook as any} />
                {/* <ImageUploader /> */}
                {/* <input type="file" onChange={handleImgChange} multiple/> */}
              </Flex>
            </Grid>
          </Flex>
          <Flex mt={"3rem"} justify={"end"}>
            <AppButton loading={isLoading} type="submit" width={"16rem"}>
              Submit
            </AppButton>
          </Flex>
        </form>
      </Flex>
    </>
  );
}

export default CreateComplaint