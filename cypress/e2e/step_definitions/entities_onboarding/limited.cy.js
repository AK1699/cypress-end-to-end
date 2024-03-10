import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import { getBusinessDetails } from "../../../utility/api";
import { limitedPage } from "../../../pages/LimitedPage";
import { storeLimitedName } from "../../../utility/functions";
import { homePage } from "../../../pages/HomePage";

Then('navigate to the limited company list page', () => {
    homePage.navigateToLimitedListPage()
})
Then('fill the mandatory fields in the limited company setup form', () => {
    limitedPage.insertBasicInformation()
    limitedPage.limitedCompanyInformationBanner('draft')
})
Then('Submit the limited company details for onboarding', () => {
    limitedPage.clickSubmitOnboarding()
    limitedPage.limitedCompanyInformationBanner('submitted')
    limitedPage.logoutUser()
})
Given('limited company details', () => {
    limitedPage.clickCreateLimitedCompany()
})
Then('fill the invalid brn number and invalid email address in the limited company setup form', (table) => {
    table.hashes().forEach(invalidData => {
        limitedPage.insertBasicInformation(invalidData.brn, invalidData.email)
    })
})
And('enable the toggle if vat applicable for limited company', () => {
    limitedPage.vatApplicable('yes')
})
And('select the respective limited company', () => {
    limitedPage.filterLimitedCompanyHumanId()
})
And('insert the limited company address', () => {
    limitedPage.insertAddress()
})
And('insert the limited company bank account', () => {
    limitedPage.insertBankAccount()
})
And('update the basic information for the limited company', () => {
    limitedPage.updateBasicInfo()
})
And('insert the required kyc documents for the limited company', () => {
    limitedPage.insertCompaniesHouse()
    limitedPage.insertCreditSafe()
    limitedPage.insertProofOfAddress()
})
Then('Approve the onboarding details of the limited company', () => {
    limitedPage.limitedCompanyInformationBanner('submitted')
    limitedPage.clickApproveOnboard()
    limitedPage.limitedCompanyInformationBanner('onboarded')
    cy.wait(3000)
})
And('Reject and Revert the limited company details', () => {
    limitedPage.clickRejectOnboard()
    limitedPage.limitedCompanyInformationBanner('rejected')
    limitedPage.clickEdit()
    limitedPage.limitedCompanyInformationBanner('draft')
    limitedPage.logoutUser()
})
Then('the limited company is onboarded successfully', () => {
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        cy.log(uuid)
        getBusinessDetails(uuid)
    })
    storeLimitedName()
})
