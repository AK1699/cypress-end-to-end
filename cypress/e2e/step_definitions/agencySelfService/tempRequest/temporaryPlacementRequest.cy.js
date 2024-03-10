import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { homePage } from '../../../../pages/HomePage'
import { agencyPage, agencyConsultant } from "../../../../pages/AgencyPage";
import { tempRequestPage, agencyName } from "../../../../pages/TemporaryPlacementRequestPage";
import { noticePeriod, getCurrency, paymentTerms, industries } from "../../../../utility/api";
import { esignRequiredForClientSchedule, esignRequiredForContractorSchedule } from "../../../../utility/functions";

Then('validate whether the placement schedule feature is enabled for {string} model agency', (fundingModel) => {
    cy.login('OA1')
    homePage.navigateToAgencyListPage()
    agencyPage.selectAgency(fundingModel)
    agencyPage.selectAgency(fundingModel).then(() => {
        agencyPage.filterAgencyHumanID();
    })
    agencyPage.scheduleFeature()
})
Then('{string} model Agency business is allowed to make a self serve request for temporary placement', (fundingModel) => {
    homePage.navigateToAgencyListPage()
    agencyPage.selectAgency(fundingModel)
    agencyPage.selectAgency(fundingModel).then(() => {
        agencyPage.filterAgencyHumanID();
    })
    agencyPage.isRequestAllowed()
    cy.logout()
})
Given('{string} contractor and {string} model entities details to create a temp request', (paymentType, fundingModel) => {
    cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "temp" }).then((rows) => {
        cy.writeFile("cypress/fixtures/placement/temp.json", { rows });
        cy.log(JSON.stringify(rows));
    });
    cy.login("OA1")
    noticePeriod()
    getCurrency()
    paymentTerms()
    industries()
    agencyPage.selectAgency(fundingModel)
    tempRequestPage.getExistingContractor(paymentType, fundingModel)
    tempRequestPage.getExistingClient(fundingModel)
})
Then('login as agency user to create a new temporary placement request', () => {
    cy.login(agencyConsultant)
})
And('navigate to the temporary placement request list page', () => {
    homePage.navigateToTemporaryPlacementRequestListPage()
})
Then('Select the Existing {string} contractor details in the temp request form', (paymentType) => {
    tempRequestPage.clickNewRequest()
    tempRequestPage.selectContractor(paymentType)
})
And('Select the {string} payment company by agency user in the temp request form', (paymentType) => {
    tempRequestPage.selectExistingPaymentCompanyByAgencyUser(paymentType)
    tempRequestPage.clickSaveAndNext()
})
Then('Select the Existing client details in the temp request form', () => {
    tempRequestPage.selectClient()
    tempRequestPage.clickSaveAndNext()
})
Then('Select the New {string} Payment Company in the temp request by agency user', (paymentType) => {
    tempRequestPage.selectNewPaymentCompanyByAgencyUser(paymentType)
})
Then('Fill the {string}-{string} placement details and existing client contacts in the temp request form', (timesheetFrequency, unitType) => {
    tempRequestPage.placementDetails(timesheetFrequency, unitType, { additionalRateEntry: 'no' })
    tempRequestPage.selectExistingClientContacts()
    tempRequestPage.clickSaveAndNext()
})
And('Select the AgencyEsign is {string} in Agency-Client Schedule, ClientEsign is {string} in Agency-Client Schedule, AgencyEsign is {string} in Agency-Contractor Schedule and ContractorEsign is {string} in Agency-Contractor Schedule in the temp request form', (agencyToClientScheduleAgencyEsign, agencyToClientScheduleClientEsign, agencyToContractorScheduleAgencyEsign, agencyToContractorScheduleContractorEsign) => {
    if (agencyToClientScheduleAgencyEsign === 'Not Required' && agencyToClientScheduleClientEsign === 'Not Required' && agencyToContractorScheduleAgencyEsign === 'Not Required' && agencyToContractorScheduleContractorEsign === 'Not Required') {
        esignRequiredForClientSchedule({ agencyEsign: 'No', clientEsign: 'No' });
        esignRequiredForContractorSchedule({ agencyEsign: 'No', contractorEsign: 'No' });
    } else if (agencyToClientScheduleAgencyEsign === 'Required' && agencyToClientScheduleClientEsign === 'Required' && agencyToContractorScheduleAgencyEsign === 'Required' && agencyToContractorScheduleContractorEsign === 'Required') {
        esignRequiredForClientSchedule({ agencyEsign: 'Yes', clientEsign: 'Yes' });
        esignRequiredForContractorSchedule({ agencyEsign: 'Yes', contractorEsign: 'Yes' });
    } else if (agencyToClientScheduleAgencyEsign === 'Not Required' && agencyToContractorScheduleAgencyEsign === 'Not Required' && agencyToClientScheduleClientEsign === 'Required' && agencyToContractorScheduleContractorEsign === 'Required') {
        esignRequiredForClientSchedule({ agencyEsign: 'No', clientEsign: 'Yes' });
        esignRequiredForContractorSchedule({ agencyEsign: 'No', contractorEsign: 'Yes' });
    }
})
Then('Fill the {string}-{string} placement details and new client contacts in the temp request form', (timesheetFrequency, unitType) => {
    tempRequestPage.placementDetails(timesheetFrequency, unitType, { additionalRateEntry: 'no' })
    tempRequestPage.insertNewClientContacts()
    tempRequestPage.clickSaveAndNext()
})
Then('Fill the {string}-{string} placement details, new client contacts and {string} schedule details in the temp request form', (timesheetFrequency, unitType, schedule) => {
    tempRequestPage.placementDetails(timesheetFrequency, unitType, { additionalRateEntry: 'no' })
    tempRequestPage.insertNewClientContacts()
    cy.log(schedule)
    if (schedule == `esignRequiredForClientSchedule({ agencyEsign: 'No', clientEsign: 'No' }), esignRequiredForContractorSchedule({ agencyEsign: 'No', contractorEsign: 'No' })`) {
        esignRequiredForClientSchedule({ agencyEsign: 'No', clientEsign: 'No' })
        esignRequiredForContractorSchedule({ agencyEsign: 'No', contractorEsign: 'No' })
    } else if (schedule == `esignRequiredForClientSchedule({ agencyEsign: 'Yes', clientEsign: 'Yes' }), esignRequiredForContractorSchedule({ agencyEsign: 'Yes', contractorEsign: 'Yes' })`) {
        esignRequiredForClientSchedule({ agencyEsign: 'Yes', clientEsign: 'Yes' })
        esignRequiredForContractorSchedule({ agencyEsign: 'Yes', contractorEsign: 'Yes' })
    } else if (schedule == `esignRequiredForClientSchedule({ agencyEsign: 'No', clientEsign: 'Yes' }), esignRequiredForContractorSchedule({ agencyEsign: 'No', contractorEsign: 'Yes' })`) {
        esignRequiredForClientSchedule({ agencyEsign: 'No', clientEsign: 'Yes' })
        esignRequiredForContractorSchedule({ agencyEsign: 'No', contractorEsign: 'Yes' })
    }
    tempRequestPage.clickSaveAndNext()
})
Then('Fill the New {string} contractor details in the temp request form', (paymentType) => {
    tempRequestPage.inputNewContractorDetails(paymentType)
})
Then('Fill the New Client details in the temp request form', () => {
    tempRequestPage.inputNewClientDetails()
})
When('The Agency user Review and Submit the temporary placement request details', () => {
    tempRequestPage.clickSubmit()
    tempRequestPage.requestInformationBanner('Pending Approval')
})
Then('Temporary placement is generated for the Submitted request in client pending approval status', () => {
    tempRequestPage.temporaryPlacementGeneration()
})
Then('Temporary placement is generated for the Submitted request in awaiting raise approval status', () => {
    tempRequestPage.temporaryPlacementGeneration()
})