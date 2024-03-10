import { Given, Then, When, And, Before } from 'cypress-cucumber-preprocessor/steps'
import { clientPage } from '../../../pages/ClientPage';
import { homePage } from '../../../pages/HomePage';
import { getBusinessDetails } from '../../../utility/api';
import { storeClientName } from '../../../utility/functions';
import { temporaryPlacementPage } from '../../../pages/TemporaryPlacementPage';
import { permanentPlacementPage } from '../../../pages/PermanentPlacementPage';

Given('client details', () => {
    clientPage.clickCreateClient()
})
Then('navigate to the client list page', () => {
    homePage.navigateToClientListPage()
})
Then('fill the mandatory fields in the client setup form', () => {
    clientPage.insertBasicInformation()
    clientPage.clientInformationBanner('draft', 'draft')
})
Then('fill the invalid brn and invalid email address into the client setup form', (table) => {
    table.hashes().forEach((invalidData) => {
        clientPage.insertBasicInformation(invalidData.brn, invalidData.email)
    })
})
Then('Onboard the new client generated for the temp request', () => {
    temporaryPlacementPage.clienttoolTipMessage()
    // Updating Basic info
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.fillBasicInfoDetails()
    clientPage.vatApplicable('yes')
    // Credit Limit submission
    clientPage.clickRequestCreditLimit()
    cy.logout()
    // Credit Limit Approval
    cy.login('CRA')
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.addCreditLimit()
    clientPage.clickReviewCreditTab()
    clientPage.clickApproveCreditLimit()
    cy.logout()
    // Compliance submission
    cy.login('OA1')
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.clickComplianceTab()
    clientPage.clickKycTab()
    clientPage.insertKycDetails({ mandatoryKycFields: 'yes' })
    clientPage.updateBasicInfo()
    clientPage.uploadTermsOfBusiness()
    clientPage.addSupportUsers()
    clientPage.clickComplianceTab()
    clientPage.clickSubmitCompliance()
    cy.logout()
    // Compliance Approval
    cy.login('CA')
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.clickComplianceTab()
    clientPage.clickApprove()

    // New Client users Account Set up in platform
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid)
    })
    cy.wait(120000)
    clientPage.hiringManagerAccountSetup('app')
    cy.login('OA1')
    clientPage.timesheetApproverAccountSetup('app')
    cy.login('OA1')
    clientPage.invoiceContactAccountSetup('app')
})
And('Setup the new client contracts given in temp request in the raise platform', () => {
    // New Client users Account Set up in platform
    cy.login('OA1')
    cy.wait(120000)
    clientPage.hiringManagerAccountSetup('app')
    cy.login('OA1')
    clientPage.timesheetApproverAccountSetup('app')
    cy.login('OA1')
    clientPage.invoiceContactAccountSetup('app')
})
And('Setup the new client contracts given in perm request in the raise platform', () => {
    // New Client users Account Set up in platform
    cy.login('OA1')
    cy.wait(120000)
    clientPage.hiringManagerAccountSetup('app')
    cy.login('OA1')
    clientPage.invoiceContactAccountSetup('app')
})
Then('Onboard the new client generated for the perm request', () => {
    permanentPlacementPage.toolTipMessage()
    // Updating Basic info
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.fillBasicInfoDetails()
    clientPage.vatApplicable('yes')
    // Credit Limit submission
    clientPage.clickRequestCreditLimit()
    cy.logout()
    // Credit Limit Approval
    cy.login('CRA')
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.addCreditLimit()
    clientPage.clickReviewCreditTab()
    clientPage.clickApproveCreditLimit()
    cy.logout()
    // Compliance submission
    cy.login('OA1')
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.clickComplianceTab()
    clientPage.clickKycTab()
    clientPage.insertKycDetails({ mandatoryKycFields: 'yes' })
    clientPage.updateBasicInfo()
    // clientPage.uploadTermsOfBusiness()
    clientPage.addSupportUsers()
    clientPage.clickComplianceTab()
    clientPage.clickSubmitCompliance()
    cy.logout()
    // Compliance Approval
    cy.login('CA')
    homePage.navigateToClientListPage()
    clientPage.filterClientHumanId()
    clientPage.clickComplianceTab()
    clientPage.clickApprove()

    // New Client users Account Set up in platform
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid)
    })
    cy.wait(120000)
    clientPage.hiringManagerAccountSetup('app')
    cy.login('OA1')
    clientPage.invoiceContactAccountSetup('app')
})
Then('fill all the mandatory fields within each tabs of client Credit Limit Request details and also map the {string} Agency', (fundingModel) => {
    // Basic Information
    clientPage.insertCreditSafeReport()
    // Address
    clientPage.insertAddress()
    // Currency & VAT
    clientPage.vatApplicable('yes')
    // Mapping Agency
    clientPage.mapAgency(fundingModel)
})
Then('fill all the mandatory fields within each tabs of client Credit Limit Request details', () => {
    // Basic Information
    clientPage.insertCreditSafeReport()
    // Address
    clientPage.insertAddress()
    // Currency & VAT
    clientPage.vatApplicable('yes')
    // Mapping Agency
    clientPage.mapAgency('Direct')
})
And('Request credit limit for client', () => {
    clientPage.clickRequestCreditLimit()
    clientPage.clientInformationBanner('requested', 'draft')
    cy.logout()
})
Then('Add the credit limit for client', () => {
    clientPage.addCreditLimit()
})
Then('Update with new client credit limit', (table) => {
    table.hashes().forEach(value => {
        clientPage.updateCreditLimit(value.creditLimit)
    })
})
And('Approve the client credit limit', () => {
    clientPage.clickReviewCreditTab()
    clientPage.clientInformationBanner('requested', 'draft')
    clientPage.clickApproveCreditLimit()
    clientPage.clientInformationBanner('reviewed', 'draft')
    cy.logout()
})
And('Reject and Revert client credit limit', () => {
    clientPage.clientInformationBanner('requested', 'draft')
    clientPage.clickRejectCreditLimit()
    clientPage.clientInformationBanner('rejected', 'draft')
    clientPage.clickCreditLimitRequestTab()
    clientPage.clickEdit()
    clientPage.clientInformationBanner('draft', 'draft')
    cy.logout()
})
And('Reject and Revert client compliance details', () => {
    clientPage.clickComplianceTab()
    clientPage.clientInformationBanner('reviewed', 'submitted')
    clientPage.clickReject()
    clientPage.clientInformationBanner('reviewed', 'rejected')
    clientPage.clickEdit()
    clientPage.clientInformationBanner('reviewed', 'draft')
    cy.logout()
})
And('select the respective client', () => {
    clientPage.filterClientHumanId()
})
Then('fill all the mandatory fields within each tabs of client compliance detail', () => {
    clientPage.clickComplianceTab()
    // Client Users
    clientPage.addClientUsers()
    // KYC
    clientPage.clickKycTab()
    clientPage.insertKycDetails({ mandatoryKycFields: 'yes' })
    // Basic info
    clientPage.updateBasicInfo()
    // Terms of Business
    clientPage.uploadTermsOfBusiness()
    // Staff users
    clientPage.addSupportUsers()
})
And('Submit the client compliance details for approval', () => {
    clientPage.clickComplianceTab()
    clientPage.clientInformationBanner('reviewed', 'draft')
    clientPage.clickSubmitCompliance()
    clientPage.clientInformationBanner('reviewed', 'submitted')
    cy.logout()
})
Then('Approve the client compliance details', () => {
    clientPage.clickComplianceTab()
    clientPage.clientInformationBanner('reviewed', 'submitted')
    clientPage.clickApprove()
})
And('{string} model Agency mapped Client is successfully onboarded', (fundingModel) => {
    if(fundingModel == 'Direct'){
        cy.wait(50000)
    }
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid)
    })
    storeClientName(fundingModel)
    clientPage.clientInformationBanner('onboarded', 'approved')
    cy.wait(120000)
    clientPage.hiringManagerAccountSetup('app')
    cy.login('OA1')
    clientPage.timesheetApproverAccountSetup('app')
    cy.login('OA1')
    clientPage.invoiceContactAccountSetup('app')
})
And('Client is Successfully Onboarded into the platform', () => {
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid)
    })
    clientPage.clientInformationBanner('onboarded', 'approved')
    cy.wait(120000)
    clientPage.hiringManagerAccountSetup('app')
    cy.login('OA1')
    clientPage.timesheetApproverAccountSetup('app')
    cy.login('OA1')
    clientPage.invoiceContactAccountSetup('app')
})