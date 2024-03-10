import { Given } from "cypress-cucumber-preprocessor/steps";
import { salesInvoicePage } from "../../../pages/SalesInvoicePage";
import { homePage } from "../../../pages/HomePage";

Given('Sales Invoice Contract details', () => {
    salesInvoicePage.clickCreateSalesInvoice()
})
Then('Select the currency in the sales invoice contract form', () => {
    salesInvoicePage.selectCurrency()
})
Then('fill the description in the sales invoice contract form', () => {
    salesInvoicePage.inputDescription()
})
Then('Select the {string} model agency in the sales invoice contract form', (fundingModel) => {
    salesInvoicePage.agencyDetails(fundingModel)
})
Then('Select the {string} model client in the sales invoice contract form', (fundingModel) => {
    salesInvoicePage.clientDetails(fundingModel)
})
Then('fill the invoice amount in the sales invoice contract form', () => {
    salesInvoicePage.inputInvoiceAmount()
})
Then('fill the fee charges according to the {string} model in the sales invoice contract form', (fundingModel) => {
    salesInvoicePage.inputFeeDetails(fundingModel)
    salesInvoicePage.clickInsert()
    salesInvoicePage.salesInvoiceInformationBanner('draft')
})
Then('Update the funder details in the sales invoice contract form', () => {
    salesInvoicePage.updateFunderDetails()
})
Then('Update the client details in the sales invoice contract form', () => {
    salesInvoicePage.updateClientPaymentTerms()
})
Then('Update the agency details in the sales invoice contract form', () => {
    salesInvoicePage.updateAgencyPaymentTerms()
})
Then('Update the provider details in the sales invoice contract form', () => {
    salesInvoicePage.updateProviderDetails()
})
Then('Insert the Purchase order number in the sales invoice contract if required', () => {
    salesInvoicePage.insertPurchaseOrderNumber()
})
Then('Submit the sales invoice contract form for approval', () => {
    salesInvoicePage.clickSubmit()
    salesInvoicePage.salesInvoiceInformationBanner('submitted')
    salesInvoicePage.logoutUser()
})
Then('Select the respective sales invoice contract', () => {
    salesInvoicePage.filterContractId()
})
Then('Approve the sales invoice contract form', () => {
    salesInvoicePage.clickApprove()
    salesInvoicePage.salesInvoiceInformationBanner('approved')
})
Then('Sales invoices for the {string} model will be generated', (fundingModel) => {
    salesInvoicePage.storeSalesContractHumanId(fundingModel)
    salesInvoicePage.invoiceAmountValidations()
})
Then('Sales invoices will be generated', () => {
    salesInvoicePage.invoiceAmountValidations()
})
Then('Reject the sales invoice contract form', () => {
    salesInvoicePage.clickReject()
    salesInvoicePage.salesInvoiceInformationBanner('rejected')
    salesInvoicePage.logoutUser()
})
Then('Revert and Resubmit the sales invoice contract', () => {
    salesInvoicePage.clickRevert()
    salesInvoicePage.salesInvoiceInformationBanner('draft')
    salesInvoicePage.clickSubmit()
    salesInvoicePage.salesInvoiceInformationBanner('submitted')
    salesInvoicePage.logoutUser()
})
Then('navigate to the sales invoice list page', () => {
    homePage.navigateToSalesInvoiceListPage()
})