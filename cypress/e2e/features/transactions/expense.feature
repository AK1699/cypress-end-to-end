Feature: Expense
    Platform allows the external and internal users to create expense for the respective temporary placement. 
    Permissions: Externally contractor can raise expense and get approved by client timesheet approver
                 Internally Payment Assistant can raise expense on behalf of contractor and get approved by payment approver on behalf of client timesheet approver

    @focus
    Scenario Outline: Create an expense claim by contractor user for <fundingModel> model, submitted and approved by external users
        Given expense claim form details for "<fundingModel>" model contract of "<fundingType>" funding type
        Then login as contractor, to submit a expense claim form
        And Navigate to the expense list page
        * Insert the basic information for expense claim form for "<fundingType>" funding type
        Then fill the expense details in the expense claim form
        * Submit the expense claim form for approval
        * login as timesheet approver, to review the expense claim form
        And Navigate to the expense list page
        * Select the respective expense
        * Approve the expense claim form
        Then login as Payment Assistant user
        And Navigate to the expense list page
        * Select the respective expense
        Then Invoices will be genereated for the expense
        Examples:
            | fundingModel | fundingType |
            # | Direct       | Funded      |
            | Indirect     | Funded      |
    # | Direct       | Paid When Paid |
    # | Indirect     | Paid When Paid |

#     @focus
#     Scenario Outline: Create an expense claim by contractor user for <fundingModel> model, rejected and resubmitted by external users
#         Given expense claim form details for "<fundingModel>" model contract of "<fundingType>" funding type
#         Then login as contractor, to submit a expense claim form
#         And Navigate to the expense list page
#         Then Insert the basic information for expense claim form for "<fundingType>" funding type
#         * fill the expense details in the expense claim form
#         And Submit the expense claim form for approval
#         Then login as timesheet approver, to review the expense claim form
#         And Navigate to the expense list page
#         * Select the respective expense
#         * Reject the expense claim form
#         Then login as Payment Assistant user
#         And Navigate to the expense list page
#         * Select the respective expense
#         Then Revert the expense claim form
#         And login as contractor, to submit a expense claim form
#         And Navigate to the expense list page
#         * Select the respective expense
#         Then Submit the expense claim form for approval
#         * login as timesheet approver, to review the expense claim form
#         And Navigate to the expense list page
#         * Select the respective expense
#         * Approve the expense claim form
#         Then login as Payment Assistant user
#         And Navigate to the expense list page
#         * Select the respective expense
#         Then Invoices will be genereated for the expense
#         Examples:
#             | fundingModel | fundingType |
#             | Direct       | Funded      |
#             | Indirect     | Funded      |
#     # | Direct       | Paid When Paid |
#     # | Indirect     | Paid When Paid |

#     @focus
#     Scenario Outline: Create an expense claim by Payment Assistant user on behalf of contractor for <fundingModel> model, submitted and approved by internal user
#         Given expense claim form details for "<fundingModel>" model contract of "<fundingType>" funding type
#         Then login as Payment Assistant user
#         And Navigate to the expense list page
#         Then Insert the basic information for expense claim form for "<fundingType>" funding type
#         And fill the expense details in the expense claim form
#         * upload the proof of submission document for expense
#         * Submit the expense claim form for approval
#         Then login as Payment Approver user
#         And Navigate to the expense list page
#         * Select the respective expense
#         * upload the proof of approval document for expense
#         Then Approve the expense claim form
#         And Invoices will be genereated for the expense
#         Examples:
#             | fundingModel | fundingType |
#             | Direct       | Funded      |
#             | Indirect     | Funded      |
#     # | Direct       | Paid When Paid |
#     # | Indirect     | Paid When Paid |

#     @focus
#     Scenario Outline: Create an expense claim by Payment Assistant user on behalf of contractor for <fundingModel> model, rejected and resubmitted by internal user
#         Given expense claim form details for "<fundingModel>" model contract of "<fundingType>" funding type
#         Then login as Payment Assistant user
#         And Navigate to the expense list page
#         Then Insert the basic information for expense claim form for "<fundingType>" funding type
#         And fill the expense details in the expense claim form
#         * upload the proof of submission document for expense
#         * Submit the expense claim form for approval
#         Then login as Payment Approver user
#         And Navigate to the expense list page
#         * Select the respective expense
#         * upload the proof of approval document for expense
#         Then Reject the expense claim form
#         * login as Payment Assistant user
#         And Navigate to the expense list page
#         * Select the respective expense
#         * Revert the expense claim form
#         * Submit the expense claim form for approval
#         Then login as Payment Approver user
#         And Navigate to the expense list page
#         * Select the respective expense
#         Then Approve the expense claim form
#         And Invoices will be genereated for the expense
#         Examples:
#             | fundingModel | fundingType |
#             | Direct       | Funded      |
#             | Indirect     | Funded      |
# # | Direct       | Paid When Paid |
# # | Indirect     | Paid When Paid |