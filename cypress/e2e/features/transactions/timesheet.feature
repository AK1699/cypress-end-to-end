Feature: Timesheet
    As Payment assistant/contractor, able to submit the timesheet and as payment approver/client timesheet approver, able to approve the timesheet
    The user can fill the working units per day individually as hours(i.e: Hours as input value and minutes as selective drop down value such as 15 Minutes/30 Minutes/45 Minutes) or in terms of days (i.e: Half Day/Full Day/Not working) and then submit for approval from client.
    As Payment assistant/agency, able to chase the Draft, Submitted timesheet
    The user can chase the Draft, Submitted timesheet(i.e: Payment assistant/agency, chase the draft timesheet to submit the by contractor) or (i.e: Payment assistant/agency, chase the submitted timesheet to approve the by timesheet approver) and then email sent to respective users.


    # @focus @E2E
    # Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by Contractor, which has <fundingModel> model and funding type as <fundingType> and approve by client timesheet approver
    #     Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
    #     Then Login as contractor to perform any actions on timesheet
    #     And navigate to the timesheet list page
    #     And Select the respective timesheet
    #     Then fill the timesheet as contractor
    #     And Submit the timesheet by the contractor
    #     * Login as client timesheet approver to perform any actions on timesheet
    #     And navigate to the timesheet list page
    #     * Select the respective timesheet
    #     * Approve the timesheet by client timesheet approver
    #     Then Invoices will be generated for the timesheet

    #     Examples:
    #         | fundingType | fundingModel | unitType | timesheetFrequency |
    # | Funded      | Indirect     | Hours    | Weekly             |
    # | Funded      | Indirect     | Hours    | Monthly            |
    # | Funded      | Indirect     | Days     | Weekly             |
    # | Funded      | Indirect     | Days     | Monthly            |
    # | Funded      | Direct       | Hours    | Weekly             |
    # | Funded      | Direct       | Hours    | Monthly            |
    # | Funded      | Direct       | Days     | Weekly             |
    # | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |


    @focus @E2E
    Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by Agency user, which has <fundingModel> model and funding type as <fundingType> and approve by client timesheet approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        And navigate to the timesheet list page
        And Select the respective timesheet
        Then fill the timesheet as agency user on behalf of contractor
        And upload the timesheet proof of submission document
        And Submit the timesheet as agency user on behalf of contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        * Approve the timesheet by client timesheet approver
        Then Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |


    @focus  @E2E
    Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by Payment assistant on behalf of Contractor, which has <fundingModel> model and funding type as <fundingType> and approve by Payment Assistant on behalf of timesheet approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as Internal user on behalf of contractor
        And upload the timesheet proof of submission document
        * Submit the timesheet as Internal user on behalf of contractor
        Then login as Payment Approver user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then upload the timesheet proof of approval document
        And Approve the timesheet by Internal user on behalf of client timesheet approver
        * Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by Payment assistant on behalf of contractor, which has <fundingModel> model and <fundingType>, rejected by Payment approver on behalf of timesheet approver then resubmitted by Payment assistant on behalf of contractor and approved by Payment approver on behalf of timesheet approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as Internal user on behalf of contractor
        And upload the timesheet proof of submission document
        * Submit the timesheet as Internal user on behalf of contractor
        Then login as Payment Approver user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then upload the timesheet proof of approval document
        Then Reject the timesheet by Internal user on behalf of client timesheet approver
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        And Revert the timesheet by payment assistant on behalf of contractor
        * Submit the timesheet as Internal user on behalf of contractor
        Then login as Payment Approver user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then Approve the timesheet by client timesheet approver
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by Payment assistant on behalf of contractor, which has <fundingModel> model and <fundingType>, Rejected for No Resubmission by Payment approver on behalf of timesheet approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as Internal user on behalf of contractor
        And upload the timesheet proof of submission document
        * Submit the timesheet as Internal user on behalf of contractor
        Then login as Payment Approver user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then upload the timesheet proof of approval document
        Then Reject the timesheet for No Resubmission by Internal user on behalf of client timesheet approver
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then Verify that there is no option to Revert the Closed timesheet
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by agency user on behalf of contractor, which has <fundingModel> model and funding type as <fundingType>, rejected by a timesheet approver, then resubmitted by agency user on behalf of contractor and approved by Timesheet Approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        And navigate to the timesheet list page
        And Select the respective timesheet
        Then fill the timesheet as agency user on behalf of contractor
        * upload the timesheet proof of submission document
        And Submit the timesheet as agency user on behalf of contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        Then Reject the timesheet by timesheet approver
        Then Login as agency user to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        And Revert the timesheet by agency user on behalf of contractor
        Then Submit the timesheet as agency user on behalf of contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        * Approve the timesheet by client timesheet approver
        Then Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by agency user on behalf of contractor, which has <fundingModel> model and funding type as <fundingType>, Rejected for No Resubmission by timesheet approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        And navigate to the timesheet list page
        And Select the respective timesheet
        Then fill the timesheet as agency user on behalf of contractor
        * upload the timesheet proof of submission document
        And Submit the timesheet as agency user on behalf of contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        Then Reject the timesheet for No Resubmission by client timesheet approver
        * login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then Verify that there is no option to Revert the Closed timesheet
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by contractor user, which has <fundingModel> model and funding type as <fundingType>, rejected by a timesheet approver, then resubmitted by contractor user and approved by Timesheet Approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        And Select the respective timesheet
        Then fill the timesheet as contractor
        And Submit the timesheet by the contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        Then Reject the timesheet by timesheet approver
        Then Login as contractor to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        And Revert the timesheet by the contractor
        Then Submit the timesheet by the contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        * Approve the timesheet by client timesheet approver
        Then Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by contractor user, which has <fundingModel> model and funding type as <fundingType>, Rejected for No Resubmission by timesheet approver
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        And Select the respective timesheet
        Then fill the timesheet as contractor
        And Submit the timesheet by the contractor
        Then Login as client timesheet approver to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        Then Reject the timesheet for No Resubmission by client timesheet approver
        * login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then Verify that there is no option to Revert the Closed timesheet
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |


    @focus@E2E
    Scenario Outline: To Chase the Draft <timesheetFrequency>-<unitType> timesheet which has <fundingModel> model and funding type as <fundingType> by agency user
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        * navigate to the timesheet list page
        And Select the respective timesheet to chase
        Then Chase the draft timesheet
        Then verify draft timesheet chase email send to the contractor with the right subject
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Weekly             |


    @focus @E2E
    Scenario Outline: To Chase the Submitted <timesheetFrequency>-<unitType> timesheet which has <fundingModel> model and funding type as <fundingType> by agency user
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as contractor
        And Submit the timesheet by the contractor
        * Login as agency user to perform any actions on timesheet
        * navigate to the timesheet list page
        And Select the respective timesheet to chase
        Then Chase the Submitted Timesheet
        Then verify submitted timesheet chase email send to the timesheet approver with the right subject
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Weekly             |

    @focus @E2E
    Scenario Outline:  To Chase the Draft <timesheetFrequency>-<unitType> timesheet which has <fundingModel> model and funding type as <fundingType> by Payment assistant user
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then login as Payment Assistant user
        * navigate to the timesheet list page
        And Select the respective timesheet to chase
        Then Chase the draft timesheet
        Then verify draft timesheet chase email send to the contractor with the right subject
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Weekly             |

    @focus @E2E
    Scenario Outline:  To Chase the Submitted <timesheetFrequency>-<unitType> timesheet which has <fundingModel> model and funding type as <fundingType> by Payment assistant user
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as Internal user on behalf of contractor
        * upload the timesheet proof of submission document
        * Submit the timesheet as Internal user on behalf of contractor
        * login as Payment Assistant user
        * navigate to the timesheet list page
        And Select the respective timesheet to chase
        Then Chase the Submitted Timesheet
        Then verify submitted timesheet chase email send to the timesheet approver with the right subject
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Weekly             |

    @focus @E2E
    Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by agency user on behalf of contractor, which has a <fundingModel> model and <fundingType> funding type, rejected by Timesheet approver via magic link, then resubmitted by the agency user on behalf of contractor and approved by Timesheet approver via magic link
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as agency user on behalf of contractor
        * upload the timesheet proof of submission document
        * Submit the timesheet as agency user on behalf of contractor
        * Reject the timesheet by client user via magic link
        * Login as agency user to perform any actions on timesheet
        * navigate to the timesheet list page
        * Select the respective timesheet
        And Revert the timesheet by agency user on behalf of contractor
        * Submit the timesheet as agency user on behalf of contractor
        * Approve the timesheet by client user via magic link
        Then login as Payment Approver user
        * navigate to the timesheet list page
        * Select the respective timesheet
        * Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline: Ability to Submit the <timesheetFrequency>-<unitType> timesheet by agency user on behalf of contractor, which has a <fundingModel> model and <fundingType> funding type, approved by Timesheet approver via magic link
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as agency user on behalf of contractor
        * upload the timesheet proof of submission document
        * Submit the timesheet as agency user on behalf of contractor
        * Approve the timesheet by client user via magic link
        Then login as Payment Approver user
        * navigate to the timesheet list page
        * Select the respective timesheet
        * Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by agency user, which has a <fundingModel> model and <fundingType> funding type, Reject for No Resubmission by timesheet approver via magic link
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as agency user to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as agency user on behalf of contractor
        And upload the timesheet proof of submission document
        And Submit the timesheet as agency user on behalf of contractor
        Then login as Payment Assistant user
        And Reject the timesheet for No Resubmission by client user via magic link
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then Verify that there is no option to Revert the Closed timesheet
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |

    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by contractor, which has a <fundingModel> model and <fundingType> funding type, approved by timesheet approver through magic link
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as contractor
        And Submit the timesheet by the contractor
        * Approve the timesheet by client user via magic link
        Then login as Payment Approver user
        * navigate to the timesheet list page
        * Select the respective timesheet
        * Invoices will be generated for the timesheet
        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |


    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by contractor, which has a <fundingModel> model and <fundingType> funding type, Reject by timesheet approver via magic link, then resubmit by contractor and approve by timesheet approver via magic link
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as contractor
        And Submit the timesheet by the contractor
        * Reject the timesheet by client user via magic link
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        Then Select the respective timesheet
        And Revert the timesheet by the contractor
        * Submit the timesheet by the contractor
        Then Approve the timesheet by client user via magic link
        * login as Payment Approver user
        * navigate to the timesheet list page
        * Select the respective timesheet
        * Invoices will be generated for the timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
    # | Paid When Paid | Indirect     | Hours    | Weekly             |
    # | Paid When Paid | Indirect     | Hours    | Monthly            |
    # | Paid When Paid | Indirect     | Days     | Weekly             |
    # | Paid When Paid | Indirect     | Days     | Monthly            |
    # | Paid When Paid | Direct       | Hours    | Weekly             |
    # | Paid When Paid | Direct       | Hours    | Monthly            |
    # | Paid When Paid | Direct       | Days     | Weekly             |
    # | Paid When Paid | Direct       | Days     | Monthly            |


    @focus @E2E
    Scenario Outline:  Ability to Submit the <timesheetFrequency>-<unitType> timesheet by contractor, which has a <fundingModel> model and <fundingType> funding type, Reject for No Resubmission by timesheet approver via magic link
        Given The "<timesheetFrequency>"-"<unitType>" timesheet details which has "<fundingModel>" funding model, "<fundingType>" funding type
        Then Login as contractor to perform any actions on timesheet
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then fill the timesheet as contractor
        And Submit the timesheet by the contractor
        * login as Payment Assistant user
        * Reject the timesheet for No Resubmission by client user via magic link
        Then login as Payment Assistant user
        And navigate to the timesheet list page
        * Select the respective timesheet
        Then Verify that there is no option to Revert the Closed timesheet

        Examples:
            | fundingType | fundingModel | unitType | timesheetFrequency |
            | Funded      | Indirect     | Hours    | Weekly             |
            | Funded      | Indirect     | Hours    | Monthly            |
            | Funded      | Indirect     | Days     | Weekly             |
            | Funded      | Indirect     | Days     | Monthly            |
            | Funded      | Direct       | Hours    | Weekly             |
            | Funded      | Direct       | Hours    | Monthly            |
            | Funded      | Direct       | Days     | Weekly             |
            | Funded      | Direct       | Days     | Monthly            |
# | Paid When Paid | Indirect     | Hours    | Weekly             |
# | Paid When Paid | Indirect     | Hours    | Monthly            |
# | Paid When Paid | Indirect     | Days     | Weekly             |
# | Paid When Paid | Indirect     | Days     | Monthly            |
# | Paid When Paid | Direct       | Hours    | Weekly             |
# | Paid When Paid | Direct       | Hours    | Monthly            |
# | Paid When Paid | Direct       | Days     | Weekly             |
# | Paid When Paid | Direct       | Days     | Monthly            |