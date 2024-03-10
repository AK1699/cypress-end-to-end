import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { purchaseLedgerPage } from "../../../pages/PurchaseLedgerPage";
import { homePage } from "../../../pages/HomePage";

Given('Purchase ledger contract details', () => {
    purchaseLedgerPage.clickCreatePurchaseLedger()
})
Then('navigate to the purchase ledger list page', () => {
    homePage.navigateToPurchaseLedgerListPage()
})
Then('Select the currency in the purchase ledger contract', () => {
    purchaseLedgerPage.selectCurrency()
})
Then('fill the description in the purchase ledger contract', () => {
    purchaseLedgerPage.inputDescription()
})
Then('Select the {string} model agency in the purchase ledger contract', (fundingModel) => {
    purchaseLedgerPage.agencyDetails(fundingModel)
})
Then('Select the {string} model client in the purchase ledger contract', (fundingModel) => {
    purchaseLedgerPage.clientDetails(fundingModel)
})
Then('fill the Raised date in the purchase ledger contract', () => {
    purchaseLedgerPage.inputRaisedDate()
})
Then('fill the amount in the purchase ledger contract', () => {
    purchaseLedgerPage.inputInvoiceAmount()
})
Then('Enable the fee Invoice toggle for the {string} model purchase ledger contract if required', (fundingModel) => {
    purchaseLedgerPage.feeToggle('yes', fundingModel)
    purchaseLedgerPage.clickInsert()
    purchaseLedgerPage.purchaseLedgerInformationBanner('draft')

})
And('Update the agency payment terms in the purchase ledger contract', () => {
    purchaseLedgerPage.updateAgencyPaymentTerms()
})
And('Update the client payment terms in the purchase ledger contract', () => {
    purchaseLedgerPage.updateClientPaymentTerms()
})
And('Update the purchase order number in the purchase ledger contract', () => {
    purchaseLedgerPage.insertPurchaseOrderNumber()
})
And('Update the funder details in the purchase ledger contract', () => {
    purchaseLedgerPage.updateFunderDetails()
})
Then('Submit the purchase ledger contract for approval', () => {
    purchaseLedgerPage.clickSubmit()
    purchaseLedgerPage.purchaseLedgerInformationBanner('submitted')
    purchaseLedgerPage.logoutUser()
})
Then('Approve the purchase ledger contract', () => {
    purchaseLedgerPage.clickApprove()
    purchaseLedgerPage.purchaseLedgerInformationBanner('approved')
})
Then('Purchase ledger invoices for {string} model will be generated',(fundingModel)=>{
    purchaseLedgerPage.storePurchaseledgerContractHumanId(fundingModel)
    purchaseLedgerPage.invoiceAmountValidations()
})
Then('Purchase ledger invoices will be generated',()=>{
    purchaseLedgerPage.invoiceAmountValidations()
})
Then('Reject the purchase ledger contract', () => {
    purchaseLedgerPage.clickReject()
    purchaseLedgerPage.purchaseLedgerInformationBanner('rejected')
    purchaseLedgerPage.logoutUser()
})
Then('Revert and Resubmit the purchase ledger contract', () => {
    purchaseLedgerPage.clickRevert()
    purchaseLedgerPage.purchaseLedgerInformationBanner('draft')
    purchaseLedgerPage.clickSubmit()
    purchaseLedgerPage.purchaseLedgerInformationBanner('submitted')
    purchaseLedgerPage.logoutUser()
})
And('Select the respective purchase ledger contract', () => {
    purchaseLedgerPage.filterContractId()
})