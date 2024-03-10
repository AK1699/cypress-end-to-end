Feature: Purchase Ledger
    As Payment Assistant user, able to create a purchase ledger contract


    Background: The user is logged into the raise portal and navigated to the adhoc fee list page
        Given login as Payment Assistant user
        Then navigate to the purchase ledger list page

    # @focus @E2E
    # Scenario Outline: Create a purchase ledger contract for <fundingModel> model entities without rejection
    #     Given Purchase ledger contract details
    #     Then Select the currency in the purchase ledger contract
    #     * fill the description in the purchase ledger contract
    #     * Select the "<fundingModel>" model agency in the purchase ledger contract
    #     * Select the "<fundingModel>" model client in the purchase ledger contract
    #     * fill the Raised date in the purchase ledger contract
    #     * fill the amount in the purchase ledger contract
    #     * Enable the fee Invoice toggle for the "<fundingModel>" model purchase ledger contract if required
    #     And Update the agency payment terms in the purchase ledger contract
    #     * Update the client payment terms in the purchase ledger contract
    #     * Update the funder details in the purchase ledger contract
    #     * Update the purchase order number in the purchase ledger contract
    #     Then Submit the purchase ledger contract for approval
    #     Then login as Payment Approver user
    #     And navigate to the purchase ledger list page
    #     * Select the respective purchase ledger contract
    #     Then Approve the purchase ledger contract
    #     And Purchase ledger invoices for "<fundingModel>" model will be generated
    #     Examples:
    #         | fundingModel |
    #         | Direct       |
    #         | Indirect     |

    @focus @E2E
    Scenario Outline: Create a purchase ledger contract for <fundingModel> model entities with rejection and resubmission
        Given Purchase ledger contract details
        Then Select the currency in the purchase ledger contract
        * fill the description in the purchase ledger contract
        * Select the "<fundingModel>" model agency in the purchase ledger contract
        * Select the "<fundingModel>" model client in the purchase ledger contract
        * fill the Raised date in the purchase ledger contract
        * fill the amount in the purchase ledger contract
        * Enable the fee Invoice toggle for the "<fundingModel>" model purchase ledger contract if required
        And Update the agency payment terms in the purchase ledger contract
        * Update the client payment terms in the purchase ledger contract
        * Update the purchase order number in the purchase ledger contract
        * Update the funder details in the purchase ledger contract
        Then Submit the purchase ledger contract for approval
        Then login as Payment Approver user
        And navigate to the purchase ledger list page
        * Select the respective purchase ledger contract
        Then Reject the purchase ledger contract
        Then login as Payment Assistant user
        And navigate to the purchase ledger list page
        * Select the respective purchase ledger contract
        * Revert and Resubmit the purchase ledger contract
        Then login as Payment Approver user
        And navigate to the purchase ledger list page
        * Select the respective purchase ledger contract
        * Approve the purchase ledger contract
        * Purchase ledger invoices will be generated
        Examples:
            | fundingModel |
            # | Direct       |
            | Indirect     |