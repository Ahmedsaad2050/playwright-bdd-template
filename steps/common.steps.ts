import { Given, When } from '../src/fixtures/test.js';

Given('I am on the home page', async ({ homePage }) => {
  await homePage.goto();
  await homePage.dismissConsentIfPresent();
});

When('I open the signup form', async ({ homePage }) => {
  await homePage.openSignupLogin();
});

/**
 * Registers the scenario's `user` via the UI, then logs them out and
 * returns to the home page. Leaves the browser logged-out so subsequent
 * steps can drive the actual login flow being tested.
 */
Given(
  'I have a registered account',
  async ({ homePage, loginPage, signupPage, accountCreatedPage, user }) => {
    await homePage.openSignupLogin();
    await loginPage.startSignup(user.name, user.email);
    await signupPage.fillAccountDetails(user.accountDetails);
    await signupPage.submit();
    await accountCreatedPage.expectHeading('Account Created!');
    await accountCreatedPage.continue();
    await homePage.expectLoggedIn(user.name);
    await homePage.logout();
    await homePage.goto();
    await homePage.dismissConsentIfPresent();
  },
);
