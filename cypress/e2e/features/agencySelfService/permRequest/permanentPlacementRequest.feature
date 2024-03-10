Feature: Permanent Placement Request

    The platform allows the agency user to create a Permanent contract via self serve request.
    To Implement this feature Self service toggle should be enabled at agency entity level.


    @E2E
    Scenario Outline: Create a Permanent contract request for <fundingModel> model agency mapped with existing client
        Given "<fundingModel>" model agency to create a permanent contract request
        Then "<fundingModel>" model Agency business is allowed to make a self serve request for permanent placement
        Then login as agency user to create a new permanent placement request
        And navigate to the permanent placement request list page
        Then Select the Existing client details in the permanent contract request
        * Fill the placement details and existing client contracts in the permanent contract request
        When The Agency user Review and Submit the permanent placement request details
        Then Permanent placement is generated for the Submitted request in client pending approval status
        Then Review and Approve the permanent placement by client hiring manager user
        Then Review and Approve the permanent placement by credit risk assitant
        And "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
            | Indirect     | Funded      |

    @E2E
    Scenario Outline: Create a Permanent contract request for <fundingModel> model agency mapped with existing client, new contacts
        Given "<fundingModel>" model agency to create a permanent contract request
        Then "<fundingModel>" model Agency business is allowed to make a self serve request for permanent placement
        Then login as agency user to create a new permanent placement request
        And navigate to the permanent placement request list page
        Then Select the Existing client details in the permanent contract request
        * Fill the placement details and New client contacts in the permanent contract request
        When The Agency user Review and Submit the permanent placement request details
        Then Permanent placement is generated for the Submitted request in awaiting raise approval status
        * login as Onboarding agent Maker user
        And navigate to the permanent placement list page
        * select the respective permanent placement
        And Setup the new client contracts given in perm request in the raise platform
        Then Review and Approve the permanent placement by client hiring manager user
        Then Review and Approve the permanent placement by credit risk assitant
        And "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
            | Indirect     | Funded      |
    @E2E @magicLink
    Scenario Outline: Create a Permanent contract request for <fundingModel> model agency mapped with existing client, new contacts (client approval via magic link)
        Given "<fundingModel>" model agency to create a permanent contract request
        Then "<fundingModel>" model Agency business is allowed to make a self serve request for permanent placement
        Then login as agency user to create a new permanent placement request
        And navigate to the permanent placement request list page
        Then Select the Existing client details in the permanent contract request
        * Fill the placement details and New client contacts in the permanent contract request
        When The Agency user Review and Submit the permanent placement request details
        Then Permanent placement is generated for the Submitted request in awaiting raise approval status
        * login as Onboarding agent Maker user
        And navigate to the permanent placement list page
        * select the respective permanent placement
        And Setup the new client contracts given in perm request in the raise platform
        Then Review and Approve the permanent placement by client hiring manager user via magic link
        Then Review and Approve the permanent placement by credit risk assitant
        And "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
            | Indirect     | Funded      |

    @E2E
    Scenario Outline: Create a Permanent contract request for <fundingModel> model agency mapped with New client
        Given "<fundingModel>" model agency to create a permanent contract request
        Then "<fundingModel>" model Agency business is allowed to make a self serve request for permanent placement
        Then login as agency user to create a new permanent placement request
        And navigate to the permanent placement request list page
        Then Fill the New client details in the permanent contract request
        * Fill the placement details and New client contacts in the permanent contract request
        When The Agency user Review and Submit the permanent placement request details
        Then Permanent placement is generated for the Submitted request in awaiting raise approval status
        * login as Onboarding agent Maker user
        And navigate to the permanent placement list page
        * select the respective permanent placement
        And Onboard the new client generated for the perm request
        Then Review and Approve the permanent placement by client hiring manager user
        Then Review and Approve the permanent placement by credit risk assitant
        And "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
            | Indirect     | Funded      |

    @E2E @magicLink
    Scenario Outline: Create a Permanent contract request for <fundingModel> model agency mapped with New client (client approval via magic link)
        Given "<fundingModel>" model agency to create a permanent contract request
        Then "<fundingModel>" model Agency business is allowed to make a self serve request for permanent placement
        Then login as agency user to create a new permanent placement request
        And navigate to the permanent placement request list page
        Then Fill the New client details in the permanent contract request
        * Fill the placement details and New client contacts in the permanent contract request
        When The Agency user Review and Submit the permanent placement request details
        Then Permanent placement is generated for the Submitted request in awaiting raise approval status
        * login as Onboarding agent Maker user
        And navigate to the permanent placement list page
        * select the respective permanent placement
        And Onboard the new client generated for the perm request
        Then Review and Approve the permanent placement by client hiring manager user via magic link
        Then Review and Approve the permanent placement by credit risk assitant
        And "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
            | Indirect     | Funded      |

    @E2E @magicLink
    Scenario Outline: Create a Permanent contract request for <fundingModel> model agency mapped with existing client (client approval via magic link)
        Given "<fundingModel>" model agency to create a permanent contract request
        Then "<fundingModel>" model Agency business is allowed to make a self serve request for permanent placement
        Then login as agency user to create a new permanent placement request
        And navigate to the permanent placement request list page
        Then Select the Existing client details in the permanent contract request
        * Fill the placement details and existing client contracts in the permanent contract request
        When The Agency user Review and Submit the permanent placement request details
        Then Permanent placement is generated for the Submitted request in client pending approval status
        Then Review and Approve the permanent placement by client hiring manager user via magic link
        Then Review and Approve the permanent placement by credit risk assitant
        And "<fundingModel>" model Invoices for the "<fundingType>" permanent placement will be generated
        Examples:
            | fundingModel | fundingType |
            | Direct       | Funded      |
            | Indirect     | Funded      |