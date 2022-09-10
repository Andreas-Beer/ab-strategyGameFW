type Requirement =
  | { type: 'playerLevel'; level: number }
  | { type: 'item'; itemId: number; amount?: number }
  | { type: 'building'; buildingId: number; level: number }
  | { type: 'not-building'; buildingId: number };
