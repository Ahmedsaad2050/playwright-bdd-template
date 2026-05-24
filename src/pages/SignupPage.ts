import { BasePage } from './BasePage.js';

export type Title = 'Mr' | 'Mrs';

export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface AddressDetails {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}

export interface AccountDetails {
  title: Title;
  password: string;
  dob: DateOfBirth;
  subscribeNewsletter: boolean;
  acceptOffers: boolean;
  address: AddressDetails;
}

/**
 * Full account registration form at `/signup`.
 *
 * Reached from `LoginPage.startSignup(name, email)` — name and email
 * are pre-filled on arrival.
 */
export class SignupPage extends BasePage {
  protected readonly path = '/signup';

  private readonly titleMrRadio = this.page.locator('input#id_gender1');
  private readonly titleMrsRadio = this.page.locator('input#id_gender2');
  private readonly passwordInput = this.page.locator('input[data-qa="password"]');
  private readonly daysSelect = this.page.locator('select[data-qa="days"]');
  private readonly monthsSelect = this.page.locator('select[data-qa="months"]');
  private readonly yearsSelect = this.page.locator('select[data-qa="years"]');
  private readonly newsletterCheckbox = this.page.locator('input#newsletter');
  private readonly optinCheckbox = this.page.locator('input#optin');
  private readonly firstNameInput = this.page.locator('input[data-qa="first_name"]');
  private readonly lastNameInput = this.page.locator('input[data-qa="last_name"]');
  private readonly companyInput = this.page.locator('input[data-qa="company"]');
  private readonly addressInput = this.page.locator('input[data-qa="address"]');
  private readonly address2Input = this.page.locator('input[data-qa="address2"]');
  private readonly countrySelect = this.page.locator('select[data-qa="country"]');
  private readonly stateInput = this.page.locator('input[data-qa="state"]');
  private readonly cityInput = this.page.locator('input[data-qa="city"]');
  private readonly zipcodeInput = this.page.locator('input[data-qa="zipcode"]');
  private readonly mobileInput = this.page.locator('input[data-qa="mobile_number"]');
  private readonly createAccountButton = this.page.locator('button[data-qa="create-account"]');

  async fillAccountDetails(details: AccountDetails): Promise<void> {
    await this.selectTitle(details.title);
    await this.passwordInput.fill(details.password);
    await this.daysSelect.selectOption(details.dob.day);
    await this.monthsSelect.selectOption(details.dob.month);
    await this.yearsSelect.selectOption(details.dob.year);
    if (details.subscribeNewsletter) {
      await this.newsletterCheckbox.check();
    }
    if (details.acceptOffers) {
      await this.optinCheckbox.check();
    }
    await this.fillAddress(details.address);
  }

  async submit(): Promise<void> {
    await this.createAccountButton.click();
  }

  private async selectTitle(title: Title): Promise<void> {
    const radio = title === 'Mr' ? this.titleMrRadio : this.titleMrsRadio;
    await radio.check();
  }

  private async fillAddress(address: AddressDetails): Promise<void> {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    if (address.company) {
      await this.companyInput.fill(address.company);
    }
    await this.addressInput.fill(address.address);
    if (address.address2) {
      await this.address2Input.fill(address.address2);
    }
    await this.countrySelect.selectOption(address.country);
    await this.stateInput.fill(address.state);
    await this.cityInput.fill(address.city);
    await this.zipcodeInput.fill(address.zipcode);
    await this.mobileInput.fill(address.mobile);
  }
}
