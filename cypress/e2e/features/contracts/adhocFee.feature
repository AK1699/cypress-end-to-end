Feature: Adhoc Fee
    As Payment Assistant, the user should able to create adhoc fee Invoice

    Background: The user is logged into the raise portal and navigated to the adhoc fee list page
        Given login as Payment Assistant user
        Then navigate to the adhoc fee list page


    @focus @E2E
    Scenario Outline: Create a Adhoc fee for <fundingModel> model of type <type>
        Given Adhoc fee contract details
        Then Select the currency for the adhoc fee
        * Select the adhoc fee type as "<type>"
        * Select the "<fundingModel>" model agency for "<type>" adhoc fee
        * fill the description in the adhoc fee form
        * fill the vat as input in the "<type>" adhoc fee form
        * Update the payment terms in the adhoc fee form
        And Submit the "<type>" adhoc fee for approval
        Then login as Payment Approver user
        And navigate to the adhoc fee list page
        And select the respective adhoc fee contract
        Then Approve the "<type>" adhoc fee contract
        Then Adhoc fee invoices for "<fundingModel>" model and for type "<type>" is generated
        Examples:
            | fundingModel | type            |
            | Direct       | Funder-Agency   |
            | Direct       | Provider-Agency |
            | Direct       | Agency-Provider |
            | Direct       | Agency-Funder   |
            | Indirect     | Funder-Agency   |
            | Indirect     | Provider-Agency |
            | Indirect     | Agency-Provider |
            | Indirect     | Agency-Funder   |

    @focus @E2E
    Scenario Outline: Create a Adhoc fee invoice with rejection and resubmission for <fundingModel> model of type <type>
        Given Adhoc fee contract details
        Then Select the currency for the adhoc fee
        * Select the adhoc fee type as "<type>"
        * Select the "<fundingModel>" model agency for "<type>" adhoc fee
        * fill the description in the adhoc fee form
        * fill the vat as input in the "<type>" adhoc fee form
        * Update the payment terms in the adhoc fee form
        And Submit the "<type>" adhoc fee for approval
        Then login as Payment Approver user
        And navigate to the adhoc fee list page
        And select the respective adhoc fee contract
        Then Reject the "<type>" adhoc fee contract
        Then login as Payment Assistant user
        And navigate to the adhoc fee list page
        And select the respective adhoc fee contract
        And Revert and Resubmit the "<type>" adhoc fee contract
        Then login as Payment Approver user
        And navigate to the adhoc fee list page
        And select the respective adhoc fee contract
        And Approve the "<type>" adhoc fee contract
        Then Adhoc fee invoices for the type "<type>" is generated
        Examples:
            | fundingModel | type            |
            | Direct       | Funder-Agency   |
            | Direct       | Provider-Agency |
            | Direct       | Agency-Provider |
            | Direct       | Agency-Funder   |
            | Indirect     | Funder-Agency   |
            | Indirect     | Provider-Agency |
            | Indirect     | Agency-Provider |
            | Indirect     | Agency-Funder   |