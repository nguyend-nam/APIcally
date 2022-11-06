# Version Control

When working on the project, please observe the following workflow:

## Naming branch convention

- A branch type shares the same name set with the
  [commit type](../commitlint.config.js) as it reveals the main action that the
  branch aims to make. A branch name should start with a type following by a
  slash (`/`). For example, `feat/...`, `fix/...`, `chore/...`, `hotfix/...`,
  ect.
- Branch names should follow the pattern of
  `<issue type>/<JIRA-CARD-ID>-<brief-description>` for example
  `feat/DMV-535-some-cool-feature`.
- Typically, `develop` is the base branch for all branches, the exception being
  a hotfix on production code. In this case, `master` is the base and the hotfix
  should be back merged when deployed.
- To merge back into the base branch, raise a pull request aginst this branch.
  All checks should pass and at least one approver is necessary to merge into
  base.
- Keep your branch up to date at all times with the base branch by `rebase`
  only, to keep the tree clean.
- On merging to base, use `squash and merge`, to keep the tree clean and to make
  rolling back changes easy.

## Naming commit convention

Commit conventions allow to add more semantic meaning to your git history. We
use `@commitlint` to make sure our commits always follow the pattern:

```sh
type(scope): subject [reference?]
```

- `type`: is the context of the commit. One of `feat`, `fix`, `docs`, `style`,
  `refactor`, `perf`, `test`, `chore`, `revert`, `ci`, `upgrade` or `build`.
- `scope`: is the part in the repo that the commit affects. One of `ui`, `auth`,
  `profile`, `customer`, `feed`, `order`, `product`, `storybook`, `all`.
- `reference`: jira ticket ID reference. In the project, it should be
  `[DMV-535]`.

Example of a valid commit:

- `feat(profile): implement main page [DMV-535]`
- `fix(ui): wrong validation on password form [DMV-535][DMV-536]`

## Read on:

- [Home](../README.md)
- [Code style](./CODE_STYLE.md)
- [Getting started](./GETTING_STARTED.md)
- [Tech Ecosystem](./TECH_ECOSYSTEM.md)
- [Editor](./EDITOR.md)
- [Writting test](./WRITING_TEST.md)
