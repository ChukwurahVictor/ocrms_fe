import { Flex } from "@chakra-ui/react";
import TableDrawer from "@/components/popups/tableDrawer";
import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import { EditDetailsSchema } from "@/schema";
import { EditDetailsType } from "@/types/account";
import { useEffect } from "react";
import AppSelect from "@/components/app-select";
import { Gender } from "@/utils/enums";
import ImageIconInput from "@/components/image-icon-input";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import urls from "@/services/urls";
import axios from "@/services/axios";
import toast from "react-hot-toast";

type PropType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
};

const EditDetails = ({ isOpen, setIsOpen, data }: PropType) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const formHook = useForm<EditDetailsType>({
    resolver: yupResolver(EditDetailsSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      dateOfBirth: data?.dateOfBirth,
      gender: data?.gender,
      profileImgUrl: data?.profileImgUrl,
    },
  } as { resolver: Resolver<EditDetailsType> });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formHook;

  useEffect(() => {
    if (data) {
      setValue("firstName", data?.firstName);
      setValue("lastName", data?.lastName);
      setValue("email", data?.email);
      setValue("phone", data?.phone);
      setValue("dateOfBirth", data?.dateOfBirth);
      setValue("gender", data?.gender);
      setValue("profileImgUrl", data?.profileImgUrl);
    }
  }, [data, setValue]);

  const handleUpdate = async (newData: EditDetailsType) => {
    const token = JSON.parse(sessionStorage.getItem("merchant") || "{}").token;

    const formData = new FormData();
    if (
      newData?.profileImgUrl &&
      newData?.profileImgUrl !== data?.profileImgUrl
    ) {
      formData.append("image", newData?.profileImgUrl);
    } else {
      formData.append("image", data?.profileImgUrl);
    }

    if (newData?.firstName && newData?.firstName !== data?.firstName) {
      formData.append("firstName", newData?.firstName);
    }

    if (newData?.lastName && newData?.lastName !== data?.lastName) {
      formData.append("lastName", newData?.lastName);
    }

    const result = await axios({
      method: "patch",
      url: urls.profileUpdate,
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
        toast.success(result?.data.message || "Profile updated successfully!");
        setIsOpen(false);
        formHook.reset();
        return;
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      throw new Error(err);
    }
  };

  return (
    <TableDrawer
      isOpen={isOpen}
      handleClose={handleClose}
      header={"Edit Details"}
    >
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Flex
          gap={4}
          flexDir="column"
          px="1.5rem"
          fontSize="1.1rem"
          fontWeight={500}
        >
          <ImageIconInput title={"profileImgUrl"} handler={formHook} />
          <AppInput
            id="firstName"
            type="text"
            label="First Name"
            placeholder="First Name"
            register={register("firstName")}
            errorMessage={errors.firstName?.message}
          />
          <AppInput
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            register={register("lastName")}
            errorMessage={errors.lastName?.message}
          />
          {/* <AppInput
            id="email"
            type="text"
            label="Email"
            placeholder="Email"
            register={register("email")}
            errorMessage={errors.email?.message}
          />
          <AppInput
            id="phone"
            type="text"
            label="Phone"
            placeholder="Phone"
            register={register("phone")}
            errorMessage={errors.phone?.message}
          />
          <AppInput
            id="dateOfBirth"
            type="text"
            label="Date Of Birth"
            placeholder="Enter date of birth"
            register={register("dateOfBirth")}
            errorMessage={errors.dateOfBirth?.message}
          />
          <AppSelect
            id="gender"
            label="Gender"
            placeholder="Select Gender"
            options={[
              { label: Gender.Male, value: Gender.Male },
              { label: Gender.Female, value: Gender.Female },
            ]}
            errorMessage={errors.gender?.message}
            onChange={(e: any) => {
              setValue("gender", e.value);
            }}
          /> */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            /*gap={4}*/ w="full"
          >
            <AppButton
              w="full"
              backgroundColor="bg.red"
              hoverBackgroundColor="bg.darkRed"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </AppButton>
            <AppButton
              w="full"
              backgroundColor="color.lightBlue"
              hoverBackgroundColor="color.lightBlue"
              type="submit"
            >
              Submit
            </AppButton>
          </Flex>
        </Flex>
      </form>
    </TableDrawer>
  );
};

export default EditDetails;
