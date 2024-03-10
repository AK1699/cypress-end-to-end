import { After, And, Given, Then } from "cypress-cucumber-preprocessor/steps";
import { homePage } from "../../../pages/HomePage";
import { timesheetPage, contractorEmail, timesheetApproverEmail, agencyUserEmail } from "../../../pages/TimesheetPage";
import { getTmsDetails } from "../../../utility/api";

Given('The {string}-{string} timesheet details which has {string} funding model, {string} funding type', (timesheetFrequency, unitType, fundingModel, fundingType) => {
    cy.login('PA')
    timesheetPage.getTimesheetId(timesheetFrequency, unitType, fundingModel, fundingType)
    cy.logout()
})
And('logout the raise platfrom', () => {
    cy.logout()
})
Then('Login as contractor to perform any actions on timesheet', () => {
    cy.login(contractorEmail)
})
Then('Login as agency user to perform any actions on timesheet', () => {
    cy.login(agencyUserEmail)
})
Then('Login as client timesheet approver to perform any actions on timesheet', () => {
    cy.login(timesheetApproverEmail)
})
Then('navigate to the timesheet list page', () => {
    homePage.navigateToTimesheetListPage()
})
Then('Select the respective timesheet', () => {
    timesheetPage.filterTimesheetId()
})
Then('fill the timesheet as Internal user on behalf of contractor', () => {
    timesheetPage.timesheetInformationBanner('Draft')
    timesheetPage.fillTimesheetEntries({ additionalRateEntry: 'no' })
    timesheetPage.clickSave()
})
Then('Submit the timesheet as Internal user on behalf of contractor', () => {
    timesheetPage.timesheetInformationBanner('Draft')
    timesheetPage.clickSubmit()
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.logoutUser()
})
Then('Submit the timesheet as agency user on behalf of contractor', () => {
    timesheetPage.timesheetInformationBanner('Draft')
    timesheetPage.clickSubmit()
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.logoutUser()
})
Then('Submit the timesheet by the contractor', () => {
    timesheetPage.timesheetInformationBanner('Draft')
    timesheetPage.clickSubmit()
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.logoutUser()
})
Then('fill the timesheet as contractor', () => {
    timesheetPage.timesheetInformationBanner('Draft')
    timesheetPage.fillTimesheetEntries({ additionalRateEntry: 'no' })
    timesheetPage.clickSave()
})
Then('fill the timesheet as agency user on behalf of contractor', () => {
    timesheetPage.timesheetInformationBanner('Draft')
    timesheetPage.fillTimesheetEntries({ additionalRateEntry: 'no' })
    timesheetPage.clickSave()
})

Then('Approve the timesheet by client timesheet approver', () => {
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.clickApprove()
    timesheetPage.timesheetInformationBanner('Approved')
    timesheetPage.storeApprovedTimesheets()
})
Then('Approve the timesheet by Internal user on behalf of client timesheet approver', () => {
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.clickApprove()
    timesheetPage.timesheetInformationBanner('Approved')
    timesheetPage.storeApprovedTimesheets()
})
Then('Invoices will be generated for the timesheet', () => {
    cy.url().then(url => {
        if (url.includes('ops')) {
            timesheetPage.validateTotalUnits()
            timesheetPage.invoiceGeneration()
        } else if (url.includes('app')) {
            cy.login('PA')
            homePage.navigateToTimesheetListPage()
            timesheetPage.filterTimesheetId()
            timesheetPage.validateTotalUnits({ additionalRateEntry: 'no' })
            timesheetPage.invoiceGeneration()
        }
    })
})
Then('upload the timesheet proof of submission document', () => {
    timesheetPage.uploadProofOfSubmissionDocument()
})
Then('upload the timesheet proof of approval document', () => {
    timesheetPage.uploadProofOfApprovalDocument()
})

Then('Reject the timesheet by Internal user on behalf of client timesheet approver', () => {
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.clickReject()
    timesheetPage.timesheetInformationBanner('Rejected')
    cy.logout()
})
Then('Reject the timesheet for No Resubmission by Internal user on behalf of client timesheet approver', () => {
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.clickNoResubmission()
    timesheetPage.timesheetInformationBanner('Closed')
    cy.logout()
})
Then('Reject the timesheet for No Resubmission by client timesheet approver', () => {
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.clickNoResubmission()
    timesheetPage.timesheetInformationBanner('Closed')
    cy.logout()
})
And('Revert the timesheet by payment assistant on behalf of contractor', () => {
    timesheetPage.timesheetInformationBanner('Rejected')
    timesheetPage.clickRevertTimesheet()
    timesheetPage.timesheetInformationBanner('Draft')
})


// Reject and Resubmit by External users 
Then('Reject the timesheet by timesheet approver', () => {
    timesheetPage.timesheetInformationBanner('Submitted')
    timesheetPage.clickReject()
    timesheetPage.timesheetInformationBanner('Rejected')
    cy.logout()
})

And('Revert the timesheet by agency user on behalf of contractor', () => {
    timesheetPage.timesheetInformationBanner('Rejected')
    timesheetPage.clickRevertTimesheet()
    timesheetPage.timesheetInformationBanner('Draft')
})

And('Revert the timesheet by the contractor', () => {
    timesheetPage.timesheetInformationBanner('Rejected')
    timesheetPage.clickRevertTimesheet()
    timesheetPage.timesheetInformationBanner('Draft')
})

// """"""""""""""""""""""""""""""Chaser Timesheet by external / Internal users"""""""""""""""""""""""""""""""""

And('Select the respective timesheet to chase', () => {
    timesheetPage.filterTimesheetIdForChaser()
})
Then('Chase the draft timesheet', () => {
    timesheetPage.chaseContractorTimesheet()
    cy.logout()
})
Then('Chase the Submitted Timesheet', () => {
    timesheetPage.chaseClientTimesheet()
    cy.logout()
})
Then('verify draft timesheet chase email send to the contractor with the right subject', () => {
    timesheetPage.checkMailForDraftTimesheet()
})
Then('verify submitted timesheet chase email send to the timesheet approver with the right subject', () => {
    timesheetPage.checkMailForSubmittedTimesheet()
})

// """"""""""""""""""""""""""""""Magic link Timesheet by external / Internal users"""""""""""""""""""""""""""""""""

Then('Approve the timesheet by client user via magic link', () => {
    timesheetPage.approveTimesheetViaMagicLink()
})

Then('Reject the timesheet by client user via magic link', () => {
    timesheetPage.rejectTimesheetViaMagicLink()
})

Then('Reject the timesheet for No Resubmission by client user via magic link', () => {
    timesheetPage.rejectTimesheetForNoResubmissionViaMagicLink()
})
Then('Verify that there is no option to Revert the Closed timesheet', () => {
    timesheetPage.timesheetInformationBanner('Closed')
    cy.get('button:contains(Revert Timesheet)').should('not.exist')
})
