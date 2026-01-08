import { Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function App() {
  return (
    <Container maxW="6xl" py={8}>
      <Stack align="start" >
        <Heading size="lg">Interactive Data Map</Heading>
        <Text color="gray.400">Dashboard view of systems, data uses, and data categories.</Text>
      </Stack>
    </Container>
  );
}