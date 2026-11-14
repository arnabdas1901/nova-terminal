"use client";

import React, { useState } from "react";
import { Activity } from "lucide-react";

interface Point {
  time: string;
  equity: number;
  cash: number;
  return_pct: number;
  benchmark_nifty: number;
}

interface EquityChartProps {
  data: Point[];
  peakEquity: number;
}

export default function EquityChart({ data, peakEquity }: EquityChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-purple-900/40 rounded-xl bg-[#0e071c]/60 text-purple-400/50 font-mono text-sm">
        No equity curve telemetry available.
      </div>
    );
  }

  // Calculate SVG scales
  const equities = data.map((d) => d.equity);
  const minEquity = Math.min(...equities) * 0.998;
  const maxEquity = Math.max(...equities, peakEquity) * 1.002;
  const range = maxEquity - minEquity || 1;

  const width = 800;
  const height = 260;
  const paddingX = 40;
  const paddingY = 25;

  const getX = (idx: number) => paddingX + (idx / (data.length - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - ((val - minEquity) / range) * (height - 2 * paddingY);

  // SVG Path generator
  const linePoints = data.map((d, i) => `${getX(i)},${getY(d.equity)}`).join(" ");
  const areaPoints = `${getX(0)},${height - paddingY} ${linePoints} ${getX(data.length - 1)},${height - paddingY}`;

  // Peak reference line Y
  const peakY = getY(peakEquity);

  const activePoint = hoveredIdx !== null ? data[hoveredIdx] : data[data.length - 1];

  return (
    <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-purple-950/70 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Activity className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              High-Frequency Portfolio Equity Telemetry
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
              {data.length} Real-Time Ticks
            </span>
          </div>
          <p className="text-xs text-purple-300/60 mt-1">
            Institutional portfolio value tracking net of statutory friction and slippage
          </p>
        </div>

        {/* View Mode Toggle & Active Value */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold font-mono text-white">
              ₹{activePoint.equity.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] font-mono text-purple-300/70">
              {activePoint.time.split(" ")[1] || activePoint.time} | Return:{" "}
              <span className={activePoint.return_pct >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {activePoint.return_pct >= 0 ? `+${activePoint.return_pct}%` : `${activePoint.return_pct}%`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative mt-4 w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 sm:h-64 overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            {/* Purple Equity Area Gradient */}
            <linearGradient id="purpleEquityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.30" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#3b0764" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing Purple Stroke Filter */}
            <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const val = minEquity + range * pct;
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#241442"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#8b5cf6"
                  opacity="0.75"
                  fontFamily="monospace"
                >
                  ₹{Math.round(val).toLocaleString("en-IN")}
                </text>
              </g>
            );
          })}

          {/* Peak Equity Guide Line */}
          {peakEquity >= minEquity && peakEquity <= maxEquity && (
            <g>
              <line
                x1={paddingX}
                y1={peakY}
                x2={width - paddingX}
                y2={peakY}
                stroke="#c084fc"
                strokeDasharray="2 2"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x={width - paddingX}
                y={peakY - 5}
                textAnchor="end"
                fontSize="9"
                fill="#d8b4fe"
                fontFamily="monospace"
              >
                Peak: ₹{peakEquity.toLocaleString("en-IN")}
              </text>
            </g>
          )}

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#purpleEquityFill)" />

          {/* Line Stroke in Neon Purple */}
          <polyline
            fill="none"
            stroke="#c084fc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={linePoints}
            filter="url(#purpleGlow)"
          />

          {/* Hover Crosshair & Circles */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.equity);
            const isHovered = hoveredIdx === i;

            return (
              <g key={i}>
                {/* Invisible hover hotspot */}
                <rect
                  x={x - (width / data.length) / 2}
                  y={0}
                  width={width / data.length}
                  height={height}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredIdx(i)}
                />

                {/* Visible cursor point */}
                {isHovered && (
                  <g>
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={height - paddingY}
                      stroke="#8b5cf6"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <circle cx={x} cy={y} r="5" fill="#c084fc" stroke="#05020a" strokeWidth="2" />
                    <circle cx={x} cy={y} r="9" fill="none" stroke="#e879f9" strokeWidth="1.5" opacity="0.8" />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip if Hovered */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 pointer-events-none transform -translate-x-1/2 z-20 rounded-lg bg-[#120826]/95 border border-purple-500/50 px-3 py-2 text-xs font-mono shadow-2xl backdrop-blur-md"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
            }}
          >
            <div className="text-[10px] text-purple-300/70">{data[hoveredIdx].time}</div>
            <div className="font-bold text-white mt-0.5">
              ₹{data[hoveredIdx].equity.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-purple-300/70 mt-1">
              <span>Cash: ₹{data[hoveredIdx].cash.toLocaleString("en-IN")}</span>
              <span className={data[hoveredIdx].return_pct >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {data[hoveredIdx].return_pct >= 0 ? `+${data[hoveredIdx].return_pct}%` : `${data[hoveredIdx].return_pct}%`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-purple-300/70 font-mono pt-3 border-t border-purple-950/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-purple-200">
            <span className="h-2 w-2 rounded-full bg-purple-400"></span> NOVA Portfolio Equity
          </span>
          <span className="flex items-center gap-1.5 text-purple-400/50">
            <span className="h-2 w-2 rounded-full bg-purple-900"></span> NIFTY 50 Synthetic Drift
          </span>
        </div>
        <div className="text-purple-300/60">
          Range: ₹{Math.round(minEquity).toLocaleString("en-IN")} — ₹{Math.round(maxEquity).toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  );
}
