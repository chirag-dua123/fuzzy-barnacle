import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Tent, Phone, CheckCircle, ShieldCheck, MapPin } from 'lucide-react';
import clsx from 'clsx';

export function ShelterCapacityCard() {
  const { currentVillage } = useAppState();

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tent className="text-emerald-400" size={18} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            Designated High-Ground Relief Shelters
          </h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
          DISASTER RELIEF CORPS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentVillage.shelters.map((shelter) => {
          const occupancyPercent = Math.round((shelter.currentOccupancy / shelter.capacity) * 100);
          const isCrowded = occupancyPercent > 85;

          return (
            <div
              key={shelter.id}
              className="bg-hydro-900/90 rounded-xl p-4 border border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{shelter.name}</h4>
                  <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-emerald-400" />
                    Elevation: <strong className="text-slate-200">{shelter.elevationMeters}m MSL (Safe from 100-yr flood)</strong>
                  </p>
                </div>
                <span className={clsx(
                  'text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border',
                  isCrowded ? 'bg-amber-950 text-amber-400 border-amber-500/40' : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                )}>
                  {occupancyPercent}% FULL
                </span>
              </div>

              {/* Occupancy Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Occupancy:</span>
                  <strong className="text-slate-200">{shelter.currentOccupancy} / {shelter.capacity} evacuees</strong>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'h-full rounded-full transition-all duration-500',
                      isCrowded ? 'bg-amber-500' : 'bg-emerald-500'
                    )}
                    style={{ width: `${occupancyPercent}%` }}
                  />
                </div>
              </div>

              {/* Facilities tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {shelter.facilities.map((fac, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-hydro-950 text-slate-300 border border-slate-800 flex items-center gap-1"
                  >
                    <CheckCircle size={10} className="text-emerald-400" />
                    {fac}
                  </span>
                ))}
              </div>

              {/* Officer contact */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Officer In-Charge: <strong>{shelter.officer}</strong></span>
                <a
                  href={`tel:${shelter.phone}`}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold bg-hydro-950 px-2.5 py-1 rounded border border-cyan-500/30"
                >
                  <Phone size={11} />
                  <span>Call Officer</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
