const STORAGE_KEY = "registrationOutreachDashboard.v1";
const ACADEMIC_RISK_MIN_CREDITS = 9;

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
  group: "Group",
  grouplevel: "Group Level",
  level: "Level",
  credithoursearned: "Credit Hours Earned",
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
  admitterm: "Admit Term",
  campus: "Campus",
  degreecode: "Degree Code",
  degreedescription: "Degree Description",
  major1code: "Major1 Code",
  programcategory: "Program Category",
  programcode: "Program Code",
  programdescription: "Program Description",
  program: "Program Description"
};

const state = loadState();

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
  metrics: document.getElementById("metrics"),
  searchInput: document.getElementById("searchInput"),
  levelFilter: document.getElementById("levelFilter"),
  programFilter: document.getElementById("programFilter"),
  flagFilter: document.getElementById("flagFilter"),
  gradHours: document.getElementById("gradHours"),
  riskGpa: document.getElementById("riskGpa"),
  dismissalGpa: document.getElementById("dismissalGpa"),
  longEnrolledYears: document.getElementById("longEnrolledYears"),
  studentRows: document.getElementById("studentRows"),
  studentCount: document.getElementById("studentCount"),
  hideEmailHoldStudents: document.getElementById("hideEmailHoldStudents"),
  hideContactedStudents: document.getElementById("hideContactedStudents"),
  longEnrolledRows: document.getElementById("longEnrolledRows"),
  longEnrolledCount: document.getElementById("longEnrolledCount"),
  comparisonTitle: document.getElementById("comparisonTitle"),
  comparisonSummary: document.getElementById("comparisonSummary"),
  reportHistory: document.getElementById("reportHistory"),
  reportHistoryCount: document.getElementById("reportHistoryCount"),
  resolvedRows: document.getElementById("resolvedRows"),
  resolvedSummaryCount: document.getElementById("resolvedSummaryCount"),
  newRows: document.getElementById("newRows"),
  newSummaryCount: document.getElementById("newSummaryCount"),
  afterOutreachRows: document.getElementById("afterOutreachRows"),
  afterOutreachSummaryCount: document.getElementById("afterOutreachSummaryCount"),
  statsList: document.getElementById("statsList"),
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

let restoreTabAfterPrint = null;

init();

// App setup and event wiring
function init() {
  const today = todayIsoDate();
  els.reportWeek.value = today;
  els.contactDate.value = today;
  applySettingsToInputs();
  bindEvents();
  render();
}

function bindEvents() {
  bindReportEvents();
  bindOutreachEvents();
  bindFilterEvents();
  bindInsightEvents();
  bindTabEvents();
  bindExportEvents();
  bindModalEvents();
}

function bindReportEvents() {
  els.reportFile.addEventListener("change", () => {
    els.reportFileName.textContent = els.reportFile.files[0]?.name || "No file selected";
  });

  els.reportForm.addEventListener("submit", handleReportSubmit);
  els.clearDataBtn.addEventListener("click", handleClearData);

  els.reportHistory.addEventListener("click", event => {
    const button = event.target.closest("[data-delete-report-week]");
    if (!button) return;
    deleteSnapshot(button.dataset.deleteReportWeek);
  });
}

function bindOutreachEvents() {
  els.outreachForm.addEventListener("submit", handleOutreachSubmit);
  els.outreachRows.addEventListener("change", handleOutreachResultChange);
  els.outreachRows.addEventListener("click", handleOutreachTableClick);
}

function bindFilterEvents() {
  [els.searchInput, els.levelFilter, els.programFilter, els.flagFilter, els.hideEmailHoldStudents, els.hideContactedStudents]
    .forEach(input => input.addEventListener("input", render));
  [els.gradHours, els.riskGpa, els.dismissalGpa, els.longEnrolledYears]
    .forEach(input => input.addEventListener("input", handleSettingsChange));
}

function bindInsightEvents() {
  bindInsightCheckboxGroup(els.insightWeekOptions, "insightWeek", "weeks");
  bindInsightCheckboxGroup(els.insightChartOptions, "insightChart", "charts");
  bindInsightCheckboxGroup(els.insightTrendOptions, "insightTrend", "trends");
}

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

function bindExportEvents() {
  els.exportOutreachBtn.addEventListener("click", async () => {
    await downloadXlsx("outreach-log.xlsx", "Outreach Log", state.outreach.map(outreachExportRow));
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

function bindModalEvents() {
  els.settingsBtn.addEventListener("click", openSettingsModal);
  els.settingsModalClose.addEventListener("click", closeSettingsModal);
  els.settingsDoneBtn.addEventListener("click", closeSettingsModal);
  els.settingsModal.addEventListener("click", event => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });

  els.notesModalClose.addEventListener("click", closeNotesModal);
  els.notesModal.addEventListener("click", event => {
    if (event.target === els.notesModal) closeNotesModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!els.settingsModal.hidden) closeSettingsModal();
    if (!els.notesModal.hidden) closeNotesModal();
  });
}

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

function handleClearData() {
  if (!confirm("Clear all locally saved reports and outreach logs?")) return;
  state.snapshots = [];
  state.outreach = [];
  saveState();
  render();
}

function handleSettingsChange() {
  state.settings = getThresholds();
  saveState();
  render();
}

function resetReportForm() {
  els.reportForm.reset();
  els.reportWeek.value = todayIsoDate();
  els.reportFileName.textContent = "No file selected";
}

function resetOutreachForm() {
  els.outreachForm.reset();
  els.contactDate.value = todayIsoDate();
}

// File parsing and report import
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

function headerScore(records) {
  if (!records?.length) return -1;
  return Math.max(...records.slice(0, 30).map(headerRecordScore));
}

function headerRecordScore(record) {
  const mappedHeaders = record.map(value => aliases[compact(value)]).filter(Boolean);
  const uniqueMappedHeaders = new Set(mappedHeaders);
  return uniqueMappedHeaders.size + (uniqueMappedHeaders.has("ID") ? 3 : 0);
}

// Navigation and print/PDF support
function setActiveTab(tabName) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-view").forEach(view => {
    view.classList.toggle("active", view.id === `${tabName}Tab`);
  });
}

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

function exportInsightsPdf() {
  restoreTabAfterPrint = document.querySelector(".tab.active")?.dataset.tab || "students";
  setActiveTab("insights");
  document.body.classList.add("printing-insights");
  window.print();
}

function restoreAfterInsightsPrint() {
  if (!document.body.classList.contains("printing-insights")) return;
  document.body.classList.remove("printing-insights");
  if (restoreTabAfterPrint) setActiveTab(restoreTabAfterPrint);
  restoreTabAfterPrint = null;
}

function normalizeRow(row) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    const mapped = aliases[compact(key)] || clean(key);
    normalized[mapped] = clean(value);
  });
  return normalized;
}

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

function missingColumns(rows) {
  if (!rows.length) return requiredColumns;
  const available = new Set(Object.keys(rows[0]));
  return requiredColumns.filter(column => !available.has(column));
}

function upsertSnapshot(snapshot) {
  const index = state.snapshots.findIndex(item => item.week === snapshot.week);
  if (index >= 0) state.snapshots[index] = snapshot;
  else state.snapshots.push(snapshot);
  state.snapshots.sort((a, b) => a.week.localeCompare(b.week));
}

// Rendering
function render() {
  if (syncOutreachRegisteredResults()) saveState();
  const latest = latestSnapshot();
  const latestRows = decorateStudents(latest?.rows || []);
  const metricStudents = getMetricStudents();
  const filteredStudents = getFilteredStudents();
  renderStatus(latest);
  renderFilters(latestRows);
  renderMetrics(metricStudents);
  renderStudents(filteredStudents);
  renderLongEnrolled();
  renderComparison();
  renderStats();
  renderReportHistory();
  renderOutreach();
  renderCharts();
}

function latestSnapshot() {
  return state.snapshots[state.snapshots.length - 1] || null;
}

function priorSnapshot() {
  return state.snapshots[state.snapshots.length - 2] || null;
}

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

function getOutreachStudentIds() {
  const ids = clean(els.contactStudentId.value).split(/[\s,;]+/)
    .map(clean)
    .filter(Boolean);

  return [...new Set(ids)];
}

function hasUploadedStudentId(studentId) {
  const id = clean(studentId);
  return state.snapshots.some(snapshot => snapshot.rows.some(row => clean(row.ID) === id));
}

function unknownOutreachMessage(unknownIds) {
  const shownIds = unknownIds.slice(0, 12).join(", ");
  const hiddenCount = unknownIds.length - 12;
  const moreText = hiddenCount > 0 ? `, and ${hiddenCount.toLocaleString()} more` : "";
  const countText = `${unknownIds.length.toLocaleString()} ${pluralize("ID", unknownIds.length)}`;
  const verb = unknownIds.length === 1 ? "was" : "were";
  return `${countText} ${verb} not found in the uploaded reports:\n\n${shownIds}${moreText}\n\nSave the contact anyway?`;
}

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
    if (isLongTimeEnrolled(row, thresholds.longEnrolledYears)) flags.push({ key: "longTimeEnrolled", label: "Long time enrolled", tone: "warn" });
    if (credits >= thresholds.gradHours) flags.push({ key: "nearGraduate", label: "Near graduation", tone: "good" });
    if (credits >= thresholds.academicRiskMinCredits && gpa > 0 && gpa < thresholds.dismissalGpa) flags.push({ key: "dismissalRisk", label: "Dismissal risk", tone: "danger" });
    else if (credits >= thresholds.academicRiskMinCredits && gpa > 0 && gpa <= thresholds.riskGpa) flags.push({ key: "academicRisk", label: "Academic risk", tone: "warn" });
    if (lastContact) flags.push({ key: "contacted", label: "Contacted", tone: "good" });
    if (emailHoldContact) flags.push({ key: "emailHold", label: "Email hold", tone: "warn" });
    return { ...row, credits, gpa, contacts, lastContact, emailHoldContact, flags };
  });
}

function isEmailHoldActive(row) {
  return Boolean(row?.emailHold);
}

function getFilteredStudents() {
  const latest = latestSnapshot();
  return applyStudentListExclusions(applyFocusFilters(decorateStudents(latest?.rows || []))).sort(prioritySort);
}

function getMetricStudents() {
  const latest = latestSnapshot();
  return applyFocusFilters(decorateStudents(latest?.rows || []), { includeFlag: false }).sort(prioritySort);
}

function applyStudentListExclusions(students) {
  if (els.hideEmailHoldStudents.checked) students = students.filter(student => !student.emailHoldContact);
  if (els.hideContactedStudents.checked) students = students.filter(student => !student.lastContact);
  return students;
}

function applyFocusFilters(students, options = {}) {
  const includeFlag = options.includeFlag !== false;
  const query = compact(els.searchInput.value);
  const level = els.levelFilter.value;
  const program = els.programFilter.value;
  const flag = els.flagFilter.value;

  if (query) {
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
  if (includeFlag) {
    if (flag === "notContacted") students = students.filter(student => !student.lastContact);
    else if (flag) students = students.filter(student => student.flags.some(item => item.key === flag));
  }

  return students;
}

function prioritySort(a, b) {
  const score = studentScore(b) - studentScore(a);
  if (score) return score;
  return studentLastName(a).localeCompare(studentLastName(b));
}

function studentScore(student) {
  return student.flags.reduce((total, flag) => {
    if (flag.key === "dismissalRisk") return total + 8;
    if (flag.key === "academicRisk") return total + 5;
    if (flag.key === "nearGraduate") return total + 4;
    if (flag.key === "longTimeEnrolled") return total + 3;
    if (flag.key === "newStudent") return total + 2;
    if (flag.key === "transferStudent") return total + 2;
    if (flag.key === "contacted") return total - 1;
    return total;
  }, 0);
}

function renderStatus(latest) {
  if (!latest) {
    els.datasetStatus.textContent = "Latest report: none loaded";
    return;
  }
  els.datasetStatus.textContent = `Latest report: ${formatDate(latest.week)}`;
}

function renderFilters(students) {
  fillSelect(els.levelFilter, "All levels", unique(students.map(row => row.Level || row["Group Level"])));
  const programRows = els.levelFilter.value
    ? students.filter(student => matchesLevel(student, els.levelFilter.value))
    : students;
  fillSelect(els.programFilter, "All programs", unique(programRows.map(studentProgramKey)));
}

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

function renderMetrics(students) {
  const comparison = getComparison({ includeFlag: false });
  const metrics = [
    { label: "Eligible not registered", value: students.length, note: comparison.previous ? delta(students.length - comparison.previousRows.length) : "Latest report", list: "students" },
    { label: "Registered since last report", value: comparison.resolved.length, note: comparison.previous ? "Since prior report" : "Needs 2 reports", list: "resolved" },
    { label: "Newly listed", value: comparison.newStudents.length, note: comparison.previous ? "Since prior report" : "Needs 2 reports", list: "new" },
    { label: "Contacted", value: students.filter(row => row.lastContact).length, note: "On latest report", list: "contacted" },
    { label: "After outreach", value: comparison.resolvedAfterContact.length, note: "Registered since being contacted", list: "afterOutreach" }
  ];
  els.metrics.innerHTML = metrics.map(metric => `
    <button class="metric" type="button" data-dashboard-list="${escapeHtml(metric.list)}">
      <span>${escapeHtml(metric.label)}</span>
      <strong>${Number(metric.value).toLocaleString()}</strong>
      <small>${escapeHtml(metric.note)}</small>
    </button>
  `).join("");
}

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
    updateComparisonSectionCounts(0, 0, 0);
    els.resolvedRows.innerHTML = `<tr><td colspan="5" class="empty">Load a report to begin.</td></tr>`;
    els.newRows.innerHTML = `<tr><td colspan="5" class="empty">Load a report to begin.</td></tr>`;
    els.afterOutreachRows.innerHTML = `<tr><td colspan="5" class="empty">Load a report to begin.</td></tr>`;
    return;
  }

  if (!comparison.previous) {
    const nearGraduation = comparison.currentRows.filter(row => row.flags.some(flag => flag.key === "nearGraduate")).length;
    const academicRisk = comparison.currentRows.filter(row => row.flags.some(flag => flag.key === "academicRisk" || flag.key === "dismissalRisk")).length;
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

  updateComparisonSectionCounts(comparison.resolved.length, comparison.newStudents.length, comparison.resolvedAfterContact.length);
  renderComparisonRows(els.resolvedRows, comparison.resolved, "resolved");
  renderComparisonRows(els.newRows, comparison.newStudents, "new");
  renderComparisonRows(els.afterOutreachRows, comparison.resolvedAfterContact, "resolved");
}

function renderComparisonCards(items) {
  return items.map(item => `
    <button class="compare-card ${item.list ? "clickable" : ""}" type="button" ${item.list ? `data-comparison-list="${item.list}"` : "disabled"}>
      <span>${escapeHtml(item.label)}</span>
      <strong>${Number(item.value).toLocaleString()}</strong>
      <small>${escapeHtml(item.note)}</small>
    </button>
  `).join("");
}

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

function updateComparisonSectionCounts(resolvedCount, newCount, afterOutreachCount = 0) {
  els.resolvedSummaryCount.textContent = `${resolvedCount.toLocaleString()} ${pluralize("student", resolvedCount)}`;
  els.newSummaryCount.textContent = `${newCount.toLocaleString()} ${pluralize("student", newCount)}`;
  els.afterOutreachSummaryCount.textContent = `${afterOutreachCount.toLocaleString()} ${pluralize("student", afterOutreachCount)}`;
}

function renderStats() {
  const latest = latestSnapshot();
  if (!latest) {
    els.statsList.innerHTML = `<div class="empty">Load a report to see stats.</div>`;
    return;
  }

  const students = applyFocusFilters(decorateStudents(latest.rows));
  const averageWeeks = averageWeeksOnReport(students);
  const comparison = getComparison();
  const registrationRate = comparison.previousRows.length
    ? (comparison.resolved.length / comparison.previousRows.length) * 100
    : null;
  const contactedPrevious = comparison.previousRows.filter(student => student.lastContact).length;
  const contactRegistrationRate = contactedPrevious
    ? (comparison.resolvedAfterContact.length / contactedPrevious) * 100
    : null;
  const outreachResponseStats = responseRateStats();
  const academicRiskStudents = students.filter(student => hasFlag(student, "academicRisk") || hasFlag(student, "dismissalRisk")).length;
  const academicRiskShare = students.length
    ? (academicRiskStudents / students.length) * 100
    : null;
  const nearGraduationStudents = students.filter(student => hasFlag(student, "nearGraduate")).length;
  const nearGraduationShare = students.length
    ? (nearGraduationStudents / students.length) * 100
    : null;
  const internationalStudents = students.filter(isInternationalStudent).length;
  const internationalShare = students.length
    ? (internationalStudents / students.length) * 100
    : null;
  els.statsList.innerHTML = `
    <article class="stat-row">
      <div>
        <strong>Average weeks on report</strong>
        <span>Current unregistered students in the selected focus view</span>
      </div>
      <div class="stat-value">
        <strong>${formatNumber(averageWeeks)}</strong>
        <span>${pluralize("week", averageWeeks)}</span>
      </div>
    </article>
    <article class="stat-row">
      <div>
        <strong>Registration rate since last report</strong>
        <span>${comparison.previous ? `${comparison.resolved.length.toLocaleString()} of ${comparison.previousRows.length.toLocaleString()} students from ${escapeHtml(formatDate(comparison.previous.week))} are no longer listed` : "Load at least two reports to calculate this"}</span>
      </div>
      <div class="stat-value">
        <strong>${registrationRate === null ? "N/A" : `${formatNumber(registrationRate)}%`}</strong>
        <span>${comparison.previous ? "since last report" : "needs 2 reports"}</span>
      </div>
    </article>
    <article class="stat-row">
      <div>
        <strong>Response rate</strong>
        <span>${outreachResponseStats.responded.toLocaleString()} of ${outreachResponseStats.contacted.toLocaleString()} contacted students have a response logged</span>
      </div>
      <div class="stat-value">
        <strong>${outreachResponseStats.rate === null ? "N/A" : `${formatNumber(outreachResponseStats.rate)}%`}</strong>
        <span>responded/contacted</span>
      </div>
    </article>
    <article class="stat-row">
      <div>
        <strong>Registration after contact rate</strong>
        <span>${comparison.previous ? `${comparison.resolvedAfterContact.length.toLocaleString()} registered out of ${contactedPrevious.toLocaleString()} contacted students from ${escapeHtml(formatDate(comparison.previous.week))}` : "Load at least two reports to calculate this"}</span>
      </div>
      <div class="stat-value">
        <strong>${contactRegistrationRate === null ? "N/A" : `${formatNumber(contactRegistrationRate)}%`}</strong>
        <span>${comparison.previous ? "registered/contacted" : "needs 2 reports"}</span>
      </div>
    </article>
    <article class="stat-row">
      <div>
        <strong>Academic risk share</strong>
        <span>${academicRiskStudents.toLocaleString()} of ${students.length.toLocaleString()} current unregistered students are academic or dismissal risk</span>
      </div>
      <div class="stat-value">
        <strong>${academicRiskShare === null ? "N/A" : `${formatNumber(academicRiskShare)}%`}</strong>
        <span>of unregistered</span>
      </div>
    </article>
    <article class="stat-row">
      <div>
        <strong>Near graduation share</strong>
        <span>${nearGraduationStudents.toLocaleString()} of ${students.length.toLocaleString()} current unregistered students are near graduation</span>
      </div>
      <div class="stat-value">
        <strong>${nearGraduationShare === null ? "N/A" : `${formatNumber(nearGraduationShare)}%`}</strong>
        <span>of unregistered</span>
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

function rowValueByCompactKey(row, compactKey) {
  const entry = Object.entries(row).find(([key]) => compact(key) === compactKey);
  return entry ? entry[1] : "";
}

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

function deleteSnapshot(week) {
  const snapshot = state.snapshots.find(item => item.week === week);
  if (!snapshot) return;
  if (!confirm(`Delete ${snapshot.fileName} for ${formatDate(snapshot.week)} from this dashboard?`)) return;

  state.snapshots = state.snapshots.filter(item => item.week !== week);
  saveState();
  render();
}

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

function renderLongEnrolled() {
  const latest = latestSnapshot();
  const students = applyFocusFilters(decorateStudents(latest?.rows || []))
    .filter(student => hasFlag(student, "longTimeEnrolled"))
    .sort((a, b) => admitTermSortValue(b) - admitTermSortValue(a) || studentLastName(a).localeCompare(studentLastName(b)));

  els.longEnrolledCount.textContent = `${students.length.toLocaleString()} long time enrolled ${pluralize("student", students.length)}`;
  if (!students.length) {
    els.longEnrolledRows.innerHTML = `<tr><td colspan="7" class="empty">No long time enrolled students in the current view.</td></tr>`;
    return;
  }

  els.longEnrolledRows.innerHTML = students.map(student => `
    <tr>
      <td>
        <div class="student-name">${escapeHtml(studentName(student))}</div>
        <div class="subtle">${escapeHtml(student.ID)} · ${escapeHtml(student["Dalhousie Email"])}</div>
      </td>
      <td>
        ${escapeHtml(student["Admit Term"] || "Unknown")}
        <div class="subtle">${escapeHtml(formatAdmitDate(student["Admit Term"]))}</div>
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

function renderPills(flags) {
  if (!flags.length) return `<span class="pill">Standard</span>`;
  return flags.map(flag => `<span class="pill ${flag.tone || ""}">${escapeHtml(flag.label)}</span>`).join("");
}

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

function renderOutreach() {
  els.outreachCount.textContent = `${state.outreach.length.toLocaleString()} contacts`;
  if (!state.outreach.length) {
    els.outreachRows.innerHTML = `<tr><td colspan="7" class="empty">No contacts logged.</td></tr>`;
    return;
  }
  els.outreachRows.innerHTML = state.outreach.map(row => {
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

function openNotesModal(rowId) {
  const row = state.outreach.find(item => item.id === rowId);
  if (!row) return;

  const student = findStudentById(row.studentId);
  els.notesModalTitle.textContent = student ? studentName(student) : row.studentId;
  els.notesModalMeta.textContent = `${row.date || "No date"} · ${row.channel || "Contact"} · ${row.result || "Pending"}`;
  els.notesModalBody.innerHTML = row.notes
    ? escapeHtml(row.notes).split("\n").map(note => `<p>${note}</p>`).join("")
    : `<p class="subtle">No notes yet.</p>`;
  els.notesModal.hidden = false;
  els.notesModalClose.focus();
}

function closeNotesModal() {
  els.notesModal.hidden = true;
}

function openSettingsModal() {
  els.settingsModal.hidden = false;
  els.gradHours.focus();
}

function closeSettingsModal() {
  els.settingsModal.hidden = true;
}

function appendNote(existingNotes, note) {
  const datedNote = `${new Date().toISOString().slice(0, 10)}: ${note}`;
  return [clean(existingNotes), datedNote].filter(Boolean).join("\n");
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replaceAll('"', '\\"').replaceAll("\\", "\\\\");
}

function renderOutreachResultOptions(selectedResult) {
  const selected = clean(selectedResult) || "Pending";
  return ["Pending", "No response", "Responded", "Registered", "Needs help", "Not eligible"].map(result => `
    <option value="${escapeHtml(result)}"${result === selected ? " selected" : ""}>${escapeHtml(result)}</option>
  `).join("");
}

function renderCharts() {
  syncInsightSelections();
  renderInsightControls();
  renderInsightPies();
  renderInsightTrend();
}

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

function limitCounts(counts, maxEntries) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (entries.length <= maxEntries) return counts;
  const kept = Object.fromEntries(entries.slice(0, maxEntries));
  kept.Other = entries.slice(maxEntries).reduce((sum, [, value]) => sum + value, 0);
  return kept;
}

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

function selectedInsightSnapshots() {
  const selected = new Set(state.insights.weeks);
  return state.snapshots.filter(snapshot => selected.has(snapshot.week));
}

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
      risk: students.filter(student => hasFlag(student, "academicRisk") || hasFlag(student, "dismissalRisk")).length,
      nearGraduate: students.filter(student => hasFlag(student, "nearGraduate")).length
    };
  });
}

function countContactsForTrendPeriod(startWeek, endWeek) {
  const contactedIds = new Set(state.outreach
    .filter(row => isDateInTrendPeriod(row.date, startWeek, endWeek))
    .map(row => clean(row.studentId))
    .filter(Boolean));
  return contactedIds.size;
}

function hadContactInPeriod(studentId, startWeek, endWeek) {
  const id = clean(studentId);
  return state.outreach.some(row => clean(row.studentId) === id && isDateInTrendPeriod(row.date, startWeek, endWeek));
}

function isDateInTrendPeriod(date, startWeek, endWeek) {
  const value = clean(date);
  if (!value || value > endWeek) return false;
  return !startWeek || value > startWeek;
}

function niceMax(value) {
  const magnitude = 10 ** Math.floor(Math.log10(value || 1));
  return Math.ceil(value / magnitude) * magnitude;
}

function formatShortDate(value) {
  if (!value) return "";
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function byId(rows) {
  return new Map(rows.filter(row => row.ID).map(row => [row.ID, row]));
}

function findStudentById(studentId) {
  const id = clean(studentId);
  for (let index = state.snapshots.length - 1; index >= 0; index--) {
    const student = state.snapshots[index].rows.find(row => row.ID === id);
    if (student) return decorateStudents([student])[0];
  }
  return null;
}

function studentName(student) {
  const firstName = studentFirstName(student);
  const lastName = studentLastName(student);
  if (firstName && lastName) return `${lastName}, ${firstName}`;
  return lastName || firstName || student.ID || "Unknown student";
}

function studentProgramKey(student) {
  const program = clean(student["Program Description"]
    || student["Program Code"]
    || student["Program Category"]
    || student["Degree Description"]);
  return normalizeProgram(program);
}

function normalizeProgram(program) {
  const normalized = compact(program);
  if (/^bachelorofcomputerscience(honours)?(cooperative|coop)?$/.test(normalized)) {
    return "Bachelor of Computer Science";
  }
  if (/^bachelorofappliedcomputerscience(cooperative|coop)?$/.test(normalized)) {
    return "Bachelor of Applied Computer Science";
  }
  return program;
}

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

function isLongTimeEnrolled(row, thresholdYears) {
  const admitDate = admitTermDate(row["Admit Term"]);
  if (!admitDate) return false;

  const reportDate = new Date(`${latestSnapshot()?.week || todayIsoDate()}T00:00:00`);
  const elapsedYears = (reportDate - admitDate) / (365.25 * 24 * 60 * 60 * 1000);
  return elapsedYears >= thresholdYears;
}

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

function admitTermSortValue(student) {
  return admitTermDate(student["Admit Term"])?.getTime() || 0;
}

function formatAdmitDate(value) {
  const date = admitTermDate(value);
  if (!date) return "";
  return `${date.toLocaleString(undefined, { month: "short" })} ${date.getFullYear()}`;
}

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

function comparisonExportRows(comparison) {
  return [
    ...comparison.resolved.map(student => comparisonExportRow("Registered since last report", student)),
    ...comparison.newStudents.map(student => comparisonExportRow("New on latest report", student)),
    ...comparison.stillListed.map(student => comparisonExportRow("Still listed", student))
  ];
}

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
    "Group Level",
    "Credits Earned",
    "Cumulative GPA",
    "Student Type Category",
    "Admit Term",
    "Program",
    "Program Category",
    "Last Contact Date",
    "Last Contact Result",
    "Contact Count",
    "New Student",
    "Transfer Student",
    "Long Time Enrolled",
    "Flag",
    "Contacted",
    "Email Hold",
    "Labels",
    "Priority Score"
  ];
  const studentRows = students.map(student => [
    student.ID,
    studentLastName(student),
    studentFirstName(student),
    student["Dalhousie Email"],
    student.Level,
    student["Group Level"],
    student.credits,
    student.gpa,
    student["Student Type Category"],
    student["Admit Term"],
    studentProgramKey(student),
    student["Program Category"],
    student.lastContact?.date || "",
    student.lastContact?.result || "",
    student.contacts.length,
    "",
    "",
    "",
    "",
    "",
    student.emailHoldContact ? "Email hold" : "",
    "",
    ""
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
    { wch: 14 },
    { wch: 22 },
    { wch: 14 },
    { wch: 34 },
    { wch: 22 },
    { wch: 16 },
    { wch: 18 },
    { wch: 13 },
    { wch: 16 },
    { wch: 18 },
    { wch: 20 },
    { wch: 18 },
    { wch: 13 },
    { wch: 14 },
    { wch: 50 },
    { wch: 13 }
  ];
  studentsSheet["!autofilter"] = { ref: `A1:W${students.length + 1}` };

  students.forEach((student, index) => {
    const rowNumber = index + 2;
    const formulas = formulaRowForStudent(rowNumber);
    setFormulaCell(studentsSheet, `P${rowNumber}`, formulas.newStudent, hasFlag(student, "newStudent") ? "New student" : "");
    setFormulaCell(studentsSheet, `Q${rowNumber}`, formulas.transferStudent, hasFlag(student, "transferStudent") ? "Transfer student" : "");
    setFormulaCell(studentsSheet, `R${rowNumber}`, formulas.longTimeEnrolled, hasFlag(student, "longTimeEnrolled") ? "Long time enrolled" : "");
    setFormulaCell(studentsSheet, `S${rowNumber}`, formulas.flag, exportFlagForStudent(student));
    setFormulaCell(studentsSheet, `T${rowNumber}`, formulas.contacted, student.lastContact ? "Contacted" : "");
    setFormulaCell(studentsSheet, `V${rowNumber}`, formulas.labels, exportLabelsForStudent(student));
    setFormulaCell(studentsSheet, `W${rowNumber}`, formulas.priorityScore, studentScore(student), "n");
  });

  const lastRow = students.length + 1;
  const summarySheet = xlsx.utils.aoa_to_sheet([
    ["Eligible to Register Findings"],
    ["Metric", "Formula-driven count"],
    ["Students in exported view", ""],
    ["New students", ""],
    ["Transfer students", ""],
    ["Long time enrolled", ""],
    ["Near graduation", ""],
    ["Dismissal risk", ""],
    ["Academic risk", ""],
    ["Contacted", ""],
    ["Email hold", ""],
    ["No contact logged", ""],
    [],
    ["Notes"],
    ["Counts are formulas based on the Students sheet. Change values on the Assumptions sheet to recalculate labels."]
  ]);
  summarySheet["!cols"] = [{ wch: 30 }, { wch: 22 }];
  setFormulaCell(summarySheet, "B3", `COUNTA('Students'!A2:A${lastRow})`, students.length, "n");
  setFormulaCell(summarySheet, "B4", `COUNTIF('Students'!P2:P${lastRow},"New student")`, countFlag(students, "newStudent"), "n");
  setFormulaCell(summarySheet, "B5", `COUNTIF('Students'!Q2:Q${lastRow},"Transfer student")`, countFlag(students, "transferStudent"), "n");
  setFormulaCell(summarySheet, "B6", `COUNTIF('Students'!R2:R${lastRow},"Long time enrolled")`, countFlag(students, "longTimeEnrolled"), "n");
  setFormulaCell(summarySheet, "B7", `COUNTIF('Students'!S2:S${lastRow},"Near graduation")`, students.filter(student => exportFlagForStudent(student) === "Near graduation").length, "n");
  setFormulaCell(summarySheet, "B8", `COUNTIF('Students'!S2:S${lastRow},"Dismissal risk")`, students.filter(student => exportFlagForStudent(student) === "Dismissal risk").length, "n");
  setFormulaCell(summarySheet, "B9", `COUNTIF('Students'!S2:S${lastRow},"Academic risk")`, students.filter(student => exportFlagForStudent(student) === "Academic risk").length, "n");
  setFormulaCell(summarySheet, "B10", `COUNTIF('Students'!T2:T${lastRow},"Contacted")`, students.filter(student => student.lastContact).length, "n");
  setFormulaCell(summarySheet, "B11", `COUNTIF('Students'!U2:U${lastRow},"Email hold")`, students.filter(student => student.emailHoldContact).length, "n");
  setFormulaCell(summarySheet, "B12", `B3-B10`, students.filter(student => !student.lastContact).length, "n");

  const assumptionsSheet = xlsx.utils.aoa_to_sheet([
    ["Setting", "Value"],
    ["Graduation hours", thresholds.gradHours],
    ["Academic risk GPA threshold", thresholds.riskGpa],
    ["Dismissal risk GPA threshold", thresholds.dismissalGpa],
    ["Long time enrolled years", thresholds.longEnrolledYears],
    ["Academic risk minimum credits", thresholds.academicRiskMinCredits],
    [],
    ["Label", "Formula rule"],
    ["New student", "Credits Earned = 0 and Cumulative GPA = 0"],
    ["Transfer student", "Student Type Category contains transfer and Level or Group Level is undergraduate"],
    ["Long time enrolled", "Admit Term is at least the configured number of years ago"],
    ["Flag", "One label selected from Dismissal risk, Academic risk, or Near graduation"],
    ["Dismissal risk", "Credits Earned is at least the academic risk minimum and Cumulative GPA is greater than 0 and below Dismissal risk GPA threshold"],
    ["Academic risk", "Credits Earned is at least the academic risk minimum and Cumulative GPA is greater than 0 and less than or equal to Academic risk GPA threshold, unless already dismissal risk"],
    ["Near graduation", "Credits Earned is greater than or equal to Graduation hours, unless already academic or dismissal risk"],
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

function formulaRowForStudent(rowNumber) {
  const credits = `$G${rowNumber}`;
  const gpa = `$H${rowNumber}`;
  const studentType = `$I${rowNumber}`;
  const admitTerm = `$J${rowNumber}`;
  const level = `$E${rowNumber}`;
  const groupLevel = `$F${rowNumber}`;
  const contactCount = `$O${rowNumber}`;
  return {
    newStudent: `IF(AND(${credits}=0,${gpa}=0),"New student","")`,
    transferStudent: `IF(AND(ISNUMBER(SEARCH("transfer",${studentType})),OR(LOWER(${level})="ug",ISNUMBER(SEARCH("undergrad",LOWER(${level}))),LOWER(${groupLevel})="ug",ISNUMBER(SEARCH("undergrad",LOWER(${groupLevel}))))),"Transfer student","")`,
    longTimeEnrolled: `IFERROR(IF(DATEDIF(DATE(VALUE(LEFT(${admitTerm},4)),1,1),TODAY(),"Y")>='Assumptions'!$B$5,"Long time enrolled",""),"")`,
    flag: `IF(AND(${credits}>='Assumptions'!$B$6,${gpa}>0,${gpa}<'Assumptions'!$B$4),"Dismissal risk",IF(AND(${credits}>='Assumptions'!$B$6,${gpa}>0,${gpa}<='Assumptions'!$B$3),"Academic risk",IF(${credits}>='Assumptions'!$B$2,"Near graduation","")))`,
    contacted: `IF(${contactCount}>0,"Contacted","")`,
    labels: `TEXTJOIN("; ",TRUE,P${rowNumber}:U${rowNumber})`,
    priorityScore: `IF(S${rowNumber}="Dismissal risk",8,0)+IF(S${rowNumber}="Academic risk",5,0)+IF(S${rowNumber}="Near graduation",4,0)+IF(P${rowNumber}<>"",2,0)+IF(Q${rowNumber}<>"",2,0)+IF(R${rowNumber}<>"",3,0)-IF(T${rowNumber}<>"",1,0)`
  };
}

function exportFlagForStudent(student) {
  if (hasFlag(student, "dismissalRisk")) return "Dismissal risk";
  if (hasFlag(student, "academicRisk")) return "Academic risk";
  if (hasFlag(student, "nearGraduate")) return "Near graduation";
  return "";
}

function exportLabelsForStudent(student) {
  return [
    hasFlag(student, "newStudent") ? "New student" : "",
    hasFlag(student, "transferStudent") ? "Transfer student" : "",
    hasFlag(student, "longTimeEnrolled") ? "Long time enrolled" : "",
    exportFlagForStudent(student),
    student.lastContact ? "Contacted" : "",
    student.emailHoldContact ? "Email hold" : ""
  ].filter(Boolean).join("; ");
}

function setFormulaCell(sheet, address, formula, value, type = "s") {
  sheet[address] = { t: type, f: formula, v: value };
}

function hasFlag(student, key) {
  return student.flags.some(flag => flag.key === key);
}

function countFlag(students, key) {
  return students.filter(student => hasFlag(student, key)).length;
}

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

function safeSheetName(name) {
  return clean(name).replace(/[:\\/?*[\]]/g, " ").slice(0, 31) || "Export";
}

// State and shared utilities
function getThresholds() {
  return {
    gradHours: number(els.gradHours.value) || 120,
    riskGpa: number(els.riskGpa.value) || 2,
    dismissalGpa: number(els.dismissalGpa.value) || 1.7,
    longEnrolledYears: number(els.longEnrolledYears.value) || 5,
    academicRiskMinCredits: ACADEMIC_RISK_MIN_CREDITS
  };
}

function applySettingsToInputs() {
  const settings = { ...defaultSettings(), ...(state.settings || {}) };
  els.gradHours.value = settings.gradHours;
  els.riskGpa.value = settings.riskGpa;
  els.dismissalGpa.value = settings.dismissalGpa;
  els.longEnrolledYears.value = settings.longEnrolledYears;
}

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
    return parsed;
  } catch {
    return { snapshots: [], outreach: [], insights: defaultInsights(), settings: defaultSettings() };
  }
}

function defaultInsights() {
  return {
    weeks: [],
    charts: ["program", "flag", "contact", "result"],
    trends: ["eligible", "new", "resolved", "contacted"]
  };
}

function defaultSettings() {
  return {
    gradHours: 120,
    riskGpa: 2,
    dismissalGpa: 1.7,
    longEnrolledYears: 5
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function clean(value) {
  return String(value ?? "").trim();
}

function compact(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function kebabCase(value) {
  return clean(value).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

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

function getGpa(row) {
  return number(findFieldValue(row, [
    "Cumulative GPA",
    "Cumulative Grade Point Average",
    "GPA"
  ], key => compact(key).includes("gpa")));
}

function isTransferStudent(row) {
  const categoryEntry = Object.entries(row).find(([key]) => compact(key) === "studenttypecategory");
  const transferValue = categoryEntry ? categoryEntry[1] : "";

  return compact(transferValue).includes("transfer") && isUndergraduate(row);
}

function isUndergraduate(row) {
  const levelValue = clean(row.Level || row["Group Level"]);
  const normalized = compact(levelValue);
  return normalized === "ug" || normalized.includes("undergrad");
}

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

function isUndergraduateLevelValue(value) {
  return value === "ug" || value.includes("undergrad");
}

function isGraduateLevelValue(value) {
  return value === "gr" || value === "grad" || (value.includes("graduate") && !isUndergraduateLevelValue(value));
}

function findFieldValue(row, preferredKeys, fallbackMatcher) {
  for (const key of preferredKeys) {
    if (row[key] !== undefined && clean(row[key]) !== "") return row[key];
  }

  const fallback = Object.entries(row).find(([key, value]) => fallbackMatcher(key) && clean(value) !== "");
  return fallback ? fallback[1] : "";
}

function number(value) {
  const normalized = String(value ?? "").replace(/,/g, "");
  const match = normalized.match(/-?\d+(\.\d+)?/);
  const parsed = match ? Number(match[0]) : Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value) {
  return Number.isFinite(value) ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "";
}

function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

function delta(value) {
  if (value === 0) return "No change";
  return `${value > 0 ? "+" : ""}${value.toLocaleString()} vs prior`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}
