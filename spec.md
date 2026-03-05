# AI Interview Coach

## Current State
Full-stack app with a React frontend (4 pages: LandingPage, SignUpPage, SignInPage, DashboardPage) and a Motoko backend. The landing page has a "Download Your Report" section with three report download buttons. There is no way to download the app's source code.

## Requested Changes (Diff)

### Add
- A "Download Source Code" button/feature that lets users download all the app's source code as a ZIP file directly from the browser
- A `DownloadCodeButton` component using JSZip to bundle the key source files (frontend TSX/TS files, backend Motoko file, config files) into a downloadable ZIP
- The button should appear prominently in the landing page Download section and also in the dashboard's quick actions area

### Modify
- `LandingPage.tsx` DownloadSection: add a new download card for "Source Code (ZIP)" alongside existing report download buttons
- `DashboardPage.tsx` quick actions: add a "Download Source Code" button
- `package.json`: add `jszip` and `@types/jszip` dependencies

### Remove
- Nothing removed

## Implementation Plan
1. Install `jszip` dependency in the frontend package.json
2. Create `src/frontend/src/utils/downloadSourceCode.ts` utility that uses JSZip to fetch all source files via their raw text content (embedded as template literals or fetched via a public endpoint) and triggers a browser download
3. Create `src/frontend/src/components/DownloadCodeButton.tsx` component with a styled button that calls the utility
4. Update `LandingPage.tsx` DownloadSection to include the new source code download card
5. Update `DashboardPage.tsx` to add the download source code button in quick actions
