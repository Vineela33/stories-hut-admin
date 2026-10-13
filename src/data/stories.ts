export type Story = {
  id: string;
  code: string;
  title: string;
  blurb: string;
  epic?: boolean;
  author: string;
  handle?: string;
  verified?: boolean;
  suspended?: boolean;
  genre: string;
  language: string;
  langTone: string;
  chapters: number;
  reads: number;
  rating: number;
  ratingCount: string;
  premium?: boolean;
  status: "Live" | "Suspended" | "Draft";
};

export const STORIES: Story[] = [
  { id: "s1", code: "#ST-8901", title: "The Queens of Mahishmati", blurb: "Two sovereign sisters contest the dynastic throne of a mountain kingdom.", epic: true, author: "Meera Iyer", handle: "@meeraiyer_lit", verified: true, genre: "Mythological Fiction", language: "English", langTone: "#6b2fe6", chapters: 42, reads: 1420000, rating: 4.9, ratingCount: "18.4K", premium: true, status: "Live" },
  { id: "s2", code: "#ST-7412", title: "Song of the Kaveri", blurb: "Sangam-era verse saga detailing a temple dancer's quiet rebellion.", author: "Meera Iyer", handle: "@meeraiyer_lit", verified: true, genre: "Sangam Folklore", language: "Tamil (தமிழ்)", langTone: "#0f766e", chapters: 32, reads: 980500, rating: 4.8, ratingCount: "11.2K", premium: true, status: "Live" },
  { id: "s3", code: "#ST-6304", title: "Shadows of the Chola Crown", blurb: "Maritime conspiracies, espionage on merchant ships of the Coromandel.", author: "Vikram Seth", handle: "@vikramseth_auth", verified: true, genre: "Historical Thriller", language: "English", langTone: "#6b2fe6", chapters: 38, reads: 820000, rating: 4.7, ratingCount: "9.5K", status: "Live" },
  { id: "s4", code: "#ST-5521", title: "The Midnight Ghazals of Ghalib", blurb: "Annotated poetic ruminations on longing, exile and the lamp-lit city.", author: "Tanvi Deshmukh", handle: "@tanvi_ghazal", verified: true, genre: "Poetry & Ghazals", language: "Urdu & Hindi", langTone: "#c2410c", chapters: 14, reads: 410200, rating: 4.9, ratingCount: "5.1K", premium: true, status: "Live" },
  { id: "s5", code: "#ST-4190", title: "Dharavi 2088: Silicon Syndicate", blurb: "Biotech hackers construct neural sanctuaries beneath a drowned Mumbai.", author: "Rohan Kumar Sen", handle: "@rohan_sen_sf", genre: "Sci-Fi & Speculative", language: "English", langTone: "#6b2fe6", chapters: 24, reads: 145000, rating: 4.6, ratingCount: "2.8K", status: "Live" },
  { id: "s6", code: "#ST-3902", title: "Whispers of the Nilgiri Hills", blurb: "An estranged botanical archivist returns home to a tea estate in mourning.", author: "Devika Ramanathan", handle: "@devika_ram", genre: "Contemporary Romance", language: "Malayalam (മലയാളം)", langTone: "#b45309", chapters: 8, reads: 24000, rating: 4.5, ratingCount: "820", status: "Live" },
  { id: "s7", code: "#ST-2811", title: "The Bronze Sculptor's Secret", blurb: "Content restricted pending manuscript rights verification.", author: "Kabir Mehta", suspended: true, genre: "Historical Drama", language: "Hindi (हिन्दी)", langTone: "#6e6a74", chapters: 28, reads: 540000, rating: 4.4, ratingCount: "3.9K", status: "Suspended" },
  { id: "s8", code: "#ST-1194", title: "The Scent of Wet Vetiver", blurb: "Three generations of Karnataka perfumers guard a vanishing attar recipe.", author: "Radhika Jayaram", handle: "@radhikaj_lit", genre: "Literary Drama", language: "Kannada (ಕನ್ನಡ)", langTone: "#15803d", chapters: 18, reads: 40200, rating: 4.8, ratingCount: "1.2K", status: "Live" },
];

export const STORY_GENRES = [
  "Mythological Fiction",
  "Contemporary Romance",
  "Historical Thriller",
  "Horror & Folklore",
  "Sci-Fi & Speculative",
  "Poetry & Ghazals",
];
