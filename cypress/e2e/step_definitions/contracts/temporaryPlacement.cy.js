import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { human_id, temporaryPlacementPage } from "../../../pages/TemporaryPlacementPage";
import { getContractInfo } from "../../../utility/api";
import { agencyConsultant } from "../../../pages/AgencyPage";
import { hiringManager, contractorEmail } from "../../../pages/TemporaryPlacementRequestPage";
import { hiring_manager, agency_consultant, contractor } from "../../../pages/TemporaryPlacementPage";
import { storeTemporaryPlacementId, storeTimesheets } from "../../../utility/functions";
import { homePage } from "../../../pages/HomePage";
import { contractorPage } from "../../../pages/ContractorPage";
import { limitedPage } from "../../../pages/LimitedPage";
Given('temporary placement details', () => {
    temporaryPlacementPage.clickCreateTempPlacementButton()
})
Then('navigate to the temporary placement list page', () => {
    homePage.navigateToTemporaryPlacementListPage()
})
Then('select the funding type {string} in temporary placement form', (fundingType) => {
    temporaryPlacementPage.selectFundingType(fundingType)
})
And('select the currency in the temporary placement form', () => {
    temporaryPlacementPage.selectCurrency()
})
And('select the {string} model agency in the temporary placement form', (fundingModel) => {
    temporaryPlacementPage.agencyDetails(fundingModel)
})
And('select the {string} model client in the temporary placement form', (fundingModel) => {
    temporaryPlacementPage.clientDetails(fundingModel)
})
And('select the {string} model contractor in the temporary placement form', (fundingModel) => {
    temporaryPlacementPage.contractorDetails(fundingModel)
})
And('fill the placement details in the temporary placement form', () => {
    temporaryPlacementPage.placementDetails()
})
And('select the {string} frequency in the temporary placement form', (timesheetFrequency) => {
    temporaryPlacementPage.timesheetDetails(timesheetFrequency)
})
Then('fill the standard rate details according to the unit type-{string} in the temporary placement form', (unitType) => {
    temporaryPlacementPage.standardRateDetails(unitType)
})
And('Add the Additional rate according to the unit type-{string} in the temporary placement form, if required', (unitType) => {
    temporaryPlacementPage.additionalRateDetails(unitType, { additionalRateEntry: 'No' })
})
Then('Submit the temporary placement for Agency Approval', () => {
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
    temporaryPlacementPage.clickSubmitForAgencyApproval()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Agency Approval')
})
And('Approve the temporary placement on behalf of Agency user', () => {
    temporaryPlacementPage.clickApprove()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Client Approval')
})
And('upload the Proof for Agency Approval-Rejection for the temporary placement', () => {
    temporaryPlacementPage.clickDocumentsTab()
    temporaryPlacementPage.uploadProofForAgencyApproval()
})
And('upload the Proof for Client Approval-Rejection for the temporary placement', () => {
    temporaryPlacementPage.clickDocumentsTab()
    temporaryPlacementPage.uploadProofForClientApproval()
})
And('upload the Proof for Contractor Approval-Rejection for the temporary placement', () => {
    temporaryPlacementPage.clickDocumentsTab()
    temporaryPlacementPage.uploadProofForContractorAcceptance()
})
And('Review and Approve the temporary placement by agency user', () => {
    cy.login(agency_consultant || agencyConsultant)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Agency Approval')
    temporaryPlacementPage.clickApprove()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Client Approval')
    cy.logout()
})
Then('Review and Approve the temporary placement by client hiring manager user via magic link', () => {
    temporaryPlacementPage.clientMagicLinkApproval()
})
And('Review and Approve the temporary placement by client hiring manager user', () => {
    cy.login(hiring_manager || hiringManager)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Client Approval')
    temporaryPlacementPage.clickApprove()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Contractor Approval')
    cy.logout()
})
And('Select the Existing {string} Payment Company and Accept the temporary placement by contractor user', (paymentType) => {
    cy.login(contractor || contractorEmail)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.selectExistingPaymentCompanyByContractorUser(paymentType)
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Contractor Approval')
    temporaryPlacementPage.clickAccept()
    cy.logout()
})
And('Fill the New {string} Payment Company in the temporary placement by contractor user', (paymentType) => {
    cy.login('OA1')
    cy.wait(120000)
    contractorPage.contractorAccountSetUp('app', paymentType)
    cy.login(contractor || contractorEmail)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.selectNewPaymentCompanyByContractorUser(paymentType)
})
And('Accept the temporary placement by contractor user with Newly Updated {string} Payment Company', (paymentType) => {
    if (paymentType == 'Umbrella') {
        cy.login('OA1')
        cy.wait(120000)
        contractorPage.contractorAccountSetUp('app', paymentType)
        cy.login(contractor || contractorEmail)
        homePage.navigateToTemporaryPlacementListPage()
        temporaryPlacementPage.filterContractId()
        temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Contractor Approval')
        temporaryPlacementPage.clickAccept()
        cy.logout()
    } else if (paymentType == 'Limited') {
        cy.logout()
        cy.login("OA1")
        homePage.navigateToTemporaryPlacementListPage()
        temporaryPlacementPage.filterContractId()
        temporaryPlacementPage.limitedCompanytoolTipMessage()
        homePage.navigateToLimitedListPage()
        limitedPage.onboardLimitedCompanyGenearatedForTempRequest()
        cy.login(contractor || contractorEmail)
        homePage.navigateToTemporaryPlacementListPage()
        temporaryPlacementPage.filterContractId()
        temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Contractor Approval')
        temporaryPlacementPage.clickAccept()
        cy.logout()
    }
})
And('Review and Accept the temporary placement by contractor user', () => {
    cy.login(contractor || contractorEmail).wait(5000)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Contractor Approval')
    temporaryPlacementPage.clickAccept()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Compliance Approval')
    cy.logout()
})
And('Review and Reject the temporary placement by agency user', () => {
    cy.login(agency_consultant || agencyConsultant)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.clickReject()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected By Agency')
    cy.logout()
})
Then('Review and Reject the temporary placement by client hiring manager user via magic link', () => {
    temporaryPlacementPage.clientMagicLinkRejection()
})
And('Review and Reject the temporary placement by client hiring manager user', () => {
    cy.log(hiringManager, hiring_manager)
    cy.login(hiring_manager || hiringManager)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.clickReject()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected By Client')
    cy.logout()
})

And('Review and Reject the temporary placement by contractor user', () => {
    cy.login(contractor || contractorEmail)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.clickReject()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected')
    cy.logout()
})
When('The Credit Risk Assistant user reviews and accepts the temporary placement', () => {
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Compliance Approval')
    temporaryPlacementPage.clickAccept()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Active')
})
And('Reject and Revert the temporary placement by internal user on behalf of agency user', () => {
    temporaryPlacementPage.clickReject()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected By Agency')
    temporaryPlacementPage.clickEdit()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
})
And('Revert and Resubmit the temporary placement for Agency approval', (table) => {
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected By Agency')
    temporaryPlacementPage.clickEdit()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
    table.hashes().forEach(dataChanges => {
        temporaryPlacementPage.agencyRejectedChanges(dataChanges.contractorRate, dataChanges.clientRate)
    })
    temporaryPlacementPage.clickSubmitForAgencyApproval()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Agency Approval')
    cy.logout()
})
And('Revert and Resubmit the temporary placement for client approval by agency user', (table) => {
    cy.login(agency_consultant || agencyConsultant)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected By Client')
    temporaryPlacementPage.clickEdit()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Agency Approval')
    table.hashes().forEach(dataChanges => {
        temporaryPlacementPage.clientRejectedChanges(dataChanges.startDate, dataChanges.endDate)
    })
    temporaryPlacementPage.clickApprove()
    cy.logout()
})
And('Revert and Resubmit the temporary placement for contractor approval', (table) => {
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected')
    temporaryPlacementPage.clickEdit()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
    table.hashes().forEach(dataChanges => {
        temporaryPlacementPage.contractorRejectedChanges(dataChanges.contractorRate)
    })
    temporaryPlacementPage.clickSubmitForAgencyApproval()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Agency Approval')
})
Then('make the agency rejected amendements in the temporary placement', (table) => {
    table.hashes().forEach(dataChanges => {
        temporaryPlacementPage.agencyRejectedChanges(dataChanges.contractorRate, dataChanges.clientRate)
    })
})
Then('make the client rejected amendements in the temporary placement', (table) => {
    table.hashes().forEach(dataChanges => {
        temporaryPlacementPage.clientRejectedChanges(dataChanges.startDate, dataChanges.endDate)
    })
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
})
Then('make the contractor rejected amendements in the temporary placement', (table) => {
    table.hashes().forEach(dataChanges => {
        temporaryPlacementPage.contractorRejectedChanges(dataChanges.contractorRate)
    })
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
})
And('Approve the temporary placement on behalf of Client user', () => {
    temporaryPlacementPage.clickApprove()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Contractor Approval')
})
And('Accept the temporary placement on behalf of Contractor user', () => {
    temporaryPlacementPage.clickAccept()
    // temporaryPlacementPage.temporaryPlacementInformationBanner('Active')
})
And('Reject and Revert the temporary placement by internal user on behalf of client user', () => {
    temporaryPlacementPage.clickReject()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected By Client')
    temporaryPlacementPage.clickEdit()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
})
And('Reject and Revert the temporary placement by internal user on behalf of contractor user', () => {
    temporaryPlacementPage.clickReject()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Rejected')
    temporaryPlacementPage.clickEdit()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Draft')
})
And('select the respective temporary placement', () => {
    temporaryPlacementPage.filterContractId()
})
Then('{string}-{string} Timesheets should get autogenerated for the {string} model maped entites with funding type as {string}', (timesheetFrequency, unitType, fundingModel, fundingType) => {
    storeTemporaryPlacementId(fundingModel, fundingType, human_id)
    temporaryPlacementPage.timesheetsGenerationCheck()
    storeTimesheets(timesheetFrequency, unitType, fundingModel, fundingType)
})
Then('Timesheets should get autogenerated', () => {
    cy.url().then((url) => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/")
        var uuid = splitedUrl[5];
        getContractInfo(uuid);
        temporaryPlacementPage.timesheetsGenerationCheck(uuid)
    })
})

Then('navigate to temp placement list page from the placement view page', () => {
    temporaryPlacementPage.navigateToListPageFromPlacementPage()
})

Then('Filter the ID and chase the Pending client approval', () => {
    temporaryPlacementPage.filterPlacementIdForChaser()
    temporaryPlacementPage.chasePendingClientApproval()
    cy.logout()
})
Then('Verify the mail sent to the Hiring manager', () => {
    cy.login('PA') // our platform can't sent API req by external user 
    temporaryPlacementPage.checkMailForPendingClientPlacementChaser()
})
And('Login as an agency user, approve their placement, and then chase the pending client placement', () => {

    cy.logout()
    cy.login(agency_consultant || agencyConsultant)
    homePage.navigateToTemporaryPlacementListPage()
    temporaryPlacementPage.filterContractId()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Agency Approval')
    temporaryPlacementPage.clickApprove()
    temporaryPlacementPage.temporaryPlacementInformationBanner('Pending Client Approval')

})