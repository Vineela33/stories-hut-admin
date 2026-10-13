import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Cover } from "../components/Cover";
import { useToast } from "../components/Toast";
import * as I from "../components/icons";
import { DAU, DAYS, GENRES, LEDGER, PENDING, REPORTS, SIGNUPS, type Report } from "../data/dashboard";

const RANGES = ["Today", "7 days", "30 days"] as const;
const REPORT_TABS = ["All", "Copyright", "Explicit"] as const;

/* ---------- chart helpers ---------- */
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(i + 2, points.length - 1)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function GrowthChart() {
  const W = 560, H = 190, padX = 8, padT = 44, padB = 8;
  const max = Math.max(...DAU) * 1.05;
  const toPts = (arr: number[]): [number, number][] =>
    arr.map((v, i) => [padX + (i * (W - padX * 2)) / (arr.length - 1), padT + (H - padT - padB) * (1 - v / max)]);
  const dau = toPts(DAU), sig = toPts(SIGNUPS);
  const peakIdx = DAU.indexOf(Math.max(...DAU));
  const [px, py] = dau[peakIdx];
  const area = `${smoothPath(dau)} L${dau[dau.length - 1][0]},${H} L${dau[0][0]},${H} Z`;
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Reader growth, daily active users peaking at 24,180 on Oct 22">
      <defs>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={padX} x2={W - padX} y1={padT + (H - padT - padB) * f} y2={padT + (H - padT - padB) * f} stroke="#ebe5e0" strokeDasharray="3 4" />
      ))}
      <path d={area} fill="url(#fill)" />
      <path d={smoothPath(sig)} fill="none" stroke="#cfc6bd" strokeWidth="2" strokeDasharray="5 5" />
      <path d={smoothPath(dau)} fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
      <line x1={px} x2={px} y1={py} y2={H} stroke="#b89cf5" strokeDasharray="3 3" />
      <circle cx={px} cy={py} r="5" fill="#7c3aed" stroke="#fff" strokeWidth="2.5" />
      <g transform={`translate(${px - 60}, ${py - 42})`}>
        <rect width="120" height="36" rx="8" fill="#1f1d24" />
        <text x="60" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fill="#c9b7f5" letterSpacing="0.08em">OCT 22 PEAK</text>
        <text x="60" y="28" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">24,180 active</text>
      </g>
    </svg>
  );
}

/* ---------- page ---------- */
export function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [range, setRange] = useState<(typeof RANGES)[number]>("7 days");
  const [tab, setTab] = useState<(typeof REPORT_TABS)[number]>("All");
  const [queue, setQueue] = useState(PENDING);
  const [approvedCount, setApprovedCount] = useState(0);

  const reports = useMemo(
    () => REPORTS.filter((r) => tab === "All" || r.kind === tab.toLowerCase()),
    [tab],
  );

  const approve = (id: string, title: string) => {
    setQueue((q) => q.filter((p) => p.id !== id));
    setApprovedCount((c) => c + 1);
    toast(`“${title}” approved and pushed to serialization.`, "success");
  };
  const waiting = 47 - approvedCount;

  return (
    <>
      <div className="breadcrumb" style={{ marginBottom: 10 }}>
        <div className="crumbs">
          <span className="pill purple" style={{ letterSpacing: "0.08em" }}><i className="live-dot" style={{ width: 6, height: 6, boxShadow: "none" }} /> CURATOR COMMAND CENTER</span>
          <span className="sep">•</span>
          <span>IST Workspace Sync Active</span>
        </div>
      </div>

      <div className="page-head">
        <div>
          <h1 style={{ fontSize: 38 }}>Good morning, Ananya</h1>
          <p className="lede" style={{ maxWidth: 560 }}>
            Here is your literary network overview for <b>Wednesday, October 24, 2024</b>. Review queued manuscripts and intellectual rights flags below.
          </p>
        </div>
        <div className="head-actions">
          <div className="row">
            <div className="segmented">
              {RANGES.map((r) => (
                <button key={r} className={range === r ? "on" : ""} onClick={() => setRange(r)}>{r}</button>
              ))}
              <button onClick={() => toast("Custom date range is coming soon.")}><I.Calendar /> Custom…</button>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-soft" onClick={() => toast("Report export queued — you'll get an email shortly.", "success")}><I.Download /> Export Report</button>
            <button className="btn btn-primary" onClick={() => toast("Announcement composer is coming soon.")}><I.Megaphone /> + New Announcement / Promo</button>
          </div>
        </div>
      </div>

      {/* Row 1 */}
      <div className="stats">
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Total Readers</span><span className="pill green"><I.Trend /> +12.4%</span></div>
          <div className="stat-value num">2,48,310</div>
          <div className="stat-foot"><i className="bdot" /> Across 42 publishing regions</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Active Today</span><span className="pill green"><I.Trend /> +5.1%</span></div>
          <div className="stat-value num">18,420</div>
          <div className="stat-foot"><i className="bdot purple" /> Peak at 9:30 PM IST (Prime reading hour)</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Authors &amp; Guilds</span><span className="pill green"><I.Plus /> 38 this month</span></div>
          <div className="stat-value num">3,214</div>
          <div className="stat-foot"><I.Verified style={{ color: "var(--purple)" }} /> 842 verified publishers</div>
        </div>
        <div className="card stat clickable" role="link" tabIndex={0} onClick={() => navigate("/stories")} onKeyDown={(e) => e.key === "Enter" && navigate("/stories")} title="Open Stories">
          <div className="stat-top"><span className="eyebrow">Indexed Stories</span><span className="pill purple"><I.Book /> +140 published</span></div>
          <div className="stat-value num">12,860</div>
          <div className="stat-foot"><I.Star style={{ color: "#f0b429" }} /> Average 4.7 platform rating</div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="stats">
        <div className="card stat clickable" role="link" tabIndex={0} onClick={() => navigate("/submissions")} onKeyDown={(e) => e.key === "Enter" && navigate("/submissions")} title="Open Submissions Queue">
          <div className="stat-top"><span className="eyebrow">Pending Submissions</span><span className="pill orange"><I.Clock /> Requires Review</span></div>
          <div className="stat-value num orange">{waiting}</div>
          <div className="stat-foot"><i className="bdot orange" /> Avg wait time 18 hrs (Target: &lt;24h)</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Open Reports</span><span className="pill red"><I.Alert /> 3 Urgent Flags</span></div>
          <div className="stat-value num red">12</div>
          <div className="stat-foot"><i className="bdot red" /> Copyright &amp; Content safety</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Monthly Revenue</span><span className="pill green"><I.Trend /> +18.2% MoM</span></div>
          <div className="stat-value num">₹18,42,600</div>
          <div className="stat-foot"><i className="bdot amber" /> INR Gross Platform Volume</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">New Subscriptions</span><span className="pill green"><I.CheckCircle /> +9.8% conv.</span></div>
          <div className="stat-value num">1,284</div>
          <div className="stat-foot"><i className="bdot blue" /> Annual &amp; Tier 2 patron plans</div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="dash-grid-3">
        <section className="card card-pad">
          <div className="card-head">
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="pill purple" style={{ letterSpacing: "0.08em" }}>NETWORK VELOCITY</span>
                <span className="muted" style={{ fontSize: 12 }}>Realtime</span>
              </div>
              <h3 className="card-title" style={{ marginTop: 8, maxWidth: 260, lineHeight: 1.25 }}>Reader Growth &amp; Active Trajectory</h3>
            </div>
            <div className="legend">
              <span><i style={{ background: "#7c3aed" }} /> Active (DAU)</span>
              <span><i style={{ background: "#d6cfc7" }} /> Signups</span>
            </div>
          </div>
          <GrowthChart />
          <div className="axis">
            {DAYS.map((d) => <span key={d} className={d === "Oct 22" ? "hi" : ""}>{d}</span>)}
          </div>
        </section>

        <section className="card card-pad">
          <div className="card-head" style={{ marginBottom: 6 }}>
            <div>
              <span className="eyebrow">Financial Streams</span>
              <h3 className="card-title sm" style={{ marginTop: 8 }}>Revenue by Tier</h3>
              <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>Current cycle contribution</p>
            </div>
            <span className="pill green">INR (₹)</span>
          </div>
          <div className="bars">
            <div className="bar" style={{ height: "100%", background: "#6b2fe6" }} title="Reader Subscriptions" />
            <div className="bar" style={{ height: "66%", background: "#f6a94a" }} title="Author Royalties" />
            <div className="bar" style={{ height: "48%", background: "#d9d1ca" }} title="Publisher Enterprise" />
          </div>
          <div className="bar-labels">
            <span>Reader<br />Subscriptions</span>
            <span>Author<br />Royalties</span>
            <span>Publisher<br />Enterprise</span>
          </div>
          <div className="settle"><span>Cycle<br />Settlement:</span><b>₹18,42,600</b></div>
        </section>

        <section className="card card-pad">
          <div className="card-head" style={{ marginBottom: 6 }}>
            <div>
              <span className="eyebrow">Reader Affinity</span>
              <h3 className="card-title sm" style={{ marginTop: 8 }}>Genre Popularity</h3>
              <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>Top catalog engagements</p>
            </div>
            <I.Pie style={{ color: "var(--purple)" }} />
          </div>
          {GENRES.map((g) => (
            <div key={g.name}>
              <div className="genre-row"><span>{g.name}</span><span><b>{g.pct}%</b><span className="ct">({g.count})</span></span></div>
              <div className="track"><i style={{ width: `${g.pct * 2.6}%`, background: g.color }} /></div>
            </div>
          ))}
          <div style={{ marginTop: 20 }}>
            <button className="link" onClick={() => toast("Taxonomy report lives under Analytics.")}>Explore Taxonomy Report <I.ArrowRight /></button>
          </div>
        </section>
      </div>

      {/* Row 4 */}
      <div className="dash-grid-2">
        <section className="card card-pad">
          <div className="card-head" style={{ alignItems: "center", marginBottom: 6 }}>
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              Pending Submissions <span className="pill orange lg">{waiting} Waiting</span>
            </h3>
            <Link className="link" to="/submissions">+ Review Batch <I.External /></Link>
          </div>
          {queue.length === 0 && <div className="empty">Queue clear for now. Great work — the next batch lands at the top of the hour.</div>}
          {queue.map((p) => (
            <div key={p.id} className="queue-item">
              <Cover title={p.title} />
              <div className="grow">
                <div className="title">{p.title}</div>
                <span className="genre">{p.genre}</span>
                <div className="meta">
                  <span>by <b>{p.author}</b></span><i /><span>{p.words} words</span><i /><span className="pending">Pending Review</span>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-ghost btn-sm" onClick={() => toast(`Opening sample for “${p.title}”…`)}>Read Sample</button>
                <button className="btn btn-primary btn-sm" onClick={() => approve(p.id, p.title)}>Approve</button>
              </div>
            </div>
          ))}
        </section>

        <section className="card card-pad">
          <div className="card-head" style={{ alignItems: "center", marginBottom: 4 }}>
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: 10, lineHeight: 1.2 }}>
              Urgent Reports <span className="pill red">12 Open</span>
            </h3>
            <div className="segmented sm" style={{ background: "transparent" }}>
              {REPORT_TABS.map((t) => (
                <button key={t} className={tab === t ? "on" : ""} style={tab === t ? { background: "var(--ink)", boxShadow: "none" } : undefined} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
          </div>
          {reports.length === 0 && <div className="empty">No {tab.toLowerCase()} reports open right now.</div>}
          {reports.map((r) => <ReportCard key={r.id} r={r} />)}
          <div className="sla">
            <span>SLA status: <b style={{ color: "var(--ink)" }}>91.6%</b> resolved under 4h</span>
            <button className="link" onClick={() => toast("Moderation desk is coming soon.", "warn")}>Open Moderation Desk <I.ArrowRight /></button>
          </div>
        </section>
      </div>

      {/* Row 5 */}
      <div className="dash-grid-2" style={{ marginBottom: 0 }}>
        <section className="card card-pad">
          <div className="card-head" style={{ alignItems: "center" }}>
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", gap: 10 }}><I.Activity style={{ color: "var(--muted)" }} /> Administrative Ledger</h3>
            <span className="eyebrow">Audit Trail (Last 6H)</span>
          </div>
          <ul className="ledger">
            {LEDGER.map((l) => (
              <li key={l.id}>
                {l.who === "bot" ? <span className="avatar soft" style={{ color: "var(--ink-2)", background: "var(--bg-2)" }}><I.Bot width={16} height={16} /></span> : <Avatar name={l.who} soft />}
                <div className="txt">
                  {l.html.map((seg, i) => {
                    if (i === 0) return <b key={i}>{seg}</b>;
                    if (seg.startsWith("em:")) return <em key={i}>“{seg.slice(3)}”</em>;
                    if (seg.startsWith("b:")) return <b key={i}>{seg.slice(2)}</b>;
                    return <span key={i}>{seg}</span>;
                  })}
                </div>
                <span className="when">{l.when}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
            <button className="link" onClick={() => toast("Full audit log ships with the Activity screen.", "warn")}>View Complete Audit Log <I.ArrowRight /></button>
          </div>
        </section>

        <section className="card card-pad milestone">
          <span className="pill" style={{ background: "transparent", padding: 0, color: "#b7791f", letterSpacing: "0.08em" }}><I.Star /> WEEKLY PUBLISHING MILESTONE</span>
          <h3>Stories Hut crossed 12,500 published works!</h3>
          <p>Author royalties distributed smoothly this cycle: <b>₹8,92,400</b> with a recorded <b>99.4% SLA adherence</b> across Indian banking rails and UPI AutoPay.</p>
          <div className="mini-grid">
            <div className="mini"><div className="eyebrow">Payout Cycle</div><div className="v">Cycle 42-B</div></div>
            <div className="mini"><div className="eyebrow">Complaints</div><div className="v green">0.02% (Low)</div></div>
          </div>
          <div className="foot">
            <button className="btn btn-dark" onClick={() => toast("Payout report PDF is generating…", "success")}><I.Receipt /> View Payout Report</button>
            <span>Certified Ledger</span>
          </div>
        </section>
      </div>
    </>
  );
}

function ReportCard({ r }: { r: Report }) {
  const { toast } = useToast();
  const sevPill = { critical: "red", high: "orange", medium: "grey" }[r.severity];
  const SevIcon = r.severity === "critical" ? I.Warning : r.severity === "high" ? I.Alert : I.Clock;
  return (
    <div className={`report ${r.severity}`}>
      <div className="report-top">
        <span className={`pill ${sevPill}`}><SevIcon /> {r.severity.toUpperCase()} SEVERITY</span>
        <span>{r.when}</span>
      </div>
      <h4>{r.title}</h4>
      <div className="sub"><span>{r.by}</span><span className={`status ${r.statusTone}`}>{r.status}</span></div>
      {r.cta && (
        <div className="cta">
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--purple)" }} onClick={() => toast("Diff viewer opens from the Moderation desk.")}>{r.cta} →</button>
        </div>
      )}
    </div>
  );
}
