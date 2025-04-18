
"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Table, Skeleton, HStack } from '@chakra-ui/react';
import { Admin, roleOptions, User, userManagementTableHeaders } from '@/utils';
import { AiTwotoneDelete } from "react-icons/ai";
import { AuthInitialValue, PageChangeDetails } from '@/utils/types';
import { toaster } from '@/components/ui/toaster';
import PaginationComponent from '../pagesComponents/PaginationComponent';

type stateType = {
    userList: AuthInitialValue['user'][],
    isLoading: boolean,
    page: number,
    pageSize: number
}

const UserManagement = () => {
    const [state, setState] = useState<stateType>({
        userList: [],
        isLoading: true,
        page: 1,
        pageSize: 8,
    })

    useEffect(() => {
        setState((prev) => (
            {
                ...prev,
                userList: localStorage.getItem("users") ? (JSON.parse(localStorage.getItem("users") as string)).map((item: AuthInitialValue['user']) => Object.assign({ role: "User" }, item)) : [],
                isLoading: false
            }
        ))
    }, [])


    const updateUserById = useCallback((users: stateType['userList'], id: number, newData: AuthInitialValue['user'] | null, deleteRecord = false,) => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            if (deleteRecord) {
                return [
                    ...users.slice(0, userIndex),
                    ...users.slice(userIndex + 1)
                ]
            }
            return [
                ...users.slice(0, userIndex),
                { ...users[userIndex], ...newData },
                ...users.slice(userIndex + 1)
            ];
        }
        return null;
    }, []);

    const onRoleChange = (e: React.ChangeEvent<HTMLSelectElement>, user: AuthInitialValue['user']) => {
        if (e.target.value === user.role) {
            return
        }
        const updatedUserList = updateUserById(state['userList'], user.id, { ...user, role: e.target.value === Admin ? Admin : User })

        if (!updatedUserList) return;

        localStorage.setItem("users", JSON.stringify(updatedUserList))
        setState((prev) => ({ ...prev, userList: updatedUserList }))
        // Show success message
        toaster.create({
            title: "Role updated successfully.",
            type: "success",
            duration: 2000,
        });
    }

    const onDeleteIconClick = (id: number) => {
        const updatedUserList = updateUserById(state['userList'], id, null, true)
        if (!updatedUserList) return;
        localStorage.setItem("users", JSON.stringify(updatedUserList))
        setState((prev) => ({ ...prev, userList: updatedUserList }))
        // Show success message
        toaster.create({
            title: "User delete successfully.",
            type: "success",
            duration: 2000,
        });
    }

    const onPageChange = (details: PageChangeDetails) => {
        setState((prev) => ({ ...prev, page: details.page }))
    }

    return (
        <Box suppressHydrationWarning height={"100%"}>
            <Box p={4} height={"100%"}>
                {/* <Input placeholder="Search by name or email" mb={4} /> */}
                <Table.Root variant="outline" mt={4} height={"90%"}>
                    <Table.Header>
                        <Table.Row>
                            {
                                userManagementTableHeaders.map((item, index) => {
                                    return <Table.ColumnHeader key={index + item.label}>{item.label}</Table.ColumnHeader>
                                })
                            }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {
                            state['isLoading'] ?
                                [1, 2, 3, 4, 5, 6, 7, 8].map((item, key) => {
                                    return <Table.Row key={item + key} >
                                        <Table.Cell>
                                            <Skeleton flex="1" height="5" variant="pulse" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Skeleton flex="1" height="5" variant="pulse" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Skeleton flex="1" height="5" variant="pulse" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Skeleton flex="1" height="5" variant="pulse" />
                                        </Table.Cell>
                                    </Table.Row>
                                })
                                :
                                state['userList'].slice(((state['page'] - 1) * state['pageSize']), (state['page'] * state['pageSize'])).map((item: AuthInitialValue['user'], key: number) => {
                                    return <Table.Row key={item.email + key}>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell>
                                            <select name={`role_${item.id}`} id={`role_${item.id}`} onChange={(e) => onRoleChange(e, item)} defaultValue={item.role}>
                                                {
                                                    roleOptions.map((item, index) => {
                                                        return <option key={index} value={item.value}>{item.label}</option>
                                                    })
                                                }
                                            </select>

                                        </Table.Cell>
                                        <Table.Cell>
                                            <AiTwotoneDelete cursor={"pointer"} onClick={() => {
                                                onDeleteIconClick(item.id)
                                            }} />
                                        </Table.Cell>
                                    </Table.Row>
                                })
                        }
                    </Table.Body>
                </Table.Root>
                <HStack  justifyContent={"center"} height={"10%"}>
                    <PaginationComponent page={state['page']} count={state['userList'].length} pageSize={state['pageSize']} onPageChange={onPageChange} />
                </HStack>
            </Box>
        </Box>
    );
};

export default UserManagement;