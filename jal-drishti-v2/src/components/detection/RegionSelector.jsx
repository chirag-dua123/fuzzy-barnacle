import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MapPin, Navigation } from 'lucide-react';
import { SeverityBadge } from '../common/Badge';

export function RegionSelector() {
  const { REGIONS_DATA, selectedVillageId, setSelectedVillageId, currentVillage } = useAppState();

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
          <MapPin size={15} />
          <span>MONITORED RIVER BASIN & JURISDICTION</span>
        </div>
        <SeverityBadge severity={currentVillage.severity} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* State Selector */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1">State / Basin</label>
          <select
            value={currentVillage.state}
            onChange={(e) => {
              const targetState = REGIONS_DATA.find((r) => r.state === e.target.value);
              if (targetState) {
                setSelectedVillageId(targetState.districts[0].villages[0].id);
              }
            }}
            className="w-full bg-hydro-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-medium focus:outline-none focus:border-cyan-500"
          >
            {REGIONS_DATA.map((reg) => (
              <option key={reg.state} value={reg.state}>
                {reg.state} ({reg.riverBasin.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1">District</label>
          <select
            value={currentVillage.district}
            onChange={(e) => {
              const stateObj = REGIONS_DATA.find((r) => r.state === currentVillage.state);
              const distObj = stateObj?.districts.find((d) => d.name === e.target.value);
              if (distObj) {
                setSelectedVillageId(distObj.villages[0].id);
              }
            }}
            className="w-full bg-hydro-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-medium focus:outline-none focus:border-cyan-500"
          >
            {REGIONS_DATA.find((r) => r.state === currentVillage.state)?.districts.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Village / Local Ward Selector */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1">Target Village / Ward</label>
          <select
            value={selectedVillageId}
            onChange={(e) => setSelectedVillageId(e.target.value)}
            className="w-full bg-hydro-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none focus:border-cyan-500 shadow-[0_0_10px_rgba(0,240,255,0.1)]"
          >
            {REGIONS_DATA.find((r) => r.state === currentVillage.state)
              ?.districts.find((d) => d.name === currentVillage.district)
              ?.villages.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.localName}) — {v.severity}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
        <span>River: <strong className="text-slate-200">{currentVillage.riverName}</strong></span>
        <span>Population at Risk: <strong className="text-slate-200">{currentVillage.population.toLocaleString()} citizens</strong></span>
        <span>GPS: <strong className="text-cyan-400">{currentVillage.lat.toFixed(3)}°N, {currentVillage.lng.toFixed(3)}°E</strong></span>
      </div>
    </div>
  );
}
