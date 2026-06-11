/**
 * MDR Cycle 1 · Apps Script backend for Cycle1A_Survey.html and Cycle1B_Survey.html
 *
 * SETUP
 * 1. Create a new Google Sheet (any name — e.g. "MDR Cycle 1 Responses").
 * 2. Extensions → Apps Script.
 * 3. Delete the default contents of `Code.gs` and paste this entire file.
 * 4. File → Save.
 * 5. Click "Deploy" → "New deployment".
 * 6. Click the gear icon → choose "Web app".
 * 7. Set:
 *      Description       :  MDR Cycle 1 endpoint
 *      Execute as        :  Me (your Gmail)
 *      Who has access    :  Anyone   (anonymous; the URL is unguessable)
 * 8. Click Deploy → authorise (Google warns "unverified app" — click Advanced → Go to project).
 * 9. Copy the **Web app URL**.
 * 10. In both Cycle1A_Survey.html and Cycle1B_Survey.html, set:
 *        const SHEETS_ENDPOINT = "PASTE-YOUR-URL-HERE";
 * 11. Open Cycle1A_Survey.html, complete a test session, and watch a row appear
 *     in the "Cycle1A_Language" tab of the sheet (auto-created on first submission).
 *
 * Devin De Mel · MDR Thesis · Keio Media Design · 2026
 */

const SHEETS = {
  CYCLE_1A: "Cycle1A_Language",
  CYCLE_1B: "Cycle1B_Interaction",
};

const HEADERS_1A = [
  "timestamp", "participant_id", "age", "gender", "from",
  "A_cog", "A_aff", "A_mem", "A_int", "A_avg",
  "B_cog", "B_aff", "B_mem", "B_int", "B_avg",
  "C_cog", "C_aff", "C_mem", "C_int", "C_avg",
  "D_cog", "D_aff", "D_mem", "D_int", "D_avg",
  "E_cog", "E_aff", "E_mem", "E_int", "E_avg",
  "winner"
];

const HEADERS_1B = [
  "timestamp", "participant_id", "age", "gender", "from", "held_framing",
  "01_cog", "01_aff", "01_mem", "01_int", "01_avg",
  "02_cog", "02_aff", "02_mem", "02_int", "02_avg",
  "03_cog", "03_aff", "03_mem", "03_int", "03_avg",
  "04_cog", "04_aff", "04_mem", "04_int", "04_avg",
  "05_cog", "05_aff", "05_mem", "05_int", "05_avg",
  "winner"
];

const ORDER_1A = ["A","B","C","D","E"];
const ORDER_1B = ["01","02","03","04","05"];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "No payload" });
    }
    const data = JSON.parse(e.postData.contents);
    if (!data || !data.survey) {
      return jsonResponse({ ok: false, error: "Missing 'survey' field" });
    }

    const sheetName = data.survey === "Cycle1A_Language" ? SHEETS.CYCLE_1A : SHEETS.CYCLE_1B;
    const headers   = data.survey === "Cycle1A_Language" ? HEADERS_1A     : HEADERS_1B;
    const order     = data.survey === "Cycle1A_Language" ? ORDER_1A       : ORDER_1B;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(headers);
      // Style header
      const hr = sheet.getRange(1, 1, 1, headers.length);
      hr.setFontWeight("bold");
      hr.setBackground("#F1ECFA");
      sheet.setFrozenRows(1);
    }

    const row = buildRow(data, order, sheetName === SHEETS.CYCLE_1B);
    sheet.appendRow(row);

    return jsonResponse({ ok: true, sheet: sheetName, rows: sheet.getLastRow() - 1 });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function buildRow(data, order, isCycle1B) {
  const d = data.demographics || {};
  const row = [
    data.timestamp || new Date().toISOString(),
    data.participant_id || "",
    d.age || "",
    d.gender || "",
    d.from || "",
  ];
  if (isCycle1B) row.push(data.held_framing || "");

  for (const key of order) {
    const r = (data.ratings || {})[key] || {};
    row.push(numOrBlank(r.cognitive));
    row.push(numOrBlank(r.affective));
    row.push(numOrBlank(r.memorability));
    row.push(numOrBlank(r.intentional));
    const s = (data.scores || []).find(function (x) {
      return (x.framing || x.paradigm) === key;
    });
    row.push(s ? Number(s.average).toFixed(3) : "");
  }
  row.push(data.winner || "");
  return row;
}

function numOrBlank(v) {
  if (v === undefined || v === null || v === "") return "";
  return Number(v);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  // Simple GET endpoint for health-check from a browser
  return jsonResponse({
    ok: true,
    message: "MDR Cycle 1 endpoint is alive",
    instructions: "POST a JSON payload from Cycle1A_Survey.html or Cycle1B_Survey.html.",
  });
}
