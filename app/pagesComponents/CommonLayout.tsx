"use client"
import { Flex, Box } from '@chakra-ui/react';
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
import Header from './Header';
import Footer from './Footer';
import { Provider } from 'react-redux';
import store from '@/store';
import Loader from './Loader';

export default function CommonLayout({ children }: { children?: React.ReactNode; }) {
    return (
        <Provider store={store}>
            <Loader />
            <Flex direction="column" height="100vh" suppressHydrationWarning>
                <Header />
                <Box height={"80%"}>
                    {children}
                </Box>
                <Footer />
                <Toaster />
            </Flex>
        </Provider>
    )
}
