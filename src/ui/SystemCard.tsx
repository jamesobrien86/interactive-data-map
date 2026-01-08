import {
  Badge,
  Box,
  HStack,
  RadioGroup,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { leafCategory } from '../domain/normalize';
import type { SystemNode } from '../domain/types';
import { getTagColorScheme } from './TagColors';

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

type Props = {
  system: SystemNode;
  isSelected?: boolean;
  onSelect?: (systemId: string) => void;
};

function fileBadge(systemType: string) {
  // map your systemType to "DOC/DOCX/PDF" style labels/colors if you want
  const label = systemType?.toUpperCase() ?? 'DOC';
  const colorScheme =
    label.includes('PDF') ? 'purple' : label.includes('DOCX') ? 'orange' : 'green';
  return { label, colorScheme };
}

export function SystemCard({
  system,
  isSelected,
  onSelect,
}: Props) {
  const leafCats = uniq(system.dataCategories.map(leafCategory)).sort((a, b) =>
    a.localeCompare(b),
  );
  const { label, colorScheme } = fileBadge(system.systemType);
  return (
    <Box
      borderWidth="1px"
      borderColor="blackAlpha.200"
      borderRadius="lg"
      bg="white"
      p={4}
      boxShadow="sm"
      _hover={{ boxShadow: 'md', borderColor: 'blackAlpha.300' }}
      transition="all 120ms ease"
    >
      <VStack align="start" w="full">
        {/* Top row: title + radio */}
        <HStack justify="space-between" w="full" align="start">
          <Text fontWeight="semibold" pr={3}>
            {system.name}
          </Text>
          <RadioGroup.Root
            value={isSelected ? system.id : undefined}
            onChange={() => onSelect?.(system.id)}
          >
            <RadioGroup.Item
              value={system.id}
              aria-label={`Select ${system.name}`}
            />
          </RadioGroup.Root>

        </HStack>

        {/* File type badge under title */}
        <Badge
          colorScheme={colorScheme}
          variant="subtle"
          borderRadius="sm"
          px={2}
          py={0.5}
          fontSize="xs"
          textTransform="uppercase"
        >
          {label}
        </Badge>
        <Box w="full" pt={2} borderTopWidth="1px" borderTopColor="blackAlpha.100">
          <Text fontSize="sm" color="gray.500" mb={2}>
            Data Categories
          </Text>
          <Wrap>
            {leafCats.length ? (
              leafCats.map((c) => {
                const colorScheme = getTagColorScheme(c);
                return (
                  <Tag.Root key={c} size="sm" variant="subtle" colorScheme="gray" colorPalette={colorScheme}>
                    <TagLabel>{c}</TagLabel>
                  </Tag.Root>
                );
              })
            ) : (
              <Text fontSize="sm" color="gray.400">
                None
              </Text>
            )}
          </Wrap>

          <Text fontSize="sm" color="gray.500" mt={4} mb={2}>
            Data Uses
          </Text>
          <Wrap>
            {system.dataUses.length ? (
              system.dataUses.map((u) => (
                <Tag.Root key={u} size="sm" variant="outline" colorScheme="gray">
                  <TagLabel>{u}</TagLabel>
                </Tag.Root>
              ))
            ) : (
              <Text fontSize="sm" color="gray.400">
                None
              </Text>
            )}
          </Wrap>
        </Box>
      </VStack>
    </Box>
  );
}
