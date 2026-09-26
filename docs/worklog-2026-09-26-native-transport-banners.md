# Additional native transport banners — 2026-09-26

Delivery update: see [package and installed acceptance](worklog-2026-09-26-followups-delivery.md).
The unbuilt/uncommitted status below describes the earlier investigation stage.

## Scope and attribution

The user authorized the next small slice after publishing the validated diagnostic
block (Mainstream 573296c; Internal 670c5cf). Adapted Maximapple's PR #450,
head 926efa78fb98f11100adc99bf5ca7cb4b50bd448:
https://github.com/totec448-spec/chat-on-steroids/pull/450

Any commit carrying this adaptation must include:
Co-authored-by: Maxim <5410641+Maximapple@users.noreply.github.com>

## Change and invariants

Only the existing native transport-error classifier changes in production. It now
recognizes the full "A network error occurred. Please check your connection and
try again." notice and "Resume stream unavailable", with the existing whitespace,
case, trailing period and Retry handling. Matching remains anchored to the whole
notice. No generic substring matching or new observation mechanism is introduced.

The existing visible native alert/Retry-card readers, exact turn ownership and final
evidence still govern publication. Native ongoing generation is not ended by an
error banner; a recovered exact final completes the original turn. Ordinary assistant
prose and explanatory text beside a Retry button must not become transport failures.
Provider access limits retain their own classification.

No recovery timer, automatic Continue policy, click/resend, bridge, worker lifecycle,
Internal Chromium host or Browser Use code changes. Shared source/tests are mirrored;
the Internal-specific AGENTS instructions remain intact.

## Validation and evidence limits

Before the classifier change, both new banner cases failed to produce the expected
recoverable chat_error. After the change, all 45 turn-completion tests passed,
including classic banners, the two new banners, native generation preservation,
non-alert Retry cards, reload/final identity, quoted prose and provider access limits.
The ten additional cases reuse existing behavior tests instead of a new mock detector.

The prior live long-task audit exercised #439's polling-timeout wording, not these
two new variants. #450's author supplies the live wording report. Local regressions
exercise the production observer with controlled DOM fixtures; no new installed
acceptance, forced provider/network failure or screenshot evidence is claimed.

Final checks: the complete content-script suite passed in both repositories
(787/787 each), with maxWorkers=1, and both typechecks passed. Shared production
source, tests and contributor records match byte-for-byte; git diff --check passed.
The full repository verify was not repeated for this isolated classifier slice.
No test process remains from these completed commands. This slice is local,
uncommitted and not included in the existing installed PR-hardening executable.
