# Silence recovery and PR #420 audit — 2026-09-26

Delivery update: see [package and installed acceptance](worklog-2026-09-26-followups-delivery.md).
The unbuilt/uncommitted status below describes the earlier investigation stage.

## Scope and evidence

Read-only follow-up on the already audited installed real-task run. No live
session, page, queue, project file or app configuration was modified.

- The authored inputs for the relevant turn froze model gpt-5-6-thinking and
  reasoning effort High. The latest page-observed selection also says High,
  but that observation is after the reload; it is not a historical observation
  of the exact instant the repair was authorized.
- The last recorded tool completed at 16:50:46.776 UTC. The silence repair was
  requested at 16:52:46.833, approximately 120 seconds later; the browser
  confirmed the reload at 16:52:46.935.
- The next recorded tool arrived approximately 11 seconds after reload.
  No recorded local tool spans the quiet interval. This does not prove whether
  the provider was legitimately thinking or its page/stream was stalled.
- The subsequent automatic Continue ticket was cancelled on new work, with
  no delivery receipt or message id. It was not sent.
- The later explicit stream-recovery timeout banner and successful recovery
  are a separate episode; their positive evidence does not justify this earlier
  silence-triggered reload.

## Source checks

Main owns the exact-turn activity grant and postpones silence recovery for
known running local tools. Background elects the target document and checks the
page before and after claiming the repair. Content refreshes/flushes observations
and rejects changed conversation/epoch, new progress between checks, pending tools,
native automation, input activity, drafts, attachments and Stop requests.
These checks are meaningful safeguards, but an unchanged page does not prove
that silent provider reasoning has stopped. A visible generation control alone
would not prove health either: a stalled page can retain it.

## Decision

PR #420, reviewed at 280f3d07027bb91be2f2f1701e7139073e8b529a,
extends silence allowance for xhigh/max/ultra and deliberately keeps High at
two minutes. It therefore does not address the demonstrated High configuration
of this run. Do not import it as a fix for this occurrence, increase High's
timeout speculatively, or add another timer/watchdog/authority.

This audit does not establish that the reload was necessary, nor that it
interrupted healthy thinking. A future controlled reproduction should correlate
page progress/native generation evidence, exact effort and local tool activity
immediately before the repair decision. Prefer existing diagnostics; no new
telemetry or live test was introduced by this audit.

## Validation and delivery

Documentation only in this slice; no production/test changes and no test rerun.
The prior local native-banner and worker-acknowledgment corrections remain
uncommitted and absent from the installed PR-hardening package. Their existing
validation is documented in their separate worklogs. Shared audit notes were
mirrored across Mainstream and Internal, without changing Internal Chromium.
