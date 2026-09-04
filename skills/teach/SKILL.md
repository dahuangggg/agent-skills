---
name: teach
description: Build source-backed HTML courses from software repositories for learning or interview preparation.
disable-model-invocation: true
argument-hint: "What repository or topic would you like to learn, and why?"
---

# Teach From a Repository

Build a coherent course around the user's goal and the repository's real implementation. Treat the current directory as the teaching workspace unless the user identifies another repository. Do not generate lessons before the user approves the course plan.

## Workflow

Move through these stages in order. Resume from existing workspace state instead of starting over.

1. **Map the repository.** Inspect repository guidance, docs, structure, entry points, business modules, important call paths, data flow, dependencies, tests, observability, and build/run commands. If `.codegraph/` exists, use CodeGraph before text search for code discovery. Record stable findings in `REPOSITORY-MAP.md`, including evidence paths and symbols. Mark inferred business meaning as inference.
2. **Interview the learner.** Establish the focus, learning purpose, target role/level, desired real-world outcome, available time, preferred depth, and whether hands-on repository changes are wanted. Distinguish `knowledge` and `interview` tracks. Write or update `MISSION.md` using [MISSION-FORMAT.md](./MISSION-FORMAT.md). Confirm before changing an existing mission.
3. **Run a diagnostic.** Ask 4–8 progressively difficult questions covering relevant concepts, code reading, flow analysis, tradeoffs, and design/debugging. Mix formats; do not rely only on multiple choice. Evaluate the answers, cite evidence from them, state uncertainty, and write the initial baseline to `LEARNER-PROFILE.md` using [references/learner-profile.md](./references/learner-profile.md). Do not create learning records from this initial diagnostic.
4. **Propose the course.** Write `COURSE-PLAN.md` using [references/course-planning.md](./references/course-planning.md). Include goals, success criteria, prerequisites, lesson dependency/order, repository modules, exercises, planned diagrams/references, and generation batches. Give it to the user for review. Iterate until explicitly approved.
5. **Generate the approved course.** After approval, generate all lessons and reference material. Independent lessons may be drafted by parallel subagents only after freezing `MISSION.md`, `LEARNER-PROFILE.md`, `COURSE-PLAN.md`, `REPOSITORY-MAP.md`, terminology, templates, and citation rules. The coordinating agent must verify source evidence, terminology, dependencies, links, and coverage before delivery.
6. **Teach and adapt.** After the user answers a lesson's questions or completes its exercise, assess against the published success criteria, give actionable feedback, update `LEARNER-PROFILE.md`, and write a learning record only when the response provides evidence that satisfies [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md). Adjust later lessons to remain in the learner's zone of proximal development.
7. **Revise systemically.** If the user rejects or asks to supplement course content, follow [references/revision-workflow.md](./references/revision-workflow.md). Reinspect affected architecture diagrams and repository evidence before editing; reason from the course-wide view, not only the complained-about page.

## Teaching Workspace

- `MISSION.md`: why the user is learning and observable success criteria.
- `REPOSITORY-MAP.md`: evidence-backed architecture, modules, flows, and source map.
- `LEARNER-PROFILE.md`: current assessed level, strengths, gaps, misconceptions, confidence, and next appropriate challenge.
- `COURSE-PLAN.md`: approved course architecture and generation contract.
- `COURSE-STATUS.md`: generation and learner progress by lesson; never treat generated as learned.
- `RESOURCES.md`: curated primary and authoritative external sources, using [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md).
- `GLOSSARY.md`: canonical terms the learner has demonstrated understanding of, using [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md).
- `lessons/*.html`: primary, self-contained lesson pages, sequentially named `0001-<slug>.html`.
- `reference/*.html`: durable cheat sheets, architecture/module diagrams, flows, comparisons, algorithms, and glossaries.
- `learning-records/*.md`: evidence-backed learning changes written after lesson interaction, using [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).
- `assets/*`: shared local fonts, CSS, JavaScript, Mermaid runtime, quiz widgets, and other reusable course components.
- `NOTES.md`: learner preferences and temporary teaching notes.

Create files and directories lazily except for the state needed by the current stage.

## Course Track

Read only the selected track before planning or writing lessons:

- For knowledge mastery, read [references/knowledge-track.md](./references/knowledge-track.md).
- For job interviews, read [references/interview-track.md](./references/interview-track.md).

If both goals matter, choose one primary track and use the other only as a supplement. Record this decision in `MISSION.md` and `COURSE-PLAN.md`.

## Evidence and Research

Keep these evidence classes visibly distinct in lessons and references:

- **Repository evidence:** file, symbol, and current line or line range when available. Claims and pseudocode about this system must trace back to source. Recheck stale citations after repository changes.
- **External evidence:** direct links to primary sources, official documentation, standards, papers, or recognized authoritative analysis. Never use parametric memory as the authority.
- **Inference:** a clearly labeled interpretation derived from evidence; never present inferred business context, scale, impact, or production behavior as fact.

For implementation comparisons, research enough to establish a three-level progression when it is useful:

1. a basic implementation and its failure modes;
2. the repository's current implementation and which prior problems it solves;
3. an optional current SOTA direction, with applicability, costs, maturity, and tradeoffs.

Current/SOTA claims require fresh web research. Prefer primary sources and record the useful sources in `RESOURCES.md`. Do not force a SOTA tier when no credible, relevant improvement exists.

## HTML Course Delivery

HTML is the primary learner-facing format. Before generating course pages, read [references/html-course.md](./references/html-course.md), install the bundled `assets/html-course/` resources into the teaching workspace, and adapt [the lesson template](./assets/html-course/templates/lesson-template.html). Reuse shared assets rather than duplicating inline styles or scripts. Lessons must work locally, be responsive and accessible, print cleanly, and avoid network-only runtime dependencies. Run `scripts/verify_html_course.mjs` before delivery.

Use Mermaid when a relationship, lifecycle, flow, state transition, or multi-component interaction is materially clearer visually. Complex modules should include at least one useful architecture, module, sequence, state, or flow diagram. Add concrete repository examples alongside abstractions.

## Learning Principles

- Keep knowledge-track lessons narrow enough for one tangible win.
- Use retrieval practice, spacing, and interleaving to build storage strength, not only immediate fluency.
- Every exercise has a feedback mechanism and explicit success criteria.
- Multiple-choice options should be similar in length and formatting so presentation does not reveal the answer.
- Link lessons to relevant lessons, reference pages, repository evidence, and one best primary source.
- Ask the learner to bring follow-up questions; ambiguity is part of the teaching loop.
- Add glossary terms only after the learner demonstrates understanding.
