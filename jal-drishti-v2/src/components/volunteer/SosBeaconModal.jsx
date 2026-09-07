import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, ShieldAlert, CheckCircle, MapPin, Users, Send } from 'lucide-react';

export function SosBeaconModal() {
  const { sosModalOpen, setSosModalOpen, currentVillage, addSosBeacon } = useAppState();

  const [locationName, setLocationName] = useState(`${currentVillage.name} Ward 2`);
  const [peopleCount, setPeopleCount] = useState(4);
  const [selectedNeeds, setSelectedNeeds] = useState(['Rescue Boat', 'Clean Water']);
  const [phone, setPhone] = useState('+91 ');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!sosModalOpen) return null;

  const needsOptions = [
    'Rescue Boat',
    'Medical Trauma Kit',
    'Drinking Water & Rations',
    'Infant / Baby Formula',
    'Elderly Wheelchair Assistance',
    'High-Clearance Tractor'
  ];

  const toggleNeed = (need) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addSosBeacon({
        location: locationName,
        peopleCount: Number(peopleCount),
        needs: selectedNeeds,
        urgency: "CRITICAL",
        contactPhone: phone,
      });
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSosModalOpen(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.3)] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-red-950 px-5 py-3.5 border-b border-red-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-red-400 animate-pulse" size={20} />
            <h3 className="font-mono font-extrabold text-sm text-white uppercase tracking-wider">
              TRIGGER EMERGENCY SOS BEACON
            </h3>
          </div>
          <button
            onClick={() => setSosModalOpen(false)}
            className="text-red-300 hover:text-white p-1 rounded-lg hover:bg-red-900/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        {success ? (
          <div className="p-8 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/50">
              <CheckCircle size={28} />
            </div>
            <h4 className="text-base font-bold text-white font-sans">SOS BEACON BROADCASTED!</h4>
            <p className="text-xs text-slate-300">
              Your GPS coordinates and rescue requirements have been relayed to the nearest NDRF & Civil Defense volunteers.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1 flex items-center gap-1">
                <MapPin size={12} className="text-red-400" /> Exact Landmark / Trapped Location:
              </label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 flex items-center gap-1">
                  <Users size={12} className="text-red-400" /> People Trapped:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Contact Phone:</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765-43210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-2">Urgent Resources Needed:</label>
              <div className="grid grid-cols-2 gap-1.5">
                {needsOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => toggleNeed(opt)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] text-left border transition-all ${
                      selectedNeeds.includes(opt)
                        ? 'bg-red-950 border-red-500 text-red-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {selectedNeeds.includes(opt) ? '✓ ' : '+ '} {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSosModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] disabled:opacity-50"
              >
                <Send size={13} />
                <span>{isSubmitting ? 'Relaying Beacon...' : 'Broadcast SOS Beacon'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
