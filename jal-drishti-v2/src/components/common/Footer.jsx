import React from 'react';
import { Shield, Satellite, Activity, Radio } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-hydro-950 border-t border-slate-800/80 text-slate-400 py-6 px-4 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-slate-300 font-sans font-semibold">
            <Shield size={16} className="text-cyan-400" />
            <span>Jal Drishti 2.0 MVP</span>
          </div>
          <span>•</span>
          <span>SIH 2026 Problem Statement: <strong>PS 26192</strong></span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">Theme: Disaster Management</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Satellite size={13} className="text-blue-400" />
            Copernicus Sentinel-1 SAR
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Activity size={13} className="text-emerald-400" />
            CWC Telemetry
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Radio size={13} className="text-purple-400" />
            868MHz LoRa Mesh
          </span>
        </div>
      </div>
    </footer>
  );
}
