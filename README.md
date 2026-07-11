# Eligible to Register Dashboard

A local dashboard for weekly **Eligible to Register** reports: students who are eligible to register but have not registered yet.

The dashboard helps track:

- who is still unregistered
- who registered since the last report
- who is newly listed
- who has been contacted
- which students should be held from future outreach
- week-over-week movement
- academic risk, near-graduation, new student, transfer student, and 5+ years enrolled flags
- budget enrolment targets and historical registration benchmarks

This is a browser-based app. It does not require Power BI.

## Quick Start

1. Open `index.html` in this folder.
2. Choose a weekly report file.
3. Choose the report date.
4. Click **Load weekly report**.
5. Load later weekly reports the same way to unlock week-over-week comparisons.

Main file:

```text
index.html
```

Recommended folder to send/share:

```text
student-outreach-dashboard/
```

Send the whole folder, not just `index.html`, because the app also needs:

```text
app.js
styles.css
vendor/xlsx.full.min.js
favicon.svg
manifest.webmanifest
```

## Sample Data

The repo includes four fake weekly reports in:

```text
sample-data/
```

Files:

```text
sample-data/fake-week-1-2026-06-15.csv
sample-data/fake-week-2-2026-06-22.csv
sample-data/fake-week-3-2026-06-29.csv
sample-data/fake-week-4-2026-07-06.csv
```

These are fictional records with fake names, fake IDs, and fake email addresses. They are meant for testing and demos only.

To test the app with sample data:

1. Open `index.html`.
2. Load `fake-week-1-2026-06-15.csv` with report date `2026-06-15`.
3. Load `fake-week-2-2026-06-22.csv` with report date `2026-06-22`.
4. Load `fake-week-3-2026-06-29.csv` with report date `2026-06-29`.
5. Load `fake-week-4-2026-07-06.csv` with report date `2026-07-06`.

After loading at least two reports, the dashboard can show week-over-week comparisons.

## Privacy Notes

This app is designed to run locally in your browser.

Important privacy points:

- Uploaded student files are processed in the browser.
- The app does not intentionally upload student data to a server.
- Saved dashboard data is stored in the browser's local storage on the same machine.
- Anyone using the same browser profile on the same computer may be able to see saved dashboard data.
- Use **Clear all data** before sharing your computer, demoing with real data, or switching to fake/sample data.
- Do not commit real student reports to GitHub.
- Do not email real student spreadsheets unless your workplace policy allows it.

Recommended practice:

- Keep real reports outside this repo.
- Use the included `sample-data/` files for testing and screenshots.
- Use private storage approved by your institution for real student data.

## Real Data Expected Columns

The dashboard expects reports with at least a student ID column. It works best when the file includes these columns:

```text
ID
Last Name
First Name
Preferred Dalhousie Email
Citizenship
Citizenship Group
Group Level
Level
Credit Hours Earned
Cumulative GPA
Student Type Category
Admit Term
Campus
Degree Code
Degree Description
Major1 Code
Program Category
Program Code
Program Description
```

The app has some column-name aliases, so minor column-name differences may still load. For example, `Student ID` can map to `ID`, and `GPA` can map to `Cumulative GPA`.

## Normal Weekly Workflow

1. Open the dashboard.
2. Load the newest weekly Eligible to Register report.
3. Check the top metric cards.
4. Use **Focus** filters to narrow by level, program, flag, search term, or credit-hour range.
5. Review the **Unregistered Students** tab.
6. Log student contacts in the **Student Outreach** tab.
7. When a new weekly report arrives, load it with its actual report date.
8. Review **Week-over-week** for students who registered, newly appeared, or registered after contact.

The app decides the latest report by the report date entered, not by the order files were uploaded.

## Tabs

### Unregistered Students

Shows students on the latest report after filters are applied.

Includes:

- student name
- program
- credits
- GPA
- flags/status labels
- latest contact information

Useful checkboxes:

- **Hide email holds**
- **Hide contacted students**

### Week-over-week

Compares the latest report with the previous report.

Shows:

- prior report count
- latest report count
- registered since last report
- newly listed students
- still listed students
- registered since being contacted
- weekly comparison bar chart
- collapsible lists for associated students
- uploaded report history with delete buttons

### Insights

Shows higher-level summary information and charts.

Includes:

- credit completion milestones
- international student share
- pie charts by program, flag, contact status, and outreach result
- weekly trend lines

Trend line options include:

- eligible not registered
- new this week
- registered since last report
- contacted
- after outreach
- academic risk
- near graduation

### Benchmarks & Targets

Shows budget enrolment targets and historical benchmark tools.

Includes:

- Fall 2026 budget enrolment targets
- estimated registered
- current unregistered
- remaining gap
- historical registration benchmark import
- current pace compared with last year's registration pace
- forecast based on last year's registration pattern
- late-registration risk list

Budget enrolment numbers are documented in the app as coming from the Budget Forecast dashboard.

### Student Outreach

Used to record outreach activity.

You can log:

- contact date
- channel
- one student ID or many student IDs
- notes

For each outreach record, you can update:

- result
- email hold
- notes

If a contacted student disappears from a later report, the app can automatically mark the outreach result as `Registered`.

## Focus Filters

The left-side **Focus** area can filter dashboard lists and charts by:

- search text
- level
- program
- flag
- credit hours completed

Credit-hour filter groups:

- `0 credits`
- `Under 60`
- `60-89`
- `90-114`
- `115+`

Program filters are normalized so similar programs are grouped together. For example:

- Bachelor of Computer Science, co-op, and honours roll into **Bachelor of Computer Science**
- Bachelor of Applied Computer Science and co-op roll into **Bachelor of Applied Computer Science**

## Student Flags

The app adds labels based on report data and outreach history.

### New student

```text
Credit Hours Earned = 0
AND Cumulative GPA = 0
```

### Transfer student

```text
Level = Undergraduate
AND Student Type Category contains Transfer
```

### 5+ Years Enrolled

```text
Latest report date - Admit Term start date >= configured threshold
```

Default threshold:

```text
5 years
```

### Near graduation

```text
Credit Hours Earned >= 115
```

Graduation hours remain set to `120` in Settings. The near-graduation label uses `115` as the trigger because those students are close to the graduation-hours threshold.

### Academic risk

```text
Credit Hours Earned >= 9
AND Cumulative GPA > 0
AND Cumulative GPA <= Academic risk GPA setting
```

Default academic risk GPA:

```text
2.0
```

### Contacted

```text
Student has at least one outreach record
```

### Email hold

```text
Student has an outreach record marked as email hold
```

Use email holds when a student has responded and should not keep receiving repeated outreach.

## Main Calculations

### Eligible not registered

```text
count(students on latest report after active filters)
```

### Registered since last report

```text
students on prior report
minus students on latest report
```

### Newly listed

```text
students on latest report
minus students on prior report
```

### Still listed

```text
students appearing on both prior and latest reports
```

### Registration rate

```text
registered since last report / prior report count * 100
```

### Response rate

```text
students with a response-style outreach result / contacted students * 100
```

Response-style results:

```text
Responded
Registered
Needs help
Not eligible
```

### After contact rate

```text
registered since being contacted / contacted students from prior report * 100
```

### Average weeks on report

```text
sum(number of uploaded reports each current student appears on)
/
current unregistered students
```

## Export Options

The app can export:

- findings report
- weekly comparison
- outreach log
- Insights tab as PDF through the browser print dialog

Exports are intended for analysis and sharing summary work. Be careful with files that include real student information.

## Settings

Open **Settings** to adjust:

- graduation hours
- academic risk GPA
- 5+ Years Enrolled threshold
- budget enrolment targets

Defaults:

```text
Graduation hours: 120
Academic risk GPA: 2.0
5+ Years Enrolled threshold: 5
```

Default Fall 2026 budget enrolment targets:

```text
Bachelor of Computer Science: 670
Bachelor of Applied Computer Science: 267
Master of Applied Computer Science: 28
Master of Computer Science: 11
Master of Digital Innovation: 27
PhD in Computer Science: 22
```

## Local Storage

The app saves loaded reports, outreach logs, settings, insight selections, historical data, and targets in browser local storage.

This means:

- data stays available after refreshing the page
- data stays available after closing and reopening the browser
- data is tied to the browser/profile/device
- another user on another computer will not receive your saved local data just because they have the app files

Use **Clear all data** to remove saved app data from the browser.

## GitHub Notes

This repo is safe to store on GitHub only if it contains:

- app code
- documentation
- fake/sample data

Do not commit:

- real Eligible to Register reports
- real outreach exports
- real student IDs
- screenshots showing real student data
- downloaded findings reports based on real data

The `.gitignore` file should be used to keep private local data folders out of Git.

## Project Structure

```text
student-outreach-dashboard/
  README.md
  index.html
  app.js
  styles.css
  favicon.svg
  manifest.webmanifest
  .gitignore
  sample-data/
    fake-week-1-2026-06-15.csv
    fake-week-2-2026-06-22.csv
    fake-week-3-2026-06-29.csv
    fake-week-4-2026-07-06.csv
  vendor/
    xlsx.full.min.js
```

## File Purpose

```text
index.html
```

The page structure: upload area, filters, tabs, modals, and buttons.

```text
styles.css
```

The visual design and responsive layout.

```text
app.js
```

The dashboard logic: file loading, calculations, filters, comparisons, outreach tracking, charts, exports, and local storage.

```text
vendor/xlsx.full.min.js
```

The local Excel parser. Keeping this local means the dashboard does not need to load SheetJS from a CDN.

## Troubleshooting

### The dashboard does not open

Open `index.html` from inside the `student-outreach-dashboard` folder.

If you moved files around, make sure `app.js`, `styles.css`, and `vendor/xlsx.full.min.js` are still beside it in the expected locations.

### The report loads but numbers look wrong

Check:

- report date entered correctly
- expected columns are present
- student IDs are consistent across weeks
- Focus filters are not excluding students
- email-hold/contacted exclusion checkboxes are not hiding rows

### Week-over-week is empty

Load at least two reports with different report dates.

### Latest report is not the one expected

The app uses the report date entered in the upload form. It does not use upload order.

### International share is zero

Check that the report has a `Citizenship Group` column and that international students are marked with text like `International`, `Visa`, `Study Permit`, or `Non-Resident`.

### Outreach ID warning

If you enter a student ID that has never appeared in any loaded report, the app warns you. This helps catch typos before outreach is saved.

## Suggested Pause-State Before Archiving

Before leaving the project alone for a while:

1. Confirm fake data is included.
2. Confirm no real data is committed.
3. Open the app once from `index.html`.
4. Load the four sample reports.
5. Check Week-over-week and Insights.
6. Clear all data if you tested with real data.
7. Commit the app, README, and sample data to GitHub.

## Future Ideas

Potential additions later:

- desktop app packaging
- import/export of full saved dashboard state
- historical sample-data file
- more benchmark visualizations
- protected workflow for real data outside the repo
- clearer onboarding screen for first-time users

