import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { SeverityBadge } from '../common/Badge';
import { 
  Route as RouteIcon, 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Milestone 
} from 'lucide-react';
import clsx from 'clsx';

export function SafeRouteNavigator() {
  const { currentVillage, setOfflinePassModalOpen } = useAppState();
  const [selectedRouteId, setSelectedRouteId] = useState(currentVillage.routes[0]?.id || '');

  const activeRoute = currentVillage.routes.find((r) => r.id === selectedRouteId) || currentVillage.routes[0];

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Navigation className="text-cyan-400" size={18} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            Dynamic Hazard-Aware Safe Evacuation Routes
          </h3>
        </div>
        <button
          onClick={() => setOfflinePassModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
        >
          <FileText size={14} />
          <span>GENERATE OFFLINE PASS</span>
        </button>
      </div>

      {/* Route Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {currentVillage.routes.map((route) => {
          const isSelected = route.id === activeRoute?.id;
          const isSafe = route.type === 'safe';
          const isCaution = route.type === 'caution';
          const isBlocked = route.type === 'blocked';

          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={clsx(
                'cursor-pointer rounded-xl p-3.5 border transition-all relative overflow-hidden',
                isSelected 
                  ? 'bg-hydro-850 ring-2 ring-cyan-400 border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
                  : 'bg-hydro-900/80 border-slate-800 hover:border-slate-700'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <SeverityBadge severity={route.type.toUpperCase()} />
                <span className="text-xs font-mono font-bold text-slate-300">
                  {route.distanceKm} km
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-100 mt-2 line-clamp-1">
                {route.name}
              </h4>

              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Est. Travel Time:</span>
                  <strong className="text-slate-200">{route.timeMins} mins</strong>
                </div>
                <div className="flex justify-between">
                  <span>Safety Score:</span>
                  <strong className={isSafe ? 'text-emerald-400' : isCaution ? 'text-amber-400' : 'text-red-400'}>
                    {route.safetyScore}/100
                  </strong>
                </div>
              </div>

              {route.hazards.length > 0 && (
                <div className="mt-2 text-[10px] text-amber-300/90 bg-amber-950/60 p-1.5 rounded border border-amber-800/60 flex items-center gap-1">
                  <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">{route.hazards[0]}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Route Detailed Brief */}
      {activeRoute && (
        <div className="bg-hydro-900/90 rounded-xl p-4 border border-slate-800/90 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">SELECTED NAVIGATION CORRIDOR</span>
              <h4 className="font-bold text-sm text-slate-100">{activeRoute.name}</h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Elevation Risk: <strong className="text-slate-200">{activeRoute.elevationRisk}</strong></span>
              <span className="text-slate-400">Destination: <strong className="text-emerald-400">{activeRoute.targetShelter}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5">
              <h5 className="font-mono text-[11px] font-bold text-slate-400 uppercase">Hazard Mitigation Guidance</h5>
              {activeRoute.hazards.length > 0 ? (
                <ul className="space-y-1">
                  {activeRoute.hazards.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-amber-300">
                      <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 size={13} /> Paved high embankment with zero water accumulation.
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <h5 className="font-mono text-[11px] font-bold text-slate-400 uppercase">Checkpoint Directions</h5>
              <div className="text-slate-300 text-[11px] font-mono space-y-0.5">
                <p>1. Start at {currentVillage.name} Village Center</p>
                <p>2. Merge onto {activeRoute.name.split('—')[1] || activeRoute.name}</p>
                <p>3. Arrive at designated relief hub: {activeRoute.targetShelter}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
