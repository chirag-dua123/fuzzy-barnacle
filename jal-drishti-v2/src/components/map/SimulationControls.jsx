import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { SIMULATION_STEPS } from '../../data/simulationTimeline';
import { Play, Pause, RotateCcw, FastForward, Info, Layers } from 'lucide-react';
import clsx from 'clsx';

export function SimulationControls() {
  const { 
    simStepIndex, 
    setSimStepIndex, 
    isPlayingSim, 
    setIsPlayingSim, 
    currentVillage,
    currentSimStep,
    mapLayers,
    toggleLayer
  } = useAppState();

  const simulatedInundation = (currentVillage.currentInundationSqKm * currentSimStep.inundationMultiplier).toFixed(1);

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-xs font-mono tracking-wider text-cyan-300 uppercase">
            Hydrodynamic Flood Wave Time Scrubber
          </span>
        </div>

        {/* Play / Pause Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlayingSim(!isPlayingSim)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all',
              isPlayingSim 
                ? 'bg-amber-500 text-black hover:bg-amber-400' 
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,240,255,0.3)]'
            )}
          >
            {isPlayingSim ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
            <span>{isPlayingSim ? 'PAUSE WAVE' : 'SIMULATE SURGE'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlayingSim(false);
              setSimStepIndex(0);
            }}
            title="Reset to T = 0h"
            className="p-1.5 rounded-lg bg-hydro-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Timeline Steps Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {SIMULATION_STEPS.map((step) => {
          const isSelected = simStepIndex === step.stepIndex;
          return (
            <button
              key={step.stepIndex}
              onClick={() => {
                setIsPlayingSim(false);
                setSimStepIndex(step.stepIndex);
              }}
              className={clsx(
                'px-2.5 py-2 rounded-lg text-left border transition-all',
                isSelected 
                  ? 'bg-hydro-850 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.2)] ring-1 ring-cyan-400' 
                  : 'bg-hydro-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={clsx('text-[10px] font-mono font-bold', isSelected ? 'text-cyan-300' : 'text-slate-400')}>
                  {step.timeLabel.split(' ')[0]} {step.timeLabel.split(' ')[2]}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </div>
              <div className="text-[11px] font-semibold text-slate-200 mt-0.5 truncate">
                +{step.waterLevelDelta.toFixed(2)}m rise
              </div>
            </button>
          );
        })}
      </div>

      {/* Simulation metric readout */}
      <div className="flex flex-wrap items-center justify-between bg-hydro-900/80 p-2.5 rounded-lg border border-slate-800/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Current Phase:</span>
          <strong className="text-cyan-300">{currentSimStep.statusText}</strong>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span>Inundation Area: <strong className="text-red-400 font-bold">{simulatedInundation} sq. km</strong></span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">{currentSimStep.description}</span>
        </div>
      </div>

      {/* Map Layer Toggles */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
        <span className="text-slate-400 flex items-center gap-1">
          <Layers size={12} className="text-cyan-400" /> Map Layers:
        </span>
        {[
          { key: 'sarRadar', label: 'SAR VV/VH Raster' },
          { key: 'floodMask', label: 'Inundation Polygon' },
          { key: 'gauges', label: 'River Gauges' },
          { key: 'routes', label: 'Safe Evacuation Routes' },
          { key: 'shelters', label: 'Relief Shelters' },
        ].map((layer) => (
          <button
            key={layer.key}
            onClick={() => toggleLayer(layer.key)}
            className={clsx(
              'px-2 py-0.5 rounded border transition-colors',
              mapLayers[layer.key] 
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            )}
          >
            {mapLayers[layer.key] ? '✓ ' : '✕ '} {layer.label}
          </button>
        ))}
      </div>
    </div>
  );
}
