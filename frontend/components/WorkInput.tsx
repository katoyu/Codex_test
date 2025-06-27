import { ChangeEvent, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Image } from '@chakra-ui/react';

export interface Work {
  title: string;
  author: string;
  image?: string | null;
  comment: string;
}

interface Props {
  index: number;
  work: Work;
  onChange: (index: number, field: keyof Work, value: any) => void;
  onRemove: (index: number) => void;
}

export default function WorkInput({ index, work, onChange, onRemove }: Props) {
  const [loading, setLoading] = useState(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(index, 'image', null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(index, 'image', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const searchImage = async () => {
    if (!work.title && !work.author) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        title: work.title,
        author: work.author,
      });
      const res = await fetch(`/api/searchImage?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`status ${res.status}`);
      }
      const data = await res.json();
      if (data.imageUrl) {
        onChange(index, 'image', data.imageUrl as string);
      } else {
        alert('No image found');
      }
    } catch (e) {
      console.error('image search failed', e);
      alert('Image search failed');
    } finally {
      setLoading(false);
    }
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
        <Button mt={2} size="sm" onClick={searchImage} isLoading={loading}>
          Search Image
        </Button>
        {work.image && (
          <Image
            src={work.image}
            alt={work.title}
            mt={2}
            maxH="200px"
            objectFit="contain"
          />
        )}
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
