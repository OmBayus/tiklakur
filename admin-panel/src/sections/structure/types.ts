export interface BaseStructure {
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  name: string;
  code: string;
  type: 'BUILDING' | 'FLOOR' | 'SPACE';
  parentStructureId?: number;
}

export interface Space extends BaseStructure {
  type: 'SPACE';
  childStructures: never[];
}

export interface Floor extends BaseStructure {
  type: 'FLOOR';
  childStructures: Space[];
}

export interface Building extends BaseStructure {
  type: 'BUILDING';
  childStructures: Floor[];
}
