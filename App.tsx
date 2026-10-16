import React, { useState } from 'react';
import { FestivalMap } from './components/3d/FestivalMap';
import { ScheduleView } from './components/ui/ScheduleView';
import { Navbar } from './components/ui/Navbar';
import { PassCustomizerModal } from './components/ui/PassCustomizerModal';
import { AudioVisualizerBar } from './components/ui/AudioVisualizerBar';
import { StageId, StageInfo, TicketConfig } from './types/festival';
import { FESTIVAL_STAGES } from './data/festivalData';
import { Activity, Radio, Sparkles, MapPin, Layers } from 'lucide-react';

export default function App() {
  const [selectedStageId, setSelectedStageId] = useState<StageId | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>(['act-1', 'act-2']); // intentional conflict on act-1 & act-2 for immediate demonstration

  const [ticketConfig, setTicketConfig] = useState<TicketConfig>({
    attendeeName: 'CYBER_VOYAGER',
    tier: 'VIP QUANTUM',
    passId: 'AURA-9842',
    avatarSeed: 'neural-7',
    nfcEnabled: true,
    hologramColor: '#00f0ff'
  });

  const handleSelectStage = (stage: StageInfo) => {
    setSelectedStageId(stage.id);
  };

  const handleToggleBookmark = (actId: string) => {
    setBookmarks((prev) =>
      prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    );
  };

  const activeStageInfo = FESTIVAL_STAGES.find((s) => s.id === selectedStageId);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Primary Sticky Cyberpunk Navigation */}
      <Navbar
        onOpenPassCustomizer={() => setIsPassModalOpen(true)}
        bookmarksCount={bookmarks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        {/* Hero Title & Telemetry Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>LIVE GROUND SENSORS ONLINE • 5 ACTIVE HUBS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              AURA FESTIVAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">2026</span>
            </h1>
            <p className="text-sm text-slate-400 font-mono mt-1 max-w-xl">
              Spatial Audio Paradigms & Cybernetic Volumetric Grounds. Navigate the 3D grid below to inspect stages and lock in your session timeline.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <AudioVisualizerBar />
            <div className="hidden sm:block text-right font-mono text-xs">
              <span className="text-slate-500 block">WEATHER FEED</span>
              <span className="text-cyan-400 font-bold">21°C • NEON DRIZZLE</span>
            </div>
          </div>
        </section>

        {/* 3D Festival Map Interactive Ground */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase">SPATIAL GROUNDS (WEBGL 3D)</span>
              {activeStageInfo && (
                <span className="text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  FOCUSED: {activeStageInfo.name}
                </span>
              )}
            </div>

            {selectedStageId && (
              <button
                onClick={() => setSelectedStageId(null)}
                className="text-xs font-mono text-slate-400 hover:text-cyan-300 underline"
              >
                Clear Stage Focus
              </button>
            )}
          </div>

          <FestivalMap
            selectedStageId={selectedStageId}
            onSelectStage={handleSelectStage}
          />
        </section>

        {/* Synchronized Festival Schedule & Conflict Engine */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                FESTIVAL ITINERARY & SESSIONS
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Filtered automatically when inspecting stages. Add acts to track potential time overlaps.
              </p>
            </div>
          </div>

          <ScheduleView
            selectedStageId={selectedStageId}
            onSelectStageId={setSelectedStageId}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        </section>
      </main>

      {/* Holographic Pass 3D Generator Drawer Modal */}
      <PassCustomizerModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        config={ticketConfig}
        onChangeConfig={setTicketConfig}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AURA PROTOCOL — IMMERSIVE DIGITAL EXPERIENCE CHAMPIONSHIP ENTRY</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-cyan-400 cursor-pointer">PRIVACY ENCLAVE</span>
            <span className="hover:text-cyan-400 cursor-pointer">TERMS OF TRANSMISSION</span>
            <span className="hover:text-cyan-400 cursor-pointer">NEURAL SAFETY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}