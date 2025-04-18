"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { SignUpInputs } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup"
import { SignUpValidationSchema } from "@/utils/validation";
import { redirect } from "next/navigation";
import InputComponent from "../pagesComponents/InputComponent";
import { User } from "@/utils";


const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>(
        {
            resolver: yupResolver(SignUpValidationSchema),
        }
    )

    const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
        // Save user data to localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users') as string) || [];
        if (existingUsers.find((item: SignUpInputs) => item.email === data.email)) {
            // Show success message
            toaster.create({
                title: "User already exits.",
                type: "error",
                duration: 5000,
            });
            return
        }
        existingUsers.push({ ...data, id: existingUsers.length + 1, role: User });
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Show success message
        toaster.create({
            title: "Account created Successfully.",
            type: "success",
            duration: 3000,
        });
        redirect('/login')
    };
    console.log({ errors })
    return (
        <Flex height={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Box p={4} width={"40%"}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <InputComponent required={true} errorMsg={errors.name?.message} label={"Name"} register={register} name={"name"} type={"text"} placeholder="Enter your name" />

                    <InputComponent required={true} errorMsg={errors.email?.message} label={"Email"} register={register} name={"email"} type={"email"} placeholder="Enter your email" />

                    <InputComponent required={true} errorMsg={errors.password?.message} label={"Password"} register={register} name={"password"} type={"password"} placeholder="Enter your password" />
                    <Button mt={4} colorScheme="teal" type="submit">Sign Up</Button>
                </form>
            </Box>
        </Flex>
    );
};

export default SignUp;