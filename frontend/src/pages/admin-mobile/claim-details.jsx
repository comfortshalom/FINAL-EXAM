import React, { useState } from "react";
import "./claim-details.css";
import { REPORTS, BottomNav } from "./reports";

export default function AdminClaimDetails() {
  // The report to show comes from the address, e.g. /admin-claim-details?id=2
  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get("id")) || 1;
  const report = REPORTS.find((r) => r.id === requestedId) || REPORTS[0];

  const [openClaimantId, setOpenClaimantId] = useState(null);
  const [decision, setDecision] = useState(null); // null | "approved" | "rejected"

  const toggleClaimant = (id) => {
    setOpenClaimantId((current) => (current === id ? null : id));
  };

  const initials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="ar-page">
      <div className="ar-phone">
        <header className="ar-topbar">
          <button
            type="button"
            className="ar-back-btn"
            aria-label="Back to reports"
            onClick={() => (window.location.href = "/admin-reports")}
          >
            ‹
          </button>
          <h1 className="ar-topbar-title">Claim Details</h1>
          <span className="ar-topbar-space" aria-hidden="true" />
        </header>

        <main className="ar-content">
          <section className="acd-item">
            <span className="ar-thumb acd-item-thumb" style={{ background: report.tint }}>
              {report.emoji}
            </span>
            <span className="ar-card-text">
              <span className="ar-card-title acd-item-title">{report.title}</span>
              <span className="ar-card-place">{report.place}</span>
              <span className="ar-card-time">{report.time}</span>
            </span>
          </section>

          <h2 className="acd-heading">Claimants ({report.claimants.length})</h2>

          {report.claimants.length === 0 ? (
            <p className="acd-empty">
              No one has claimed this item yet. Claims will appear here.
            </p>
          ) : (
            <div className="ar-list acd-list-gap">
              {report.claimants.map((person) => (
                <div key={person.id} className="acd-claimant">
                  <div className="acd-claimant-row">
                    <span className="acd-avatar">{initials(person.name)}</span>
                    <span className="ar-card-text">
                      <span className="ar-card-title">{person.name}</span>
                      <span className="ar-card-time">Student {person.when}</span>
                    </span>
                    <button
                      type="button"
                      className="acd-view-btn"
                      aria-expanded={openClaimantId === person.id}
                      onClick={() => toggleClaimant(person.id)}
                    >
                      {openClaimantId === person.id ? "Hide" : "View"}
                    </button>
                  </div>

                  {openClaimantId === person.id && (
                    <p className="acd-evidence">
                      Ownership evidence (sample): describes the item and where it
                      was lost. This will come from the backend later.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <h2 className="acd-heading">Decision</h2>

          {decision && (
            <p
              className={`acd-banner ${
                decision === "approved" ? "is-approved" : "is-rejected"
              }`}
              role="status"
            >
              {decision === "approved" ? "Claim approved." : "Claim rejected."}
            </p>
          )}

          <div className="acd-actions">
            <button
              type="button"
              className="acd-btn acd-approve"
              onClick={() => setDecision("approved")}
            >
              Approve Claim
            </button>
            <button
              type="button"
              className="acd-btn acd-reject"
              onClick={() => setDecision("rejected")}
            >
              Reject Claim
            </button>
          </div>
        </main>

        <BottomNav active="claims" />
      </div>
    </div>
  );
}
