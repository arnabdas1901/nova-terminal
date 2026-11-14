# Project NOVA — Institutional Algorithmic Trading & Aladdin Risk Terminal

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/System-Operational-emerald?style=flat-square)]()

An institutional-grade, read-only viewing terminal for **Project NOVA** — an autonomous quantitative trading engine operating on the National Stock Exchange of India (NSE). Designed with a **BlackRock Aladdin multi-layered risk architecture**, this terminal showcases live telemetry, trade executions, probabilistic forecasting pipelines, and transaction friction analytics for university admissions committees, computational finance departments, and quantitative hedge fund recruiters.

---

## 🏛️ Executive Quantitative Summary

- **Architecture Model**: Hybrid Multi-Strategy Alpha Engine (Two-Stage Supervised XGBoost + Amazon Chronos-Bolt Probabilistic Foundation Model + Level-2 Order Book Microstructure).
- **Risk Governance**: BlackRock Aladdin Enterprise Framework (4 Defense Layers, 99% CVaR, Dynamic Chandelier Volatility Stops, Intraday Profit Ratchet).
- **Friction-Aware Low-Frequency Execution**: Mathematically engineered to combat high-frequency retail edge erosion from Indian statutory taxes (STT, GST, SEBI turnover, stamp duty, exchange fees).
- **Public Terminal Security**: Read-only public viewing gallery with zero attack surface — strictly decoupled from live broker API execution keys.

---

## 🔬 Core System Architecture

```mermaid
flowchart TD
    subgraph Data ["1. High-Throughput Market Ingestion"]
        NSE[NSE Tick & Bar Stream] --> L2[Level-2 Order Book Depth]
        NSE --> BARS[Multi-Timeframe OHLCV]
        BARS --> YZ[Yang-Zhang Jump-Diffusion Volatility]
    end

    subgraph Alpha ["2. Machine Learning Alpha Engine"]
        L2 & BARS --> FE[29 Microstructure & Technical Features]
        FE --> XGB[Stage 1: XGBoost EV Drift Regressor]
        FE --> CLF[Stage 2: Calibrated Meta-Probability Classifier]
        BARS --> CHRONOS[Amazon Chronos-Bolt Probabilistic Cones (Q10/Q50/Q90)]
        XGB & CLF & CHRONOS --> SIGNAL{Alpha Gatekeeper >= 75% Score}
    end

    subgraph Risk ["3. BlackRock Aladdin Risk Engine"]
        SIGNAL --> CVAR[Layer 1: 99% Expected Shortfall / CVaR Gate]
        CVAR --> BETA[Layer 2: Net Portfolio Beta Limiter (±0.10)]
        BETA --> SEBI[Layer 3: SEBI Peak Margin Enforcement (max 90%)]
        SEBI --> ALLOC[Fractional Kelly Sizing (0.35x)]
    end

    subgraph Execution ["4. Smart Order Routing (SOR)"]
        ALLOC --> SOR[Pegged Limit Order / Microstructure Aggressor]
        SOR --> BROKER[Broker Gateway / Paper Execution]
    end

    subgraph Defense ["5. Real-Time Dynamic In-Flight Guards"]
        BROKER --> TIER[Tier 0.5 Green Lock: Half-off at +0.80%, SL to BE+Fees]
        BROKER --> QUAR[45-Min Post-Stop Out Quarantine (Anti-Revenge)]
        BROKER --> RATCHET[Intraday Profit Ratchet: Locks 50% of Day Alpha]
        BROKER --> CUTOFF[13:45 IST Hard Entry Cutoff Gate]
    end
```

---

## 📊 Key Highlights & Metrics

| Metric | Target Specification | Realized Live Telemetry |
| :--- | :--- | :--- |
| **Execution Frequency** | Low-Frequency Swing / Sniper Intraday | 1–3 trades/day (Eliminating churning) |
| **Target Net Alpha** | +3.5% to +5.0% Net Monthly | Compounding trajectory: +51% to +79% p.a. |
| **Profit Factor** | > 1.30x Net of Friction | **1.42x** |
| **Win / Loss Payoff** | > 1.50x | **1.72x** |
| **Max Portfolio Drawdown** | < 3.0% Soft Halt Floor | **-1.77%** (Strictly within risk bounds) |
| **Statutory Friction Saved** | Avoided high-frequency churn | **~₹3,800/mo** retained |

---

## ⚡ Quick Start & Local Preview

### Prerequisites
- Node.js 18+ or 20+ (Node 24 supported via `@next/swc-wasm-nodejs`)
- npm, yarn, or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/nova-viewing-terminal.git
cd nova-viewing-terminal
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run start
```

---

## 🚀 1-Click Deployment to Vercel

### Method A: Deploy via GitHub (Recommended)
1. Push this directory to your personal GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: Project NOVA Institutional Aladdin Terminal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nova-terminal.git
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"**.
4. Select your `nova-terminal` repository.
5. Keep default settings (`Framework Preset: Next.js`) and click **"Deploy"**.
6. In **~45 seconds**, your live showcase URL will be generated (e.g., `https://nova-terminal.vercel.app`).

### Method B: Deploy via Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to link and deploy in 1 minute.

---

## 🔄 Synchronizing Live Data from the Trading Bot

Whenever the NOVA Python bot completes new trading sessions, simply run:

```bash
python sync_web_dashboard.py
```

This parses `portfolio.json`, `equity.csv`, and `trade_log.csv`, enriches trade legs with statutory fees (STT, GST, Stamp Duty, Exchange charges), and updates `src/data/novaData.json`. Push to GitHub, and Vercel automatically redeploys your updated telemetry within seconds.

---

## 🎓 Academic & Recruiting Statement

Designed and engineered by **Arnab Das** as a demonstration of production computational finance, mathematical risk management, and systems programming. 

All algorithms, risk models, and UI components are documented for review by admissions committees for Master's programs in **Computational Finance, Financial Engineering, and Computer Science**, as well as quantitative trading desks.
