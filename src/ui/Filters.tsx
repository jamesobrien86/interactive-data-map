import {
  Box,
  Button,
  HStack,
  NativeSelect,
  Separator,
  Tag,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { getTagColorScheme } from './TagColors';


export function Filters(props: {
  uses: string[];
  categories: string[];
  selectedUse: 'ALL' | string;
  onUseChange: (v: 'ALL' | string) => void;
  selectedCategories: Set<string>;
  onToggleCategory: (c: string) => void;
  onClearCategories: () => void;
}) {
  const {
    uses,
    categories,
    selectedUse,
    onUseChange,
    selectedCategories,
    onToggleCategory,
    onClearCategories,
  } = props;

  return (
    <Box
      mt={6}
      borderWidth="1px"
      borderColor="blackAlpha.200"
      borderRadius="xl"
      bg="white"
      boxShadow="sm"
      overflow="hidden"
    >
      {/* Header row */}
      <HStack justify="space-between" px={5} py={4}>
        <Box>
          <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={2}>
            Filter by data use
          </Text>

          <NativeSelect.Root size="sm" width={{ base: 'full', md: '260px' }}>
            <NativeSelect.Field
              value={selectedUse}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onUseChange(e.target.value as 'ALL' | string)
              }
              bg="gray.50"
              borderColor="blackAlpha.300"
              _hover={{ borderColor: 'blackAlpha.400' }}
              aria-label="data-use-filter"
            >
              <option value="ALL">All</option>
              {uses.map((use: string) => (
                <option key={use} value={use}>
                  {use}
                </option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Box>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCategories}
          disabled={selectedCategories.size === 0}
        >
          Clear categories
        </Button>
      </HStack>

      <Separator borderColor="blackAlpha.200" />

      <Box px={5} py={4} bg="gray.50">
        <HStack justify="space-between" mb={2} align="baseline">
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            Filter by data categories
          </Text>

          <Text fontSize="xs" color="gray.500">
            {selectedCategories.size ? `${selectedCategories.size} selected` : 'None selected'}
          </Text>
        </HStack>

        <Box
          borderWidth="1px"
          borderColor="blackAlpha.200"
          bg="white"
          borderRadius="lg"
          p={3}
          aria-label="category-filter"
        >
          <Wrap>
            {categories.map((category: string) => {
              const active = selectedCategories.has(category);
              const colorScheme = getTagColorScheme(category);
              return (
                <WrapItem key={category}>
                  <Tag.Root
                    size="sm"
                    cursor="pointer"
                    role="button"
                    aria-pressed={active}
                    variant={active ? 'solid' : 'subtle'}
                    colorPalette={colorScheme}
                    onClick={() => onToggleCategory(category)}
                    _hover={{ opacity: 0.9 }}
                  >
                    {category}
                  </Tag.Root>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
}
