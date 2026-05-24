import { When, Then } from '../src/fixtures/test.js';

When('I submit my signup name and email', async ({ loginPage, user }) => {
  await loginPage.startSignup(user.name, user.email);
});

When('I complete my account details', async ({ signupPage, user }) => {
  await signupPage.fillAccountDetails(user.accountDetails);
  await signupPage.submit();
});

Then('my account is created', async ({ accountCreatedPage }) => {
  await accountCreatedPage.expectHeading('Account Created!');
  await accountCreatedPage.continue();
});

Then('I am logged in', async ({ homePage, user }) => {
  await homePage.expectLoggedIn(user.name);
});
