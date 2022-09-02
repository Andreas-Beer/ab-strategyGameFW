type ItemConfig = {
  id: number;
  category: number;
  price: Price[];
  effects: EffectConfig[];

  // Feels not right here.
  chances?: Record<"gambling" | "battle" | "scavenging", number>;
  isUnusableInInventory?: boolean;
};
