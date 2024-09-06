import { Flex } from "@chakra-ui/react";
import AppInput from "@/components/app-input";
import { useGenericForm } from "@/hooks/form";
import { EditDepartmentSchema } from "@/schema";
import { EditDepartmentType } from "@/types";

const EditDepartment = ({data}: {data: any}) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useGenericForm<EditDepartmentType>(EditDepartmentSchema, {
    
      name: data?.name || "",
      description: data?.description || "",
    //   status: data?.status || "",
    });

    const handleEdit = (data: EditDepartmentType) => {
        console.log(data);
    }

    return (
      <form onSubmit={handleSubmit(handleEdit)}>
        <Flex
          gap={4}
          flexDir="column"
          px="1.5rem"
          color="text.blue"
          fontSize="1.1rem"
          fontWeight={500}
        >
          <AppInput
            id="name"
            type="text"
            label="Name"
            placeholder="Department Name"
            register={register("name")}
            errorMessage={errors.name?.message}
          />
          <AppInput
            id="description"
            type="text"
            label="Description"
            placeholder="Department Description"
            register={register("description")}
            errorMessage={errors.description?.message}
          />
        </Flex>
      </form>
    );
}

export default EditDepartment;
