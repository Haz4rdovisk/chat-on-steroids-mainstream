# Unreadable session history — PR #399 adaptation

## Scope and credit

Adapted from Maxim (@Maximapple), upstream PR #399, reviewed at
`0041cb84aa2d86db3d9652d8ae4b35a2c6e8c614`.
Future commit attribution: `Co-authored-by: Maxim <5410641+Maximapple@users.noreply.github.com>`.
Shared session-store behavior only; no Internal Chromium host, browser delivery, silence
recovery, compaction policy or UI changes. Preserve the separate uncommitted #392 listener patch.

## Failure and repair

- Read failures previously became zero journal sequence, missing metadata or skipped catalog
  rows. The recorder could then create a second session for an existing conversation.
- Locked primary metadata must not fall back to an older backup: that backup may predate a
  conversation rebind. Missing/damaged primary bytes retain validated-backup recovery.
- A catalog pass now fails if a candidate cannot be read. Its existing single-flight retires
  normally; the next caller can retry. No partial index is published or remembered as a miss.
  Current and historical owner lookups also propagate indexed-owner read failures.
- Canonical history and journal recovery propagate I/O errors before publishing reconstructed
  metadata. Missing optional files and existing damaged-JSON handling remain supported.
- An append error can occur after bytes reached disk. If reading its outcome also fails, the
  live writer retains an explicit recovery requirement. The existing per-session queue restores
  the durable snapshot before any later event, canonical message, image, metadata mutation or
  unattributed rewrite proceeds. There is no independent retry loop or timer.

## Risk trade-off

A cold catalog cannot prove absence or uniqueness while even one candidate is unreadable.
Lookups/sidebar operations depending on that catalog can therefore fail temporarily instead
of silently omitting an owner. They recover on a subsequent call when filesystem access returns.
An already warm catalog is not rescanned for every event. Healthy writes add no filesystem work.
The rare uncertain-append branch deliberately blocks later writes until recovery succeeds.
This is integrity protection, not a filesystem repair or power-loss/fsync guarantee.

## Validation

Synthetic temporary histories only; installed/live user session ledgers were not modified.
New regressions first demonstrated metadata failures being accepted as missing ownership,
journal failures resetting projections, and an uncertain committed append allowing sequence reuse.
The focused failure/recovery cases now pass, including EACCES/EBUSY/EMFILE, stale backup
identity, cached and ambiguous owners, journal stat/open failures, both outcomes of an uncertain
append, canonical history failures, corrupt-primary backup recovery, and absent/stray entries.

- Mainstream: all 15 new focused regressions passed; typecheck passed.
- Mainstream full `npm run verify` passed with `VITEST_MAX_WORKERS=2`: privacy, notices,
  native source inventory, typecheck and Electron resolution; 6,180 tests passed / 46 skipped
  in the broad run, followed by 26 passing native/shutdown tests with one worker.
  Total: 6,206 passed. The broad run took 527.78 seconds; native/shutdown took 5.86 seconds.
- Internal: typecheck passed; session, continuation, resume, correlation and attribution-repair
  suites passed (318 tests). The full suite was not redundantly repeated in Internal.
- Both repositories: `git diff --check` passed; store, session tests, contributor credit and
  this worklog are byte-identical. The shared #392 files remain byte-identical too.
  AGENTS.md received the same scoped contract paragraph while preserving variant differences.
- No build, installation, commit or push performed for this change.
