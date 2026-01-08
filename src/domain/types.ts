export type LayoutMode = 'grid' | 'graph';
export type AppView = 'login' | 'dashboard';

export interface SystemNode {
  id: string; 
  name: string;
  description?: string;
  systemType: string;
  dataUses: string[];
  dataCategories: string[]; 
  dependencies: string[]; 
}

export interface DataMapModel {
  systems: SystemNode[];
}
