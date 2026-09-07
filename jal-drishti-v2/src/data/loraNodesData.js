// LoRa Mesh Network Topology for Disaster Communication
// Operates on 868 MHz / 433 MHz ISM bands when cellular telecom towers fail

export const LORA_NODES = [
  {
    id: "node-panchayat-01",
    name: "Village Panchayat Central Relay (Node 1)",
    type: "gateway",
    frequency: "868.1 MHz",
    txPower: "20 dBm",
    lat: 26.128,
    lng: 91.534,
    rssi: "-78 dBm",
    snr: "+9.2 dB",
    batteryPercent: 94,
    status: "active",
    packetsRelayed: 1420,
    solarCharging: true
  },
  {
    id: "node-gauge-02",
    name: "Upstream Gauge Bridge Repeater (Node 2)",
    type: "repeater",
    frequency: "868.3 MHz",
    txPower: "17 dBm",
    lat: 26.155,
    lng: 91.585,
    rssi: "-92 dBm",
    snr: "+4.5 dB",
    batteryPercent: 82,
    status: "active",
    packetsRelayed: 890,
    solarCharging: true
  },
  {
    id: "node-highground-03",
    name: "North Ridge Hilltop Node (Node 3)",
    type: "repeater",
    frequency: "868.5 MHz",
    txPower: "20 dBm",
    lat: 26.170,
    lng: 91.620,
    rssi: "-65 dBm",
    snr: "+11.8 dB",
    batteryPercent: 99,
    status: "active",
    packetsRelayed: 2310,
    solarCharging: true
  },
  {
    id: "node-shelter-04",
    name: "Amingaon Shelter Base Station (Node 4)",
    type: "base_station",
    frequency: "868.1 MHz",
    txPower: "22 dBm",
    lat: 26.178,
    lng: 91.642,
    rssi: "-72 dBm",
    snr: "+10.1 dB",
    batteryPercent: 100,
    status: "active",
    packetsRelayed: 4100,
    solarCharging: false,
    mainsBackup: true
  }
];

export const MOCK_MESH_PACKETS = [
  {
    id: "pkt-01",
    timestamp: "14:48:12",
    origin: "Node 1 (Palasbari Panchayat)",
    destination: "Node 4 (Amingaon Base)",
    hops: ["Node 1", "Node 2", "Node 3", "Node 4"],
    hopCount: 3,
    payloadType: "FLOOD_ALERT_BROADCAST",
    payloadHex: "0x4A414C2D4554413130384D",
    payloadDecoded: "ALERT: Inundation crest ETA 108m. Evacuate North.",
    latencyMs: 380,
    status: "DELIVERED"
  },
  {
    id: "pkt-02",
    timestamp: "14:47:05",
    origin: "Node 2 (Bridge Repeater)",
    destination: "Node 4 (Amingaon Base)",
    hops: ["Node 2", "Node 3", "Node 4"],
    hopCount: 2,
    payloadType: "GAUGE_TELEMETRY",
    payloadHex: "0x474155474535302E34354D",
    payloadDecoded: "TELEMETRY: Water Level 50.45m (+0.85m over Danger)",
    latencyMs: 240,
    status: "DELIVERED"
  },
  {
    id: "pkt-03",
    timestamp: "14:45:30",
    origin: "Citizen Handheld SOS #14",
    destination: "Node 1 (Panchayat Gateway)",
    hops: ["Direct 1-Hop"],
    hopCount: 1,
    payloadType: "SOS_DISTRESS_BEACON",
    payloadHex: "0x534F532D32362E3132382D39312E353334",
    payloadDecoded: "SOS: 4 Persons trapped on roof, near Ward 3. Need boat.",
    latencyMs: 120,
    status: "DISPATCHED"
  }
];
