// Simulation Timeline Engine: Modeled time-steps for flood wave progression

export const SIMULATION_STEPS = [
  {
    stepIndex: 0,
    timeLabel: "T = 0h (Current Satellite Pass)",
    statusText: "Active SAR Scan: Water Level +0.0m",
    inundationMultiplier: 1.0,
    waterLevelDelta: 0.0,
    color: "#00F0FF",
    description: "Sentinel-1 SAR C-Band radar pass complete. Normal upstream discharge."
  },
  {
    stepIndex: 1,
    timeLabel: "T = +2h (Crest Inflow)",
    statusText: "Surge Arrival: Water Level +0.65m",
    inundationMultiplier: 1.35,
    waterLevelDelta: 0.65,
    color: "#F59E0B",
    description: "Upstream surge arrives at village boundary. Low-lying embankments overflow."
  },
  {
    stepIndex: 2,
    timeLabel: "T = +4h (Peak Inundation)",
    statusText: "Severe Breach: Water Level +1.40m",
    inundationMultiplier: 1.85,
    waterLevelDelta: 1.40,
    color: "#EF4444",
    description: "Peak flood crest. Route B (Embankment road) submerged and impassable."
  },
  {
    stepIndex: 3,
    timeLabel: "T = +6h (Maximum Extent)",
    statusText: "Critical Extent: Water Level +2.10m",
    inundationMultiplier: 2.30,
    waterLevelDelta: 2.10,
    color: "#991B1B",
    description: "Extreme flood spread across flood plain. Only Route A (High Ridge) remains open."
  },
  {
    stepIndex: 4,
    timeLabel: "T = +12h (Recession Phase)",
    statusText: "Gradual Drainage: Water Level +1.10m",
    inundationMultiplier: 1.50,
    waterLevelDelta: 1.10,
    color: "#3B82F6",
    description: "Upstream discharge subsiding. Water retreating toward main river channel."
  }
];
