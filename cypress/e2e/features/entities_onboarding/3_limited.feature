Feature: Onboard Limited Company
     As a Onboarding user, I want to onboard the Limited Company


     Background: The user logged into raise portal and navigated to the limited company list page
          Given login as Onboarding agent Maker user
          Then navigate to the limited company list page

     # @E2E
     # Scenario: Onboard the limited company without any rejections
     #      Given limited company details
     #      Then fill the mandatory fields in the limited company setup form
     #      * insert the limited company address
     #      And enable the toggle if vat applicable for limited company
     #      * insert the limited company bank account
     #      * update the basic information for the limited company
     #      * insert the required kyc documents for the limited company
     #      Then Submit the limited company details for onboarding
     #      * login as Onboarding agent Checker user
     #      And navigate to the limited company list page
     #      * select the respective limited company
     #      Then Approve the onboarding details of the limited company
     #      And the limited company is onboarded successfully

     @onboardingRejection
     Scenario: Onboard the limited company with Onboarding details rejected
          Given limited company details
          Then fill the mandatory fields in the limited company setup form
          * insert the limited company address
          And enable the toggle if vat applicable for limited company
          * insert the limited company bank account
          * update the basic information for the limited company
          * insert the required kyc documents for the limited company
          Then Submit the limited company details for onboarding
          * login as Onboarding agent Checker user
          And navigate to the limited company list page
          * select the respective limited company
          * Reject and Revert the limited company details
          Then login as Onboarding agent Maker user
          And navigate to the limited company list page
          * select the respective limited company
          * Submit the limited company details for onboarding
          Then login as Onboarding agent Checker user
          And navigate to the limited company list page
          * select the respective limited company
          * Approve the onboarding details of the limited company
          And the limited company is onboarded successfully

     # @E2E
     # Scenario: Onboard the limited company with invalid data
     #      Given limited company details
     #      Then fill the invalid brn number and invalid email address in the limited company setup form
     #           | brn      | email            |
     #           | sc454234 | dummy45gmail.com |