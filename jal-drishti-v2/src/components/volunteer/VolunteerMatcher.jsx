import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Users, Phone, ShieldCheck, LifeBuoy, Star, CheckCircle, Send } from 'lucide-react';
import clsx from 'clsx';

export function VolunteerMatcher() {
  const { volunteers, activeSosList } = useAppState();
  const [filterRole, setFilterRole] = useState('ALL');
  const [requestedId, setRequestedId] = useState(null);

  const filteredVolunteers = volunteers.filter((vol) => {
    if (filterRole === 'ALL') return true;
    if (filterRole === 'BOAT') return vol.role.toLowerCase().includes('boat');
    if (filterRole === 'MEDICAL') return vol.role.toLowerCase().includes('medical');
    if (filterRole === 'VEHICLE') return vol.role.toLowerCase().includes('vehicle') || vol.role.toLowerCase().includes('driver');
    if (filterRole === 'FOOD') return vol.role.toLowerCase().includes('food') || vol.role.toLowerCase().includes('water');
    return true;
  });

  const handleRequest = (id) => {
    setRequestedId(id);
    setTimeout(() => {
      alert("Emergency request dispatched to volunteer's mobile radio!");
      setRequestedId(null);
    }, 1000);
  };

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="text-cyan-400" size={18} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            Volunteer Disaster Response & Resource Matchmaker
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          CIVIL DEFENSE CORPS
        </span>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { key: 'ALL', label: 'All Verified Responders' },
          { key: 'BOAT', label: '🚤 Rescue Boats' },
          { key: 'MEDICAL', label: '🩺 Medical Teams' },
          { key: 'VEHICLE', label: '🚜 High-Clearance 4x4' },
          { key: 'FOOD', label: '🍞 Clean Water & Rations' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterRole(tab.key)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all',
              filterRole === tab.key
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'bg-hydro-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Volunteer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredVolunteers.map((vol) => (
          <div
            key={vol.id}
            className="bg-hydro-900/90 rounded-xl p-4 border border-slate-800 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-100">{vol.name}</h4>
                  <ShieldCheck size={14} className="text-cyan-400" />
                </div>
                <p className="text-xs font-mono text-cyan-400 font-semibold">{vol.role}</p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">{vol.locationName} • <strong>{vol.distanceKm} km away</strong></p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className={clsx(
                  'text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border',
                  vol.status === 'available'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-950 text-amber-400 border-amber-500/40'
                )}>
                  {vol.status.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300">
                  <Star size={11} fill="currentColor" /> {vol.rating} ({vol.rescuesCompleted} missions)
                </span>
              </div>
            </div>

            {/* Equipment & Kit */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Equipment on Standby:</span>
              <div className="flex flex-wrap gap-1">
                {vol.equipment.map((eq, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-hydro-950 text-slate-300 border border-slate-800">
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <a
                href={`tel:${vol.phone}`}
                className="flex items-center gap-1 text-slate-300 hover:text-white bg-hydro-950 px-2.5 py-1 rounded border border-slate-800"
              >
                <Phone size={11} className="text-cyan-400" />
                <span>{vol.phone}</span>
              </a>

              <button
                onClick={() => handleRequest(vol.id)}
                disabled={requestedId === vol.id || vol.status !== 'available'}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              >
                <Send size={11} />
                <span>{requestedId === vol.id ? 'Dispatching...' : 'Dispatch Request'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active SOS Feed */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          Active Citizen SOS Beacons in Sector ({activeSosList.length})
        </h4>

        <div className="space-y-2">
          {activeSosList.map((sos) => (
            <div
              key={sos.id}
              className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">[{sos.urgency}]</span>
                  <span className="text-white font-sans font-bold">{sos.location}</span>
                  <span className="text-slate-400 text-[11px]">({sos.peopleCount} people trapped)</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                  {sos.needs.map((need, idx) => (
                    <span key={idx} className="bg-red-900/60 text-red-200 px-1.5 py-0.2 rounded">
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">
                  {sos.assignedVolunteer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
