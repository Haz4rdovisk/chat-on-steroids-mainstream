# Split request evidence — 2026-09-26

## Decision and scope

Adapt only the missing stream-reader slice of upstream #414 (Maximapple,
head c9ecc3eb14f4b8094a06f61f65511da8c0fadc10). The local bridge already accepts
message-less request evidence, requires exact local MCP ingress and confirms persisted
correlation; it is unchanged. Future commits adapting this work should retain:
Co-authored-by: Maxim <5410641+Maximapple@users.noreply.github.com>

Both repository variants share identical extension/usage.js and observer tests.
No Internal Chromium host, Browser Use, input delivery, composer, recovery timers,
settings, dependencies or permissions were changed.

The reader accepts native input_message.metadata.request_id, independently when the
same root includes conversation_id, or by inheritance from a valid explicit root
identity within that HTTP response / linked WebSocket chain. Contradictions, malformed
identity, unknown encoding and missing predecessors retire inheritance permanently.
Nested values cannot seed identity; arbitrary request-only metadata cannot inherit.
Classic complete events keep independent proof. Existing byte/time/count limits,
document lifetime and downstream ingress/route/epoch gates remain in force.
SSE comments are inert. Observer version 3 replaces version 2 using its existing
disposal mechanism instead of stacking active readers.

## Risk decision on #410

Not implemented. Keeping an elected tab after cos-input disappears is not sufficient
document proof. A document-start marker capture and its invalidation/transfer contract
must be established before changing first-send authorization. The proposed
sessionStorage cache can retain markers across documents; importing it would widen
authority. Current URL-dependent behavior is unchanged, including its known possible
first-send stall after marker stripping. No partial tab-id fallback was installed.

## Validation

- New split-event regression failed before the production patch (37 other tests passed).
- Focused observer/correlation/bridge suites: 603 passing in each repository.
- Internal typecheck passed; both diffs passed whitespace checks.
- Source and tests are byte-identical between variants; their AGENTS host distinctions
  remain intact. Only the shared stream contract and contributor credit were updated.
- Final Mainstream verify passed (exit 0): privacy, notices, typecheck, 6,196 tests
  plus 26 native/shutdown tests passed; 46 skipped. The first invocation lost its
  completion handle and was not counted; the recorded rerun completed normally.
  Full Internal verify was not repeated: its 603 focused tests and typecheck passed.

## Live evidence and limits

The authorized remote notebook was idle, with no draft, before opening diagnostics.
A new diagnostic conversation completed one update_plan call using the installed
observer v2. Then the production reader source was evaluated into that exact idle
signed-in document using its supported observer replacement (v2 -> v3).
A second single-call diagnostic completed with a confirmed native send receipt,
the tool recorded in the same local session, final answer and completed turn.
No existing project conversation was modified.

Bounded in-memory CDP inspection observed f/conversation, a resume_conversation_token,
and input_message.metadata.request_id. In this actual rollout the input_message
also carried conversation_id: it proves compatibility with the new metadata path,
not a live reproduction of the split-id variant. Split-id and contradictory-owner
cases are synthetic test evidence. The final heartbeat-only parser refinement was
covered by the focused suites after the live observation; it was not separately
installed or exercised as a new packaged build.

Diagnostics were closed gracefully after checking sessions and drafts. The existing
installed app was reopened normally; remote port 9223 was confirmed closed and this
round's temporary scheduled task and SSH forward were retired. User history remains.

No installer was generated or installed. The installed package remains the preceding
build; the injected test source was document-local and disappeared on app restart.
No commit, push or PR edit was performed during implementation/validation. The user
subsequently authorized committing and publishing this block in both repositories and
updating the existing upstream PR #345, preserving its title. That publication includes
the previously validated session-integrity/send-listener commits; no installer is implied.

## Authorized package and installed acceptance — 2026-09-26

The user subsequently requested a new Internal installer and installation/testing on
Rebecca. Internal head `086f0c3678649cb81dcc85eb034221842b581b06` was packaged;
no production source was changed during this delivery. Upstream PR #345 CI run
`36214947197` completed successfully on Windows x64, macOS arm64 and Linux x64.
The packaged Windows runtime smoke passed (Electron, sharp, PTY and tree-sitter).

Installer: `Chat-On-Steroids-Internal-20260926-086f0c3-x64.exe`, 173388746 bytes.
SHA-256: `9EA6FF46013FFA8F071F2048D2C388FC617DF95A0F336EE2C184DB377DE2BB2B`.
Local Downloads and remote Downloads copies matched before installation. The first
transfer was interrupted; its stale SFTP process was retired and the completed retry
was verified before execution. The installer exited successfully (task result 0).

Installed payload matched the package:
- app.asar: `78F3DCECAD78C5BAFF03243A107C9BCED21A731A03700779B94CA5142CCFBE48`
- bundled and mirrored usage.js: `91A296B2FD3801FDC73032A901D4EE2DBFDE606A130E7108ECADF41A34434551`

A new diagnostic conversation used the installed observer v3, without source injection.
First send and follow-up each obtained native receipts, exactly two user messages and
expected answers, and two completed turn records. The single update_plan call had
request_id attribution to the exact same conversation. No duplicate sequence numbers
or visible private-context leakage was observed. Both receipt checks remained visible;
final controls had no active turn, stop pending or finish hold, and the composer returned
to Send message. Worked for displayed 14s and 6s for the respective turns.

This is installed-package smoke evidence, not a live reproduction of every split-id
transport variant or a repeat of the earlier image/Compact/Design Mode E2E. The
synthetic contradictory-owner/split-chain tests remain the evidence for those cases.

After checking sessions and drafts were idle, diagnostics closed gracefully and the
installed app reopened normally without debug arguments. Port 9223 had no listener.
Only this round's three temporary scheduled tasks were removed; the preexisting SSH
forward was reused and left untouched. No test/build remains running. These delivery
records are uncommitted; no additional commit, push or PR edit was made this round.
