import { type FormEvent, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { NAV, type NavKey } from "../data/nav";
import { useToast } from "./Toast";
import * as I from "./icons";

const ICONS: Record<NavKey, (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  dashboard: I.Dashboard, admins: I.Shield, users: I.Users, authors: I.Feather, stories: I.Book,
  submissions: I.Inbox, moderation: I.Gavel, analytics: I.Chart, revenue: I.Wallet,
  categories: I.Tag, notifications: I.Bell, activity: I.Activity, settings: I.Settings,
};

export function Layout() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/stories?q=${encodeURIComponent(term)}` : "/stories");
  };

  return (
    <div className="shell">
      <aside className="sidebar" aria-label="Primary">
        <NavLink to="/" className="brand">
          <img src="/logo.png" alt="Stories Hut" />
          <div className="brand-text">
            <div className="brand-name">Stories Hut</div>
            <div className="brand-sub">Admin Console</div>
          </div>
        </NavLink>

        <nav className="nav">
          {NAV.map((item) => {
            const Icon = ICONS[item.key];
            const content = (
              <>
                <Icon />
                <span className="lbl">{item.label}</span>
                {item.count !== undefined && <span className={`count ${item.countTone}`}>{item.count}</span>}
              </>
            );
            return item.to ? (
              <NavLink key={item.key} to={item.to} end={item.to === "/"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} title={item.label}>
                {content}
              </NavLink>
            ) : (
              <button key={item.key} className="nav-item" title={item.label} onClick={() => toast(`${item.label} is coming soon.`, "warn")}>
                {content}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="lbl">Platform Status</span>
          <span className="version">v2.4 Pro</span>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <form className="search" role="search" onSubmit={onSearch}>
            <I.Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search stories, authors, ISBNs, reader IDs..."
              aria-label="Search"
            />
            <span className="kbd">⌘K</span>
          </form>

          <div className="topbar-right">
            <span className="live-pill"><I.Wallet width={16} height={16} /> INR (₹) Live <i className="live-dot" /></span>
            <button className="icon-btn" aria-label="Notifications" onClick={() => toast("3 unread notifications.")}>
              <I.Bell /><span className="dot" />
            </button>
            <button className="icon-btn" aria-label="Help" onClick={() => toast("Help centre opens in a new tab in production.")}>
              <I.Help />
            </button>
            <span className="vdiv" />
            <button className="user" onClick={() => toast("Profile menu coming soon.")}>
              <span className="avatar" style={{ background: "linear-gradient(135deg,#f59e0b,#db2777)" }}>AS</span>
              <span>
                <div className="user-name">Ananya Sharma</div>
                <span className="role">Super Admin</span>
              </span>
              <I.Chevron width={16} height={16} style={{ color: "var(--muted)" }} />
            </button>
          </div>
        </header>

        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
