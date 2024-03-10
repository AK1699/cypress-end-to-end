import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { contractorPage } from '../../../pages/ContractorPage'
import { getBusinessDetails } from '../../../utility/api';
import { storeLimitedContractor, storeSelfEmployedContractor, storeUmbrellaContractor } from '../../../utility/functions';
import { homePage } from '../../../pages/HomePage';

Given('contractor details for {string} contractor', (paymentType) => {
    cy.log(paymentType)
    contractorPage.clickCreateContractor()
})
Then('navigate to contractor list page', () => {
    homePage.navigateToContractorListPage()
})
Then('fill the mandatory fields in the {string} contractor setup form', (paymentType) => {
    cy.log(paymentType)
    contractorPage.insertBasicInformation(paymentType)
    contractorPage.contractorInformationBanner('draft')
})
Then('fill the invalid email id in the contractor setup form', (table) => {
    table.hashes().forEach(invalidData => {
        contractorPage.insertBasicInformation(null, invalidData.email)
    })
})
Then('Update the payment type as {string} in the basic info', (paymentType) => {
    contractorPage.selectPaymentType(paymentType)
})
And('insert the mandatory documents of the {string} contractor in the basic info', () => {
    contractorPage.insertNationalInsuranceNumber()
    contractorPage.insertRightToWork()
    contractorPage.insertProofOfId()
})
Then('update the {string} company details', (paymentType) => {
    contractorPage.clickPaymentCompanyTab(paymentType)
    contractorPage.updatePaymentCompanyDetails(paymentType)
})
Then('Insert the contractor terms of business details', () => {
    contractorPage.insertTermsOfBusiness()
})
Then('Map the {string} agency to the {string} contractor', (fundingModel) => {
    contractorPage.mapAgency(fundingModel)
})
And('Select the respective contractor', () => {
    contractorPage.filterContractorHumanId()
})
And('Onboard the {string} contractor maped with {string} agency', (paymentType, fundingModel) => {
    if(fundingModel == 'Direct'){
        cy.wait(50000)
    }
    contractorPage.contractorInformationBanner('draft')
    contractorPage.clickOnboard()
    contractorPage.contractorInformationBanner('onboarded')
    cy.url().then((url) => {
        var parsedUrl = new URL(url);
        var path = parsedUrl.pathname;
        var splitedUrl = path.split("/");
        var uuid = splitedUrl[5];
        getBusinessDetails(uuid);
    })
    if (paymentType === 'Umbrella') {
        storeUmbrellaContractor(fundingModel)
    } else if (paymentType === 'PSC/Limited') {
        storeLimitedContractor(fundingModel)
    } else if (paymentType === 'Self Employed') {
        storeSelfEmployedContractor(fundingModel)
    } else {
        return null;
    }
    cy.wait(120000)
    contractorPage.contractorAccountSetUp('app', paymentType)
})