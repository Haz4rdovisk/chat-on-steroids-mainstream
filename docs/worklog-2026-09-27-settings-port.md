# Settings pages follow the fork's layout — 2026-09-27

The maintainer's fork (Haz4rdovisk/chat-on-steroids-mainstream) had already refined every
settings page. This ports that presentation rather than redesigning it:

- Workspace, Appearance and Activity use the fork's markup; Agents & automation, Setup and
  Usage keep upstream's rows and gain the fork's page head, section heads with a one-line
  description, and `settings-surface` cards.
- The fork's settings and chevron CSS is ported: rules the fork changed take its declarations
  in place, and fork-only rules live in `renderer/settings.css`, loaded after `styles.css`.
- Disclosures use the fork's authored chevron (`disclosureChevron()` and its static SVG). It is
  the one icon outside the Phosphor font, because a font caret rotates around its baseline;
  `test/icon-font.test.ts` allows exactly that exception.
- Upstream content and behaviour are kept: all ids, controls, options and attributes were
  compared page by page against `origin/main` and match. Upstream's Appearance preview, the
  full language list, Recovery timing details, Wait for sub-agents, the handoff prompt editor,
  and Usage's order (messages and limits, then activity, then cost) and elements are unchanged.
- Settings search filters the fork's section heads with their cards.
- The 18 new section descriptions are translated in all nine catalogs.

Checks: `npm run typecheck`; the changed renderer, i18n and icon suites; entry audit against
upstream main; captures of all six pages beside the fork in dark theme. Full suite left to CI.
