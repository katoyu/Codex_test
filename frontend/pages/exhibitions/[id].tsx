import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Work {
  title: string;
  author: string;
  image?: string | null;
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
      <VStack spacing={6} align="stretch">
        {exhibition.works.map((work, i) => (
          <Box key={i} borderWidth="1px" borderRadius="md" overflow="hidden">
            {work.image && (
              <Image src={work.image} alt={work.title} width="100%" />
            )}
            <Box p={4}>
              <Heading as="h4" size="sm">
                {work.title}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {work.author}
              </Text>
              <Text mt={2}>{work.comment}</Text>
            </Box>
          </Box>
        ))}
      </VStack>
      <Link href="/">Back to Home</Link>
    </Box>
  );
}
