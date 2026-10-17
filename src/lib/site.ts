/**
 * Everything the church might want to change lives in this file.
 * Anything left as "" shows on the site as a dashed "fill in" blank, so nothing is invented.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curriethecrosschurch.dfd.llc";
/** Demo builds stay out of search engines until the real domain is set. */
export const isDemo = !/curriethecrosschurch\.(org|com)$/.test(new URL(siteUrl).hostname);

export const TZ = "America/Chicago";

export const church = {
  name: "Currie The Cross Church",
  short: "CTCC",
  tagline: "Established by Kingdom",
  welcome: "We love the Lord God, as well as the people of the Lord God!",
  street: "4301 Page Blvd.",
  corner: "Page & Pendleton",
  neighborhood: "Vandeventer",
  city: "St. Louis",
  stateCode: "MO",
  zip: "63113",
  geo: { lat: 38.653318, lng: -90.244072 },
  /** (557) 237-1422, the number on their Facebook page. Base64 so scrapers can't read it; see components/Phone.tsx. */
  phoneB64: "NTU3MjM3MTQyMg==",
  facebook: "https://www.facebook.com/curriethecrosschurch",
  directions: "https://www.google.com/maps/dir/?api=1&destination=4301+Page+Blvd,+St.+Louis,+MO+63113",
  podcast: "https://podcasts.apple.com/us/podcast/currie-the-cross-church/id1698305358",
};

export const leaders = {
  apostle: { title: "Apostle", name: "Marlowe Currie" },
  /** Dr. Alisha Currie co-leads the ministry and schools with Apostle Currie. */
  lady: { title: "First Lady", name: "Dr. Alisha Currie" },
  pastoringSince: "2018",
};

export type Service = {
  name: string;
  day: string;
  byDay: string;
  start: string; // 24h, for structured data
  time: string;
  note: string;
};

/** Times come from when their Facebook Lives start (Sundays ~11:25, Thursdays ~6:00, Central). */
export const weekly: Service[] = [
  {
    name: "Sunday Worship",
    day: "Sunday",
    byDay: "Sunday",
    start: "11:00",
    time: "11:00 AM",
    note: "Praise, the Word, and the whole family. Live on Facebook too.",
  },
  {
    name: "Thursday Night Service",
    day: "Thursday",
    byDay: "Thursday",
    start: "18:00",
    time: "6:00 PM",
    note: "Worship one week, Bible study the next. Bring your Bible and your questions.",
  },
];

export const giving = {
  givelify: "https://giv.li/06so98",
  cashtag: "$curriethecrosschurch",
  cashApp: "https://cash.app/$curriethecrosschurch",
};

/** The church van: the Small Church Grant plan. Fill these in as the church tells us. */
export const van = {
  what: "15-passenger Ford van",
  /** What it needs to get back on the road, e.g. "Transmission", "Tires", "Insurance". */
  needs: ["", "", ""] as string[],
  /** Dollar goal and how much is in so far. Leave goal at 0 to hide the meter. */
  goal: 0,
  raised: 0,
  /** Flip to true when the van is running and rides are being given. */
  rolling: false,
};

export type ChurchEvent = {
  slug?: string;
  title: string;
  /** First day, YYYY-MM-DD */
  date: string;
  /** Last day it should show, YYYY-MM-DD. Defaults to `date`. */
  endsOn?: string;
  time: string;
  where: string;
  blurb: string;
  href?: string;
};

export const events: ChurchEvent[] = [
  {
    slug: "turkey-giveaway",
    title: "Turkey Giveaway & Coat Drive",
    date: "2026-11-21",
    time: "",
    where: "4301 Page Blvd.",
    blurb: "A turkey for the table and a warm coat for the winter, free to our neighbors. Sign up, bring a coat, or come serve.",
    href: "/turkey-giveaway",
  },
];

export const turkey = {
  date: "2026-11-21",
  /** Start/end time, e.g. "10 AM – 1 PM". */
  time: "",
  where: "4301 Page Blvd. (Page & Pendleton)",
  /** Last day to drop off coats, e.g. "Sunday, November 15". */
  coatDropOff: "",
};

/** Ministries the Curries lead alongside the church. */
export const family = [
  {
    name: "Elevated Minds Christian School",
    what: "K–5 Christian private school led by Dr. Alisha Currie. Small classes, weekly chapel, strong academics. Now enrolling.",
    href: "https://www.elevatedmindscps.com",
    phoneB64: "MzE0NjU2Nzc5NA==",
  },
  {
    name: "Lee Olas Tees",
    what: "Wear the Word: “No Uber Needed”, “Sin Debt Paid”, “Faith Ova Finances” and the CTCC tee.",
    href: "https://leeolastees.com",
  },
  {
    name: "The Armor of God University",
    what: "Associate and Bachelor’s degrees in Theology.",
    href: "",
  },
  {
    name: "Currie’s Care Counseling",
    what: "Christian counseling. Ask the church office how to set up a time.",
    href: "",
  },
];

/** Sermons from their podcast feed (podpoint.com/feed/11607). */
export const podcastEpisodes = [
  { title: "Don’t Team Up With The World, Pt. 2", date: "September 6, 2023", who: "Apostle Currie", mins: 21 },
  { title: "The Renewal Of The Mind", date: "August 2, 2023", who: "Apostle & First Lady Currie", mins: 22 },
  { title: "Cultivate", date: "July 19, 2023", who: "Apostle Marlowe Currie", mins: 43 },
  { title: "A Word", date: "July 18, 2023", who: "Apostle Marlowe Currie", mins: 37 },
];

export const nav = [
  { href: "/visit", label: "Visit" },
  { href: "/ride", label: "The Van" },
  { href: "/turkey-giveaway", label: "Nov 21" },
  { href: "/watch", label: "Watch" },
  { href: "/about", label: "About" },
  { href: "/give", label: "Give" },
];

/* ---------- date helpers (always St. Louis time) ---------- */

export function todayISO() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function upcomingEvents() {
  const today = todayISO();
  return events.filter((e) => (e.endsOn ?? e.date) >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function prettyDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
}

export function turkeyIsPast() {
  return todayISO() > turkey.date;
}
