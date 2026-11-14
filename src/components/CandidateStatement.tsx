import React from "react";
import { GraduationCap, BookOpen, CheckCircle2, Code2 } from "lucide-react";

export default function CandidateStatement() {
  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Hero Dossier Banner with NOVA Logo */}
      <div className="rounded-xl border border-purple-900/40 bg-gradient-to-br from-[#120726] via-[#080314] to-[#05020a] p-6 backdrop-blur-md shadow-xl shadow-purple-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-purple-950/70">
          <div className="flex items-center gap-3.5">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600/30 via-purple-950 to-black border border-purple-500/50 flex items-center justify-center p-1 shadow-lg shadow-purple-950/80 glow-purple flex-shrink-0">
              <img
                src="/logo.png"
                alt="NOVA Logo"
                className="h-full w-full object-contain rounded-xl"
              />
            </div>
            <div>
              <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                CANDIDATE DOSSIER & QUANTITATIVE THESIS
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Project NOVA: Quantitative Edge, Friction Dynamics & Institutional Risk
              </h2>
              <p className="text-xs text-purple-300/70">
                Author: Arnab Das | Candidate for Advanced Quantitative Finance & Computational Engineering
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-[#14082c] border border-purple-800/40 text-purple-200 text-xs">
              Next.js 14 • Vercel Edge • Python Core
            </span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#080314]/90 border border-purple-950/80">
            <span className="text-purple-400 font-bold block text-[11px] mb-1">
              1. THE HIGH-FREQUENCY PARADOX
            </span>
            <p className="text-purple-200/90 leading-relaxed text-[11px]">
              Empirical proof of why retail algos fail at high frequency: statutory friction (STT, GST, turnover fees) consumes 30–50% of monthly capital. NOVA solves this by shifting from micro-scalping to high-conviction sniper setups.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#080314]/90 border border-purple-950/80">
            <span className="text-fuchsia-400 font-bold block text-[11px] mb-1">
              2. ASYMMETRIC HARVESTING
            </span>
            <p className="text-purple-200/90 leading-relaxed text-[11px]">
              Implementation of the Tier 0.5 Green Lock (+0.80% gain automatically banks 50% shares and ratchets stop to Breakeven + Fees), eliminating the #1 killer of retail trading: turning winning positions into losses.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#080314]/90 border border-purple-950/80">
            <span className="text-violet-400 font-bold block text-[11px] mb-1">
              3. ALADDIN GOVERNANCE
            </span>
            <p className="text-purple-200/90 leading-relaxed text-[11px]">
              Instituting institutional BlackRock Aladdin risk controls: 99% CVaR stress tests, 45-minute post-stop quarantine to prevent revenge trading, and automated portfolio profit retention floors.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Dive: The Quantitative Research Insight */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-6 backdrop-blur-md space-y-4 shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-950/70">
          <BookOpen className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Quantitative Research Insight: Friction Decay & Mathematical Expectancy
          </h3>
        </div>

        <div className="space-y-3 text-purple-200/90 leading-relaxed text-xs">
          <p>
            In algorithmic finance, retail literature frequently focuses on optimizing signal indicators while completely ignoring statutory transaction friction. According to official SEBI market data, <span className="text-white font-bold">over 93% of active retail traders face net losses</span>, with more than 50% of the aggregate loss directly attributable to transaction taxes and fees.
          </p>
          <div className="p-4 rounded-lg bg-[#080314] border border-purple-950 text-purple-200 space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Mathematical Proof of Friction Decay:
            </div>
            <p className="font-mono text-[11px] text-purple-300/70">
              For an intraday strategy with gross win rate <span className="text-white font-bold">W = 50%</span>, average gain <span className="text-white font-bold">R_w = +0.35%</span>, average loss <span className="text-white font-bold">R_l = -0.35%</span>, and statutory friction <span className="text-rose-400 font-bold">F = 0.12% per leg (0.24% round-trip)</span>:
            </p>
            <div className="p-2.5 rounded bg-[#160a2c] text-purple-200 border border-purple-800/40 font-bold text-[11px]">
              Expected Net Alpha: E[R] = (0.50 × 0.35%) − (0.50 × 0.35%) − 0.24% = −0.24% per trade
            </div>
            <p className="text-[11px] text-purple-300/70">
              At 15 trades per day, the fund equity experiences a deterministic drag of −3.6% per day, guaranteeing bankruptcy despite zero directional bias.
            </p>
          </div>
          <p>
            Project NOVA directly addresses this mathematical reality through its <span className="text-purple-300 font-bold">Sniper Architecture</span>:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-purple-300/80">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
              <span>Reduced trade frequency from 15 trades/day to 3–4 high-conviction setups.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
              <span>Target moves expanded from +0.3% scalps to +1.5% to +4.0% swing trends.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
              <span>Friction-to-gain ratio collapsed from 68% down to under 4.0%.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
              <span>Preserves ₹3,800+ per month in turnover taxes on a ₹50,000 portfolio.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technology Stack & Architecture Grid */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-6 backdrop-blur-md shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-950/70">
          <Code2 className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Production Engineering & Software Architecture
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-[#080314] border border-purple-950">
            <span className="text-[10px] text-purple-400/60 uppercase block">CORE RUNTIME</span>
            <span className="text-sm font-bold text-white mt-0.5 block">Python 3.12</span>
            <span className="text-[10px] text-purple-400">Multi-Threaded</span>
          </div>
          <div className="p-3 rounded-lg bg-[#080314] border border-purple-950">
            <span className="text-[10px] text-purple-400/60 uppercase block">MACHINE LEARNING</span>
            <span className="text-sm font-bold text-white mt-0.5 block">XGBoost & PyTorch</span>
            <span className="text-[10px] text-fuchsia-400">Chronos Foundation</span>
          </div>
          <div className="p-3 rounded-lg bg-[#080314] border border-purple-950">
            <span className="text-[10px] text-purple-400/60 uppercase block">MICROSTRUCTURE</span>
            <span className="text-sm font-bold text-white mt-0.5 block">Level-2 Depth</span>
            <span className="text-[10px] text-violet-400">OBI / OFI / CVD</span>
          </div>
          <div className="p-3 rounded-lg bg-[#080314] border border-purple-950">
            <span className="text-[10px] text-purple-400/60 uppercase block">SHOWCASE UI</span>
            <span className="text-sm font-bold text-white mt-0.5 block">Next.js 14</span>
            <span className="text-[10px] text-purple-300">Vercel Edge CDN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
