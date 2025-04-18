"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AuthInitialValue } from '@/helpers/types';
import { handleUserLoading, loadUserData } from '@/store/reducers/authSlice';
import { Flex, ProgressCircle } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { Admin } from '@/helpers';

function Loader() {
    const [authChecked, setAuthChecked] = useState(false)
    const userLoading = useAppSelector(state => state.auth.userLoading);
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const token = localStorage.getItem('token'); // Use js-cookie (works client-side)
        if (token) {
            if (token === "0") {
                dispatch(loadUserData({ name: Admin, email:"test@mailinator.com", id: 0, role: Admin }))
                return
            }
            const existingUsers = JSON.parse(localStorage.getItem('users') as string) || [];

            const userDetails = existingUsers.find((item: AuthInitialValue["user"]) => item.id === Number(token));
            // You might also decode token and get user info here
            dispatch(loadUserData(userDetails)); // or setUser({ name, role, etc. })
        } else {
            dispatch(handleUserLoading(false))
        }
    }, []);

    useEffect(() => {
        if (!userLoading) {
            setAuthChecked(true)
        }
    }, [userLoading])

    if (!authChecked) {
        return <Flex  justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"100vh"} >
            <ProgressCircle.Root value={100}>
                <ProgressCircle.Circle colorPalette={"teal"}>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range />
                </ProgressCircle.Circle>
            </ProgressCircle.Root>
        </Flex>
    }
    return (
        <></>
    )
}

export default Loader