import { test as base, createBdd } from 'playwright-bdd';
import {
  HomePage,
  LoginPage,
  SignupPage,
  AccountCreatedPage,
  AccountDeletedPage,
} from '../pages/index.js';
import { UserFactory, type NewUser } from '../support/data/userFactory.js';

/**
 * Page-object and data fixtures available to every BDD step.
 *
 * - Page fixtures are constructed lazily per test and share the test `page`.
 * - `user` is generated once per scenario and reused across steps so that
 *   "Given I register" and "When I log in" use the same credentials.
 */
export interface BddFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
  user: NewUser;
}

export const test = base.extend<BddFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },
  user: async ({}, use) => {
    await use(UserFactory.newUser());
  },
});

export const { Given, When, Then, Step } = createBdd(test);
