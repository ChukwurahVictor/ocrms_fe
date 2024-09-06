import { GroupBase, Props } from 'react-select';
import type { } from 'react-select/base';

declare module 'react-select/base' {
    export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
        label?: string;
        errorMessage?: string;
        isRequired?: boolean;
        id?: string;
        width?: string;
        register?: any;
    }
}

export default {} as Props;
