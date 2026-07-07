# Smart Bharat – AI Civic Companion 🇮🇳

**Smart Bharat – AI Civic Companion** is a production-ready Next.js web application built using the App Router. It serves as an intelligent AI-powered portal designed to simplify civic interactions, answer citizen welfare scheme queries, generate document requirement checklists, and facilitate public issue reporting and tracking.

This project was built for the **PromptWars** challenge and is fully optimized for one-click deployment on **Vercel**.

---

## 🌟 Core Features

### 1. 🤖 AI Civic Assistant
* Citizens can ask contextual questions about Indian government schemes (like Ayushman Bharat, PM-Kisan), public services (caste/income certificates, passport renewal), taxes (GST, Income Tax), and civic procedures.
* **Powered by Gemini API** using the `GEMINI_API_KEY` environment variable.
* **Smart Demo Mode**: If no API key is configured, the assistant automatically falls back to an offline-first intelligent keyword matching engine, ensuring the application remains fully testable and functional.

### 2. 🔍 Government Service Finder
* An interactive directory indexing major identity, travel, financial, utility, certificate, and welfare services.
* Displays crucial metadata: category, eligibility criteria, fees/costs, processing time, and step-by-step application guidelines.

### 3. 📋 Document Requirement Assistant
* Select any public service (Aadhaar update, driving license, passport application) to generate an interactive document checklist.
* Provides detailed, localized explanations of **why** each document is legally or administratively required.

### 4. 🚨 Public Issue Reporting
* An interactive form allowing citizens to report localized civic issues (e.g., potholes, garbage piles, water leakage, broken street lights).
* Automatically generates a unique, tracking-friendly **Complaint ID** (e.g., `SB-123456`).
* Persists issues locally in the browser's `localStorage`.

### 5. 🔍 Complaint Tracker
* Retrieve reported complaints instantly using the generated tracking ID.
* Displays a visual progress timeline representing the status of the complaint (Submitted, Under Review, Team Dispatched, Resolved).
* **Simulation controls**: Includes a demo utility to advance the complaint status stages in real-time, allowing quick verification of the status tracker system.

### 6. 🌐 Multilingual Support
* Fully localized in **English**, **Hindi (हिन्दी)**, and **Telugu (తెలుగు)**.
* Allows citizens to switch languages on-the-fly, instantly translating the navigation, headings, service databases, forms, and timeline trackers.

---

## 🛠️ Technology Stack
* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **API Engine**: Google Gemini API via native edge fetch (minimizing bundle overhead)
* **Fonts**: `Outfit` and `Inter` (via `next/font`)
* **State & Storage**: Client-side state & `localStorage` API

---

## 📦 Getting Started & Running Locally

### 1. Prerequisites
* **Node.js** (v20+ recommended)
* **npm** (v10+)

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If left blank, the app will automatically run in demo mode with pre-baked responses).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Build & Production Deployment

To build the application:
```bash
npm run build
```

### Deploy to Vercel
This application is ready to be deployed to Vercel without any configurations.
1. Push this repository to GitHub/GitLab/Bitbucket.
2. Link the repository to your Vercel Account.
3. In the environment variables section, set:
   * `GEMINI_API_KEY` = `[Your Google Gemini Developer API Key]`
4. Click **Deploy**.

---

## 📂 Project Structure
```
smart-bharat-ai-civic-companion/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # Gemini API route & demo fallback logic
│   │   ├── globals.css           # Custom CSS & Tailwind v4 theme styling
│   │   ├── layout.tsx            # Global HTML wrapper (Google Fonts configuration)
│   │   └── page.tsx              # Main dashboard wrapper & core tab components
│   └── lib/
│       ├── servicesData.ts       # Structured multi-lingual database of Indian public services
│       └── translations.ts       # English, Hindi, and Telugu localization dictionaries
├── public/                       # Static public assets
├── LICENSE                       # MIT License
└── package.json                  # Next.js & React dependencies
```

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.
