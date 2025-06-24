import { ChangeEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

export interface Work {
  title: string;
  author: string;
  image?: File | null;
  comment: string;
}

interface Props {
  index: number;
  work: Work;
  onChange: (index: number, field: keyof Work, value: any) => void;
  onRemove: (index: number) => void;
}

export default function WorkInput({ index, work, onChange, onRemove }: Props) {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(index, 'image', file);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <FormControl mb={2}>
        <FormLabel>Title</FormLabel>
        <Input value={work.title} onChange={(e) => onChange(index, 'title', e.target.value)} />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Author</FormLabel>
        <Input value={work.author} onChange={(e) => onChange(index, 'author', e.target.value)} />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Image</FormLabel>
        <Input type="file" accept="image/*" onChange={handleFile} />
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Comment</FormLabel>
        <Textarea value={work.comment} onChange={(e) => onChange(index, 'comment', e.target.value)} />
      </FormControl>
      <Button mt={2} colorScheme="red" variant="outline" onClick={() => onRemove(index)}>
        Remove Work
      </Button>
    </Box>
  );
}
