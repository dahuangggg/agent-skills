---
name: project-interview-prep
description: Audit a software project against its actual source and available runtime evidence, identify interview-worthy modules, and produce source-backed project introductions, narratives, resume bullets, and follow-up questions. Use when preparing to explain a project in interviews; do not use for an ordinary code review with no interview goal.
---

# Project Interview Prep

Turn a real project into material the user can explain, defend, and extend in an interview. Stay language- and framework-neutral: infer the relevant technical lenses from the repository instead of assuming Java, Python, or any fixed stack.

## Start from evidence

1. Resolve the project root and obey its repository instructions. If `.codegraph/` exists, use CodeGraph before text search when locating or understanding code.
2. Inspect the artifacts that establish behavior: entrypoints, representative call paths, configuration, schemas or migrations, tests, operational scripts, and architecture documents. Do not treat README claims as implementation proof.
3. Trace at least one end-to-end path for each candidate module, including its important state transitions and failure path.
4. Record claims using the evidence categories in [references/evidence-rules.md](references/evidence-rules.md). Read that file for every project.
5. Do not modify project source code unless the user separately asks for implementation changes. Write interview artifacts only to an authorized or user-specified location.

## Discover the story before writing it

Partition the project by business problem and architectural responsibility, not by directory, framework layer, or technology name. Prefer a few defensible modules with connected call paths over exhaustive feature coverage.

For each candidate module, identify:

- the user or system scenario;
- the hard constraint or failure being prevented;
- the current call path and state ownership;
- the chosen mechanism and credible alternatives;
- the tradeoff, unresolved risk, and scaling boundary;
- the concrete evidence that supports the story;
- the questions an interviewer could use to test whether the user really understands it.

Use [references/question-lenses.md](references/question-lenses.md) to select relevant follow-up angles. Do not turn every lens into a mandatory section. In particular, use Agent-system lenses only when the project actually contains model calls, tools, orchestration, memory, evaluation, or related runtime behavior.

Present a proposed module map and evidence summary before producing a large document set when module selection is ambiguous or the user asked for staged approval. If the user explicitly asks for a complete result in one pass, proceed after stating the chosen map and assumptions.

## Produce interview material

Read [references/output-template.md](references/output-template.md) when creating the final project introduction or module documents. Adapt its depth to the project and target role; headings are a useful default, not a quota.

Write in the user's language, using natural spoken explanations. Lead with a concrete scenario, then introduce the technical term. A strong module narrative normally connects:

`scenario -> conflict -> naive failure -> current design -> source evidence -> tradeoff -> failure handling -> boundary`

Make the output usable at multiple depths:

- a concise resume bullet;
- a 30-60 second answer;
- a 2-3 minute connected explanation;
- deeper follow-up answers grounded in the same implementation.

Include exact symbols, paths, state values, message fields, keys, schemas, prompts, tool contracts, or configuration only where they help the user defend the explanation. Explain their role instead of dumping names.

## Preserve honesty

- Distinguish implemented, runtime-verified, inferred, documented, and proposed behavior.
- Never invent throughput, latency, accuracy, cost savings, scale, reliability, or production adoption.
- Do not describe a framework default, copied scaffold, or configuration toggle as a design personally implemented by the user.
- Do not turn a possible improvement into current behavior.
- Surface contradictions and failure windows rather than smoothing them over.
- Add a `不能这样说` section for claims that are tempting but unsupported, paired with accurate alternatives.
- When evidence is incomplete, say what was inspected, what remains unverified, and how the claim should be phrased safely in an interview.

The goal is not to make the project sound maximally sophisticated. The goal is to produce a coherent story that remains accurate under follow-up questioning.
