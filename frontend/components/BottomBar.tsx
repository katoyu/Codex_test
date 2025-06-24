import { Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function BottomBar() {
  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      bg="white"
      borderTop="1px solid #e2e8f0"
      py={2}
      justify="space-around"
      zIndex={1000}
    >
      <Link href="/" passHref>
        <Button colorScheme="brand" variant="ghost">Home</Button>
      </Link>
      <Link href="/new-exhibition" passHref>
        <Button colorScheme="brand" variant="ghost">New</Button>
      </Link>
      <Link href="/import-pdf" passHref>
        <Button colorScheme="brand" variant="ghost">Import</Button>
      </Link>
    </Flex>
  );
}
