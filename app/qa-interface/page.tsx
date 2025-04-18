"use client"
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { addQuestion, loadQuestions } from '@/store/reducers/qaSlice';
import { Box, Button, Textarea, Heading, VStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';


const QAInterface = () => {
    const [question, setQuestion] = useState<string>('');
    const dispatch = useAppDispatch();
    const history = useAppSelector((state) => state.qa.history);

    useEffect(() => {
        dispatch(loadQuestions()); // Load questions from local storage on mount
    }, [dispatch]);

    const handleAsk = () => {
        if (question.trim()) {
            const timestamp = new Date().toLocaleString();
            dispatch(addQuestion({ question, timestamp }));
            setQuestion(''); // Clear the input after asking
        }
    };

    return (
        <Box suppressHydrationWarning>
            <Box p={4}>
                <Heading size="lg">Ask a Question</Heading>
                <Textarea
                    placeholder="Type your question here..."
                    mt={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button colorScheme="teal" mt={4} onClick={handleAsk}>
                    Ask
                </Button>
                <Box mt={6}>
                    <Heading size="md">Response</Heading>
                    <Box borderWidth="1px" borderRadius="lg" p={4} mt={2}>
                        <Text>Your answer will be displayed here.</Text>
                    </Box>
                </Box>
                <Box mt={6}>
                    <Heading size="md">History</Heading>
                    <VStack align="start" gap={2} mt={2}>
                        {history.map((item, index) => (
                            <Text key={index}>
                                {item.question} - {item.timestamp}
                            </Text>
                        ))}
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
};

export default QAInterface;