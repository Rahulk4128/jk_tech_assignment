
"use client"
import { useAppSelector } from '@/hooks/redux-hooks';
import { Box } from '@chakra-ui/react';

const Home = () => {
  const name = useAppSelector(state => state.auth.user.name);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return (
    <Box as="main" flex="1" p={4} suppressHydrationWarning>
      <h1>{`Welcome${isAuthenticated ? `, ${name}` : "to the Document Application"}`}</h1>
      {isAuthenticated ? <p>Select an option from the menu above.</p> : <></>}
    </Box>
  );
};

export default Home;

