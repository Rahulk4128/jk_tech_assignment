import { Box, Text,Flex } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex as="footer" bg="teal.500" p={4} color="white" justifyContent="center" textAlign="center" height={"10%"}>
            <Text>&copy; 2023 My Document Application. All rights reserved.</Text>
        </Flex>
    );
};

export default Footer;