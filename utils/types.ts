import { UseFormRegister } from "react-hook-form";

export interface SignUpInputs {
	name: string;
	email: string;
	password: string;
}

export interface InputComponentProps {
	errorMsg?: string;
	label?:string;
	required?: boolean;
	type?: string;
	name: string;
	placeholder?: string;
	register:UseFormRegister<any>;
	[key: string]: any;
}
