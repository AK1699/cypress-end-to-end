Feature: Onboard Umbrella Company
    As a Onboarding user, I want to onboard the Umbrella Company


    Background: The user is logged into portal and navigated to the umbrella list page
        Given login as Onboarding agent Maker user
        Then navigate to the umbrella companies list page

    # @E2E
    # Scenario: Onboard an Umbrella company without any rejection
    #     Given umbrella company details
    #     Then fill the mandatory fields in the umbrella company setup form
    #     Then fill the mandatory fields within each tabs of umbrella prevetting
    #     And Bypass the review
    #     Then fill all the mandatory fields within each umbrella compliance detail
    #     And Submit the umbrella compliance for approval
    #     Then login as Compliance approver user
    #     And navigate to the umbrella companies list page
    #     * select the respective umbrella company
    #     Then Approve the umbrella compliance details
    #     * Umbrella company is successfully onboarded

    # @prevettingRejection
    # Scenario: Onboard an Umbrella company with Prevetting rejection
    #     Given umbrella company details
    #     Then fill the mandatory fields in the umbrella company setup form
    #     Then fill the mandatory fields within each tabs of umbrella prevetting
    #     And Submit the umbrella company prevetting details for review
    #     Then login as Compliance Manager user
    #     And navigate to the umbrella companies list page
    #     And select the respective umbrella company
    #     And Reject and Revert the review details
    #     Then login as Onboarding agent Maker user
    #     And navigate to the umbrella companies list page
    #     And select the respective umbrella company
    #     And Submit the umbrella company prevetting details for review
    #     Then login as Compliance Manager user
    #     And navigate to the umbrella companies list page
    #     And select the respective umbrella company
    #     And Approve the Review details of umbrella company
    #     Then login as Onboarding agent Maker user
    #     And navigate to the umbrella companies list page
    #     And select the respective umbrella company
    #     Then fill all the mandatory fields within each umbrella compliance detail
    #     And Submit the umbrella compliance for approval
    #     Then login as Compliance approver user
    #     And navigate to the umbrella companies list page
    #     * select the respective umbrella company
    #     Then Approve the umbrella compliance details
    #     * Umbrella company is successfully onboarded

    @complianceRejection
    Scenario: Onboard an Umbrella company with Compliance rejection
        Given umbrella company details
        Then fill the mandatory fields in the umbrella company setup form
        Then fill the mandatory fields within each tabs of umbrella prevetting
        And Submit the umbrella company prevetting details for review
        Then login as Compliance Manager user
        And navigate to the umbrella companies list page
        And select the respective umbrella company
        And Approve the Review details of umbrella company
        Then login as Onboarding agent Maker user
        And navigate to the umbrella companies list page
        And select the respective umbrella company
        Then fill all the mandatory fields within each umbrella compliance detail
        And Submit the umbrella compliance for approval
        Then login as Compliance approver user
        And navigate to the umbrella companies list page
        * select the respective umbrella company
        * Reject and Revert the Compliance details of umbrella company
        Then login as Onboarding agent Maker user
        And navigate to the umbrella companies list page
        * select the respective umbrella company
        * Submit the umbrella compliance for approval
        Then login as Compliance approver user
        And navigate to the umbrella companies list page
        * select the respective umbrella company
        Then Approve the umbrella compliance details
        * Umbrella company is successfully onboarded

    # @E2E
    # Scenario: Onboard an Umbrella company with invalid data
    #     Given umbrella company details
    #     Then fill the invalid brn and invalid email in the umbrella company setup form
    #         | brn      | email            |
    #         | sc342134 | dummy45gmail.com |