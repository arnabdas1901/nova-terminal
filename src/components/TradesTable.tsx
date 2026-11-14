"use client";

import React, { useState } from "react";
import { Search, Layers, Eye } from "lucide-react";
import TradeModal, { Trade } from "./TradeModal";

interface TradesTableProps {
  trades: Trade[];
}

export default function TradesTable({ trades }: TradesTableProps) {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [tagFilter, setTagFilter] = useState<string>("ALL");

  // Filtering
  const filtered = trades.filter((t) => {
    const matchesSearch =
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.reason.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "ALL" || t.action === actionFilter;
    const matchesTag = tagFilter === "ALL" || t.tag === tagFilter;
    return matchesSearch && matchesAction && matchesTag;
  });

  return (
    <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
      {/* Table Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-purple-950/70 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Complete Trade Execution Ledger ({trades.length} Orders)
            </h3>
          </div>
          <p className="text-xs text-purple-300/60 mt-0.5">
            Full audit log of algorithm orders, smart pegging, and statutory fee allocations
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-purple-400/60 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ticker or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#070312] border border-purple-950 text-xs font-mono text-purple-100 placeholder-purple-400/40 focus:outline-none focus:border-purple-600/60 w-44 sm:w-56"
            />
          </div>

          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#070312] border border-purple-950 text-xs font-mono text-purple-200 focus:outline-none focus:border-purple-600/60 cursor-pointer"
          >
            <option value="ALL">All Actions</option>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
            <option value="SELL_PARTIAL">SELL_PARTIAL</option>
          </select>

          {/* Tag Filter */}
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#070312] border border-purple-950 text-xs font-mono text-purple-200 focus:outline-none focus:border-purple-600/60 cursor-pointer"
          >
            <option value="ALL">All Strategies</option>
            <option value="TIER_05_GREEN_LOCK">Tier 0.5 Green Lock</option>
            <option value="ORB_BREAKOUT">ORB Breakout</option>
            <option value="SWING">Swing Momentum</option>
            <option value="SQUARE_OFF">15:15 Square Off</option>
            <option value="STOP_LOSS">Stop Loss</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-purple-950/70 text-[11px] text-purple-300/70 uppercase tracking-wider">
              <th className="py-2.5 px-3">Execution Time</th>
              <th className="py-2.5 px-3">Ticker</th>
              <th className="py-2.5 px-3">Action</th>
              <th className="py-2.5 px-3">Execution Strategy</th>
              <th className="py-2.5 px-3 text-right">Price</th>
              <th className="py-2.5 px-3 text-right">Shares</th>
              <th className="py-2.5 px-3 text-right">Turnover</th>
              <th className="py-2.5 px-3 text-right">Taxes & Fees</th>
              <th className="py-2.5 px-3 text-right">Realized P&L</th>
              <th className="py-2.5 px-3 text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-950/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-purple-400/50">
                  No execution orders matching filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((t, idx) => {
                const isBuy = t.action === "BUY";
                const isPartial = t.action === "SELL_PARTIAL";
                const hasPnl = t.realized_pnl !== null && t.realized_pnl !== undefined;
                const isWin = hasPnl && (t.realized_pnl || 0) > 0;

                return (
                  <tr
                    key={idx}
                    className="hover:bg-[#160a2c]/60 transition-colors group cursor-pointer"
                    onClick={() => setSelectedTrade(t)}
                  >
                    <td className="py-3 px-3 text-purple-300/70 text-[11px] whitespace-nowrap">
                      {t.time}
                    </td>
                    <td className="py-3 px-3 font-bold text-white tracking-tight">
                      {t.symbol}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isBuy
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                            : isPartial
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {t.action}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-mono text-purple-300/80 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-900/40">
                        {t.tag.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-purple-200">
                      ₹{t.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right text-purple-200">{t.shares}</td>
                    <td className="py-3 px-3 text-right text-purple-300/70">
                      ₹{t.trade_value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-right text-amber-400/80">
                      ₹{t.fees.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold">
                      {hasPnl ? (
                        <span className={isWin ? "text-emerald-400" : "text-rose-400"}>
                          {(t.realized_pnl || 0) >= 0 ? "+" : ""}₹{(t.realized_pnl || 0).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-purple-400/40">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrade(t);
                        }}
                        className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/40 text-purple-300 transition-colors"
                        title="Inspect Execution Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Trade Modal Drawer */}
      <TradeModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} />
    </div>
  );
}
