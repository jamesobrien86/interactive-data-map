import { Box, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { groupBySystemType } from '../domain/selectors';
import type { SystemNode } from '../domain/types';
import { SystemCard } from './SystemCard';

export function SystemGrid({ systems }: { systems: SystemNode[] }) {
  const grouped = groupBySystemType(systems);

  return (
    <VStack align="stretch" mt={6} gap={10}>
      {grouped.map((g) => (
        <Box
          key={g.key}
          borderWidth="1px"
          borderColor="blackAlpha.200"
          borderRadius="2xl"
          bg="gray.50"
          p={{ base: 4, md: 5 }}
        >
          {/* Group header */}
          <HStack justify="space-between" mb={4} align="baseline">
            <Heading size="sm" letterSpacing="tight">
              {g.key}
            </Heading>

        
          </HStack>

          {/* Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3 }}
            gap={6}
          >
            {g.items.map((s) => (
              <SystemCard key={s.id} system={s} />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </VStack>
  );
}
