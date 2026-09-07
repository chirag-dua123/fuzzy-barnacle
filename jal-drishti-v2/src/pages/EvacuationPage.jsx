import React from 'react';
import { RegionSelector } from '../components/detection/RegionSelector';
import { SafeRouteNavigator } from '../components/evacuation/SafeRouteNavigator';
import { FloodMapLeaflet } from '../components/map/FloodMapLeaflet';
import { ShelterCapacityCard } from '../components/evacuation/ShelterCapacityCard';

export function EvacuationPage() {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <RegionSelector />
      
      <SafeRouteNavigator />

      <div className="space-y-2">
        <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
          Active Evacuation Map & Live Safe Corridors
        </h3>
        <FloodMapLeaflet />
      </div>

      <ShelterCapacityCard />
    </div>
  );
}
