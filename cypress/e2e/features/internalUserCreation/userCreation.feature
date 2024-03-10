Feature: InternalUserCreation
    As User Management Role, the user should able to create internal users
Scenario: Create Internal Users
  Given login as User Management role
  Then navigate to the provider list page
  Then navigate to the users tab and add the internal users

