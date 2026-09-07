# Jal Drishti 2.0 — AI & SAR Flood Early Warning System MVP

**Smart India Hackathon 2026 | Problem Statement: PS 26192 (Disaster Management)**

Jal Drishti 2.0 is an end-to-end, multi-modal disaster intelligence and flood early warning platform designed to translate abstract hydrological sensor readings into hyper-localized, citizen-actionable survival intelligence.

---

## 🌟 Key Capabilities

1. **🛰️ Cloud-Penetrating SAR Radar GIS Map**:
   - Real-time Sentinel-1 C-Band SAR active radar backscatter (VV/VH polarization) mapping water extents through dense monsoon clouds.
   - Interactive GIS Leaflet map with live flood masks, upstream gauge telemetry pins, and relief shelters.

2. **⏱️ Hydrodynamic ETA & Confidence Engine**:
   - Localized time-to-impact countdown (*"Flood crest 4.8 km upstream — Arriving in 1.8 hours"*).
   - 3-Factor Multi-Modal Confidence score (60% SAR Radar + 25% River Gauges + 15% DEM Terrain).
   - Directed Acyclic Graph (DAG) upstream river gauge station visualizer.

3. **🛣️ Dynamic Flood-Aware Safe Evacuation Routing**:
   - Submerged roads auto-blocked in real-time.
   - Route comparison (Safe, Caution, Blocked) with elevation risk metrics and shelter capacity.
   - One-click downloadable & printable **Offline Emergency Pass**.

4. **📻 Resilient LoRa Mesh Network (868/433 MHz)**:
   - Ad-hoc multi-hop packet transmission simulator for zero-cellular disaster zones.
   - Ultra-low-bandwidth Common Alerting Protocol (CAP) SMS broadcast view (< 1 KB).

5. **🤝 Citizen SOS Distress & Volunteer Resource Dispatch**:
   - One-tap SOS beacon with GPS coordinates, trapped count, and emergency needs.
   - Verified volunteer matching with equipment filters (Rescue Boats, Medical Kits, 4x4 Tractors, Rations).

6. **🎙️ Multi-Lingual Audio Siren & Voice Broadcast**:
   - Native voice alerts in **Assamese, Hindi, Bengali, Malayalam, and English** with synthetic dual-tone warning siren.

7. **🏆 SIH 2026 Jury Pitch & Technical Inspector**:
   - Problem Statement 26192 alignment, competitive benchmark matrix vs. CWC/IMD, and 5-stage data flow interactive architecture.

---

## 🚀 Quick Start

```bash
cd jal-drishti-v2
npm install
npm run dev
```

Visit: `http://localhost:3000`
