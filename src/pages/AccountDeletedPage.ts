import { ConfirmationPage } from './ConfirmationPage.js';

/** Shown immediately after deleting the current user's account. */
export class AccountDeletedPage extends ConfirmationPage {
  protected readonly path = '/account_deleted';
}
