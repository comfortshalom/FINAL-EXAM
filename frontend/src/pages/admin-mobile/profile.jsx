import React, { useState } from "react";
import "./profile.css";

const INITIAL_ADMINS = [
  {
    id: "grace",
    name: "Grace Nalwanga",
    role: "Super Admin",
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "david",
    name: "David Kato",
    role: "Admin",
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "mercy",
    name: "Mercy Nankya",
    role: "Admin",
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
  },
];

const LOWER_TABS = [
  { id: "home", label: "HOME" },
  { id: "reports", label: "REPORTS" },
  { id: "claims", label: "CLAIMS" },
  { id: "profile", label: "PROFILE" },
];

function BottomTabIcon({ id }) {
  switch (id) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className="admin-tab-svg" fill="currentColor" aria-hidden="true">
          <path d="M12 3.2L3 10.5V21h6v-6h6v6h6V10.5L12 3.2z" />
        </svg>
      );
    case "reports":
      return (
        <svg viewBox="0 0 24 24" className="admin-tab-svg" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
          <path d="M6 3h8l4 4v14H6V3z" />
          <path d="M14 3v4h4" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      );
    case "claims":
      return (
        <svg viewBox="0 0 24 24" className="admin-tab-svg" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4h6v2.5H9z" />
          <line x1="8.5" y1="11" x2="15.5" y2="11" />
          <line x1="8.5" y1="15" x2="13" y2="15" />
        </svg>
      );
    case "profile":
    default:
      return (
        <svg viewBox="0 0 24 24" className="admin-tab-svg" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20c0-3.8 3.4-6.5 7.5-6.5s7.5 2.7 7.5 6.5H4.5z" />
        </svg>
      );
  }
}

export default function ManageAdmins({
  admins = INITIAL_ADMINS,
  onAddAdmin,
  onSelectAdmin,
}) {
  const [activeTab, setActiveTab] = useState("profile");

  const goToSettings = () => {
    window.location.href = "/admin-settings";
  };

  return (
    <div className="manage-admins-page">
      <div className="manage-admins-mobile">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-back-btn"
            aria-label="Go to settings"
            onClick={goToSettings}
          >
            ‹
          </button>

          <h1 className="admin-topbar-title">Administrators</h1>

          <button
            type="button"
            className="admin-settings-btn"
            aria-label="Open settings"
            title="Settings"
            onClick={goToSettings}
          >
            <svg
              viewBox="0 0 24 24"
              className="admin-settings-svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </header>

        <main className="admin-content">
          <div className="admin-cards-list">
            {admins.map((admin) => (
              <div
                key={admin.id}
                role="button"
                tabIndex={0}
                className="admin-profile-card"
                onClick={() => onSelectAdmin && onSelectAdmin(admin)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && onSelectAdmin) {
                    e.preventDefault();
                    onSelectAdmin(admin);
                  }
                }}
              >
                <div className="admin-photo-wrap">
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="admin-photo"
                  />
                </div>

                <div className="admin-details">
                  <div className="admin-name">{admin.name}</div>
                  <div
                    className={`admin-role ${
                      admin.role.toLowerCase().includes("super")
                        ? "is-super"
                        : "is-standard"
                    }`}
                  >
                    {admin.role}
                  </div>
                </div>

                <span
                  className={`admin-status-dot ${
                    admin.online ? "is-online" : "is-offline"
                  }`}
                  title={admin.online ? "Online" : "Offline"}
                  aria-label={admin.online ? "Online" : "Offline"}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="add-admin-btn"
            onClick={onAddAdmin}
          >
            <span className="add-admin-plus" aria-hidden="true">
              +
            </span>
            <span>Add Admin</span>
          </button>
        </main>

        <nav className="admin-bottom-nav" aria-label="Bottom navigation">
          {LOWER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`admin-bottom-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <BottomTabIcon id={tab.id} />
                <span className="admin-bottom-tab-label">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}