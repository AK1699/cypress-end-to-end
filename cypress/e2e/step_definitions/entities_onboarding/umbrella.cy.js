import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { umbrellaPage } from "../../../pages/UmbrellaPage";
import { getBusinessDetails } from "../../../utility/api";
import { storeUmbrellaName } from "../../../utility/functions";
import { homePage } from "../../../pages/HomePage";

Given('umbrella company details', () => {
    umbrellaPage.clickCreateUmbrellaCompany()
})
Then('navigate to the umbrella companies list page', () => {
    homePage.navigateToUmbrellaListPage()
})
Then('fill the mandatory fields in the umbrella company setup form', () => {
    umbrellaPage.insertBasicInformation()
})
Then('fill the invalid brn and invalid email in the umbrella company setup form', (table) => {
    table.hashes().forEach(invalidData => {
        umbrellaPage.insertBasicInformation(invalidData.brn, invalidData.email)
    })
})
Then('fill the mandatory fields within each tabs of umbrella prevetting', () => {
    umbrellaPage.umbrellaCompanyInformationBanner('draft', 'draft')
    //Currency & Vat
    umbrellaPage.vatApplicable('yes')
    //Documents Tab
    umbrellaPage.clickDocumentsTab()
    umbrellaPage.insertPofessionalPassport()
    umbrellaPage.insertFCSARegisteredDocument()
})
And('Bypass the review', () => {
    umbrellaPage.clickBypassReview()
    umbrellaPage.umbrellaCompanyInformationBanner('approved', 'draft')
})
And('Reject and Revert the review details', () => {
    umbrellaPage.clickRejectReview()
    umbrellaPage.umbrellaCompanyInformationBanner('rejected', 'draft')
    umbrellaPage.clickEdit()
    umbrellaPage.umbrellaCompanyInformationBanner('draft', 'draft')
    umbrellaPage.logoutUser()
})
And('Reject and Revert the Compliance details of umbrella company',()=>{
    umbrellaPage.clickComplianceTab()
    umbrellaPage.clickRejectCompliance()
    umbrellaPage.umbrellaCompanyInformationBanner('approved', 'rejected')
    umbrellaPage.clickEdit()
    umbrellaPage.umbrellaCompanyInformationBanner('approved', 'draft')
    umbrellaPage.logoutUser()
})
And('Approve the Review details of umbrella company', () => {
    umbrellaPage.clickApproveReview()
    umbrellaPage.umbrellaCompanyInformationBanner('approved', 'draft')
    umbrellaPage.logoutUser()
})
And('Submit the umbrella company prevetting details for review',()=>{
    umbrellaPage.clickSubmitForReview()
    umbrellaPage.umbrellaCompanyInformationBanner('review_required', 'draft')
    umbrellaPage.logoutUser()
})
Then('fill all the mandatory fields within each umbrella compliance detail', () => {
    umbrellaPage.clickComplianceTab()
    // Address tab
    umbrellaPage.insertAddress()
    //Bank Account tab
    umbrellaPage.insertBankAccount()
    //Basic info tab
    umbrellaPage.updateBasicInfo()
    //KYC tab
    umbrellaPage.insertCompaniesHouseScreenShot()
    umbrellaPage.insertCreditSafe()
    //Terms of Business
    umbrellaPage.insertTermsOfBusiness()
})
And('Submit the umbrella compliance for approval', () => {
    umbrellaPage.clickComplianceTab()
    umbrellaPage.clickSubmitCompliance()
    umbrellaPage.umbrellaCompanyInformationBanner('approved', 'submitted')
    umbrellaPage.logoutUser()
})
And('select the respective umbrella company', () => {
    umbrellaPage.filterUmbrellaCompanyHumanId()
})
And('Approve the umbrella compliance details', () => {
    umbrellaPage.clickComplianceTab()
    umbrellaPage.clickApproveCompliance()
})
And('Umbrella company is successfully onboarded', () => {
    cy.url().then(url => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid)
    })
    storeUmbrellaName()
    umbrellaPage.umbrellaCompanyInformationBanner('onboarded', 'approved')
})