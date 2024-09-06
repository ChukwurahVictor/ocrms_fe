import { useRef, CSSProperties, ChangeEvent, FC, useState } from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { Text } from "../app-text";
import Image from "next/image";

interface IProps {
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  isHorizontal?: boolean;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  handler: UseFormReturn;
  title: string;
  icon?: boolean;
}

const ImageInput: FC<IProps> = ({
  label,
  isRequired,
  isHorizontal,
  style,
  title,
  labelStyle,
  handler,
  icon,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [changed, setChanged] = useState(false);
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = handler;
  const complaintImages = watch(title) as string[]; // Changed to handle multiple images
  const errorMessage = errors[title]?.message?.toString();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const maxFileSize = 1024; // 1MB

    // Filter out files larger than the maximum file size
    const validFiles = selectedFiles.filter(file => {
      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > maxFileSize) {
        setError(title, {
          message: "Image cannot be larger than 1MB",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles(validFiles);
      setValue(title, validFiles)
      clearErrors(title);
      setChanged(true);
    } else {
      setFiles([]);
      setValue(title, []);
    }
  };

  return (
    <FormControl isRequired={isRequired && isRequired} my="3rem">
      <Flex flexDir="column">
        <Input
          {...register}
          name={title}
          ref={fileInput}
          id="upload"
          display={"none"}
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          multiple // Allow multiple file selection
          onChange={handleFileChange}
        />
        {files.length > 0 || complaintImages.length > 0 ? (
          <Flex
            justifyContent="space-between"
            alignItems="start"
            flexDir="column"
          >
            {files.length > 0
              ? files.map((file, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`image-${index}`}
                    style={{
                      height: "5rem",
                      width: "auto",
                      margin: "auto",
                    }}
                    width={100}
                    height={100}
                  />
                ))
              : complaintImages.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`complaint-image-${index}`}
                    style={{
                      height: "5rem",
                      width: "auto",
                      margin: "auto",
                    }}
                    width={100}
                    height={100}
                  />
                ))}
            <Text
              onClick={() => fileInput.current?.click()}
              color="brand.primary"
              justifyContent={"start"}
              sx={{ cursor: "pointer" }}
              mt="2rem"
              mx="auto"
            >
              Edit
            </Text>
          </Flex>
        ) : (
          <>
            <FormLabel htmlFor="upload" className="upload" cursor={"pointer"}>
              <SimpleGrid placeItems={"center"} h={"100%"}>
                <Flex
                  flexDir={"column"}
                  alignItems={"start"}
                  border={"1px dashed"}
                  px={100}
                  py={50}
                >
                  <Text color="brand.primary">Upload</Text>
                  <Text color="brand.primary">Images</Text>
                </Flex>
              </SimpleGrid>
            </FormLabel>
          </>
        )}
        {errorMessage && (
          <FormHelperText fontSize={"14px"} color="red">
            {errorMessage}
          </FormHelperText>
        )}
      </Flex>
    </FormControl>
  );
};

export default ImageInput;
