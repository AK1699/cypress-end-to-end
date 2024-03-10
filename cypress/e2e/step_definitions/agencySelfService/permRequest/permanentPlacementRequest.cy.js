import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { getCurrency, industries, noticePeriod, paymentTerms } from "../../../../utility/api";
import { agencyPage, agencyConsultant } from "../../../../pages/AgencyPage";
import { permRequestPage } from "../../../../pages/PermPlacementRequestPage";
import { homePage } from "../../../../pages/HomePage";

Given('{string} model agency to create a permanent contract request', (fundingModel) => {
    cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "perm" }).then((rows) => {
        cy.writeFile("cypress/fixtures/placement/perm.json", { rows });
        cy.log(JSON.stringify(rows));
    });
    cy.login("OA1").wait(4000);
    noticePeriod()
    getCurrency()
    paymentTerms()
    industries()
    agencyPage.selectAgency(fundingModel)
    permRequestPage.getExistingClient(fundingModel)
})
Then('{string} model Agency business is allowed to make a self serve request for permanent placement', (fundingModel) => {
    homePage.navigateToAgencyListPage()
    agencyPage.selectAgency(fundingModel)
    agencyPage.selectAgency(fundingModel).then(() => {
        agencyPage.filterAgencyHumanID();
    })
    permRequestPage.getExistingClient(fundingModel)
    agencyPage.isRequestAllowed()
    cy.logout()
})
Then('login as agency user to create a new permanent placement request', () => {
    cy.login(agencyConsultant)
})

And('navigate to the permanent placement request list page', () => {
    homePage.navigateToPermanentPlacementRequestListPage()
})
Then('Fill the placement details and existing client contracts in the permanent contract request', () => {
    permRequestPage.placementDetails()
    permRequestPage.selectExistingClientContracts()
    permRequestPage.clickSaveAndNext()
})
Then('Fill the New client details in the permanent contract request', () => {
    permRequestPage.clickNewRequest()
    permRequestPage.inputNewClientDetails()
})
Then('Fill the placement details and New client contacts in the permanent contract request', () => {
    permRequestPage.placementDetails()
    permRequestPage.insertNewClientContacts()
    permRequestPage.clickSaveAndNext()
})
Then('Select the Existing client details in the permanent contract request', () => {
    permRequestPage.clickNewRequest()
    permRequestPage.selectClient()
    permRequestPage.clickSaveAndNext()
})
Then('')
When('The Agency user Review and Submit the permanent placement request details', () => {
    permRequestPage.clickSubmit()
    permRequestPage.requestInformationBanner('Pending Approval')
})
Then('Permanent placement is generated for the Submitted request in client pending approval status', () => {
    permRequestPage.permanentPlacementGeneration()
})
Then('Permanent placement is generated for the Submitted request in awaiting raise approval status', () => {
    permRequestPage.permanentPlacementGeneration()
})
