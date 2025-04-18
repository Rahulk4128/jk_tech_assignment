"use client"
import { Box, Button, Table } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface IngestionTask {
    id: number;
    name: string;
    status: string;
    startTime: string; // ISO string format
    endTime: string | null; // Can be null if the task is still ongoing
}


const IngestionManagement = () => {
    const [tasks, setTasks] = useState<IngestionTask[]>([]);

    // Load tasks from local storage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('ingestionTasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
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
                        {tasks.map(task => (
                            <Table.Row key={task.id}>
                                <Table.Cell>{task.name}</Table.Cell>
                                <Table.Cell>{task.status}</Table.Cell>
                                <Table.Cell>{new Date(task.startTime).toLocaleString()}</Table.Cell>
                                <Table.Cell>{task.endTime ? new Date(task.endTime).toLocaleString() : 'N/A'}</Table.Cell>
                                <Table.Cell>
                                    <Button size="sm" colorScheme="blue">View Logs</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <Button mt={4} colorScheme="teal" onClick={startNewIngestion}>
                    Start New Ingestion
                </Button>
                <Button mt={4} ml={4} colorScheme="green" onClick={downloadCSV}>
                    Download CSV
                </Button>
            </Box>
        </Box>
    );
};

export default IngestionManagement;