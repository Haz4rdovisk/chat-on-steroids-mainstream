# Worker report acknowledgment audit — 2026-09-26

Delivery update: see [package and installed acceptance](worklog-2026-09-26-followups-delivery.md).
The unbuilt/uncommitted status below describes the earlier investigation stage.

## Evidence and decision

A read-only audit of the installed real-task session found two worker reports
preserved in the prime's parked inbox with offers=0, offeredAt=null and ackedAt=null.
The prime had already completed its provider turn before those reports arrived.
No live session, page, queue or project file was modified during the audit.

The broker intentionally retains parked inboxes. The kernel offers them with the
prime's subsequent tool results and acknowledges only eligible earlier offers on
a later exact caller invocation. This is not a push channel that restarts an idle
prime. Existing exact-family delivery tests cover parked reports and another family
becoming active before acknowledgment.

The first demonstrably incorrect statement was the worker finish reply claiming
"The prime agent has your result" before any offer. An idempotent finish retry made
the same unproven claim. Instructions also said "never poll" without explaining how
to collect already pending reports at the final boundary or disclose unfinished review.

## Minimal correction

- Finish and finish-retry replies say the report was recorded for the prime and
  explicitly do not confirm delivery. Sleep, terminal state, idempotence, report
  payload and all durable acceptance/receipt logic remain unchanged.
- Core instructions and the agents tool description allow one final status check
  to collect already pending reports, prohibit repeated polling, and require
  disclosing unfinished delegated review rather than claiming verification.
- No auto-restart, wait tool, timer, new ledger, browser input or completion hold.
  No modification to agents.ts, kernel delivery, bridge, Internal host or Browser Use.
- This is an independently scoped correction from the live audit, not an adoption
  of #382. That PR gates Goal/Loop's automatic step while workers run; both modes
  were disabled in the observed run, so it is not a direct solution to this case.

## Regression coverage

Three focused checks failed before the correction and passed afterward:
sleeping-worker acknowledgment plus parked delivery, terminal-worker acknowledgment,
and model-visible instructions/schema description.
The parked-inbox regression also proves that a finish retry neither replaces nor
duplicates the original report nor invents an offer/ACK. The existing follow-up
checks prove collection and acknowledgment under the exact prime while another
family is active.

## Limits

This fixes truthful acknowledgment and guidance, not delivery of future reports
after the prime finishes. A final status check cannot collect a report that does
not yet exist, and instructions cannot guarantee the model will comply. Automatic
resumption or an explicit bounded waiting mechanism would be a separate policy/API
change requiring its own scope and safety review. No new installed E2E is claimed.
The preexisting local #450 changes remain separate and uncommitted.

## Final checks

- The first broader run exposed the agents description exceeding its existing
  3,400-byte discovery budget. The wording was shortened; the limit was not changed.
- Mainstream agents and kernel-run-inbox suites passed (169 tests); the complete
  mcp suite passed on the final text (171 passed, 6 skipped).
- Internal's same three suites had 339 passes, 6 skips and one process-recycling
  wait failure unrelated to the changed report text. That exact case passed alone
  unchanged. This is not a green original combined run or proof of the flake's cause.
- Both typechecks and diff whitespace checks passed. Shared implementation/tests
  and this worklog match across repositories.
- The previous published block's CI completed green on Linux, Windows and macOS
  (run 36259940726). It does not include these local changes or #450.
- No full verify, package, installation, commit or push was performed for this slice.
