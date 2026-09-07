import React, { createContext, useContext, useState, useEffect } from 'react';
import { REGIONS_DATA, getVillageById } from '../data/regionsData';
import { SIMULATION_STEPS } from '../data/simulationTimeline';
import { MOCK_VOLUNTEERS, MOCK_ACTIVE_SOS } from '../data/mockVolunteers';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // Region & village selection
  const [selectedVillageId, setSelectedVillageId] = useState("as-kam-palasbari");
  
  // Simulation step (0: Current pass, 1: +2h, 2: +4h, 3: +6h, 4: +12h)
  const [simStepIndex, setSimStepIndex] = useState(0);
  const [isPlayingSim, setIsPlayingSim] = useState(false);

  // Language & UI State
  const [language, setLanguage] = useState("en"); // 'en' | 'hi' | 'as' | 'bn' | 'ml'
  const [isCellularDown, setIsCellularDown] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'evacuation' | 'comms' | 'sos' | 'pitch'

  // Map layer visibility toggles
  const [mapLayers, setMapLayers] = useState({
    sarRadar: true,
    floodMask: true,
    gauges: true,
    routes: true,
    shelters: true,
    satelliteTile: true
  });

  // SOS List and Volunteers State
  const [activeSosList, setActiveSosList] = useState(MOCK_ACTIVE_SOS);
  const [volunteers, setVolunteers] = useState(MOCK_VOLUNTEERS);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [offlinePassModalOpen, setOfflinePassModalOpen] = useState(false);

  // Derived current village & sim step
  const currentVillage = getVillageById(selectedVillageId);
  const currentSimStep = SIMULATION_STEPS[simStepIndex];

  // Auto-play simulation playback
  useEffect(() => {
    let timer;
    if (isPlayingSim) {
      timer = setInterval(() => {
        setSimStepIndex((prev) => (prev + 1) % SIMULATION_STEPS.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlayingSim]);

  const toggleLayer = (layerKey) => {
    setMapLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const addSosBeacon = (newSos) => {
    const created = {
      id: `sos-${Date.now().toString().slice(-4)}`,
      reportedAt: "Just now",
      status: "DISPATCHED",
      assignedVolunteer: "Auto-matched nearest responder",
      ...newSos
    };
    setActiveSosList((prev) => [created, ...prev]);
  };

  return (
    <AppStateContext.Provider
      value={{
        REGIONS_DATA,
        selectedVillageId,
        setSelectedVillageId,
        currentVillage,
        simStepIndex,
        setSimStepIndex,
        currentSimStep,
        isPlayingSim,
        setIsPlayingSim,
        language,
        setLanguage,
        isCellularDown,
        setIsCellularDown,
        activeTab,
        setActiveTab,
        mapLayers,
        toggleLayer,
        activeSosList,
        addSosBeacon,
        volunteers,
        sosModalOpen,
        setSosModalOpen,
        offlinePassModalOpen,
        setOfflinePassModalOpen
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
