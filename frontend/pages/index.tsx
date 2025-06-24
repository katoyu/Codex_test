import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <VStack spacing={4} p={8} align="stretch">
      <Heading as="h1" size="lg">My Art Album</Heading>
      <Link href="/new-exhibition" passHref>
        <Button colorScheme="teal" width="fit-content">
          New Exhibition Record
        </Button>
      </Link>
    </VStack>
  );
}
