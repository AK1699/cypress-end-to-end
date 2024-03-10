import { Given, Then, When, And, Before } from 'cypress-cucumber-preprocessor/steps'
import { agencyPage } from '../../../pages/AgencyPage'
import { getBusinessDetails } from '../../../utility/api';
import { storeAgencyName } from '../../../utility/functions';
import { homePage } from '../../../pages/HomePage';
let funding_model;

And('Submit the agency details for Onboarding', () => {
    agencyPage.clickReviewCreditTab()
    agencyPage.clickSubmitOnboarding()
    agencyPage.agencyInformationBanner('allocated', 'approved')
    agencyPage.logoutUser()
})
When('the Onboarding agent approve the agency details for onboarding', () => {
    // Agency Information Banner check
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('allocated', 'approved')
    agencyPage.clickApproveOnboarding()
})
Given('agency details', () => {
    agencyPage.clickCreateAgency()
})
Then('navigate to agency list page', () => {
    homePage.navigateToAgencyListPage()
})
Then('fill the mandatory fields in agency setup form and insert', () => {
    agencyPage.insertBasicInformation()
    agencyPage.agencyInformationBanner('draft', 'draft')
})
Then('fill the mandatory fields within each tabs of agency pre-vetting details', () => {
    agencyPage.vatApplicable('yes')
})
And('Submit the agency pre-vetting details for approval', () => {
    agencyPage.clickSubmitPrevetting()
    agencyPage.agencyInformationBanner('submitted', 'draft')
    agencyPage.logoutUser()
})
Then('Approve the agency pre-vetting details', () => {
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('submitted', 'draft')
    agencyPage.clickApprovePrevetting()
    agencyPage.agencyInformationBanner('approved', 'draft')
    agencyPage.logoutUser()
})
Then('fill all the mandatory fields within each tabs of agency compliance details', () => {
    // Agency Information Banner check
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('approved', 'draft')
    agencyPage.clickComplianceTab()
    // Address Tab
    agencyPage.insertAddress()
    // Bank Account Tab
    agencyPage.insertBankAccount()
    // Basic Info Tab
    agencyPage.enableSelfServeRequest()
    agencyPage.uploadAgencyLogo()
    // KYC Tab
    agencyPage.insertKycDetails({ mandatoryKycFields: "yes" })
    // Directors Tab
    agencyPage.insertDirectorUser()
    agencyPage.insertDirectorAddress()
    agencyPage.insertDirectorPassportId()
    agencyPage.insertDirectorProofOfAddress()
    // Terms of Business Tab
    agencyPage.insertTermsOfBusinessDetails()
})
Then('Submit the agency compliance details for approval', () => {
    agencyPage.clickComplianceTab()
    agencyPage.clickSubmitCompliance()
    agencyPage.agencyInformationBanner('approved', 'submitted')
    agencyPage.logoutUser()
})
And('select the repective agency', () => {
    agencyPage.filterAgencyHumanID()
})
Then('Approve the agency compliance details', () => {
    // Agency Information Banner check
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('approved', 'submitted')
    // Compliance details approval
    agencyPage.clickApproveCompliance()
    agencyPage.agencyInformationBanner('approved', 'approved')
    agencyPage.logoutUser()
})
Then('fill the mandatory fields within each tabs of agency allocation details and map with {string} funder', (fundingModel) => {
    // Agency Information Banner check
    cy.log(fundingModel)
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('approved', 'approved')
    // Funder Tab
    agencyPage.mapFunder(fundingModel)
    // Service charges Tab
    agencyPage.insertServiceCharges(fundingModel)
    // Agency users
    agencyPage.insertAgencyUsers()
    // Staff Users
    agencyPage.insertStaffUsers()
})
Then('fill the mandatory fields within each tabs of agency allocation details and map with funder', () => {
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('approved', 'approved')
    // Funder Tab
    agencyPage.mapFunder('Indirect')
    // Service charges Tab
    agencyPage.insertServiceCharges('Indirect')
    // Agency users
    agencyPage.insertAgencyUsers()
    // Staff Users
    agencyPage.insertStaffUsers()
})
And('Request credit limit for the agency', () => {
    agencyPage.clickAllocationTab()
    agencyPage.clickRequestCreditLimit()
    agencyPage.agencyInformationBanner('requested', 'approved')
    agencyPage.logoutUser()
})
Then('Add the credit limit for agency', () => {
    // Agency Information Banner check
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('requested', 'approved')
    // Add the funder credit limit to agency
    agencyPage.AddCreditLimit()
})
Then('Reject and Revert the agency compliance details', () => {
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('approved', 'submitted')
    agencyPage.clickRejectCompliance()
    agencyPage.agencyInformationBanner('approved', 'rejected')
    agencyPage.clickEdit()
    agencyPage.agencyInformationBanner('approved', 'draft')
    agencyPage.logoutUser()
})
Then('{string} funder mapped Agency is successfully onboarded', (fundingModel) => {
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
    agencyPage.agencyInformationBanner('onboarded', 'approved')
    cy.wait(120000)
    agencyPage.directorAccountSetUp('app')
    cy.login('OA1')
    agencyPage.consultantAccountSetUp('app')
    cy.login('OA1')
    agencyPage.readOnlyAccountSetUp('app')
    cy.login('OA1')
    agencyPage.adminAccountSetUp('app')
    storeAgencyName(fundingModel)
})
Then('Reject and Revert the agency pre-vetting details', () => {
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('submitted', 'draft')
    agencyPage.clickRejectPrevetting()
    agencyPage.agencyInformationBanner('rejected', 'draft')
    agencyPage.clickEdit()
    agencyPage.agencyInformationBanner('draft', 'draft')
    agencyPage.logoutUser()
})
Then('Agency is successfully onboarded', () => {
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid)
    })
    agencyPage.agencyInformationBanner('onboarded', 'approved')
    cy.wait(120000)
    agencyPage.directorAccountSetUp('app')
    cy.login('OA1')
    agencyPage.consultantAccountSetUp('app')
    cy.login('OA1')
    agencyPage.readOnlyAccountSetUp('app')
    cy.login('OA1')
    agencyPage.adminAccountSetUp('app')
})
Then('Reject and Revert the agency onboarding details', () => {
    agencyPage.filterAgencyHumanID()
    agencyPage.agencyInformationBanner('allocated', 'approved')
    agencyPage.clickRejectOnboarding()
    agencyPage.agencyInformationBanner('rejected', 'draft')
    agencyPage.clickPrevettingTab()
    agencyPage.clickEdit()
    agencyPage.agencyInformationBanner('draft', 'draft')
    agencyPage.logoutUser()
})
Then('fill the invalid brn number and invalid email address of the agency into the agency setup form', (table) => {
    table.hashes().forEach((invalidData) => {
        agencyPage.insertBasicInformation(invalidData.brn, invalidData.email)
    })
})
Before(()=>{
    if(funding_model == 'Direct'){
        cy.wait(5000)
    }
})