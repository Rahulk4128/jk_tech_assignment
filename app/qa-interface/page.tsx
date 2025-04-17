import { Box, Button, Textarea, Heading, VStack, Text } from '@chakra-ui/react';
import Header from '../pagesComponents/Header';
import Footer from '../pagesComponents/Footer';

const QAInterface = () => {
    return (
        <Box>
            <Box p={4}>
                <Heading size="lg">Ask a Question</Heading>
                <Textarea placeholder="Type your question here..." mt={4} />
                <Button colorScheme="teal" mt={4}>Ask</Button>
                <Box mt={6}>
                    <Heading size="md">Response</Heading>
                    <Box borderWidth="1px" borderRadius="lg" p={4} mt={2}>
                        <Text>Your answer will be displayed here.</Text>
                    </Box>
                </Box>
                <Box mt={6}>
                    <Heading size="md">History</Heading>
                    <VStack align="start" spaceX={2} spaceY={2} mt={2}>
                        <Text>Question 1 - Timestamp</Text>
                        <Text>Question 2 - Timestamp</Text>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
};

export default QAInterface;