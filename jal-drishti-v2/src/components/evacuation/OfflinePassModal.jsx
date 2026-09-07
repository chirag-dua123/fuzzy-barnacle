import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, Printer, Shield, CheckCircle, QrCode, PhoneCall } from 'lucide-react';

export function OfflinePassModal() {
  const { offlinePassModalOpen, setOfflinePassModalOpen, currentVillage } = useAppState();

  if (!offlinePassModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const safeRoute = currentVillage.routes.find((r) => r.type === 'safe') || currentVillage.routes[0];
  const primaryShelter = currentVillage.shelters[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-hydro-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-emerald-400" size={18} />
            <h3 className="font-mono font-bold text-sm text-slate-100 uppercase">
              Official Offline Emergency Pass
            </h3>
          </div>
          <button
            onClick={() => setOfflinePassModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Printable Pass Container */}
        <div className="p-6 space-y-4 font-mono text-xs bg-slate-950 text-slate-200">
          <div className="border-2 border-dashed border-emerald-500/60 rounded-xl p-4 bg-emerald-950/20 space-y-3">
            <div className="flex items-start justify-between border-b border-emerald-500/30 pb-2">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold">STATE DISASTER MANAGEMENT AUTHORITY</span>
                <h4 className="text-base font-extrabold text-white mt-0.5 font-sans">
                  EMERGENCY EVACUATION PASS
                </h4>
                <p className="text-[10px] text-slate-400">Pass ID: JD-2026-{currentVillage.id.toUpperCase()}-PASS</p>
              </div>
              <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center text-black">
                <QrCode size={48} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">ORIGIN VILLAGE:</span>
                <strong className="text-white text-xs">{currentVillage.name} ({currentVillage.district})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">DESIGNATED SHELTER:</span>
                <strong className="text-emerald-300 text-xs">{primaryShelter.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">SAFE CORRIDOR:</span>
                <strong className="text-cyan-300">{safeRoute.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EST. TRAVEL TIME:</span>
                <strong className="text-amber-300">{safeRoute.timeMins} Minutes</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-500/30 text-[10px] text-slate-300 space-y-1">
              <p className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle size={12} /> Carry valid photo ID, essential medicine, and this pass.
              </p>
              <p>• Emergency Transit Priority granted at all police and NDRF checkpoints.</p>
            </div>
          </div>

          {/* Emergency Helplines */}
          <div className="bg-hydro-900 p-3 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
            <span className="font-bold text-slate-300 flex items-center gap-1 text-cyan-400">
              <PhoneCall size={13} /> 24x7 Emergency Helplines:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1 font-bold">
              <div className="bg-hydro-950 p-1.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">National</span>
                <span className="text-red-400 text-sm">112</span>
              </div>
              <div className="bg-hydro-950 p-1.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">NDRF Flood</span>
                <span className="text-cyan-400 text-sm">1070</span>
              </div>
              <div className="bg-hydro-950 p-1.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Shelter Officer</span>
                <span className="text-emerald-400 text-xs">{primaryShelter.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="bg-hydro-950 px-5 py-3 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={() => setOfflinePassModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
