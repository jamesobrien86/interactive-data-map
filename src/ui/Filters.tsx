import {
  Box,
  Button,
  HStack,
  NativeSelect,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

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
    <Box borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="lg" p={4} mt={6} bg="whiteAlpha.50">
      <VStack align="stretch">
        <HStack justify="space-between" align="end" wrap="wrap">
          <Box minW={{ base: '100%', md: '320px' }}>
            <Text fontSize="sm" color="gray.400" mb={2}>
              Filter by data use
            </Text>

            <NativeSelect.Root size="sm" width="240px" >
               <NativeSelect.Field  value={selectedUse}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onUseChange(e.target.value as 'ALL' | string)}
                  bg="blackAlpha.400"
                  borderColor="whiteAlpha.200">
                    <option value="ALL">All</option>
                    {uses.map((use:string) => (
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

        <Box>
          <Text fontSize="sm" color="gray.400" mb={2}>
            Filter by data categories (leaf)
          </Text>

          <Wrap>
            {categories.map((category:string) => {
              const active = selectedCategories.has(category);
              return (
                <WrapItem key={category}>
                  <Tag.Root
                    size="sm"
                    cursor="pointer"
                    variant={active ? 'solid' : 'subtle'}
                    onClick={() => onToggleCategory(category)}
                  >
                    <Tag.Label>{category}</Tag.Label>
                  </Tag.Root>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </VStack>
    </Box>
  );
}
