import { UseFormRegister } from "react-hook-form";
import type { IFormValues } from '../types/formValues.types';

export default interface InputProps {
    label: string;
    register: UseFormRegister<IFormValues>;
    required: boolean;
    type: string;
};

export interface IRegisterFormValues {
    email: string;
    password: string;
    password2: string;
    firstname: string;
    lastname: string;
}
