import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Satellite, 
  Radio, 
  Cpu, 
  Route, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Compass, 
  FileText 
} from 'lucide-react';
import clsx from 'clsx';

export function JuryPitchMode() {
  const [activeSubTab, setActiveSubTab] = useState('matrix'); // 'overview' | 'matrix' | 'pipeline' | 'hardware'

  const comparisonMatrix = [
    {
      feature: "Cloud-Penetrating Monsoon Flood Mapping",
      jalDrishti: "Sentinel-1 SAR C-Band Radar (All-Weather active backscatter)",
      cwcImd: "Optical satellite images (Blocked by monsoon clouds)",
      google: "Optical/Static ML models with latency",
      status: "unique"
    },
    {
      feature: "Actionable Warning Metric",
      jalDrishti: "Precise localized ETA (e.g. 'Arriving in 1.8 hrs at 3.2 km/h')",
      cwcImd: "Raw gauge height (e.g. '50.45m' - Confusing for citizens)",
      google: "Broad probability level (Low/Med/High)",
      status: "unique"
    },
    {
      feature: "Flood-Aware Safe Evacuation Routing",
      jalDrishti: "Dynamic Dijkstra algorithm auto-blocking inundated roads",
      cwcImd: "None (Citizens left to guess safe roads)",
      google: "Standard traffic routing without live flood depth masking",
      status: "unique"
    },
    {
      feature: "Off-Grid Resilient Communications",
      jalDrishti: "868/433 MHz LoRa Mesh Nodes (Works when towers collapse)",
      cwcImd: "Requires active 4G/5G mobile tower connection",
      google: "Internet/Web connection mandatory",
      status: "unique"
    },
    {
      feature: "Multi-Lingual Voice & Siren Alerting",
      jalDrishti: "Instant native voice in Assamese, Hindi, Bengali, Malayalam",
      cwcImd: "English/Hindi PDF bulletins on websites",
      google: "Generic app notifications",
      status: "unique"
    },
  ];

  const pipelineStages = [
    {
      step: "01",
      title: "Multi-Source Telemetry Ingestion",
      icon: Satellite,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/40 border-cyan-500/40",
      description: "Copernicus Sentinel-1 SAR active radar data + CWC telemetry river level streams ingested via automated Python/GEE workers."
    },
    {
      step: "02",
      title: "SAR Backscatter Water Masking",
      icon: Layers,
      color: "text-blue-400",
      bgColor: "bg-blue-950/40 border-blue-500/40",
      description: "Applies Otsu bimodal thresholding on VV/VH backscatter matrices to isolate inundated flood plains through 100% cloud cover."
    },
    {
      step: "03",
      title: "Hydrodynamic Wave Propagation ETA",
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-950/40 border-amber-500/40",
      description: "Gauge network modeled as a Directed Acyclic Graph (DAG). Computes surge travel time (v = d / Δt) and weighted multi-factor confidence."
    },
    {
      step: "04",
      title: "Dynamic Safe Corridor Routing",
      icon: Route,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/40 border-emerald-500/40",
      description: "Overlays SAR flood polygon on OpenStreetMap graph. Disables submerged road edges and generates high-ground paths to relief shelters."
    },
    {
      step: "05",
      title: "Multi-Channel Resilient Alert Relay",
      icon: Radio,
      color: "text-purple-400",
      bgColor: "bg-purple-950/40 border-purple-500/40",
      description: "Broadcasts multi-lingual voice sirens on PWA, dispatches 140-byte CAP SMS, and relays packets over solar-powered LoRa mesh nodes."
    }
  ];

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-6 border border-slate-800 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="text-amber-400" size={22} />
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-sans">
              SIH 2026 Jury Pitch & Technical Deep-Dive
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Problem Statement ID: <strong className="text-cyan-400">PS 26192</strong> • Theme: <strong className="text-slate-200">Disaster Management (Flood Early Warning)</strong>
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-1 bg-hydro-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {[
            { id: 'matrix', label: '⚔️ Competitive Advantage' },
            { id: 'pipeline', label: '🔄 5-Stage Architecture' },
            { id: 'hardware', label: '📻 LoRa & Tech Stack' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={clsx(
                'px-3 py-1.5 rounded-lg font-bold transition-all',
                activeSubTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Competitive Benchmark Matrix */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono font-bold text-xs text-cyan-400 uppercase tracking-wider">
              Benchmark: Jal Drishti 2.0 vs Existing Disaster Warning Systems
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              100% NOVELTY ALIGNMENT
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-hydro-900 text-slate-300 border-b border-slate-800">
                  <th className="p-3">Core Capability</th>
                  <th className="p-3 text-cyan-300 bg-cyan-950/40 border-x border-cyan-500/30">
                    ★ Jal Drishti 2.0 (Proposed)
                  </th>
                  <th className="p-3 text-slate-400">Current CWC / IMD</th>
                  <th className="p-3 text-slate-400">Google Flood Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[11px]">
                {comparisonMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-hydro-900/50">
                    <td className="p-3 font-semibold text-slate-200 font-sans">{row.feature}</td>
                    <td className="p-3 bg-cyan-950/20 text-cyan-200 font-bold border-x border-cyan-500/20">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                        <span>{row.jalDrishti}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <XCircle size={13} className="text-red-400 flex-shrink-0" />
                        <span>{row.cwcImd}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-amber-400 flex-shrink-0" />
                        <span>{row.google}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 5-Stage Data Flow Interactive Architecture */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-4">
          <h3 className="font-mono font-bold text-xs text-cyan-400 uppercase tracking-wider">
            End-to-End Algorithmic & Data Pipeline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {pipelineStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className={clsx(
                    'p-4 rounded-xl border flex flex-col justify-between space-y-3',
                    stage.bgColor
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black opacity-60">STAGE {stage.step}</span>
                      <Icon className={stage.color} size={20} />
                    </div>
                    <h4 className="font-bold text-xs text-slate-100 mt-2 font-sans">{stage.title}</h4>
                  </div>
                  <p className="text-[11px] font-mono text-slate-300 leading-relaxed">{stage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Hardware & LoRa Spec */}
      {activeSubTab === 'hardware' && (
        <div className="space-y-4 font-mono text-xs">
          <h3 className="font-bold text-xs text-cyan-400 uppercase tracking-wider">
            Off-Grid Hardware Architecture & Cost Feasibility
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-hydro-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-purple-300 font-sans">ESP32 + SX1276 LoRa Transceiver</h4>
              <p className="text-[11px] text-slate-400">
                Operates on 868 MHz ISM band. Transmits mesh packets up to 12 km line-of-sight between village panchayat nodes.
              </p>
              <div className="pt-2 text-[10px] text-slate-300 border-t border-slate-800 space-y-1">
                <p>• Unit Cost: <strong>&lt; ₹1,400 per node</strong></p>
                <p>• Power: <strong>3.7V Li-Ion with 5W Solar Panel</strong></p>
              </div>
            </div>

            <div className="bg-hydro-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-cyan-300 font-sans">Copernicus SAR Processing Stack</h4>
              <p className="text-[11px] text-slate-400">
                Automated Google Earth Engine / Python worker polling Sentinel-1 GRD products for rapid C-band backscatter calibration.
              </p>
              <div className="pt-2 text-[10px] text-slate-300 border-t border-slate-800 space-y-1">
                <p>• Resolution: <strong>10m Spatial Ground Sample</strong></p>
                <p>• Polarization: <strong>Dual-pol VV + VH</strong></p>
              </div>
            </div>

            <div className="bg-hydro-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sm text-emerald-300 font-sans">Dynamic Routing Engine</h4>
              <p className="text-[11px] text-slate-400">
                NetworkX / pgRouting graph model on OpenStreetMap. Real-time edge cost penalty applied to flood intersection polygons.
              </p>
              <div className="pt-2 text-[10px] text-slate-300 border-t border-slate-800 space-y-1">
                <p>• Algorithm: <strong>Dynamic Dijkstra / A*</strong></p>
                <p>• Computation Time: <strong>&lt; 35ms per route</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
