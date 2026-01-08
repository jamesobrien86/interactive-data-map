import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

export function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <Container maxW="sm" py={24}>
      <VStack align="stretch">
        <Box textAlign="center">
          <Heading size="lg">Data Map</Heading>
          <Text color="gray.400" mt={2}>
            Sign in to view system data
          </Text>
        </Box>

        <Stack>
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
        </Stack>

        <Button colorScheme="blue" onClick={onLogin}>
          Sign in
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Demo login — no authentication required
        </Text>
      </VStack>
    </Container>
  );
}
