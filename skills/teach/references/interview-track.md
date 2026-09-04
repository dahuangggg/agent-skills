# Interview Preparation Track

Each lesson represents one coherent business module that the learner can explain end to end. Preserve the business-flow mainline even when implementation crosses packages.

## Lesson shape

1. Business background: users, problem, constraints, and verified context
2. Why: why this module exists and what breaks without it
3. How: design, constraints, boundaries, and important decisions
4. What: the repository's actual implementation
5. End-to-end business flow with a Mermaid sequence/flow diagram
6. Architecture or module diagram for complex modules
7. Core pseudocode mapped to repository source evidence
8. Observability: logs, metrics, tracing, audit events, and where instrumentation should be added
9. Three-level solution comparison when relevant:
   - basic implementation and failure modes;
   - current implementation and the problems it resolves;
   - optional researched SOTA direction, applicability, maturity, costs, and tradeoffs
10. Interview narrative: a concise context → challenge → decision → implementation → result story; never invent personal ownership or metrics
11. Resume wording grounded in verifiable contribution; use placeholders for unknown impact
12. Likely interviewer follow-ups and answer anchors
13. Self-test task, constraints, expected artifact, rubric, and explicit success/failure criteria
14. Primary external sources and repository citations

Pseudocode must simplify control flow without changing semantics. Cite the source files and symbols it abstracts. Separate implemented observability from recommended additions.

SOTA means a credible current direction, not merely a more complex design. Research it at generation time using primary sources; state date, maturity, operational cost, adoption constraints, and when the repository should retain its current solution.

