import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import WorkInput, { Work } from './WorkInput';

export default function ExhibitionForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [overall, setOverall] = useState('');
  const [works, setWorks] = useState<Work[]>([]);

  const handleWorkChange = (index: number, field: keyof Work, value: any) => {
    setWorks((prev) =>
      prev.map((w, i) => (i === index ? { ...w, [field]: value } : w))
    );
  };

  const addWork = () => setWorks([...works, { title: '', author: '', image: null, comment: '' }]);

  const removeWork = (index: number) => setWorks(works.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for submit logic (e.g., Supabase)
    console.log({ name, date, overall, works });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Exhibition Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Overall Impression</FormLabel>
          <Textarea value={overall} onChange={(e) => setOverall(e.target.value)} />
        </FormControl>

        {works.map((work, i) => (
          <WorkInput
            key={i}
            index={i}
            work={work}
            onChange={handleWorkChange}
            onRemove={removeWork}
          />
        ))}
        <Button onClick={addWork}>Add Work</Button>
        <Button type="submit" colorScheme="teal">
          Save Record
        </Button>
      </VStack>
    </Box>
  );
}
