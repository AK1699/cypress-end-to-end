import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { human_id, permanentPlacementPage, hiring_manager, agency_consultant } from "../../../pages/PermanentPlacementPage";
import { hiringManager } from "../../../pages/PermPlacementRequestPage";
import { storePermanentPlacementID, todayDate } from "../../../utility/functions";
import { homePage } from "../../../pages/HomePage";
import { getPermPlacementDetails } from "../../../utility/api";

Given('permanent placement details', () => {
    cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "perm" }).then((rows) => {
        cy.writeFile("cypress/fixtures/placement/perm.json", { rows });
        cy.log(JSON.stringify(rows));
    });
    permanentPlacementPage.clickCreatePermPlacement()
})
Then('navigate to the permanent placement list page', () => {
    homePage.navigateToPermanentPlacementListPage()
})
And('select the respective currency for the permanent placement', () => {
    permanentPlacementPage.selectCurrency()
})
And('select the funding type as {string} for permanent placement', (fundingType) => {
    permanentPlacementPage.selectFundingType(fundingType)
})
And('select the {string} model agency in the permanent placement form', (fundingModel) => {
    permanentPlacementPage.agencyDetails(fundingModel)
})
And('select the {string} model client in the permanent placement form', (fundingModel) => {
    permanentPlacementPage.clientDetails(fundingModel)
})
And('fill the placement details in the permanent placement form', () => {
    permanentPlacementPage.placementDetails()
    permanentPlacementPage.permanentPlacementInformationBanner('Draft')
})
And('Insert the purchase order number in the permanent placement contract if required', () => {
    permanentPlacementPage.insertPurchaseOrderNumber()
})
Then('Submit the permanent placement for credit risk approval', () => {
    permanentPlacementPage.clickSubmitForCreditRiskApproval()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Credit Risk Approval')
    permanentPlacementPage.logoutUser()
})
Then('Upload the agency proof for agency approval-rejection for permanent placement', () => {
    permanentPlacementPage.clickDocumentsTab()
    permanentPlacementPage.uploadProofForAgencyApproval()
})
Then('Upload the client proof for client approval-rejection for permanent placement', () => {
    permanentPlacementPage.clickDocumentsTab()
    permanentPlacementPage.uploadProofForClientApproval()
})
And('Approve the permanent placement credit limit by credit risk manager user', () => {
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Credit Risk Approval')
    permanentPlacementPage.clickApproveCredit()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Agency Approval')
    cy.logout()
})
And('Approve the permanent placement by internal user on behalf of agency user', () => {
    permanentPlacementPage.clickApprove()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Client Approval')
})
And('select the respective permanent placement', () => {
    permanentPlacementPage.filterContractId()
})
And('Approve the permanent placement by internal user on behalf of client user', () => {
    permanentPlacementPage.clickApprove()
    cy.readFile('cypress/fixtures/placement/perm.json').then(permData => {
        var startDate = permData.rows[0].start_date
        if (startDate > todayDate()) {
            permanentPlacementPage.permanentPlacementInformationBanner('Scheduled')
            cy.log('ℹ️Invoices will be generated once it reaches the given start dateℹ️')
        } else {
            permanentPlacementPage.permanentPlacementInformationBanner('Active')
        }
    })
})
And('Review and Approve the permanent placement by agency user', () => {
    cy.login(agency_consultant)
    homePage.navigateToPermanentPlacementListPage()
    permanentPlacementPage.filterContractId()
    permanentPlacementPage.clickApprove()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Client Approval')
    cy.logout()
})
Then('Review and Approve the permanent placement by client hiring manager user via magic link', () => {
    permanentPlacementPage.clientMagicLinkApproval()
})
And('Review and Approve the permanent placement by client hiring manager user', () => {
    cy.log(hiringManager, hiring_manager)
    cy.login(hiring_manager || hiringManager)
    homePage.navigateToPermanentPlacementListPage()
    permanentPlacementPage.filterContractId()
    permanentPlacementPage.clickApprove()
    cy.logout()
})
And('Review and Approve the permanent placement by credit risk assitant', () => {
    cy.login('CRA')
    homePage.navigateToPermanentPlacementListPage()
    permanentPlacementPage.filterContractId()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Compliance Approval')
    permanentPlacementPage.clickApprove()
    permanentPlacementPage.permanentPlacementInformationBanner('Active')
})
And('Reject & Revert the permanent placement credit limit by credit risk manager user', () => {
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Credit Risk Approval')
    permanentPlacementPage.clickRejectCredit()
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected For Credit Risk')
    permanentPlacementPage.clickRevertCreditRisk()
    permanentPlacementPage.permanentPlacementInformationBanner('Draft')
    cy.logout()
})
And('Review and Reject the permanent placement by agency user', () => {
    cy.login(agency_consultant)
    homePage.navigateToPermanentPlacementListPage()
    permanentPlacementPage.filterContractId()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Agency Approval')
    permanentPlacementPage.clickReject()
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected By Agency')
    cy.logout()
})
And('Review and Reject the permanent placement by client user', () => {
    cy.login(hiring_manager || hiringManager)
    homePage.navigateToPermanentPlacementListPage()
    permanentPlacementPage.filterContractId()
    permanentPlacementPage.clickReject()
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected By Client')
    cy.logout()
})
Then('Review and Reject the permanent placement by client user via magic link', () => {
    permanentPlacementPage.clientMagicLinkRejection()
})
And('Revert and Resubmit the permanent placement for client approval by agency user', (table) => {
    cy.login(agency_consultant)
    homePage.navigateToPermanentPlacementListPage()
    permanentPlacementPage.filterContractId()
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected By Client')
    permanentPlacementPage.clickEdit()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Agency Approval')
    table.hashes().forEach((data) => {
        permanentPlacementPage.clientRejectedAmendments(data.invoiceAmount)
    })
    permanentPlacementPage.clickApprove()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Client Approval')
    cy.logout()
})
And('Revert and Resubmit the permanent placement for agency approval', (table) => {
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected By Agency')
    permanentPlacementPage.clickRevertAgency()
    permanentPlacementPage.permanentPlacementInformationBanner('Draft')
    table.hashes().forEach((data) => {
        permanentPlacementPage.agencyRejectedAmendments(data.invoiceAmount)
    })
    permanentPlacementPage.clickSubmitForCreditRiskApproval()
    permanentPlacementPage.permanentPlacementInformationBanner('Pending Credit Risk Approval')
    cy.logout()
})
And('Reject and Revert the permanent placement by internal user on behalf of agency user', () => {
    permanentPlacementPage.clickReject()
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected By Agency')
    permanentPlacementPage.clickRevertAgency()
    permanentPlacementPage.permanentPlacementInformationBanner('Draft')
})
And('Reject and Revert the permanent placement by internal user on behalf of client user', () => {
    permanentPlacementPage.clickReject()
    permanentPlacementPage.permanentPlacementInformationBanner('Rejected By Client')
    permanentPlacementPage.clickRevertClient()
    permanentPlacementPage.permanentPlacementInformationBanner('Draft')
})
And('Update the agency rejected amendments in the permanent placement contract', (table) => {
    table.hashes().forEach((data) => {
        permanentPlacementPage.agencyRejectedAmendments(data.invoiceAmount)
    })
})
And('Update the client rejected amendments in the permanent placement contract', (table) => {
    table.hashes().forEach((data) => {
        permanentPlacementPage.clientRejectedAmendments(data.invoiceAmount)
    })
})
Then('{string} model Invoices for the {string} permanent placement will be generated', (fundingModel, fundingType) => {
    storePermanentPlacementID(fundingModel, fundingType, human_id)
    permanentPlacementPage.invoicesValidation()
})
Then('Invoices will be generated for the permanent placement', () => {
    permanentPlacementPage.invoicesValidation()
})