import React from "react";
import { X, Shield, Layers } from "lucide-react";

export interface Trade {
  time: string;
  symbol: string;
  action: string;
  price: number;
  shares: number;
  trade_value: number;
  fees: number;
  realized_pnl: number | null;
  return_pct: number | null;
  balance: number;
  reason: string;
  tag: string;
}

interface TradeModalProps {
  trade: Trade | null;
  onClose: () => void;
}

export default function TradeModal({ trade, onClose }: TradeModalProps) {
  if (!trade) return null;

  const isBuy = trade.action === "BUY";
  const isPartial = trade.action === "SELL_PARTIAL";
  const isWin = trade.realized_pnl !== null && trade.realized_pnl > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-purple-700/60 bg-[#0a0414] p-6 shadow-2xl shadow-purple-950/80 font-mono text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#180a32] text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors border border-purple-800/40"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-purple-950/70">
          <div
            className={`p-2 rounded-xl border ${
              isBuy
                ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                : isWin
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/15 text-rose-400 border-rose-500/30"
            }`}
          >
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">{trade.symbol}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isBuy
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                    : isPartial
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                }`}
              >
                {trade.action}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950/60 text-purple-300 border border-purple-900/40">
                {trade.tag}
              </span>
            </div>
            <div className="text-[11px] text-purple-300/70 mt-0.5">{trade.time}</div>
          </div>
        </div>

        {/* Execution Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[#120726]/80 border border-purple-900/50">
            <span className="text-purple-300/60 block text-[10px] uppercase">Execution Price</span>
            <span className="text-sm font-bold text-white">₹{trade.price.toFixed(2)}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#120726]/80 border border-purple-900/50">
            <span className="text-purple-300/60 block text-[10px] uppercase">Shares Executed</span>
            <span className="text-sm font-bold text-white">{trade.shares} Qty</span>
          </div>
          <div className="p-3 rounded-lg bg-[#120726]/80 border border-purple-900/50">
            <span className="text-purple-300/60 block text-[10px] uppercase">Gross Trade Value</span>
            <span className="text-sm font-bold text-white">₹{trade.trade_value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#120726]/80 border border-purple-900/50">
            <span className="text-purple-300/60 block text-[10px] uppercase">Statutory Friction</span>
            <span className="text-sm font-bold text-amber-300">₹{trade.fees.toFixed(2)}</span>
          </div>
        </div>

        {/* Realized P&L if Sell */}
        {trade.realized_pnl !== null && (
          <div className="mt-3 p-3.5 rounded-lg bg-[#120726]/80 border border-purple-900/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-purple-300/60 block uppercase">Realized Net Return</span>
              <span className={`text-base font-bold ${isWin ? "text-emerald-400" : "text-rose-400"}`}>
                {trade.realized_pnl >= 0 ? "+" : ""}₹{trade.realized_pnl.toFixed(2)}
              </span>
            </div>
            {trade.return_pct !== null && (
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  isWin ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}
              >
                {trade.return_pct >= 0 ? `+${trade.return_pct.toFixed(2)}%` : `${trade.return_pct.toFixed(2)}%`}
              </span>
            )}
          </div>
        )}

        {/* Algorithm Reason & Rationale */}
        <div className="mt-3 p-3 rounded-lg bg-[#070312] border border-purple-950">
          <span className="text-[10px] text-purple-300/60 uppercase block mb-1">
            Algorithm Signal & Trigger Rationale
          </span>
          <p className="text-purple-200 text-xs leading-relaxed">{trade.reason}</p>
        </div>

        {/* Statutory Fee Breakdown Callout */}
        <div className="mt-3 p-3 rounded-lg bg-purple-950/30 border border-purple-900/40 flex items-center gap-2 text-purple-300/80">
          <Shield className="h-4 w-4 text-purple-400 flex-shrink-0" />
          <span className="text-[11px]">
            Statutory breakdown: STT (0.1% delivery / 0.025% intraday), GST (18%), Stamp Duty (0.015%), Exchange turnover charges.
          </span>
        </div>
      </div>
    </div>
  );
}
