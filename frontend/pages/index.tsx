import { Button, Heading, List, ListItem, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Exhibition {
  id: number;
  name: string;
  date: string;
}

export default function Home() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      typeof window !== 'undefined'
        ? localStorage.getItem('exhibitions') || '[]'
        : '[]'
    );
    const sorted = data.sort((a: Exhibition, b: Exhibition) => b.id - a.id);
    setExhibitions(sorted);
  }, []);

  return (
    <VStack spacing={4} p={8} align="stretch">
      <Heading as="h1" size="lg">My Art Album</Heading>
      <Link href="/new-exhibition" passHref>
        <Button colorScheme="teal" width="fit-content">
          New Exhibition Record
        </Button>
      </Link>
      <List spacing={3} mt={4}>
        {exhibitions.map((ex) => (
          <ListItem key={ex.id}>
            <Link href={`/exhibitions/${ex.id}`}>{`${ex.date} - ${ex.name}`}</Link>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}
