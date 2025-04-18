import { AuthInitialValue } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthInitialValue = {
	isAuthenticated: false,
	userLoading: true,
	user: {
		name: '',
		email: '',
		id: 0,
		role: 'User',
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loadUserData(state, action: PayloadAction<AuthInitialValue['user']>) {
			return {
				...state,
				isAuthenticated: true,
				user: {
					...state.user,
					...action.payload,
				},
				userLoading: false,
			};
		},
	},
});
export const { loadUserData } = authSlice.actions;
export default authSlice;
