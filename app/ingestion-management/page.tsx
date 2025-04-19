"use client"
import { Box, Button, HStack, Table, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PaginationComponent from '../pagesComponents/PaginationComponent';
import { PageChangeDetails } from '@/helpers/types';
import { Tooltip } from "@/components/ui/tooltip"

interface IngestionTask {
    id: number;
    name: string;
    status: string;
    startTime: string; // ISO string format
    endTime: string | null; // Can be null if the task is still ongoing
}


const IngestionManagement = () => {
    const [tasks, setTasks] = useState<IngestionTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    // Load tasks from local storage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('ingestionTasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        setLoading(false)
    }, []);

    // Function to start a new ingestion task
    const startNewIngestion = () => {
        const newTask = {
            id: Date.now(),
            name: `Ingestion Task ${tasks.length + 1}`,
            status: 'Pending',
            startTime: new Date().toISOString(),
            endTime: null,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('ingestionTasks', JSON.stringify(updatedTasks));
    };

    // Function to delete an ingestion task
    const deleteIngestion = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('ingestionTasks', JSON.stringify(updatedTasks));
    };

    // Function to download tasks as CSV
    const downloadCSV = () => {
        const csvRows = [];
        const headers = ['Ingestion Task', 'Status', 'Start Time', 'End Time'];
        csvRows.push(headers.join(','));

        tasks.forEach(task => {
            const row = [
                task.name,
                task.status,
                task.startTime,
                task.endTime || 'N/A', // Handle null end time
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ingestion_tasks.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const onPageChange = (details: PageChangeDetails) => {
        setPage(details.page)
    }


    return (
        <Box height={"100%"} suppressHydrationWarning>
            <Box p={4} height={"100%"}>
                <HStack height={"10%"}>
                    <Button mt={4} colorScheme="teal" onClick={startNewIngestion}>
                        Start New Ingestion
                    </Button>
                    <Button mt={4} ml={4} colorScheme="green" onClick={downloadCSV}>
                        Download CSV
                    </Button>
                </HStack>
                <Table.Root variant="outline" mt={5}>
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
                        {loading ?
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
                            }) :
                            !tasks.length ? <Table.Row>
                                <Table.Cell> No record found.</Table.Cell>
                            </Table.Row> :

                                tasks.slice(((page - 1) * pageSize), (page * pageSize)).map(task => (
                                    <Table.Row key={task.id}>
                                        <Table.Cell>{task.name}</Table.Cell>
                                        <Table.Cell>{task.status}</Table.Cell>
                                        <Table.Cell>{new Date(task.startTime).toLocaleString()}</Table.Cell>
                                        <Table.Cell>{task.endTime ? new Date(task.endTime).toLocaleString() : 'N/A'}</Table.Cell>
                                        <Table.Cell>
                                            <Tooltip content={"This feature is coming soon."}>
                                                <Button size="sm" colorScheme="blue">View Logs</Button>
                                            </Tooltip>
                                            <Button size="sm" colorScheme="red" onClick={() => deleteIngestion(task.id)} ml={2}>
                                                Delete
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                    </Table.Body>
                </Table.Root>
                {tasks.length ? <HStack justifyContent={"center"} height={"10%"}>
                    <PaginationComponent page={page} count={tasks.length} pageSize={pageSize} onPageChange={onPageChange} />
                </HStack> : <></>}
            </Box>
        </Box>
    );
};

export default IngestionManagement;