import { leafCategory } from './normalize';
import type { DataMapModel, SystemNode } from './types';

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

export type FiltersState = {
  selectedUse: 'ALL' | string;
  selectedCategories: Set<string>; // leaf labels
};

type Group<T> = { key: string; items: T[] };

// Get all data uses present in the data map
export const allDataUses = (m: DataMapModel) =>
  uniq(m.systems.flatMap((s) => s.dataUses)).sort((a, b) => a.localeCompare(b));
// Get all leaf data categories present in the data map
export const allLeafCategories = (m: DataMapModel) =>
  uniq(m.systems.flatMap((s) => s.dataCategories.map(leafCategory))).sort((a, b) => a.localeCompare(b));
// Apply filters to systems
export const applyFilters = (systems: SystemNode[], filters: FiltersState) => {
  return systems.filter((s) => {
    const useOk = filters.selectedUse === 'ALL' || s.dataUses.includes(filters.selectedUse);
    const leafs = new Set(s.dataCategories.map(leafCategory));
    const catsOk =
      filters.selectedCategories.size === 0 ||
      Array.from(filters.selectedCategories).every((c) => leafs.has(c)); 

    return useOk && catsOk;
  });
};
// Group systems by system type
export const groupBySystemType = (systems: SystemNode[]) => {
  const map = new Map<string, SystemNode[]>();
  for (const s of systems) {
    const key = s.systemType || 'unknown';
    const arr = map.get(key) ?? [];
    arr.push(s);
    map.set(key, arr);
  }
  // Sort groups and systems within each group
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, items]) => ({
      key,
      items: items.sort((x, y) => x.name.localeCompare(y.name)),
    }));
};

export function indexSystemsById(systems: SystemNode[]): Map<string, SystemNode> {
  return new Map(systems.map((s) => [s.id, s]));
}

export function groupByDataUse(systems: SystemNode[]): Group<SystemNode>[] {
  const map = new Map<string, SystemNode[]>();

  for (const s of systems) {
    const uses = s.dataUses?.length ? s.dataUses : ['None'];

    for (const u of uses) {
      map.set(u, [...(map.get(u) ?? []), s]);
    }
  }

  return Array.from(map.entries())
    .map(([key, items]) => ({
      key,
      // Optional: stable sort within a group for nicer UX
      items: items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}


