
import React from 'react';
import { Box, Button, Input, Table } from '@chakra-ui/react';
import Header from '../pagesComponents/Header';
import Footer from '../pagesComponents/Footer';

const UserManagement = () => {

    return (
        <Box>
            <Box p={4}>
                <Input placeholder="Search by name or email" mb={4} />
                <Button colorScheme="teal">Add User</Button>
                <Table.Root variant="outline" mt={4}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Email</Table.ColumnHeader>
                            <Table.ColumnHeader>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>John Doe</Table.Cell>
                            <Table.Cell>john@example.com</Table.Cell>
                            <Table.Cell>
                                <Button size="sm" colorScheme="blue">Edit</Button>
                                <Button size="sm" colorScheme="red" ml={2}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    );
};

export default UserManagement;