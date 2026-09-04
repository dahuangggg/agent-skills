# HTML Course Delivery

Use HTML for lessons and durable reference pages. Aim for a calm, high-density reading experience: strong Chinese typography, constrained line length, clear hierarchy, restrained color, visible source evidence, responsive navigation, and print-friendly output.

## Bundled implementation

The publishable, offline course bundle lives at `assets/html-course/` inside this skill. It was adapted from the user-provided learn-nova visual system and is now the canonical source; generated courses must not depend on the original absolute filesystem path.

- `styles.css`: responsive course shell, navigation, search, typography, code, tables, diagrams, and print layout.
- `lesson.css`: interactive lesson and quiz components.
- `course-components.css`: evidence classes, learning objectives, three-tier comparisons, and self-test components.
- `app.js`: navigation, local search, reading progress, code copy, active TOC, and Mermaid initialization.
- `quiz.js`: immediate quiz feedback and local progress persistence.
- `mermaid.min.js` and `MERMAID-LICENSE`: local Mermaid runtime and license.
- `fonts/`: local Noto Sans SC fonts and license.
- `templates/lesson-template.html`: complete interview-track lesson template and visual preview.

Copy the bundle into a teaching workspace with:

```bash
python3 <skill-root>/scripts/install_html_course_assets.py <workspace>
```

Use `--with-template` to install the template as the first sample lesson. The installer refuses to overwrite existing files unless `--force` is explicitly passed. Adapt names, navigation groups, content ordering, and branding to the current course.

Validate a generated workspace without third-party packages:

```bash
node <skill-root>/scripts/verify_html_course.mjs <workspace>
```

## Shared assets

Create or reuse workspace-local assets for:

- Noto Sans SC regular/bold fonts and their license;
- course-wide CSS tokens and responsive/print rules;
- navigation, search, reading progress, code copy, and active table of contents where useful;
- accessible quizzes with immediate feedback and local progress persistence;
- a vendored Mermaid runtime and license when Mermaid is used.

Prefer local assets so lessons work offline. Keep content usable when JavaScript is unavailable: prose, code, citations, and questions remain visible. Do not hide essential answers or explanations exclusively behind interaction.

## Required page qualities

- semantic headings, landmarks, labels, keyboard focus, and adequate contrast;
- one H1, stable anchors, descriptive link text, and alt text where applicable;
- a left sidebar generated from `COURSE-PLAN.md` that lists the whole course's lessons and durable references, marks the current lesson, and remains structurally consistent across lesson pages;
- a right-side table of contents containing only the current page's H2/H3 sections; never duplicate these page sections in the course sidebar;
- responsive layout for narrow screens and clean print output;
- shared CSS/JS references rather than duplicated inline assets;
- diagrams with a textual explanation and graceful failure state;
- source evidence blocks visually distinct from external research and inference;
- previous/next navigation plus course-plan and reference links;
- unique quiz IDs and balanced answer presentation.

## Verification

Before delivery, build/open representative pages and verify:

- all local links and asset paths resolve;
- Mermaid blocks parse and render;
- lesson numbers, titles, prerequisites, and navigation match `COURSE-PLAN.md`;
- source citations still resolve to the intended files/symbols;
- mobile and desktop layouts remain readable;
- interactive controls work with keyboard and preserve/reset state correctly;
- print output does not clip code, diagrams, or callouts.

Run the bundled verifier for links, asset paths, unique IDs, Mermaid blocks, and machine-local path leakage. Supplement it with course-specific checks for required sections, source citation accuracy, and plan coverage. Do not reintroduce repository-specific build assumptions from the original reference project.
