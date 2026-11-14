import React from "react";
import { Briefcase } from "lucide-react";

interface Holding {
  symbol: string;
  clean_symbol: string;
  shares: number;
  avg_price: number;
  current_price: number;
  position_value: number;
  unrealized_pnl: number;
  unrealized_pct: number;
  stop_loss_price: number;
  highest_price: number;
  trade_type: string;
  entry_date: string;
  scaled_out: boolean;
  risk_to_stop_inr: number;
}

interface HoldingsCardProps {
  holdings: Holding[];
  totalEquity: number;
}

export default function HoldingsCard({ holdings, totalEquity }: HoldingsCardProps) {
  if (!holdings || holdings.length === 0) {
    return (
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/60 p-5 text-center font-mono text-purple-400/60 text-sm">
        No active positions currently open (100% Cash Reserves).
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
      <div className="flex items-center justify-between pb-3 border-b border-purple-950/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Active Portfolio Positions ({holdings.length})
          </h3>
        </div>
        <span className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded">
          Aladdin Monitored
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {holdings.map((h) => {
          const isProfitable = h.unrealized_pnl >= 0;
          const portfolioWeight = ((h.position_value / totalEquity) * 100).toFixed(1);

          return (
            <div
              key={h.symbol}
              className="rounded-lg border border-purple-950/80 bg-[#080314]/90 p-4 transition-all hover:border-purple-600/50 hover:shadow-md hover:shadow-purple-950/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Ticker & Status */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold font-mono text-white tracking-tight">
                      {h.clean_symbol}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800/50">
                      {h.trade_type}
                    </span>
                    <span className="text-[10px] font-mono text-purple-300/60">
                      {portfolioWeight}% Allocation
                    </span>
                  </div>
                  <div className="text-xs text-purple-300/70 font-mono mt-1">
                    {h.shares} Shares @ avg ₹{h.avg_price.toFixed(2)} | Current: ₹{h.current_price.toFixed(2)}
                  </div>
                </div>

                {/* Unrealized P&L */}
                <div className="text-right">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <span
                      className={`text-sm font-bold font-mono flex items-center ${
                        isProfitable ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {isProfitable ? "+" : ""}₹{h.unrealized_pnl.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded ${
                        isProfitable ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {h.unrealized_pct >= 0 ? `+${h.unrealized_pct.toFixed(2)}%` : `${h.unrealized_pct.toFixed(2)}%`}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-purple-300/60 mt-0.5">
                    Position Value: ₹{h.position_value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Risk & Chandelier Floor */}
              <div className="mt-3 pt-3 border-t border-purple-950/70 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-[#120726]/70 p-2 rounded border border-purple-900/40">
                  <span className="text-purple-300/60 block text-[10px]">CHANDELIER STOP</span>
                  <span className="text-purple-300 font-bold">₹{h.stop_loss_price.toFixed(2)}</span>
                </div>
                <div className="bg-[#120726]/70 p-2 rounded border border-purple-900/40">
                  <span className="text-purple-300/60 block text-[10px]">RISK TO STOP</span>
                  <span className="text-rose-400 font-bold">₹{h.risk_to_stop_inr.toFixed(2)}</span>
                  <span className="text-purple-300/60 text-[10px] ml-1">
                    ({((h.risk_to_stop_inr / totalEquity) * 100).toFixed(2)}%)
                  </span>
                </div>
                <div className="bg-[#120726]/70 p-2 rounded border border-purple-900/40 col-span-2 sm:col-span-1">
                  <span className="text-purple-300/60 block text-[10px]">PEAK HIGH</span>
                  <span className="text-white">₹{h.highest_price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
