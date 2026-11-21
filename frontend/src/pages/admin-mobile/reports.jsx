import React, { useState } from "react";
import "./reports.css";

// Sample data (no backend needed yet). Claim Details reads from this too.
export const REPORTS = [
  {
    id: 1,
    type: "lost",
    title: "Blue Backpack",
    place: "Last seen: Main Library",
    time: "2 hours ago",
    status: "Pending",
    emoji: "🎒",
    tint: "#dbeafe",
    claimants: [
      { id: 1, name: "Grace Nalwanga", when: "2hrs ago" },
      { id: 2, name: "David Kato", when: "3hrs ago" },
    ],
  },
  {
    id: 2,
    type: "lost",
    title: "Student ID Card",
    place: "Last seen: Library",
    time: "3 hours ago",
    status: "Pending",
    emoji: "💳",
    tint: "#e5e7eb",
    claimants: [{ id: 1, name: "Mercy Nankya", when: "1hr ago" }],
  },
  {
    id: 3,
    type: "lost",
    title: "Water Bottle",
    place: "Last seen: Cafeteria",
    time: "1 day ago",
    status: "Resolved",
    emoji: "🧴",
    tint: "#dcfce7",
    claimants: [],
  },
  {
    id: 4,
    type: "found",
    title: "Black Umbrella",
    place: "Found at: Chapel entrance",
    time: "5 hours ago",
    status: "Pending",
    emoji: "☂️",
    tint: "#ede9fe",
    claimants: [{ id: 1, name: "Brian Okello", when: "4hrs ago" }],
  },
  {
    id: 5,
    type: "found",
    title: "Scientific Calculator",
    place: "Found at: Block B, Room 204",
    time: "Yesterday",
    status: "Resolved",
    emoji: "🧮",
    tint: "#fef3c7",
    claimants: [],
  },
];

// Bottom bar tabs. A null path means that page does not exist yet.
// Admin Mobile bottom navigation tabs.
const NAV_TABS = [
  { id: "home", label: "Dashboard", path: "/admin-dashboard" },
  { id: "reports", label: "Reports", path: "/admin-reports" },
  { id: "claims", label: "Claims", path: "/admin-claim-details" },
  { id: "users", label: "Users", path: "/admin-users" },
];
function NavIcon({ id }) {
  switch (id) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className="ar-nav-svg" fill="currentColor" aria-hidden="true">
          <path d="M12 3.2L3 10.5V21h6v-6h6v6h6V10.5L12 3.2z" />
        </svg>
      );
    case "reports":
      return (
        <svg viewBox="0 0 24 24" className="ar-nav-svg" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
          <path d="M6 3h8l4 4v14H6V3z" />
          <path d="M14 3v4h4" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      );
    case "claims":
      return (
        <svg viewBox="0 0 24 24" className="ar-nav-svg" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4h6v2.5H9z" />
          <line x1="8.5" y1="11" x2="15.5" y2="11" />
          <line x1="8.5" y1="15" x2="13" y2="15" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="ar-nav-svg" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20c0-3.8 3.4-6.5 7.5-6.5s7.5 2.7 7.5 6.5H4.5z" />
        </svg>
      );
  }
}

// Shared bottom bar: also used by the Claim Details screen.
export function BottomNav({ active }) {
  return (
    <nav className="ar-bottom-nav" aria-label="Bottom navigation">
      {NAV_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`ar-nav-tab ${active === tab.id ? "is-active" : ""}`}
          onClick={() => {
            if (tab.path) window.location.href = tab.path;
          }}
        >
          <NavIcon id={tab.id} />
          <span className="ar-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function AdminReports() {
  const [activeType, setActiveType] = useState("lost");

  const visibleReports = REPORTS.filter((r) => r.type === activeType);

  const openClaimDetails = (report) => {
    window.location.href = `/admin-claim-details?id=${report.id}`;
  };

  return (
    <div className="ar-page">
      <div className="ar-phone">
        <header className="ar-topbar">
          <button
            type="button"
            className="ar-back-btn"
            aria-label="Go to dashboard"
onClick={() => (window.location.href = "/admin-dashboard")}
          >
            ‹
          </button>
          <h1 className="ar-topbar-title">Reports</h1>
          <span className="ar-topbar-space" aria-hidden="true" />
        </header>

        <main className="ar-content">
          <div className="ar-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeType === "lost"}
              className={`ar-tab ${activeType === "lost" ? "is-active" : ""}`}
              onClick={() => setActiveType("lost")}
            >
              Lost Items
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeType === "found"}
              className={`ar-tab ${activeType === "found" ? "is-active" : ""}`}
              onClick={() => setActiveType("found")}
            >
              Found Items
            </button>
          </div>

          <div className="ar-list">
            {visibleReports.map((report) => (
              <button
                key={report.id}
                type="button"
                className="ar-card"
                onClick={() => openClaimDetails(report)}
              >
                <span className="ar-thumb" style={{ background: report.tint }}>
                  {report.emoji}
                </span>

                <span className="ar-card-text">
                  <span className="ar-card-title">{report.title}</span>
                  <span className="ar-card-place">{report.place}</span>
                  <span className="ar-card-time">{report.time}</span>
                </span>

                <span
                  className={`ar-status ${
                    report.status === "Resolved" ? "is-resolved" : "is-pending"
                  }`}
                >
                  {report.status}
                </span>
              </button>
            ))}
          </div>
        </main>

        <BottomNav active="reports" />
      </div>
    </div>
  );
}
