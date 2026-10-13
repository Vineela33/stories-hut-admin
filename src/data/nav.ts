export type NavKey =
  | "dashboard" | "admins" | "users" | "authors" | "stories" | "submissions"
  | "moderation" | "analytics" | "revenue" | "categories" | "notifications" | "activity" | "settings";

export type NavItem = { key: NavKey; label: string; to?: string; count?: number; countTone?: "orange" | "amber" };

/** Items without a route are placeholders until their screens ship. */
export const NAV: NavItem[] = [
  { key: "dashboard", label: "Dashboard", to: "/" },
  { key: "admins", label: "Admins" },
  { key: "users", label: "Users" },
  { key: "authors", label: "Authors" },
  { key: "stories", label: "Stories", to: "/stories" },
  { key: "submissions", label: "Submissions", to: "/submissions", count: 47, countTone: "orange" },
  { key: "moderation", label: "Moderation", count: 12, countTone: "amber" },
  { key: "analytics", label: "Analytics" },
  { key: "revenue", label: "Revenue" },
  { key: "categories", label: "Categories" },
  { key: "notifications", label: "Notifications" },
  { key: "activity", label: "Activity" },
  { key: "settings", label: "Settings" },
];
