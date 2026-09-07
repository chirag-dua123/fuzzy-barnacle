import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { EvacuationPage } from './pages/EvacuationPage';
import { ResilientCommsPage } from './pages/ResilientCommsPage';
import { SosVolunteerPage } from './pages/SosVolunteerPage';
import { JuryPitchPage } from './pages/JuryPitchPage';
import { OfflinePassModal } from './components/evacuation/OfflinePassModal';
import { SosBeaconModal } from './components/volunteer/SosBeaconModal';

function MainContent() {
  const { activeTab } = useAppState();

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 min-h-[calc(100vh-140px)]">
      {activeTab === 'dashboard' && <DashboardPage />}
      {activeTab === 'evacuation' && <EvacuationPage />}
      {activeTab === 'comms' && <ResilientCommsPage />}
      {activeTab === 'sos' && <SosVolunteerPage />}
      {activeTab === 'pitch' && <JuryPitchPage />}

      {/* Global Modals */}
      <OfflinePassModal />
      <SosBeaconModal />
    </main>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="min-h-screen flex flex-col bg-hydro-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AppStateProvider>
  );
}
