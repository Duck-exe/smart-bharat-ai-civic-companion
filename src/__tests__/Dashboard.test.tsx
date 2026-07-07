import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashboardPage from "../app/page";
import { vi, describe, it, expect, beforeEach } from "vitest";

describe("Smart Bharat Civic Companion Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("1. renders the homepage dashboard with welcome text", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Welcome to Smart Bharat")).toBeInTheDocument();
    expect(screen.getByText("Digital India Public Utilities")).toBeInTheDocument();
  });

  it("2. toggles the language to Hindi and updates texts", () => {
    render(<DashboardPage />);
    
    // Click language switcher button for Hindi
    const hiBtn = screen.getByText("हिन्दी");
    fireEvent.click(hiBtn);

    expect(screen.getByText("स्मार्ट भारत में आपका स्वागत है")).toBeInTheDocument();
  });

  it("3. navigates to the Service Finder and allows searching and viewing modal details", async () => {
    render(<DashboardPage />);
    
    // Find Card for Service Finder
    const serviceFinderCard = screen.getByText("Service Finder").closest("button") || screen.getByText("Service Finder");
    fireEvent.click(serviceFinderCard);

    // Should display search input
    const searchInput = screen.getByPlaceholderText("Search services (e.g., Aadhaar, License, Voter ID)...");
    expect(searchInput).toBeInTheDocument();

    // Type "Passport" in the search input
    fireEvent.change(searchInput, { target: { value: "Passport" } });

    // Click "View Details" button on Passport card
    const viewDetailsBtns = screen.getAllByText("View Details");
    expect(viewDetailsBtns.length).toBeGreaterThan(0);
    fireEvent.click(viewDetailsBtns[0]);

    // Check if modal opens and displays passport details (it will find both card and modal headers)
    expect(screen.getAllByText("Indian Passport (Normal / Tatkaal)").length).toBe(2);
    
    // Close modal
    const backBtn = screen.getByText("Back");
    fireEvent.click(backBtn);
    expect(screen.getAllByText("Indian Passport (Normal / Tatkaal)").length).toBe(1);
  });

  it("4. fills out and submits the public issue complaint form, saving it to localStorage", async () => {
    render(<DashboardPage />);
    
    // Navigate to report issue tab
    const reportIssueCard = screen.getByText("Report Public Issue").closest("button") || screen.getByText("Report Public Issue");
    fireEvent.click(reportIssueCard);

    // Fill form
    const typeSelect = screen.getByLabelText("Issue Type");
    const locationInput = screen.getByLabelText("Location / Landmark");
    const descTextarea = screen.getByLabelText("Description");

    fireEvent.change(typeSelect, { target: { value: "pothole" } });
    fireEvent.change(locationInput, { target: { value: "MG Road, Sector 3" } });
    fireEvent.change(descTextarea, { target: { value: "Deep pothole causing traffic issues near park" } });

    const submitBtn = screen.getByText("Submit Complaint");
    fireEvent.click(submitBtn);

    // Expect success message
    await waitFor(() => {
      expect(screen.getByText("Complaint Filed Successfully!")).toBeInTheDocument();
    });

    // Check localStorage has been updated
    const complaints = JSON.parse(localStorage.getItem("sb_complaints") || "[]");
    expect(complaints.length).toBe(1);
    expect(complaints[0].location).toBe("MG Road, Sector 3");
    expect(complaints[0].status).toBe("submitted");
  });

  it("5. sends a message in the AI assistant and receives a response", async () => {
    // Mock the API response
    const mockJson = vi.fn().mockResolvedValue({
      content: "Here is your guide for Tatkaal Passport process...",
      demoMode: false,
    });
    const mockResponse = {
      ok: true,
      json: mockJson,
    };
    (global.fetch as any).mockResolvedValue(mockResponse);

    render(<DashboardPage />);

    // Open AI Civic Assistant tab
    const aiAssistantCard = screen.getByText("AI Civic Assistant").closest("button") || screen.getByText("AI Civic Assistant");
    fireEvent.click(aiAssistantCard);

    // Get input field and type query
    const chatInput = screen.getByPlaceholderText("e.g., How can I apply for a Tatkaal Passport? or What is the PM Kisan scheme?");
    fireEvent.change(chatInput, { target: { value: "How to get a passport?" } });

    const sendBtn = screen.getByText("Send Query");
    fireEvent.click(sendBtn);

    // Expect loading state or content to update
    await waitFor(() => {
      expect(screen.getByText("Here is your guide for Tatkaal Passport process...")).toBeInTheDocument();
    });
  });
});
