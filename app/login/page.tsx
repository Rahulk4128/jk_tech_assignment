import { Box, Button, Input, Field } from '@chakra-ui/react';
import Header from '../pagesComponents/Header';
import Footer from '../pagesComponents/Footer';

const Login = () => {
    return (
        <Box>
            <Box p={4}>
                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" placeholder="Enter your email" />
                </Field.Root>
                <Field.Root mt={4}>
                    <Field.Label>Password</Field.Label>
                    <Input type="password" placeholder="Enter your password" />
                </Field.Root>
                <Button mt={4} colorScheme="teal">Login</Button>
            </Box>
        </Box>
    );
};

export default Login;