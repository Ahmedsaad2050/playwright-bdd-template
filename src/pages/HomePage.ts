import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * Site landing page. Owns the top navigation and authenticated-state checks.
 */
export class HomePage extends BasePage {
  protected readonly path = '/';

  private readonly signupLoginLink = this.page.locator('.shop-menu a[href="/login"]');
  private readonly logoutLink = this.page.locator('.shop-menu a[href="/logout"]');
  private readonly deleteAccountLink = this.page.locator('.shop-menu a[href="/delete_account"]');
  private readonly loggedInIndicator = this.page
    .locator('.shop-menu a')
    .filter({ hasText: 'Logged in as' });
  private readonly consentButton = this.page.getByRole('button', {
    name: /consent|accept|agree/i,
  });

  async dismissConsentIfPresent(): Promise<void> {
    const visible = await this.consentButton.isVisible().catch(() => false);
    if (visible) {
      await this.consentButton.first().click();
    }
  }

  async openSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async expectLoggedIn(username: string): Promise<void> {
    await expect(this.loggedInIndicator).toBeVisible();
    await expect(this.loggedInIndicator).toContainText(username);
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.signupLoginLink).toBeVisible();
    await expect(this.loggedInIndicator).toHaveCount(0);
  }
}
