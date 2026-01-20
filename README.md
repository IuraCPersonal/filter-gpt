# Lasso Guard

A Chrome extension that detects and anonymizes sensitive information (emails) in your ChatGPT prompts before they're sent.

## Features

- **Real-time Interception** - Intercepts ChatGPT/OpenAI API requests before they're sent
- **Email Detection** - Scans prompts for email addresses using regex pattern matching
- **Auto-Anonymization** - Replaces detected emails with `[EMAIL_ADDRESS]` placeholder
- **Popup Alerts** - Shows an overlay when sensitive data is detected
- **Issue Management** - Dismiss false positives for 24 hours
- **History Logs** - Track all previously detected issues

## Tech Stack

- React 19 + TypeScript
- Vite + [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin) for Chrome Extension bundling
- RxJS for reactive state management
- Tailwind CSS 4
- Shadcn
- Chrome Extension Manifest V3

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start dev server with HMR
pnpm dev
```

Then load the extension in Chrome:

1. Open `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `dist` folder from the project

The extension will auto-reload on file changes.

### Build for Production

```bash
pnpm build
```

The production build will be in the `dist` folder, ready to be packed or uploaded to the Chrome Web Store.

## Project Structure

```
src/
├── app.tsx                 # Main popup UI
├── background/             # Service worker (message handling)
│   ├── index.ts
│   └── verify-message.ts   # Scans messages for sensitive data
├── components/             # React components
│   ├── active-issues.tsx
│   ├── history-issues.tsx
│   ├── issue-card.tsx
│   └── ui/                 # Shadcn-style UI primitives
├── content/                # Content script (injected into ChatGPT pages)
│   └── index.ts
├── lib/
│   ├── prompt-cleanup.ts   # Email detection & anonymization logic
│   └── storage.ts          # Chrome storage wrapper
├── services/
│   └── issues.ts           # Issue state management (RxJS)
└── config/
    └── constants.ts        # Regex patterns, storage keys
public/
└── interceptor.js          # Fetch interceptor (injected into page context)
```

## How It Works

1. **Interceptor** (`public/interceptor.js`) - Injected into ChatGPT pages, intercepts `fetch` calls to `/conversation` endpoint
2. **Content Script** (`src/content/index.ts`) - Bridges between page and extension, receives scan requests
3. **Background Service** (`src/background/`) - Processes messages, detects emails, stores issues
4. **Popup UI** (`src/app.tsx`) - Displays active issues and history, allows dismissing false positives

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start development server with HMR |
| `pnpm build`   | Build for production              |
| `pnpm lint`    | Run ESLint                        |
| `pnpm preview` | Preview production build          |
