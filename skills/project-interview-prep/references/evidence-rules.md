# Evidence Rules

Use these rules to keep interview claims aligned with the project.

## Evidence labels

Classify material claims internally and expose the label when ambiguity matters:

- **Implemented:** present in current source or configuration. This does not prove it works at runtime.
- **Verified:** exercised in the current task with a relevant test, request, trace, log, or observable runtime check. State exactly what passed.
- **Inferred:** a reasonable conclusion from several artifacts, but not directly exercised. Explain the inference.
- **Documented:** claimed by README, design notes, comments, or resume text but not yet confirmed in implementation.
- **Proposed:** an improvement, production hardening step, or alternative design that is not current behavior.

Do not collapse these labels into “the project supports X.”

## Evidence priority

Prefer evidence in roughly this order, while accounting for what the claim concerns:

1. Current runtime observation or a relevant passing test.
2. Executable source, schema, and configuration on the current revision.
3. Tests that encode expected behavior but were not run.
4. Architecture decisions and maintained project documentation.
5. README, comments, resume bullets, and historical notes.

A passing unit test proves only its exercised boundary. A listener, build, lint result, rendered UI, or successful import is not end-to-end proof.

## Claims that require extra care

- **Performance:** require a reproducible workload, environment, sample size, and result artifact. Otherwise describe the intended pressure reduction, not an achieved percentage or QPS.
- **High availability or reliability:** identify replicas, persistence, retry ownership, acknowledgment boundaries, recovery, and monitoring. Library presence is not proof.
- **Exactly once or zero loss:** usually rephrase in terms of at-least-once delivery, idempotency, deduplication, reconciliation, and remaining crash windows.
- **Consistency:** name the authoritative state, the consistency level, the allowed stale window, and how divergence is detected and repaired.
- **Security:** distinguish authentication, authorization, sandboxing, validation, secret handling, and auditability. One does not imply the others.
- **AI quality:** require an evaluation dataset and metric before claiming accuracy or quality improvement. A successful demo is functional evidence only.
- **Scale:** distinguish design intent from tested or production-observed scale.
- **Personal contribution:** separate original work, adapted open-source behavior, framework defaults, and planned improvements.

## Contradictions and gaps

When documentation and source disagree:

1. Describe the contradiction precisely.
2. Prefer the current executable behavior for “what it does now.”
3. Do not silently repair the story.
4. Give an interview-safe formulation.
5. If useful, list the smallest verification needed to resolve the uncertainty.

For a failure window, show a concrete event sequence. State the invariant that breaks, the user-visible consequence, the current mitigation, and the remaining risk.
