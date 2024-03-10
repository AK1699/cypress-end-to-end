import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps'
import { contractorEmail, expensePage, timesheetApproverEmail } from '../../../pages/ExpensePage'
import { homePage } from '../../../pages/HomePage'

Given('expense claim form details for {string} model contract of {string} funding type', (fundingModel, fundingType) => {
    expensePage.getContract(fundingModel, fundingType)
})
Then('Select the {string} funding type in the temporary placement level in order to create expense',()=>{
    expensePage
})
Then('login as contractor, to submit a expense claim form', () => {
    cy.login(contractorEmail)
})
Then('login as timesheet approver, to review the expense claim form', () => {
    cy.login(timesheetApproverEmail)
})
And('Navigate to the expense list page', () => {
    homePage.navigateToExpenseListPage()
})
Then('Insert the basic information for expense claim form for {string} funding type', (fundingType) => {
    expensePage.clickCreateExpense()
    expensePage.insertExpenseClaimForm(fundingType)
})
Then('fill the expense details in the expense claim form', () => {
    expensePage.inputExpenseDetails({ VAT: 'No' })
})
And('upload the proof of submission document for expense', () => {
    expensePage.uploadProofOfSubmissionDocument()
})
And('upload the proof of approval document for expense', () => {
    expensePage.uploadProofOfApprovalDocument()
})
And('Select the respective expense', () => {
    expensePage.filterExpenseId()
})
And('Submit the expense claim form for approval', () => {
    expensePage.expenseInformationBanner('draft')
    expensePage.clickSubmit()
    expensePage.expenseInformationBanner('submitted')
    cy.logout()
})
And('Approve the expense claim form', () => {
    expensePage.expenseInformationBanner('submitted')
    expensePage.clickApprove()
    expensePage.expenseInformationBanner('approved')
})
Then('Reject the expense claim form', () => {
    expensePage.expenseInformationBanner('submitted')
    expensePage.clickReject()
    expensePage.expenseInformationBanner('rejected')
    cy.logout()
})
Then('Revert the expense claim form', () => {
    expensePage.expenseInformationBanner('rejected')
    expensePage.clickRevert()
    expensePage.expenseInformationBanner('draft')
})
And('Invoices will be genereated for the expense', () => {
    expensePage.invoiceGeneration()
})