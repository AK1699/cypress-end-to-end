import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { getBusinessDetails } from '../../../utility/api'
import { funderPage } from '../../../pages/FunderPage'
import { storeFunderName } from '../../../utility/functions'
import { homePage } from '../../../pages/HomePage'
let funding_model


Then('navigate to the Funder list page', () => {
    homePage.navigateToFunderListPage()
})
Given('funder details', () => {
    funderPage.clickCreateFunder()
})
Then('fill the mandatory fields in funder setup form', () => {
    funderPage.insertBasicInformation()
})
Then('fill the invalid brn number and the invalid email address into funder setup form', (table) => {
    table.hashes().forEach((invalidData) => {
        funderPage.insertBasicInformation(invalidData.brn, invalidData.emailAddress)
    })
})
Then('Enable the toggle if VAT applicable for the funder', () => {
    funderPage.vatApplicable('yes')
})

Then('Insert the address for the funder', () => {
    funderPage.funderInformationBanner('draft')
    funderPage.insertAddress()
})

Then('Insert the bank account for the funder', () => {
    funderPage.insertBankAccount()
})

Then('Select the {string} funding model for the funder', (fundingModel) => {
    funding_model = fundingModel
    cy.log(fundingModel)
    funderPage.selectFundingModel(fundingModel)
})

Then('Add the funder users', () => {
    funderPage.addFunderUsers()
})

Then('Add support staff user for the funder', () => {
    funderPage.addSupportUser()
})

Then('Funder is Onboarded successfully', () => {
    cy.log(funding_model)
    if (funding_model == 'Direct') {
        cy.wait(50000)
    }
    funderPage.clickOnboard()
    funderPage.funderInformationBanner('onboarded')
    cy.url().then((url) => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid);
    });
    cy.wait(120000)
    funderPage.creditUserSetUP('app')
    cy.login("OA1")
    funderPage.accountUserSetUp('app')
    storeFunderName()
})
