import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useAudioAlert } from '../../hooks/useAudioAlert';
import { SeverityBadge } from './Badge';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Radar, 
  Radio, 
  Route, 
  Users, 
  Presentation, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  ShieldAlert
} from 'lucide-react';
import clsx from 'clsx';

export function Header() {
  const { 
    activeTab, 
    setActiveTab, 
    currentVillage, 
    isCellularDown, 
    setIsCellularDown,
    setSosModalOpen,
    language
  } = useAppState();

  const { playSiren, speakAlert, isPlayingAudio } = useAudioAlert();

  const handleAudioBroadcast = () => {
    playSiren();
    const alertText = currentVillage.languageAlerts[language] || currentVillage.languageAlerts.en;
    setTimeout(() => {
      speakAlert(alertText, language);
    }, 1800);
  };

  const navItems = [
    { id: 'dashboard', label: 'GIS Command Center', icon: Radar },
    { id: 'evacuation', label: 'Safe Evacuation', icon: Route },
    { id: 'comms', label: 'LoRa Mesh Comms', icon: Radio },
    { id: 'sos', label: 'SOS & Volunteers', icon: Users },
    { id: 'pitch', label: 'SIH Jury Pitch', icon: Presentation },
  ];

  return (
    <header className="sticky top-0 z-50 bg-hydro-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      {/* Top emergency broadcast ticker */}
      <div className="bg-red-950/90 border-b border-red-800/60 px-4 py-1 flex items-center justify-between text-xs text-red-200">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-bold text-red-400 font-mono">LIVE SAR RADAR FEED:</span>
          <span className="truncate">
            {currentVillage.languageAlerts[language] || currentVillage.languageAlerts.en}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-red-300">
          <span>COPERNICUS SENTINEL-1 PASS: <strong>ACTIVE</strong></span>
          <span className="text-red-500">●</span>
          <span>ESTIMATED VELOCITY: <strong>{currentVillage.waveVelocityKmh} km/h</strong></span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <div className="w-full h-full bg-hydro-950 rounded-[10px] flex items-center justify-center">
              <Radar className="text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} size={22} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Jal Drishti <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">2.0 MVP</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              SAR & Hydrological Early Warning System • <span className="text-slate-300">{currentVillage.name}, {currentVillage.district}</span>
            </p>
          </div>
        </div>

        {/* Center Nav tabs */}
        <nav className="flex items-center gap-1 bg-hydro-900/80 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right action tools */}
        <div className="flex items-center gap-2">
          {/* Language picker */}
          <LanguageSwitcher />

          {/* Cellular failure simulator toggle */}
          <button
            onClick={() => setIsCellularDown(!isCellularDown)}
            title="Simulate 60% Cell Tower Blackout (Switches to LoRa Mesh)"
            className={clsx(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors',
              isCellularDown 
                ? 'bg-orange-950/80 border-orange-500/50 text-orange-300 animate-pulse' 
                : 'bg-hydro-900 border-slate-700/60 text-slate-400 hover:text-slate-200'
            )}
          >
            {isCellularDown ? <WifiOff size={14} className="text-orange-400" /> : <Wifi size={14} className="text-emerald-400" />}
            <span className="hidden sm:inline">{isCellularDown ? 'LoRa Mode' : 'Cellular OK'}</span>
          </button>

          {/* Audio Siren Broadcast button */}
          <button
            onClick={handleAudioBroadcast}
            title="Play Siren and Native Voice Broadcast"
            className={clsx(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all',
              isPlayingAudio
                ? 'bg-red-600 text-white border-red-500 animate-bounce'
                : 'bg-hydro-900 border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
            )}
          >
            <Volume2 size={14} className={isPlayingAudio ? 'text-white' : 'text-cyan-400'} />
            <span className="hidden lg:inline">Audio Siren</span>
          </button>

          {/* SOS Trigger */}
          <button
            onClick={() => setSosModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all transform active:scale-95"
          >
            <ShieldAlert size={14} />
            <span>SOS DISTRESS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
