# Interview Question Lenses

Select only lenses that expose a real design decision or failure boundary in the current project.

## Universal lenses

- What concrete user or system problem does this module solve?
- What is the authoritative state, and which component owns each transition?
- What is the end-to-end call path?
- What naive solution would fail, and under what event sequence?
- Why was the current design chosen over the strongest credible alternative?
- What invariant must remain true?
- What happens on duplicate, concurrent, delayed, partial, or reordered work?
- Where are transaction boundaries and irreversible side effects?
- How does the system time out, retry, compensate, reconcile, or alert?
- What changes under multiple processes, multiple machines, or larger data volume?
- What evidence supports the claimed result?
- What remains incomplete, and how should it be expressed honestly?

## Agent-system lenses

Use these when the code actually implements an Agent or LLM-powered runtime:

- Separate the outer user-turn loop from the current-turn automatic tool loop.
- Trace context assembly: system instructions, history, retrieved memory, tool results, truncation, and token budget.
- Explain the orchestration model: ReAct loop, graph, workflow, planner/executor, event loop, or custom state machine.
- Identify termination conditions, maximum steps, recursion limits, cancellation, pause/resume, and human-input boundaries.
- Trace a tool call from model output through schema validation, authorization, execution, result correlation, and history persistence.
- Explain tool-call IDs, duplicate execution risk, idempotency, retries, timeouts, and partial side effects.
- Identify durable versus in-memory state, checkpoint semantics, crash recovery, and replay behavior.
- Explain memory scope, retrieval, freshness, isolation between users or tasks, and poisoning risks.
- Distinguish model fallback, provider retry, semantic retry, and business-operation retry.
- Show how prompts, skills, plugins, MCP tools, and application code divide responsibility.
- Examine sandboxing, trust decisions, secret exposure, prompt injection, data exfiltration, and audit logs.
- Explain observability: traces, model/tool spans, token and latency accounting, failure classification, and correlation IDs.
- Explain evaluation: dataset, grader, baseline, reproducibility, regression threshold, and known blind spots.
- Discuss cost and latency control only when the implementation contains routing, caching, batching, model selection, or budgets.
- For Python, inspect actual async and concurrency semantics rather than assuming `async` means parallel or non-blocking.

## Data and distributed-system lenses

- Cache key ownership, invalidation, stampede, penetration, stale reads, and multi-instance local caches.
- Queue delivery semantics, producer acknowledgment, consumer commit, deduplication, poison messages, lag, and reconciliation.
- Database constraints, transaction scope, isolation, optimistic concurrency, state machines, indexes, and migrations.
- Scheduler reliability, duplicate execution, missed work, leasing, clock assumptions, and recovery scans.
- External API rate limits, timeout budgets, retries, circuit breaking, webhook duplication, and signature verification.

## API and product lenses

- Authentication versus authorization and tenant isolation.
- Input validation, pagination, compatibility, versioning, and error contracts.
- User-visible intermediate states, polling or streaming semantics, cancellation, and recovery UX.
- Why this feature belongs in the product rather than existing only as a technical demonstration.

Turn selected lenses into project-specific questions. Avoid generic questions whose answers are unrelated to the inspected call path.
