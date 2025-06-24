import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Container, Heading, Input, Text } from '@chakra-ui/react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = workerSrc;

interface Work {
  title: string;
  author: string;
  image?: string | null;
  comment: string;
}

export default function ImportPdfPage() {
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('Reading PDF...');
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: buffer }).promise;
      const page = await pdf.getPage(1);
      const content = await page.getTextContent();
      const rawText = content.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .join('\n');
      const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const name = lines[0] || 'Untitled Exhibition';
      const date = lines[1] || new Date().toISOString().slice(0, 10);
      const works: Work[] = lines.slice(2).map((line) => {
        const [title = '', author = '', image = '', comment = ''] = line.split(',');
        return { title, author, image: image || null, comment };
      });
      const newRecord = {
        id: Date.now(),
        name,
        date,
        overall: '',
        works,
      };
      const existing = JSON.parse(
        typeof window !== 'undefined' ? localStorage.getItem('exhibitions') || '[]' : '[]'
      );
      localStorage.setItem('exhibitions', JSON.stringify([...existing, newRecord]));
      setStatus('Imported. Redirecting...');
      router.push(`/exhibitions/${newRecord.id}`);
    } catch (err) {
      console.error(err);
      setStatus('Failed to read PDF');
    }
  };

  return (
    <Container py={8} maxW="container.md">
      <Heading as="h2" size="md" mb={4}>
        Import Works from PDF
      </Heading>
      <Input type="file" accept="application/pdf" onChange={handleFile} mb={4} />
      {status && <Text>{status}</Text>}
    </Container>
  );
}
