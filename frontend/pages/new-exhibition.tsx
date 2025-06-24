import { Container, Heading } from '@chakra-ui/react';
import ExhibitionForm from '../components/ExhibitionForm';

export default function NewExhibitionPage() {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h2" size="md" mb={4}>
        New Exhibition Record
      </Heading>
      <ExhibitionForm />
    </Container>
  );
}
