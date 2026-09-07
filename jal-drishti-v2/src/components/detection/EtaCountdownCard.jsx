import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Clock, ShieldAlert, Waves, Compass, Activity, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function EtaCountdownCard() {
  const { currentVillage, currentSimStep } = useAppState();

  // Adjust ETA dynamically based on simulation time-step
  const adjustedEtaMinutes = Math.max(0, currentVillage.etaMinutes - (currentSimStep.stepIndex * 60));
  const etaHours = Math.floor(adjustedEtaMinutes / 60);
  const etaMins = adjustedEtaMinutes % 60;
  const isBreached = adjustedEtaMinutes === 0;

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-cyan-400" size={18} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            Actionable Impact Timeline (ETA)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          HYDRODYNAMIC MODEL
        </span>
      </div>

      {/* Big ETA Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Main Countdown Box */}
        <div className={clsx(
          'sm:col-span-2 rounded-xl p-4 border flex flex-col justify-between transition-all',
          isBreached 
            ? 'bg-red-950/80 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
            : 'bg-gradient-to-br from-hydro-900 via-hydro-850 to-hydro-950 border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
        )}>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              {isBreached ? 'SURGE STATUS' : 'ESTIMATED TIME TO INUNDATION CREST'}
            </div>
            <div className="flex items-baseline gap-2">
              {isBreached ? (
                <span className="text-3xl sm:text-4xl font-black font-mono text-red-400 tracking-tight animate-pulse">
                  CREST IN PROGRESS
                </span>
              ) : (
                <>
                  <span className="text-3xl sm:text-5xl font-black font-mono text-cyan-300 tracking-tight">
                    {etaHours > 0 ? `${etaHours}h ${etaMins}m` : `${etaMins} mins`}
                  </span>
                  <span className="text-xs font-mono text-slate-400">until bank breach</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Compass size={14} className="text-cyan-400" />
              <span>Crest Location: <strong>{currentVillage.floodDistanceKm} km upstream</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Waves size={14} className="text-blue-400" />
              <span>Wave Speed: <strong>{currentVillage.waveVelocityKmh} km/h</strong></span>
            </div>
          </div>
        </div>

        {/* Overall Confidence Dial */}
        <div className="rounded-xl p-4 bg-hydro-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Confidence Score
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono text-emerald-400">
                {currentVillage.confidence.overall}%
              </span>
              <span className="text-xs text-emerald-500 font-bold">HIGH CERTAINTY</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 size={12} className="text-emerald-400" /> Multi-Source Fusion
            </p>
            <p className="text-[10px] text-slate-500">
              Radar backscatter validated with live telemetry.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Factor Multi-Modal Confidence Breakdown */}
      <div className="bg-hydro-900/60 rounded-xl p-3.5 border border-slate-800/80 space-y-2">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
          Multi-Modal Verification Breakdown:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Factor 1: SAR Radar */}
          <div className="p-2.5 rounded-lg bg-hydro-950/80 border border-slate-800">
            <div className="flex justify-between items-center text-slate-300 mb-1">
              <span className="font-semibold text-[11px]">1. SAR Radar (60% Wt)</span>
              <span className="font-mono text-cyan-400 font-bold">{currentVillage.confidence.sarClassification}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${currentVillage.confidence.sarClassification}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">VV/VH Backscatter Otsu</span>
          </div>

          {/* Factor 2: River Gauges */}
          <div className="p-2.5 rounded-lg bg-hydro-950/80 border border-slate-800">
            <div className="flex justify-between items-center text-slate-300 mb-1">
              <span className="font-semibold text-[11px]">2. Gauges (25% Wt)</span>
              <span className="font-mono text-blue-400 font-bold">{currentVillage.confidence.gaugeAgreement}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: `${currentVillage.confidence.gaugeAgreement}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">CWC Sensor Concordance</span>
          </div>

          {/* Factor 3: Terrain Elevation */}
          <div className="p-2.5 rounded-lg bg-hydro-950/80 border border-slate-800">
            <div className="flex justify-between items-center text-slate-300 mb-1">
              <span className="font-semibold text-[11px]">3. DEM Terrain (15% Wt)</span>
              <span className="font-mono text-purple-400 font-bold">{currentVillage.confidence.terrainModel}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: `${currentVillage.confidence.terrainModel}%` }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">30m SRTM Basin Slope</span>
          </div>
        </div>
      </div>
    </div>
  );
}
