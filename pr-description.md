## Why

The desktop connection popover says the same thing twice: a "Not connected" heading over a "Connection is off" subtitle. Its disclosure then opens a Session capture list and a Runtime diagnostics drawer. Those diagnostics already live in the companion extension's own popup, where they describe the tab they are about. In the app they take up most of the popover, push Connect/Disconnect below the fold, and duplicate the extension's view.

## What changed

- One status heading, the two distinct indicators (ChatGPT and the browser companion), and the existing Connect/Disconnect action.
- Removed: the repeated subtitle and the whole Advanced/Runtime drawer, with its renderer controller (`connection-popover.ts`), internal-browser queries, diagnostics refresh and clipboard handlers, age timer and CSS.
- The heading takes the space of the old disclosure, its status dot is aligned, connecting uses the existing busy treatment, and the action's minimum height goes from 26 to 32 CSS px.
- Status details stay available to screen readers and in tooltips. Connection ownership, Setup admission and the translated status strings are unchanged.
- The extension diagnostics and their bridge transport are untouched. AGENTS.md's product map and the existing renderer and Electron checks follow the new boundary.

## Test

- `test/renderer-state.test.ts` "shows connection status once and keeps diagnostics out of the desktop popover" and "keeps global connection controls in a compact sidebar popover", plus `test/renderer-layout.test.ts` "keeps global connection status out of the chat header and in the sidebar footer". All three fail on `main`, where the subtitle and the drawer render, and pass here.
- `npm run verify:ui -- connection-` passes: the compact fixture covers 64 state/language/theme/zoom combinations. `verify-disconnect-ui`, `verify-navigation-motion` and `verify-pr-workspace` pass with their updated expectations.
- Renderer state, layout and i18n suites pass (126 tests), and the typecheck passes.

Release note: The connection popover shows just the status and Connect/Disconnect; detailed diagnostics stay in the browser companion.

## Screenshots

From the connection UI fixture (placeholder state). The fixture does not load the icon font, before or after.

| Before (`main`, expanded) | Before (compact) | After (connected) | After (not connected) |
| --- | --- | --- | --- |
| ![Before expanded](https://raw.githubusercontent.com/Haz4rdovisk/chat-on-steroids-mainstream/c63ccef64d6a8a43b41ecfd978b19034b28d8cca/pop-before-expanded.png) | ![Before compact](https://raw.githubusercontent.com/Haz4rdovisk/chat-on-steroids-mainstream/c63ccef64d6a8a43b41ecfd978b19034b28d8cca/pop-before-compact.png) | ![After connected](https://raw.githubusercontent.com/Haz4rdovisk/chat-on-steroids-mainstream/c63ccef64d6a8a43b41ecfd978b19034b28d8cca/pop-after-connected.png) | ![After not connected](https://raw.githubusercontent.com/Haz4rdovisk/chat-on-steroids-mainstream/c63ccef64d6a8a43b41ecfd978b19034b28d8cca/pop-after-disconnected.png) |

No contract change: renderer-only; preload, IPC, bridge and extension messages keep their contracts.
