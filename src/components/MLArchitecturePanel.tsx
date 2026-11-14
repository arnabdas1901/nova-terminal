import React from "react";
import { Cpu, Network, LineChart, Database, Zap } from "lucide-react";

interface MLProps {
  pipeline: {
    models: Array<{
      name: string;
      type: string;
      purpose?: string;
      stage_1?: string;
      stage_2?: string;
      advantage?: string;
      metrics?: string[];
      execution_impact?: string;
      features_count?: number;
      top_features?: string[];
    }>;
  };
}

export default function MLArchitecturePanel({ pipeline }: MLProps) {
  return (
    <div className="space-y-6">
      {/* Overview Intro */}
      <div className="rounded-xl border border-purple-900/40 bg-[#0e071c]/80 p-5 backdrop-blur-md shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-950/70">
          <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Two-Stage Quantitative Machine Learning & Microstructure Architecture
            </h3>
            <p className="text-xs text-purple-300/60 mt-0.5">
              Ensemble framework integrating statistical arbitrage, transformer foundation models, and L2 order book physics
            </p>
          </div>
        </div>

        {/* 4 Models Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {pipeline.models.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#080314]/90 border border-purple-950/80 hover:border-purple-600/50 transition-all font-mono text-xs space-y-3 shadow-md shadow-purple-950/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Engine 0{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{m.name}</h4>
                  <span className="text-[11px] text-purple-300/60">{m.type}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#14082c] border border-purple-900/50 text-purple-300">
                  {idx === 0 ? (
                    <Network className="h-4 w-4 text-purple-400" />
                  ) : idx === 1 ? (
                    <Zap className="h-4 w-4 text-fuchsia-400" />
                  ) : idx === 2 ? (
                    <Database className="h-4 w-4 text-violet-400" />
                  ) : (
                    <LineChart className="h-4 w-4 text-purple-300" />
                  )}
                </div>
              </div>

              {/* Stage breakdown or purpose */}
              {m.stage_1 && (
                <div className="bg-[#120726]/80 p-2.5 rounded border border-purple-950 space-y-1.5">
                  <div>
                    <span className="text-[10px] text-purple-400 font-bold">STAGE 1 (EV REGRESSOR): </span>
                    <span className="text-purple-200">{m.stage_1}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-fuchsia-400 font-bold">STAGE 2 (CALIBRATED META): </span>
                    <span className="text-purple-200">{m.stage_2}</span>
                  </div>
                </div>
              )}

              {m.purpose && (
                <div className="bg-[#120726]/80 p-2.5 rounded border border-purple-950">
                  <span className="text-[10px] text-purple-400 font-bold block mb-1">FOUNDATION CAPABILITY</span>
                  <p className="text-purple-200 leading-relaxed text-[11px]">{m.purpose}</p>
                </div>
              )}

              {/* Edge or metrics */}
              {m.advantage && (
                <div className="text-[11px] text-purple-300/80 bg-purple-950/30 p-2 rounded border border-purple-900/40">
                  <span className="text-fuchsia-300 font-bold">Asymmetric Edge: </span>
                  {m.advantage}
                </div>
              )}

              {m.metrics && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.metrics.map((met, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#180a32] border border-purple-800/40 text-[10px] text-purple-200"
                    >
                      {met}
                    </span>
                  ))}
                </div>
              )}

              {m.top_features && (
                <div className="pt-1">
                  <span className="text-[10px] text-purple-300/60 block mb-1">Top Predictive Alpha Features:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.top_features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-purple-950/50 border border-purple-800/40 text-[10px] text-purple-300 font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
