type Requirement =
  | { type: "playerLevel"; level: number }
  | { type: "building"; id: number; level: number }
  | { type: "not-building"; id: number };
