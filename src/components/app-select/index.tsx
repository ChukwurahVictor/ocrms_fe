import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { forwardRef } from 'react';
import Select from 'react-select';

import { commonSelectStyles } from '@/utils/styles';
import AppSelectProps from './reactSelect.d';

const AppSelect = forwardRef<HTMLDivElement, typeof AppSelectProps>(
    ({ label, errorMessage, isRequired, id, width, register, ...props }, ref) => {
        return (
          <FormControl isRequired={isRequired} width={width}>
            {label && (
              <FormLabel
                htmlFor={id}
                fontSize="14px"
                fontWeight="400"
                color="#A8A8A8"
              >
                {label}
              </FormLabel>
            )}
            <Select
              id={id}
              name={id}
              ref={ref}
              instanceId={"OCRMS"}
              closeMenuOnSelect={true}
              {...register}
              styles={{ ...commonSelectStyles }}
              {...props}
            />
            {errorMessage && (
              <FormHelperText fontSize="10px" color="red" role="alert">
                {errorMessage}
              </FormHelperText>
            )}
          </FormControl>
        );
    },
);

AppSelect.displayName = 'AppSelect';
export default AppSelect;