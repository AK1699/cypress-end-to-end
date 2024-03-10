Feature: External users dashboard(Client user,agency user,contractor)

    Scenario: To Query the hiring manager dashboard count from database and validate the queried response in UI
        Given external users dashboard count response, queried from database
        Then Validate the hiring manager dashboard counts through database
        Then Validate the timesheet approver dashboard count through database
        Then Validate the invoice contact dashboard count through database
        Then Validate the contractor dashboard count through database
        
        