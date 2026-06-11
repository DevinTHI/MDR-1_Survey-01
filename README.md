# survey-site · Deployable Folder

*Devin De Mel — MDR Thesis — Keio Media Design — 2026*

This folder is the **production version** of the Cycle 1 surveys — everything a participant needs to use the surveys via a public URL. Upload this folder (its contents, not the folder itself) to your static host.

---

## What's in this folder

| File | Purpose |
|---|---|
| `index.html` | Welcome page · participant entry point. |
| `Cycle1A_Survey.html` | Language framing survey (5 framings × 4 questions). |
| `Cycle1B_Survey.html` | Interaction paradigm survey (5 paradigms × 4 questions). |
| `GoogleSheets_AppsScript.gs` | *Optional.* Apps Script code for the Google Sheets backend, kept here for reference if you ever wire it up. The site works without this file. |
| `README.md` | This document. |

That's all. Five files, no dependencies, no build step, no backend required.

---

## How participants use it

1. Open the host URL (e.g. `https://your-username.github.io/mdr-cycle-1/`).
2. Land on `index.html` — a welcome card explaining the study, time commitment, and privacy.
3. Click **Start the survey →**, which opens `Cycle1A_Survey.html`.
4. Complete demographics, then rate the five language framings.
5. Click **Continue to interaction-paradigm survey** — auto-routed to `Cycle1B_Survey.html?framing=X` with the winning framing as a URL parameter.
6. Complete the five interaction-paradigm ratings.
7. Click **Done** — JSON file downloads automatically.

Result screens at the end of each survey show their winner card, scorecard with per-dimension sub-scores, and two download buttons (CSV and JSON).

---

## How you upload it

### GitHub Pages (recommended for the long term)

1. Go to **github.com → New repository** → name it `mdr-cycle-1` → Public → Add README.
2. Click **Add file → Upload files** → drag **the contents of this folder** (not the folder itself) onto the upload area.
3. Commit changes.
4. **Settings → Pages → Source: main / root → Save.**
5. Wait 1–5 minutes. Your URL is `https://your-username.github.io/mdr-cycle-1/`.

### Netlify Drop (recommended for a 60-second demo)

1. Open **app.netlify.com/drop** in your browser.
2. Drag this folder onto the page.
3. Wait 10 seconds. Your URL is `https://random-name-1234.netlify.app/`.

For the full step-by-step including QR codes and kiosk mode, see `Hosting_Guide.md` in the parent project folder.

---

## Sharing the URL with participants

The cleanest share is the host URL ending at the folder root, e.g. `https://your-username.github.io/mdr-cycle-1/`. Participants land on `index.html` automatically.

If you want to skip the welcome page and drop participants straight onto the survey, share `https://your-username.github.io/mdr-cycle-1/Cycle1A_Survey.html` instead.

For in-person sessions, generate a QR code from your URL using **qr-code-generator.com** (free, no login), print it, and place it next to the kiosk or include it in your briefing slide.

---

## Updating

You'll iterate on the survey files in the parent project folder (`Cycle1A_Survey.html`, `Cycle1B_Survey.html`). After any change:

1. Copy the updated files into this `survey-site/` folder.
2. Push the changes to your host (re-upload to GitHub Pages, or drag the folder onto Netlify Drop again).

The two-folder pattern keeps your iteration workspace separate from your deployed version — you can break things in the parent folder without breaking what participants see.

---

## Optional · Enable Google Sheets sync later

If at some point you decide you want responses logged to a Google Sheet instead of (or in addition to) local downloads:

1. Follow the Google Sheets setup in `Surveys_README.md` (parent folder).
2. Paste the Apps Script Web App URL into `Cycle1A_Survey.html` and `Cycle1B_Survey.html` here in this folder at `const SHEETS_ENDPOINT = "";`.
3. Re-upload these two files.

The local CSV/JSON downloads continue to work alongside the Sheets sync, so participants always have a copy of their data.

---

## Privacy and compliance

- All survey responses are computed and stored on the participant's device. Nothing is sent to any server (unless you enable the optional Sheets backend).
- No name, no email, no IP logging beyond what the host platform records for traffic analytics (GitHub Pages and Netlify both record basic, anonymised access logs by default).
- Participants are told what is collected before they start (the welcome card on `index.html`).
- If your ethics review requires a participant information sheet or consent form to be on the site, place it at `consent.html` in this folder and link to it from `index.html`.

---

## Quick test before sharing the URL

After deploying, verify:

1. The base URL opens the welcome page.
2. The **Start the survey →** button opens `Cycle1A_Survey.html`.
3. The Cycle 1A **Continue** button at the end navigates to `Cycle1B_Survey.html?framing=…` with the winner letter in the URL.
4. The Cycle 1B **Done** button auto-downloads a JSON file.
5. The two CSV/JSON download buttons on each result screen actually download files.

Five-minute end-to-end test. If all five pass, you're ready.

---

*Document version 1 · Deployable survey-site folder · 11 June 2026.*
