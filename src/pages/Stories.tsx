import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Cover } from "../components/Cover";
import { useToast } from "../components/Toast";
import * as I from "../components/icons";
import { STORIES, STORY_GENRES, type Story } from "../data/stories";

type Sort = "reads-desc" | "reads-asc" | "rating-desc" | "title-asc";
const SORT_LABEL: Record<Sort, string> = {
  "reads-desc": "Reads (High to Low)",
  "reads-asc": "Reads (Low to High)",
  "rating-desc": "Rating (Top first)",
  "title-asc": "Title (A–Z)",
};
const fmt = (n: number) => n.toLocaleString("en-IN");

export function Stories() {
  const { toast } = useToast();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [genre, setGenre] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [language, setLanguage] = useState<string>("All");
  const [premium, setPremium] = useState(false);
  const [view, setView] = useState<"table" | "grid">("table");
  const [sort, setSort] = useState<Sort>("reads-desc");
  const [selected, setSelected] = useState<Set<string>>(new Set(["s1"]));
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses the catalogue search, as the placeholder promises.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const languages = useMemo(() => Array.from(new Set(STORIES.map((s) => s.language.split(" ")[0]))), []);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = STORIES.filter((s) => {
      if (term && ![s.title, s.author, s.code, s.genre, s.handle ?? ""].some((v) => v.toLowerCase().includes(term))) return false;
      if (genre !== "All" && s.genre !== genre) return false;
      if (status !== "All" && s.status !== status) return false;
      if (language !== "All" && !s.language.startsWith(language)) return false;
      if (premium && !s.premium) return false;
      return true;
    });
    const cmp: Record<Sort, (a: Story, b: Story) => number> = {
      "reads-desc": (a, b) => b.reads - a.reads,
      "reads-asc": (a, b) => a.reads - b.reads,
      "rating-desc": (a, b) => b.rating - a.rating,
      "title-asc": (a, b) => a.title.localeCompare(b.title),
    };
    return [...list].sort(cmp[sort]);
  }, [q, genre, status, language, premium, sort]);

  const setQ = (v: string) => setParams(v ? { q: v } : {}, { replace: true });
  const reset = () => { setQ(""); setGenre("All"); setStatus("All"); setLanguage("All"); setPremium(false); setSort("reads-desc"); };
  const filtered = q || genre !== "All" || status !== "All" || language !== "All" || premium;

  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const allOn = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggleAll = () => setSelected(allOn ? new Set() : new Set(rows.map((r) => r.id)));

  return (
    <>
      <div className="breadcrumb">
        <div className="crumbs">
          <span>Catalogue Management</span><span className="sep">›</span>
          <span>Stories Repository</span><span className="sep">›</span>
          <b>All Manuscripts</b>
        </div>
        <span className="synced"><i className="live-dot" /> Last synced: 2 mins ago <I.Refresh /></span>
      </div>

      <div className="page-head">
        <div>
          <h1>Stories <span className="pill lg" style={{ background: "var(--bg-2)", color: "var(--ink-2)", fontFamily: "var(--sans)" }}>12,480 Titles</span></h1>
          <p className="lede">Manage digitized manuscripts, serialized epics, and audio-adapted narratives across regional Indian literary traditions.</p>
        </div>
        <div className="head-actions">
          <div className="row" style={{ marginTop: 8 }}>
            <button className="btn btn-soft" onClick={() => toast("Catalog export (CSV) queued.", "success")}><I.Download /> Export Catalog</button>
            <button className="btn btn-primary" onClick={() => toast("Story composer is coming soon.")}><I.Plus /> Create New Story</button>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Total Manuscripts</span><span className="stat-icon purple"><I.Book /></span></div>
          <div className="stat-inline"><span className="stat-value num sm">12,480</span><span className="pill purple">+8.4% YoY</span></div>
          <div className="stat-foot">Across 8 languages &amp; 24 genres</div>
          <span className="blob purple" />
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Live &amp; Circulating</span><span className="stat-icon grey"><I.Globe /></span></div>
          <div className="stat-inline"><span className="stat-value num sm">9,842</span><span className="pill grey">78.8% Active</span></div>
          <div className="stat-foot">3.8M weekly reader interactions</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Pipeline &amp; Review</span><span className="stat-icon orange"><I.Clock /></span></div>
          <div className="stat-inline"><span className="stat-value num sm">2,118</span><span className="pill orange">142 In Review</span></div>
          <div className="stat-foot">Avg 3.4 days editorial turnaround</div>
        </div>
        <div className="card stat">
          <div className="stat-top"><span className="eyebrow">Premium Paywalled</span><span className="stat-icon purple"><I.Lock /></span></div>
          <div className="stat-inline"><span className="stat-value num sm">4,520</span><span className="pill purple">₹18.6M ARR</span></div>
          <div className="stat-foot">36.2% catalog monetization</div>
        </div>
      </div>

      <section className="card">
        <div className="filterbar">
          <label className="search">
            <I.Search />
            <input ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by manuscript title, author pen name, ISBN, story ID... (Press '/' to focus)" aria-label="Search catalogue" />
            <span className="kbd">/</span>
          </label>
          <div className="segmented">
            <button className={view === "table" ? "on" : ""} onClick={() => setView("table")}><I.TableIcon /> Table</button>
            <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}><I.GridIcon /> Grid</button>
          </div>
          <label className="select">
            <I.Sort /> Sort: <strong>{SORT_LABEL[sort]}</strong> <I.Chevron />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
              {(Object.keys(SORT_LABEL) as Sort[]).map((k) => <option key={k} value={k}>{SORT_LABEL[k]}</option>)}
            </select>
          </label>
        </div>
        <div className="chips">
          <button className={`chip ${genre === "All" ? "on" : ""}`} onClick={() => setGenre("All")}>All Genres (12,480)</button>
          {STORY_GENRES.map((g) => (
            <button key={g} className={`chip ${genre === g ? "on" : ""}`} onClick={() => setGenre(genre === g ? "All" : g)}>{g}</button>
          ))}
          <span className="vdiv" />
          <label className="select" style={{ padding: "6px 12px", borderRadius: 999 }}>
            Language: <strong>{language === "All" ? `All (${languages.length})` : language}</strong> <I.Chevron />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language">
              <option value="All">All</option>
              {languages.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label className="select" style={{ padding: "6px 12px", borderRadius: 999 }}>
            Status: <strong>{status}</strong> <I.Chevron />
            <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
              {["All", "Live", "Suspended", "Draft"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <button className={`chip ${premium ? "on" : ""}`} onClick={() => setPremium((p) => !p)}><I.Crown style={{ color: premium ? "#fde68a" : "#d4a017" }} /> Premium Only</button>
          <button className="reset" onClick={reset} disabled={!filtered} style={{ opacity: filtered ? 1 : 0.45 }}><I.Refresh /> Reset Filters</button>
        </div>

        {view === "table" ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th className="cb"><span className={`checkbox ${allOn ? "on" : ""}`} role="checkbox" aria-checked={allOn} tabIndex={0} onClick={toggleAll} onKeyDown={(e) => e.key === " " && toggleAll()}>{allOn && <I.Check />}</span></th>
                  <th>Story Details</th>
                  <th>Author</th>
                  <th>Genre &amp; Language</th>
                  <th className="r">Chapters</th>
                  <th className="r">Reads</th>
                  <th className="r">Rating</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td colSpan={7}><div className="empty" style={{ margin: 8 }}>No manuscripts match these filters.</div></td></tr>
                )}
                {rows.map((s) => {
                  const on = selected.has(s.id);
                  return (
                    <tr key={s.id} className={`${on ? "selected" : ""} ${s.suspended ? "dim" : ""}`}>
                      <td className="cb"><span className={`checkbox ${on ? "on" : ""}`} role="checkbox" aria-checked={on} tabIndex={0} onClick={() => toggle(s.id)} onKeyDown={(e) => e.key === " " && toggle(s.id)}>{on && <I.Check />}</span></td>
                      <td>
                        <div className="story-cell">
                          <Cover title={s.title} badge={s.epic ? "EPIC" : undefined} />
                          <div>
                            <div className={`t ${s.suspended ? "strike" : ""}`}>{s.title}</div>
                            <div className={`id ${s.suspended ? "red" : ""}`}>{s.code}</div>
                            <div className="d">{s.blurb}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="author-cell">
                          <Avatar name={s.author} size="sm" soft={s.suspended} />
                          <div>
                            <div className="n">{s.author}{s.verified && <I.Verified />}</div>
                            <div className={`h ${s.suspended ? "red" : ""}`}>{s.suspended ? "Suspended" : s.handle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="genre-cell"><b>{s.genre}</b><div className="lang"><i style={{ background: s.langTone }} />{s.language}</div></td>
                      <td className="numcell"><b>{s.chapters}</b><span>chapters</span></td>
                      <td className="numcell"><b>{fmt(s.reads)}</b><span>reads</span></td>
                      <td className="numcell">
                        <b><span className={`rating ${s.suspended ? "grey" : ""}`}>{s.suspended ? <I.StarOutline /> : <I.Star />} {s.rating.toFixed(1)}</span></b>
                        <span>({s.ratingCount})</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid-view">
            {rows.map((s) => (
              <div key={s.id} className="gcard" onClick={() => toast(`“${s.title}” reader opens in the Story Details screen.`)}>
                <Cover title={s.title} badge={s.epic ? "EPIC" : undefined} />
                <div className="t">{s.title}</div>
                <div className="m">{s.author} · {s.genre}</div>
                <div className="f"><span>{fmt(s.reads)} reads</span><span className="rating"><I.Star /> {s.rating.toFixed(1)}</span></div>
              </div>
            ))}
          </div>
        )}

        <div className="table-foot">
          <span>Showing <b>1–{rows.length}</b> of <b>12,480</b> manuscripts &nbsp;|&nbsp; <span className="rpp">Rows per page: <span className="box">10</span></span></span>
          <div className="pager">
            <button disabled aria-label="Previous"><I.ChevronL /></button>
            <button className="on">1</button>
            <button onClick={() => toast("Page 2 would load from the API.")}>2</button>
            <button onClick={() => toast("Page 3 would load from the API.")}>3</button>
            <span className="muted-2">…</span>
            <button onClick={() => toast("Jumping to the last page.")}>1,560</button>
            <button aria-label="Next" onClick={() => toast("Page 2 would load from the API.")}><I.ChevronR /></button>
          </div>
        </div>
      </section>

      <section className="card directive">
        <span className="bulb"><I.Bulb /></span>
        <div className="grow">
          <h4>Curator Performance Directive</h4>
          <p>Serialized epics with dedicated chapter illustrations experience <b>3.2x higher completion rates</b>. Premium paywalled collections in regional languages are currently yielding an average <b>68% author retention</b> spike.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => toast("Royalty benchmark lives under Revenue.", "warn")}>View Royalty Benchmark</button>
      </section>
    </>
  );
}
