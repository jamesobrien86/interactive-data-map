import { Box, Button, ButtonGroup, Flex, HStack, Separator, Text } from '@chakra-ui/react';
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

  groupMode: 'systemType' | 'dataUse';
  onGroupModeChange: (v: 'systemType' | 'dataUse') => void;
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
  groupMode,
  onGroupModeChange,
}: Props) {
  return (
    <Box px={0} py={4}>
      <Flex align="center" justify="space-between" mb={3} gap={3} wrap="wrap">
        <Text fontSize="sm" color="gray.600">
          Showing {visibleCount} of {totalCount} systems
        </Text>

        <HStack>
          <ButtonGroup size="sm" variant="outline">
            <Button
              onClick={() => onGroupModeChange('systemType')}
              disabled={groupMode === 'systemType'}
            >
              System type
            </Button>
            <Button
              onClick={() => onGroupModeChange('dataUse')}
              disabled={groupMode === 'dataUse'}
            >
              Data use
            </Button>
          </ButtonGroup>
        </HStack>
      </Flex>

      <Separator mb={4} />

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
