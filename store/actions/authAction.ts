import authSlice from '../reducers/authSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const authActions = authSlice.actions;

// we will use this file for heavy computation and api call 