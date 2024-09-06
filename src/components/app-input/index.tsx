import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  FlexProps,
  Icon,
  InputGroup,
  InputRightElement,
  Box,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import { generalFormElementStyle } from "@/utils/styles";
import { forwardRef, useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type AppInputProps = {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isPhone?: boolean;
  type?: React.HTMLInputTypeAttribute;
  id: string;
  control?: any;
  register?: any;
  tooltip?: string;
  isTextArea?: boolean;
  defaultValue?: string | (string & readonly string[]);
} & FlexProps &
  InputProps;

const CustomPhoneInput = forwardRef<HTMLInputElement, any>(
  ({ ...rest }, ref) => (
    <Input
      ref={ref}
      border="none"
      outline="none"
      variant="unstyled"
      color="#161616"
      fontSize="12px"
      fontWeight={400}
      _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
      {...rest}
    />
  )
);

CustomPhoneInput.displayName = "CustomPhoneInput";

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      errorMessage,
      isRequired,
      type,
      control,
      id,
      isPhone,
      register,
      defaultValue,
      isTextArea,
      _placeholder,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    return (
      <FormControl isRequired={isRequired}>
        {label && (
          <FormLabel
            htmlFor={id}
            fontSize="14px"
            fontWeight="400"
            color="text.ash"
          >
            {label}
          </FormLabel>
        )}

        {isPhone ? (
          <Controller
            name={id || "phone"}
            control={control}
            render={({ field }) => (
              <PhoneInput
                id={id}
                defaultValue={defaultValue}
                defaultCountry="NG"
                {...field}
                style={generalFormElementStyle}
                inputComponent={CustomPhoneInput}
              />
            )}
          />
        ) : isTextArea ? (
          <Textarea
            id={id}
            style={{ height: "4.1rem", borderRadius: "0" }}
            {...register}
            placeholder={_placeholder}
          />
        ) : type !== "password" ? (
          <Input
            type={type}
            ref={ref}
            name={id}
            {...rest}
            {...register}
            style={generalFormElementStyle}
            _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
          />
        ) : (
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              ref={ref}
              name={id}
              {...register}
              {...rest}
              style={generalFormElementStyle}
              _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
            />
            <InputRightElement width="2rem">
              <Box onClick={() => setShow(!show)} color="#A8A8A8">
                <Icon
                  as={show ? AiOutlineEye : AiOutlineEyeInvisible}
                  boxSize={6}
                />
              </Box>
            </InputRightElement>
          </InputGroup>
        )}

        {errorMessage && (
          <FormHelperText fontSize="10px" color="red" role="alert">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

AppInput.displayName = "AppInput";
export default AppInput;

      // <FormControl isRequired={isRequired} /*mb={2}*/>
      //   {label && (
      //     <FormLabel
      //       htmlFor={id}
      //       fontSize="14px"
      //       fontWeight="400"
      //       color="text.ash"
      //     >
      //       {label}
      //     </FormLabel>
      //   )}
      //   {isPhone ? (
      //     <Controller
      //       name={id ? id : "phone"}
      //       control={control}
      //       render={({ field }) => (
      //         <PhoneInput
      //           id={id}
      //           defaultValue={defaultValue}
      //           defaultCountry="NG"
      //           {...field}
      //           style={{ ...generalFormElementStyle }}
      //           inputComponent={CustomPhoneInput}
      //         />
      //       )}
      //     />
      //   ) : type !== "password" ? (
      //     <Input
      //       type={type}
      //       ref={ref}
      //       name={id}
      //       {...rest}
      //       {...register}
      //       style={{ ...generalFormElementStyle }}
      //       _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
      //     />
      //   ) : isTextArea ? (
      //     <Textarea
      //       style={{
      //         height: '4.1rem',
      //         // ...textInputStyle,
      //       }}
      //       id={id}
      //       {...register}
      //       placeholder={_placeholder}
      //       // defaultValue={defaultValue}
      //       // _placeholder={placeholderStyle}
      //       // onChange={onChange}
      //     />
      //   ) : (
      //     <InputGroup size="md">
      //       <Input
      //         // pr="2.5rem"
      //         ref={ref}
      //         name={id}
      //         {...register}
      //         {...rest}
      //         type={show ? "text" : "password"}
      //         style={{ ...generalFormElementStyle }}
      //         _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
      //       />
      //       <InputRightElement width="2rem">
      //         <Box
      //           onClick={() => setShow(!show)}
      //           /*mt=".5rem"*/ color="#A8A8A8"
      //         >
      //           {show ? (
      //             <Icon as={AiOutlineEye} boxSize={6} />
      //           ) : (
      //             <Icon as={AiOutlineEyeInvisible} boxSize={6} />
      //           )}
      //         </Box>
      //       </InputRightElement>
      //     </InputGroup>
      //   )}
      //   {errorMessage && (
      //     <FormHelperText fontSize="10px" color="red" role="alert">
      //       {errorMessage}
      //     </FormHelperText>
      //   )}
      // </FormControl>