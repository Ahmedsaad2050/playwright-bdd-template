import { ConfirmationPage } from './ConfirmationPage.js';

/** Shown immediately after a successful account creation. */
export class AccountCreatedPage extends ConfirmationPage {
  protected readonly path = '/account_created';
}
