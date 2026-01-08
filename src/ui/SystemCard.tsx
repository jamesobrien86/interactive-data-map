import {
  Badge,
  Box,
  Collapsible,
  HStack,
  RadioGroup,
  Separator,
  Stack,
  Text,
  VStack,
  Wrap
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { RightOutlined } from '@ant-design/icons';
import { Tag, TagLabel } from '@chakra-ui/react';
import { leafCategory } from '../domain/normalize';
import type { SystemNode } from '../domain/types';
import { getTagColorScheme } from './TagColors';

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

type Props = {
  system: SystemNode;
  isSelected?: boolean;
  onSelect?: (systemId: string) => void;
  systemIndex: Map<string, SystemNode>;
};

function fileBadge(systemType: string) {
  const label = systemType?.toUpperCase() ?? 'DOC';
  const colorScheme =
    label.includes('PDF') ? 'purple' : label.includes('DOCX') ? 'orange' : 'green';
  return { label, colorScheme };
}
export function SystemCard({ system, isSelected, onSelect, systemIndex }: Props) {

  const leafCats = useMemo(
    () => uniq(system.dataCategories.map(leafCategory)).sort((a, b) => a.localeCompare(b)),
    [system.dataCategories],
  );

  const dependencySystems = useMemo(
    () =>
      (system.dependencies ?? [])
        .map((id) => systemIndex.get(id))
        .filter(Boolean) as SystemNode[],
    [system.dependencies, systemIndex],
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
      h="full"
    >
      <VStack align="start" w="full" gap={3}>
        <HStack justify="space-between" w="full" align="start">
          <Text fontWeight="semibold" pr={3}>
            {system.name}
          </Text>
          <RadioGroup.Root
            value={isSelected ? system.id : undefined}
            onValueChange={() => onSelect?.(system.id)}
          >
            <RadioGroup.Item value={system.id} aria-label={`Select ${system.name}`} />
          </RadioGroup.Root>
        </HStack>
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

        <Separator borderColor="blackAlpha.200" />
        <Box w="full">
          <Text fontSize="sm" color="gray.600" mb={2} fontWeight="medium">
            Data Categories
          </Text>
          <Wrap gap={2}>
            {leafCats.length ? (
              leafCats.map((c) => (
                <Tag.Root
                  key={c}
                  size="sm"
                  variant="subtle"
                  colorScheme={getTagColorScheme(c)}
                >
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
          <Text fontSize="sm" color="gray.600" mb={2} fontWeight="medium">
            Data Uses
          </Text>
          <Wrap gap={2}>
            {system.dataUses.length ? (
              system.dataUses.map((u) => (
                <Tag.Root
                  key={u}
                  size="sm"
                  variant="outline"
                  colorScheme={getTagColorScheme(u)}
                >
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
        <Box w="full">
          <Collapsible.Root>
            <Collapsible.Trigger
                  paddingY="3"
                  display="flex"
                  gap="2"
                  alignItems="center"
                >
                <Collapsible.Indicator
                    transition="transform 0.2s"
                    _open={{ transform: "rotate(90deg)" }}
                  >
                    <RightOutlined />
                  </Collapsible.Indicator>
                Show
              </Collapsible.Trigger>
                <Collapsible.Content>
                <Stack padding="4" borderWidth="1px">
                    <Box pt={2}>
                      <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={1}>
                        Description
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        {system.description?.trim() ? system.description : 'None'}
                      </Text>
                      <Text fontSize="sm" color="gray.600" fontWeight="medium" mt={4} mb={2}>
                        Dependencies
                      </Text>
                      {dependencySystems.length ? (
                        <VStack align="start" gap={1}>
                          {dependencySystems.map((dep) => (
                            <Text key={dep.id} fontSize="sm" color="gray.700">
                              • {dep.name}
                            </Text>
                          ))}
                        </VStack>
                      ) : (
                        <Text fontSize="sm" color="gray.500">
                          None
                        </Text>
                      )}
                    </Box>
                </Stack>
            </Collapsible.Content>
          </Collapsible.Root>
        </Box>
      </VStack>
    </Box>
  );
}
