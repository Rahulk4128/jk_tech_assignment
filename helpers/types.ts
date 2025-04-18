import { UseFormRegister } from 'react-hook-form';
import { Admin } from '@/helpers';
import { User } from '@/helpers';

export interface SignUpInputs {
	name: string;
	email: string;
	password: string;
}

export interface InputComponentProps {
	errorMsg?: string;
	label?: string;
	required?: boolean;
	type?: string;
	name: string;
	placeholder?: string;
	register: UseFormRegister<any>;
	[key: string]: any;
}

export interface AuthInitialValue {
	isAuthenticated: boolean;
	userLoading: boolean;
	user: {
		name: string;
		email: string;
		id: number;
		role: typeof Admin | typeof User;
	};
}

export interface LoginInputs {
	email: string;
	password: string;
}

export interface PageChangeDetails {
	page: number;
	pageSize: number;
}

export interface PaginationComponentProps {
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '2xs' | 'xs';
	count: number;
	pageSize: number;
	variant?: 'outline' | 'ghost' | 'solid' | 'subtle' | 'surface' | 'plain';
	onPageChange: (details: PageChangeDetails) => void;
	page: number;
	[key: string]: any;
}
