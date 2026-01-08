import { useMemo, useState } from 'react';

import { SAMPLE_DATA } from './data/sample_data';
import { normalizeData } from './domain/normalize';
import {
  allDataUses,
  allLeafCategories,
  applyFilters,
  type FiltersState,
} from './domain/selectors';
import type { AppView } from './domain/types';

import { AppLayout } from './ui/AppLayout';
import { Login } from './ui/Login';
import { PageToolbar } from './ui/PageToolbar';
import { SystemGrid } from './ui/SystemGrid';


export default function App() {
    // dashboard logic below
  const model = useMemo(() => normalizeData(SAMPLE_DATA), []);
  const uses: string[] = useMemo(() => allDataUses(model), [model]);
  const categories: string[] = useMemo(() => allLeafCategories(model), [model]);

  const [view, setView] = useState<AppView>('login');
  const [filters, setFilters] = useState<FiltersState>({
    selectedUse: 'ALL',
    selectedCategories: new Set<string>(),
  });
  const visibleSystems = useMemo(
    () => applyFilters(model.systems, filters),
    [model.systems, filters],
  );


  if (view === 'login') {
    return <Login onLogin={() => setView('dashboard')} />;
  }


  return (
    <AppLayout onLogout={() => setView('login')}>
     <PageToolbar
        totalCount={model.systems.length}
        visibleCount={visibleSystems.length}
        uses={uses}
        categories={categories}
        filters={filters}
        onUseChange={(v) => setFilters((f) => ({ ...f, selectedUse: v }))}
        onToggleCategory={(c) =>
          setFilters((f) => {
            const next = new Set(f.selectedCategories);
            next.has(c) ? next.delete(c) : next.add(c);
            return { ...f, selectedCategories: next };
          })
        }
        onClearCategories={() =>
          setFilters((f) => ({ ...f, selectedCategories: new Set() }))
        }
      />

      <SystemGrid systems={visibleSystems} />
    </AppLayout>
  );
}
