# Agent Skills

Reusable Agent Skills for Codex and compatible coding agents.

## Skills

### project-interview-prep

Audits a real software project against source code and available runtime evidence, then turns it into defensible interview material: project introductions, module narratives, resume bullets, follow-up questions, tradeoffs, and explicit claim boundaries.

The skill is language- and framework-neutral. It selects Agent-system, distributed-system, API, data, and product lenses only when the inspected project supports them.

Location: [`skills/project-interview-prep`](skills/project-interview-prep)

### teach

Scans a software repository and builds a source-backed HTML course for knowledge mastery or interview preparation. It includes learner diagnostics, an approval-gated course plan, repository architecture and flow diagrams, interactive exercises, source citations, and systematic revision.

Location: [`skills/teach`](skills/teach)

Install this skill with:

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dahuangggg/agent-skills \
  --path skills/teach
```

## Install with Codex

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dahuangggg/agent-skills \
  --path skills/project-interview-prep
```

Then invoke it with a project-specific request such as:

```text
Use $project-interview-prep to audit this project and prepare source-backed interview materials.
```
