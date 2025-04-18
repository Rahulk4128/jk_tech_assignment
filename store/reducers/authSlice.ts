import { AuthInitialValue } from '@/helpers/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthInitialValue = {
	isAuthenticated: false,
	userLoading: null,
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
				userLoading:false
			};
		},
		handleUserLoading(
			state,
			action: PayloadAction<AuthInitialValue['userLoading']>,
		) {
			return {
				...state,
				user: {
					...state.user,
					userLoading: action.payload,
				},
			};
		},
	},
});
export const { loadUserData, handleUserLoading } = authSlice.actions;
export default authSlice;
