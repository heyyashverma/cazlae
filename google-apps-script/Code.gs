// Deployed as the Google Apps Script web app that app/actions/subscribe.ts
// posts to. This file is a reference copy — edits here must be pasted into
// the script editor and redeployed as a new version of the same deployment.
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const email = String(data.email || "").trim().toLowerCase();
  if (!email) return ContentService.createTextOutput("error");

  // One signup at a time, so two quick submits can't both pass the check.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow > 0) {
      const exists = sheet
        .getRange(1, 1, lastRow, 1)
        .getValues()
        .some((row) => String(row[0]).trim().toLowerCase() === email);
      if (exists) return ContentService.createTextOutput("duplicate");
    }

    sheet.appendRow([
      email,
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.consent ? "yes" : "no",
    ]);
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}
