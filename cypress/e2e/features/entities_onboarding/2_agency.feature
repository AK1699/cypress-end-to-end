Feature: Onboard Agency Entity
    As Onboarding user, I want to onboard the Agencies mapped to the funders and load them into the raise portal

    Background: The user logged into raise portal and navigated to the agency list page
        Given login as Onboarding agent Maker user
        Then navigate to agency list page

    # @E2E
    # Scenario Outline: Onboard an agency mapped to the <fundingModel> funder without any rejections
    #     Given agency details
    #     Then fill the mandatory fields in agency setup form and insert
    #     Then fill the mandatory fields within each tabs of agency pre-vetting details
    #     And Submit the agency pre-vetting details for approval
    #     Then login as Compliance Manager user
    #     And navigate to agency list page
    #     And Approve the agency pre-vetting details
    #     Then login as Onboarding agent Maker user
    #     And navigate to agency list page
    #     Then fill all the mandatory fields within each tabs of agency compliance details
    #     And Submit the agency compliance details for approval
    #     Then login as Compliance approver user
    #     And navigate to agency list page
    #     Then Approve the agency compliance details
    #     Then login as Onboarding agent Maker user
    #     And navigate to agency list page
    #     Then fill the mandatory fields within each tabs of agency allocation details and map with "<fundingModel>" funder
    #     And Request credit limit for the agency
    #     Then login as Credit Risk Assistant user
    #     And navigate to agency list page
    #     Then Add the credit limit for agency
    #     And Submit the agency details for Onboarding
    #     Then login as Compliance Manager user
    #     And navigate to agency list page
    #     When the Onboarding agent approve the agency details for onboarding
    #     Then "<fundingModel>" funder mapped Agency is successfully onboarded
    #     @direct
    #     Examples:
    #         | fundingModel |
    #         | Direct       |
    #     @indirect
    #     Examples:
    #         | fundingModel |
    #         | Indirect     |

# @prevettingRejection
# Scenario: Onboard an agency with pre-vetting rejection
#     Given agency details
#     Then fill the mandatory fields in agency setup form and insert
#     * fill the mandatory fields within each tabs of agency pre-vetting details
#     And Submit the agency pre-vetting details for approval
#     Then login as Compliance Manager user
#     And navigate to agency list page
#     Then Reject and Revert the agency pre-vetting details
#     * login as Onboarding agent Maker user
#     And navigate to agency list page
#     * select the repective agency
#     * Submit the agency pre-vetting details for approval
#     Then login as Compliance Manager user
#     And navigate to agency list page
#     * Approve the agency pre-vetting details
#     Then login as Onboarding agent Maker user
#     And navigate to agency list page
#     Then fill all the mandatory fields within each tabs of agency compliance details
#     And Submit the agency compliance details for approval
#     Then login as Compliance approver user
#     And navigate to agency list page
#     Then Approve the agency compliance details
#     * login as Onboarding agent Maker user
#     And navigate to agency list page
#     Then fill the mandatory fields within each tabs of agency allocation details and map with funder
#     And Request credit limit for the agency
#     Then login as Credit Risk Assistant user
#     And navigate to agency list page
#     Then Add the credit limit for agency
#     And Submit the agency details for Onboarding
#     Then login as Compliance Manager user
#     And navigate to agency list page
#     When the Onboarding agent approve the agency details for onboarding
#     Then Agency is successfully onboarded

# @complianceRejection
# Scenario: Onboard an agency with compliance rejection
#     Given agency details
#     Then fill the mandatory fields in agency setup form and insert
#     * fill the mandatory fields within each tabs of agency pre-vetting details
#     And Submit the agency pre-vetting details for approval
#     Then login as Compliance Manager user
#     And navigate to agency list page
#     * Approve the agency pre-vetting details
#     Then login as Onboarding agent Maker user
#     And navigate to agency list page
#     Then fill all the mandatory fields within each tabs of agency compliance details
#     And Submit the agency compliance details for approval
#     Then login as Compliance approver user
#     And navigate to agency list page
#     Then Reject and Revert the agency compliance details
#     * login as Onboarding agent Maker user
#     And navigate to agency list page
#     * select the repective agency
#     * Submit the agency compliance details for approval
#     Then login as Compliance approver user
#     And navigate to agency list page
#     Then Approve the agency compliance details
#     Then login as Onboarding agent Maker user
#     And navigate to agency list page
#     Then fill the mandatory fields within each tabs of agency allocation details and map with funder
#     And Request credit limit for the agency
#     Then login as Credit Risk Assistant user
#     And navigate to agency list page
#     Then Add the credit limit for agency
#     And Submit the agency details for Onboarding
#     Then login as Compliance Manager user
#     And navigate to agency list page
#     When the Onboarding agent approve the agency details for onboarding
#     Then Agency is successfully onboarded

# # # @focus
# # Scenario: Onboard an agency with invalid data
# #     Given agency details
# #     Then fill the invalid brn number and invalid email address of the agency into the agency setup form
# #         | brn       | email              |
# #         | sc4567233 | dummy1221gmail.com |


@onboardRejection
Scenario: Onboard an agency with onboard rejection
    Given agency details
    Then fill the mandatory fields in agency setup form and insert
    Then fill the mandatory fields within each tabs of agency pre-vetting details
    And Submit the agency pre-vetting details for approval
    Then login as Compliance Manager user
    And navigate to agency list page
    And Approve the agency pre-vetting details
    Then login as Onboarding agent Maker user
    And navigate to agency list page
    Then fill all the mandatory fields within each tabs of agency compliance details
    And Submit the agency compliance details for approval
    Then login as Compliance approver user
    And navigate to agency list page
    Then Approve the agency compliance details
    Then login as Onboarding agent Maker user
    And navigate to agency list page
    Then fill the mandatory fields within each tabs of agency allocation details and map with funder
    And Request credit limit for the agency
    Then login as Credit Risk Assistant user
    And navigate to agency list page
    Then Add the credit limit for agency
    And Submit the agency details for Onboarding
    Then login as Compliance Manager user
    And navigate to agency list page
    Then Reject and Revert the agency onboarding details
    * login as Onboarding agent Maker user
    * navigate to agency list page
    * select the repective agency
    And Submit the agency pre-vetting details for approval
    Then login as Compliance Manager user
    And navigate to agency list page
    And Approve the agency pre-vetting details
    Then login as Onboarding agent Maker user
    And navigate to agency list page
    * select the repective agency
    *  Submit the agency compliance details for approval
    Then login as Compliance approver user
    And navigate to agency list page
    Then Approve the agency compliance details
    Then login as Onboarding agent Maker user
    And navigate to agency list page
    And Request credit limit for the agency
    Then login as Credit Risk Assistant user
    And navigate to agency list page
    And Submit the agency details for Onboarding
    Then login as Compliance Manager user
    And navigate to agency list page
    When the Onboarding agent approve the agency details for onboarding
    Then Agency is successfully onboarded

