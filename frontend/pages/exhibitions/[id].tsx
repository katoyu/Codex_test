import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Work {
  title: string;
  author: string;
  comment: string;
}

interface Exhibition {
  id: number;
  name: string;
  date: string;
  overall: string;
  works: Work[];
}

export default function ExhibitionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);

  useEffect(() => {
    if (!id) return;
    const data = JSON.parse(
      typeof window !== 'undefined'
        ? localStorage.getItem('exhibitions') || '[]'
        : '[]'
    ) as Exhibition[];
    const found = data.find((ex) => ex.id === Number(id)) || null;
    setExhibition(found);
  }, [id]);

  if (!exhibition) return <Text>Loading...</Text>;

  return (
    <Box p={8}>
      <Heading as="h2" size="md" mb={4}>{exhibition.name}</Heading>
      <Text>Date: {exhibition.date}</Text>
      <Text mt={2}>{exhibition.overall}</Text>
      <Heading as="h3" size="sm" mt={4} mb={2}>Works</Heading>
      <List spacing={3}>
        {exhibition.works.map((work, i) => (
          <ListItem key={i}>
            <strong>{work.title}</strong> by {work.author}
            <Text>{work.comment}</Text>
          </ListItem>
        ))}
      </List>
      <Link href="/">Back to Home</Link>
    </Box>
  );
}
