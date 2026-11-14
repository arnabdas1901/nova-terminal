"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import MetricsGrid from "@/components/MetricsGrid";
import EquityChart from "@/components/EquityChart";
import HoldingsCard from "@/components/HoldingsCard";
import TradesTable from "@/components/TradesTable";
import RoundTripsTable from "@/components/RoundTripsTable";
import AladdinRiskPanel from "@/components/AladdinRiskPanel";
import MLArchitecturePanel from "@/components/MLArchitecturePanel";
import CandidateStatement from "@/components/CandidateStatement";

import novaData from "@/data/novaData.json";
import { LayoutDashboard, ListOrdered, CheckCircle2, ShieldAlert, BrainCircuit, GraduationCap, Download } from "lucide-react";

type Tab = "OVERVIEW" | "TRADES" | "ROUND_TRIPS" | "ALADDIN_RISK" | "ML_PIPELINE" | "CANDIDATE_DOSSIER";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("OVERVIEW");

  // Download raw telemetry as JSON
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(novaData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nova_telemetry_${new Date().toISOString().split("T")[0]}.json`);
    downloadAnchor.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-[#05020a] text-purple-50 flex flex-col font-sans terminal-grid">
      {/* Top Header */}
      <Header lastUpdated={novaData.metadata.last_market_session} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-950/60 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab("OVERVIEW")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === "OVERVIEW"
                  ? "bg-purple-600/20 text-purple-200 border border-purple-500/50 shadow-sm shadow-purple-950/50"
                  : "bg-[#0e071c]/70 text-purple-300/60 hover:text-white hover:bg-[#180d30] border border-purple-950/50"
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-purple-400" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("TRADES")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === "TRADES"
                  ? "bg-purple-600/20 text-purple-200 border border-purple-500/50 shadow-sm shadow-purple-950/50"
                  : "bg-[#0e071c]/70 text-purple-300/60 hover:text-white hover:bg-[#180d30] border border-purple-950/50"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5 text-purple-400" />
              <span>Order Ledger ({novaData.trades.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("ROUND_TRIPS")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === "ROUND_TRIPS"
                  ? "bg-purple-600/20 text-purple-200 border border-purple-500/50 shadow-sm shadow-purple-950/50"
                  : "bg-[#0e071c]/70 text-purple-300/60 hover:text-white hover:bg-[#180d30] border border-purple-950/50"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
              <span>Round Trips ({novaData.round_trips.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("ALADDIN_RISK")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === "ALADDIN_RISK"
                  ? "bg-purple-600/20 text-purple-200 border border-purple-500/50 shadow-sm shadow-purple-950/50"
                  : "bg-[#0e071c]/70 text-purple-300/60 hover:text-white hover:bg-[#180d30] border border-purple-950/50"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5 text-purple-400" />
              <span>Aladdin Risk</span>
            </button>

            <button
              onClick={() => setActiveTab("ML_PIPELINE")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === "ML_PIPELINE"
                  ? "bg-purple-600/20 text-purple-200 border border-purple-500/50 shadow-sm shadow-purple-950/50"
                  : "bg-[#0e071c]/70 text-purple-300/60 hover:text-white hover:bg-[#180d30] border border-purple-950/50"
              }`}
            >
              <BrainCircuit className="h-3.5 w-3.5 text-purple-400" />
              <span>ML Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab("CANDIDATE_DOSSIER")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === "CANDIDATE_DOSSIER"
                  ? "bg-fuchsia-600/20 text-fuchsia-200 border border-fuchsia-500/50 shadow-sm shadow-fuchsia-950/50"
                  : "bg-[#0e071c]/70 text-fuchsia-300/70 hover:text-white hover:bg-[#180d30] border border-purple-950/50"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5 text-fuchsia-400" />
              <span>Candidate Dossier</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e071c] hover:bg-[#180d30] border border-purple-900/50 text-xs font-mono text-purple-200 transition-colors"
              title="Download Telemetry JSON"
            >
              <Download className="h-3.5 w-3.5 text-purple-400" />
              <span className="hidden sm:inline">Export Audit Data</span>
            </button>
          </div>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Metric Cards */}
            <MetricsGrid summary={novaData.executive_summary} />

            {/* Holdings & Live Risk Card */}
            <HoldingsCard
              holdings={novaData.holdings}
              totalEquity={novaData.executive_summary.current_equity}
            />

            {/* Equity Curve Chart */}
            <EquityChart
              data={novaData.equity_curve}
              peakEquity={novaData.executive_summary.peak_equity}
            />

            {/* Recent Round Trips Highlights */}
            <RoundTripsTable roundTrips={novaData.round_trips} />
          </div>
        )}

        {/* Tab 2: TRADES LEDGER */}
        {activeTab === "TRADES" && (
          <div className="animate-in fade-in duration-200">
            <TradesTable trades={novaData.trades} />
          </div>
        )}

        {/* Tab 3: ROUND TRIPS */}
        {activeTab === "ROUND_TRIPS" && (
          <div className="animate-in fade-in duration-200">
            <RoundTripsTable roundTrips={novaData.round_trips} />
          </div>
        )}

        {/* Tab 4: ALADDIN RISK */}
        {activeTab === "ALADDIN_RISK" && (
          <div className="animate-in fade-in duration-200">
            <AladdinRiskPanel riskData={novaData.aladdin_risk} />
          </div>
        )}

        {/* Tab 5: ML ARCHITECTURE */}
        {activeTab === "ML_PIPELINE" && (
          <div className="animate-in fade-in duration-200">
            <MLArchitecturePanel pipeline={novaData.machine_learning_pipeline} />
          </div>
        )}

        {/* Tab 6: CANDIDATE DOSSIER */}
        {activeTab === "CANDIDATE_DOSSIER" && (
          <div className="animate-in fade-in duration-200">
            <CandidateStatement />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-950/70 bg-[#070312]/80 py-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-purple-400/60">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full overflow-hidden border border-purple-500/40">
              <img src="/logo.png" alt="NOVA" className="h-full w-full object-cover" />
            </div>
            <span>Project NOVA • Quantitative Research & Algorithmic Execution System</span>
          </div>
          <div className="flex items-center gap-4 text-purple-300/70">
            <span>Author: Arnab Das</span>
            <span>•</span>
            <span className="text-purple-400 font-semibold">Vercel Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
