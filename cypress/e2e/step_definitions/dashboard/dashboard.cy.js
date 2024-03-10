import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { getHiringManagerDashboard, getTimesheetApproverDashboard, getInvoiceContactDashboard,getContractorDashboard} from "../../../utility/api";
import { homePage } from "../../../pages/HomePage";

const hiring_manager_email = 'uat.testing.raisetech+Hir.man@gmail.com'
const timesheet_approver_email = 'uat.testing.raisetech+Tim.app@gmail.com'
const invoice_contact_email = 'uat.testing.raisetech+Inv.con@gmail.com'
const contractor_email = 'uat.testing.raisetech+Con.Umb@gmail.com'

Given('external users dashboard count response, queried from database', () => {
    getHiringManagerDashboard(hiring_manager_email)
    getTimesheetApproverDashboard(timesheet_approver_email)
    getInvoiceContactDashboard(invoice_contact_email)
    getContractorDashboard(contractor_email)
})
Then('Validate the hiring manager dashboard counts through database', () => {
    cy.login(hiring_manager_email)
    homePage.hiringManagerDashboardWidgets()
    cy.logout()
})
Then('Validate the timesheet approver dashboard count through database', () => {
    cy.login(timesheet_approver_email)
    homePage.timesheetApproverDashboardWidget()
    cy.logout()
})
Then('Validate the invoice contact dashboard count through database', () => {
    cy.login(invoice_contact_email)
    homePage.invoiceContactDashboardWidget()
    cy.logout()
})
Then('Validate the contractor dashboard count through database', () => {
    cy.login(contractor_email)
    homePage.contractorDasboardWidget()
    cy.logout()
})