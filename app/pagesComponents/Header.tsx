import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import Link from 'next/link';

const Header = () => {
    return (
        <Flex as="header" bg="teal.500" p={4} color="white" justify="space-between" height={"10%"}>
            <Heading size="lg">My Document App</Heading>
            <HStack gap={6}>
                <Link href="/signup" >Sign Up</Link>
                <Link href="/login" >Login</Link>
                <Link href="/user-management" >User  Management</Link>
                <Link href="/document-management" >Document Management</Link>
                <Link href="/ingestion-management">Ingestion Management</Link>
                <Link href="/qa-interface" >Q&A Interface</Link>
                <Link href="#">Logout</Link>
            </HStack>
        </Flex>
    );
};

export default Header;