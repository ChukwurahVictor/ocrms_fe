'use client';

import AppButton from '@/components/app-button';
import AppInput from '@/components/app-input';
import SideDrawer from '@/components/popups/sideDrawer';
import { CreateComplaintSchema } from '@/schema';
import { ComplaintType } from '@/types/complaint';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Resolver, useForm } from 'react-hook-form';

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddComplaint = ({ isOpen, setIsOpen }: PropType) => {
    const formHook = useForm<ComplaintType>({
      resolver: yupResolver(CreateComplaintSchema),
      defaultValues: {},
    } as { resolver: Resolver<any> });

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = formHook;

  const onSubmit = (data: any) => {
    setIsOpen(false);
    reset();
  };

  const FooterContent = (
    <>
      <AppButton
        variant="outline"
        w="full"
        onClick={() => {
          reset();
          setIsOpen(false);
        }}
      >
        Cancel
      </AppButton>
      <AppButton type="submit" w="full" onClick={() => {}}>
        Submit
      </AppButton>
    </>
  );
  return (
    <SideDrawer
      header="Add User"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={FooterContent}
    >
      <form
        onSubmit={() => {}}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 items-center justify-between"
      >
        <AppInput
          id="title"
          label="Title"
          placeholder="Enter title"
          isRequired
          {...register("title")}
          errorMessage={errors.title?.message}
        />
        {/* <AppInput
          id="complaintId"
          label="Last Name"
          placeholder="Enter last name"
          isRequired
          {...register("complaintId")}
          errorMessage={errors.complaintId?.message}
        /> */}
        {/* <AppInput
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          isRequired
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <AppInput
          id="phone"
          label="Phone"
          type="tel"
          isPhone
          control={control}
          placeholder="Enter phone number"
          isRequired
          {...register("phone")}
          errorMessage={errors.phone?.message}
        />
        <AppInput
          id="updatedAt"
          label="Updated At"
          type="date"
          placeholder="Select date"
          isRequired
          {...register("updatedAt")}
          errorMessage={errors.updatedAt?.message}
        /> */}
      </form>
    </SideDrawer>
  );
};

export default AddComplaint