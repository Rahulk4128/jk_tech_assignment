"use client"
import { useState, useRef, useEffect } from 'react';
import { Box, Button, Input, Skeleton, Table, HStack, VStack } from '@chakra-ui/react';
import { handleDownload } from '@/helpers';
import { toaster } from '@/components/ui/toaster';
import PaginationComponent from '../pagesComponents/PaginationComponent';
import { PageChangeDetails } from '@/helpers/types';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';

interface Document {
    id: string;
    name: string;
    uploadDate: string;
    file: string; // You can store the file object directly if needed
}

interface StateInterface {
    document: Document[],
    file: string | null,
    loading: boolean,
    page: number,
    fileName: string,
    pageSize: number
}

const DocumentManagement = () => {
    const [state, setState] = useState<StateInterface>({
        document: [],
        file: null,
        loading: true,
        page: 1,
        pageSize: 6,
        fileName: ""
    })
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const allowedTypes = [
        'image/png',
        'image/jpeg',
        'application/pdf', // Added PDF to the allowed types
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
        'application/vnd.ms-excel', // XLS
        'text/csv', // CSV
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    ];

    useEffect(() => {
        // Load documents from local storage on component mount
        const storedDocuments = localStorage.getItem('documents');
        if (storedDocuments) {
            setState((prev) => ({ ...prev, document: JSON.parse(storedDocuments), loading: false }))
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];

            if (!allowedTypes.includes(selectedFile.type)) {
                toaster.create({
                    title: "Invalid file type. Allowed types: PNG, JPEG, PDF, XLSX, CSV, XLS.",
                    type: "error",
                    duration: 3000,
                });
                setState((prev) => ({ ...prev, file: null, fileName: '' }));
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Reset the input field
                }
                return;
            }

            // Validate file size
            if (selectedFile.size > 1024 * 1024) {
                toaster.create({
                    title: "File size exceeds 1MB limit.",
                    type: "error",
                    duration: 3000,
                });
                setState((prev) => ({ ...prev, file: null, fileName: "" }));
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Reset the input field
                }
                return;
            }
            // Create a FileReader to read the file as a base64 string
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string; // Get the base64 string
                setState((prev) => ({ ...prev, file: base64String, fileName: selectedFile.name })); // Store the base64 string in state
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = () => {
        if (state['file']) {
            const newDocument = {
                id: Date.now().toString(),
                name: state["fileName"],
                uploadDate: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
                file: state['file'],
            };

            // Update documents state and local storage
            const updatedDocuments = [...state['document'], newDocument];
            setState((prev) => ({ ...prev, document: updatedDocuments, file: null, fileName: "" }))
            localStorage.setItem('documents', JSON.stringify(updatedDocuments));

            toaster.create({
                title: "File uploaded successfully.",
                type: "success",
                duration: 3000,
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the input field
            }
        } else {
            toaster.create({
                title: "Please select the file.",
                type: "info",
                duration: 3000,
            });
        }
    };

    const handleDelete = (id: string) => {
        const updatedDocuments = state['document'].filter(doc => doc.id !== id);
        setState((prev) => ({ ...prev, document: updatedDocuments }))
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    };

    const onPageChange = (details: PageChangeDetails) => {
        setState((prev) => ({ ...prev, page: details.page }))
    }

    return (
        <Box suppressHydrationWarning height={"100%"}>
            <Box p={4} height={"100%"}>
                <Box height={"20%"} w="40%">
                    <Input type="file" onChange={handleFileChange} mb={4} ref={fileInputRef} />
                    <Button colorScheme="teal" mb={4} onClick={handleUpload}>Upload Document</Button>
                </Box>

                <Table.Root variant="outline" mt={4}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Document Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Upload Date</Table.ColumnHeader>
                            <Table.ColumnHeader>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {state['loading'] ?
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
                            !state['document'].length ? <Table.Row>
                                No record found.
                            </Table.Row> :
                                state['document'].slice(((state['page'] - 1) * state['pageSize']), (state['page'] * state['pageSize'])).map(doc => (
                                    <Table.Row key={doc.id}>
                                        <Table.Cell>{doc.name}</Table.Cell>
                                        <Table.Cell>{doc.uploadDate}</Table.Cell>
                                        <Table.Cell>
                                            <HStack>
                                                <FiDownload cursor={"pointer"} onClick={() => handleDownload(doc.file, doc.name)} />
                                                <AiTwotoneDelete cursor={"pointer"} onClick={() => {
                                                    handleDelete(doc.id)
                                                }} />
                                            </HStack>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                    </Table.Body>
                </Table.Root>
                {state["document"].length ? <HStack justifyContent={"center"} height={"10%"}>
                    <PaginationComponent page={state['page']} count={state["document"].length} pageSize={state['pageSize']} onPageChange={onPageChange} />
                </HStack> : <></>}
            </Box>
        </Box>
    );
};

export default DocumentManagement;