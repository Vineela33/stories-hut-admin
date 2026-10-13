import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Dashboard = (p: P) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M3 10h18M10 10v11" /></svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><circle cx="12" cy="11" r="2.2" /></svg>
);
export const Users = (p: P) => (
  <svg {...base(p)}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M21 19c0-2.4-1.6-4.3-3.8-4.9" /></svg>
);
export const Feather = (p: P) => (
  <svg {...base(p)}><path d="M20 4c-5 0-9 2-11 6s-2 8-2 8 4 0 8-2 6-6 5-12z" /><path d="M4 20l9-9" /></svg>
);
export const Book = (p: P) => (
  <svg {...base(p)}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" /><path d="M4 19a2 2 0 012-2h13" /><path d="M9 7h6" /></svg>
);
export const Inbox = (p: P) => (
  <svg {...base(p)}><path d="M4 4h16v16H4z" /><path d="M4 14h4l2 3h4l2-3h4" /></svg>
);
export const Gavel = (p: P) => (
  <svg {...base(p)}><path d="M14 4l6 6-4 4-6-6z" /><path d="M11 9l-7 7 3 3 7-7" /><path d="M4 21h9" /></svg>
);
export const Chart = (p: P) => (
  <svg {...base(p)}><path d="M4 19l5-6 4 3 7-9" /><path d="M4 21h16" /></svg>
);
export const Wallet = (p: P) => (
  <svg {...base(p)}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18" /><path d="M15 15h3" /></svg>
);
export const Tag = (p: P) => (
  <svg {...base(p)}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>
);
export const Bell = (p: P) => (
  <svg {...base(p)}><path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2z" /><path d="M10 20a2 2 0 004 0" /></svg>
);
export const Activity = (p: P) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M7 14l3-4 3 3 4-5" /></svg>
);
export const Settings = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" /></svg>
);
export const Search = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const Help = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.8-2.5 2-2.5 4" /><path d="M12 17h.01" /></svg>
);
export const Chevron = (p: P) => (
  <svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>
);
export const ChevronL = (p: P) => (
  <svg {...base(p)}><path d="M15 6l-6 6 6 6" /></svg>
);
export const ChevronR = (p: P) => (
  <svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
export const External = (p: P) => (
  <svg {...base(p)}><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" /></svg>
);
export const Download = (p: P) => (
  <svg {...base(p)}><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M4 20h16" /></svg>
);
export const Megaphone = (p: P) => (
  <svg {...base(p)}><path d="M3 10v4a1 1 0 001 1h3l7 4V5L7 9H4a1 1 0 00-1 1z" /><path d="M17 9a3 3 0 010 6" /></svg>
);
export const Calendar = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
);
export const Trend = (p: P) => (
  <svg {...base(p)}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)} strokeWidth={3}><path d="M5 12l5 5L20 7" /></svg>
);
export const CheckCircle = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
);
export const Verified = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none"><path d="M12 2l2.4 1.8 3-.3 1 2.8 2.6 1.5-.7 2.9 1.5 2.6-2.2 2-.1 3-2.9.9-1.6 2.5-2.8-1.1L9.4 22l-1.6-2.5-2.9-.9-.1-3-2.2-2 1.5-2.6-.7-2.9 2.6-1.5 1-2.8 3 .3z" /><path d="M8.5 12.2l2.3 2.3 4.7-4.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Star = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" /></svg>
);
export const StarOutline = (p: P) => (
  <svg {...base(p)}><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8z" /></svg>
);
export const Warning = (p: P) => (
  <svg {...base(p)}><path d="M12 3l10 18H2z" /><path d="M12 10v4M12 17.5h.01" /></svg>
);
export const Alert = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Hourglass = (p: P) => (
  <svg {...base(p)}><path d="M6 3h12M6 21h12" /><path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" /></svg>
);
export const Bot = (p: P) => (
  <svg {...base(p)}><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" /></svg>
);
export const Refresh = (p: P) => (
  <svg {...base(p)}><path d="M20 12a8 8 0 01-14.5 4.6" /><path d="M4 12a8 8 0 0114.5-4.6" /><path d="M19 3v5h-5M5 21v-5h5" /></svg>
);
export const Home = (p: P) => (
  <svg {...base(p)}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" /></svg>
);
export const Shuffle = (p: P) => (
  <svg {...base(p)}><path d="M4 7h4l8 10h4M4 17h4M16 7h4" /><path d="M18 4l3 3-3 3M18 14l3 3-3 3" /></svg>
);
export const UserPlus = (p: P) => (
  <svg {...base(p)}><circle cx="10" cy="8" r="3.5" /><path d="M3 20c0-3.9 3.1-7 7-7 1.5 0 2.9.5 4 1.2" /><path d="M19 15v6M16 18h6" /></svg>
);
export const Sort = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h10M4 17h6" /></svg>
);
export const TableIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 10h18M3 15h18M10 4v16" /></svg>
);
export const GridIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
);
export const Crown = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" /></svg>
);
export const Lock = (p: P) => (
  <svg {...base(p)}><rect x="5" y="10" width="14" height="11" rx="2.5" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
);
export const Globe = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>
);
export const Bulb = (p: P) => (
  <svg {...base(p)}><path d="M9 18h6M10 21h4" /><path d="M8 13a5 5 0 118 0c-.8.9-1.2 1.7-1.2 3H9.2c0-1.3-.4-2.1-1.2-3z" /></svg>
);
export const Pie = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 3v9h9" /></svg>
);
export const Receipt = (p: P) => (
  <svg {...base(p)}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></svg>
);
export const Ticket = (p: P) => (
  <svg {...base(p)}><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M12 6v12" /></svg>
);
export const Sparkle = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" /></svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
