import { faker } from '@faker-js/faker';
import type { AccountDetails, Title } from '../../pages/SignupPage.js';

/**
 * Countries accepted by the demo site's signup form.
 * Listed in the same order they appear in the dropdown.
 */
export const SUPPORTED_COUNTRIES = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
] as const;

export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];

export interface NewUser {
  name: string;
  email: string;
  password: string;
  accountDetails: AccountDetails;
}

/**
 * Generates random-but-valid test users via faker.
 *
 * Callers can override any top-level field; nested account details are
 * generated to match the constraints of automationexercise.com's signup form
 * (supported countries, valid month range, ASCII password).
 */
export class UserFactory {
  static newUser(overrides: Partial<NewUser> = {}): NewUser {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const password = UserFactory.buildPassword();

    const accountDetails: AccountDetails = {
      title: faker.helpers.arrayElement<Title>(['Mr', 'Mrs']),
      password,
      dob: {
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        month: faker.number.int({ min: 1, max: 12 }).toString(),
        year: faker.number.int({ min: 1970, max: 2005 }).toString(),
      },
      subscribeNewsletter: true,
      acceptOffers: true,
      address: {
        firstName,
        lastName,
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: faker.helpers.arrayElement(SUPPORTED_COUNTRIES),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode('#####'),
        mobile: faker.phone.number({ style: 'national' }).replace(/\D/g, ''),
      },
    };

    return {
      name,
      email,
      password,
      accountDetails,
      ...overrides,
    };
  }

  /**
   * Build a password that satisfies common e-commerce policies:
   * 12+ chars, mixed case, at least one digit, one symbol.
   */
  private static buildPassword(): string {
    const base = faker.internet.password({ length: 10, memorable: false });
    return `${base}Aa1!`;
  }
}
