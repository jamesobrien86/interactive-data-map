export type LayoutMode = 'grid' | 'graph';

export interface SystemNode {
  id: string; // fides_key
  name: string;
  description?: string;
  systemType: string;
  dataUses: string[];
  dataCategories: string[]; // full taxonomy paths
  dependencies: string[]; // fides_key references
}

export interface DataMapModel {
  systems: SystemNode[];
}
