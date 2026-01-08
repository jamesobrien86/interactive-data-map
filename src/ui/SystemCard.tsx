import { Badge, Box, HStack, Tag, TagLabel, Text, VStack, Wrap } from '@chakra-ui/react';
import { leafCategory } from '../domain/normalize';
import type { SystemNode } from '../domain/types';

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

export function SystemCard({ system }: { system: SystemNode }) {
  const leafCats = uniq(system.dataCategories.map(leafCategory)).sort((a, b) => a.localeCompare(b));

  return (
    <Box borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="lg" p={4} bg="whiteAlpha.50">
      <VStack align="start" >
        <HStack justify="space-between" w="full">
          <Text fontWeight="semibold">{system.name}</Text>
          <Badge colorScheme="gray" variant="subtle">
            {system.systemType}
          </Badge>
        </HStack>

        <Box w="full">
          <Text fontSize="sm" color="gray.400" mb={2}>
            Data Categories
          </Text>
          <Wrap >
            {leafCats.length ? (
              leafCats.map((c) => (
                <Tag.Root key={c} size="sm" variant="subtle">
                  <TagLabel>{c}</TagLabel>
                </Tag.Root>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                None
              </Text>
            )}
          </Wrap>
        </Box>

        <Box w="full">
          <Text fontSize="sm" color="gray.400" mb={2}>
            Data Uses
          </Text>
          <Wrap >
            {system.dataUses.length ? (
              system.dataUses.map((u) => (
                <Tag.Root key={u} size="sm" variant="outline">
                  <TagLabel>{u}</TagLabel>
                </Tag.Root>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                None
              </Text>
            )}
          </Wrap>
        </Box>
      </VStack>
    </Box>
  );
}
