import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { LORA_NODES, MOCK_MESH_PACKETS } from '../../data/loraNodesData';
import { Radio, Send, Zap, Battery, Signal, CheckCircle2, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export function LoRaMeshSimulator() {
  const { isCellularDown, setIsCellularDown } = useAppState();
  const [packets, setPackets] = useState(MOCK_MESH_PACKETS);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSendTestPacket = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      const newPkt = {
        id: `pkt-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString(),
        origin: "Node 1 (Village Gateway)",
        destination: "Node 4 (Relief Camp Base)",
        hops: ["Node 1", "Node 2", "Node 3", "Node 4"],
        hopCount: 3,
        payloadType: "CITIZEN_ALERT_RELAY",
        payloadHex: "0x4A442D455641432D4E4F57",
        payloadDecoded: "BROADCAST: Evacuate along North Corridor immediately.",
        latencyMs: 310 + Math.floor(Math.random() * 80),
        status: "DELIVERED"
      };
      setPackets((prev) => [newPkt, ...prev]);
      setIsTransmitting(false);
    }, 1200);
  };

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Radio className="text-purple-400" size={18} />
          <div>
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              Resilient LoRa Mesh Network Simulator (868 MHz / 433 MHz)
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Multi-hop ad-hoc radio communication active when cellular infrastructure fails
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSendTestPacket}
            disabled={isTransmitting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition-all disabled:opacity-50 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
          >
            {isTransmitting ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
            <span>{isTransmitting ? 'TRANSMITTING HOPS...' : 'BROADCAST LORA PACKET'}</span>
          </button>
        </div>
      </div>

      {/* Cellular Outage Alert Banner */}
      <div className={clsx(
        'p-3 rounded-xl border flex items-center justify-between font-mono text-xs transition-all',
        isCellularDown 
          ? 'bg-amber-950/80 border-amber-500/60 text-amber-200' 
          : 'bg-hydro-900/60 border-slate-800 text-slate-300'
      )}>
        <div className="flex items-center gap-2">
          <span className={clsx('w-2 h-2 rounded-full', isCellularDown ? 'bg-amber-400 animate-ping' : 'bg-emerald-400')} />
          <span>Cellular Tower Grid: <strong>{isCellularDown ? '60% TOWERS SUBMERGED (LORA MESH ACTIVE)' : 'NORMAL OPERATIONAL STATE'}</strong></span>
        </div>
        <button
          onClick={() => setIsCellularDown(!isCellularDown)}
          className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-semibold"
        >
          {isCellularDown ? 'Restore Cellular Mode' : 'Simulate Flood Blackout'}
        </button>
      </div>

      {/* LoRa Mesh Topology Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
        {LORA_NODES.map((node, i) => (
          <div
            key={node.id}
            className="bg-hydro-900 rounded-xl p-3 border border-slate-800 space-y-2 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono font-bold text-purple-400">
                {node.frequency}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                {node.status.toUpperCase()}
              </span>
            </div>

            <h4 className="font-bold text-xs text-slate-200 line-clamp-1">{node.name}</h4>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1"><Signal size={12} className="text-cyan-400" /> RSSI / SNR:</span>
                <strong className="text-slate-200">{node.rssi} ({node.snr})</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1"><Battery size={12} className="text-emerald-400" /> Battery:</span>
                <strong className="text-emerald-400">{node.batteryPercent}% (Solar)</strong>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span>Packets Relayed:</span>
                <strong className="text-slate-300">{node.packetsRelayed}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live LoRa Packet Stream */}
      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
          <span className="font-bold text-[11px] text-purple-400">LIVE MESH PACKET RELAY LOG</span>
          <span className="text-[10px] text-slate-500">Auto-refreshing via SX1276 UART driver</span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {packets.map((pkt) => (
            <div
              key={pkt.id}
              className="p-2 rounded-lg bg-hydro-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[10px]">{pkt.timestamp}</span>
                  <span className="text-purple-300 font-bold">[{pkt.payloadType}]</span>
                  <span className="text-slate-400 text-[10px]">({pkt.hopCount} Hops: {pkt.hops.join(' ➔ ')})</span>
                </div>
                <p className="text-slate-200 font-sans font-medium">{pkt.payloadDecoded}</p>
                <span className="text-[10px] text-slate-500 font-mono">Hex Payload: {pkt.payloadHex}</span>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                  {pkt.status}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{pkt.latencyMs} ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
