import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';

const appReducer = combineReducers({
	auth: authSlice.reducer,
});

const rootReducer = (
	state: ReturnType<typeof appReducer> | undefined,
	action: any,
) => {
	if (action.type === 'auth/logout') {
		state = undefined; // Reset all slices
	}
	return appReducer(state, action);
};

const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) =>{return},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
