import { Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { SAMPLE_DATA } from './data/sample_data';
import { normalizeData } from './domain/normalize';
import { allDataUses, allLeafCategories, applyFilters, type FiltersState } from './domain/selectors';
import type { SystemNode } from './domain/types';
import { Filters } from './ui/Filters';
import { SystemGrid } from './ui/SystemGrid';

export default function App() {
  // Normalize sample data once
  const model = useMemo(() => normalizeData(SAMPLE_DATA), []);
// Get all data uses once
  const uses:string[] = useMemo(() =>  allDataUses(model) , [model]);
  // Get all leaf data categories once
  const categories:string[] = useMemo(() =>  allLeafCategories(model) , [model]);

  const [filters, setFilters] = useState<FiltersState>({
    selectedUse: 'ALL',
    selectedCategories: new Set<string>(),
  });
  // return visible systems based on filters
  const visibleSystems:SystemNode[] = useMemo(() => applyFilters(model.systems, filters), [model.systems, filters]);
  

  return (
    <Container maxW="6xl" py={8}>
      <Stack align="start" >
        <Heading size="lg">Interactive Data Map</Heading>
        <Text color="gray.400">Interactive Data Map</Text>
         <Text color="gray.400"> Normalized {model.systems.length} systems (deduped by fides_key).</Text>
      </Stack>
       <Filters
        uses={uses}
        categories={categories}
        selectedUse={filters.selectedUse}
        onUseChange={(v) => setFilters((f) => ({ ...f, selectedUse: v }))}
        selectedCategories={filters.selectedCategories}
        onToggleCategory={(c) =>
          setFilters((f) => {
            const next = new Set(f.selectedCategories);
            if (next.has(c)) next.delete(c);
            else next.add(c);
            return { ...f, selectedCategories: next };
          })
        }
        onClearCategories={() =>
          setFilters((f) => ({ ...f, selectedCategories: new Set<string>() }))
        }
      />
       <SystemGrid systems={visibleSystems} />
    </Container>
  );
}