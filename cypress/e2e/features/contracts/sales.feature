Feature: Sales Invoice

    Background: The user is logged into the raise portal and navigated to the sales invoice list page
        Given login as Payment Assistant user
        Then navigate to the sales invoice list page

    # @focus @E2E
    # Scenario Outline: Create a Sales Invoice contract for <fundingModel> model entities without rejection
    #     Given Sales Invoice Contract details
    #     Then Select the currency in the sales invoice contract form
    #     * fill the description in the sales invoice contract form
    #     * Select the "<fundingModel>" model agency in the sales invoice contract form
    #     * Select the "<fundingModel>" model client in the sales invoice contract form
    #     * fill the invoice amount in the sales invoice contract form
    #     * fill the fee charges according to the "<fundingModel>" model in the sales invoice contract form
    #     And Update the funder details in the sales invoice contract form
    #     * Update the agency details in the sales invoice contract form
    #     * Update the client details in the sales invoice contract form
    #     # * Insert the Purchase order number in the sales invoice contract if required
    #     * Update the provider details in the sales invoice contract form
    #     Then Submit the sales invoice contract form for approval
    #     Then login as Payment Approver user
    #     And navigate to the sales invoice list page
    #     * Select the respective sales invoice contract
    #     * Approve the sales invoice contract form
    #     * Sales invoices for the "<fundingModel>" model will be generated
    #     Examples:
    #         | fundingModel |
    #         | Direct       |
    #         | Indirect     |

            
    @focus @E2E
    Scenario Outline: Create a Sales Invoice contract for <fundingModel> model entities with rejection and resubmission
        Given Sales Invoice Contract details
        Then Select the currency in the sales invoice contract form
        * fill the description in the sales invoice contract form
        * Select the "<fundingModel>" model agency in the sales invoice contract form
        * Select the "<fundingModel>" model client in the sales invoice contract form
        * fill the invoice amount in the sales invoice contract form
        * fill the fee charges according to the "<fundingModel>" model in the sales invoice contract form
        And Update the funder details in the sales invoice contract form
        * Update the agency details in the sales invoice contract form
        * Update the client details in the sales invoice contract form
        # * Insert the Purchase order number in the sales invoice contract if required
        * Update the provider details in the sales invoice contract form
        Then Submit the sales invoice contract form for approval
        Then login as Payment Approver user
        And navigate to the sales invoice list page
        * Select the respective sales invoice contract
        * Reject the sales invoice contract form
        Then login as Payment Assistant user
        And navigate to the sales invoice list page
        * Select the respective sales invoice contract
        * Revert and Resubmit the sales invoice contract
        Then login as Payment Approver user
        And navigate to the sales invoice list page
        * Select the respective sales invoice contract
        * Approve the sales invoice contract form
        * Sales invoices will be generated
        Examples:
            | fundingModel |
            | Direct       |
            # | Indirect     |