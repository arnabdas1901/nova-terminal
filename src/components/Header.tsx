import React from "react";
import { Shield, Cpu } from "lucide-react";

interface HeaderProps {
  lastUpdated: string;
}

export default function Header({ lastUpdated }: HeaderProps) {
  return (
    <header className="border-b border-purple-950/70 bg-[#070312]/85 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Title with Official NOVA Logo */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-purple-600/30 via-purple-950/50 to-black border border-purple-500/50 flex items-center justify-center p-0.5 shadow-lg shadow-purple-950/60 glow-purple">
            <img
              src="/logo.png"
              alt="NOVA Logo"
              className="h-full w-full object-contain rounded-lg"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                PROJECT NOVA
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 font-mono font-medium">
                  v5.1 Sniper
                </span>
              </h1>
            </div>
            <p className="text-xs text-purple-300/70">
              Autonomous Quantitative Trading & BlackRock Aladdin Risk Architecture • Session: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Status Indicators & Admissions Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Read Only Beacon */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0e071c] border border-purple-900/60 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-purple-200 font-mono font-medium">VIEWING GALLERY (READ-ONLY)</span>
          </div>

          {/* Aladdin Risk Status */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/50 border border-purple-700/50 text-xs text-purple-300">
            <Shield className="h-3.5 w-3.5 text-purple-400" />
            <span className="font-mono">ALADDIN GOVERNOR: CLEAR</span>
          </div>

          {/* Candidate Showcase Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-fuchsia-950/40 border border-fuchsia-800/40 text-xs text-fuchsia-300 font-mono">
            <Cpu className="h-3.5 w-3.5 text-fuchsia-400" />
            <span>CANDIDATE SHOWCASE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
