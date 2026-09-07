import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine, 
  CartesianGrid 
} from 'recharts';
import { Activity, AlertTriangle } from 'lucide-react';

export function RiverGaugeChart() {
  const { currentVillage } = useAppState();

  const primaryGauge = currentVillage.upstreamGauges[0];
  const chartData = currentVillage.riverLevel24h || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-hydro-900 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs font-mono">
          <p className="text-slate-400 font-bold mb-1">Time: {label}</p>
          <p className="text-cyan-400">
            Water Level: <strong className="text-white">{payload[0].value} m</strong>
          </p>
          <p className="text-red-400">
            Danger Mark: <strong className="text-slate-200">{dataPoint.danger} m</strong>
          </p>
          {dataPoint.projected && (
            <p className="text-amber-400 text-[10px] mt-1 italic">★ Hydrodynamic Forecast</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Activity className="text-cyan-400" size={17} />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            24h River Level & Danger Threshold Hydrograph
          </h3>
        </div>
        {primaryGauge && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Station: <strong className="text-slate-200">{primaryGauge.name}</strong></span>
            <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/40 text-[10px] font-bold animate-pulse">
              ▲ RISING
            </span>
          </div>
        )}
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="floodWaterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748B" 
              fontSize={11} 
              tickLine={false} 
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={11} 
              domain={['auto', 'auto']} 
              tickLine={false}
              unit="m"
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Danger Level Reference Line */}
            {primaryGauge && (
              <ReferenceLine 
                y={primaryGauge.dangerLevelM} 
                stroke="#EF4444" 
                strokeDasharray="4 4" 
                label={{ 
                  value: `Danger Mark (${primaryGauge.dangerLevelM}m)`, 
                  fill: '#EF4444', 
                  fontSize: 10, 
                  position: 'insideTopRight' 
                }} 
              />
            )}
            <Area 
              type="monotone" 
              dataKey="level" 
              stroke="#00F0FF" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#floodWaterGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
          <span>Observed River Hydrograph</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-red-500 border-b border-dashed inline-block"></span>
          <span>CWC Official Danger Level</span>
        </div>
        <div className="flex items-center gap-1 text-slate-300">
          <AlertTriangle size={12} className="text-amber-400" />
          <span>Discharge: <strong>{primaryGauge?.dischargeCusecs.toLocaleString()} cusecs</strong></span>
        </div>
      </div>
    </div>
  );
}
