import { Box, Flex, Separator, Text } from '@chakra-ui/react';
import type { FiltersState } from '../domain/selectors';
import { Filters } from './Filters';

type Props = {
  totalCount: number;
  visibleCount: number;

  uses: string[];
  categories: string[];

  filters: FiltersState;
  onUseChange: (v: 'ALL' | string) => void;
  onToggleCategory: (c: string) => void;
  onClearCategories: () => void;


};

export function PageToolbar({
  totalCount,
  visibleCount,
  uses,
  categories,
  filters,
  onUseChange,
  onToggleCategory,
  onClearCategories,
}: Props) {
  return (
    <Box px={{ base: 4, md: 0 }} py={4}>
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.200"
        borderRadius="xl"
        bg="white"
        boxShadow="sm"
        overflow="hidden"
      >
        <Flex
          align="center"
          justify="space-between"
          px={5}
          py={4}
          bg="gray.50"
        >
          <Text fontSize="sm" color="gray.700">
            Showing <Text as="span" fontWeight="semibold">{visibleCount}</Text> of{' '}
            <Text as="span" fontWeight="semibold">{totalCount}</Text> systems
          </Text>

        </Flex>

        <Separator borderColor="blackAlpha.200" />

        <Box px={5} pb={5} pt={4}>
          <Filters
            uses={uses}
            categories={categories}
            selectedUse={filters.selectedUse}
            onUseChange={onUseChange}
            selectedCategories={filters.selectedCategories}
            onToggleCategory={onToggleCategory}
            onClearCategories={onClearCategories}
          />
        </Box>
      </Box>
    </Box>
  );
}
