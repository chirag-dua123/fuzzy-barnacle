import React, { useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Circle, 
  Polyline, 
  Polygon,
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import { useAppState } from '../../context/AppStateContext';
import { SeverityBadge } from '../common/Badge';
import { Shield, Activity, Navigation, Radio, Waves, AlertTriangle } from 'lucide-react';

// Custom Map Controller to smoothly fly/pan when village changes
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

// Create custom SVG Leaflet DivIcons
const createVillageIcon = (name, severity) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="flex flex-col items-center">
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-red-400 opacity-60"></span>
          <div class="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.8)] font-bold text-[10px]">
            📍
          </div>
        </div>
        <div class="mt-1 px-2 py-0.5 rounded bg-slate-900/90 border border-red-500/80 text-white font-mono text-[10px] font-bold shadow-lg whitespace-nowrap">
          ${name}
        </div>
      </div>
    `,
    iconSize: [80, 45],
    iconAnchor: [40, 20]
  });
};

const createGaugeIcon = (gauge) => {
  const isOverDanger = gauge.currentLevelM >= gauge.dangerLevelM;
  return L.divIcon({
    className: 'custom-leaflet-gauge',
    html: `
      <div class="flex flex-col items-center">
        <div class="w-6 h-6 rounded-full ${isOverDanger ? 'bg-red-500 animate-bounce' : 'bg-cyan-500'} border-2 border-slate-900 flex items-center justify-center text-slate-900 font-bold text-[10px] shadow-lg">
          🌊
        </div>
        <div class="mt-0.5 px-1.5 py-0.2 rounded bg-hydro-900 border border-cyan-500/60 text-cyan-300 font-mono text-[9px] font-bold whitespace-nowrap">
          ${gauge.currentLevelM}m
        </div>
      </div>
    `,
    iconSize: [60, 40],
    iconAnchor: [30, 18]
  });
};

const createShelterIcon = (shelter) => {
  return L.divIcon({
    className: 'custom-leaflet-shelter',
    html: `
      <div class="flex flex-col items-center">
        <div class="w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-bold text-[10px] shadow-[0_0_12px_rgba(16,185,129,0.5)]">
          🏕️
        </div>
        <div class="mt-0.5 px-1.5 py-0.2 rounded bg-hydro-900 border border-emerald-500/60 text-emerald-300 font-mono text-[9px] font-bold whitespace-nowrap">
          ${shelter.name.split(' ')[0]}
        </div>
      </div>
    `,
    iconSize: [70, 40],
    iconAnchor: [35, 18]
  });
};

export function FloodMapLeaflet() {
  const { currentVillage, currentSimStep, mapLayers } = useAppState();

  const center = [currentVillage.lat, currentVillage.lng];
  const floodRadiusMeters = (currentVillage.floodDistanceKm * 1000 * 0.7) * currentSimStep.inundationMultiplier;

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl glass-panel">
      {/* Radar Scan Screen Effect Overlay */}
      {mapLayers.sarRadar && (
        <div className="absolute inset-0 pointer-events-none z-[400] overflow-hidden opacity-30">
          <div className="w-full h-full radar-grid" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-radar-sweep" />
        </div>
      )}

      {/* Top Left Live Status Banner */}
      <div className="absolute top-3 left-3 z-[500] pointer-events-auto bg-hydro-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-xl font-mono text-xs max-w-xs">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
          <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            SENTINEL-1 SAR OVERLAY
          </span>
          <SeverityBadge severity={currentVillage.severity} />
        </div>
        <div className="space-y-0.5 text-[11px] text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Target Area:</span>
            <strong className="text-white">{currentVillage.name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Simulated Surge:</span>
            <strong className="text-cyan-300">+{currentSimStep.waterLevelDelta.toFixed(2)}m</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Inundated Area:</span>
            <strong className="text-red-400">{(currentVillage.currentInundationSqKm * currentSimStep.inundationMultiplier).toFixed(1)} km²</strong>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController center={center} zoom={12} />

        {/* Dark Matter / Satellite Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Dynamic SAR Inundation Zone (Expanding with time-slider) */}
        {mapLayers.floodMask && (
          <>
            {/* Primary Flood Core */}
            <Circle
              center={center}
              radius={floodRadiusMeters}
              pathOptions={{
                color: '#00F0FF',
                fillColor: '#00F0FF',
                fillOpacity: 0.35,
                weight: 2,
                dashArray: '4 4'
              }}
            />
            {/* Secondary Danger Buffer */}
            <Circle
              center={center}
              radius={floodRadiusMeters * 1.3}
              pathOptions={{
                color: '#EF4444',
                fillColor: '#EF4444',
                fillOpacity: 0.15,
                weight: 1.5,
                dashArray: '6 6'
              }}
            />
          </>
        )}

        {/* Target Village Marker */}
        <Marker
          position={center}
          icon={createVillageIcon(currentVillage.name, currentVillage.severity)}
        >
          <Popup>
            <div className="font-sans text-xs space-y-1.5 p-1">
              <h4 className="font-bold text-sm text-cyan-400">{currentVillage.name} ({currentVillage.localName})</h4>
              <p className="text-slate-300">River Basin: <strong>{currentVillage.riverName}</strong></p>
              <p className="text-slate-300">Population: <strong>{currentVillage.population.toLocaleString()}</strong></p>
              <p className="text-red-400 font-bold">Flood ETA: {currentVillage.etaHours} hours ({currentVillage.floodDistanceKm} km)</p>
            </div>
          </Popup>
        </Marker>

        {/* Upstream Gauge Markers */}
        {mapLayers.gauges && currentVillage.upstreamGauges.map((gauge) => (
          <Marker
            key={gauge.id}
            position={[gauge.lat, gauge.lng]}
            icon={createGaugeIcon(gauge)}
          >
            <Popup>
              <div className="font-sans text-xs space-y-1 p-1">
                <h4 className="font-bold text-cyan-400">{gauge.name}</h4>
                <p className="text-slate-300">Distance Upstream: <strong>{gauge.distanceUpstreamKm} km</strong></p>
                <p className="text-slate-300">Current Level: <strong className="text-white">{gauge.currentLevelM} m</strong></p>
                <p className="text-red-400">Danger Mark: <strong>{gauge.dangerLevelM} m</strong></p>
                <p className="text-slate-400 text-[10px]">Discharge: {gauge.dischargeCusecs.toLocaleString()} cusecs</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Relief Shelter Markers */}
        {mapLayers.shelters && currentVillage.shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            position={[shelter.lat, shelter.lng]}
            icon={createShelterIcon(shelter)}
          >
            <Popup>
              <div className="font-sans text-xs space-y-1 p-1">
                <h4 className="font-bold text-emerald-400">{shelter.name}</h4>
                <p className="text-slate-300">Capacity: <strong>{shelter.currentOccupancy} / {shelter.capacity}</strong></p>
                <p className="text-slate-300">Elevation: <strong>{shelter.elevationMeters}m Above Sea Level</strong></p>
                <p className="text-cyan-300 text-[10px]">Officer: {shelter.officer} ({shelter.phone})</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Evacuation Route Polylines */}
        {mapLayers.routes && currentVillage.routes.map((route) => {
          const isSafe = route.type === 'safe';
          const isCaution = route.type === 'caution';
          const color = isSafe ? '#10B981' : isCaution ? '#F59E0B' : '#EF4444';

          return (
            <Polyline
              key={route.id}
              positions={route.waypoints}
              pathOptions={{
                color: color,
                weight: isSafe ? 5 : 3,
                dashArray: isSafe ? null : '6 8',
                opacity: 0.85
              }}
            >
              <Popup>
                <div className="font-sans text-xs space-y-1 p-1">
                  <h4 className="font-bold" style={{ color }}>{route.name}</h4>
                  <p className="text-slate-300">Status: <strong className="uppercase">{route.type}</strong></p>
                  <p className="text-slate-300">Distance: <strong>{route.distanceKm} km ({route.timeMins} mins)</strong></p>
                  <p className="text-slate-300">Destination: <strong>{route.targetShelter}</strong></p>
                  {route.hazards.length > 0 && (
                    <p className="text-red-400 text-[10px]">⚠ Hazard: {route.hazards.join(', ')}</p>
                  )}
                </div>
              </Popup>
            </Polyline>
          );
        })}
      </MapContainer>
    </div>
  );
}
