import React from 'react';
import { RegionSelector } from '../components/detection/RegionSelector';
import { LoRaMeshSimulator } from '../components/lora/LoRaMeshSimulator';
import { LowBandwidthSmsView } from '../components/lora/LowBandwidthSmsView';

export function ResilientCommsPage() {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <RegionSelector />
      <LoRaMeshSimulator />
      <LowBandwidthSmsView />
    </div>
  );
}
