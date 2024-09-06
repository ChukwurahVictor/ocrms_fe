import { Flex } from "@chakra-ui/react";
import AppInput from "@/components/app-input";
import { useGenericForm } from "@/hooks/form";
import { EditComplaintsType } from "@/types/admin";
import { EditComplaintsSchema } from "@/schema";

const EditComplaint = ({data}: {data: any}) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useGenericForm<EditComplaintsType>(EditComplaintsSchema, {
      requestedBy: data?.requestedBy || "",
      referenceNo: data?.complaintId || "",
      title: data?.title || "",
      description: data?.description || "",
      priorityLevel: data?.priority || "",
      status: data?.status || "",
      assignedTo: data?.assignedTo || "",
    });

    const handleEdit = (data: EditComplaintsType) => {
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
            id="requestedBy"
            type="text"
            label="Requested By"
            placeholder="John Doe"
            isDisabled
            register={register("requestedBy")}
            errorMessage={errors.requestedBy?.message}
          />
          <AppInput
            id="complaintId"
            type="text"
            label="Complaint ID"
            placeholder="CD123"
            isDisabled
            register={register("referenceNo")}
            errorMessage={errors.referenceNo?.message}
          />
          <AppInput
            id="title"
            type="text"
            label="Title"
            placeholder="Complaint Title"
            isDisabled
            register={register("title")}
            errorMessage={errors.title?.message}
          />
          <AppInput
            id="description"
            type="text"
            label="Description"
            placeholder="Complaint Description"
            isDisabled
            register={register("description")}
            errorMessage={errors.description?.message}
          />
          <AppInput
            id="priority"
            type="text"
            label="Priority"
            placeholder="High"
            register={register("priorityLevel")}
            errorMessage={errors.priorityLevel?.message}
          />
          <AppInput
            id="status"
            type="text"
            label="Status"
            placeholder="Pending"
            register={register("status")}
            errorMessage={errors.status?.message}
          />
          <AppInput
            id="assignedTo"
            type="text"
            label="Assigned To"
            placeholder="John Doe"
            register={register("assignedTo")}
            errorMessage={errors.assignedTo?.message}
          />
        </Flex>
      </form>
    );
}

export default EditComplaint;
