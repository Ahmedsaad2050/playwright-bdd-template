Feature: User login

  As a registered user
  I want to sign in
  So that I can access my account

  Background:
    Given I am on the home page

  Scenario: Registered user can log in with valid credentials
    Given I have a registered account
    When I open the signup form
    And I log in with my credentials
    Then I am logged in

  Scenario: Login fails with incorrect credentials
    When I open the signup form
    And I log in with invalid credentials
    Then I see the login error "Your email or password is incorrect!"
