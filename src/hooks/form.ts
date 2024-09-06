import {
    useForm,
    Resolver,
    UseFormReturn,
    DefaultValues,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


export const useGenericForm = <T extends Record<string, any>>(
    schema: AnyObjectSchema,
    defaultValues: DefaultValues<T> | undefined
): UseFormReturn<T> => {
    const formHook = useForm<T>({
        resolver: yupResolver(schema) as Resolver<T>,
        defaultValues
    });

    return formHook;
};