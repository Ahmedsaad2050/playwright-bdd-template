import { When, Then } from '../src/fixtures/test.js';

When('I log in with my credentials', async ({ loginPage, user }) => {
  await loginPage.login(user.email, user.password);
});

When('I log in with invalid credentials', async ({ loginPage }) => {
  await loginPage.login('unregistered.user@example.test', 'definitely-wrong-password');
});

Then('I see the login error {string}', async ({ loginPage }, message: string) => {
  await loginPage.expectLoginError(message);
});
