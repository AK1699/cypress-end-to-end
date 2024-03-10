Feature: Permanent Placement

    Background: The user should be logged into raise portal and navigated to the permanent placement list page
        Given login as Onboarding agent Maker user
        Then navigate to the permanent placement list page

    @focus @E2E
    Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel>, reviewed and approved by internal users on behalf of external users
        Given permanent placement details
        Then select the respective currency for the permanent placement
        And select the funding type as "<fundingType>" for permanent placement
        And select the "<fundingModel>" model agency in the permanent placement form
        And select the "<fundingModel>" model client in the permanent placement form
        And fill the placement details in the permanent placement form
        And Insert the purchase order number in the permanent placement contract if required
        Then Submit the permanent placement for credit risk approval
        Then login as Credit Risk Manager user
        And navigate to the permanent placement list page
        And select the respective permanent placement
        Then Approve the permanent placement credit limit by credit risk manager user
        And login as Onboarding agent Maker user
        And navigate to the permanent placement list page
        And select the respective permanent placement
        Then Upload the agency proof for agency approval-rejection for permanent placement
        And Approve the permanent placement by internal user on behalf of agency user
        Then Upload the client proof for client approval-rejection for permanent placement
        And Approve the permanent placement by internal user on behalf of client user
        Then "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingType | fundingModel |
            | Funded      | Direct       |
            # | Paid When Paid | Direct       |
            | Funded      | Indirect     |
    # | Paid When Paid | Indirect     |

    # @focus @E2E
    # Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel> reviewed and approved by external users
    #     Given permanent placement details
    #     Then select the respective currency for the permanent placement
    #     And select the funding type as "<fundingType>" for permanent placement
    #     And select the "<fundingModel>" model agency in the permanent placement form
    #     And select the "<fundingModel>" model client in the permanent placement form
    #     And fill the placement details in the permanent placement form
    #     And Insert the purchase order number in the permanent placement contract if required
    #     Then Submit the permanent placement for credit risk approval
    #     Then login as Credit Risk Manager user
    #     And navigate to the permanent placement list page
    #     And select the respective permanent placement
    #     Then Approve the permanent placement credit limit by credit risk manager user
    #     And Review and Approve the permanent placement by agency user
    #     * Review and Approve the permanent placement by client hiring manager user
    #     Then login as Onboarding agent Maker user
    #     And navigate to the permanent placement list page
    #     * select the respective permanent placement
    #     Then "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
    #     Examples:
    #         | fundingType | fundingModel |
    #         | Funded      | Direct       |
    #         # | Paid When Paid | Direct       |
    #         | Funded      | Indirect     |
    # # | Paid When Paid | Indirect     |

    #     @focus @E2E
    #     Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel> reviewed and rejected by Credit risk manager
    #         Given permanent placement details
    #         Then select the respective currency for the permanent placement
    #         And select the funding type as "<fundingType>" for permanent placement
    #         And select the "<fundingModel>" model agency in the permanent placement form
    #         And select the "<fundingModel>" model client in the permanent placement form
    #         And fill the placement details in the permanent placement form
    #         And Insert the purchase order number in the permanent placement contract if required
    #         Then Submit the permanent placement for credit risk approval
    #         Then login as Credit Risk Manager user
    #         And navigate to the permanent placement list page
    #         And select the respective permanent placement
    #         Then Reject & Revert the permanent placement credit limit by credit risk manager user
    #         And login as Onboarding agent Maker user
    #         * navigate to the permanent placement list page
    #         * select the respective permanent placement
    #         * Submit the permanent placement for credit risk approval
    #         Then login as Credit Risk Manager user
    #         And navigate to the permanent placement list page
    #         And select the respective permanent placement
    #         And Approve the permanent placement credit limit by credit risk manager user
    #         Then login as Onboarding agent Maker user
    #         And navigate to the permanent placement list page
    #         * select the respective permanent placement
    #         Then Upload the agency proof for agency approval-rejection for permanent placement
    #         And Approve the permanent placement by internal user on behalf of agency user
    #         Then Upload the client proof for client approval-rejection for permanent placement
    #         And Approve the permanent placement by internal user on behalf of client user
    #         Then Invoices will be generated for the permanent placement
    #         Examples:
    #             | fundingType | fundingModel |
    #             | Funded      | Direct       |
    #             # | Paid When Paid | Direct       |
    #             | Funded      | Indirect     |
    #     # | Paid When Paid | Indirect     |

    # @focus @E2E
    # Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel> reviewed and rejected by agency user, resubmitted and approved by external users
    #     Given permanent placement details
    #     Then select the respective currency for the permanent placement
    #     And select the funding type as "<fundingType>" for permanent placement
    #     And select the "<fundingModel>" model agency in the permanent placement form
    #     And select the "<fundingModel>" model client in the permanent placement form
    #     And fill the placement details in the permanent placement form
    #     And Insert the purchase order number in the permanent placement contract if required
    #     Then Submit the permanent placement for credit risk approval
    #     Then login as Credit Risk Manager user
    #     And navigate to the permanent placement list page
    #     And select the respective permanent placement
    #     Then Approve the permanent placement credit limit by credit risk manager user
    #     And Review and Reject the permanent placement by agency user
    #     Then login as Onboarding agent Maker user
    #     And navigate to the permanent placement list page
    #     * select the respective permanent placement
    #     * Revert and Resubmit the permanent placement for agency approval
    #         | invoiceAmount |
    #         | 1500          |
    #     Then login as Credit Risk Manager user
    #     * navigate to the permanent placement list page
    #     * select the respective permanent placement
    #     And Approve the permanent placement credit limit by credit risk manager user
    #     Then Review and Approve the permanent placement by agency user
    #     * Review and Approve the permanent placement by client hiring manager user
    #     Then login as Onboarding agent Maker user
    #     And navigate to the permanent placement list page
    #     * select the respective permanent placement
    #     Then Invoices will be generated for the permanent placement
    #     Examples:
    #         | fundingType | fundingModel |
    #         | Funded      | Direct       |
    # | Paid When Paid | Direct       |
    # | Funded      | Indirect     |
    # | Paid When Paid | Indirect     |


#     @focus @E2E
#     Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel>, reviewed and rejected by client user, resubmitted and approved by external user
#         Given permanent placement details
#         Then select the respective currency for the permanent placement
#         And select the funding type as "<fundingType>" for permanent placement
#         And select the "<fundingModel>" model agency in the permanent placement form
#         And select the "<fundingModel>" model client in the permanent placement form
#         And fill the placement details in the permanent placement form
#         And Insert the purchase order number in the permanent placement contract if required
#         Then Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And Review and Approve the permanent placement by agency user
#         * Review and Reject the permanent placement by client user
#         * Revert and Resubmit the permanent placement for client approval by agency user
#             | invoiceAmount |
#             | 5999          |
#         * Review and Approve the permanent placement by client hiring manager user
#         Then login as Onboarding agent Maker user
#         And navigate to the permanent placement list page
#         * select the respective permanent placement
#         Then Invoices will be generated for the permanent placement
#         Examples:
#             | fundingType | fundingModel |
#             | Funded      | Direct       |
#             # | Paid When Paid | Direct       |
#             | Funded      | Indirect     |
#     # | Paid When Paid | Indirect     |

#     @focus @E2E
#     Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel>, reviewed and rejected by internal users on behalf of agency user
#         Given permanent placement details
#         Then select the respective currency for the permanent placement
#         And select the funding type as "<fundingType>" for permanent placement
#         And select the "<fundingModel>" model agency in the permanent placement form
#         And select the "<fundingModel>" model client in the permanent placement form
#         And fill the placement details in the permanent placement form
#         And Insert the purchase order number in the permanent placement contract if required
#         Then Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And login as Onboarding agent Maker user
#         And navigate to the permanent placement list page
#         * select the respective permanent placement
#         * Upload the agency proof for agency approval-rejection for permanent placement
#         And Reject and Revert the permanent placement by internal user on behalf of agency user
#         And Update the agency rejected amendments in the permanent placement contract
#             | invoiceAmount |
#             | 1500          |
#         And Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And login as Onboarding agent Maker user
#         * navigate to the permanent placement list page
#         * select the respective permanent placement
#         * Approve the permanent placement by internal user on behalf of agency user
#         Then Upload the client proof for client approval-rejection for permanent placement
#         And Approve the permanent placement by internal user on behalf of client user
#         Then Invoices will be generated for the permanent placement
#         Examples:
#             | fundingType | fundingModel |
#             | Funded      | Direct       |
#             # | Paid When Paid | Direct       |
#             | Funded      | Indirect     |
#     # | Paid When Paid | Indirect     |

#     @focus @E2E
#     Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel>, reviewed and rejected by internal users on behalf of client user
#         Given permanent placement details
#         Then select the respective currency for the permanent placement
#         And select the funding type as "<fundingType>" for permanent placement
#         And select the "<fundingModel>" model agency in the permanent placement form
#         And select the "<fundingModel>" model client in the permanent placement form
#         And fill the placement details in the permanent placement form
#         And Insert the purchase order number in the permanent placement contract if required
#         Then Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And login as Onboarding agent Maker user
#         And navigate to the permanent placement list page
#         * select the respective permanent placement
#         * Upload the agency proof for agency approval-rejection for permanent placement
#         And Approve the permanent placement by internal user on behalf of agency user
#         And Upload the client proof for client approval-rejection for permanent placement
#         And Reject and Revert the permanent placement by internal user on behalf of client user
#         And Update the client rejected amendments in the permanent placement contract
#             | invoiceAmount |
#             | 1500          |
#         And Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And login as Onboarding agent Maker user
#         * navigate to the permanent placement list page
#         * select the respective permanent placement
#         * Approve the permanent placement by internal user on behalf of agency user
#         * Approve the permanent placement by internal user on behalf of client user
#         Then Invoices will be generated for the permanent placement
#         Examples:
#             | fundingType | fundingModel |
#             | Funded      | Direct       |
#             # | Paid When Paid | Direct       |
#             | Funded      | Indirect     |
#     # | Paid When Paid | Indirect     |






    # Client Magic link approval
    # @focus @E2E @magicLink
    # Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel> reviewed and approved by external users (client approval via magic link)
    #     Given permanent placement details
    #     Then select the respective currency for the permanent placement
    #     And select the funding type as "<fundingType>" for permanent placement
    #     And select the "<fundingModel>" model agency in the permanent placement form
    #     And select the "<fundingModel>" model client in the permanent placement form
    #     And fill the placement details in the permanent placement form
    #     And Insert the purchase order number in the permanent placement contract if required
    #     Then Submit the permanent placement for credit risk approval
    #     Then login as Credit Risk Manager user
    #     And navigate to the permanent placement list page
    #     And select the respective permanent placement
    #     Then Approve the permanent placement credit limit by credit risk manager user
    #     And Review and Approve the permanent placement by agency user
    #     * Review and Approve the permanent placement by client hiring manager user via magic link
    #     Then login as Onboarding agent Maker user
    #     And navigate to the permanent placement list page
    #     * select the respective permanent placement
    #     Then "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
    #     Examples:
    #         | fundingType | fundingModel |
    #         | Funded      | Direct       |
    #         # | Paid When Paid | Direct       |
    #         | Funded      | Indirect     |
    # | Paid When Paid | Indirect     |

#     @focus @E2E @magicLink
#     Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel>, reviewed and rejected by client user, resubmitted and approved by external user (client approval via magic link)
#         Given permanent placement details
#         Then select the respective currency for the permanent placement
#         And select the funding type as "<fundingType>" for permanent placement
#         And select the "<fundingModel>" model agency in the permanent placement form
#         And select the "<fundingModel>" model client in the permanent placement form
#         And fill the placement details in the permanent placement form
#         And Insert the purchase order number in the permanent placement contract if required
#         Then Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And Review and Approve the permanent placement by agency user
#         * Review and Reject the permanent placement by client user via magic link
#         * Revert and Resubmit the permanent placement for client approval by agency user
#             | invoiceAmount |
#             | 5999          |
#         * Review and Approve the permanent placement by client hiring manager user via magic link
#         Then login as Onboarding agent Maker user
#         And navigate to the permanent placement list page
#         * select the respective permanent placement
#         Then Invoices will be generated for the permanent placement
#         Examples:
#             | fundingType | fundingModel |
#             | Funded      | Direct       |
#             # | Paid When Paid | Direct       |
#             | Funded      | Indirect     |
#     # | Paid When Paid | Indirect     |

#     @focus @E2E @magicLink
#     Scenario Outline: Create a permanent placement with funding type as <fundingType> and funding model as <fundingModel> reviewed and rejected by agency user, resubmitted and approved by external users (client approval via magic link)
#         Given permanent placement details
#         Then select the respective currency for the permanent placement
#         And select the funding type as "<fundingType>" for permanent placement
#         And select the "<fundingModel>" model agency in the permanent placement form
#         And select the "<fundingModel>" model client in the permanent placement form
#         And fill the placement details in the permanent placement form
#         And Insert the purchase order number in the permanent placement contract if required
#         Then Submit the permanent placement for credit risk approval
#         Then login as Credit Risk Manager user
#         And navigate to the permanent placement list page
#         And select the respective permanent placement
#         Then Approve the permanent placement credit limit by credit risk manager user
#         And Review and Reject the permanent placement by agency user
#         Then login as Onboarding agent Maker user
#         And navigate to the permanent placement list page
#         * select the respective permanent placement
#         * Revert and Resubmit the permanent placement for agency approval
#             | invoiceAmount |
#             | 1500          |
#         Then login as Credit Risk Manager user
#         * navigate to the permanent placement list page
#         * select the respective permanent placement
#         And Approve the permanent placement credit limit by credit risk manager user
#         Then Review and Approve the permanent placement by agency user
#         * Review and Approve the permanent placement by client hiring manager user via magic link
#         Then login as Onboarding agent Maker user
#         And navigate to the permanent placement list page
#         * select the respective permanent placement
#         Then Invoices will be generated for the permanent placement
#         Examples:
#             | fundingType | fundingModel |
#             | Funded      | Direct       |
#             # | Paid When Paid | Direct       |
#             | Funded      | Indirect     |
# # | Paid When Paid | Indirect     |