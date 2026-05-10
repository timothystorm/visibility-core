export interface ScenarioData {
  [key: string]: unknown;
}

export const SCENARIOS: Record<string, ScenarioData> = {
  default: {
    status: [
      { id: 'EXCEPTION', value: 3 },
      { id: 'DELIVERED', value: 45 },
      { id: 'IN_TRANSIT', value: 10 },
      { id: 'OUT_FOR_DELIVERY', value: 12 },
      { id: 'PENDING', value: 0 },
      { id: 'RETURNED', value: 1 },
    ],
  },
  heavy: {
    status: [
      { id: 'EXCEPTION', value: 142 },
      { id: 'DELIVERED', value: 2048 },
      { id: 'IN_TRANSIT', value: 876 },
      { id: 'OUT_FOR_DELIVERY', value: 234 },
      { id: 'PENDING', value: 56 },
      { id: 'RETURNED', value: 18 },
    ],
  },
  empty: {
    status: [
      { id: 'EXCEPTION', value: 0 },
      { id: 'DELIVERED', value: 0 },
      { id: 'IN_TRANSIT', value: 0 },
      { id: 'OUT_FOR_DELIVERY', value: 0 },
      { id: 'PENDING', value: 0 },
      { id: 'RETURNED', value: 0 },
    ],
  },
};
