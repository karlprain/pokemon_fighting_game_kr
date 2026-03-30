<!--
Sync Impact Report
- Version change: template placeholders -> 1.0.0
- Modified principles:
  - Template Principle 1 -> Playable Core Loop First
  - Template Principle 2 -> Deterministic Combat Rules
  - Template Principle 3 -> Test the Game Loop
  - Template Principle 4 -> Keep the Scope Small
  - Template Principle 5 -> Original or Licensed Assets Only
- Added sections: Scope & Technical Constraints; Workflow & Quality Gates
- Removed sections: none
- Templates requiring updates:
  - ✅ .specify\templates\plan-template.md
  - ✅ .specify\templates\tasks-template.md
  - ⚠ pending: none
- Follow-up TODOs: none
-->

# Pokémon Fighting Game Constitution

## Core Principles

### I. Playable Core Loop First
Every feature must preserve a complete local battle loop: start match, control a fighter,
resolve attacks, determine a winner, and restart cleanly. If a change does not support that
loop, it is out of scope for MVP.

### II. Deterministic Combat Rules
Damage, hit detection, knockback, timers, and state transitions must be deterministic from the
same inputs. Randomness is allowed only when explicit, bounded, and testable.

### III. Test the Game Loop
Any combat, movement, or state-machine change must include automated tests for the affected
behavior and at least one regression test for match flow or victory handling.

### IV. Keep the Scope Small
Prefer the simplest solution that satisfies the current spec. No online play, matchmaking,
persistence, or complex tooling unless explicitly required by the approved feature.

### V. Original or Licensed Assets Only
Sprites, audio, names, and other content must be original or properly licensed. Placeholder
art is acceptable during development, but final assets must be clear and legal to use.

## Scope & Technical Constraints

- The game is 2D and centered on one-on-one fighting.
- Changes should fit the current engine and project structure; avoid framework churn without
  a feature-level justification.
- Build and runtime behavior should remain local-first and offline unless a feature spec
  explicitly says otherwise.
- Content must stay consistent with the game's intended Pokémon-inspired theme while respecting
  asset and IP constraints.

## Workflow & Quality Gates

- Every feature spec must state how the change is independently testable.
- Plan documents must include a constitution check before implementation.
- Gameplay changes need at least one automated test that exercises the affected battle flow.
- Bugs and balance fixes should add or update a regression test when practical.
- Pull requests or reviews must call out any intentional deviation from these rules.

## Governance

This constitution overrides other project guidance when they conflict. Amendments require a
documented proposal, a version bump, and updates to dependent templates or docs that rely on the
changed rule. Versioning follows semantic versioning: PATCH for wording or clarifications,
MINOR for added or expanded principles or sections, and MAJOR for backwards-incompatible
removals or rule changes. Compliance is checked during planning, before merge, and again when
gameplay changes touch battle flow, state transitions, or content assets.

**Version**: 1.0.0 | **Ratified**: 2026-03-30 | **Last Amended**: 2026-03-30
