import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { GitCommit, ArrowRight, Activity, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export function UpstreamNetworkGraph() {
  const { currentVillage } = useAppState();
  const gauges = currentVillage.upstreamGauges || [];

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCommit className="text-cyan-400" size={17} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            Upstream River Gauge Network (DAG Model)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Flow Direction: Upstream ➔ Downstream
        </span>
      </div>

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-x-auto py-2">
          {gauges.map((gauge, idx) => {
            const isOverDanger = gauge.currentLevelM >= gauge.dangerLevelM;
            const isOverWarning = gauge.currentLevelM >= gauge.warningLevelM;

            return (
              <React.Fragment key={gauge.id}>
                {/* Node Box */}
                <div className={clsx(
                  'flex-1 min-w-[200px] p-3 rounded-xl border transition-all',
                  isOverDanger 
                    ? 'bg-red-950/60 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                    : isOverWarning 
                      ? 'bg-amber-950/60 border-amber-500/50' 
                      : 'bg-hydro-900/80 border-slate-800'
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">
                      NODE #{idx + 1}
                    </span>
                    <span className={clsx(
                      'text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase',
                      isOverDanger ? 'bg-red-900/80 text-red-200' : 'bg-slate-800 text-slate-300'
                    )}>
                      {gauge.distanceUpstreamKm} km away
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-100 mt-1 line-clamp-1">
                    {gauge.name}
                  </h4>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Water Level:</span>
                      <span className={clsx('font-bold', isOverDanger ? 'text-red-400' : 'text-cyan-300')}>
                        {gauge.currentLevelM} m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Danger Mark:</span>
                      <span className="text-slate-300">{gauge.dangerLevelM} m</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                      <span>Updated: {gauge.lastUpdated}</span>
                      <span className="text-red-400 font-bold">▲ {gauge.trend.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Connector */}
                {idx < gauges.length - 1 && (
                  <div className="hidden sm:flex items-center text-slate-600 px-1">
                    <ArrowRight size={18} className="text-cyan-500/60 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Final Impact Target (Target Village) */}
          <div className="hidden sm:flex items-center text-slate-600 px-1">
            <ArrowRight size={18} className="text-red-400 animate-pulse" />
          </div>

          <div className="flex-1 min-w-[190px] p-3 rounded-xl border border-red-500/60 bg-red-950/80 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-red-400 font-bold">
                IMPACT TARGET
              </span>
              <span className="text-[10px] font-mono text-red-300 bg-red-900/60 px-1.5 py-0.5 rounded font-bold">
                ETA {currentVillage.etaHours}h
              </span>
            </div>
            <h4 className="font-extrabold text-xs text-white mt-1">
              {currentVillage.name} Village
            </h4>
            <div className="mt-2.5 pt-2 border-t border-red-800/60 text-[11px] font-mono text-red-200">
              <p>Risk: <strong>{currentVillage.severity}</strong></p>
              <p className="text-[10px] text-red-300/80 mt-0.5">Automated citizen sirens triggered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
