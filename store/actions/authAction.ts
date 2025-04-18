'use server';
import { cookies } from 'next/headers';

// export const authActions = authSlice.actions;

// we will use this file for heavy computation and api call 



export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

export async function loginAction(id:number) {
    const cookieStore = await cookies();
      cookieStore.set('token', `${id}`, {
        httpOnly: true,
        secure: true, // ensure HTTPS for production
        path: '/',
        maxAge: 60 * 60 * 24 * 1, // 7 days
      });
  }