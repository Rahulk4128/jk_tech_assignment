import { Box, Button } from '@chakra-ui/react';
import { Table } from "@chakra-ui/react"
import Header from '../pagesComponents/Header';
import Footer from '../pagesComponents/Footer';

const IngestionManagement = () => {
    return (
        <Box>
            <Box p={4}>
                <Table.Root variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Ingestion Task</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                            <Table.ColumnHeader>Start Time</Table.ColumnHeader>
                            <Table.ColumnHeader>End Time</Table.ColumnHeader>
                            <Table.ColumnHeader>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Ingestion Task 1</Table.Cell>
                            <Table.Cell>Pending</Table.Cell>
                            <Table.Cell>2023-10-01 10:00 AM</Table.Cell>
                            <Table.Cell>2023-10-01 10:30 AM</Table.Cell>
                            <Table.Cell>
                                <Button size="sm" colorScheme="blue">View Logs</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
                <Button mt={4} colorScheme="teal">Start New Ingestion</Button>
            </Box>
        </Box>
    );
};

export default IngestionManagement;