# Native-banner and worker-acknowledgment delivery — 2026-09-26

## Reviewed scope

Delivery follow-up to:
- worklog-2026-09-26-native-transport-banners.md
- worklog-2026-09-26-worker-report-acknowledgment.md
- worklog-2026-09-26-silence-pr420-audit.md

The earlier statements that these slices were unbuilt/uninstalled describe their
state at the time of those checks. This report supersedes that delivery status.

Production changes remain limited to two exact native transport-error phrases,
truthful worker finish acknowledgments, and model-facing guidance about collecting
existing reports/disclosing pending review. Shared source/tests match between
Mainstream and Internal. No Internal host, recovery timer, automatic Continue,
worker broker, receipt ledger, Browser Use or UI implementation was modified.
The #420 investigation resulted in documentation only, not a policy change.

## Validation before packaging

The previously recorded focused suites and both typechecks cover the final unchanged
source: content-script 787/787 per repository; Mainstream agents/kernel/MCP 340
passed and 6 skipped. Internal's combined run had 339 passes, 6 skips and one
process-wait failure; that case passed alone unchanged. Do not relabel the original
combined run as green. No complete verify was repeated during this delivery step.

Final diff/whitespace and shared-file parity checks passed. Public-history privacy,
third-party notices and native-source inventory checks passed in both repositories.
The review found no production consumer parsing the replaced acknowledgment prose.

## Package and installed bytes

Internal Windows x64 packaging and smoke-packaged-runtime passed, including Sharp,
PTY, tree-sitter, extension/resources and pinned Electron 44.3.0.
Installer: Chat-On-Steroids-Internal-20260926-worker-ack-x64.exe
Size: 173390281 bytes
SHA-256: CC14B94C9E39B9F418992D0425DBC847D53AD99006B0410D8967D232EF007F16
app.asar SHA-256: 0F41D0F35B0D61940C1E2F1FCE8705A87B1D5287A67B5DFE025B24C79C4963B3
chatgpt-dom.js SHA-256: E3862E34970DA7CD486E779D9291CC9455BD78AF965EC134B44D327DC064FE2C

The installer is available in the local and test notebook Downloads. Installation
started only after the app was confirmed closed and the transferred hash matched.
Installed app.asar and extension hashes matched the package. The stable userData
extension copy also matched after startup. The previous installer was retained.

## Installed acceptance

A new, unfiled diagnostic conversation used only agents and mental arithmetic.
No project files, original task conversations or live ledgers were edited.

- Initial input received an exact delivery receipt; the check remained visible.
- One worker was spawned without model/effort overrides. The prime performed one
  status check and truthfully reported pending review before the worker finished.
  The controlled prompt explicitly requested this behavior; this is not proof
  that every future model will independently obey the revised general guidance.
- Worker finish returned the new text: recorded for the prime, with explicit
  non-confirmation of delivery. Its report was durably retained while sleeping.
- Before follow-up, the report had offers=0 and no offeredAt/ackedAt. No idle-prime
  restart occurred and no report was lost.
- An authored follow-up performed one status call in the same family. The tool
  result included the exact pending report, and the model accurately quoted it.
  The ledger then had offers=1 and an offeredAt; ackedAt remained null because no
  subsequent recipient tool invocation occurred. Receipt acknowledgment was not
  invented or manually forced.
- Both authored inputs were confirmed; exactly two user rows and two completed
  turn outcomes were observed. All four tools (three prime, one worker) had exact
  request_id attribution. Composer returned to Send, active turn cleared, and
  Worked elapsed time settled (34 seconds then 11 seconds).
- No context-frame marker was observed in rendered messages during these checks.
  This bounded check is not a universal guarantee against every form of exposure.

The real provider did not produce either newly recognized transport banner during
this run. Their controlled observer regressions remain the evidence for #450;
no network failure was forced. Stop, Compact, images and Design Mode were not
repeated because their implementation is unchanged in this slice.

Existing ResizeObserver warnings appeared around composer actions. No causal
connection to these production changes was established; this run is not described
as universally warning-free.

After idle/draft checks, the diagnostic app was closed gracefully and reopened
without debug arguments. Temporary tasks created for this run and the SSH forward
were removed; older preexisting tasks were left untouched. No test runner remains.
