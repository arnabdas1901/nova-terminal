import React from "react";
import { ShieldCheck, Flame } from "lucide-react";

interface AladdinRiskProps {
  riskData: {
    cvar_99: number;
    gross_leverage: number;
    gross_leverage_limit: number;
    net_portfolio_beta: number;
    net_portfolio_beta_limit: number;
    sebi_margin_utilization_pct: number;
    sebi_margin_limit_pct: number;
    circuit_breaker_status: string;
    soft_halt_floor_pct: number;
    hard_liquidation_floor_pct: number;
    profit_ratchet_floor_pct: number;
    stress_scenarios: Array<{
      name: string;
      simulated_drawdown: number;
      aladdin_haircut: number;
      status: string;
    }>;
    defense_mechanisms: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function AladdinRiskPanel({ riskData }: AladdinRiskProps) {
  return (
    <div className="space-y-6">
      {/* Risk Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Leverage Gauge */}
        <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-4 font-mono shadow-lg shadow-purple-950/20">
          <div className="flex items-center justify-between text-xs text-purple-300/70">
            <span>GROSS LEVERAGE</span>
            <span className="text-purple-300 font-bold bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">COMPLIANT</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white">{riskData.gross_leverage}x</span>
            <span className="text-xs text-purple-400/50">/ {riskData.gross_leverage_limit}x Max</span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full bg-[#180a30] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
              style={{ width: `${(riskData.gross_leverage / riskData.gross_leverage_limit) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Net Beta Gauge */}
        <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-4 font-mono shadow-lg shadow-purple-950/20">
          <div className="flex items-center justify-between text-xs text-purple-300/70">
            <span>NET PORTFOLIO BETA</span>
            <span className="text-purple-300 font-bold bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">DOLLAR-NEUTRAL</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white">+{riskData.net_portfolio_beta}</span>
            <span className="text-xs text-purple-400/50">/ ±{riskData.net_portfolio_beta_limit} Max</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-[#180a30] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
              style={{ width: `${(Math.abs(riskData.net_portfolio_beta) / riskData.net_portfolio_beta_limit) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* SEBI Margin Utilization */}
        <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-4 font-mono shadow-lg shadow-purple-950/20">
          <div className="flex items-center justify-between text-xs text-purple-300/70">
            <span>SEBI MARGIN UTIL</span>
            <span className="text-purple-300 font-bold bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">SAFE</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white">{riskData.sebi_margin_utilization_pct}%</span>
            <span className="text-xs text-purple-400/50">/ {riskData.sebi_margin_limit_pct}% Cap</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-[#180a30] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
              style={{ width: `${(riskData.sebi_margin_utilization_pct / riskData.sebi_margin_limit_pct) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 99% CVaR Tail Risk */}
        <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-4 font-mono shadow-lg shadow-purple-950/20">
          <div className="flex items-center justify-between text-xs text-purple-300/70">
            <span>99% CVaR (EXPECTED SHORTFALL)</span>
            <span className="text-purple-300 font-bold bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">SECURE</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white">{riskData.cvar_99}%</span>
            <span className="text-xs text-purple-400/50">1-Day Tail Risk</span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-[#180a30] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full w-[28%]"></div>
          </div>
        </div>
      </div>

      {/* 4 Defense Layers Grid */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-950/70">
          <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            BlackRock Aladdin Institutional Defense Layers
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskData.defense_mechanisms.map((dm, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#080314]/90 border border-purple-950/80 hover:border-purple-600/50 transition-all font-mono text-xs"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center text-[10px] font-bold">
                  0{idx + 1}
                </span>
                <span className="font-bold text-white text-xs">{dm.title}</span>
              </div>
              <p className="text-purple-300/70 leading-relaxed text-[11px]">{dm.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Crisis Stress Testing Matrix */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-950/70">
          <div className="p-1.5 rounded-lg bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
            <Flame className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Historical Macro Stress Testing & Survival Matrix
          </h3>
        </div>

        <div className="mt-4 overflow-x-auto font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-950/70 text-[11px] text-purple-300/70 uppercase">
                <th className="py-2.5 px-3">Macro Crisis Scenario</th>
                <th className="py-2.5 px-3">Benchmark Market Shock</th>
                <th className="py-2.5 px-3">Aladdin Sizing Haircut</th>
                <th className="py-2.5 px-3 text-right">Survival Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60">
              {riskData.stress_scenarios.map((sc, i) => (
                <tr key={i} className="hover:bg-[#160a2c]/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{sc.name}</td>
                  <td className="py-3 px-3 text-rose-400">{sc.simulated_drawdown}%</td>
                  <td className="py-3 px-3 text-purple-300 font-bold">{sc.aladdin_haircut}x Exposure</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {sc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
