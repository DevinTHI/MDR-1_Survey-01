# Standalone Chained Surveys · Cycle 1A → Cycle 1B

*Devin De Mel — MDR Thesis — Keio Media Design — 2026*

Two standalone HTML survey files that chain together. Each participant runs through both in sequence. Each one downloads its own response file so you can collect data from any device — phone, iPad, kiosk, MacBook — without setting up a backend.

---

## What you get

- **`Cycle1A_Survey.html`** — language framing survey.
  - Demographics (age, gender, country) → 5 framings × 3 questions → result screen → download → auto-route to Cycle 1B with the winning framing.
- **`Cycle1B_Survey.html`** — interaction paradigm survey.
  - Reads the winning framing from the URL → 5 paradigms × 3 questions → result screen → download → done.

Both files are **fully self-contained**. No backend, no internet for the survey itself (only the Google Fonts CDN for typography, which fails gracefully to system fonts).

---

## The questions, in full · four dimensions

Both surveys use a four-item Likert structure (1–5 scale) per item being rated. **Each item maps to one theoretical dimension** so the responses can be read both as a single composite score and as four independent sub-scores. The four dimensions are anchored in the H₁ₐ sub-conjecture from `Cycle1_Justification.md`.

| Dimension | What it measures | Literature anchor |
|---|---|---|
| **Cognitive** | Did the participant understand? | Marshall (2014); Moser (2010) |
| **Affective** | Did the participant feel something? | Schultz (2002); Tam, Lee & Chao (2013) |
| **Memorability** | Will the participant remember it? | White & Gunstone (1992); Kahneman (2011) |
| **Intentional** | Will the participant act or share? | Stoknes (2015); Bickmore & Cassell (2001) |

### Cycle 1A — four questions per language framing

For each of the five framings (Scientific, Hybrid, Everyday, Narrative, Poetic):

1. **Cognitive** — *How clearly did this framing explain the planet's situation to you?*
2. **Affective** — *How much did this framing make you feel something?*
3. **Memorability** — *How likely are you to remember the content of this framing a week from now?*
4. **Intentional** — *How likely are you to act differently — or share this with someone — because of this framing?*

Per-framing score = average of the four ratings. Highest score wins. The scorecard also displays each sub-score so you can read the trade-off — for example, the Poetic framing may win on Affective and lose on Cognitive, which is the H₁ₐ trade-off claim made empirically visible.

### Cycle 1B — four questions per interaction paradigm

For each of the five paradigms (Direct Manipulation, Estimate-Reveal, Conversational, Narrative Progression, Ambient), all delivered under the winning language framing from Cycle 1A:

1. **Cognitive** — *How well did this interaction help you understand the planet's situation?*
2. **Affective** — *How emotionally engaged were you during this interaction?*
3. **Memorability** — *How likely are you to remember what you experienced through this interaction a week from now?*
4. **Intentional** — *How likely are you to want to use this kind of interaction again — or share it with someone?*

Same scoring. Same per-dimension sub-scores on the result screen.

The four-item design is deliberately minimal but rigorously partitioned: each item taps exactly one theoretical dimension, so the composite is interpretable *and* the sub-scores are diagnostic.

---

## How a participant uses it

### Cycle 1A flow

1. Open `Cycle1A_Survey.html` after the participant has experienced the five language framing probes.
2. **Step 1 · Welcome** — short briefing.
3. **Step 2 · Demographics** — age range, gender, country. No name, no email.
4. **Steps 3–7 · Per-framing ratings** — one screen per framing, three Likert questions on each.
5. **Step 8 · Result** — a winner card showing the strongest framing for this participant, plus the full scorecard sorted high to low.
6. **Two download buttons** — CSV and JSON of the participant's full response.
7. **Continue button** — auto-downloads the JSON as a safety net, then navigates to `Cycle1B_Survey.html?framing=X&pid=…&age=…&gender=…&from=…` carrying the winner and demographics forward.

### Cycle 1B flow

1. The survey opens with a banner showing the held-constant framing (read from the URL).
2. **Step 1 · Welcome** — confirms the framing carried over.
3. **Steps 2–6 · Per-paradigm ratings** — one screen per paradigm, three Likert questions on each.
4. **Step 7 · Result** — winner card showing the strongest interaction paradigm for this participant, plus the full scorecard. The note at the bottom names the combined strongest cell (paradigm × framing) — the single most resonant point of the 5 × 5 design space for this participant.
5. **Two download buttons** plus a **Done** button. Done auto-downloads JSON and shows a thank-you screen.

---

## What the downloaded files contain

### JSON (one file per survey per participant)

```json
{
  "survey": "Cycle1A_Language",
  "participant_id": "p1k8mq3z",
  "timestamp": "2026-06-11T08:42:13.456Z",
  "demographics": {
    "age": "25–34",
    "gender": "Female",
    "from": "Sri Lanka"
  },
  "ratings": {
    "A": { "cognitive": 3, "affective": 2, "memorability": 2, "intentional": 2 },
    "B": { "cognitive": 4, "affective": 3, "memorability": 4, "intentional": 3 },
    "C": { "cognitive": 5, "affective": 4, "memorability": 4, "intentional": 4 },
    "D": { "cognitive": 4, "affective": 5, "memorability": 5, "intentional": 4 },
    "E": { "cognitive": 3, "affective": 5, "memorability": 4, "intentional": 3 }
  },
  "scores": [
    { "framing": "D", "average": 4.50 },
    { "framing": "C", "average": 4.25 },
    { "framing": "E", "average": 3.75 },
    { "framing": "B", "average": 3.50 },
    { "framing": "A", "average": 2.25 }
  ],
  "winner": "D"
}
```

The Cycle 1B JSON has the same shape but with `paradigm` keys (`01` to `05`) and an additional `held_framing` field.

### CSV (one file per survey per participant)

```
section,key,value
meta,survey,Cycle1A_Language
meta,participant_id,p1k8mq3z
meta,timestamp,2026-06-11T08:42:13.456Z
demographics,age,25–34
demographics,gender,Female
demographics,from,Sri Lanka
rating,A_cognitive,3
rating,A_affective,2
rating,A_memorability,2
rating,A_intentional,2
…
score,A_average,2.250
…
result,winner,D
```

A long-format CSV that flattens cleanly into any spreadsheet, R, or pandas analysis.

---

## Google Sheets backend · 10-minute setup

Optional. If you set up a Google Sheet as the backend, every completed survey writes one row to the sheet automatically — you watch responses come in live, no file collection needed. The local CSV/JSON download still works as a safety net.

### Step 1 · Make a Google Sheet

Open Google Drive → **New → Google Sheets**. Name it anything ("MDR Cycle 1 Responses" is what the script expects to find — but the name doesn't actually matter, since the script writes into whichever sheet is bound to it).

### Step 2 · Open the script editor

Inside the sheet, go to **Extensions → Apps Script**. A new browser tab opens with the script editor.

### Step 3 · Paste the script

Delete everything in the default `Code.gs` file. Open `GoogleSheets_AppsScript.gs` from this folder, copy its entire contents, and paste into the Apps Script editor.

Click the disk icon to save. Name the project anything ("MDR Cycle 1").

### Step 4 · Deploy as a Web App

Click **Deploy → New deployment** (top right).
Click the gear icon next to "Select type" and choose **Web app**.
Set the deployment options:

- **Description**: `MDR Cycle 1 endpoint`
- **Execute as**: **Me** (your Gmail address)
- **Who has access**: **Anyone** (the URL is unguessable, but if you prefer Google-account-only set it to "Anyone with Google account")

Click **Deploy**. Google will ask you to **Authorize access** — click *Advanced → Go to {project name} (unsafe)* (it's safe; the "unsafe" warning is shown because the script isn't verified, which is normal for personal projects), then allow.

Copy the **Web app URL** that's displayed. It looks like:

```
https://script.google.com/macros/s/AKfycb………………/exec
```

### Step 5 · Paste the URL into both survey files

Open `Cycle1A_Survey.html` and `Cycle1B_Survey.html`. Near the top of each file's `<script>` block, find:

```js
const SHEETS_ENDPOINT = "";
```

Paste the Web App URL between the quotes:

```js
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycb………………/exec";
```

Save both files.

### Step 6 · Test

Open `Cycle1A_Survey.html`, complete a full session. On the result screen you should see a small banner at the top: *"Saving to Google Sheets…"* turning into *"✓ Saved to Google Sheets."* within a second or two. Switch back to your Google Sheet — a new tab named **Cycle1A_Language** will appear with one row of data.

Do the same for `Cycle1B_Survey.html` — a second tab named **Cycle1B_Interaction** will appear.

### What the sheets look like

The script auto-creates two tabs on first submission, each with bold + lavender-shaded headers and frozen first row:

**Cycle1A_Language**

| timestamp | participant_id | age | gender | from | A_cog | A_aff | A_mem | A_int | A_avg | B_cog | … | winner |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

**Cycle1B_Interaction**

| timestamp | participant_id | age | gender | from | held_framing | 01_cog | 01_aff | 01_mem | 01_int | 01_avg | … | winner |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Each row = one completed survey from one participant. Sort or filter the sheet however you like, build pivot tables, add charts — it's a normal Google Sheet.

### Troubleshooting

- **Banner shows "⚠ Couldn't reach Google Sheets"** — usually means the URL is wrong, the deployment was set to "Only me" instead of "Anyone", or the participant is offline. The local download buttons still work — no data lost.
- **Banner stays on "Cloud sync not configured"** — you forgot to paste the URL between the quotes. Recheck Step 5.
- **Sheet receives a row but the columns look wrong** — make sure you pasted the *entire* contents of `GoogleSheets_AppsScript.gs`. The header definitions at the top of that file are what sets the columns.
- **You re-deployed and now the URL is different** — Apps Script gives you a new URL each time you click "New deployment". To keep the same URL, use **Manage deployments → Edit** instead.
- **Wrong account is "Me" for execution** — switch to the Google account that owns the sheet before deploying.

### Privacy and security notes

- The URL is unguessable (Apps Script uses a long random ID) so anonymous access in practice is restricted to anyone who knows the URL.
- The script only **writes** to the sheet — it never reads it back to the survey page.
- Each POST is just the JSON payload of one participant's responses — same content as the local download.
- If you want stronger access control, set "Who has access" to **Anyone with Google account** when deploying — but every participant device will then need to be signed in to Google.
- To stop accepting new submissions, open the script editor and click **Deploy → Manage deployments → Archive**.

---

## Data handling and aggregation

Because each participant downloads their own response file, the workflow is:

1. **During the session**, the participant clicks the download buttons (or the Continue button, which auto-downloads).
2. **Collect** the JSON files from each device (AirDrop, USB, email, shared folder, etc.).
3. **Aggregate offline** — open all the JSON files in a script, R, Python, or even a spreadsheet, and compute the cross-participant winner.

**To make aggregation effortless**, name files include the participant ID and country, so you can sort and identify at a glance. Filenames look like `Cycle1A_p1k8mq3z_Sri-Lanka.json`.

If you want a quick aggregation helper, the existing `Cycle1A_Comparative_Dashboard.html` from the earlier within-subjects setup is structurally similar — it reads localStorage records and computes the leaderboard. A version that reads dropped JSON files instead can be added in 30 minutes if you need it; let me know.

---

## A note on participant flow and naivety

The Cycle 1A → 1B chain is a **within-subjects design**: one participant does all five language framings (under Estimate-Reveal), takes the 1A survey, then does all five interaction paradigms (under the winning framing), then takes the 1B survey.

The Estimate-Reveal paradigm depends on participant naivety, which degrades across the session. The methodologically honest framing is: *the surveys measure language and interaction preference under repeat exposure, not absolute uptake.* The pilot study already validated uptake under naive Estimate-Reveal; these surveys triangulate on preference. See `Cycle1A_Comparative_README.md` for the full defensive paragraph for the methodology chapter — the same logic applies here.

---

## Literature grounding (compressed)

- **Cognitive / comprehension items** — climate-communication uptake literature, Marshall (2014); Moser (2010).
- **Affective items** — Schultz's (2002) Inclusion of Nature in Self; Tam, Lee & Chao (2013) on anthropomorphism and connectedness.
- **Durability / intent items** — Stoknes (2015) on behavioural intent in climate communication.
- **Three-item minimal Likert design** — defensible for time-constrained field surveys; Diamantopoulos et al. (2012) on single-item and short-form measures in survey research.
- **Within-subjects preference design** — Krogh, Markussen & Bang (2015) on variation across artefacts as research move; Koskinen et al. (2011) on portfolio mode.
- **Forced ranking by average** — Alwin & Krosnick (1985) on rating vs ranking sensitivity.

Full citations are in `Cycle1_Justification.md`.

---

## Privacy

- All survey data lives on the participant's device.
- No data is transmitted to any server. The only external request is to Google Fonts (CSS, no personal data).
- The survey writes an in-flight backup to `localStorage` (`cycle1a_survey_inflight_v1`, `cycle1b_survey_inflight_v1`) so an accidental refresh doesn't lose progress. The backup is cleared once the result screen renders.
- Participants must download their responses before closing the tab. The "Continue" button on Cycle 1A auto-downloads as a safety net; the "Done" button on Cycle 1B does the same.

---

## File summary

| File | Purpose |
|---|---|
| `Cycle1A_Survey.html` | Standalone language framing survey |
| `Cycle1B_Survey.html` | Standalone interaction paradigm survey (receives framing via URL) |
| `GoogleSheets_AppsScript.gs` | Apps Script backend — paste into the script editor of your Google Sheet |
| `Surveys_README.md` | This document |

Drop them in the same folder. Open `Cycle1A_Survey.html` to begin.

---

*Document version 1 · Chained standalone surveys · 11 June 2026.*
