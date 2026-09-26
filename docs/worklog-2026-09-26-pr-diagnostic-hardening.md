# PR diagnostic hardening — 2026-09-26

## Scope and provenance

First authorized priority block, adapted in Mainstream and Internal:

- #439, Gokuencinar, head b36fe1a67704a9bb99b1fa53afe8ca2f22162e26:
  recognize the exact native stream-recovery polling timeout banner through the existing
  transport-error classifier.
- #424, Maximapple, head 5f01a9d75d057551039958a2d763f9ef22826fbc:
  retain the bounded pre-authorization recovery release reason.
- #421, Maximapple, head 41071abe7816f2179f80e2f1372649db3abf490c:
  diagnose shared Secure Tunnel IDs for admitted optional OpenAI connector starts.

These are adaptations, not merges of the complete PR branches. Future commits carrying
these changes must include:
Co-authored-by: Gokuencinar <160122648+Gokuencinar@users.noreply.github.com>
Co-authored-by: Maxim <5410641+Maximapple@users.noreply.github.com>

## Decisions and regression boundaries

The banner remains scoped by the existing native error/turn reader. Native generation
continues to veto premature turn completion; an exact final supersedes a stale banner.
Quoted prose and access-limit handling retain their existing rules.

The input row's existing error field retains at most 200 characters. It also deduplicates
unchanged release diagnostics across claims and reloads. Logging occurs only after durable
commit; failed persistence keeps the original browser claim and emits no success-like release
diagnostic. A confirmed recovery receipt clears the previous preparation error so delivery
does not retain a stale failure presentation. Pickup deadlines, source identity and the
authorization/ambiguous-send fence are unchanged. No second map or timer was introduced.

Tunnel checks run where eligible optional OpenAI transports actually start. Peers come from
the owned Core transport and optional transport lifetimes. This covers Settings-only restarts
and excludes merely saved disabled surfaces and non-OpenAI transports. The warning contains
surface names, no tunnel IDs or asserted failure probability, and does not block connection.

## Validation

- Mainstream: typecheck passed; the three complete relevant suites passed, 1,092 tests:
  connection, input-delivery-integration and content-script.
- After the final receipt-cleanup/persistence regression adjustment, Mainstream reran
  the three new input variants (ordinary, Goal, Loop): all passed; typecheck passed again.
- Internal: typecheck and all three complete suites passed on the final mirrored source:
  1,092 tests.
- New cases cover changed/unchanged bounded reasons, restore, failed durable write,
  foreign owner, authorization custody and confirmed receipt cleanup; tunnel eligibility,
  distinct IDs, non-OpenAI transport and Settings-only collisions; new/old transport
  banners, ongoing generation, recovered final and quoted prose.
- Production files, shared connection/content tests and CONTRIBUTORS are byte-identical.
  The input integration test retains only its preexisting Internal host mock difference.
- Both git diff --check checks passed. Existing split-request acceptance documentation
  changes were preserved.
- Full verify is deferred to the end of the authorized implementation sequence.
  No build, installation, commit, push or PR mutation occurred in this block.

## Remaining priority and evidence

The user authorized proceeding with the bounded #417 slice and deferring its live
acceptance. That slice is now implemented in both variants; see below.
Next: coordinated stable turn identity from #423, then one native composer change
combining the relevant #418/#422 cases. The larger stacked PRs remain excluded.

The required live-page inspection for those next changes could not proceed: the authorized
remote notebook's SSH connection timed out, including the follow-up attempt. This is not
evidence that its installed app failed or that its provider shell changed. No remote app
was stopped, reopened or modified. Native-page acceptance remains pending; passing
synthetic suites does not establish installed/provider behavior.

## Second slice: compiler-cache scan budget (#417)

Adapted only the scan-budget change from Dolipr1ne, PR head
2a2ebeb1bfcfa2b0773941d9f81cc76d82c34197. Future commits carrying this adaptation
must include:
Co-authored-by: Dolipr1ne <169820424+Dolipr1ne@users.noreply.github.com>

The former guards skipped every compiler cache above 32 rows and every row above
1,024 cells. Besides losing small valid sources, this could conceal a conflicting
candidate when a hook had already supplied a plausible mapping. Rows and cells now
consume the existing shared 2,048-unit budget. Exhausted/incomplete scans and contradictory
mappings still reject the join, including fallback to the history query. Conversation,
user, selected turn and committed React tree checks remain unchanged.

Six synthetic regression cases failed against the original source and passed after
the change: valid 42-row cache, valid 1,100-cell row, row-budget exhaustion, cell-budget
exhaustion, and conflicting mappings beyond each former dimensional cutoff.
The existing payload privacy assertions continue to exclude private reasoning and
tool arguments. The complete shell-compat, fiber and shell-agent-roundtrip suites
passed in each repo: 280 tests per variant. Both typechecks passed.

The descriptor protocol stays at version 21 because its shape is unchanged.
Re-execution already replaces the old helper listener; a fresh document or authorized
re-injection is still needed to test changed source in a live page. No installed
payload was changed. No #417 rich-content, model-picker, turn-identity or Send/Stop
code was incorporated. The Internal host remains untouched.

## Third slice: coordinated identity and native composer

Rebecca became reachable after the user activated it. The correct Galaxy-Book3 was
opened with diagnostics only after verifying no running CoS process, task or draft.
A new diagnostic conversation was used; project conversations were not modified.
The native section key was the actual user UUID, while its entry/search id was
fallback-turn-0. Both user and assistant slots still used that positional entry id.

Adapted Maximapple's #423 (b49f47080685a40f3b0089a6aebcccd1846e3fbb):
DOM and MAIN publish the stable section identity; MAIN separately proves the exact
search-entry relation and unique typed user. Slot lookup retains entry.id.
Positional-only identity and contradictory/multiple users fail closed. Seven new
identity cases cover remount renumbering and rejection. The three reader suites
passed with 287 tests in each variant before the composer change.

Adapted #418 (74c6de51b9566a235460e4622bb5e2bf12504f4c) and #422
(d720d77fdab0300077443efc41531ea6df14511e) as one native composer change.
Exact arrow and four-path Voice shapes were captured from the signed-in page.
Send fallback requires a unique native primary slot and exact arrow, not icon
exclusion. An enabled exact idle control supersedes only the stale busy hint.
Stop still wins; unknown/disabled/ambiguous controls retain the hint. Completion,
authorization, receipt ownership and Internal host code remain unchanged.

Live diagnostic source probe: DOM and MAIN returned the same stable turn, exact
user/final message identities, one call and one request, and generating=false.
The page was reloaded immediately afterward, restoring installed source.
A separate isolated-world DOM probe distinguished Voice from Send; its temporary
native draft was cleared without sending. This is live reader evidence, NOT a
new installed build or a full delivery/Stop/Compact E2E.

The first four-suite run had 1,082 passes and one new test error: it called a
private helper. The test was replaced with the public send operation, proving
disabled and aria-disabled controls do not click, then one enabled send succeeds.
The corrected full shell suite passed (160 tests); both typechecks passed.
The final Internal four-suite run passed all 1,083 tests. The shared implementation
and shell fixtures were byte-compared across both repos; git diff --check passed.
Mainstream's other three suites passed in the earlier four-suite run; only the
affected shell suite was repeated after correcting its private-helper test.

After confirming no active task or draft, the diagnostic app was gracefully closed
and reopened normally. Remote checks confirmed it running with zero debugging
processes and zero listeners on 9223. Both temporary scheduled tasks were removed;
the owned SSH forward was stopped. No background test/verify remains running.

Future commits must preserve Maxim's co-author trailer already listed above.
No full verify, package, installation, commit, push or PR mutation in this slice.

## Final validation / package preparation

On the user's continuation, Mainstream npm run verify ran to the end of its broad
Vitest phase: privacy, notices and typecheck passed; 6,235 tests passed, 46 skipped,
four failed across exec-hints (PowerShell pipeline timeout) and renderer-state
(three asynchronous Settings expectations). The command therefore exited nonzero
and did not reach its final computer/mcp-shutdown command.

Without source changes, all of exec-hints, renderer-state, computer and mcp-shutdown
were then run serially with maxWorkers=1: 204/204 passed. This supports load
sensitivity, not a proven root cause or a green original broad run.
Internal retains its successful 1,083 relevant tests and typecheck; its full suite
was not repeated. No stray Vitest processes remained before packaging.
User explicitly confirmed quitting Rebecca for installation. Internal x64 packaging
was started after the serial checks; installed acceptance is not yet claimed.

Internal x64 packaging and smoke-packaged-runtime succeeded. Local and Rebecca
Downloads contain Chat-On-Steroids-Internal-20260926-PR-hardening-x64.exe
(173,390,220 bytes), SHA-256:
C66A3073B01EDB8D93ECB258821F4F700837F6738FF7D3810CD3870FBBBD21BF.
The installer was applied only after the app was closed and the copied hash matched.
Installed app.asar SHA-256 matches the package:
27F49C2D72F522B24859C5979F1966355537C61C871B9962800D34E4FB60FEED.
Both changed extension files also match source/package/installation exactly.
The previous installer remains available.

Installed diagnostic acceptance so far: first authored input received an exact receipt,
one update_plan call was attributed by request_id, final arrived once, confirmation
remained visible and composer/Working settled. Ordinary follow-up passed. A long
diagnostic response was stopped through the app's exact-turn API: requested remained
pending until native stopped confirmation, then composer returned to Send. A further
follow-up after Stop was accepted and completed. No duplicate authored rows or exposed
context frame observed. Compact was then requested once; source Send is confirmed
and the provider handoff is generating. Destination acceptance remains pending.

Final Compact result: stage=done, sourceSend=sent, destinationSend=sent, no error.
The new provider conversation answered and ended; the original local session and
its prior history remained. Active turn cleared, stopPending=false, job.busy=false,
composer returned to Send and Worked displayed the elapsed duration.
This was a warm-page Compact test; cold-tab Compact, all account languages, image
generation, workers and Design Mode were not re-exercised in this focused acceptance.
The diagnostic source probe earlier and installed run are distinct evidence.

After the run, idle/draft checks passed and the app was gracefully restarted without
diagnostic arguments. Temporary installation/diagnostic tasks were removed.
This package includes the current uncommitted authorized changes in both source
trees; its filename deliberately does not claim a new commit. No commit, push,
release publication or upstream PR mutation was performed.

## Real-task read-only audit before publication

After installed acceptance, the user authorized a read-only audit of a real long
project conversation and its two workers. No live ledger, page, draft or task was
changed for this audit. Private project names, session ids and content are omitted.

- Cold-source Compact & Resume reopened the provider page, confirmed both sends,
  captured the handoff and retained the same local session through the rebind.
- 197 recorded tool calls across the prime and workers ultimately had exact
  request_id attribution. Operational tool rejections/nonzero processes occurred;
  no internal tool error was recorded. Four authored app inputs had exact receipts.
  No duplicate nonempty canonical message id was found in the inspected prime range.
- The reviewer was reused for a second pass and confirmed its earlier findings fixed.
  Both workers ultimately slept; the prime's final response preceded its completed
  turn record, with no remaining active turn.
- The exact native stream-recovery polling timeout occurred during the real task.
  Assistant-error recovery reloaded the page and the original turn's final response
  was captured afterward. This is live evidence for the #439 adaptation, not a
  guarantee for every transport failure.
- A separate silence reload occurred roughly 120 seconds after the last recorded
  tool. Its automatic Continue was cancelled without sending when new work arrived.
  The trace does not establish that this reload was necessary.
- The prime finalized before the second worker's final verification. Two reports,
  including documentation discrepancies, remain durably pending and unoffered in the
  prime inbox. This is an unresolved coordination/consumption issue, not lost messages
  and not evidence that Goal/Loop waiting would fix this run (both modes were off).
- ResizeObserver warnings, a missing-tab reference and a late old continuation
  checkpoint were recorded. No causal link to this patch set was established.
  Their existence prevents describing this run as universally clean.

Read-only storage/log review does not itself prove visual UI behavior or lack of
private-frame exposure. The earlier installed diagnostic UI checks remain separate.
The user authorized closing/publishing this validated block, then implementing the
small #450 classifier follow-up separately. Worker coordination, silence policy and
automatic-close classification are investigation backlog, not changes in this block.
