// Basic settings and lists used throughout the dashboard.
const STORAGE_KEY = "registrationOutreachDashboard.v1";
const ACADEMIC_RISK_MIN_CREDITS = 9;
const NEAR_GRADUATION_CREDITS = 115;

const expectedColumns = [
  "ID",
  "Last Name",
  "First Name",
  "Dalhousie Email",
  "Level",
  "Admit Term",
  "Credit Hours Earned",
  "Cumulative GPA",
  "Campus",
  "Program Description"
];

const requiredColumns = ["ID"];

const insightChartTypes = [
  { key: "program", label: "Program", title: "Program mix" },
  { key: "flag", label: "Flag", title: "Student flags" },
  { key: "contact", label: "Contact status", title: "Contact status" },
  { key: "result", label: "Outreach result", title: "Outreach results" }
];

const insightTrendTypes = [
  { key: "eligible", label: "Eligible not registered", color: "#0f766e" },
  { key: "new", label: "New this week", color: "#2563eb" },
  { key: "resolved", label: "Registered since last report", color: "#dc2626" },
  { key: "contacted", label: "Contacted (outreach log)", color: "#7c3aed" },
  { key: "afterOutreach", label: "After outreach", color: "#0891b2" },
  { key: "risk", label: "Academic Risk", color: "#f59e0b" },
  { key: "nearGraduate", label: "Near graduation", color: "#65a30d" }
];

const pieColors = ["#0f766e", "#2563eb", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2", "#65a30d", "#be123c"];

const aliases = {
  id: "ID",
  bannerid: "ID",
  dalid: "ID",
  idnumber: "ID",
  studentid: "ID",
  studentnumber: "ID",
  lastname: "Last Name",
  last: "Last Name",
  surname: "Last Name",
  firstname: "First Name",
  firstnamepreferred: "Preferred",
  firstnames: "First Name",
  givenname: "First Name",
  givennames: "First Name",
  forename: "First Name",
  first: "First Name",
  preferredfirstname: "Preferred",
  preferredfirst: "Preferred",
  preferredname: "Preferred",
  chosenname: "Preferred",
  preferred: "Preferred",
  dalhousieemail: "Dalhousie Email",
  preferreddalhousieemail: "Dalhousie Email",
  dalemail: "Dalhousie Email",
  email: "Dalhousie Email",
  emailaddress: "Dalhousie Email",
  citizenship: "Citizenship",
  citizenshipgroup: "Citizenship Group",
  registrationdate: "Registration Date",
  registereddate: "Registration Date",
  registrationdatetime: "Registration Date",
  dateregistered: "Registration Date",
  regdate: "Registration Date",
  date: "Registration Date",
  activitydate: "Registration Date",
  effectivedate: "Registration Date",
  enrolmentdate: "Registration Date",
  enrollmentdate: "Registration Date",
  term: "Term",
  admitterm: "Admit Term",
  group: "Group",
  grouplevel: "Group Level",
  level: "Level",
  credithoursearned: "Credit Hours Earned",
  levelcredithoursearned: "Credit Hours Earned",
  credithrs: "Credit Hours Earned",
  credithrsearned: "Credit Hours Earned",
  credithours: "Credit Hours Earned",
  hoursattemptedearned: "Credit Hours Earned",
  hoursearned: "Credit Hours Earned",
  creditsearned: "Credit Hours Earned",
  earnedcredits: "Credit Hours Earned",
  earnedhours: "Credit Hours Earned",
  cumulativegpa: "Cumulative GPA",
  cumulativegradepointaverage: "Cumulative GPA",
  gpa: "Cumulative GPA",
  studenttypecategory: "Student Type Category",
  campus: "Campus",
  degreecode: "Degree Code",
  degreedescription: "Degree Description",
  major1code: "Major1 Code",
  programcategory: "Program Category",
  programcode: "Program Code",
  programdescription: "Program Description",
  program: "Program Description"
};

// Load saved dashboard data from the browser before the page is drawn.
const state = loadState();

// Short names for the HTML elements that the JavaScript reads from or updates.
const els = {
  reportWeek: document.getElementById("reportWeek"),
  reportFile: document.getElementById("reportFile"),
  reportFileName: document.getElementById("reportFileName"),
  reportForm: document.getElementById("reportForm"),
  outreachForm: document.getElementById("outreachForm"),
  contactStudentId: document.getElementById("contactStudentId"),
  contactDate: document.getElementById("contactDate"),
  contactChannel: document.getElementById("contactChannel"),
  contactNotes: document.getElementById("contactNotes"),
  datasetStatus: document.getElementById("datasetStatus"),
  uploadSummary: document.getElementById("uploadSummary"),
  metrics: document.getElementById("metrics"),
  searchInput: document.getElementById("searchInput"),
  levelFilter: document.getElementById("levelFilter"),
  programFilter: document.getElementById("programFilter"),
  flagFilter: document.getElementById("flagFilter"),
  creditHourFilters: [...document.querySelectorAll("input[name='creditHourFilter']")],
  gradHours: document.getElementById("gradHours"),
  riskGpa: document.getElementById("riskGpa"),
  longEnrolledYears: document.getElementById("longEnrolledYears"),
  studentRows: document.getElementById("studentRows"),
  studentCount: document.getElementById("studentCount"),
  hideEmailHoldStudents: document.getElementById("hideEmailHoldStudents"),
  hideContactedStudents: document.getElementById("hideContactedStudents"),
  comparisonTitle: document.getElementById("comparisonTitle"),
  comparisonSummary: document.getElementById("comparisonSummary"),
  comparisonMovementChart: document.getElementById("comparisonMovementChart"),
  reportHistory: document.getElementById("reportHistory"),
  reportHistoryCount: document.getElementById("reportHistoryCount"),
  resolvedRows: document.getElementById("resolvedRows"),
  resolvedSummaryCount: document.getElementById("resolvedSummaryCount"),
  newRows: document.getElementById("newRows"),
  newSummaryCount: document.getElementById("newSummaryCount"),
  afterOutreachRows: document.getElementById("afterOutreachRows"),
  afterOutreachSummaryCount: document.getElementById("afterOutreachSummaryCount"),
  statsList: document.getElementById("statsList"),
  historicalForm: document.getElementById("historicalForm"),
  historicalFile: document.getElementById("historicalFile"),
  historicalFileName: document.getElementById("historicalFileName"),
  historicalStatus: document.getElementById("historicalStatus"),
  historicalMetrics: document.getElementById("historicalMetrics"),
  historicalTrend: document.getElementById("historicalTrend"),
  historicalProgramRows: document.getElementById("historicalProgramRows"),
  historicalForecastRows: document.getElementById("historicalForecastRows"),
  historicalRiskRows: document.getElementById("historicalRiskRows"),
  clearHistoricalBtn: document.getElementById("clearHistoricalBtn"),
  targetForm: document.getElementById("targetForm"),
  targetProgram: document.getElementById("targetProgram"),
  targetProgramOptions: document.getElementById("targetProgramOptions"),
  targetValue: document.getElementById("targetValue"),
  targetSummary: document.getElementById("targetSummary"),
  targetRows: document.getElementById("targetRows"),
  outreachRows: document.getElementById("outreachRows"),
  outreachCount: document.getElementById("outreachCount"),
  insightWeekOptions: document.getElementById("insightWeekOptions"),
  insightChartOptions: document.getElementById("insightChartOptions"),
  insightTrendOptions: document.getElementById("insightTrendOptions"),
  insightCharts: document.getElementById("insightCharts"),
  insightTrend: document.getElementById("insightTrend"),
  settingsBtn: document.getElementById("settingsBtn"),
  settingsModal: document.getElementById("settingsModal"),
  settingsModalClose: document.getElementById("settingsModalClose"),
  settingsDoneBtn: document.getElementById("settingsDoneBtn"),
  notesModal: document.getElementById("notesModal"),
  notesModalTitle: document.getElementById("notesModalTitle"),
  notesModalMeta: document.getElementById("notesModalMeta"),
  notesModalBody: document.getElementById("notesModalBody"),
  notesModalClose: document.getElementById("notesModalClose"),
  exportOutreachBtn: document.getElementById("exportOutreachBtn"),
  exportFindingsBtn: document.getElementById("exportFindingsBtn"),
  exportInsightsPdfBtn: document.getElementById("exportInsightsPdfBtn"),
  exportComparisonBtn: document.getElementById("exportComparisonBtn"),
  clearDataBtn: document.getElementById("clearDataBtn")
};

// Remembers which tab was open before printing the Insights PDF.
let restoreTabAfterPrint = null;

init();

// App setup and event wiring
// Starts the app after the page loads.
function init() {
  const today = todayIsoDate();
  els.reportWeek.value = today;
  els.contactDate.value = today;
  applySettingsToInputs();
  bindEvents();
  render();
}

// Connects all page controls to their JavaScript actions.
function bindEvents() {
  bindReportEvents();
  bindOutreachEvents();
  bindFilterEvents();
  bindInsightEvents();
  bindTargetEvents();
  bindTabEvents();
  bindExportEvents();
  bindModalEvents();
}

// Connects the budget target form in Settings.
function bindTargetEvents() {
  els.targetForm.addEventListener("submit", handleTargetSubmit);
}

// Connects the weekly report upload form and report delete buttons.
function bindReportEvents() {
  els.reportFile.addEventListener("change", () => {
    els.reportFileName.textContent = els.reportFile.files[0]?.name || "No file selected";
  });
  els.historicalFile.addEventListener("change", () => {
    els.historicalFileName.textContent = els.historicalFile.files[0]?.name || "No file selected";
  });

  els.reportForm.addEventListener("submit", handleReportSubmit);
  els.historicalForm.addEventListener("submit", handleHistoricalSubmit);
  els.clearDataBtn.addEventListener("click", handleClearData);
  els.clearHistoricalBtn.addEventListener("click", handleClearHistoricalData);

  els.reportHistory.addEventListener("click", event => {
    const button = event.target.closest("[data-delete-report-week]");
    if (!button) return;
    deleteSnapshot(button.dataset.deleteReportWeek);
  });
}

// Loads last year's registration-date file for benchmarks.
async function handleHistoricalSubmit(event) {
  event.preventDefault();
  const file = els.historicalFile.files[0];
  if (!file) return;

  try {
    const rows = await parseFile(file);
    const historicalRows = rows.map(normalizeHistoricalRegistrationRow).filter(row => row.studentId && row.registrationDate);
    if (!historicalRows.length) {
      alert("No historical registration rows were found. The file needs at least a student ID and registration date.");
      return;
    }

    state.historical = {
      fileName: file.name,
      loadedAt: new Date().toISOString(),
      rows: historicalRows
    };
    saveState();
    render();
    resetHistoricalForm();
  } catch (error) {
    alert(error.message || "Could not read the historical registration file.");
  }
}

// Connects the outreach form, result changes, notes, holds, and delete buttons.
function bindOutreachEvents() {
  els.outreachForm.addEventListener("submit", handleOutreachSubmit);
  els.outreachRows.addEventListener("change", handleOutreachResultChange);
  els.outreachRows.addEventListener("click", handleOutreachTableClick);
}

// Re-renders the dashboard when Focus filters change.
function bindFilterEvents() {
  [els.searchInput, els.levelFilter, els.programFilter, els.flagFilter, ...els.creditHourFilters, els.hideEmailHoldStudents, els.hideContactedStudents]
    .forEach(input => input.addEventListener("input", render));
  [els.gradHours, els.riskGpa, els.longEnrolledYears]
    .forEach(input => input.addEventListener("input", handleSettingsChange));
}

// Connects the insight chart and trend controls.
function bindInsightEvents() {
  bindInsightCheckboxGroup(els.insightWeekOptions, "insightWeek", "weeks");
  bindInsightCheckboxGroup(els.insightChartOptions, "insightChart", "charts");
  bindInsightCheckboxGroup(els.insightTrendOptions, "insightTrend", "trends");
}

// Switches between the main tabs.
function bindTabEvents() {
  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab);
    });
  });

  els.metrics.addEventListener("click", event => {
    const card = event.target.closest("[data-dashboard-list]");
    if (!card) return;
    focusDashboardList(card.dataset.dashboardList);
  });
}

// Connects all Excel and PDF export buttons.
function bindExportEvents() {
  els.exportOutreachBtn.addEventListener("click", async () => {
    await downloadXlsx("outreach-log.xlsx", "Outreach Log", getFilteredOutreachRows().map(outreachExportRow));
  });

  els.exportFindingsBtn.addEventListener("click", downloadFindingsXlsx);
  els.exportInsightsPdfBtn.addEventListener("click", exportInsightsPdf);

  window.addEventListener("afterprint", restoreAfterInsightsPrint);

  els.exportComparisonBtn.addEventListener("click", async () => {
    await downloadXlsx("weekly-comparison.xlsx", "Weekly Comparison", comparisonExportRows(getComparison()));
  });

  els.comparisonSummary.addEventListener("click", event => {
    const card = event.target.closest("[data-comparison-list]");
    if (!card) return;
    focusComparisonList(card.dataset.comparisonList);
  });
}

// Closes pop-ups when the user clicks close or outside them.
function bindModalEvents() {
  els.settingsBtn.addEventListener("click", openSettingsModal);
  els.settingsModalClose.addEventListener("click", closeSettingsModal);
  els.settingsDoneBtn.addEventListener("click", closeSettingsModal);
  els.settingsModal.addEventListener("click", event => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });

  els.notesModalClose.addEventListener("click", closeNotesModal);
  els.notesModal.addEventListener("click", event => {
    const deleteNoteButton = event.target.closest("[data-delete-outreach-note-row-id]");
    if (deleteNoteButton) {
      deleteOutreachNote(deleteNoteButton.dataset.deleteOutreachNoteRowId, Number(deleteNoteButton.dataset.deleteOutreachNoteIndex));
      return;
    }
    if (event.target === els.notesModal) closeNotesModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!els.settingsModal.hidden) closeSettingsModal();
    if (!els.notesModal.hidden) closeNotesModal();
  });
}

// Saves checked insight options and refreshes the selected charts.
function bindInsightCheckboxGroup(container, datasetKey, stateKey) {
  container.addEventListener("change", event => {
    const checkbox = event.target.closest(`[data-${kebabCase(datasetKey)}]`);
    if (!checkbox) return;

    const selected = new Set(state.insights[stateKey]);
    const value = checkbox.dataset[datasetKey];
    if (checkbox.checked) selected.add(value);
    else selected.delete(value);
    state.insights[stateKey] = [...selected];
    saveState();
    renderCharts();
  });
}

// Reads an uploaded weekly report and saves it as one report week.
async function handleReportSubmit(event) {
  event.preventDefault();
  const file = els.reportFile.files[0];
  if (!file) return;

  try {
    const rows = await parseFile(file);
    const normalized = rows.map(normalizeRow).filter(isStudentRow);
    const missing = missingColumns(normalized);
    if (missing.length) {
      alert(`The report is missing expected columns: ${missing.join(", ")}`);
      return;
    }

    const existing = state.snapshots.find(snapshot => snapshot.week === els.reportWeek.value);
    if (existing && !confirm(`A report is already loaded for ${formatDate(els.reportWeek.value)}. Replace ${existing.fileName}? To compare two dates, cancel and choose a different report date.`)) {
      return;
    }

    upsertSnapshot({
      week: els.reportWeek.value,
      fileName: file.name,
      rows: normalized
    });
    saveState();
    render();
    resetReportForm();
  } catch (error) {
    alert(error.message || "Could not read the file.");
  }
}

// Saves one or more outreach records from the Student Outreach form.
function handleOutreachSubmit(event) {
  event.preventDefault();
  const studentIds = getOutreachStudentIds();
  if (!studentIds.length) {
    alert("Enter one or more student IDs.");
    return;
  }

  const unknownIds = studentIds.filter(studentId => !hasUploadedStudentId(studentId));
  if (unknownIds.length && !confirm(unknownOutreachMessage(unknownIds))) {
    return;
  }

  const contactRows = studentIds.map(studentId => ({
    id: crypto.randomUUID(),
    studentId,
    date: els.contactDate.value,
    channel: els.contactChannel.value,
    result: "Pending",
    notes: clean(els.contactNotes.value),
    emailHold: false
  }));
  state.outreach.unshift(...contactRows);
  saveState();
  render();
  resetOutreachForm();
}

// Updates the result for an existing outreach record.
function handleOutreachResultChange(event) {
  const select = event.target.closest("[data-outreach-result-id]");
  if (select) {
    const row = state.outreach.find(item => item.id === select.dataset.outreachResultId);
    if (!row) return;

    if (row.autoResult === "registered") row.manualResult = true;
    row.result = select.value;
    delete row.autoResult;
    saveState();
    render();
    return;
  }

  const holdCheckbox = event.target.closest("[data-outreach-hold-id]");
  if (holdCheckbox) {
    const row = state.outreach.find(item => item.id === holdCheckbox.dataset.outreachHoldId);
    if (!row) return;

    row.emailHold = holdCheckbox.checked;
    saveState();
    render();
    return;
  }
}

// Handles buttons inside the outreach table.
function handleOutreachTableClick(event) {
  const deleteButton = event.target.closest("[data-delete-outreach-id]");
  if (deleteButton) {
    deleteOutreachRow(deleteButton.dataset.deleteOutreachId);
    return;
  }

  const viewNotesButton = event.target.closest("[data-view-outreach-notes-id]");
  if (viewNotesButton) {
    openNotesModal(viewNotesButton.dataset.viewOutreachNotesId);
    return;
  }

  const button = event.target.closest("[data-add-outreach-note-id]");
  if (!button) return;

  const row = state.outreach.find(item => item.id === button.dataset.addOutreachNoteId);
  const noteInput = els.outreachRows.querySelector(`[data-outreach-note-id="${cssEscape(button.dataset.addOutreachNoteId)}"]`);
  const note = clean(noteInput?.value);
  if (!row || !note) return;

  row.notes = appendNote(row.notes, note);
  saveState();
  render();
}

// Deletes one outreach record after confirmation.
function deleteOutreachRow(rowId) {
  const row = state.outreach.find(item => item.id === rowId);
  if (!row) return;

  const student = findStudentById(row.studentId);
  const studentText = student ? `${studentName(student)} (${row.studentId})` : row.studentId;
  if (!confirm(`Delete this outreach contact for ${studentText}?`)) return;

  state.outreach = state.outreach.filter(item => item.id !== rowId);
  saveState();
  render();
}

// Deletes one note from one outreach record.
function deleteOutreachNote(rowId, noteIndex) {
  const row = state.outreach.find(item => item.id === rowId);
  if (!row || !Number.isInteger(noteIndex)) return;

  const notes = splitNotes(row.notes);
  const note = notes[noteIndex];
  if (!note) return;
  if (!confirm("Delete this note?")) return;

  notes.splice(noteIndex, 1);
  row.notes = notes.join("\n");
  saveState();
  render();
  if (row.notes) openNotesModal(rowId);
  else closeNotesModal();
}

// Clears all local dashboard data after confirmation.
function handleClearData() {
  if (!confirm("Clear all locally saved reports, outreach logs, and historical benchmarks?")) return;
  state.snapshots = [];
  state.outreach = [];
  state.historical = defaultHistorical();
  state.targets = defaultTargets();
  saveState();
  render();
}

// Saves a budget enrolment target from Settings.
function handleTargetSubmit(event) {
  event.preventDefault();
  const program = normalizeProgram(clean(els.targetProgram.value));
  const target = Math.max(0, Math.round(number(els.targetValue.value)));
  if (!program || !target) {
    alert("Enter a program and budget enrolment target.");
    return;
  }

  state.targets = state.targets || [];
  const existing = state.targets.find(row => row.program === program);
  if (existing) existing.target = target;
  else state.targets.push({ program, target });
  state.targets.sort((a, b) => a.program.localeCompare(b.program));
  saveState();
  render();
  resetTargetForm();
}

// Removes the loaded historical registration data.
function handleClearHistoricalData() {
  if (!state.historical?.rows?.length) return;
  if (!confirm("Clear the historical registration benchmark data?")) return;
  state.historical = defaultHistorical();
  saveState();
  render();
}

// Saves Settings values whenever they change.
function handleSettingsChange() {
  state.settings = getThresholds();
  saveState();
  render();
}

// Clears the weekly report upload form.
function resetReportForm() {
  els.reportForm.reset();
  els.reportWeek.value = todayIsoDate();
  els.reportFileName.textContent = "No file selected";
}

// Clears the historical file upload form.
function resetHistoricalForm() {
  els.historicalForm.reset();
  els.historicalFileName.textContent = "No file selected";
}

// Clears the budget target form.
function resetTargetForm() {
  els.targetForm.reset();
}

// Clears the outreach form after saving.
function resetOutreachForm() {
  els.outreachForm.reset();
  els.contactDate.value = todayIsoDate();
}

// File parsing and report import
// Checks that the local Excel parser is available.
async function ensureXlsx() {
  if (window.XLSX) return window.XLSX;

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "vendor/xlsx.full.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  }).catch(() => null);

  return window.XLSX || null;
}

// Turns an uploaded Excel or CSV file into rows the app can use.
async function parseFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension === "csv") {
    return parseCsv(await file.text());
  }
  const xlsx = await ensureXlsx();
  if (!xlsx) {
    throw new Error("Excel support did not load. Save the report as CSV, then try again.");
  }
  const buffer = await file.arrayBuffer();
  const workbook = xlsx.read(buffer, { type: "array" });
  let bestSheetRecords = [];
  let bestSheetScore = -1;

  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const records = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: "", blankrows: false });
    const score = headerScore(records);
    if (score > bestSheetScore) {
      bestSheetScore = score;
      bestSheetRecords = records;
    }
  });

  return rowsFromRecords(bestSheetRecords);
}

// Reads CSV text into rows.
function parseCsv(text) {
  const records = [];
  let cell = "";
  let row = [];
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === "\"" && quoted && next === "\"") {
      cell += "\"";
      i++;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i++;
      row.push(cell);
      records.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    records.push(row);
  }
  return rowsFromRecords(records);
}

// Converts raw spreadsheet records into normalized student rows.
function rowsFromRecords(records) {
  const cleanRecords = records
    .map(record => record.map(clean))
    .filter(record => record.some(Boolean));
  if (!cleanRecords.length) return [];

  const headerIndex = findHeaderIndex(cleanRecords);
  const headers = cleanRecords[headerIndex].map((header, index) => {
    const mapped = aliases[compact(header)] || header || `Column ${index + 1}`;
    return mapped;
  });

  return cleanRecords.slice(headerIndex + 1)
    .filter(record => record.some(Boolean))
    .map(record => {
      const row = {};
      headers.forEach((header, index) => {
        const value = record[index] || "";
        if (!header.startsWith("Column ") || value) row[header] = value;
      });
      expectedColumns.forEach(column => {
        if (!(column in row)) row[column] = "";
      });
      return row;
    });
}

// Finds the row that contains the spreadsheet column headers.
function findHeaderIndex(records) {
  let bestIndex = 0;
  let bestScore = -1;

  records.slice(0, 30).forEach((record, index) => {
    const score = headerRecordScore(record);
    if (score > bestScore) {
      bestIndex = index;
      bestScore = score;
    }
  });

  return bestIndex;
}

// Scores possible header rows so the app can pick the right one.
function headerScore(records) {
  if (!records?.length) return -1;
  return Math.max(...records.slice(0, 30).map(headerRecordScore));
}

// Scores one row based on how many expected columns it contains.
function headerRecordScore(record) {
  const mappedHeaders = record.map(value => aliases[compact(value)]).filter(Boolean);
  const uniqueMappedHeaders = new Set(mappedHeaders);
  return uniqueMappedHeaders.size + (uniqueMappedHeaders.has("ID") ? 3 : 0);
}

// Navigation and print/PDF support
// Shows one tab and hides the others.
function setActiveTab(tabName) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-view").forEach(view => {
    view.classList.toggle("active", view.id === `${tabName}Tab`);
  });
}

// Moves the user from a metric card to the matching student list.
function focusDashboardList(listName) {
  if (["resolved", "new", "afterOutreach"].includes(listName)) {
    setActiveTab("comparison");
    focusComparisonList(listName);
    return;
  }

  if (listName === "contacted") {
    els.hideContactedStudents.checked = false;
    els.flagFilter.value = "contacted";
    render();
  }

  setActiveTab("students");
  const section = document.getElementById("studentsSection");
  section.open = true;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Temporarily switches to Insights and opens the print dialog.
function exportInsightsPdf() {
  restoreTabAfterPrint = document.querySelector(".tab.active")?.dataset.tab || "students";
  setActiveTab("insights");
  document.body.classList.add("printing-insights");
  window.print();
}

// Returns the app to the previous tab after printing.
function restoreAfterInsightsPrint() {
  if (!document.body.classList.contains("printing-insights")) return;
  document.body.classList.remove("printing-insights");
  if (restoreTabAfterPrint) setActiveTab(restoreTabAfterPrint);
  restoreTabAfterPrint = null;
}

// Renames spreadsheet columns into the app's standard column names.
function normalizeRow(row) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    const mapped = aliases[compact(key)] || clean(key);
    normalized[mapped] = clean(value);
  });
  return normalized;
}

// Standardizes one row from the historical registration file.
function normalizeHistoricalRegistrationRow(row) {
  const normalized = normalizeRow(row);
  const registrationDate = parseHistoricalDate(normalized["Registration Date"]
    || rowValueByCompactKey(normalized, "registrationdate")
    || rowValueByCompactKey(normalized, "registereddate")
    || rowValueByCompactKey(normalized, "dateregistered")
    || rowValueByCompactKey(normalized, "regdate"));

  return {
    studentId: clean(normalized.ID || rowValueByCompactKey(normalized, "studentid")),
    registrationDate,
    program: studentProgramKey(normalized) || normalizeProgram(rowValueByCompactKey(normalized, "program")) || "Uncategorized",
    level: clean(normalized.Level || normalized["Group Level"]),
    term: clean(normalized.Term || normalized["Admit Term"])
  };
}

// Filters out footer text and other rows that are not real students.
function isStudentRow(row) {
  const id = clean(row.ID);
  if (!id) return false;

  const rowText = compact(Object.values(row).join(" "));
  const disclaimerMarkers = [
    "preparedbytheregistrarsoffice",
    "preparedbyregistrarsoffice",
    "registrarsoffice",
    "studentdataishighlyconfidential",
    "informationsecuritybestpractices",
    "theinformationinthisemailmessage",
    "anyattachmentsorfilesisconfidential",
    "distributioncopyingordisclosureisstrictlyprohibited"
  ];
  if (disclaimerMarkers.some(marker => rowText.includes(marker))) return false;

  const idLooksReasonable = /^[a-z]?\d{5,12}$/i.test(id) || /^\d{4,12}$/.test(id);
  const hasName = Boolean(studentLastName(row) || studentFirstName(row));
  const hasStudentFields = [
    row["Dalhousie Email"],
    row.Level,
    row["Group Level"],
    getCreditHours(row),
    row["Cumulative GPA"],
    row["Program Description"],
    row["Program Code"],
    row["Degree Description"]
  ].filter(Boolean).length >= 2;

  return idLooksReasonable || (hasName && hasStudentFields);
}

// Checks whether a report is missing expected columns.
function missingColumns(rows) {
  if (!rows.length) return requiredColumns;
  const available = new Set(Object.keys(rows[0]));
  return requiredColumns.filter(column => !available.has(column));
}

// Adds a new report week or replaces an existing one with the same date.
function upsertSnapshot(snapshot) {
  const index = state.snapshots.findIndex(item => item.week === snapshot.week);
  if (index >= 0) state.snapshots[index] = snapshot;
  else state.snapshots.push(snapshot);
  state.snapshots.sort((a, b) => a.week.localeCompare(b.week));
}

// Rendering
// Redraws the whole dashboard from the current saved data.
function render() {
  if (syncOutreachRegisteredResults()) saveState();
  const latest = latestSnapshot();
  const latestRows = decorateStudents(latest?.rows || []);
  const metricStudents = getMetricStudents();
  const filteredStudents = getFilteredStudents();
  renderStatus(latest);
  renderUploadSummary(latest);
  renderFilters(latestRows);
  renderMetrics(metricStudents);
  renderStudents(filteredStudents);
  renderComparison();
  renderStats();
  renderHistorical();
  renderTargets();
  renderReportHistory();
  renderOutreach();
  renderCharts();
}

// Returns the newest report by report date.
function latestSnapshot() {
  return state.snapshots[state.snapshots.length - 1] || null;
}

// Returns the report immediately before the latest report.
function priorSnapshot() {
  return state.snapshots[state.snapshots.length - 2] || null;
}

// Automatically marks contacted students as registered when they disappear from a later report.
function syncOutreachRegisteredResults() {
  const latest = latestSnapshot();
  if (!latest || state.snapshots.length < 2 || !state.outreach.length) return false;

  const latestIds = new Set(latest.rows.map(row => clean(row.ID)).filter(Boolean));
  const previousIds = new Set(state.snapshots
    .slice(0, -1)
    .flatMap(snapshot => snapshot.rows.map(row => clean(row.ID)).filter(Boolean)));
  let changed = false;

  state.outreach.forEach(row => {
    const studentId = clean(row.studentId);
    if (!studentId || !previousIds.has(studentId)) return;
    if (row.manualResult) return;

    const registeredSinceLastReport = !latestIds.has(studentId);
    if (registeredSinceLastReport && row.result !== "Registered") {
      row.result = "Registered";
      row.autoResult = "registered";
      delete row.manualResult;
      changed = true;
      return;
    }

    if (!registeredSinceLastReport && row.autoResult === "registered" && row.result === "Registered") {
      row.result = "Pending";
      delete row.autoResult;
      changed = true;
    }
  });

  return changed;
}

// Reads one or more student IDs from the outreach form.
function getOutreachStudentIds() {
  const ids = clean(els.contactStudentId.value).split(/[\s,;]+/)
    .map(clean)
    .filter(Boolean);

  return [...new Set(ids)];
}

// Checks whether a student ID exists in any uploaded report.
function hasUploadedStudentId(studentId) {
  const id = clean(studentId);
  return state.snapshots.some(snapshot => snapshot.rows.some(row => clean(row.ID) === id));
}

// Builds the warning shown when outreach IDs are not in the uploaded data.
function unknownOutreachMessage(unknownIds) {
  const shownIds = unknownIds.slice(0, 12).join(", ");
  const hiddenCount = unknownIds.length - 12;
  const moreText = hiddenCount > 0 ? `, and ${hiddenCount.toLocaleString()} more` : "";
  const countText = `${unknownIds.length.toLocaleString()} ${pluralize("ID", unknownIds.length)}`;
  const verb = unknownIds.length === 1 ? "was" : "were";
  return `${countText} ${verb} not found in the uploaded reports:\n\n${shownIds}${moreText}\n\nSave the contact anyway?`;
}

// Adds calculated fields, flags, and outreach history to student rows.
function decorateStudents(rows) {
  const thresholds = getThresholds();
  return rows.map(row => {
    const credits = getCreditHours(row);
    const gpa = getGpa(row);
    const contacts = state.outreach.filter(item => item.studentId === row.ID)
      .sort((a, b) => b.date.localeCompare(a.date));
    const lastContact = contacts[0] || null;
    const emailHoldContact = contacts.find(isEmailHoldActive) || null;
    const flags = [];
    if (credits === 0 && gpa === 0) flags.push({ key: "newStudent", label: "New student", tone: "info" });
    if (isTransferStudent(row)) flags.push({ key: "transferStudent", label: "Transfer student", tone: "transfer" });
    if (isLongTimeEnrolled(row, thresholds.longEnrolledYears)) flags.push({ key: "longTimeEnrolled", label: "5+ Years Enrolled", tone: "warn" });
    if (credits >= thresholds.nearGradHours) flags.push({ key: "nearGraduate", label: "Near graduation", tone: "good" });
    if (credits >= thresholds.academicRiskMinCredits && gpa > 0 && gpa <= thresholds.riskGpa) flags.push({ key: "academicRisk", label: "Academic risk", tone: "warn" });
    if (lastContact) flags.push({ key: "contacted", label: "Contacted", tone: "good" });
    if (emailHoldContact) flags.push({ key: "emailHold", label: "Email hold", tone: "warn" });
    return { ...row, credits, gpa, contacts, lastContact, emailHoldContact, flags };
  });
}

// Checks whether an outreach row creates an email hold.
function isEmailHoldActive(row) {
  return Boolean(row?.emailHold);
}

// Returns the latest students after Focus filters and list exclusions.
function getFilteredStudents() {
  const latest = latestSnapshot();
  return applyStudentListExclusions(applyFocusFilters(decorateStudents(latest?.rows || []))).sort(prioritySort);
}

// Returns the latest students used by the top metric cards.
function getMetricStudents() {
  const latest = latestSnapshot();
  return applyFocusFilters(decorateStudents(latest?.rows || []), { includeFlag: false }).sort(prioritySort);
}

// Removes held or contacted students when those list checkboxes are selected.
function applyStudentListExclusions(students) {
  if (els.hideEmailHoldStudents.checked) students = students.filter(student => !student.emailHoldContact);
  if (els.hideContactedStudents.checked) students = students.filter(student => !student.lastContact);
  return students;
}

// Applies the left-side Focus filters to student rows.
function applyFocusFilters(students, options = {}) {
  const includeSearch = options.includeSearch !== false;
  const includeFlag = options.includeFlag !== false;
  const query = compact(els.searchInput.value);
  const level = els.levelFilter.value;
  const program = els.programFilter.value;
  const flag = els.flagFilter.value;
  const creditRanges = selectedCreditHourRanges();

  if (includeSearch && query) {
    students = students.filter(student => compact([
      student.ID,
      studentLastName(student),
      studentFirstName(student),
      student["Dalhousie Email"],
      student["Program Description"],
      student["Program Code"]
    ].join(" ")).includes(query));
  }
  if (level) students = students.filter(student => matchesLevel(student, level));
  if (program) students = students.filter(student => studentProgramKey(student) === program);
  if (creditRanges.length) students = students.filter(student => creditRanges.some(range => matchesCreditHourRange(student, range)));
  if (includeFlag) {
    if (flag === "notContacted") students = students.filter(student => !student.lastContact);
    else if (flag) students = students.filter(student => student.flags.some(item => item.key === flag));
  }

  return students;
}

// Reads the checked credit-hour filters.
function selectedCreditHourRanges() {
  return els.creditHourFilters
    .filter(input => input.checked)
    .map(input => input.value);
}

// Checks whether a student belongs in one credit-hour filter range.
function matchesCreditHourRange(student, range) {
  const credits = number(student.credits ?? getCreditHours(student));
  if (range === "zero") return credits === 0;
  if (range === "under60") return credits > 0 && credits < 60;
  if (range === "60to89") return credits >= 60 && credits < 90;
  if (range === "90to114") return credits >= 90 && credits < 115;
  if (range === "115plus") return credits >= 115;
  return true;
}

// Applies Focus filters to historical registration rows.
function applyHistoricalFocusFilters(rows) {
  const query = compact(els.searchInput.value);
  const level = els.levelFilter.value;
  const program = els.programFilter.value;

  return rows.filter(row => {
    if (query && !compact([row.studentId, row.program, row.level, row.term].join(" ")).includes(query)) return false;
    if (level && !historicalMatchesLevel(row, level)) return false;
    if (program && row.program !== program) return false;
    return true;
  });
}

// Checks whether a historical row matches the selected level.
function historicalMatchesLevel(row, selectedLevel) {
  const normalizedLevel = compact(row.level);
  const selected = compact(selectedLevel);
  if (!selected) return true;
  if (selected === normalizedLevel) return true;
  if (selected.includes("undergrad") || selected === "ug") return normalizedLevel.includes("undergrad") || normalizedLevel === "ug";
  if (selected.includes("grad") || selected === "gr") return normalizedLevel.includes("grad") || normalizedLevel === "gr";
  return false;
}

// Sorts students so higher-priority records appear first.
function prioritySort(a, b) {
  const score = studentScore(b) - studentScore(a);
  if (score) return score;
  return studentLastName(a).localeCompare(studentLastName(b));
}

// Calculates a simple priority score from student flags.
function studentScore(student) {
  return student.flags.reduce((total, flag) => {
    if (flag.key === "academicRisk") return total + 8;
    if (flag.key === "nearGraduate") return total + 4;
    if (flag.key === "longTimeEnrolled") return total + 3;
    if (flag.key === "newStudent") return total + 2;
    if (flag.key === "transferStudent") return total + 2;
    if (flag.key === "contacted") return total - 1;
    return total;
  }, 0);
}

// Updates the latest-report text in the page header.
function renderStatus(latest) {
  if (!latest) {
    els.datasetStatus.textContent = "Latest report: none loaded";
    return;
  }
  els.datasetStatus.textContent = `Latest report: ${formatDate(latest.week)}`;
}

// Shows the latest report and report count under the upload button.
function renderUploadSummary(latest) {
  const reportCount = state.snapshots.length;
  els.uploadSummary.innerHTML = `
    <div>
      <span>Latest report</span>
      <strong>${latest ? escapeHtml(formatDate(latest.week)) : "None loaded"}</strong>
    </div>
    <div>
      <span>Reports loaded</span>
      <strong>${reportCount.toLocaleString()}</strong>
    </div>
  `;
}

// Builds the program and flag filter options.
function renderFilters(students) {
  fillSelect(els.levelFilter, "All levels", unique(students.map(row => row.Level || row["Group Level"])));
  const programRows = els.levelFilter.value
    ? students.filter(student => matchesLevel(student, els.levelFilter.value))
    : students;
  fillSelect(els.programFilter, "All programs", unique(programRows.map(studentProgramKey)));
}

// Fills one dropdown with a label and option values.
function fillSelect(select, label, values) {
  const current = select.value;
  select.innerHTML = `<option value="">${label}</option>`;
  values.forEach(value => {
    if (!value) return;
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

// Draws the top dashboard metric cards.
function renderMetrics(students) {
  const comparison = getComparison({ includeFlag: false });
  const averageWeeks = averageWeeksOnReport(students);
  const registrationRate = comparison.previousRows.length
    ? (comparison.resolved.length / comparison.previousRows.length) * 100
    : null;
  const contactedPrevious = comparison.previousRows.filter(student => student.lastContact).length;
  const contactRegistrationRate = contactedPrevious
    ? (comparison.resolvedAfterContact.length / contactedPrevious) * 100
    : null;
  const outreachResponseStats = responseRateStats();
  const metrics = [
    { label: "Eligible not registered", value: students.length, note: comparison.previous ? delta(students.length - comparison.previousRows.length) : "Latest report", list: "students" },
    { label: "Registered since last report", value: comparison.resolved.length, note: comparison.previous ? "Since prior report" : "Needs 2 reports", list: "resolved" },
    { label: "Newly listed", value: comparison.newStudents.length, note: comparison.previous ? "Since prior report" : "Needs 2 reports", list: "new" },
    { label: "Contacted", value: students.filter(row => row.lastContact).length, note: "On latest report", list: "contacted" },
    { label: "After outreach", value: comparison.resolvedAfterContact.length, note: "Registered since being contacted", list: "afterOutreach" },
    { label: "Average weeks on report", value: formatNumber(averageWeeks), note: pluralize("week", averageWeeks), list: "students" },
    { label: "Registration rate", value: registrationRate === null ? "N/A" : `${formatNumber(registrationRate)}%`, note: comparison.previous ? "Since last report" : "Needs 2 reports", list: "resolved" },
    { label: "Response rate", value: outreachResponseStats.rate === null ? "N/A" : `${formatNumber(outreachResponseStats.rate)}%`, note: "Responded/contacted", list: "contacted" },
    { label: "After contact rate", value: contactRegistrationRate === null ? "N/A" : `${formatNumber(contactRegistrationRate)}%`, note: comparison.previous ? "Registered/contacted" : "Needs 2 reports", list: "afterOutreach" }
  ];
  els.metrics.innerHTML = metrics.map(metric => `
    <button class="metric" type="button" data-dashboard-list="${escapeHtml(metric.list)}">
      <span>${escapeHtml(metric.label)}</span>
      <strong>${typeof metric.value === "number" ? Number(metric.value).toLocaleString() : escapeHtml(metric.value)}</strong>
      <small>${escapeHtml(metric.note)}</small>
    </button>
  `).join("");
}

// Compares the latest report with the previous report.
function getComparison(filterOptions = {}) {
  const current = latestSnapshot();
  const previous = priorSnapshot();
  if (!current) {
    return {
      current,
      previous,
      currentRows: [],
      previousRows: [],
      resolved: [],
      newStudents: [],
      stillListed: [],
      resolvedAfterContact: []
    };
  }

  const currentRows = applyFocusFilters(decorateStudents(current.rows), filterOptions);

  if (!previous) {
    return {
      current,
      previous,
      currentRows,
      previousRows: [],
      resolved: [],
      newStudents: [],
      stillListed: [],
      resolvedAfterContact: []
    };
  }

  const previousRows = applyFocusFilters(decorateStudents(previous.rows), filterOptions);
  const currentById = byId(currentRows);
  const previousById = byId(previousRows);
  const currentIds = new Set(currentById.keys());
  const previousIds = new Set(previousById.keys());

  const resolved = [...previousIds]
    .filter(id => !currentIds.has(id))
    .map(id => previousById.get(id))
    .sort(prioritySort);

  const newStudents = [...currentIds]
    .filter(id => !previousIds.has(id))
    .map(id => currentById.get(id))
    .sort(prioritySort);

  const stillListed = [...currentIds]
    .filter(id => previousIds.has(id))
    .map(id => currentById.get(id))
    .sort(prioritySort);

  const resolvedAfterContact = resolved.filter(student => student.lastContact);

  return { current, previous, currentRows, previousRows, resolved, newStudents, stillListed, resolvedAfterContact };
}

// Draws the Week-over-week tab.
function renderComparison() {
  const comparison = getComparison();
  if (!comparison.current) {
    els.comparisonTitle.textContent = "Upload a report";
    els.comparisonSummary.innerHTML = `
      <button class="compare-card" type="button" disabled>
        <span>Latest report</span>
        <strong>0</strong>
        <small>No report loaded yet.</small>
      </button>
    `;
    els.comparisonMovementChart.innerHTML = "";
    updateComparisonSectionCounts(0, 0, 0);
    els.resolvedRows.innerHTML = `<tr><td colspan="5" class="empty">Load a report to begin.</td></tr>`;
    els.newRows.innerHTML = `<tr><td colspan="5" class="empty">Load a report to begin.</td></tr>`;
    els.afterOutreachRows.innerHTML = `<tr><td colspan="5" class="empty">Load a report to begin.</td></tr>`;
    return;
  }

  if (!comparison.previous) {
    const nearGraduation = comparison.currentRows.filter(row => row.flags.some(flag => flag.key === "nearGraduate")).length;
    const academicRisk = comparison.currentRows.filter(row => row.flags.some(flag => flag.key === "academicRisk")).length;
    const contacted = comparison.currentRows.filter(row => row.lastContact).length;

    els.comparisonTitle.textContent = `${formatDate(comparison.current.week)} latest report`;
    els.comparisonSummary.innerHTML = renderComparisonCards([
      { label: "Latest report", value: comparison.currentRows.length, note: comparison.current.fileName },
      { label: "Contacted", value: contacted, note: "On latest report" },
      { label: "Near graduation", value: nearGraduation, note: "Credit threshold" },
      { label: "Academic risk", value: academicRisk, note: "GPA and credit threshold" },
      { label: "Registered since last report", value: 0, note: "Needs a prior report" },
      { label: "Newly listed", value: 0, note: "Needs a prior report" }
    ]);
    els.comparisonMovementChart.innerHTML = renderComparisonMovementChart([
      { label: "Latest report", value: comparison.currentRows.length, color: "teal" },
      { label: "Contacted", value: contacted, color: "purple" },
      { label: "Near graduation", value: nearGraduation, color: "green" },
      { label: "Academic risk", value: academicRisk, color: "amber" }
    ]);
    updateComparisonSectionCounts(0, 0, 0);
    els.resolvedRows.innerHTML = `<tr><td colspan="5" class="empty">Load an earlier report to see who registered since last report.</td></tr>`;
    els.newRows.innerHTML = `<tr><td colspan="5" class="empty">Load an earlier report to see who is newly listed.</td></tr>`;
    els.afterOutreachRows.innerHTML = `<tr><td colspan="5" class="empty">Load an earlier report to see who registered after outreach.</td></tr>`;
    return;
  }

  const resolvedRate = comparison.previousRows.length
    ? Math.round((comparison.resolved.length / comparison.previousRows.length) * 100)
    : 0;
  const outreachRate = comparison.resolved.length
    ? Math.round((comparison.resolvedAfterContact.length / comparison.resolved.length) * 100)
    : 0;

  els.comparisonTitle.textContent = `${formatDate(comparison.previous.week)} to ${formatDate(comparison.current.week)}`;
  els.comparisonSummary.innerHTML = renderComparisonCards([
    { label: "Prior report", value: comparison.previousRows.length, note: comparison.previous.fileName },
    { label: "Latest report", value: comparison.currentRows.length, note: comparison.current.fileName },
    { label: "Registered since last report", value: comparison.resolved.length, note: `${resolvedRate}% of prior list · View list`, list: "resolved" },
    { label: "Newly listed", value: comparison.newStudents.length, note: "Appeared this week · View list", list: "new" },
    { label: "Still listed", value: comparison.stillListed.length, note: "On both reports" },
    { label: "After outreach", value: comparison.resolvedAfterContact.length, note: `${outreachRate}% registered since being contacted · View list`, list: "afterOutreach" }
  ]);
  els.comparisonMovementChart.innerHTML = renderComparisonMovementChart([
    { label: "Prior report", value: comparison.previousRows.length, color: "teal" },
    { label: "Latest report", value: comparison.currentRows.length, color: "blue" },
    { label: "Registered since last report", value: comparison.resolved.length, color: "green" },
    { label: "Still listed", value: comparison.stillListed.length, color: "amber" },
    { label: "Registered since being contacted", value: comparison.resolvedAfterContact.length, color: "purple" }
  ]);

  updateComparisonSectionCounts(comparison.resolved.length, comparison.newStudents.length, comparison.resolvedAfterContact.length);
  renderComparisonRows(els.resolvedRows, comparison.resolved, "resolved");
  renderComparisonRows(els.newRows, comparison.newStudents, "new");
  renderComparisonRows(els.afterOutreachRows, comparison.resolvedAfterContact, "resolved");
}

// Builds small summary cards for comparison-style sections.
function renderComparisonCards(items) {
  return items.map(item => `
    <button class="compare-card ${item.list ? "clickable" : ""}" type="button" ${item.list ? `data-comparison-list="${item.list}"` : "disabled"}>
      <span>${escapeHtml(item.label)}</span>
      <strong>${Number(item.value).toLocaleString()}</strong>
      <small>${escapeHtml(item.note)}</small>
    </button>
  `).join("");
}

// Builds the bar chart for weekly movement.
function renderComparisonMovementChart(items) {
  const maxValue = Math.max(...items.map(item => item.value), 0);
  return `
    <div class="panel-title">
      <h3>Weekly comparison</h3>
      <span class="tag">Current focus</span>
    </div>
    <div class="movement-bars">
      ${items.map(item => {
        const width = maxValue ? Math.max(4, (item.value / maxValue) * 100) : 0;
        return `
          <div class="movement-row">
            <span>${escapeHtml(item.label)}</span>
            <div class="movement-track">
              <div class="movement-fill ${escapeHtml(item.color)}" style="width: ${width}%"></div>
            </div>
            <strong>${Number(item.value).toLocaleString()}</strong>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// Opens the matching Week-over-week list after a card click.
function focusComparisonList(listName) {
  const targetId = {
    resolved: "resolvedSection",
    new: "newSection",
    afterOutreach: "afterOutreachSection"
  }[listName];
  const section = document.getElementById(targetId);
  if (!section) return;

  document.querySelectorAll(".comparison-list-section").forEach(item => item.classList.remove("selected"));
  document.querySelectorAll("[data-comparison-list]").forEach(item => item.classList.remove("selected"));
  section.open = true;
  section.classList.add("selected");
  els.comparisonSummary.querySelector(`[data-comparison-list="${listName}"]`)?.classList.add("selected");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Updates counts shown in collapsible comparison list headings.
function updateComparisonSectionCounts(resolvedCount, newCount, afterOutreachCount = 0) {
  els.resolvedSummaryCount.textContent = `${resolvedCount.toLocaleString()} ${pluralize("student", resolvedCount)}`;
  els.newSummaryCount.textContent = `${newCount.toLocaleString()} ${pluralize("student", newCount)}`;
  els.afterOutreachSummaryCount.textContent = `${afterOutreachCount.toLocaleString()} ${pluralize("student", afterOutreachCount)}`;
}

// Draws the simple statistics shown on the Insights tab.
function renderStats() {
  const latest = latestSnapshot();
  if (!latest) {
    els.statsList.innerHTML = `<div class="empty">Load a report to see stats.</div>`;
    return;
  }

  const students = applyFocusFilters(decorateStudents(latest.rows));
  const internationalStudents = students.filter(isInternationalStudent).length;
  const internationalShare = students.length
    ? (internationalStudents / students.length) * 100
    : null;
  const creditMilestones = creditMilestoneStats(students);
  els.statsList.innerHTML = `
    <article class="stat-row stat-row-block">
      <div>
        <strong>Credit completion milestones</strong>
        <span>Current unregistered students by completed credit hours</span>
      </div>
      <div class="stat-breakdown">
        ${renderCreditMilestones(creditMilestones)}
      </div>
    </article>
    <article class="stat-row">
      <div>
        <strong>International student share</strong>
        <span>${internationalStudents.toLocaleString()} of ${students.length.toLocaleString()} current unregistered students are international based on Citizenship Group</span>
      </div>
      <div class="stat-value">
        <strong>${internationalShare === null ? "N/A" : `${formatNumber(internationalShare)}%`}</strong>
        <span>of unregistered</span>
      </div>
    </article>
  `;
}

// Draws the historical benchmark area.
function renderHistorical() {
  const rows = state.historical?.rows || [];
  const filteredRows = applyHistoricalFocusFilters(rows);
  const latest = latestSnapshot();
  const students = latest ? applyFocusFilters(decorateStudents(latest.rows)) : [];

  if (!rows.length) {
    els.historicalStatus.innerHTML = `<div class="empty mini">Load last year's registration-date file to build historical benchmarks.</div>`;
    els.historicalMetrics.innerHTML = "";
    els.historicalTrend.innerHTML = "";
    els.historicalProgramRows.innerHTML = `<div class="stat-breakdown-empty">No historical data loaded.</div>`;
    els.historicalForecastRows.innerHTML = `<div class="stat-breakdown-empty">No historical data loaded.</div>`;
    els.historicalRiskRows.innerHTML = `<tr><td colspan="4" class="empty">No historical data loaded.</td></tr>`;
    return;
  }

  const benchmark = historicalBenchmark(filteredRows, students);
  els.historicalStatus.innerHTML = `
    <div class="history-item">
      <div>
        <strong>${escapeHtml(state.historical.fileName || "Historical registrations")}</strong>
        <span>${filteredRows.length.toLocaleString()} of ${rows.length.toLocaleString()} historical registration ${pluralize("row", rows.length)} in current focus</span>
      </div>
      <small>Benchmark date: ${escapeHtml(benchmark.asOfLabel)}</small>
    </div>
  `;
  els.historicalMetrics.innerHTML = renderComparisonCards([
    { label: "Last year by this date", value: benchmark.historicalByDate, note: `${formatNumber(benchmark.historicalRate)}% of historical registrations` },
    { label: "Current pace", value: benchmark.currentRegistered, note: benchmark.currentRate === null ? "Needs at least 2 weekly reports" : `${formatNumber(benchmark.currentRate)}% since first loaded report` },
    { label: "Pace gap", value: benchmark.paceGap === null ? 0 : Math.round(benchmark.paceGap), note: benchmark.paceGap === null ? "Needs current pace" : `${benchmark.paceGap >= 0 ? "Ahead" : "Behind"} last year's pace` },
    { label: "Next 14 days forecast", value: Math.round(benchmark.forecasts.find(row => row.days === 14)?.estimate || 0), note: "Based on last year's date pattern" }
  ]);
  els.historicalTrend.innerHTML = renderHistoricalTrend(filteredRows, benchmark.asOfDay);
  els.historicalProgramRows.innerHTML = renderHistoricalProgramRows(benchmark.programRows);
  els.historicalForecastRows.innerHTML = renderHistoricalForecastRows(benchmark.forecasts);
  els.historicalRiskRows.innerHTML = renderHistoricalRiskRows(benchmark.riskRows);
}

// Draws the Benchmarks & Targets summary and table.
function renderTargets() {
  renderTargetProgramOptions();
  const rows = targetRows();
  if (!rows.length) {
    els.targetSummary.innerHTML = renderComparisonCards([
      { label: "Total target", value: 0, note: "Fall 2026 budget enrolment" },
      { label: "Estimated registered", value: 0, note: "Target minus current unregistered" },
      { label: "Remaining gap", value: 0, note: "Still on latest report" }
    ]);
    els.targetRows.innerHTML = `<tr><td colspan="5" class="empty">No budget enrolment targets available.</td></tr>`;
    return;
  }

  const totalTarget = rows.reduce((sum, row) => sum + row.target, 0);
  const estimatedRegistered = rows.reduce((sum, row) => sum + row.estimatedRegistered, 0);
  const currentUnregistered = rows.reduce((sum, row) => sum + row.currentUnregistered, 0);
  els.targetSummary.innerHTML = renderComparisonCards([
    { label: "Total target", value: totalTarget, note: "Budget enrolment" },
    { label: "Estimated registered", value: estimatedRegistered, note: "Target minus current unregistered" },
    { label: "Remaining gap", value: currentUnregistered, note: "Still on latest report" }
  ]);
  els.targetRows.innerHTML = rows.map(row => `
    <tr>
      <td>${escapeHtml(row.program)}</td>
      <td>${row.target.toLocaleString()}</td>
      <td>${row.estimatedRegistered.toLocaleString()}</td>
      <td>${row.currentUnregistered.toLocaleString()}</td>
      <td>${row.remainingGap.toLocaleString()}</td>
    </tr>
  `).join("");
}

// Builds the program suggestions for target settings.
function renderTargetProgramOptions() {
  const latest = latestSnapshot();
  const latestPrograms = latest ? decorateStudents(latest.rows).map(studentProgramKey) : [];
  const targetPrograms = (state.targets || []).map(row => row.program);
  els.targetProgramOptions.innerHTML = unique([...latestPrograms, ...targetPrograms])
    .map(program => `<option value="${escapeHtml(program)}"></option>`)
    .join("");
}

// Calculates each budget target row.
function targetRows() {
  const latest = latestSnapshot();
  const currentStudents = latest ? applyFocusFilters(decorateStudents(latest.rows), { includeFlag: false }) : [];
  const currentCounts = countBy(currentStudents, student => studentProgramKey(student) || "Uncategorized");
  const targets = state.targets || [];

  return targets
    .filter(row => !els.programFilter.value || row.program === els.programFilter.value)
    .map(row => {
      const currentUnregistered = currentCounts[row.program] || 0;
      const estimatedRegistered = Math.max(0, row.target - currentUnregistered);
      return {
        program: row.program,
        target: row.target,
        estimatedRegistered,
        currentUnregistered,
        remainingGap: currentUnregistered
      };
    })
    .sort((a, b) => (b.target - a.target) || a.program.localeCompare(b.program));
}

// Calculates last-year pace, current pace, gap, and forecasts.
function historicalBenchmark(rows, students) {
  const latest = latestSnapshot();
  const asOfDate = latest?.week || todayIsoDate();
  const asOfDay = dayOfYearFromIso(asOfDate);
  const historicalByDate = rows.filter(row => dayOfYearFromIso(row.registrationDate) <= asOfDay).length;
  const historicalRate = rows.length ? (historicalByDate / rows.length) * 100 : 0;
  const current = currentPaceByProgram();
  const currentRate = current.total ? (current.registered / current.total) * 100 : null;
  const forecasts = [7, 14, 21].map(days => {
    const count = rows.filter(row => isDayInWindow(dayOfYearFromIso(row.registrationDate), asOfDay, days)).length;
    const rate = rows.length ? (count / rows.length) * 100 : 0;
    return { days, count, rate, estimate: students.length * (rate / 100) };
  });

  return {
    asOfDay,
    asOfLabel: formatDate(asOfDate),
    historicalByDate,
    historicalRate,
    currentRegistered: current.registered,
    currentRate,
    paceGap: currentRate === null ? null : currentRate - historicalRate,
    forecasts,
    programRows: historicalProgramPace(rows, current.byProgram, asOfDay),
    riskRows: historicalLateRiskRows(students, rows, asOfDay)
  };
}

// Calculates current registration pace by program.
function currentPaceByProgram() {
  if (state.snapshots.length < 2) return { total: 0, registered: 0, byProgram: new Map() };
  const firstRows = applyFocusFilters(decorateStudents(state.snapshots[0].rows), { includeFlag: false });
  const latestIds = new Set(applyFocusFilters(decorateStudents(latestSnapshot().rows), { includeFlag: false }).map(student => clean(student.ID)));
  const byProgram = new Map();
  let registered = 0;

  firstRows.forEach(student => {
    const program = studentProgramKey(student) || "Uncategorized";
    const current = byProgram.get(program) || { total: 0, registered: 0 };
    current.total += 1;
    if (!latestIds.has(clean(student.ID))) {
      current.registered += 1;
      registered += 1;
    }
    byProgram.set(program, current);
  });

  return { total: firstRows.length, registered, byProgram };
}

// Compares each program's current pace with last year's pace.
function historicalProgramPace(rows, currentByProgram, asOfDay) {
  const byProgram = new Map();
  rows.forEach(row => {
    const program = row.program || "Uncategorized";
    const current = byProgram.get(program) || { program, historicalTotal: 0, historicalByDate: 0, currentTotal: 0, currentRegistered: 0 };
    current.historicalTotal += 1;
    if (dayOfYearFromIso(row.registrationDate) <= asOfDay) current.historicalByDate += 1;
    byProgram.set(program, current);
  });

  currentByProgram.forEach((value, program) => {
    const current = byProgram.get(program) || { program, historicalTotal: 0, historicalByDate: 0, currentTotal: 0, currentRegistered: 0 };
    current.currentTotal = value.total;
    current.currentRegistered = value.registered;
    byProgram.set(program, current);
  });

  return [...byProgram.values()].map(row => {
    const historicalRate = row.historicalTotal ? (row.historicalByDate / row.historicalTotal) * 100 : null;
    const currentRate = row.currentTotal ? (row.currentRegistered / row.currentTotal) * 100 : null;
    return { ...row, historicalRate, currentRate, gap: currentRate === null || historicalRate === null ? null : currentRate - historicalRate };
  }).sort((a, b) => {
    const aGap = a.gap ?? -999;
    const bGap = b.gap ?? -999;
    return aGap - bGap || b.historicalTotal - a.historicalTotal || a.program.localeCompare(b.program);
  });
}

// Finds current students in programs that were mostly registered by this time last year.
function historicalLateRiskRows(students, rows, asOfDay) {
  const programRates = new Map(historicalProgramPace(rows, new Map(), asOfDay)
    .map(row => [row.program, row.historicalRate || 0]));
  return students
    .map(student => ({ student, benchmarkRate: programRates.get(studentProgramKey(student) || "Uncategorized") || 0 }))
    .filter(row => row.benchmarkRate >= 75)
    .sort((a, b) => b.benchmarkRate - a.benchmarkRate || prioritySort(a.student, b.student))
    .slice(0, 25);
}

// Draws the program pace comparison rows.
function renderHistoricalProgramRows(rows) {
  if (!rows.length) return `<div class="stat-breakdown-empty">No program benchmark data available.</div>`;
  return rows.map(row => {
    const currentText = row.currentRate === null ? "N/A" : `${formatNumber(row.currentRate)}%`;
    const historicalText = row.historicalRate === null ? "N/A" : `${formatNumber(row.historicalRate)}%`;
    const gapText = row.gap === null ? "No current pace" : `${row.gap >= 0 ? "+" : ""}${formatNumber(row.gap)} pts`;
    return `
      <div class="historical-program-row">
        <span>${escapeHtml(row.program)}</span>
        <small>Current ${currentText} · Last year ${historicalText}</small>
        <strong>${escapeHtml(gapText)}</strong>
      </div>
    `;
  }).join("");
}

// Draws the historical forecast rows.
function renderHistoricalForecastRows(rows) {
  if (!rows.length) return `<div class="stat-breakdown-empty">No forecast available.</div>`;
  return rows.map(row => `
    <div class="stat-breakdown-row">
      <span>Next ${row.days} days</span>
      <strong>${Math.round(row.estimate).toLocaleString()}</strong>
      <small>${formatNumber(row.rate)}%</small>
    </div>
  `).join("");
}

// Draws the late-registration risk table rows.
function renderHistoricalRiskRows(rows) {
  if (!rows.length) {
    return `<tr><td colspan="4" class="empty">No current students meet the late-registration risk benchmark.</td></tr>`;
  }

  return rows.map(({ student, benchmarkRate }) => `
    <tr>
      <td>
        <div class="student-name">${escapeHtml(studentName(student))}</div>
        <div class="subtle">${escapeHtml(student.ID)} · ${escapeHtml(student["Dalhousie Email"])}</div>
      </td>
      <td>${escapeHtml(studentProgramKey(student) || "Uncategorized")}</td>
      <td>${formatNumber(benchmarkRate)}% of last year's program registrations were complete by this date</td>
      <td><div class="pills">${renderPills(student.flags || [])}</div></td>
    </tr>
  `).join("");
}

// Draws the historical registration trend line.
function renderHistoricalTrend(rows, asOfDay) {
  const monthly = Array.from({ length: 12 }, (_, index) => ({ month: index + 1, count: 0 }));
  rows.forEach(row => {
    const [, month] = row.registrationDate.split("-").map(Number);
    if (month >= 1 && month <= 12) monthly[month - 1].count += 1;
  });
  let running = 0;
  const cumulative = monthly.map(row => ({ ...row, cumulative: running += row.count }));
  const maxValue = Math.max(...cumulative.map(row => row.cumulative), 1);
  const width = 720;
  const height = 220;
  const padding = { top: 22, right: 22, bottom: 36, left: 48 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const xFor = index => padding.left + (index / 11) * chartWidth;
  const yFor = value => padding.top + chartHeight - (value / maxValue) * chartHeight;
  const points = cumulative.map((row, index) => `${xFor(index)},${yFor(row.cumulative)}`).join(" ");
  const asOfMonth = Math.max(0, Math.min(11, new Date(Date.UTC(2024, 0, asOfDay)).getUTCMonth()));

  return `
    <div class="panel-title">
      <h3>Last year's registration trend</h3>
      <span class="tag">Cumulative by month</span>
    </div>
    <svg class="historical-trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Historical registration trend">
      <line class="line-grid" x1="${padding.left}" y1="${yFor(0)}" x2="${width - padding.right}" y2="${yFor(0)}"></line>
      <line class="line-grid" x1="${padding.left}" y1="${yFor(maxValue)}" x2="${width - padding.right}" y2="${yFor(maxValue)}"></line>
      <text class="line-axis-label" x="${padding.left - 8}" y="${yFor(maxValue) + 4}" text-anchor="end">${maxValue.toLocaleString()}</text>
      <text class="line-axis-label" x="${padding.left - 8}" y="${yFor(0) + 4}" text-anchor="end">0</text>
      <polyline class="line-series" points="${points}" stroke="#0f766e"></polyline>
      <line class="historical-marker" x1="${xFor(asOfMonth)}" y1="${padding.top}" x2="${xFor(asOfMonth)}" y2="${padding.top + chartHeight}"></line>
      ${cumulative.map((row, index) => `
        <circle class="line-point" cx="${xFor(index)}" cy="${yFor(row.cumulative)}" r="3" fill="#0f766e">
          <title>${row.cumulative.toLocaleString()} registrations by month ${row.month}</title>
        </circle>
      `).join("")}
      ${cumulative.map((row, index) => `
        <text class="line-axis-label" x="${xFor(index)}" y="${height - 12}" text-anchor="middle">${monthShortName(row.month)}</text>
      `).join("")}
    </svg>
  `;
}

// Counts students who have reached credit-completion milestones.
function creditMilestoneStats(students) {
  const milestones = [
    { label: "One term or less left", threshold: 115, note: "115+ credits completed" },
    { label: "Two terms or one year left", threshold: 90, note: "90+ credits completed" },
    { label: "Half the degree completed", threshold: 60, note: "60+ credits completed" }
  ];
  return milestones.map(milestone => {
    const count = students.filter(student => number(student.credits) >= milestone.threshold).length;
    const rate = students.length ? (count / students.length) * 100 : 0;
    return { ...milestone, count, total: students.length, rate };
  });
}

// Draws the credit-completion milestone rows.
function renderCreditMilestones(rows) {
  if (!rows.length) return `<div class="stat-breakdown-empty">No students in the selected view.</div>`;
  return rows.map(row => `
    <div class="stat-breakdown-row">
      <span class="stat-breakdown-label">
        <strong>${escapeHtml(row.label)}</strong>
        <small>${escapeHtml(row.note)}</small>
      </span>
      <strong>${row.count.toLocaleString()} / ${row.total.toLocaleString()}</strong>
      <small>${formatNumber(row.rate)}%</small>
    </div>
  `).join("");
}

// Calculates the outreach response rate.
function responseRateStats() {
  const latestByStudent = new Map();
  state.outreach.forEach(row => {
    const studentId = clean(row.studentId);
    if (!studentId) return;
    const existing = latestByStudent.get(studentId);
    if (!existing || clean(row.date).localeCompare(clean(existing.date)) > 0) latestByStudent.set(studentId, row);
  });

  const responseResults = new Set(["Responded", "Registered", "Needs help", "Not eligible"]);
  const contacted = latestByStudent.size;
  const responded = [...latestByStudent.values()].filter(row => responseResults.has(clean(row.result))).length;
  return {
    contacted,
    responded,
    rate: contacted ? (responded / contacted) * 100 : null
  };
}

// Checks Citizenship Group to decide whether a student is international.
function isInternationalStudent(student) {
  const citizenshipGroup = compact(student["Citizenship Group"] || rowValueByCompactKey(student, "citizenshipgroup"));
  const citizenship = compact(student.Citizenship);
  const studentType = compact(student["Student Type Category"]);
  const programCategory = compact(student["Program Category"]);
  const combined = [citizenshipGroup, citizenship, studentType, programCategory].join(" ");
  const internationalMarkers = ["international", "intl", "nonresident", "noncanadian", "notcanadian", "foreign", "studypermit", "visa"];
  const domesticCitizenshipValues = ["canada", "canadian", "ca", "can", "cdn", "domestic", "permanentresident"];

  if (internationalMarkers.some(marker => combined.includes(marker))) return true;
  if (citizenshipGroup && domesticCitizenshipValues.includes(citizenshipGroup)) return false;
  if (citizenshipGroup) return !domesticCitizenshipValues.includes(citizenshipGroup);
  if (!citizenship) return false;
  return !domesticCitizenshipValues.includes(citizenship);
}

// Finds a row value using a compact version of the column name.
function rowValueByCompactKey(row, compactKey) {
  const entry = Object.entries(row).find(([key]) => compact(key) === compactKey);
  return entry ? entry[1] : "";
}

// Calculates how many uploaded reports current students appear on, on average.
function averageWeeksOnReport(students) {
  if (!students.length || !state.snapshots.length) return 0;
  const reportIds = state.snapshots.map(snapshot =>
    new Set(snapshot.rows.map(row => clean(row.ID)).filter(Boolean))
  );
  const totalWeeks = students.reduce((total, student) => {
    const id = clean(student.ID);
    if (!id) return total;
    return total + reportIds.filter(ids => ids.has(id)).length;
  }, 0);
  return totalWeeks / students.length;
}

// Shows the list of uploaded reports with delete buttons.
function renderReportHistory() {
  els.reportHistoryCount.textContent = `${state.snapshots.length.toLocaleString()} ${pluralize("report", state.snapshots.length)}`;
  if (!state.snapshots.length) {
    els.reportHistory.innerHTML = `<div class="empty mini">No reports loaded yet.</div>`;
    return;
  }

  els.reportHistory.innerHTML = [...state.snapshots]
    .sort((a, b) => b.week.localeCompare(a.week))
    .map((snapshot, index) => `
      <div class="history-item">
        <div>
          <strong>${escapeHtml(formatDate(snapshot.week))}</strong>
          <span>${escapeHtml(snapshot.fileName)}</span>
        </div>
        <div class="history-actions">
          <small>${snapshot.rows.length.toLocaleString()} students${index === 0 ? " · latest" : ""}</small>
          <button
            class="icon-button danger-icon"
            type="button"
            aria-label="Delete ${escapeHtml(snapshot.fileName)} for ${escapeHtml(formatDate(snapshot.week))}"
            title="Delete report"
            data-delete-report-week="${escapeHtml(snapshot.week)}"
          >×</button>
        </div>
      </div>
    `).join("");
}

// Deletes one uploaded report week.
function deleteSnapshot(week) {
  const snapshot = state.snapshots.find(item => item.week === week);
  if (!snapshot) return;
  if (!confirm(`Delete ${snapshot.fileName} for ${formatDate(snapshot.week)} from this dashboard?`)) return;

  state.snapshots = state.snapshots.filter(item => item.week !== week);
  saveState();
  render();
}

// Draws student rows for comparison lists.
function renderComparisonRows(container, students, mode) {
  if (!students.length) {
    container.innerHTML = `<tr><td colspan="5" class="empty">No students in this category.</td></tr>`;
    return;
  }

  container.innerHTML = students.map(student => {
    const outreachText = student.lastContact
      ? `${student.lastContact.date} · ${student.lastContact.channel} · ${student.lastContact.result}`
      : "No contact logged";
    const finalCell = mode === "resolved"
      ? escapeHtml(outreachText)
      : `<div class="pills">${renderPills(student.flags || [])}</div>`;

    return `
      <tr>
        <td>
          <div class="student-name">${escapeHtml(studentName(student))}</div>
          <div class="subtle">${escapeHtml(student.ID)} · ${escapeHtml(student["Dalhousie Email"])}</div>
        </td>
        <td>
          ${escapeHtml(student["Program Description"] || student["Degree Description"])}
          <div class="subtle">${escapeHtml(student["Program Category"] || student["Program Code"])}</div>
        </td>
        <td>${formatNumber(student.credits)}</td>
        <td>${formatNumber(student.gpa)}</td>
        <td>${finalCell}</td>
      </tr>
    `;
  }).join("");
}

// Draws the Unregistered Students table.
function renderStudents(students) {
  els.studentCount.textContent = `${students.length.toLocaleString()} unregistered ${pluralize("student", students.length)}`;
  if (!students.length) {
    els.studentRows.innerHTML = document.getElementById("emptyState").innerHTML;
    return;
  }
  els.studentRows.innerHTML = students.map(student => `
    <tr>
      <td>
        <div class="student-name">${escapeHtml(studentName(student))}</div>
        <div class="subtle">${escapeHtml(student.ID)} · ${escapeHtml(student["Dalhousie Email"])}</div>
      </td>
      <td>
        ${escapeHtml(student["Program Description"] || student["Degree Description"])}
        <div class="subtle">${escapeHtml(student["Program Category"] || student["Program Code"])}</div>
      </td>
      <td>${formatNumber(student.credits)}</td>
      <td>${formatNumber(student.gpa)}</td>
      <td><div class="pills">${renderPills(student.flags)}</div></td>
      <td>
        ${student.lastContact ? escapeHtml(`${student.lastContact.date} · ${student.lastContact.channel}`) : "No contact logged"}
        <div class="subtle">${escapeHtml(student.lastContact?.result || "")}</div>
        ${student.emailHoldContact ? `<div class="subtle warn-text">Email hold</div>` : ""}
      </td>
    </tr>
  `).join("");
}

// Draws the colored label pills for a student.
function renderPills(flags) {
  if (!flags.length) return `<span class="pill">Standard</span>`;
  return flags.map(flag => `<span class="pill ${flag.tone || ""}">${escapeHtml(flag.label)}</span>`).join("");
}

// Returns the trash icon used on delete buttons.
function trashIcon() {
  return `
    <svg class="trash-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18"></path>
      <path d="M8 6V4h8v2"></path>
      <path d="M6 6l1 15h10l1-15"></path>
      <path d="M10 10v7"></path>
      <path d="M14 10v7"></path>
    </svg>
  `;
}

// Draws the Student Outreach table.
function renderOutreach() {
  const rows = getFilteredOutreachRows();
  els.outreachCount.textContent = `${rows.length.toLocaleString()} of ${state.outreach.length.toLocaleString()} contacts`;
  if (!state.outreach.length) {
    els.outreachRows.innerHTML = `<tr><td colspan="7" class="empty">No contacts logged.</td></tr>`;
    return;
  }
  if (!rows.length) {
    els.outreachRows.innerHTML = `<tr><td colspan="7" class="empty">No contacts match the current focus.</td></tr>`;
    return;
  }
  els.outreachRows.innerHTML = rows.map(row => {
    const student = findStudentById(row.studentId);
    return `
      <tr>
        <td>${escapeHtml(row.date)}</td>
        <td>
          ${student ? `<div class="student-name">${escapeHtml(studentName(student))}</div>` : ""}
          <div class="subtle">${escapeHtml(row.studentId)}</div>
          ${row.notes ? `<button class="link-button" type="button" data-view-outreach-notes-id="${escapeHtml(row.id)}">View notes</button>` : ""}
        </td>
        <td>${escapeHtml(row.channel)}</td>
        <td>
          <select class="table-select outreach-result-select" data-outreach-result-id="${escapeHtml(row.id)}">
            ${renderOutreachResultOptions(row.result)}
          </select>
        </td>
        <td>
          <div class="email-hold-cell">
            <label class="table-check">
              <input type="checkbox" data-outreach-hold-id="${escapeHtml(row.id)}" ${row.emailHold ? "checked" : ""}>
              <span>Hold</span>
            </label>
          </div>
        </td>
        <td>
          <div class="note-cell">
            <div class="note-entry">
              <input
                class="table-note-input"
                type="text"
                placeholder="Add a note"
                data-outreach-note-id="${escapeHtml(row.id)}"
              >
              <button class="small-button" type="button" data-add-outreach-note-id="${escapeHtml(row.id)}">Add note</button>
            </div>
          </div>
        </td>
        <td class="row-actions">
          <button
            class="icon-button danger-icon trash-button"
            type="button"
            aria-label="Delete outreach contact for ${escapeHtml(student ? studentName(student) : row.studentId)}"
            title="Delete contact"
            data-delete-outreach-id="${escapeHtml(row.id)}"
          >${trashIcon()}</button>
        </td>
      </tr>
    `;
  }).join("");
}

// Returns outreach rows that match the current Focus filters.
function getFilteredOutreachRows() {
  return state.outreach.filter(row => matchesOutreachFocus(row));
}

// Checks whether one outreach row matches the current student filters.
function matchesOutreachFocus(row) {
  const student = findStudentById(row.studentId);
  if (student && !applyFocusFilters([student], { includeSearch: false }).length) return false;

  const query = compact(els.searchInput.value);
  if (query) {
    const searchable = [
      row.studentId,
      row.date,
      row.channel,
      row.result,
      row.notes,
      student ? studentName(student) : "",
      student?.["Dalhousie Email"] || "",
      student?.["Program Description"] || "",
      student?.["Program Code"] || ""
    ].join(" ");
    if (!compact(searchable).includes(query)) return false;
  }

  const level = els.levelFilter.value;
  const program = els.programFilter.value;
  const flag = els.flagFilter.value;
  const creditRanges = selectedCreditHourRanges();
  if (!student && (level || program || flag || creditRanges.length)) return false;
  return true;
}

// Opens the notes pop-up for one outreach record.
function openNotesModal(rowId) {
  const row = state.outreach.find(item => item.id === rowId);
  if (!row) return;

  const student = findStudentById(row.studentId);
  els.notesModalTitle.textContent = student ? studentName(student) : row.studentId;
  els.notesModalMeta.textContent = `${row.date || "No date"} · ${row.channel || "Contact"} · ${row.result || "Pending"}`;
  els.notesModalBody.innerHTML = row.notes
    ? renderOutreachNotes(row)
    : `<p class="subtle">No notes yet.</p>`;
  els.notesModal.hidden = false;
  els.notesModalClose.focus();
}

// Draws notes inside the notes pop-up.
function renderOutreachNotes(row) {
  return splitNotes(row.notes).map((note, index) => `
    <div class="modal-note-row">
      <p>${escapeHtml(note)}</p>
      <button
        class="icon-button danger-icon trash-button"
        type="button"
        aria-label="Delete note"
        title="Delete note"
        data-delete-outreach-note-row-id="${escapeHtml(row.id)}"
        data-delete-outreach-note-index="${index}"
      >${trashIcon()}</button>
    </div>
  `).join("");
}

// Splits stored note text into separate note lines.
function splitNotes(notes) {
  return clean(notes).split("\n").map(note => clean(note)).filter(Boolean);
}

// Closes the notes pop-up.
function closeNotesModal() {
  els.notesModal.hidden = true;
}

// Opens the Settings pop-up.
function openSettingsModal() {
  els.settingsModal.hidden = false;
  els.gradHours.focus();
}

// Closes the Settings pop-up.
function closeSettingsModal() {
  els.settingsModal.hidden = true;
}

// Adds a new note to existing notes.
function appendNote(existingNotes, note) {
  const datedNote = `${new Date().toISOString().slice(0, 10)}: ${note}`;
  return [clean(existingNotes), datedNote].filter(Boolean).join("\n");
}

// Escapes text so it is safe to use in a CSS selector.
function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replaceAll('"', '\\"').replaceAll("\\", "\\\\");
}

// Builds the outreach result dropdown options.
function renderOutreachResultOptions(selectedResult) {
  const selected = clean(selectedResult) || "Pending";
  return ["Pending", "No response", "Responded", "Registered", "Needs help", "Not eligible"].map(result => `
    <option value="${escapeHtml(result)}"${result === selected ? " selected" : ""}>${escapeHtml(result)}</option>
  `).join("");
}

// Redraws all Insights charts.
function renderCharts() {
  syncInsightSelections();
  renderInsightControls();
  renderInsightPies();
  renderInsightTrend();
}

// Keeps saved insight choices valid when options change.
function syncInsightSelections() {
  const weeks = state.snapshots.map(snapshot => snapshot.week);
  state.insights.weeks = state.insights.weeks.filter(week => weeks.includes(week));
  if (!state.insights.weeks.length) {
    state.insights.weeks = weeks.slice(-2);
  }

  const chartKeys = insightChartTypes.map(chart => chart.key);
  state.insights.charts = state.insights.charts.filter(chart => chartKeys.includes(chart));
  if (!state.insights.charts.length) {
    state.insights.charts = ["program", "flag", "contact", "result"];
  }

  const trendKeys = insightTrendTypes.map(trend => trend.key);
  state.insights.trends = state.insights.trends.filter(trend => trendKeys.includes(trend));
  if (!state.insights.trends.length) {
    state.insights.trends = defaultInsights().trends;
  }
}

// Draws the checkboxes for insight charts and trends.
function renderInsightControls() {
  els.insightWeekOptions.innerHTML = state.snapshots.length ? state.snapshots.map(snapshot => `
    <label class="check-option">
      <input type="checkbox" data-insight-week="${escapeHtml(snapshot.week)}" ${state.insights.weeks.includes(snapshot.week) ? "checked" : ""}>
      <span>
        ${escapeHtml(formatDate(snapshot.week))}
        <small>${escapeHtml(snapshot.fileName)}</small>
      </span>
    </label>
  `).join("") : `<div class="empty mini">Load reports to compare weeks.</div>`;

  els.insightChartOptions.innerHTML = insightChartTypes.map(chart => `
    <label class="check-option">
      <input type="checkbox" data-insight-chart="${escapeHtml(chart.key)}" ${state.insights.charts.includes(chart.key) ? "checked" : ""}>
      <span>${escapeHtml(chart.label)}</span>
    </label>
  `).join("");

  els.insightTrendOptions.innerHTML = insightTrendTypes.map(trend => `
    <label class="check-option">
      <input type="checkbox" data-insight-trend="${escapeHtml(trend.key)}" ${state.insights.trends.includes(trend.key) ? "checked" : ""}>
      <span>${escapeHtml(trend.label)}</span>
    </label>
  `).join("");
}

// Draws the selected pie chart groups.
function renderInsightPies() {
  const selectedSnapshots = selectedInsightSnapshots();
  const selectedCharts = insightChartTypes.filter(chart => state.insights.charts.includes(chart.key));

  if (!selectedSnapshots.length) {
    els.insightCharts.innerHTML = `<div class="empty">Check at least one week to display charts.</div>`;
    return;
  }

  if (!selectedCharts.length) {
    els.insightCharts.innerHTML = `<div class="empty">Check at least one chart type.</div>`;
    return;
  }

  els.insightCharts.innerHTML = selectedCharts.map(chart => `
    <section class="insight-card">
      <div class="panel-title">
        <h3>${escapeHtml(chart.title)}</h3>
        <span class="tag">${selectedSnapshots.length.toLocaleString()} ${pluralize("week", selectedSnapshots.length)}</span>
      </div>
      <div class="pie-compare">
        ${selectedSnapshots.map(snapshot => renderWeekPie(snapshot, chart.key)).join("")}
      </div>
    </section>
  `).join("");
}

// Draws one pie chart for one report week.
function renderWeekPie(snapshot, chartKey) {
  const students = applyFocusFilters(decorateStudents(snapshot.rows));
  const counts = insightCounts(chartKey, students);
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  if (!total) {
    return `
      <article class="pie-panel">
        <h4>${escapeHtml(formatDate(snapshot.week))}</h4>
        <div class="empty mini">No matching students</div>
      </article>
    `;
  }

  return `
    <article class="pie-panel">
      <h4>${escapeHtml(formatDate(snapshot.week))}</h4>
      <div class="pie-layout">
        <div class="pie-chart" style="background: ${pieGradient(entries)}">
          <span>${total.toLocaleString()}</span>
        </div>
        <div class="pie-legend">
          ${entries.slice(0, 8).map(([label, value], index) => `
            <div class="legend-row">
              <span class="legend-swatch" style="background: ${pieColors[index % pieColors.length]}"></span>
              <span title="${escapeHtml(label)}">${escapeHtml(label)}</span>
              <strong>${value.toLocaleString()}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    </article>
  `;
}

// Counts students for a selected insight pie chart.
function insightCounts(chartKey, students) {
  if (chartKey === "program") {
    return limitCounts(countBy(students, row => studentProgramKey(row) || "Uncategorized"), 7);
  }
  if (chartKey === "flag") {
    return countBy(students, student => exportFlagForStudent(student) || "No flag");
  }
  if (chartKey === "contact") {
    return countBy(students, student => student.lastContact ? "Contacted" : "Not contacted");
  }
  if (chartKey === "result") {
    return countBy(students, student => student.lastContact?.result || "No contact logged");
  }
  return {};
}

// Keeps the largest chart groups and combines the rest as Other.
function limitCounts(counts, maxEntries) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (entries.length <= maxEntries) return counts;
  const kept = Object.fromEntries(entries.slice(0, maxEntries));
  kept.Other = entries.slice(maxEntries).reduce((sum, [, value]) => sum + value, 0);
  return kept;
}

// Builds the CSS gradient used to display a pie chart.
function pieGradient(entries) {
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  let cursor = 0;
  const stops = entries.map(([, value], index) => {
    const start = cursor;
    cursor += (value / total) * 100;
    const color = pieColors[index % pieColors.length];
    return `${color} ${start.toFixed(2)}% ${cursor.toFixed(2)}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

// Returns the report weeks selected for Insights.
function selectedInsightSnapshots() {
  const selected = new Set(state.insights.weeks);
  return state.snapshots.filter(snapshot => selected.has(snapshot.week));
}

// Draws the multi-week trend line chart and its data table.
function renderInsightTrend() {
  const rows = trendRows();
  if (!rows.length) {
    els.insightTrend.innerHTML = `<div class="empty">Load reports to build trend lines.</div>`;
    return;
  }

  const selectedTrends = insightTrendTypes.filter(trend => state.insights.trends.includes(trend.key));
  if (!selectedTrends.length) {
    els.insightTrend.innerHTML = `<div class="empty">Check at least one trend metric.</div>`;
    return;
  }

  const width = 720;
  const height = 320;
  const padding = { top: 24, right: 26, bottom: 54, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...rows.flatMap(row => selectedTrends.map(trend => row[trend.key])), 1);
  const yMax = niceMax(maxValue);
  const xFor = index => padding.left + (rows.length === 1 ? chartWidth / 2 : (index / (rows.length - 1)) * chartWidth);
  const yFor = value => padding.top + chartHeight - (value / yMax) * chartHeight;
  const gridValues = [0, yMax / 4, yMax / 2, (yMax * 3) / 4, yMax];

  els.insightTrend.innerHTML = `
    <div class="line-chart-wrap">
      <svg class="line-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Trend line chart">
        ${gridValues.map(value => `
          <line class="line-grid" x1="${padding.left}" y1="${yFor(value)}" x2="${width - padding.right}" y2="${yFor(value)}"></line>
          <text class="line-axis-label" x="${padding.left - 10}" y="${yFor(value) + 4}" text-anchor="end">${Math.round(value).toLocaleString()}</text>
        `).join("")}
        ${rows.map((row, index) => `
          <text class="line-axis-label" x="${xFor(index)}" y="${height - 22}" text-anchor="middle">${escapeHtml(formatShortDate(row.week))}</text>
        `).join("")}
        ${selectedTrends.map(trend => {
          const color = trend.color;
          const points = rows.map((row, rowIndex) => `${xFor(rowIndex)},${yFor(row[trend.key])}`).join(" ");
          return `
            <polyline class="line-series" points="${points}" stroke="${color}"></polyline>
            ${rows.map((row, rowIndex) => `
              <circle class="line-point" cx="${xFor(rowIndex)}" cy="${yFor(row[trend.key])}" r="4" fill="${color}">
                <title>${escapeHtml(`${trend.label}: ${row[trend.key].toLocaleString()} on ${formatDate(row.week)}`)}</title>
              </circle>
            `).join("")}
          `;
        }).join("")}
      </svg>
      <div class="line-legend">
        ${selectedTrends.map(trend => {
          return `
            <div class="legend-row">
              <span class="legend-swatch" style="background: ${trend.color}"></span>
              <span>${escapeHtml(trend.label)}</span>
            </div>
          `;
        }).join("")}
      </div>
      <div class="trend-values">
        <table>
          <thead>
            <tr>
              <th>Week</th>
              ${selectedTrends.map(trend => `<th>${escapeHtml(trend.label)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td>${escapeHtml(formatDate(row.week))}</td>
                ${selectedTrends.map(trend => `<td>${Number(row[trend.key] || 0).toLocaleString()}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Builds the data points used by the trend lines.
function trendRows() {
  return state.snapshots.map((snapshot, index) => {
    const students = applyFocusFilters(decorateStudents(snapshot.rows));
    const previousSnapshot = state.snapshots[index - 1];
    const previousStudents = previousSnapshot ? applyFocusFilters(decorateStudents(previousSnapshot.rows)) : [];
    const currentById = byId(students);
    const previousById = byId(previousStudents);
    const currentIds = new Set(currentById.keys());
    const previousIds = new Set(previousById.keys());
    const resolved = [...previousIds]
      .filter(id => !currentIds.has(id))
      .map(id => previousById.get(id));
    const newStudents = [...currentIds]
      .filter(id => !previousIds.has(id))
      .map(id => currentById.get(id));
    const contactedThisPeriod = countContactsForTrendPeriod(previousSnapshot?.week, snapshot.week);

    return {
      week: snapshot.week,
      eligible: students.length,
      new: index === 0 ? 0 : newStudents.length,
      resolved: index === 0 ? 0 : resolved.length,
      contacted: contactedThisPeriod,
      afterOutreach: index === 0 ? 0 : resolved.filter(student => hadContactInPeriod(student.ID, previousSnapshot?.week, snapshot.week)).length,
      risk: students.filter(student => hasFlag(student, "academicRisk")).length,
      nearGraduate: students.filter(student => hasFlag(student, "nearGraduate")).length
    };
  });
}

// Counts unique students contacted in one report-to-report period.
function countContactsForTrendPeriod(startWeek, endWeek) {
  const contactedIds = new Set(state.outreach
    .filter(row => isDateInTrendPeriod(row.date, startWeek, endWeek))
    .map(row => clean(row.studentId))
    .filter(Boolean));
  return contactedIds.size;
}

// Checks whether one student was contacted in a report-to-report period.
function hadContactInPeriod(studentId, startWeek, endWeek) {
  const id = clean(studentId);
  return state.outreach.some(row => clean(row.studentId) === id && isDateInTrendPeriod(row.date, startWeek, endWeek));
}

// Checks whether a date falls inside one trend period.
function isDateInTrendPeriod(date, startWeek, endWeek) {
  const value = clean(date);
  if (!value || value > endWeek) return false;
  return !startWeek || value > startWeek;
}

// Rounds a chart maximum up to a cleaner number.
function niceMax(value) {
  const magnitude = 10 ** Math.floor(Math.log10(value || 1));
  return Math.ceil(value / magnitude) * magnitude;
}

// Formats a date for chart labels.
function formatShortDate(value) {
  if (!value) return "";
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

// Reads dates from the historical file, including Excel serial dates.
function parseHistoricalDate(value) {
  const raw = clean(value);
  if (!raw) return "";

  if (/^\d{5}(\.\d+)?$/.test(raw)) {
    const excelEpoch = Date.UTC(1899, 11, 30);
    const date = new Date(excelEpoch + Number(raw) * 86400000);
    return isoFromDate(date);
  }

  const isoMatch = raw.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (isoMatch) return isoDateParts(isoMatch[1], isoMatch[2], isoMatch[3]);

  const slashMatch = raw.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})$/);
  if (slashMatch) {
    const [, first, second, year] = slashMatch;
    const firstNumber = Number(first);
    const secondNumber = Number(second);
    const month = firstNumber > 12 ? second : first;
    const day = firstNumber > 12 ? first : secondNumber > 12 ? second : second;
    return isoDateParts(normalizeYear(year), month, day);
  }

  const wordMatch = raw.match(/^(\d{1,2})\s*[- ]\s*([A-Za-z]{3,9})\s*[-, ]\s*(\d{2,4})$/)
    || raw.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{2,4})$/);
  if (wordMatch) {
    const first = wordMatch[1];
    const second = wordMatch[2];
    const year = wordMatch[3];
    const month = monthNumber(Number.isNaN(Number(first)) ? first : second);
    const day = Number.isNaN(Number(first)) ? second : first;
    if (month) return isoDateParts(normalizeYear(year), month, day);
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return isoFromDate(parsed);
  return "";
}

// Builds an ISO date from year, month, and day parts.
function isoDateParts(year, month, day) {
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (Number.isNaN(date.getTime())) return "";
  return isoFromDate(date);
}

// Turns a JavaScript Date into an ISO date string.
function isoFromDate(date) {
  return date.toISOString().slice(0, 10);
}

// Converts two-digit years into full years.
function normalizeYear(year) {
  const value = Number(year);
  if (value < 100) return value + 2000;
  return value;
}

// Calculates the day number within a year.
function dayOfYearFromIso(value) {
  const [year, month, day] = clean(value).split("-").map(Number);
  if (!year || !month || !day) return 0;
  const date = Date.UTC(2024, month - 1, day);
  const start = Date.UTC(2024, 0, 0);
  return Math.floor((date - start) / 86400000);
}

// Checks whether a day falls inside a future forecast window.
function isDayInWindow(day, startDay, windowDays) {
  if (!day) return false;
  return day > startDay && day <= startDay + windowDays;
}

// Turns a month name or number into a month number.
function monthNumber(value) {
  const normalized = compact(value).slice(0, 3);
  return ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(normalized) + 1;
}

// Returns a short month label.
function monthShortName(month) {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1] || "";
}

// Counts rows by a grouping value.
function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

// Indexes rows by student ID.
function byId(rows) {
  return new Map(rows.filter(row => row.ID).map(row => [row.ID, row]));
}

// Finds the most recent uploaded row for a student ID.
function findStudentById(studentId) {
  const id = clean(studentId);
  for (let index = state.snapshots.length - 1; index >= 0; index--) {
    const student = state.snapshots[index].rows.find(row => row.ID === id);
    if (student) return decorateStudents([student])[0];
  }
  return null;
}

// Formats a student's name as Last, First.
function studentName(student) {
  const firstName = studentFirstName(student);
  const lastName = studentLastName(student);
  if (firstName && lastName) return `${lastName}, ${firstName}`;
  return lastName || firstName || student.ID || "Unknown student";
}

// Returns the normalized program name used for grouping.
function studentProgramKey(student) {
  const program = clean(student["Program Description"]
    || student["Program Code"]
    || student["Program Category"]
    || student["Degree Description"]);
  return normalizeProgram(program);
}

// Combines similar program names into dashboard categories.
function normalizeProgram(program) {
  const normalized = compact(program);
  if (/^bachelorofcomputerscience(honours)?(cooperative|coop)?$/.test(normalized)) {
    return "Bachelor of Computer Science";
  }
  if (/^bachelorofappliedcomputerscience(cooperative|coop)?$/.test(normalized)) {
    return "Bachelor of Applied Computer Science";
  }
  if (/^(master|masterof|msc|mscin|masterofsciencein)computerscience$/.test(normalized)) {
    return "Master of Computer Science";
  }
  if (/^(master|masterof|masterofapplied|macs|macsin)appliedcomputerscience$/.test(normalized)) {
    return "Master of Applied Computer Science";
  }
  if (/^(master|masterof|mdi|mdiin)digitalinnovation$/.test(normalized)) {
    return "Master of Digital Innovation";
  }
  if (/^(phd|doctorofphilosophy|doctorate)(in)?computerscience$/.test(normalized)) {
    return "PhD in Computer Science";
  }
  return program;
}

// Finds a student's first name from available columns.
function studentFirstName(student) {
  return clean(findFieldValue(student, [
    "First Name",
    "Given Name",
    "Given Names",
    "Forename",
    "Preferred",
    "Preferred Name",
    "Preferred First Name",
    "Chosen Name"
  ], key => {
    const normalized = compact(key);
    return normalized.includes("firstname")
      || normalized.includes("givenname")
      || normalized === "first"
      || normalized.includes("preferred")
      || normalized.includes("chosenname");
  }));
}

// Finds a student's last name from available columns.
function studentLastName(student) {
  return clean(findFieldValue(student, [
    "Last Name",
    "Surname",
    "Family Name"
  ], key => {
    const normalized = compact(key);
    return normalized.includes("lastname")
      || normalized.includes("surname")
      || normalized.includes("familyname")
      || normalized === "last";
  }));
}

// Checks whether a student has been enrolled for the configured number of years.
function isLongTimeEnrolled(row, thresholdYears) {
  const admitDate = admitTermDate(row["Admit Term"]);
  if (!admitDate) return false;

  const reportDate = new Date(`${latestSnapshot()?.week || todayIsoDate()}T00:00:00`);
  const elapsedYears = (reportDate - admitDate) / (365.25 * 24 * 60 * 60 * 1000);
  return elapsedYears >= thresholdYears;
}

// Converts Admit Term into an approximate start date.
function admitTermDate(value) {
  const raw = clean(value);
  if (!raw) return null;

  const normalized = raw.toLowerCase();
  const yearMatch = normalized.match(/\b(19|20)\d{2}\b/);
  const compactValue = compact(raw);
  const compactYear = compactValue.match(/(19|20)\d{2}/)?.[0];
  const year = Number(yearMatch?.[0] || compactYear);
  if (!year) return null;

  const month = admitTermMonth(normalized, compactValue);
  return new Date(year, month, 1);
}

// Turns Admit Term into a sortable value.
function admitTermSortValue(student) {
  return admitTermDate(student["Admit Term"])?.getTime() || 0;
}

// Formats Admit Term for display.
function formatAdmitDate(value) {
  const date = admitTermDate(value);
  if (!date) return "";
  return `${date.toLocaleString(undefined, { month: "short" })} ${date.getFullYear()}`;
}

// Finds the month represented by an Admit Term.
function admitTermMonth(normalized, compactValue) {
  if (/winter|jan|spring/.test(normalized) || /wi|sp/.test(compactValue.slice(-2))) return 0;
  if (/summer|may|jun|jul/.test(normalized) || /su/.test(compactValue.slice(-2))) return 4;
  if (/fall|sep|autumn/.test(normalized) || /fa/.test(compactValue.slice(-2))) return 8;

  const numericSuffix = compactValue.match(/(19|20)\d{2}(\d{2})$/)?.[2];
  if (numericSuffix === "10" || numericSuffix === "01") return 0;
  if (numericSuffix === "20" || numericSuffix === "05") return 4;
  if (numericSuffix === "30" || numericSuffix === "09") return 8;

  return 0;
}

// Excel and PDF exports
// Builds one row for the outreach Excel export.
function outreachExportRow(row) {
  const student = findStudentById(row.studentId);
  return {
    "Student ID": row.studentId,
    "First Name": student ? studentFirstName(student) : "",
    "Last Name": student ? studentLastName(student) : "",
    "Contact Date": row.date,
    Channel: row.channel,
    Result: row.result,
    "Email Hold": row.emailHold ? "Yes" : "",
    Notes: row.notes
  };
}

// Builds rows for the weekly comparison Excel export.
function comparisonExportRows(comparison) {
  return [
    ...comparison.resolved.map(student => comparisonExportRow("Registered since last report", student)),
    ...comparison.newStudents.map(student => comparisonExportRow("New on latest report", student)),
    ...comparison.stillListed.map(student => comparisonExportRow("Still listed", student))
  ];
}

// Builds one row in the comparison export.
function comparisonExportRow(status, student) {
  return {
    Status: status,
    ID: student.ID,
    "Last Name": studentLastName(student),
    "First Name": studentFirstName(student),
    Email: student["Dalhousie Email"],
    Campus: student.Campus,
    Level: student.Level,
    Program: student["Program Description"],
    "Admit Term": student["Admit Term"],
    Credits: student.credits ?? getCreditHours(student),
    GPA: student.gpa ?? getGpa(student),
    "Last Contact": student.lastContact?.date || "",
    "Contact Channel": student.lastContact?.channel || "",
    "Contact Result": student.lastContact?.result || "",
    "Email Hold": student.emailHoldContact ? "Yes" : "",
    Flags: student.flags?.map(flag => flag.label).join("; ") || ""
  };
}

// Creates and downloads a simple Excel workbook.
async function downloadXlsx(fileName, sheetName, rows) {
  if (!rows.length) {
    alert("There is no data to export.");
    return;
  }

  const xlsx = await ensureXlsx();
  if (!xlsx) {
    alert("Excel export support did not load.");
    return;
  }

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(rows);
  xlsx.utils.book_append_sheet(workbook, worksheet, safeSheetName(sheetName));
  downloadWorkbook(fileName, xlsx, workbook);
}

// Creates the larger findings Excel report with formulas.
async function downloadFindingsXlsx() {
  const students = getFilteredStudents();
  if (!students.length) {
    alert("There is no student data to export.");
    return;
  }

  const xlsx = await ensureXlsx();
  if (!xlsx) {
    alert("Excel export support did not load.");
    return;
  }

  const thresholds = getThresholds();
  const workbook = xlsx.utils.book_new();
  const studentHeaders = [
    "ID",
    "Last Name",
    "First Name",
    "Email",
    "Level",
    "Credits Earned",
    "Cumulative GPA",
    "Student Type Category",
    "Admit Term",
    "Program",
    "Last Contact Date",
    "Last Contact Result",
    "Contact Count",
    "5+ Years Enrolled",
    "Flag",
    "Contacted",
    "Email Hold"
  ];
  const studentRows = students.map(student => [
    student.ID,
    studentLastName(student),
    studentFirstName(student),
    student["Dalhousie Email"],
    student.Level,
    student.credits,
    student.gpa,
    student["Student Type Category"],
    student["Admit Term"],
    studentProgramKey(student),
    student.lastContact?.date || "",
    student.lastContact?.result || "",
    student.contacts.length,
    "",
    "",
    "",
    student.emailHoldContact ? "Email hold" : ""
  ]);
  const studentsSheet = xlsx.utils.aoa_to_sheet([studentHeaders, ...studentRows]);
  studentsSheet["!cols"] = [
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 28 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 22 },
    { wch: 14 },
    { wch: 34 },
    { wch: 16 },
    { wch: 18 },
    { wch: 13 },
    { wch: 20 },
    { wch: 18 },
    { wch: 13 },
    { wch: 14 }
  ];
  studentsSheet["!autofilter"] = { ref: `A1:Q${students.length + 1}` };

  students.forEach((student, index) => {
    const rowNumber = index + 2;
    const formulas = formulaRowForStudent(rowNumber);
    setFormulaCell(studentsSheet, `N${rowNumber}`, formulas.longTimeEnrolled, hasFlag(student, "longTimeEnrolled") ? "5+ Years Enrolled" : "");
    setFormulaCell(studentsSheet, `O${rowNumber}`, formulas.flag, exportFlagForStudent(student));
    setFormulaCell(studentsSheet, `P${rowNumber}`, formulas.contacted, student.lastContact ? "Contacted" : "");
  });

  const lastRow = students.length + 1;
  const summarySheet = xlsx.utils.aoa_to_sheet([
    ["Eligible to Register Findings"],
    ["Metric", "Formula-driven count"],
    ["Students in exported view", ""],
    ["New students", ""],
    ["Transfer students", ""],
    ["5+ Years Enrolled", ""],
    ["Near graduation", ""],
    ["Academic risk", ""],
    ["Contacted", ""],
    ["Email hold", ""],
    ["No contact logged", ""],
    [],
    ["Notes"],
    ["Counts are formulas based on the Students sheet. Change values on the Assumptions sheet to recalculate formulas."]
  ]);
  summarySheet["!cols"] = [{ wch: 30 }, { wch: 22 }];
  setFormulaCell(summarySheet, "B3", `COUNTA('Students'!A2:A${lastRow})`, students.length, "n");
  setFormulaCell(summarySheet, "B4", `COUNTIFS('Students'!F2:F${lastRow},0,'Students'!G2:G${lastRow},0)`, countFlag(students, "newStudent"), "n");
  setFormulaCell(summarySheet, "B5", `COUNTIF('Students'!H2:H${lastRow},"*transfer*")`, students.filter(student => compact(student["Student Type Category"]).includes("transfer")).length, "n");
  setFormulaCell(summarySheet, "B6", `COUNTIF('Students'!N2:N${lastRow},"5+ Years Enrolled")`, countFlag(students, "longTimeEnrolled"), "n");
  setFormulaCell(summarySheet, "B7", `COUNTIF('Students'!O2:O${lastRow},"Near graduation")`, students.filter(student => exportFlagForStudent(student) === "Near graduation").length, "n");
  setFormulaCell(summarySheet, "B8", `COUNTIF('Students'!O2:O${lastRow},"Academic risk")`, students.filter(student => exportFlagForStudent(student) === "Academic risk").length, "n");
  setFormulaCell(summarySheet, "B9", `COUNTIF('Students'!P2:P${lastRow},"Contacted")`, students.filter(student => student.lastContact).length, "n");
  setFormulaCell(summarySheet, "B10", `COUNTIF('Students'!Q2:Q${lastRow},"Email hold")`, students.filter(student => student.emailHoldContact).length, "n");
  setFormulaCell(summarySheet, "B11", `B3-B9`, students.filter(student => !student.lastContact).length, "n");

  const assumptionsSheet = xlsx.utils.aoa_to_sheet([
    ["Setting", "Value"],
    ["Graduation hours", thresholds.gradHours],
    ["Near graduation threshold", thresholds.nearGradHours],
    ["Academic risk GPA threshold", thresholds.riskGpa],
    ["5+ Years Enrolled threshold", thresholds.longEnrolledYears],
    ["Academic risk minimum credits", thresholds.academicRiskMinCredits],
    [],
    ["Label", "Formula rule"],
    ["New student", "Credits Earned = 0 and Cumulative GPA = 0"],
    ["Transfer student", "Student Type Category contains transfer and Level or Group Level is undergraduate"],
    ["5+ Years Enrolled", "Admit Term is at least the configured number of years ago"],
    ["Flag", "One label selected from Academic risk or Near graduation"],
    ["Academic risk", "Credits Earned is at least the academic risk minimum and Cumulative GPA is greater than 0 and less than or equal to Academic risk GPA threshold"],
    ["Near graduation", "Credits Earned is greater than or equal to Near graduation threshold, unless already academic risk"],
    ["Contacted", "Contact Count is greater than 0"],
    ["Email hold", "Student should be excluded from repeat outreach while the hold is active"]
  ]);
  assumptionsSheet["!cols"] = [{ wch: 32 }, { wch: 88 }];

  xlsx.utils.book_append_sheet(workbook, summarySheet, "Summary");
  xlsx.utils.book_append_sheet(workbook, studentsSheet, "Students");
  xlsx.utils.book_append_sheet(workbook, assumptionsSheet, "Assumptions");
  workbook.Workbook = workbook.Workbook || {};
  workbook.Workbook.CalcPr = { calcMode: "auto" };
  downloadWorkbook("eligible-to-register-findings.xlsx", xlsx, workbook);
}

// Builds Excel formulas for one student row in the findings report.
function formulaRowForStudent(rowNumber) {
  const credits = `$F${rowNumber}`;
  const gpa = `$G${rowNumber}`;
  const admitTerm = `$I${rowNumber}`;
  const contactCount = `$M${rowNumber}`;
  return {
    longTimeEnrolled: `IFERROR(IF(DATEDIF(DATE(VALUE(LEFT(${admitTerm},4)),1,1),TODAY(),"Y")>='Assumptions'!$B$5,"5+ Years Enrolled",""),"")`,
    flag: `IF(AND(${credits}>='Assumptions'!$B$6,${gpa}>0,${gpa}<='Assumptions'!$B$4),"Academic risk",IF(${credits}>='Assumptions'!$B$3,"Near graduation",""))`,
    contacted: `IF(${contactCount}>0,"Contacted","")`
  };
}

// Chooses the main flag text to export for a student.
function exportFlagForStudent(student) {
  if (hasFlag(student, "academicRisk")) return "Academic risk";
  if (hasFlag(student, "nearGraduate")) return "Near graduation";
  return "";
}

// Writes a formula cell into an Excel worksheet.
function setFormulaCell(sheet, address, formula, value, type = "s") {
  sheet[address] = { t: type, f: formula, v: value };
}

// Checks whether a student has a specific flag.
function hasFlag(student, key) {
  return student.flags.some(flag => flag.key === key);
}

// Counts students with a specific flag.
function countFlag(students, key) {
  return students.filter(student => hasFlag(student, key)).length;
}

// Downloads a prepared Excel workbook.
function downloadWorkbook(fileName, xlsx, workbook) {
  const workbookBytes = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([workbookBytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// Shortens and cleans an Excel sheet name.
function safeSheetName(name) {
  return clean(name).replace(/[:\\/?*[\]]/g, " ").slice(0, 31) || "Export";
}

// State and shared utilities
// Reads threshold settings, using defaults when needed.
function getThresholds() {
  return {
    gradHours: number(els.gradHours.value) || 120,
    nearGradHours: NEAR_GRADUATION_CREDITS,
    riskGpa: number(els.riskGpa.value) || 2,
    longEnrolledYears: number(els.longEnrolledYears.value) || 5,
    academicRiskMinCredits: ACADEMIC_RISK_MIN_CREDITS
  };
}

// Puts saved Settings values into the Settings form.
function applySettingsToInputs() {
  const settings = { ...defaultSettings(), ...(state.settings || {}) };
  els.gradHours.value = settings.gradHours;
  els.riskGpa.value = settings.riskGpa;
  els.longEnrolledYears.value = settings.longEnrolledYears;
}

// Loads saved app state from localStorage.
function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { snapshots: [], outreach: [] };
    parsed.snapshots = (parsed.snapshots || []).map(snapshot => ({
      ...snapshot,
      rows: (snapshot.rows || []).filter(isStudentRow)
    })).sort((a, b) => clean(a.week).localeCompare(clean(b.week)));
    parsed.outreach = (parsed.outreach || []).map(row => ({
      ...row,
      emailHold: Boolean(row.emailHold)
    }));
    parsed.insights = parsed.insights || defaultInsights();
    parsed.insights.weeks = parsed.insights.weeks || [];
    parsed.insights.charts = parsed.insights.charts || defaultInsights().charts;
    parsed.insights.trends = parsed.insights.trends || defaultInsights().trends;
    parsed.settings = { ...defaultSettings(), ...(parsed.settings || {}) };
    parsed.historical = {
      ...defaultHistorical(),
      ...(parsed.historical || {}),
      rows: (parsed.historical?.rows || []).filter(row => row.studentId && row.registrationDate)
    };
    const rawTargets = Array.isArray(parsed.targets) && parsed.targets.length ? parsed.targets : defaultTargets();
    parsed.targets = mergeDefaultTargets(rawTargets
      .map(row => ({ program: normalizeProgram(row.program), target: Math.max(0, Math.round(number(row.target))) }))
      .filter(row => row.program && row.target));
    return parsed;
  } catch {
    return { snapshots: [], outreach: [], insights: defaultInsights(), settings: defaultSettings(), historical: defaultHistorical(), targets: defaultTargets() };
  }
}

// Returns the default Insights chart selections.
function defaultInsights() {
  return {
    weeks: [],
    charts: ["program", "flag", "contact", "result"],
    trends: ["eligible", "new", "resolved", "contacted"]
  };
}

// Returns the default dashboard settings.
function defaultSettings() {
  return {
    gradHours: 120,
    riskGpa: 2,
    longEnrolledYears: 5
  };
}

// Returns an empty historical-data state.
function defaultHistorical() {
  return {
    fileName: "",
    loadedAt: "",
    rows: []
  };
}

// Returns the default budget enrolment targets.
function defaultTargets() {
  return [
    { program: "Bachelor of Computer Science", target: 670 },
    { program: "Bachelor of Applied Computer Science", target: 267 },
    { program: "Master of Applied Computer Science", target: 28 },
    { program: "Master of Computer Science", target: 11 },
    { program: "Master of Digital Innovation", target: 27 },
    { program: "PhD in Computer Science", target: 22 }
  ];
}

// Keeps default target programs while preserving saved target edits.
function mergeDefaultTargets(targets) {
  const merged = [...targets];
  const existingPrograms = new Set(merged.map(row => normalizeProgram(row.program)));
  defaultTargets().forEach(defaultTarget => {
    if (!existingPrograms.has(defaultTarget.program)) {
      merged.push(defaultTarget);
    }
  });
  return merged.sort((a, b) => a.program.localeCompare(b.program));
}

// Saves the dashboard state to localStorage.
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Returns unique cleaned values.
function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

// Converts a value into trimmed text.
function clean(value) {
  return String(value ?? "").trim();
}

// Removes spaces and symbols for easier matching.
function compact(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Converts text into a simple dashed name.
function kebabCase(value) {
  return clean(value).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

// Returns today's date in ISO format.
function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

// Reads credit hours from the student row.
function getCreditHours(row) {
  return number(findFieldValue(row, [
    "Credit Hours Earned",
    "Credits Earned",
    "Earned Credits",
    "Earned Hours",
    "Hours Earned",
    "Credit Hrs Earned",
    "Credit Hrs",
    "Credit Hours"
  ], key => {
    const normalized = compact(key);
    return normalized.includes("credit") && (normalized.includes("earned") || normalized.includes("hrs") || normalized.includes("hours"));
  }));
}

// Reads cumulative GPA from the student row.
function getGpa(row) {
  return number(findFieldValue(row, [
    "Cumulative GPA",
    "Cumulative Grade Point Average",
    "GPA"
  ], key => compact(key).includes("gpa")));
}

// Checks whether a student should get the Transfer student flag.
function isTransferStudent(row) {
  const categoryEntry = Object.entries(row).find(([key]) => compact(key) === "studenttypecategory");
  const transferValue = categoryEntry ? categoryEntry[1] : "";

  return compact(transferValue).includes("transfer") && isUndergraduate(row);
}

// Checks whether a student is undergraduate.
function isUndergraduate(row) {
  const levelValue = clean(row.Level || row["Group Level"]);
  const normalized = compact(levelValue);
  return normalized === "ug" || normalized.includes("undergrad");
}

// Checks whether a student matches the selected level filter.
function matchesLevel(student, selectedLevel) {
  const selected = compact(selectedLevel);
  const values = [student.Level, student["Group Level"]].map(compact);
  if (isUndergraduateLevelValue(selected)) {
    return values.some(isUndergraduateLevelValue);
  }
  if (isGraduateLevelValue(selected)) {
    return values.some(isGraduateLevelValue);
  }
  return values.includes(selected);
}

// Checks whether a level value means undergraduate.
function isUndergraduateLevelValue(value) {
  return value === "ug" || value.includes("undergrad");
}

// Checks whether a level value means graduate.
function isGraduateLevelValue(value) {
  return value === "gr" || value === "grad" || (value.includes("graduate") && !isUndergraduateLevelValue(value));
}

// Finds the best matching field value in a row.
function findFieldValue(row, preferredKeys, fallbackMatcher) {
  for (const key of preferredKeys) {
    if (row[key] !== undefined && clean(row[key]) !== "") return row[key];
  }

  const fallback = Object.entries(row).find(([key, value]) => fallbackMatcher(key) && clean(value) !== "");
  return fallback ? fallback[1] : "";
}

// Converts a value into a number safely.
function number(value) {
  const normalized = String(value ?? "").replace(/,/g, "");
  const match = normalized.match(/-?\d+(\.\d+)?/);
  const parsed = match ? Number(match[0]) : Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

// Formats a number with one decimal place when needed.
function formatNumber(value) {
  return Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "";
}

// Chooses singular or plural wording.
function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

// Formats an ISO date for display.
function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

// Formats a positive or negative difference.
function delta(value) {
  if (value === 0) return "No change";
  return `${value > 0 ? "+" : ""}${value.toLocaleString()} vs prior`;
}

// Escapes text before putting it into HTML.
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}
