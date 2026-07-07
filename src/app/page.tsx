"use client";

import React, { useState, useEffect, useRef } from "react";
import { translations, Language } from "@/lib/translations";
import { servicesData, ServiceDetail } from "@/lib/servicesData";

interface ComplaintHistory {
  status: "submitted" | "under_review" | "dispatched" | "resolved";
  date: string;
}

interface Complaint {
  id: string;
  type: string;
  location: string;
  description: string;
  date: string;
  status: "submitted" | "under_review" | "dispatched" | "resolved";
  history: ComplaintHistory[];
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isDemo?: boolean;
}

export default function DashboardPage() {
  const [lang, setLang] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "aiAssistant" | "serviceFinder" | "reportIssue" | "trackComplaint" | "documentAssistant"
  >("dashboard");

  // Localization shortcut
  const t = translations[lang];

  // ----------------------------------------------------
  // Statistics & Mock Counts
  // ----------------------------------------------------
  const [stats, setStats] = useState({
    complaintsCount: 0,
    servicesCount: 6,
    queriesCount: 142,
  });

  // Load complaints to count
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sb_complaints");
      if (stored) {
        try {
          const list = JSON.parse(stored);
          setStats((prev) => ({ ...prev, complaintsCount: list.length }));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [activeTab]);

  // ----------------------------------------------------
  // AI Civic Assistant State
  // ----------------------------------------------------
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Set initial welcome message based on language
  useEffect(() => {
    setChatMessages([
      {
        role: "assistant",
        content: translations[lang].aiAssistant.welcomeChat,
      },
    ]);
  }, [lang]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    if (!textToSend) {
      setChatInput("");
    }

    const updatedMessages = [
      ...chatMessages,
      { role: "user", content: query } as ChatMessage,
    ];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);
    setStats((prev) => ({ ...prev, queriesCount: prev.queriesCount + 1 }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          lang: lang,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          isDemo: data.demoMode,
        },
      ]);
    } catch (error) {
      console.error(error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am facing connectivity issues. Please try again later.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        role: "assistant",
        content: t.aiAssistant.welcomeChat,
      },
    ]);
  };

  // Helper function to format chat message text containing Markdown
  const formatMarkdown = (text: string) => {
    if (!text) return "";
    
    // Convert Headers: ### Title -> <h4 class="font-bold text-orange-400 mt-2 mb-1">Title</h4>
    let html = text.replace(/### (.*?)\n/g, '<h4 class="font-bold text-orange-400 mt-3 mb-1 text-base">$1</h4>');
    
    // Convert Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
    
    // Convert Bullet Points: * text -> <li class="ml-4 list-disc text-slate-300">text</li>
    html = html.replace(/\* (.*?)\n/g, '<li class="ml-5 list-disc text-slate-300 mb-1">$1</li>');
    
    // Convert Numbered lists: 1. text -> <li class="ml-4 list-decimal text-slate-300">text</li>
    html = html.replace(/\d+\. (.*?)\n/g, '<li class="ml-5 list-decimal text-slate-300 mb-1">$1</li>');
    
    // Convert links: [Text](url) -> <a href="url" target="_blank" class="text-orange-400 underline hover:text-orange-300">Text</a>
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-orange-400 underline hover:text-orange-300">$1</a>');
    
    // Convert newline to <br />
    html = html.replace(/\n/g, "<br />");
    
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // ----------------------------------------------------
  // Government Service Finder State
  // ----------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewingService, setViewingService] = useState<ServiceDetail | null>(null);

  const filterServices = () => {
    const list = Object.values(servicesData[lang]);
    return list.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  // ----------------------------------------------------
  // Document Assistant State
  // ----------------------------------------------------
  const [selectedDocServiceId, setSelectedDocServiceId] = useState("");
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({});

  const toggleDocExplanation = (docName: string) => {
    setExpandedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  // ----------------------------------------------------
  // Public Issue Reporting State
  // ----------------------------------------------------
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reportedId, setReportedId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !location || !description) return;

    const randomId = "SB-" + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString(lang === "en" ? "en-IN" : lang === "hi" ? "hi-IN" : "te-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newComplaint: Complaint = {
      id: randomId,
      type: issueType,
      location: location,
      description: description,
      date: currentDate,
      status: "submitted",
      history: [{ status: "submitted", date: currentDate }],
    };

    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("sb_complaints");
      const list = existing ? JSON.parse(existing) : [];
      list.push(newComplaint);
      localStorage.setItem("sb_complaints", JSON.stringify(list));
    }

    setReportedId(randomId);
    setStats((prev) => ({ ...prev, complaintsCount: prev.complaintsCount + 1 }));

    // Reset Form
    setIssueType("");
    setLocation("");
    setDescription("");
  };

  const copyToClipboard = () => {
    if (reportedId) {
      navigator.clipboard.writeText(reportedId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // ----------------------------------------------------
  // Complaint Tracker State
  // ----------------------------------------------------
  const [trackId, setTrackId] = useState("");
  const [trackedComplaint, setTrackedComplaint] = useState<Complaint | null>(null);
  const [trackError, setTrackError] = useState(false);

  const handleTrackComplaint = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackId.trim()) return;

    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("sb_complaints");
      if (existing) {
        try {
          const list: Complaint[] = JSON.parse(existing);
          const found = list.find((c) => c.id.trim().toUpperCase() === trackId.trim().toUpperCase());
          if (found) {
            setTrackedComplaint(found);
            setTrackError(false);
          } else {
            setTrackedComplaint(null);
            setTrackError(true);
          }
        } catch (err) {
          console.error(err);
          setTrackError(true);
        }
      } else {
        setTrackError(true);
      }
    }
  };

  // Support Simulated Next Steps for testing/interactive demo
  const simulateStatusProgress = () => {
    if (!trackedComplaint) return;

    const statuses: Complaint["status"][] = ["submitted", "under_review", "dispatched", "resolved"];
    const currentIndex = statuses.indexOf(trackedComplaint.status);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      const currentDate = new Date().toLocaleDateString(lang === "en" ? "en-IN" : lang === "hi" ? "hi-IN" : "te-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const updatedComplaint: Complaint = {
        ...trackedComplaint,
        status: nextStatus,
        history: [...trackedComplaint.history, { status: nextStatus, date: currentDate }],
      };

      // Save to local storage
      if (typeof window !== "undefined") {
        const existing = localStorage.getItem("sb_complaints");
        if (existing) {
          const list: Complaint[] = JSON.parse(existing);
          const index = list.findIndex((c) => c.id === trackedComplaint.id);
          if (index !== -1) {
            list[index] = updatedComplaint;
            localStorage.setItem("sb_complaints", JSON.stringify(list));
          }
        }
      }
      setTrackedComplaint(updatedComplaint);
    }
  };

  // ----------------------------------------------------
  // Quick navigation shortcuts from Dashboard
  // ----------------------------------------------------
  const openTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setReportedId(null);
    setTrackedComplaint(null);
    setTrackError(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-slate-950">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-emerald-600/10 blur-[130px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-xl"
            onClick={() => openTab("dashboard")}
            aria-label="Smart Bharat Home Dashboard"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-tr from-orange-500 via-white to-emerald-600 p-[2px] flex items-center justify-center shadow-md shadow-orange-500/10 group-hover:scale-105 transition-transform">
              <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                {/* Ashoka Chakra Styled Circle */}
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400 animate-spin"
                  style={{ animationDuration: "120s" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" strokeDasharray="3 2" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-orange-400 via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-wider uppercase">
                {t.subtitle}
              </p>
            </div>
          </button>

          {/* Quick Nav Links & Language selector */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Home Button if not on Home */}
            {activeTab !== "dashboard" && (
              <button
                onClick={() => openTab("dashboard")}
                className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:text-white transition-colors text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Back to dashboard"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {t.common.home}
              </button>
            )}

            {/* Language Switcher Dropdown */}
            <div className="flex items-center bg-slate-900/80 rounded-xl p-1 border border-slate-800">
              <button
                onClick={() => setLang("en")}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === "en"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === "hi"
                    ? "bg-slate-100 text-slate-950 font-semibold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                aria-label="Switch language to Hindi"
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang("te")}
                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                  lang === "te"
                    ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                aria-label="Switch language to Telugu"
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 z-10 flex flex-col">
        {/* ========================================================================= */}
        {/* VIEW: DASHBOARD (HOME) */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="flex-1 flex flex-col gap-8 sm:gap-12 justify-center">
            {/* HERO SECTION */}
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6 animate-float">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-semibold tracking-wider mx-auto">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                Digital India Public Utilities
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t.dashboard.welcome}
              </h2>
              <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.dashboard.desc}
              </p>
            </div>

            {/* QUICK STATS BAR */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto w-full">
              <div className="glass-card rounded-2xl p-3 sm:p-5 text-center flex flex-col justify-center border-l-2 border-l-orange-500">
                <div className="text-2xl sm:text-4xl font-extrabold text-orange-400">
                  {stats.servicesCount}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  {t.dashboard.servicesIndexed}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-3 sm:p-5 text-center flex flex-col justify-center border-l-2 border-l-white">
                <div className="text-2xl sm:text-4xl font-extrabold text-slate-100">
                  {stats.complaintsCount}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  {t.dashboard.activeReports}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-3 sm:p-5 text-center flex flex-col justify-center border-l-2 border-l-emerald-500">
                <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400">
                  {stats.queriesCount}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  {t.dashboard.assistantQueries}
                </div>
              </div>
            </div>

            {/* DASHBOARD MODULE CARDS */}
            <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto w-full mt-4" aria-label="Civic Companion Features">
              {/* CARD 1: AI ASSISTANT */}
              <button
                onClick={() => openTab("aiAssistant")}
                className="glass-card rounded-3xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between group glow-indigo relative overflow-hidden text-left w-full h-full border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="AI Civic Assistant. Ask schemes, services, PAN/Aadhaar updates, passports, or pensions."
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {t.nav.aiAssistant}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Ask schemes, services, PAN/Aadhaar updates, passports, or pensions from our AI Civic Assistant.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                  <span>{t.dashboard.viewAll}</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* CARD 2: SERVICE FINDER */}
              <button
                onClick={() => openTab("serviceFinder")}
                className="glass-card rounded-3xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between group glow-saffron relative overflow-hidden text-left w-full h-full border-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Service Finder. Search key details of standard services, eligibility conditions, processing timelines, and steps."
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                      {t.nav.serviceFinder}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Search key details of standard services, eligibility conditions, processing timelines, and steps.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                  <span>{t.dashboard.viewAll}</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* CARD 3: DOCUMENT ASSISTANT */}
              <button
                onClick={() => openTab("documentAssistant")}
                className="glass-card rounded-3xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between group glow-emerald relative overflow-hidden text-left w-full h-full border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Document Checklist. Generate a document checklist for various citizen needs and discover exactly why they are required."
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {t.nav.documentAssistant}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Generate a document checklist for various citizen needs and discover exactly why they are required.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                  <span>{t.dashboard.viewAll}</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* CARD 4: REPORT ISSUE */}
              <button
                onClick={() => openTab("reportIssue")}
                className="glass-card rounded-3xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between group glow-indigo relative overflow-hidden text-left w-full h-full border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Report Public Issue. Report local civic issues to civic wards."
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {t.nav.reportIssue}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Report local civic issues (potholes, garbage, water leakage, broken street lights) to civic wards.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                  <span>{t.dashboard.viewAll}</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* CARD 5: COMPLAINT TRACKER */}
              <button
                onClick={() => openTab("trackComplaint")}
                className="glass-card rounded-3xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between group glow-saffron relative overflow-hidden text-left w-full h-full border-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Track Complaint. Track the active status and history timeline of reported issues."
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                      {t.nav.trackComplaint}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Track the active status and history timeline of reported issues using your unique tracking Complaint ID.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                  <span>{t.dashboard.viewAll}</span>
                  <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </nav>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: AI CIVIC ASSISTANT */}
        {/* ========================================================================= */}
        {activeTab === "aiAssistant" && (
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full glass-panel border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Header banner */}
            <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openTab("dashboard")}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">{t.nav.aiAssistant}</h2>
                  <p className="text-xs text-slate-400">Powered by Gemini 1.5 Flash</p>
                </div>
              </div>
              <button
                onClick={handleClearChat}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-800 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
              >
                {t.aiAssistant.clear}
              </button>
            </div>

            {/* Messages box */}
            <div className="flex-1 min-h-[400px] max-h-[500px] overflow-y-auto p-6 space-y-6 flex flex-col bg-slate-950/40">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow shadow-indigo-500/20"
                        : "bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.role === "assistant" ? formatMarkdown(msg.content) : msg.content}
                  </div>
                  {msg.isDemo && (
                    <span className="text-[10px] text-orange-400/80 font-medium tracking-wide mt-1.5 block">
                      ⚠️ Demo Response
                    </span>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="self-start flex items-center gap-2 bg-slate-900/40 border border-slate-900/80 px-4 py-3 rounded-2xl rounded-tl-none">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Smart Bharat AI is processing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-6 py-3 border-t border-slate-900/80 bg-slate-950/20">
              <p className="text-xs text-slate-400 font-semibold mb-2">{t.aiAssistant.suggestedLabel}</p>
              <div className="flex flex-wrap gap-2">
                {t.aiAssistant.suggestions.map((s, i) => (
                  <button
                    key={i}
                    disabled={isChatLoading}
                    onClick={() => handleSendMessage(s)}
                    className="text-xs border border-slate-800 bg-slate-900/40 hover:bg-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-xl text-slate-300 transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center gap-3"
            >
              <label htmlFor="ai-chat-input" className="sr-only">
                {t.aiAssistant.chatPlaceholder}
              </label>
              <input
                id="ai-chat-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.aiAssistant.chatPlaceholder}
                className="flex-1 text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-slate-100 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={isChatLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-indigo-500/10 transition-colors disabled:opacity-50"
              >
                {t.aiAssistant.send}
              </button>
            </form>
            <div className="text-[10px] text-center text-slate-500 py-2 bg-slate-950 border-t border-slate-900">
              {t.aiAssistant.disclaimer}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: GOVERNMENT SERVICE FINDER */}
        {/* ========================================================================= */}
        {activeTab === "serviceFinder" && (
          <div className="flex-1 flex flex-col gap-6">
            {/* Nav & Search Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openTab("dashboard")}
                  className="p-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-900"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white">{t.nav.serviceFinder}</h2>
                  <p className="text-xs text-slate-400">Discover eligibility, costs, steps, and forms</p>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative max-w-md w-full">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <label htmlFor="service-search-input" className="sr-only">
                  {t.serviceFinder.searchPlaceholder}
                </label>
                <input
                  id="service-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.serviceFinder.searchPlaceholder}
                  className="w-full bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-orange-500 transition-colors text-slate-100 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 py-2 border-y border-slate-900">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === "all"
                    ? "bg-slate-100 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {t.serviceFinder.allCategories}
              </button>
              {(Object.keys(t.serviceFinder.categoryLabels) as Array<keyof typeof t.serviceFinder.categoryLabels>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {t.serviceFinder.categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterServices().map((serv) => (
                <div
                  key={serv.id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between border-slate-800 hover:border-orange-500/20"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase bg-orange-500/5 border border-orange-500/10 px-2.5 py-1 rounded-md self-start">
                      {t.serviceFinder.categoryLabels[serv.category]}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100">{serv.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {serv.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-900/80 pt-4 mt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {t.serviceFinder.processingTime}
                      </span>
                      <span className="text-xs font-semibold text-slate-300 mt-0.5">{serv.processingTime}</span>
                    </div>
                    <button
                      onClick={() => setViewingService(serv)}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300 border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 px-3.5 py-2 rounded-xl transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Details Overlay / Modal */}
            {viewingService && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
                  {/* Modal Header */}
                  <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
                    <div>
                      <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase">
                        {t.serviceFinder.categoryLabels[viewingService.category]}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">{viewingService.name}</h3>
                    </div>
                    <button
                      onClick={() => setViewingService(null)}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 space-y-6">
                    {/* Desc */}
                    <div>
                      <p className="text-sm text-slate-300 leading-relaxed">{viewingService.description}</p>
                    </div>

                    {/* Meta info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-800/80 py-4">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          {t.serviceFinder.eligibility}
                        </span>
                        <p className="text-xs text-slate-300 font-semibold mt-1 leading-relaxed">
                          {viewingService.eligibility}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          {t.serviceFinder.processingTime}
                        </span>
                        <p className="text-xs text-slate-300 font-semibold mt-1">
                          {viewingService.processingTime}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          {t.serviceFinder.fees}
                        </span>
                        <p className="text-xs text-slate-300 font-semibold mt-1">
                          {viewingService.fees}
                        </p>
                      </div>
                    </div>

                    {/* Document Checklist */}
                    <div>
                      <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3">
                        {t.serviceFinder.documents}
                      </h4>
                      <ul className="space-y-2.5">
                        {viewingService.documents.map((doc, idx) => (
                          <li key={idx} className="bg-slate-950/60 border border-slate-800/60 p-3 rounded-xl">
                            <span className="text-xs font-bold text-slate-100">{doc.name}</span>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{doc.explanation}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* App Steps */}
                    <div>
                      <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3">
                        {t.serviceFinder.steps}
                      </h4>
                      <ol className="space-y-3">
                        {viewingService.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-300">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-800 text-orange-400 border border-slate-700 font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <p className="mt-0.5">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-slate-800/80 bg-slate-950/30 flex justify-end gap-3 sticky bottom-0 z-10 bg-slate-900">
                    <button
                      onClick={() => {
                        // Quick switch to document helper using this service
                        setSelectedDocServiceId(viewingService.id);
                        openTab("documentAssistant");
                        setViewingService(null);
                      }}
                      className="text-xs font-bold px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition-colors"
                    >
                      Open Checklist
                    </button>
                    <button
                      onClick={() => setViewingService(null)}
                      className="text-xs font-bold px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-xl text-white transition-colors"
                    >
                      {t.common.back}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: DOCUMENT ASSISTANT */}
        {/* ========================================================================= */}
        {activeTab === "documentAssistant" && (
          <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => openTab("dashboard")}
                className="p-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-900"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.documentAssistant.title}</h2>
                <p className="text-xs text-slate-400">{t.documentAssistant.desc}</p>
              </div>
            </div>

            {/* Dropdown selector */}
            <div className="glass-card rounded-2xl p-6 border-slate-800 space-y-4">
              <div>
                <label htmlFor="document-service-select" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t.documentAssistant.selectLabel}
                </label>
                <select
                  id="document-service-select"
                  value={selectedDocServiceId}
                  onChange={(e) => setSelectedDocServiceId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100"
                >
                  <option value="">{t.documentAssistant.placeholder}</option>
                  {Object.values(servicesData[lang]).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Checklist View */}
            {selectedDocServiceId && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800 space-y-6 glow-emerald">
                <div className="border-b border-slate-850 pb-4">
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                    {t.documentAssistant.checklistTitle}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400 mt-1">
                    {servicesData[lang][selectedDocServiceId]?.name}
                  </p>
                </div>

                <div className="space-y-4">
                  {servicesData[lang][selectedDocServiceId]?.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-800/80 rounded-2xl p-4 bg-slate-950/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`doc-check-${idx}`}
                            className="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-slate-900 cursor-pointer"
                          />
                          <label
                            htmlFor={`doc-check-${idx}`}
                            className="text-sm font-semibold text-slate-100 cursor-pointer"
                          >
                            {doc.name}
                          </label>
                        </div>

                        <button
                          onClick={() => toggleDocExplanation(doc.name)}
                          className="text-[10px] font-bold text-slate-400 hover:text-emerald-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          {t.documentAssistant.whyRequired}
                          <svg
                            className={`h-3 w-3 transform transition-transform ${
                              expandedDocs[doc.name] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Expandable Explanation block */}
                      {expandedDocs[doc.name] && (
                        <div className="mt-3 border-t border-slate-850/60 pt-2.5 text-xs text-slate-400 leading-relaxed bg-slate-950/20 p-2.5 rounded-xl border-l-2 border-l-emerald-500">
                          {doc.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: PUBLIC ISSUE REPORTING */}
        {/* ========================================================================= */}
        {activeTab === "reportIssue" && (
          <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => openTab("dashboard")}
                className="p-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-900"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.reportIssue.title}</h2>
                <p className="text-xs text-slate-400">{t.reportIssue.desc}</p>
              </div>
            </div>

            {/* Report Form / Success Display */}
            {!reportedId ? (
              <form onSubmit={handleSubmitIssue} className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800 space-y-5">
                <div>
                  <label htmlFor="issue-type-select" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t.reportIssue.typeLabel}
                  </label>
                  <select
                    id="issue-type-select"
                    required
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
                  >
                    <option value="">{t.reportIssue.selectType}</option>
                    {(Object.keys(t.reportIssue.issueTypes) as Array<keyof typeof t.reportIssue.issueTypes>).map((k) => (
                      <option key={k} value={k}>
                        {t.reportIssue.issueTypes[k]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="issue-location-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t.reportIssue.locationLabel}
                  </label>
                  <input
                    id="issue-location-input"
                    required
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.reportIssue.locationPlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-650"
                  />
                </div>

                <div>
                  <label htmlFor="issue-desc-textarea" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {t.reportIssue.descLabel}
                  </label>
                  <textarea
                    id="issue-desc-textarea"
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.reportIssue.descPlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-650 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/10 transition-colors mt-2"
                >
                  {t.reportIssue.submitBtn}
                </button>
              </form>
            ) : (
              <div className="glass-card rounded-2xl p-6 sm:p-8 border-emerald-500/20 text-center space-y-6 glow-emerald">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{t.reportIssue.successTitle}</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                    {t.reportIssue.successText}
                  </p>
                </div>

                {/* Tracking ID display */}
                <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-5 max-w-sm mx-auto flex flex-col items-center gap-3">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {t.reportIssue.complaintIdLabel}
                  </span>
                  <span className="text-xl font-extrabold text-orange-400 tracking-wider font-mono">
                    {reportedId}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={copyToClipboard}
                      className="text-xs font-bold px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      {isCopied ? t.reportIssue.copiedText : t.reportIssue.copyBtn}
                    </button>
                    <button
                      onClick={() => {
                        setTrackId(reportedId);
                        handleTrackComplaint();
                        openTab("trackComplaint");
                      }}
                      className="text-xs font-bold px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg transition-colors"
                    >
                      Track Now
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setReportedId(null)}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Report Another Issue
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: COMPLAINT TRACKER */}
        {/* ========================================================================= */}
        {activeTab === "trackComplaint" && (
          <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => openTab("dashboard")}
                className="p-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-900"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.trackComplaint.title}</h2>
                <p className="text-xs text-slate-400">{t.trackComplaint.desc}</p>
              </div>
            </div>

            {/* Search complaint */}
            <form onSubmit={handleTrackComplaint} className="glass-card rounded-2xl p-5 border-slate-800 flex gap-3">
              <label htmlFor="complaint-track-input" className="sr-only">
                {t.trackComplaint.title}
              </label>
              <input
                id="complaint-track-input"
                required
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder={t.trackComplaint.inputPlaceholder}
                className="flex-1 text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors text-slate-100 placeholder-slate-550 font-mono"
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-orange-500/10 transition-colors"
              >
                {t.trackComplaint.trackBtn}
              </button>
            </form>

            {/* Error state */}
            {trackError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl text-center leading-relaxed">
                {t.trackComplaint.notFound}
              </div>
            )}

            {/* Tracked details output */}
            {trackedComplaint && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800 space-y-8 glow-saffron relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none"></div>

                {/* Complaint Info Summary */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-850 pb-5">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {t.trackComplaint.complaintDetails}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      {t.reportIssue.issueTypes[trackedComplaint.type as keyof typeof t.reportIssue.issueTypes] || trackedComplaint.type}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {trackedComplaint.location}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      {t.trackComplaint.statusLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 mt-1">
                      {t.trackComplaint.statusList[trackedComplaint.status]}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-2">
                      ID: <strong className="font-mono text-slate-300">{trackedComplaint.id}</strong>
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.trackComplaint.historyLabel}
                  </h4>
                  <div className="relative border-l-2 border-slate-800 ml-3.5 space-y-6 py-2">
                    {/* Event item maker */}
                    {trackedComplaint.history.map((h, i) => (
                      <div key={i} className="relative pl-7">
                        <span className="absolute -left-[9px] top-0 h-4.5 w-4.5 rounded-full bg-slate-900 border-2 border-orange-500 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-xs font-bold text-slate-100">
                            {t.trackComplaint.statusList[h.status]}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {h.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulate Status Advance button for interactive testing */}
                {trackedComplaint.status !== "resolved" && (
                  <div className="border-t border-slate-850 pt-5 flex items-center justify-between">
                    <div className="text-[10px] text-slate-400 max-w-[65%] leading-normal">
                      💡 <strong>Simulation Mode</strong>: You can click the button to advance this complaint to its next stage to test the tracker behavior locally.
                    </div>
                    <button
                      onClick={simulateStatusProgress}
                      className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-orange-400 hover:text-orange-350 border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-xl transition-all"
                    >
                      Advance Status
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900/60 bg-slate-950 py-6 sm:py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-slate-300">Smart Bharat – AI Civic Companion</span>
            <span className="text-xs text-slate-500">Empowering Citizens through Digital Public Infrastructure</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            © 2026. Made with ❤️ for PromptWars Challenge. MIT Licensed.
          </div>
        </div>
      </footer>
    </div>
  );
}
