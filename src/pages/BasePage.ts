import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Abstract base for all page objects.
 *
 * Subclasses must declare:
 *  - `path`     — the relative URL of the page (used by `goto`)
 *  - locators   — as `private readonly` fields built from `this.page`
 *  - actions    — as `public async` methods that wrap user interactions
 *
 * Step definitions and tests interact only through these methods,
 * never with raw selectors.
 */
export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  /** Navigate to this page using its relative path against the configured baseURL. */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Assert the browser is on this page by matching the path. */
  async expectLoaded(): Promise<void> {
    const escaped = this.path.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(`${escaped}/?$`));
  }
}
