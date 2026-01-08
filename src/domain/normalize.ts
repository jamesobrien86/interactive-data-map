import type { DataMapModel, SystemNode } from './types';

type PrivacyDeclaration = {
  data_categories?: string[];
  data_use?: string;
};

type RawSystem = {
  fides_key: string;
  name: string;
  description?: string;
  system_type?: string;
  system_dependencies?: string[];
  privacy_declarations?: PrivacyDeclaration[];
};
// Helper to get unique values from an array
const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

// Only display the most specific category segment (leaf),
export const leafCategory = (path: string) => {
  const parts = path.split('.').filter(Boolean);
  return parts.length ? parts[parts.length - 1] : path;
};

// Convert the raw API shape into a stable internal model.
// This isolates UI components from schema changes and inconsistencies.
export const normalizeData = (input: unknown): DataMapModel => {
  const rawSystems = Array.isArray(input) ? (input as RawSystem[]) : [];

  // dedupe by fides_key
  const byKey = new Map<string, RawSystem>();
  for (const s of rawSystems) {
    if (!s?.fides_key) continue;
    if (!byKey.has(s.fides_key)) byKey.set(s.fides_key, s);
  }
  // rebuild system nodes
  const systems: SystemNode[] = Array.from(byKey.values()).map((s) => {
    const decls = s.privacy_declarations ?? [];
    const dataUses = uniq(
      decls
        .map((d) => d.data_use)
        .filter((u): u is string => typeof u === 'string' && u.length > 0),
    );
    // Get unique, non-empty data categories
    const dataCategories = uniq(
      decls
        .flatMap((d) => d.data_categories ?? [])
        .filter((c): c is string => typeof c === 'string' && c.length > 0),
    );
    // Build normalized system node
    return {
      id: s.fides_key,
      name: s.name ?? s.fides_key,
      description: s.description,
      systemType: s.system_type ?? 'unknown',
      dependencies: uniq((s.system_dependencies ?? []).filter(Boolean)),
      dataUses,
      dataCategories,
    };
  });
  // Sort systems by type, then name
  systems.sort((a, b) => a.systemType.localeCompare(b.systemType) || a.name.localeCompare(b.name));
  return { systems };
};
