import React from "react";
import { CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface RoundTrip {
  symbol: string;
  buy_time: string;
  sell_time: string;
  shares: number;
  buy_price: number;
  sell_price: number;
  gross_pnl: number;
  fees: number;
  net_pnl: number;
  return_pct: number;
  reason: string;
}

interface RoundTripsProps {
  roundTrips: RoundTrip[];
}

export default function RoundTripsTable({ roundTrips }: RoundTripsProps) {
  if (!roundTrips || roundTrips.length === 0) {
    return (
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/60 p-5 text-center font-mono text-purple-400/60 text-sm">
        No completed round trips recorded yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
      <div className="flex items-center justify-between pb-3 border-b border-purple-950/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Closed Round-Trip Attribution ({roundTrips.length})
          </h3>
        </div>
        <span className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded">
          FIFO Accounting Net of Indian Taxes
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-purple-950/70 text-[11px] text-purple-300/70 uppercase tracking-wider">
              <th className="py-2.5 px-3">Ticker</th>
              <th className="py-2.5 px-3">Entry / Exit Times</th>
              <th className="py-2.5 px-3">Qty</th>
              <th className="py-2.5 px-3">Execution Prices</th>
              <th className="py-2.5 px-3 text-right">Gross P&L</th>
              <th className="py-2.5 px-3 text-right">Friction (Fees)</th>
              <th className="py-2.5 px-3 text-right">Net Alpha</th>
              <th className="py-2.5 px-3 text-right">Return %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-950/60">
            {roundTrips.map((rt, i) => {
              const isWin = rt.net_pnl > 0;
              return (
                <tr key={i} className="hover:bg-[#160a2c]/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                    {isWin ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
                    )}
                    <span>{rt.symbol}</span>
                  </td>
                  <td className="py-3 px-3 text-purple-300/70 text-[11px]">
                    <div>{rt.buy_time.split(" ")[1] || rt.buy_time}</div>
                    <div className="text-purple-400/50">→ {rt.sell_time.split(" ")[1] || rt.sell_time}</div>
                  </td>
                  <td className="py-3 px-3 text-purple-200">{rt.shares}</td>
                  <td className="py-3 px-3 text-purple-200">
                    <div>₹{rt.buy_price.toFixed(2)}</div>
                    <div className="text-purple-300/70">₹{rt.sell_price.toFixed(2)}</div>
                  </td>
                  <td className="py-3 px-3 text-right text-purple-200">
                    {rt.gross_pnl >= 0 ? "+" : ""}₹{rt.gross_pnl.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right text-amber-300/80">
                    -₹{rt.fees.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-3 text-right font-bold ${
                      isWin ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {rt.net_pnl >= 0 ? "+" : ""}₹{rt.net_pnl.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-bold ${
                        isWin ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {isWin ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {rt.return_pct >= 0 ? `+${rt.return_pct.toFixed(2)}%` : `${rt.return_pct.toFixed(2)}%`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
