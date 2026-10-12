# Currie The Cross Church, St. Louis

Website for **Currie The Cross Church** (CTCC, “Established by Kingdom”), 4301 Page Blvd. at Page & Pendleton, St. Louis, MO 63113, in the Vandeventer neighborhood. Pastors: **Apostle Marlowe Currie** and **First Lady Dr. Alisha Currie** (see “Confirm with the church”).
Their old curriethecrosschurch.org lapsed; we re-registered it on 2026-10-12. Their live presence is the [Facebook page](https://www.facebook.com/curriethecrosschurch), which has about 757 followers and a Facebook Live for every service.

Live: https://www.curriethecrosschurch.org (apex 308s to www). Registered through Amazon Route 53 (Eli's personal AWS account, auto-renew on, privacy on); DNS is in the Route 53 hosted zone: `A @ 216.150.1.1, 216.150.16.1` + `CNAME www` to the project's Vercel CNAME. The old preview, curriethecrosschurch.dfd.llc, redirects to the live domain.

## Read this before editing (for people and AI assistants)

- **Next.js 16.2 (App Router) + React 19 + Tailwind CSS v4.** This is NOT Next 13/14:
  - Page `params` and `searchParams` are **Promises**. Write `({ params }: { params: Promise<{ slug: string }> })` and `await params`.
  - Never name a component prop `ref`; it is reserved in React 19.
  - Tailwind v4 has no `tailwind.config.js`. Colours and fonts live in `src/app/globals.css` under `:root` and `@theme inline`. Custom classes go inside `@layer components`.
- **Type `& ’ “ ”` as the characters themselves, never as `&amp;` / `&rsquo;`.** An entity inside a multi-line JSX sentence silently eats the space before it. This happened on this site: “ready to run a pickup” rendered as “runa”.
- **Deploys:** every push to `main` auto-deploys on Vercel. Run `npm run build` first. If the type-check fails, the live site does not update.
- **Commit email** must be `Elimark1611@gmail.com`, or Vercel blocks the deploy.
- **Fonts are self-hosted** in `src/fonts/`: Archivo (variable width; squeezed to 68% for the big uppercase headlines) and Instrument Serif italic for the warm lines. Don’t switch to `next/font/google`, because it can fail the Vercel build.

## Where things live

| To change… | Edit |
| --- | --- |
| Service times (homepage, footer, visit, watch, search data) | `weekly` in `src/lib/site.ts` |
| The van: what it needs, fundraising goal, “rolling” switch | `van` in `src/lib/site.ts` |
| Turkey Giveaway & Coat Drive time, coat drop-off deadline | `turkey` in `src/lib/site.ts` |
| Givelify link, Cash App tag | `giving` in `src/lib/site.ts` |
| Pastors, “pastoring since” | `leaders` in `src/lib/site.ts` |
| School / Lee Olas Tees / university / counseling cards | `family` in `src/lib/site.ts` |
| Podcast episodes on /watch | `podcastEpisodes` in `src/lib/site.ts` |
| Address, phone, Facebook | `church` in `src/lib/site.ts` |
| Navigation | `nav` in `src/lib/site.ts` |
| The amber destination sign in the hero | `signMessages` in `src/app/page.tsx` (max ~15 characters each; font in `src/components/DestinationSign.tsx`) |
| The street map and van route | `src/lib/map.ts` (generated from OpenStreetMap, don’t hand-edit) + `src/components/RouteMap.tsx` |
| Logo | `src/components/Logo.tsx` and `src/app/icon.svg` |
| Photos | `public/photos/`. Alt text sits next to each image where it is used |

Anything left as `""` in `site.ts` shows on the site as a dashed “fill in” blank, so nothing is invented.

## The concept

**“No Uber Needed. Christ has already picked you up.”** That line is the church’s own: it’s their best-known shirt on [Lee Olas Tees](https://leeolastees.com) (“No Uber Needed! Christ has already picked me up”). Their Small Church Grant plan (entered 2026-10-09) was: *“get our church van up and running so we can transport our community.”* So the whole site is about the ride:

- **Hero:** an amber dot-matrix **destination sign** from the front of a church van (route “CTCC”), flipping through 4301 PAGE BLVD / NO UBER NEEDED / SUNDAY 11:30 AM / THURSDAY 6 PM / TURKEYS NOV 21. Behind it, the **real streets** around Page & Pendleton (OpenStreetMap). A Sunday pickup loop draws itself in, and a little maroon van drives the route to the church’s brass pin.
- **/ride**: van status (“In the shop” until `van.rolling` is true), what it needs, an optional fundraising meter, a sample stop list, and **“Save me a seat”**, a van-list sign-up that collects pickup location, service, seats, mobility help and kids.
- **/turkey-giveaway**: Saturday Nov 21, 2026, with three sign-ups: get a turkey and coats (household size, coat sizes, needs a ride), bring a coat, and serve. It shows a countdown, and the page turns into a thank-you the day after.
- **Look:** royal blue + red from their CTCC tee, maroon from the van, brass + cream from the sanctuary’s brass cross on its white arch, amber for the sign.

## Sources (research done 2026-10-09)

- **Facebook** (`/curriethecrosschurch`, page id 100077860447306): intro line “We love the Lord God, as well as the people of the Lord God!”, phone (557) 237-1422, Givelify link, and photos (van + team, the van alone, leadership group).
- **Service times** come from Facebook Live start times: Sundays start ~11:25–11:45 AM CT, so **11:30 AM**; Thursdays start ~5:58–6:24 PM, so **6:00 PM**, alternating “Worship Service” and “Bible Study”. Confirm.
- **Bold Journey interview** (July 2025, boldjourney.com/meet-marlowe-currie): the Apostle’s quotes, “pastoring for six years” (so “since 2019”), the move to 4301 Page Blvd., Lee Olas clothing, Currie’s Care Counseling, The Armor of God University. Portrait and preaching photos are from there.
- **Podcast** (podpoint.com/currie-the-cross-church, Apple id 1698305358): 4 episodes from 2023; the feed lists curriethecrosschurch.org, which is now dead.
- **Elevated Minds Christian School** (elevatedmindscps.com, K–5, (314) 656-7794): “My name is Dr. Alisha Currie.”
- **Building history:** St. Louis Genealogical Society says Salem Methodist (founded 1841 under Rev. Ludwig Jacoby) moved into a new church at **Page & Pendleton in 1905**. The building was later Christ Temple Cathedral Church of Christ (Holiness), which now meets in Hazelwood. Google Maps still lists Christ Temple at this address.
- **Giving verified:** giv.li/06so98 → Givelify “Currie The Cross Church, Saint Louis MO”; cash.app/$curriethecrosschurch shows “Currie The Cross Church”.

## Confirm with the church

- **First Lady’s name.** We believe she is **Dr. Alisha Currie** (the school’s director). Confirm, and ask how she likes to be named (First Lady, Co-Pastor, Pastor, Prophetess…). It’s used site-wide via `leaders.lady`.
- **Service times** (11:30 AM Sunday, 6 PM Thursday) and whether Thursday is a worship service, Bible study, or both.
- **The van:** what it needs (`van.needs`), a dollar goal if they want a meter (`van.goal`), and when it’s rolling (`van.rolling = true` flips the copy everywhere).
- **Turkey Giveaway:** start/end time (`turkey.time`) and the last day to drop off coats (`turkey.coatDropOff`).
- **Phone.** The site uses (557) 237-1422 from Facebook and the grant form. Flyers also use (314) 656-7794, which is shown only for the school. Ask which number is the church’s.
- **“A house of prayer on this corner since 1905”** rests on the Salem Methodist record above. Confirm they’re in the original building, and whether they own or rent it.
- **Parking** (blank on /visit), and what they offer for kids.
- **The Armor of God University** (its cert is invalid and Bold Journey linked leeolasclothing.com, which is dead) and **Currie’s Care Counseling**: get working links or contact routes.
- **Photos:** ask for a photo of the building outside (none exists online that we could verify as theirs) and a full-res portrait of the Curries together.

## Rules that keep the site honest

- **Dated things expire by themselves.** Once 2026-11-21 passes, the homepage giveaway block disappears and /turkey-giveaway becomes a thank-you. Keep `export const revalidate = 3600` in `layout.tsx`.
- **“Watch” goes to Facebook**, where they actually go live. No live-stream embed.
- **Photos:** real church photos only. No stock photos and no AI images. The Lee Olas Tees artwork (AI-style illustrations) is linked, not shown.
- **Phone numbers** are stored base64 (`phoneB64`) and assembled in the browser by `src/components/Phone.tsx`. Never type the raw digits into a page.
- **No raw email addresses** on the site. Link to `/contact`.

## Forms

Every form posts to `src/app/api/form/route.ts`, which emails `FORM_TO` (curriethecrosschurch@gmail.com) through Resend, from website@curriethecrosschurch.org. That domain is verified in Resend; its DKIM, SPF, bounce MX and DMARC records are in the Route 53 zone. Env: `RESEND_API_KEY`, `FORM_TO`, `FORM_SECRET`; `FORM_WEBHOOK_URL` (Slack/Teams) is an optional second channel. With no delivery configured, forms answer 503 and honestly tell people to call. Kinds: `ride`, `turkey`, `coat`, `serve`, `visit`, `prayer`, `contact`. Spam defences: signed load-time token, honeypot, per-IP rate limit, no links in free text, first and last name required, and the contact must be a real email or a valid phone number (libphonenumber); random digits are rejected.

## Going live

Done 2026-10-12. For reference: set `NEXT_PUBLIC_SITE_URL` to the real domain (e.g. `https://www.curriethecrosschurch.org`) in Vercel and redeploy. That flips `isDemo` off (the check in `src/lib/site.ts` matches `curriethecrosschurch.org` / `.com`), which unblocks `robots.txt`, removes the `noindex` tag and fixes every canonical and structured-data URL.
