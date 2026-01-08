import { Box, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { groupBySystemType } from '../domain/selectors';
import type { SystemNode } from '../domain/types';
import { SystemCard } from './SystemCard';

export function SystemGrid({ systems }: { systems: SystemNode[] }) {
  const grouped = groupBySystemType(systems);

  return (
    <VStack align="stretch"  mt={6}>
      {grouped.map((g) => (
        <Box key={g.key}>
          <HStack justify="space-between" mb={3}>
            <Heading size="sm">{g.key}</Heading>
            <Text color="gray.400" fontSize="sm">
              {g.items.length}
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
            {g.items.map((s) => (
              <SystemCard key={s.id} system={s} />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </VStack>
  );
}
