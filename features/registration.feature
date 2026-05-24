Feature: User registration

  As a new visitor
  I want to create an account
  So that I can use the site as a registered user

  Background:
    Given I am on the home page

  Scenario: New user can register with valid details
    When I open the signup form
    And I submit my signup name and email
    And I complete my account details
    Then my account is created
    And I am logged in
