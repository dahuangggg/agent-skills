# Output Template

Adapt this template to the project. Omit empty or irrelevant sections and link repeated concepts instead of duplicating them.

## Project introduction

### Project at a glance

- One-sentence product description.
- Primary user and core workflow.
- Current deployment or maturity boundary, when known.

### 30-second introduction

A spoken summary covering the product, the user's contribution, and two or three strongest engineering problems.

### 2-minute introduction

Connect the main workflow and modules into one story. Explain what was optimized or added and why.

### Module map

For each module, provide:

| Module | Business problem | Representative call path | Key decision | Evidence | Main follow-up |
|---|---|---|---|---|---|

### Resume bullets

Write a small set of defensible bullets using:

`scenario + action + mechanism + supported outcome`

Do not insert numeric outcomes without qualifying evidence.

### Project boundaries

List meaningful limitations, unverified claims, planned improvements, and features that are demos or scaffolds rather than production-complete behavior.

## Module document

```markdown
# <Project> - <Module> interview narrative

## Resume highlights

> <Concise, defensible bullet>

## 1. <Core problem>

### Scenario
Describe a concrete user action or system event.

### Problem analysis
Show why the naive path fails. Use an event sequence, small data example, or state transition when helpful.

### Candidate designs
Compare the current design with the strongest credible alternative: benefits, costs, applicability, and operational burden.

### Why this project chose the current design
Tie the decision to actual scale, consistency needs, existing infrastructure, and project maturity.

### Current implementation
Trace the real path with relevant symbols, files, state, storage, messages, prompts, or tool contracts.

### Failure handling and boundaries
Explain duplicates, concurrency, partial failure, timeout, restart, multi-instance behavior, recovery, monitoring, and remaining gaps only where relevant.

### Tradeoff
State what the design gives up, what it gains, and what changed condition would justify another design.

### 30-60 second recap
Provide a natural spoken answer.

### Follow-up questions
For each question, answer from this project first; then describe improvements as proposed behavior.

## 2-3 minute connected explanation
Connect the module decisions into a single end-to-end narrative.

## 不能这样说

| Unsupported or inaccurate claim | Why it is inaccurate | Interview-safe wording |
|---|---|---|

## Resume wording

1. <Final source-backed bullet>
```

## Writing calibration

- Start with the scenario; define terminology after the reader can picture the problem.
- Prefer one representative call path over a catalogue of files.
- Include exact implementation names only when they help the explanation survive follow-up.
- State the invariant before describing concurrency or recovery mechanisms.
- Use future tense or explicit labels for proposed hardening.
- Preserve useful imperfections. A precise explanation of a current limitation is stronger than an inflated claim.
