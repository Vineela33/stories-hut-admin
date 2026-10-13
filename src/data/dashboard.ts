export type PendingItem = {
  id: string;
  title: string;
  genre: string;
  author: string;
  words: string;
};

export const PENDING: PendingItem[] = [
  { id: "p1", title: "The Whispers of Varanasi", genre: "Historical Fiction", author: "Kavita Sengupta", words: "64,200" },
  { id: "p2", title: "Echoes Beyond the Monsoon", genre: "Literary Drama", author: "Arjun Nair", words: "48,500" },
  { id: "p3", title: "Shadows in the Deodar Forest", genre: "Mystery Thriller", author: "Meera Deshmukh", words: "82,000" },
  { id: "p4", title: "The Bengaluru Algorithm", genre: "Sci-Fi / Tech", author: "Rohan Varma", words: "35,100" },
];

export type Report = {
  id: string;
  severity: "critical" | "high" | "medium";
  kind: "copyright" | "explicit" | "other";
  when: string;
  title: string;
  by: string;
  status: string;
  statusTone: "red" | "amber" | "grey";
  cta?: string;
};

export const REPORTS: Report[] = [
  {
    id: "r1", severity: "critical", kind: "copyright", when: "24m ago",
    title: "Potential Plagiarism / Copyright claim on 'Starlight Valley Ch. 4'",
    by: "Claimed by: Harper Collins India rep", status: "Needs Escalation", statusTone: "red",
    cta: "Inspect Differences",
  },
  {
    id: "r2", severity: "high", kind: "explicit", when: "1h 15m ago",
    title: "Graphic content unflagged in Teen category: “Midnight Rendezvous”",
    by: "Reported by: Reader #88204", status: "Under Review", statusTone: "amber",
  },
  {
    id: "r3", severity: "medium", kind: "other", when: "3h ago",
    title: "Impersonation claim on Author profile: Targeting Vikram Seth fan guild",
    by: "Author desk notice", status: "Investigating", statusTone: "grey",
  },
];

export const GENRES = [
  { name: "Romance & Drama", pct: 34, count: "84.4k", color: "#7c3aed" },
  { name: "Thriller & Mystery", pct: 28, count: "69.5k", color: "#7c4a1e" },
  { name: "Historical Fiction", pct: 18, count: "44.6k", color: "#f6a94a" },
  { name: "Sci-Fi & Tech", pct: 12, count: "29.7k", color: "#4b4b55" },
  { name: "Poetry & Essays", pct: 8, count: "19.8k", color: "#c9b6ee" },
];

export const LEDGER = [
  { id: "l1", who: "Priya Patel", html: ["Priya Patel (Content Lead)", " approved ", "em:The Silent Sitar", " by Devdutt R."], when: "12 mins ago" },
  { id: "l2", who: "Amit Roy", html: ["Amit Roy (Finance Admin)", " processed payout batch of ", "b:₹4,12,000", " to 48 Authors."], when: "45 mins ago" },
  { id: "l3", who: "bot", html: ["System Bot", " flagged 3 duplicate submission files during ingestion scan."], when: "2 hours ago" },
  { id: "l4", who: "Ananya Sharma", html: ["Ananya Sharma (You)", " updated Global Subscription pricing tiers for Diwali Campaign."], when: "4 hours ago" },
];

/** Daily active users, Oct 18 → Oct 24 */
export const DAU = [14800, 16200, 17900, 19600, 24180, 22900, 23600];
export const SIGNUPS = [8200, 9100, 9800, 10900, 12400, 13600, 15200];
export const DAYS = ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24 (Today)"];
