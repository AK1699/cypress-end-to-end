import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps'
import { homePage } from '../../../pages/HomePage'
import { paymentsPage } from '../../../pages/PaymentsPage'
let toCompany

Given('Contractor Invoices', () => {
    cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "payments" }).then((rows) => {
        cy.writeFile('cypress/fixtures/payments/contractor_payment.json', rows)
    })
    cy.login('PA')
    cy.readFile('cypress/fixtures/testData.json').then(company => {
        toCompany = company.paymentCompanies[0].umbrellaCompanies
    })
})
Then('navigate to the payments list page', () => {
    homePage.navigateToPaymentsListPage()
})
Then('upload contractor payment template', () => {
    paymentsPage.updateContractorPaymentTemplate()
})