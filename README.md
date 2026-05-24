# playwright-bdd-template

Opinionated Playwright + Cucumber (BDD) end-to-end template with a strict Page Object Model.
Demo target: [automationexercise.com](https://automationexercise.com).

[![e2e](https://github.com/ahmedsaad2050/playwright-bdd-template/actions/workflows/e2e.yml/badge.svg)](https://github.com/ahmedsaad2050/playwright-bdd-template/actions/workflows/e2e.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](./tsconfig.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## Stack

| Layer       | Choice                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------- |
| Test runner | [Playwright](https://playwright.dev)                                                        |
| BDD layer   | [playwright-bdd](https://github.com/vitalets/playwright-bdd) (Cucumber for Playwright)      |
| Language    | TypeScript with `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`        |
| Data        | [@faker-js/faker](https://fakerjs.dev/)                                                     |
| Lint        | ESLint flat config with `typescript-eslint` type-checked rules + `eslint-plugin-playwright` |
| Format      | Prettier                                                                                    |
| CI          | GitHub Actions                                                                              |

---

## Quick start

```bash
git clone https://github.com/ahmedsaad2050/playwright-bdd-template.git
cd playwright-bdd-template
npm install
npx playwright install chromium
npm test
```

`npm test` runs `bddgen` (generates Playwright specs from `.feature` files) and then `playwright test`.

After a run, open the HTML report:

```bash
npm run report
```

---

## Project structure

```
playwright-bdd-template/
├── features/                       # Gherkin .feature files
│   ├── account.feature
│   ├── login.feature
│   └── registration.feature
├── steps/                          # Step definitions — only call page-object methods
│   ├── account.steps.ts
│   ├── common.steps.ts
│   ├── login.steps.ts
│   └── registration.steps.ts
├── src/
│   ├── pages/                      # Page Object Model (strict)
│   │   ├── BasePage.ts             # abstract — path + goto + URL assertion
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── SignupPage.ts
│   │   ├── ConfirmationPage.ts     # abstract intermediate
│   │   ├── AccountCreatedPage.ts
│   │   ├── AccountDeletedPage.ts
│   │   └── index.ts
│   ├── fixtures/
│   │   └── test.ts                 # custom test that wires pages + user data
│   └── support/data/
│       └── userFactory.ts          # faker-based realistic test users
├── .github/workflows/e2e.yml       # CI: lint → e2e
├── playwright.config.ts
└── tsconfig.json
```

`bddgen` generates Playwright spec files into `.features-gen/` at run time. That directory is git-ignored.

---

## POM contract

The rules this template enforces — and why each one is there:

1. **Every page class extends `BasePage`** and declares a `protected readonly path`.
   `BasePage` owns `goto()` and `expectLoaded()` so subclasses never reimplement navigation.

2. **Locators are `private readonly` fields on the page class.**
   Step files never construct locators or use raw selectors. If a selector needs to change,
   exactly one file changes.

3. **Public methods are action verbs.**
   `loginPage.login(email, password)` — not `loginPage.fillEmail()` + `loginPage.fillPassword()` +
   `loginPage.clickSubmit()`. Granular helpers belong inside the page class, not in step files.

4. **Self-verification methods belong on the page.**
   `homePage.expectLoggedIn(username)` keeps the assertion close to the locators it depends on.
   Step files stay readable and free of assertion plumbing.

5. **Shared structure goes into intermediate abstract classes.**
   `ConfirmationPage` is shared by `AccountCreatedPage` and `AccountDeletedPage`. Concrete
   subclasses only declare `path` — DOM contract is inherited.

---

## BDD conventions

- One feature per real user-facing capability (`registration`, `login`, `account`).
- `Background` for shared scenario setup (e.g. "I am on the home page").
- The `user` fixture is created once per scenario and reused across steps, so a registration
  step and a later login step talk about the same person without sharing globals.
- Step definitions never contain selectors, raw `expect(page.locator(...))`, or business logic —
  only calls to page-object methods.

---

## Available scripts

| Script                 | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm test`             | Generate BDD specs, then run all tests |
| `npm run test:headed`  | Same, with browser visible             |
| `npm run test:ui`      | Open the Playwright UI mode            |
| `npm run report`       | Open the HTML report from the last run |
| `npm run bdd:gen`      | Regenerate specs without running       |
| `npm run lint`         | ESLint (type-checked rules)            |
| `npm run lint:fix`     | ESLint with autofix                    |
| `npm run format`       | Prettier write                         |
| `npm run format:check` | Prettier check (used in CI)            |
| `npm run typecheck`    | `tsc --noEmit`                         |

---

## CI

`.github/workflows/e2e.yml` runs on every push and PR to `main`:

1. **Lint stage** — format check + ESLint + typecheck
2. **e2e stage** (gated on lint) — Playwright browsers cached by version, BDD tests run, HTML report uploaded as an artifact

Concurrency cancels stale runs on the same branch so a fresh push supersedes a slow one.

---

## Adapting this to your own app

1. Replace `baseURL` in `playwright.config.ts`.
2. Drop the existing page classes under `src/pages/` and write your own — each extends `BasePage`,
   declares a `path`, exposes locators as `private readonly` fields, and offers action verbs.
3. Add the new pages to the fixture in `src/fixtures/test.ts`.
4. Replace the `.feature` files with scenarios that describe your real user flows.
5. Write step definitions that only call page-object methods.

The folder layout, fixture pattern, lint rules, CI, and POM contract stay the same.

---

## License

MIT — see [LICENSE](./LICENSE).
