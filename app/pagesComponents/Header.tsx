import React from 'react';
import { Flex, Heading, HStack, Avatar, Menu, Portal, Box, Text } from '@chakra-ui/react';
import { MdLogout } from "react-icons/md";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { Admin, navOption } from '@/helpers';
import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()
    const isAuthenticate = useAppSelector(state => state.auth.isAuthenticated);
    const name = useAppSelector(state => state.auth.user.name);
    const role = useAppSelector(state => state.auth.user.role);
    const dispatch = useAppDispatch();

    const onLogoutBtnClick = () => {
        dispatch({ type: "auth/logout" })
        redirect('/')
    }
    return (
        <Flex as="header" bg="teal.500" p={4} color="white" justify="space-between" height={"10%"}>
            <Heading size="lg">
                <Link href={"/"}>
                    My Document App
                </Link>
            </Heading>
            <HStack gap={6}>
                {
                    navOption.map((item, index) => {
                        return <React.Fragment key={index}>
                            {
                                isAuthenticate === item.isAuth ?
                                    item.label === "Logout" ?
                                        <Menu.Root positioning={{ placement: "bottom-end" }}>
                                            <Menu.Trigger asChild>
                                                <Box>
                                                    <Avatar.Root key={"subtle"} variant={"subtle"}>
                                                        <Avatar.Fallback name={name} />
                                                    </Avatar.Root>
                                                </Box>
                                            </Menu.Trigger>
                                            <Portal>
                                                <Menu.Positioner>
                                                    <Menu.Content onClick={onLogoutBtnClick}>
                                                        <Menu.Item value="logout">
                                                            {item.label} <MdLogout />
                                                        </Menu.Item>

                                                    </Menu.Content>
                                                </Menu.Positioner>
                                            </Portal>
                                        </Menu.Root>
                                        :
                                        item.label !== "User  Management" ?
                                            <Link href={item.path}>
                                                <Text textDecoration={pathname === item.path ? "underline" : ""}>
                                                    {item.label}
                                                </Text>
                                            </Link>
                                            : role === Admin ?
                                                <Link href={item.path}><Text textDecoration={pathname === item.path ? "underline" : ""}>
                                                    {item.label}
                                                </Text></Link>
                                                : <></>
                                    : <></>
                            }
                        </React.Fragment>
                    })
                }
            </HStack>
        </Flex>
    );
};

export default Header;