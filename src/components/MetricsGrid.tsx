import React from "react";
import { TrendingUp, Wallet, Percent, ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";

interface MetricsProps {
  summary: {
    starting_capital: number;
    current_equity: number;
    peak_equity: number;
    cash_balance: number;
    cash_percentage: number;
    net_pnl: number;
    net_return_pct: number;
    intraday_peak_alpha_pct: number;
    max_drawdown_pct: number;
    total_orders_logged: number;
    closed_round_trips: number;
    round_trip_win_rate: number;
    profit_factor: number;
    win_loss_ratio: number;
    total_statutory_friction_paid: number;
    estimated_friction_saved_by_sniper: number;
  };
}

export default function MetricsGrid({ summary }: MetricsProps) {
  const isPositive = summary.net_pnl >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Portfolio Value & Return */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-950/40 transition-all p-4 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-purple-300/70 uppercase tracking-wider">
            Total Portfolio Equity
          </span>
          <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            ₹{summary.current_equity.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span
            className={`flex items-center text-xs font-mono font-semibold ${
              isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3 text-rose-400" />}
            {summary.net_return_pct > 0 ? `+${summary.net_return_pct}%` : `${summary.net_return_pct}%`}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-purple-300/60 font-mono border-t border-purple-950/70 pt-2">
          <span>Wallet: ₹{summary.starting_capital.toLocaleString("en-IN")}</span>
          <span className="text-purple-300 font-medium">Peak: ₹{summary.peak_equity.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* 2. Cash & Liquidity Reserves */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-950/40 transition-all p-4 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-purple-300/70 uppercase tracking-wider">
            Cash Liquidity Ratio
          </span>
          <div className="p-1.5 rounded-lg bg-violet-500/15 text-violet-300 border border-violet-500/30">
            <Wallet className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            ₹{summary.cash_balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-mono font-medium text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">
            {summary.cash_percentage}% Cash
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-purple-300/60 font-mono border-t border-purple-950/70 pt-2">
          <span>Active Risk: ₹{(summary.current_equity - summary.cash_balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          <span className="text-purple-200">Max DD: {summary.max_drawdown_pct}%</span>
        </div>
      </div>

      {/* 3. Performance Ratios (Win Rate & Profit Factor) */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-950/40 transition-all p-4 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-purple-300/70 uppercase tracking-wider">
            Win Rate & Profit Factor
          </span>
          <div className="p-1.5 rounded-lg bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
            <Percent className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            {summary.round_trip_win_rate.toFixed(1)}%
          </span>
          <span className="text-xs font-mono font-medium text-fuchsia-300 bg-fuchsia-500/15 px-2 py-0.5 rounded border border-fuchsia-500/30">
            {summary.profit_factor}x Profit Factor
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-purple-300/60 font-mono border-t border-purple-950/70 pt-2">
          <span>Win/Loss Ratio: {summary.win_loss_ratio}x</span>
          <span>Round Trips: {summary.closed_round_trips}</span>
        </div>
      </div>

      {/* 4. Statutory Friction & Sniper Savings */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-950/40 transition-all p-4 relative overflow-hidden backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-purple-300/70 uppercase tracking-wider">
            Regulatory Friction
          </span>
          <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Layers className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-amber-300">
            ₹{summary.total_statutory_friction_paid.toFixed(2)}
          </span>
          <span className="text-[11px] font-mono text-purple-300/60">
            STT + GST + SEBI
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-purple-300/60 font-mono border-t border-purple-950/70 pt-2">
          <span className="text-purple-300 font-medium">Saved: ~₹{summary.estimated_friction_saved_by_sniper.toLocaleString("en-IN")}/mo</span>
          <span>Orders: {summary.total_orders_logged}</span>
        </div>
      </div>
    </div>
  );
}
