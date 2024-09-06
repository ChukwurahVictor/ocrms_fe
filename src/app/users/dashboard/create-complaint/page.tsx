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
import React, { useMemo } from 'react'
import { Resolver, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import ImageIconInput from '@/components/image-icon-input';

const CreateComplaint = () => {
  const router = useRouter();
  const createComplaintMutation = useCreateComplaintMutation();
  const { mutateAsync: createComplaint, isLoading } = createComplaintMutation;
  // const [img, setImg] = useState<File[]>([])

  const formHook = useForm<CreateComplaintType>({
    resolver: yupResolver(CreateComplaintSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      image: "",
      // image: [],
    },
  } as { resolver: Resolver<CreateComplaintType> });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formHook;

  // const convertToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = error => reject(error);
  //   });
  // };

  // const handleImgChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    // if (e.target.files) { 
    //   // const base64Images = await Promise.all(
    //   //   Array.from(e.target.files).map(file => convertToBase64(file))
    //   // );

    //   // setImg(Array.from(base64Images));
    //   setImg(Array.from(e.target.files));
    // }
    // Array.from(e.target.files as any).forEach((file) => console.log(file))
    // console.log(img);
  // }
  
  const submit = async (data: CreateComplaintType) => {
    // console.log(img);
    console.log(data);
    // console.log(data.images);
    const formData = new FormData();
    // console.log(data.images?.File[0])

    // const urls: any = [];
    // if (data?.images && Array.isArray(data?.images)) {
      // const images = data?.images;
      // data?.images.forEach((file, index) => {
      //   // urls.push(file);
      //   formData.append(`images`, file);
      // });
      // images.forEach((image, index) => {
      //   formData.append(`images`, image); // Append each file individually
      // });
      // console.log('Gets Here.....................');
      // formData.append(`images`, [...images]);
    //   // console.log(urls);
    //   // console.log(images);
    // }

    // if (data?.images && Array.isArray(data.images)) {
    // Append each File object or Blob URL to FormData under the 'images' key

    // async function getBlobFromURL(blobURL) {
    //   const response = await fetch(blobURL);
    //   return await response.blob();
    // }

    // async function processImages() {
    //   const buffers = [];

    //   for (let blobURL of data.images) {
    //     if (blobURL.startsWith("blob:")) {
    //       const blob = await getBlobFromURL(blobURL);

    //       const reader = new FileReader();
    //       reader.readAsArrayBuffer(blob);

    //       reader.onloadend = () => {
    //         const buffer = reader.result;
    //         buffers.push(buffer);

    //         buffers.forEach((buffer: any, index: any) => {
    //           formData.append(`images[${index}]`, new Blob([buffer]));
    //         });
    //       };
    //     } else {
    //       console.error("Invalid Blob URL");
    //     }
    //   }
    // }

    // processImages();
    // const buffers: any = [];

    // data?.images?.forEach((image, index) => {
    //   // if (image instanceof Blob || image instanceof File) {
    //     const reader = new FileReader();
    //     const imageBlob = getBlobFromURL(image);
    //     reader.readAsArrayBuffer(imageBlob);

    //     reader.onloadend = () => {
    //       const buffer = reader.result;
    //       buffers.push(buffer);

    //       buffers.forEach((buffer: any, index: any) => {
    //         formData.append(`images[${index}]`, new Blob([buffer]));
    //       });
    //     };
    //   // } else {
    //   //   console.error(`Item at index ${index} is not a Blob or File`);
    //   // }
    // });

    // const convertFileToBuffer = file => {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onload = () => resolve(Buffer.from(reader.result));
    //     reader.onerror = reject;
    //     reader.readAsArrayBuffer(file);
    //   });
    // };

    //   const bufferPromises = Array.from(data?.images).map(image =>
    //     convertFileToBuffer(image)
    //   );
    //   const buffers = await Promise.all(bufferPromises);

    //   // Append each buffer to the FormData as 'images[]'
    //   buffers.forEach((buffer, index) => {
    //     formData.append("images[]", new Blob([buffer]), data?.images[index].name);
    //   });
    
    // data?.title && formData.append("title", data.title);
    // data?.description && formData.append("description", data.description);
    // data?.categoryId && formData.append("categoryId", data.categoryId);
    // const imagesArray = img.map(file => ({file}));

    // Append images to FormData
    if ( data?.image ) {
      formData.append("image", data?.image);
    }
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("categoryId", data?.categoryId);
    
    // const payload = {
    //   images: [...img],
    //   title: data?.title,
    //   description: data?.description,
    //   categoryId: data?.categoryId,
    // };

    //  console.log('payload', payload);

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
            // justifyContent={"center"}
            fontSize="1.1rem"
            fontWeight={500}
            w={"70%"}
            // mx={"auto"}
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
                <ImageIconInput title={"image"} handler={formHook} />
                {/* <ImageInput title={'images'} handler={formHook as any} /> */}
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