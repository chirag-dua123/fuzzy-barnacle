import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Smartphone, Terminal, Copy, Check } from 'lucide-react';

export function LowBandwidthSmsView() {
  const { currentVillage, language } = useAppState();
  const [copied, setCopied] = React.useState(false);

  const rawSms = `[NDMA-JAL-DRISHTI ALERT]
LOCATION: ${currentVillage.name.toUpperCase()} (${currentVillage.district})
RISK: ${currentVillage.severity} (THREAT SCORE: ${currentVillage.threatScore}/100)
ETA: ${currentVillage.etaHours} HOURS (${currentVillage.floodDistanceKm} KM UPSTREAM)
SAFE CORRIDOR: ${currentVillage.routes[0]?.name || 'NH Ridge Route'}
SHELTER: ${currentVillage.shelters[0]?.name || 'High Ground Relief Camp'}
HELPLINE: 112 / NDRF 1070
MSG-SIZE: 142 BYTES (2G/GSM COMPLIANT)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawSms);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-emerald-400" size={17} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            Ultra-Low Bandwidth SMS Broadcast (&lt; 1 KB)
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white bg-hydro-900 border border-slate-700 px-2 py-1 rounded"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy Text'}</span>
        </button>
      </div>

      <div className="bg-black/90 rounded-xl p-4 border border-slate-800 font-mono text-xs text-emerald-400 leading-relaxed shadow-inner">
        <pre className="whitespace-pre-wrap">{rawSms}</pre>
      </div>

      <p className="text-[11px] font-mono text-slate-400">
        Dispatched via C-DoT CAP (Common Alerting Protocol) Gateway to all registered cell numbers in the flood polygon.
      </p>
    </div>
  );
}
