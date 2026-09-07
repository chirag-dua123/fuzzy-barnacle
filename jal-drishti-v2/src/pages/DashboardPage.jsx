import React from 'react';
import { RegionSelector } from '../components/detection/RegionSelector';
import { SimulationControls } from '../components/map/SimulationControls';
import { FloodMapLeaflet } from '../components/map/FloodMapLeaflet';
import { EtaCountdownCard } from '../components/detection/EtaCountdownCard';
import { RiverGaugeChart } from '../components/detection/RiverGaugeChart';
import { UpstreamNetworkGraph } from '../components/detection/UpstreamNetworkGraph';

export function DashboardPage() {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Region selector bar */}
      <RegionSelector />

      {/* Main Map & Time Controls Row */}
      <div className="space-y-3">
        <SimulationControls />
        <FloodMapLeaflet />
      </div>

      {/* ETA & River Level Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EtaCountdownCard />
        <RiverGaugeChart />
      </div>

      {/* Upstream River Gauge DAG */}
      <UpstreamNetworkGraph />
    </div>
  );
}
