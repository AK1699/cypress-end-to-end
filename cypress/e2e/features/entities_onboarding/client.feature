Feature: Onboard Client Entity
   As a Onboarding user, I want to onboard the clients mapped to correct agency and load them into the Raise portal

   Background: The user logged into raise portal and navigated to the client list page
      Given login as Onboarding agent Maker user
      Then navigate to the client list page

# @complianceRejection
# Scenario: Onboard a client with Compliance rejection
#    Given client details
#    Then fill the mandatory fields in the client setup form
#    And fill all the mandatory fields within each tabs of client Credit Limit Request details
#    And Request credit limit for client
#    Then login as Credit Risk Assistant user
#    And navigate to the client list page
#    * select the respective client
#    * Add the credit limit for client
#    * Approve the client credit limit
#    Then login as Onboarding agent Maker user
#    And navigate to the client list page
#    * select the respective client
#    Then fill all the mandatory fields within each tabs of client compliance detail
#    And Submit the client compliance details for approval
#    Then login as Compliance approver user
#    And navigate to the client list page
#    * select the respective client
#    Then Reject and Revert client compliance details
#    And login as Onboarding agent Maker user
#    * navigate to the client list page
#    * select the respective client
#    * Submit the client compliance details for approval
#    Then login as Compliance approver user
#    And navigate to the client list page
#    * select the respective client
#    Then Approve the client compliance details
#    And Client is Successfully Onboarded into the platform

@creditLimitrejection
Scenario: Onboard a client with Credit limit rejection
   Given client details
   Then fill the mandatory fields in the client setup form
   And fill all the mandatory fields within each tabs of client Credit Limit Request details
   And Request credit limit for client
   Then login as Credit Risk Assistant user
   And navigate to the client list page
   * select the respective client
   * Add the credit limit for client
   * Reject and Revert client credit limit
   Then login as Onboarding agent Maker user
   And navigate to the client list page
   * select the respective client
   * Request credit limit for client
   Then login as Credit Risk Assistant user
   And navigate to the client list page
   * select the respective client
   Then Update with new client credit limit
      | creditLimit |
      | 50000       |
   * Approve the client credit limit
   Then login as Onboarding agent Maker user
   And navigate to the client list page
   * select the respective client
   Then fill all the mandatory fields within each tabs of client compliance detail
   And Submit the client compliance details for approval
   Then login as Compliance approver user
   And navigate to the client list page
   * select the respective client
   Then Approve the client compliance details
   And Client is Successfully Onboarded into the platform

# @E2E
# Scenario Outline: Onboard a client mapped to the <fundingModel> method agency without any rejections
#    Given client details
#    Then fill the mandatory fields in the client setup form
#    And fill all the mandatory fields within each tabs of client Credit Limit Request details and also map the "<fundingModel>" Agency
#    And Request credit limit for client
#    Then login as Credit Risk Assistant user
#    And navigate to the client list page
#    * select the respective client
#    * Add the credit limit for client
#    * Approve the client credit limit
#    Then login as Onboarding agent Maker user
#    And navigate to the client list page
#    * select the respective client
#    Then fill all the mandatory fields within each tabs of client compliance detail
#    And Submit the client compliance details for approval
#    Then login as Compliance approver user
#    And navigate to the client list page
#    * select the respective client
#    Then Approve the client compliance details
#    And "<fundingModel>" model Agency mapped Client is successfully onboarded
# @direct
# Examples:
#    | fundingModel |
#    | Direct       |
#    @indirect
#    Examples:
#       | fundingModel |
#       | Indirect     |

#  @E2E
# Scenario: Onboard a client with invalid data
#    Given client details
#    Then fill the invalid brn and invalid email address into the client setup form
#       | brn      | email            |
#       | sc456245 | dummy45gmail.com |
