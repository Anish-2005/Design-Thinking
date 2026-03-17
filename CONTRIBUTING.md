# Contributing to Design Thinking Lab

Thanks for contributing. This guide keeps changes consistent, reviewable, and easy to merge.

## Ways to Contribute

- Report bugs or content issues
- Improve UI, accessibility, or performance
- Refine copy, documentation, or case study clarity
- Fix lint/build issues and improve maintainability

## Development Setup

```bash
git clone https://github.com/Anish-2005/Design-Thinking.git
cd Design-Thinking
npm install
npm run dev
```

## Branch and Commit Workflow

1. Create a focused branch from `main`.
2. Keep each pull request scoped to one change set.
3. Use clear commit messages in imperative form.
4. Rebase or merge latest `main` before opening the PR.

Example branch names:

- `feat/hero-section-copy-refresh`
- `fix/mobile-menu-scroll-lock`
- `docs/readme-structure-update`

## Coding Standards

- Follow the existing React functional-component style.
- Keep component concerns localized (`src/components`, `src/data`, `src/hooks`).
- Prefer small, reusable components over monolithic updates.
- Preserve accessibility attributes (`aria-*`, keyboard behavior, skip links).

## Validation Before PR

Run these checks locally:

```bash
npm run lint
npm run build
```

If your change affects UX behavior, include:

- What changed
- Why it changed
- How you tested it (desktop/mobile, keyboard navigation, etc.)

## Pull Request Checklist

- [ ] PR title and description clearly explain the change
- [ ] Scope is focused and does not include unrelated edits
- [ ] Lint and build pass locally
- [ ] Screenshots or screen recordings attached for UI changes
- [ ] Documentation updated if behavior or setup changed

## Reporting Issues

When opening an issue, include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Environment details (OS, browser, Node version)

Thanks for helping improve Design Thinking Lab.
