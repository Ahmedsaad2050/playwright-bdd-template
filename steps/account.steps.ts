import { When, Then } from '../src/fixtures/test.js';

When('I log out', async ({ homePage }) => {
  await homePage.logout();
});

Then('I am logged out', async ({ homePage }) => {
  await homePage.expectLoggedOut();
});

When('I delete my account', async ({ homePage }) => {
  await homePage.deleteAccount();
});

Then('my account is deleted', async ({ accountDeletedPage }) => {
  await accountDeletedPage.expectHeading('Account Deleted!');
  await accountDeletedPage.continue();
});
