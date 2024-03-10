import { Given } from "cypress-cucumber-preprocessor/steps";
import { payrollTimesheetPage } from "../../../pages/PayrollTimesheetPage";
import { homePage } from "../../../pages/HomePage";

Given('payroll timesheet details', () => {
    cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "payroll" }).then((rows) => {
        cy.writeFile("cypress/fixtures/payrollTimesheet/payrollTimesheet.json", { rows });
        cy.log(JSON.stringify(rows));
    });
    payrollTimesheetPage.clickCreatePayroll()
})
Given('Payroll timesheet details to bulk upload for {string} funding model and for {string} funding type', (fundingModel, fundingType) => {
    payrollTimesheetPage.clickTemplate()
    payrollTimesheetPage.getPayrollTimesheetDataForBulkUpload(fundingModel, fundingType)
})
When('Payroll timesheet details are bulk uploaded', () => {
    payrollTimesheetPage.uploadPayrollTimesheetTemplate()
    payrollTimesheetPage.clickProceed()
    payrollTimesheetPage.logoutUser()
})
Then('Payroll timesheets record should be generated in Submitted status for each detail in the template', () => {
payrollTimesheetPage.validateGeneratedPayrollTimesheets()
})
Then('Select the funding type as {string} in payroll timesheet creation form', (fundingType) => {
    payrollTimesheetPage.selectFundingType(fundingType)
})
Then('Select the currency in payroll timesheet creation form', () => {
    payrollTimesheetPage.selectCurrency()
})
Then('Select the {string} model agency in the payroll timesheet creation form', (fundingModel) => {
    payrollTimesheetPage.agencyDetails(fundingModel)
})
Then('Select the {string} model contract which has {string} funding type in the payroll timesheet creation form', (fundingModel, fundingType,) => {
    payrollTimesheetPage.selectTemporaryPlacement(fundingModel, fundingType)
})
Then('Select the start date and end date in the payroll timesheet creation form', () => {
    payrollTimesheetPage.selectDates()
    payrollTimesheetPage.clickInsert()
})
Then('navigate to the payroll timesheet list page', () => {
    homePage.navigateToPayrollTimesheetListPage()
})
Then('fill the total units in the payroll timesheet', () => {
    payrollTimesheetPage.payrollTimesheetBannerInformation('draft')
    payrollTimesheetPage.fillPayrollTimesheetDetails({ additionalRateEntry: 'yes' })
})
Then('Upload the proof of submission document for payroll timesheet', () => {
    payrollTimesheetPage.uploadProofOfSubmissionDocument()
})
Then('Upload the proof of approval document for payroll timesheet', () => {
    payrollTimesheetPage.payrollTimesheetBannerInformation('submitted')
    payrollTimesheetPage.uploadProofOfApprovalDocument()
})
Then('Submit the payroll timesheet for approval', () => {
    payrollTimesheetPage.clickSubmit()
    payrollTimesheetPage.payrollTimesheetBannerInformation('submitted')
    payrollTimesheetPage.logoutUser()
})
Then('Approve the payroll timesheet', () => {
    payrollTimesheetPage.payrollTimesheetBannerInformation('submitted')
    payrollTimesheetPage.clickApprove()
    payrollTimesheetPage.payrollTimesheetBannerInformation('approved')
    payrollTimesheetPage.validateTotalUnits()
})

Then('Invoices will be generated for the payroll timesheet', () => {
    payrollTimesheetPage.invoiceGeneration()
})
And('Select the respective payroll timesheet', () => {
    payrollTimesheetPage.filterPayrollTimesheet()
})
