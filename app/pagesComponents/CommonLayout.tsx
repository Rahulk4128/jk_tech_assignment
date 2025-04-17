import { Flex,Box } from '@chakra-ui/react';
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
import Header from './Header';
import Footer from './Footer';

export default function CommonLayout({ children }: { children?: React.ReactNode; }) {
    return (
        <Flex direction="column" height="100vh">
            <Header />
            <Box height={"80%"}>
                {children}
            </Box>
            <Footer />
            <Toaster/>
        </Flex>
    )
}
