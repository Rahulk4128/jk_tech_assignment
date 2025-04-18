import { Box, Button, Input, Table } from '@chakra-ui/react';

const DocumentManagement = () => {
    return (
        <Box>
            <Box p={4}>
                <Input placeholder="Search documents" mb={4} />
                <Button colorScheme="teal" mb={4}>Upload Document</Button>
                <Table.Root variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Document Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Upload Date</Table.ColumnHeader>
                            <Table.ColumnHeader>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Document 1</Table.Cell>
                            <Table.Cell>2023-10-01</Table.Cell>
                            <Table.Cell>
                                <Button size="sm" colorScheme="blue">View</Button>
                                <Button size="sm" colorScheme="red" ml={2}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    );
};

export default DocumentManagement;