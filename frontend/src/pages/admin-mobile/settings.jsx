import React, { useState } from "react";
import "./settings.css";

const INITIAL_SETTINGS_ITEMS = [
  {
    id: "profile-info",
    label: "profile information",
    icon: "user",
    danger: false,
    detailTitle: "Profile Information",
    detailText: "Manage administrator display name, UCU campus role, and contact details.",
  },
  {
    id: "change-password",
    label: "change password",
    icon: "lock",
    danger: false,
    detailTitle: "Change Password",
    detailText: "Update your account password to keep admin access secure.",
  },
  {
    id: "notification-settings",
    label: "Notification Settings",
    icon: "bell",
    danger: false,
    detailTitle: "Notification Settings",
    detailText: "Control alerts for new lost/found reports, claim updates, and admin activity.",
    hasToggles: true,
  },
  {
    id: "system-preferences",
    label: "System Preferences",
    icon: "gear",
    danger: false,
    detailTitle: "System Preferences",
    detailText: "Configure default list sorting, alert sounds, and mobile view behavior.",
  },
  {
    id: "help-support",
    label: "Help $ Suppport",
    icon: "help",
    danger: false,
    detailTitle: "Help & Support",
    detailText: "Need assistance with lost & found claims or admin permissions? Contact UCU support.",
  },
  {
    id: "about-ucu",
    label: "About  UCU Lost $ Find",
    icon: "info",
    danger: false,
    detailTitle: "About UCU Lost & Find",
    detailText: "Uganda Christian University Lost & Found mobile administration portal.",
  },
  {
    id: "logout",
    label: "Logout",
    icon: "logout",
    danger: true,
    detailTitle: "Logout",
    detailText: "Sign out of your current administrator session on this device.",
  },
];

const LOWER_TABS = [
  { id: "home", label: "HOME" },
  { id: "reports", label: "REPORTS" },
  { id: "claims", label: "CLAIMS" },
  { id: "profile", label: "PROFILE" },
];

function SettingRowIcon({ type }) {
  switch (type) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5.5 19.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
        </svg>
      );
    case "lock":
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <rect x="6" y="11" width="12" height="9" rx="2" />
          <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "gear":
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 0 1 4.8.8c0 1.7-2.3 2.2-2.3 3.7" />
          <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="10.5" x2="12" y2="16" />
          <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "logout":
    default:
      return (
        <svg viewBox="0 0 24 24" className="setting-row-svg is-danger" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H4" />
          <path d="M13 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6" />
        </svg>
      );
  }
}

function BottomTabIcon({ id }) {
  switch (id) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className="settings-tab-svg" fill="currentColor" aria-hidden="true">
          <path d="M12 3.2L3 10.5V21h6v-6h6v6h6V10.5L12 3.2z" />
        </svg>
      );
    case "reports":
      return (
        <svg viewBox="0 0 24 24" className="settings-tab-svg" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
          <path d="M6 3h8l4 4v14H6V3z" />
          <path d="M14 3v4h4" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      );
    case "claims":
      return (
        <svg viewBox="0 0 24 24" className="settings-tab-svg" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4h6v2.5H9z" />
          <line x1="8.5" y1="11" x2="15.5" y2="11" />
          <line x1="8.5" y1="15" x2="13" y2="15" />
        </svg>
      );
    case "profile":
    default:
      return (
        <svg viewBox="0 0 24 24" className="settings-tab-svg" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20c0-3.8 3.4-6.5 7.5-6.5s7.5 2.7 7.5 6.5H4.5z" />
        </svg>
      );
  }
}

export default function AdminSettings({
  items = INITIAL_SETTINGS_ITEMS,
  onBack,
  onSelectSetting,
  onLogout,
  activeTab: controlledTab = "profile",
  onTabChange,
}) {
  const [internalTab, setInternalTab] = useState(controlledTab);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifPrefs, setNotifPrefs] = useState({
    newReports: true,
    claimUpdates: true,
    pushAlerts: true,
  });

  const currentTab = onTabChange ? controlledTab : internalTab;

  const goBackToProfile = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/admin-profile";
    }
  };

  const handleTabClick = (tabId) => {
    if (!onTabChange) {
      setInternalTab(tabId);
    }
    if (onTabChange) {
      onTabChange(tabId);
    }
    if (tabId === "profile") {
      goBackToProfile();
    }
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    if (onSelectSetting) {
      onSelectSetting(item);
    }
  };

  const togglePref = (key) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="admin-settings-page">
      <div className="admin-settings-mobile">
        <header className="settings-topbar">
          <button
            type="button"
            className="settings-back-btn"
            aria-label="Back to admin profile"
            onClick={goBackToProfile}
          >
            ‹
          </button>
          <h1 className="settings-topbar-title">settings</h1>
        </header>

        <main className="settings-content">
          <div className="settings-cards-list">
            {items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`settings-option-card ${item.danger ? "is-danger" : ""} ${
                    isSelected ? "is-selected" : ""
                  }`}
                  onClick={() => handleRowClick(item)}
                >
                  <span className="settings-row-icon">
                    <SettingRowIcon type={item.icon} />
                  </span>
                  <span className={`settings-row-label ${item.danger ? "is-danger" : ""}`}>
                    {item.label}
                  </span>
                  <span className="settings-row-chevron" aria-hidden="true">
                    ›
                  </span>
                </button>
              );
            })}
          </div>

          {selectedItem && (
            <section className="settings-detail-drawer" aria-live="polite">
              <div className="settings-detail-header">
                <h2 className="settings-detail-title">{selectedItem.detailTitle}</h2>
                <button
                  type="button"
                  className="settings-detail-close"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </div>
              <p className="settings-detail-text">{selectedItem.detailText}</p>

              {selectedItem.hasToggles && (
                <div className="settings-toggle-group">
                  <label className="settings-toggle-row">
                    <span>New Lost &amp; Found Reports</span>
                    <input
                      type="checkbox"
                      checked={notifPrefs.newReports}
                      onChange={() => togglePref("newReports")}
                    />
                  </label>
                  <label className="settings-toggle-row">
                    <span>Claim Status Updates</span>
                    <input
                      type="checkbox"
                      checked={notifPrefs.claimUpdates}
                      onChange={() => togglePref("claimUpdates")}
                    />
                  </label>
                  <label className="settings-toggle-row">
                    <span>Instant Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={notifPrefs.pushAlerts}
                      onChange={() => togglePref("pushAlerts")}
                    />
                  </label>
                </div>
              )}

              {selectedItem.danger && (
                <button
                  type="button"
                  className="settings-logout-confirm-btn"
                  onClick={() => onLogout && onLogout()}
                >
                  Confirm Logout
                </button>
              )}
            </section>
          )}
        </main>

        <nav className="settings-bottom-nav" aria-label="Bottom navigation">
          {LOWER_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`settings-bottom-tab ${isActive ? "is-active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <BottomTabIcon id={tab.id} />
                <span className="settings-bottom-tab-label">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}