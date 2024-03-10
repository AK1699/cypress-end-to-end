import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { homePage } from "../../../pages/HomePage"




Given('Refinement details to create {string} for {string}', (generationType, transactionType) => {

})
Then('Navigate to the Invoice Adjustment list page', () => {
    homePage.navigateToInvoiceAdjustmentListPage()
})