Feature: Onboard Funder Entity
    As a financial manager user, I want to onboard the funders based on their funding model into the Raise portal

    Background: The user is logged into portal and navigated to the funder list page
        Given login as Financial Management user
        Then navigate to the Funder list page

    @E2E
    Scenario Outline: The Financial management user should be able to onboard the <fundingModel> funder with valid information
        Given funder details
        Then fill the mandatory fields in funder setup form
        Then Enable the toggle if VAT applicable for the funder
        Then Insert the address for the funder
        Then Insert the bank account for the funder
        Then Select the "<fundingModel>" funding model for the funder
        Then Add the funder users
        Then Add support staff user for the funder
        Then Funder is Onboarded successfully
        @direct
        Examples:
            | fundingModel |
            | Direct       |
        @indirect
        Examples:
            | fundingModel |
            | Indirect     |

    # Scenario: Verify whether the Financial management user is able to onboard the funder with Invalid data
    #     Given funder details
    #     Then fill the invalid brn number and the invalid email address into funder setup form
    #         | brn      | emailAddress     |
    #         | sc324231 | dummy12gmail.com |