export type Submission = {
  id: string;
  code: string;
  title: string;
  length: string;
  words: number;
  author: string;
  authorNote: string;
  authorTone: "gold" | "verified" | "plain";
  genre: string;
  genreTone: "amber" | "grey" | "purple" | "orange";
  language: string;
  submitted: string; // ISO
  submittedLabel: [string, string];
  reviewer: "Unassigned" | "In Review" | "Assigned";
};

export const SUBMISSIONS: Submission[] = [
  { id: "sub1", code: "#SUB-8902", title: "Echoes of the Sahyadri", length: "14 Chapters · 42,000 words", words: 42000, author: "Devdutt Sharma", authorNote: "Gold Author", authorTone: "gold", genre: "Historical Fiction", genreTone: "amber", language: "English", submitted: "2023-10-22T10:15:00+05:30", submittedLabel: ["Oct 22, 2023", "10:15 AM"], reviewer: "Unassigned" },
  { id: "sub2", code: "#SUB-8904", title: "Midnight in Fort Kochi", length: "8 Chapters · 28,500 words", words: 28500, author: "Arundhati Varma", authorNote: "First-time Contributor", authorTone: "plain", genre: "Mystery & Crime", genreTone: "grey", language: "English", submitted: "2023-10-22T14:40:00+05:30", submittedLabel: ["Oct 22, 2023", "02:40 PM"], reviewer: "Unassigned" },
  { id: "sub3", code: "#SUB-8911", title: "The Cinnamon Vendor's Daughter", length: "22 Chapters · 65,000 words", words: 65000, author: "Kavita Menon", authorNote: "Verified Author", authorTone: "verified", genre: "Contemporary Romance", genreTone: "purple", language: "Malayalam", submitted: "2023-10-23T11:30:00+05:30", submittedLabel: ["Oct 23, 2023", "11:30 AM"], reviewer: "Assigned" },
  { id: "sub4", code: "#SUB-8918", title: "Chronicles of Neo-Varanasi", length: "5 Chapters · 16,200 words", words: 16200, author: "Tanmay Saxena", authorNote: "3 published books", authorTone: "plain", genre: "Sci-Fi & Speculative", genreTone: "grey", language: "Hindi", submitted: "2023-10-24T09:12:00+05:30", submittedLabel: ["Oct 24, 2023", "09:12 AM"], reviewer: "In Review" },
  { id: "sub5", code: "#SUB-8924", title: "The Serpent's Whisper", length: "18 Chapters · 54,000 words", words: 54000, author: "Meera Iyer", authorNote: "Verified Author", authorTone: "verified", genre: "Mythological Fantasy", genreTone: "purple", language: "Tamil", submitted: "2023-10-24T13:20:00+05:30", submittedLabel: ["Oct 24, 2023", "01:20 PM"], reviewer: "Unassigned" },
  { id: "sub6", code: "#SUB-8930", title: "Ghazals in the Monsoon Mist", length: "30 Poems · 8,400 words", words: 8400, author: "Farhan Zaidi", authorNote: "Poet Laureate nominee", authorTone: "plain", genre: "Poetry & Anthologies", genreTone: "orange", language: "Urdu", submitted: "2023-10-24T16:05:00+05:30", submittedLabel: ["Oct 24, 2023", "04:05 PM"], reviewer: "Unassigned" },
];

/** "Now" for the design snapshot (Oct 24, 2023 ~5 PM IST) so SLA tiers match the Figma legend. */
export const SNAPSHOT_NOW = new Date("2023-10-24T17:00:00+05:30").getTime();

export type SlaTier = "normal" | "warning" | "urgent";
export function slaTier(s: Submission): SlaTier {
  const hours = (SNAPSHOT_NOW - new Date(s.submitted).getTime()) / 36e5;
  if (hours > 48) return "urgent";
  if (hours > 24) return "warning";
  return "normal";
}
export const SLA_LABEL: Record<SlaTier, string> = { normal: "<24h Normal SLA", warning: "24h–48h Warning", urgent: ">48h Urgent Breach" };
export const SLA_COLOR: Record<SlaTier, string> = { normal: "#5e5a66", warning: "#f59e0b", urgent: "#c62828" };
