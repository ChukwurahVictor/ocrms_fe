import AppButton from '@/components/app-button';
import AppInput from '@/components/app-input';
import AppSelect from '@/components/app-select';
import Loader from '@/components/loader';
import SideDrawer from '@/components/popups/sideDrawer';
import { useGenericForm } from '@/hooks/form';
import { EditStaffSchema } from '@/schema';
import { useEditStaffMutation } from '@/services/mutations/staff.mutation';
import { useFetchAllDepartments } from '@/services/queries/department';
import { DepartmentType, EditStaffType } from '@/types';
import { Flex } from '@chakra-ui/react';
import React from 'react'
import toast from 'react-hot-toast';

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any
};

const EditStaff = ({ isOpen, setIsOpen, data }: PropType) => {
   const { mutateAsync: editStaff, isLoading } = useEditStaffMutation(data?.id);
   const {
     register,
     handleSubmit,
     reset,
     setValue,
     formState: { errors },
   } = useGenericForm<EditStaffType>(EditStaffSchema, {
     firstName: data?.firstName,
     lastName: data?.lastName,
     email: data?.email,
     departmentId: data?.departmentId,
   });

  const {
    data: departments,
    isLoading: loading,
    isSuccess,
  } = useFetchAllDepartments();
  const departmentOptions = departments?.map((department: DepartmentType) => ({
    label: department.name,
    value: department.id,
  }));

  const cancel = () => {
    reset();
    setIsOpen(false);
  };

  const submit = async (data: any) => {
    const result = await editStaff(data);

    try {
      if (!result) {
        return;
      }
      if (result) {
        toast.success(result?.message || "Staff updated successfully!");
        setIsOpen(false);
        reset();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  }
  return (
    <SideDrawer header="Edit Staff" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submit)}>
        {loading && <Loader />}
        {isSuccess && (
          <>
            <Flex flexDir={"column"} gap={8} px={"1rem"} mt={"2rem"}>
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
              <AppSelect
                label="Department"
                placeholder="Select Department"
                options={departmentOptions}
                isRequired
                errorMessage={errors.departmentId?.message}
                onChange={(e: any) => {
                  setValue("departmentId", e.value);
                }}
                defaultValue={departmentOptions.find(
                  (option: DepartmentType) =>
                    option.id === data?.departmentId
                )}
              />
            </Flex>
            <Flex mt={"6rem"} px={"2rem"} justify={"space-between"}>
              <AppButton
                variant="outline"
                w="full"
                backgroundColor="bg.red"
                hoverBackgroundColor="bg.darkRed"
                onClick={() => cancel()}
              >
                Cancel
              </AppButton>
              <AppButton type="submit" w="full" loading={loading}>
                Submit
              </AppButton>
            </Flex>
          </>
        )}
      </form>
    </SideDrawer>
  );
};

export default EditStaff