Feature: Invoice Adjustment

    The platform allows to create a Invoice adjustment for the overpaid invoices or the underpaid invoices.
    1. For Overpaid invoices, the platform has a option called credit note, which allows the extra amount of parent invoice to be set off with the generated credit note.
    2. For Underpaid invoices, the platform has a option called Invoices, which allows to create a replacement invoice which can be further used in payments.




    Background: Login as Payment Assistant and navigate to the Invoice Adjustment list page
        Given login as Payment Assistant user
        Then Navigate to the Invoice Adjustment list page



    Scenario Outline: To create a full reversal <generationType> for <transactionType>
        Given Refinement details to create "<generationType>" for "<transactionType>"
        Then 
        Examples:
            | generationType | transactionType   |Type
            | Credit Note    | Timesheet         |
            | Credit Note    | Payroll Timesheet |
            | Credit Note    | Expense           |
            | Credit Note    | Purchase Ledger   |
            | Credit Note    | Sales Invoice     |
            | Credit Note    | Timesheet         |
            | Credit Note    | Perm Placement    |
            | Credit Note    | Adhoc Fee Invoice |