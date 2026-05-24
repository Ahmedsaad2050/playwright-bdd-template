Feature: Account management

  As a logged-in user
  I want to control my session and account
  So that I can leave or delete my data when I choose

  Background:
    Given I am on the home page

  Scenario: Logged-in user can log out
    Given I have a registered account
    When I open the signup form
    And I log in with my credentials
    And I log out
    Then I am logged out

  Scenario: Logged-in user can delete their account
    Given I have a registered account
    When I open the signup form
    And I log in with my credentials
    And I delete my account
    Then my account is deleted
