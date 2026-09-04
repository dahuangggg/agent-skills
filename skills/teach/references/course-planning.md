# Course Planning

`COURSE-PLAN.md` is the contract reviewed before bulk generation.

Include:

- mission, primary track, learner baseline, constraints, and observable completion criteria;
- course-level architecture and dependency Mermaid diagram;
- lesson number, title, single objective or business module, prerequisites, repository scope, exercise, success criteria, planned diagrams, references, and estimated difficulty;
- durable reference documents to generate;
- parallel generation batches and shared frozen inputs;
- exclusions and known evidence gaps.

The lesson order and grouping in this plan are also the source of truth for the HTML course sidebar. The sidebar shows course-level lessons and references; each lesson's page-level headings belong only in that page's table of contents.

Present the plan to the user and wait for explicit approval before generating lessons. Small factual corrections do not require reapproval; changes to mission, track, course boundaries, dependencies, or success criteria do.

Maintain `COURSE-STATUS.md` with distinct statuses such as `planned`, `generated`, `verified`, `started`, `answered`, and `mastered`. Never infer mastery from page generation or page viewing.
