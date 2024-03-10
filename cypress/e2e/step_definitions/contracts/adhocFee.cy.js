import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { adhocFeePage, human_id } from "../../../pages/AdhocFeePage";
import { homePage } from "../../../pages/HomePage";
import { storeAdhocFeeId } from "../../../utility/functions";

Given('Adhoc fee contract details', () => {
    adhocFeePage.clickCreateAdhocFee()
})
Then('navigate to the adhoc fee list page', () => {
    homePage.navigateToAdhocFeeListPage()
})
Then('Select the currency for the adhoc fee', () => {
    adhocFeePage.selectCurrency()
})
Then('Select the adhoc fee type as {string}', (type) => {
    adhocFeePage.selectAdhocFeeType(type)
})
Then('Select the {string} model agency for {string} adhoc fee', (fundingModel, type) => {
    adhocFeePage.agencyDetails(fundingModel, type)
})
Then('fill the description in the adhoc fee form', () => {
    adhocFeePage.inputDescription()
})
Then('fill the vat as input in the {string} adhoc fee form', (type) => {
    adhocFeePage.inputVat()
    adhocFeePage.clickInsert()
    adhocFeePage.adhocFeeInformationBanner('draft', type)
})
Then('Update the payment terms in the adhoc fee form', () => {
    adhocFeePage.updatePaymentTerms()
})
Then('Submit the {string} adhoc fee for approval', (type) => {
    adhocFeePage.clickSubmit()
    adhocFeePage.adhocFeeInformationBanner('submitted', type)
    adhocFeePage.logoutUser()
})
And('select the respective adhoc fee contract', () => {
    adhocFeePage.filterContractId()
})
Then('Approve the {string} adhoc fee contract', (type) => {
    adhocFeePage.clickApprove()
    adhocFeePage.adhocFeeInformationBanner('approved', type)
})
Then('Reject the {string} adhoc fee contract', (type) => {
    adhocFeePage.clickReject()
    adhocFeePage.adhocFeeInformationBanner('rejected', type)
    adhocFeePage.logoutUser()
})
Then('Revert and Resubmit the {string} adhoc fee contract', (type) => {
    adhocFeePage.clickRevert()
    adhocFeePage.adhocFeeInformationBanner('draft', type)
    adhocFeePage.clickSubmit()
    adhocFeePage.adhocFeeInformationBanner('submitted', type)
    cy.clearAllCookies()
    adhocFeePage.logoutUser()
})
And("Adhoc fee invoices for {string} model and for type {string} is generated", (fundingModel, type) => {
    storeAdhocFeeId(fundingModel, type, human_id)
    adhocFeePage.invoicesValidation()
})
And("Adhoc fee invoices for the type {string} is generated", (type) => {
    adhocFeePage.invoicesValidation()
})
