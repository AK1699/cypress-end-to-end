Feature: Payroll Timesheet
    As Payment assistant, the user is able to create payroll timesheet


    Background: The user is logged into raise and navigated to the payroll timesheet list page
        Given login as Payment Assistant user
        Then navigate to the payroll timesheet list page

    @focus
    Scenario Outline: To Bulk upload the payroll timesheet details for the given <fundingModel> model entity which has funding type as <fundingType>
        Given Payroll timesheet details to bulk upload for "<fundingModel>" funding model and for "<fundingType>" funding type
        When Payroll timesheet details are bulk uploaded
        Then login as Payment Approver user
        And navigate to the payroll timesheet list page
        Then Payroll timesheets record should be generated in Submitted status for each detail in the template
        * Upload the proof of approval document for payroll timesheet
        When Approve the payroll timesheet
        Then Invoices will be generated for the payroll timesheet
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
# | Indirect     | Funded         |
# | Direct       | Paid When Paid |
# | Indirect     | Paid When Paid |

# @focus
# Scenario Outline: To create a payroll timesheet for <fundingModel> model entity which has funding type as <fundingType>
#     Given payroll timesheet details
#     Then Select the funding type as "<fundingType>" in payroll timesheet creation form
#     And Select the currency in payroll timesheet creation form
#     * Select the "<fundingModel>" model agency in the payroll timesheet creation form
#     * Select the "<fundingModel>" model contract which has "<fundingType>" funding type in the payroll timesheet creation form
#     * Select the start date and end date in the payroll timesheet creation form
#     * fill the total units in the payroll timesheet
#     Then Upload the proof of submission document for payroll timesheet
#     And Submit the payroll timesheet for approval
#     Then login as Payment Approver user
#     And navigate to the payroll timesheet list page
#     * Select the respective payroll timesheet
#     Then Upload the proof of approval document for payroll timesheet
#     When Approve the payroll timesheet
#     Then Invoices will be generated for the payroll timesheet
#     Examples:
#         | fundingModel | fundingType    |
#         | Direct       | Funded         |
# | Indirect     | Funded         |
# | Direct       | Paid When Paid |
# | Indirect     | Paid When Paid |