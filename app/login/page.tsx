"use client"
import { Box, Button, Flex } from '@chakra-ui/react';
import { useForm, SubmitHandler } from "react-hook-form";
import { toaster } from "@/components/ui/toaster"
import { LoginInputs } from "@/helpers/types";
import { yupResolver } from "@hookform/resolvers/yup"
import { loginValidationSchema } from "@/helpers/validation";
import { redirect } from "next/navigation";
import InputComponent from "../pagesComponents/InputComponent";
import { useAppDispatch } from '@/hooks/redux-hooks';
import { loadUserData } from '@/store/reducers/authSlice';
import { loginAction } from '@/store/actions/authAction';
import { Admin } from '@/helpers';


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>(
        {
            resolver: yupResolver(loginValidationSchema),
        }
    )
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        // Save user data to localStorage

        if (data.email === "test@mailinator.com" && data.password === "Admin@123") {
            dispatch(loadUserData({ name: Admin, email: "test@mailinator.com", id: 0, role: Admin }))
            // Show success message
            toaster.create({
                title: "Login Successfully.",
                type: "success",
                duration: 3000,
            });
            localStorage.setItem("token","0")
            loginAction(0)
            redirect('/')
        }

        const existingUsers = JSON.parse(localStorage.getItem('users') as string) || [];

        const userDetails = existingUsers.find((item: LoginInputs) => item.email === data.email && item.password === data.password);

        if (userDetails) {
            dispatch(loadUserData(userDetails))
            // Show success message
            toaster.create({
                title: "Login Successfully.",
                type: "success",
                duration: 3000,
            });
            localStorage.setItem("token",userDetails.id)
            loginAction(userDetails.id)
            redirect('/')
        } else {
            toaster.create({
                title: "Please check your email and password.",
                type: "error",
                duration: 5000,
            });
        }



    };
    return (
        <Flex height={"100%"} justifyContent={"center"} alignItems={"center"} suppressHydrationWarning>
            <Box p={4} width={"40%"}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <InputComponent required={true} errorMsg={errors.email?.message} label={"Email"} register={register} name={"email"} type={"email"} placeholder="Enter your email" />

                    <InputComponent required={true} errorMsg={errors.password?.message} label={"Password"} register={register} name={"password"} type={"password"} placeholder="Enter your password" />
                    <Button mt={4} colorScheme="teal" type={"submit"}>Login</Button>
                </form>
            </Box>
        </Flex>
    );
};

export default Login;