import { Container, Heading, Stack, Text } from '@chakra-ui/react';
import { SAMPLE_DATA } from './data/sample_data';
import { normalizeData } from './domain/normalize';
import { SystemGrid } from './ui/SystemgGrid';

export default function App() {
  const model = normalizeData(SAMPLE_DATA);
  return (
    <Container maxW="6xl" py={8}>
      <Stack align="start" >
        <Heading size="lg">Interactive Data Map</Heading>
        <Text color="gray.400">Interactive Data Map</Text>
         <Text color="gray.400"> Normalized {model.systems.length} systems (deduped by fides_key).</Text>
      </Stack>
       <SystemGrid systems={model.systems} />
    </Container>
  );
}