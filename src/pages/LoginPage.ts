import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * Combined login + signup-intent page at `/login`.
 *
 * The page exposes two independent forms:
 *  - "Login to your account"  — existing-user authentication
 *  - "New User Signup!"       — collects name + email, then continues to /signup
 */
export class LoginPage extends BasePage {
  protected readonly path = '/login';

  // Signup intent form
  private readonly signupNameInput = this.page.locator('input[data-qa="signup-name"]');
  private readonly signupEmailInput = this.page.locator('input[data-qa="signup-email"]');
  private readonly signupSubmitButton = this.page.locator('button[data-qa="signup-button"]');
  private readonly signupError = this.page.locator('form[action="/signup"] p');

  // Login form
  private readonly loginEmailInput = this.page.locator('input[data-qa="login-email"]');
  private readonly loginPasswordInput = this.page.locator('input[data-qa="login-password"]');
  private readonly loginSubmitButton = this.page.locator('button[data-qa="login-button"]');
  private readonly loginError = this.page.locator('form[action="/login"] p');

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupSubmitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.loginError).toHaveText(message);
  }

  async expectSignupError(message: string): Promise<void> {
    await expect(this.signupError).toHaveText(message);
  }
}
