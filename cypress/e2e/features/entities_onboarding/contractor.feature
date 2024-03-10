Feature: Onboard Contractor Entity
    As Onboarding agent user, I want to onboard the contractor having done all compliance checks


    Background: The user is logged into the raise portal and navigate to the contractor list page
        Given login as Onboarding agent Maker user
        Then navigate to contractor list page

    @E2E
    Scenario Outline: Onboard the <paymentType> contractor maped to the <fundingModel> model agency
        Given contractor details for "<paymentType>" contractor
        Then fill the mandatory fields in the "<paymentType>" contractor setup form
        * Update the payment type as "<paymentType>" in the basic info
        And insert the mandatory documents of the "<paymentType>" contractor in the basic info
        Then update the "<paymentType>" company details
        * Map the "<fundingModel>" agency to the "<paymentType>" contractor
        And Onboard the "<paymentType>" contractor maped with "<fundingModel>" agency
        # Then login as Onboarding agent Maker user
        # And navigate to contractor list page
        # * Select the respective contractor
        # Then Insert the contractor terms of business details
        @direct
        Examples:
            | paymentType | fundingModel |
            # | Self Employed | Direct       |
            | Limited     | Direct       |
            | Umbrella    | Direct       |
        @indirect
        Examples:
            | paymentType | fundingModel |
            # | Self Employed | Indirect     |
            | PSC/Limited     | Direct       |
            | PSC/Limited     | Indirect     |
            | Umbrella    | Direct       |
            | Umbrella    | Indirect     |

# @E2E
# Scenario: Onbaord the contractor with invalid data
#     Given contractor details for "<paymentType>" contractor
#     Then fill the invalid email id in the contractor setup form
#         | email            |
#         | dummy45gmail.com |