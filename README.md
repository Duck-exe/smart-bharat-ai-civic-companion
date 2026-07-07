# Smart Bharat – AI Civic Companion 🇮🇳

**Smart Bharat – AI Civic Companion** is a production-ready, highly secure, and accessible Next.js web application built using the App Router. It serves as an intelligent AI-powered portal designed to simplify civic interactions, answer citizen welfare scheme queries, generate document requirement checklists, and facilitate public issue reporting and tracking.

This project was built for the **PromptWars** challenge and is optimized for one-click deployment on **Vercel** with full test suites and robust security headers.

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
* **Framework**: Next.js 16 (App Router)
* **Library**: React 19
* **Styling**: Tailwind CSS v4
* **API Engine**: Google Gemini API via native edge fetch (minimizing bundle overhead)
* **Testing**: Vitest & React Testing Library with jsdom
* **Fonts**: `Outfit` and `Inter` (via `next/font`)
* **State & Storage**: Client-side state & `localStorage` API

---

## ⚙️ Architecture & AI Integration Workflow

### AI Workflow
1. **Request Reception**: The user submits their prompt in English, Hindi, or Telugu in the chat interface.
2. **Validation & Sanitization**: The request is routed to the POST endpoint `/api/chat`. The payload is validated (length ≤ 1000 characters, message history ≤ 20 messages, valid role attributes). The content is sanitized of `<` and `>` tags to prevent script injection.
3. **Execution**: If `GEMINI_API_KEY` is present, native `fetch` requests the `gemini-1.5-flash` model directly. System instructions are injected specifying scope (Indian civic services only), formatting style (Markdown headings, lists), and language codes.
4. **Fallback**: If the API key is not configured or the fetch fails, an offline matcher searches keywords and returns optimized offline answers, preventing crashes.
5. **Output**: The sanitized response markdown is returned to the client and dynamically formatted into HTML in the dashboard.

---

## 🛡️ Security Policies
* **Security Headers**: Standard headers configured in `next.config.ts` including:
  * `X-Frame-Options: DENY` to prevent clickjacking.
  * `X-Content-Type-Options: nosniff` to block MIME sniffing.
  * `Referrer-Policy: strict-origin-when-cross-origin`.
  * `Strict-Transport-Security` to force HTTPS.
  * `Content-Security-Policy` to lock script sources and endpoint connections.
* **API Protection**: Catch blocks in the chat route intercept stack traces and raw error objects, returning generic warnings to prevent API key leaks.

---

## ♿ Accessibility (a11y) Features
* **Semantic HTML**: Page content is enclosed in structural `<header>`, `<main>`, `<nav>`, and `<footer>` containers.
* **Label Association**: Every text input, selector dropdown, and textarea is associated with an explicit `<label>` tag using matching `id` and `htmlFor` properties.
* **Keyboard Navigation**: Interactive dashboard cards have been converted from raw `div` tags to accessible, keyboard-focusable HTML `<button>` elements.
* **Aria Attributes**: All icon-only buttons include descriptive `aria-label` tags, and decorative SVGs are annotated with `aria-hidden="true"` to prevent screen reader noise.

---

## 🧪 Testing Setup
The application is backed by a full test suite built on **Vitest** and **React Testing Library** under a `jsdom` simulated browser environment.

### Run Tests
```bash
npm run test
```
The test suite validates:
1. **Dashboard Render**: Verifies welcome screens are properly generated.
2. **Language Switch**: Toggles language to Hindi and checks translation replacements.
3. **Service Finder search & modal**: Searches services and verifies details overlay.
4. **Complaint submission & storage**: Submits complaints and checks `localStorage` persistence.
5. **AI Assistant conversation**: Simulates submitting inputs and mocking network responses.

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
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

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
1. Link your repository to Vercel.
2. Configure `GEMINI_API_KEY` as an Environment Variable.
3. Click **Deploy**.

---

## ⚠️ Limitations & Scope
* **Civic Context Boundary**: The AI Companion is strictly configured to refuse answers outside of Indian public utilities, documents, and schemes.
* **State Persistence**: Civic complaints are stored in `localStorage`, meaning they are local to the client's current browser.

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.
