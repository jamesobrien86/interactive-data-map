import {
  Box,
  Flex,
  HStack,
  Separator,
  Text,
} from '@chakra-ui/react';
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
    <Box px={6} py={4}>
      {/* Top row: context */}
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="sm" color="gray.600">
          Showing {visibleCount} of {totalCount} systems
        </Text>
        <HStack />
      </Flex>

      <Separator mb={4} />

      {/* Filters */}
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
  );
}
