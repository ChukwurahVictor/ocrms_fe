import { useRef, CSSProperties, ChangeEvent, FC, useState } from 'react';
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  SimpleGrid
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { Text } from '../app-text';
import Image from 'next/image';

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

const ImageIconInput: FC<IProps> = ({
  label,
  isRequired,
  isHorizontal,
  style,
  title,
  labelStyle,
  handler,
  icon
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [changed, setChanged] = useState(false);
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = handler;
  const profileImg = watch(title) as string;
  const errorMessage = errors[title]?.message?.toString();

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const image = e.target.files!;
            const maxFileSize = 1024; // 1MB
            const imageFileSize = image[0]?.size / 1024;
            if (imageFileSize > maxFileSize) {
              setFile(undefined);
              setValue(title, undefined);
              return setError(title, {
                message: "Image cannot be larger than 1MB",
              });
            }
            setValue(title, image?.[0]);
            setFile(image?.[0]);
            clearErrors(title);
            setChanged(true);
            if (imageFileSize > maxFileSize) {
              setValue(title, undefined);
              return setError(title, {
                type: "custom",
                message: "Image cannot be larger than 1MB.",
              });
            } else {
              clearErrors(title);
              setValue(title, image?.[0]);
            }
          }}
        />
        {file || profileImg ? (
          <Flex
            justifyContent="space-between"
            alignItems="start"
            flexDir="column"
          >
            <Image
              src={changed ? URL.createObjectURL(file as File) : profileImg}
              alt="image"
              style={{
                height: "5rem",
                width: "auto",
                margin: "auto",
              }}
              width={100}
              height={100}
            />
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
                  alignItems={"center"}
                  border={"1px solid"}
                  p={5}
                >
                  <Text color="brand.primary">Upload</Text>
                  <Text color="brand.primary">Profile</Text>
                  <Text color="brand.primary">Image</Text>
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

export default ImageIconInput;
