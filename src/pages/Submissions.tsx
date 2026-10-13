import { useMemo, useState } from "react";
import { Cover } from "../components/Cover";
import { useToast } from "../components/Toast";
import * as I from "../components/icons";
import { SLA_COLOR, SLA_LABEL, SUBMISSIONS, slaTier, type SlaTier, type Submission } from "../data/submissions";

type SortKey = "oldest" | "newest" | "longest";
const SORT_LABEL: Record<SortKey, string> = { oldest: "Oldest First (SLA Priority)", newest: "Newest First", longest: "Longest Manuscript" };
const GENRE_PILL: Record<Submission["genreTone"], string> = { amber: "amber", grey: "grey", purple: "purple", orange: "orange" };

export function Submissions() {
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [sla, setSla] = useState<"All" | SlaTier>("All");
  const [reviewer, setReviewer] = useState("All");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState<SortKey>("oldest");
  const [autoAssign, setAutoAssign] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const genres = useMemo(() => Array.from(new Set(SUBMISSIONS.map((s) => s.genre))), []);
  const langs = useMemo(() => Array.from(new Set(SUBMISSIONS.map((s) => s.language))), []);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = SUBMISSIONS.filter((s) => {
      if (term && ![s.title, s.author, s.code].some((v) => v.toLowerCase().includes(term))) return false;
      if (genre !== "All" && s.genre !== genre) return false;
      if (sla !== "All" && slaTier(s) !== sla) return false;
      if (reviewer !== "All" && s.reviewer !== reviewer) return false;
      if (lang !== "All" && s.language !== lang) return false;
      return true;
    });
    const t = (s: Submission) => new Date(s.submitted).getTime();
    const cmp: Record<SortKey, (a: Submission, b: Submission) => number> = {
      oldest: (a, b) => t(a) - t(b),
      newest: (a, b) => t(b) - t(a),
      longest: (a, b) => b.words - a.words,
    };
    return [...list].sort(cmp[sort]);
  }, [q, genre, sla, reviewer, lang, sort]);

  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const allOn = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggleAll = () => setSelected(allOn ? new Set() : new Set(rows.map((r) => r.id)));

  const batch = () => {
    if (selected.size === 0) { toast("Select one or more manuscripts to run a batch action.", "warn"); return; }
    toast(`Batch actions menu for ${selected.size} manuscript${selected.size > 1 ? "s" : ""}.`);
  };

  return (
    <>
      <div className="breadcrumb">
        <div className="crumbs">
          <I.Home /> <span>Home</span><span className="sep">/</span>
          <span>Editorial Operations</span><span className="sep">/</span>
          <b>Submissions Queue</b>
        </div>
      </div>

      <div className="page-head">
        <div>
          <h1>Submissions <span className="pill orange lg" style={{ fontFamily: "var(--sans)", letterSpacing: "0.06em" }}><i className="live-dot" style={{ width: 6, height: 6, background: "var(--orange)", boxShadow: "none" }} /> 47 PENDING MANUSCRIPTS</span></h1>
          <p className="lede">Editorial review pipeline for newly submitted manuscripts, serial chapters, and author revisions awaiting line curation.</p>
        </div>
        <div className="head-actions">
          <div className="row">
            <button className="toggle" onClick={() => { setAutoAssign((v) => !v); toast(`Auto-assign ${autoAssign ? "paused" : "enabled"}.`, autoAssign ? "warn" : "success"); }} aria-pressed={autoAssign}>
              <span className={`switch ${autoAssign ? "on" : ""}`} /> Auto-assign Queue
            </button>
            <span className="live-pill"><I.Refresh width={14} height={14} /> Updated 2m ago</span>
          </div>
          <div className="row">
            <button className="btn btn-soft" onClick={batch}><I.Shuffle /> Batch Actions</button>
            <button className="btn btn-primary" onClick={() => toast("Reviewer assignment is coming soon.")}><I.UserPlus /> Assign Reviewer</button>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Waiting Queue</span><span className="stat-icon purple"><I.Hourglass /></span></div>
          <div className="stat-inline"><span className="stat-value num">47</span><span className="lbl">manuscripts</span></div>
          <div className="stat-foot"><i className="bdot purple" /> In active editorial queue</div>
          <span className="blob purple" />
        </div>
        <div className="card stat tint-red">
          <div className="stat-top"><span className="eyebrow">Waiting Over 48H</span><span className="stat-icon red"><I.Warning /></span></div>
          <div className="stat-inline"><span className="stat-value num red">6</span><span className="pill red">URGENT SLA</span></div>
          <div className="stat-foot" style={{ color: "var(--red)" }}><I.Alert /> Breaching SLA policy &gt; 48 hours</div>
          <span className="blob red" />
        </div>
        <div className="card stat tint-green">
          <div className="stat-top"><span className="eyebrow">Approved Today</span><span className="stat-icon green"><I.CheckCircle /></span></div>
          <div className="stat-inline"><span className="stat-value num">18</span><span className="pill green" style={{ background: "transparent", padding: 0 }}><I.Trend /> +4 vs yesterday</span></div>
          <div className="stat-foot">Pushed to serialization release</div>
          <span className="blob green" />
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Rejected Today</span><span className="stat-icon grey"><I.Ticket /></span></div>
          <div className="stat-inline"><span className="stat-value num">3</span><span className="lbl">revisions requested</span></div>
          <div className="stat-foot"><I.Clock /> Average turnaround 4.2h</div>
          <span className="blob grey" />
        </div>
      </div>

      <section className="card">
        <div className="filterbar">
          <label className="search" style={{ flex: "1 1 260px" }}>
            <I.Search />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by title, author pen name, or manuscript ID" aria-label="Filter submissions" />
          </label>
          <label className="select">Genre: <strong>{genre === "All" ? "All Genres" : genre}</strong> <I.Chevron />
            <select value={genre} onChange={(e) => setGenre(e.target.value)} aria-label="Genre"><option value="All">All Genres</option>{genres.map((g) => <option key={g}>{g}</option>)}</select>
          </label>
          <label className="select">SLA Tier: <strong style={{ color: sla === "All" ? "var(--purple)" : SLA_COLOR[sla] }}>{sla === "All" ? "All SLA Tiers" : SLA_LABEL[sla]}</strong> <I.Chevron />
            <select value={sla} onChange={(e) => setSla(e.target.value as typeof sla)} aria-label="SLA tier">
              <option value="All">All SLA Tiers</option>
              {(["normal", "warning", "urgent"] as SlaTier[]).map((t) => <option key={t} value={t}>{SLA_LABEL[t]}</option>)}
            </select>
          </label>
          <label className="select">Reviewer: <strong>{reviewer === "All" ? "All Statuses" : reviewer}</strong> <I.Chevron />
            <select value={reviewer} onChange={(e) => setReviewer(e.target.value)} aria-label="Reviewer status">
              {["All", "Unassigned", "Assigned", "In Review"].map((r) => <option key={r} value={r}>{r === "All" ? "All Statuses" : r}</option>)}
            </select>
          </label>
          <label className="select">Lang: <strong>{lang === "All" ? "All Languages" : lang}</strong> <I.Chevron />
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language"><option value="All">All Languages</option>{langs.map((l) => <option key={l}>{l}</option>)}</select>
          </label>
          <span className="vdiv" />
          <label className="select" style={{ background: "#fff", border: "1px solid var(--line-2)" }}>
            <I.Sort /> <strong>{SORT_LABEL[sort]}</strong> <I.Chevron />
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort">
              {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => <option key={k} value={k}>{SORT_LABEL[k]}</option>)}
            </select>
          </label>
        </div>

        {selected.size > 0 && (
          <div className="bulkbar">
            <I.CheckCircle width={16} height={16} /> {selected.size} selected
            <span className="spacer" />
            <button className="btn btn-ghost btn-sm" onClick={() => toast(`Reviewer assigned to ${selected.size} manuscript(s).`, "success")}>Assign</button>
            <button className="btn btn-primary btn-sm" onClick={() => { toast(`${selected.size} manuscript(s) approved.`, "success"); setSelected(new Set()); }}>Approve</button>
            <button className="btn btn-sm" style={{ color: "var(--muted)" }} onClick={() => setSelected(new Set())}>Clear</button>
          </div>
        )}

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th className="cb"><span className={`checkbox ${allOn ? "on" : ""}`} role="checkbox" aria-checked={allOn} tabIndex={0} onClick={toggleAll} onKeyDown={(e) => e.key === " " && toggleAll()}>{allOn && <I.Check />}</span></th>
                <th>Cover &amp; Manuscript Title</th>
                <th>Author Pen Name</th>
                <th>Genre &amp; Length</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={5}><div className="empty" style={{ margin: 8 }}>No submissions match these filters.</div></td></tr>
              )}
              {rows.map((s) => {
                const on = selected.has(s.id);
                const tier = slaTier(s);
                return (
                  <tr key={s.id} className={on ? "selected" : ""}>
                    <td className="cb"><span className={`checkbox ${on ? "on" : ""}`} role="checkbox" aria-checked={on} tabIndex={0} onClick={() => toggle(s.id)} onKeyDown={(e) => e.key === " " && toggle(s.id)}>{on && <I.Check />}</span></td>
                    <td>
                      <div className="story-cell">
                        <Cover title={s.title} size="lg" />
                        <div>
                          <div className="t">{s.title} <span className="sid">{s.code}</span></div>
                          <div className="len">{s.length}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="author-cell">
                        <div>
                          <div className="n">{s.author}{s.authorTone === "verified" && <I.Verified />}{s.authorTone === "gold" && <I.Sparkle className="gold" />}</div>
                          <div className={`h ${s.authorTone}`}>{s.authorTone === "plain" ? s.authorNote : s.authorNote.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`pill ${GENRE_PILL[s.genreTone]}`} style={{ fontSize: 12, padding: "5px 11px" }}>{s.genre}</span></td>
                    <td className="date-cell">
                      <b>{s.submittedLabel[0]}</b>
                      <span>{s.submittedLabel[1]}</span>
                      <div className="sla-tag"><i style={{ background: SLA_COLOR[tier] }} />{SLA_LABEL[tier]}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-foot">
          <div className="sla-legend">
            <span className="eyebrow">SLA Thresholds:</span>
            {(["normal", "warning", "urgent"] as SlaTier[]).map((t) => (
              <span key={t} style={{ color: t === "urgent" ? "var(--red)" : undefined }}><i style={{ background: SLA_COLOR[t] }} /> {SLA_LABEL[t]}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span className="rpp">Rows per page: <span className="box">10</span></span>
            <span>Showing <b>1–{rows.length}</b> of <b>47</b> submissions</span>
            <div className="pager">
              <button disabled aria-label="Previous"><I.ChevronL /></button>
              <button className="on">1</button>
              {[2, 3, 4].map((n) => <button key={n} onClick={() => toast(`Page ${n} would load from the API.`)}>{n}</button>)}
              <span className="muted-2">…</span>
              <button aria-label="Next" onClick={() => toast("Page 2 would load from the API.")}><I.ChevronR /></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
