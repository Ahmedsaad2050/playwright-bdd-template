import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * Shared parent for short-lived confirmation pages such as `/account_created`
 * and `/account_deleted`. Both pages share the same DOM contract:
 *  - `h2[data-qa]` heading with the result text
 *  - `a[data-qa="continue-button"]` to return to a logged-in home state
 *
 * Subclasses only declare `path`.
 */
export abstract class ConfirmationPage extends BasePage {
  private readonly heading = this.page.locator('h2[data-qa]');
  private readonly continueButton = this.page.locator('a[data-qa="continue-button"]');

  async expectHeading(text: string): Promise<void> {
    await expect(this.heading).toHaveText(text);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}
