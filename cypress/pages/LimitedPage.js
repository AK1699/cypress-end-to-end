import { faker } from '@faker-js/faker'
import { Now, accountNumber, ibanNumber, phoneNumber, randomAddressLine1, randomBankName, randomBrn, randomBusinessName, randomCity, randomDate, randomFullName, randomKycDates, randomNumber, randomPostCode, randomUrl, shortDate, sortCode, swiftCode, todayDate, vatRegistrationNumber } from "../utility/functions";
import { industries, paymentTerms } from '../utility/api';
import { limitedCompanyName } from './TemporaryPlacementPage';
import { homePage } from './HomePage';
let { valid_from, valid_to } = randomKycDates();
let human_id, company_name, companyName, payment_terms

class LimitedPage {
    clickCreateLimitedCompany() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "limited" }).then((rows) => {
            cy.writeFile("cypress/fixtures/limited/limited.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        paymentTerms()
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            payment_terms = value.data.config_option[randomNumber(1, 6)].name
        })
        industries()
        cy.clickBtn('Create New Limited')
    }
    filterLimitedCompanyHumanId() {
        cy.idFilter('human_id', human_id || limitedCompanyName)
    }
    insertBasicInformation(brn, email) {
        companyName = faker.company.name()
        if (brn || email) {
            cy.readFile("cypress/fixtures/limited/limited.json").then((mockData) => {
                cy.setInput("company.name", companyName)
                cy.setInput("company.brn", brn)
                cy.get('.custom-p:contains(Company Registration Number)').find('.text-skin-danger').should('have.text', 'Please enter a valid number')
                cy.setInput("company.vat_registration_no", vatRegistrationNumber())
                cy.setInput("company.office_email", email)
                cy.get('.custom-p:contains(Email Address):eq(0)').find('.text-skin-danger').should('have.text', 'Please enter a valid Email')
                cy.setInput("tel", phoneNumber(), 0)
                cy.setDate("company.incorporated_date", randomDate())
                cy.setInput("company.website_url", randomUrl())
                cy.setInput("tel", phoneNumber(), 1);
                cy.setDropDown("payment_terms", payment_terms)
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    industryDropDown = value.data.config_option[randomNumber(1, 4)].name
                    cy.setDropDown("industries", industryDropDown)
                })
                cy.setDropDown("business_currencies", mockData.rows[0].currency)
                cy.clickBtn("Insert").popup().wait(1000)
            })
        } else {
            cy.readFile("cypress/fixtures/limited/limited.json").then((mockData) => {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", randomBrn());
                cy.setInput("company.vat_registration_no", vatRegistrationNumber())
                cy.setInput("company.office_email", `shelbylimited2022+${randomNumber(1, 999)}@gmail.com`)
                cy.setInput("tel", phoneNumber(), 0)
                cy.setDate("company.incorporated_date", randomDate())
                cy.setInput("company.website_url", randomUrl())
                cy.setInput("tel", phoneNumber(), 1)
                cy.setDropDown("payment_terms", payment_terms)
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                     var industryDropDown = value.data.config_option[randomNumber(1, 4)].name
                    cy.setDropDown("industries", industryDropDown)
                })
                cy.setDropDown("business_currencies", mockData.rows[0].currency)
                cy.clickBtn("Insert").popup().wait(1000)
            })
        }
    }
    onboardLimitedCompanyGenearatedForTempRequest() {
        this.filterLimitedCompanyHumanId()
        // Address Tab
        this.insertAddress()
        // Currency Tab
        this.vatApplicable('yes')
        // Basic Info 
        cy.clickTab('Basic Info')
        cy.setInput("company.vat_registration_no", vatRegistrationNumber())
        cy.setInput("company.office_email", `shelbylimited2022+${randomNumber(1, 999)}@gmail.com`)
        cy.setInput("tel", phoneNumber(), 0)
        cy.setInput("company.website_url", randomUrl())
        cy.clickBtn('Save').popup('No')
        // KYC Tab
        this.insertCompaniesHouse()
        this.insertCreditSafe()
        this.insertProofOfAddress()
        // Submit for Onboarding
        this.clickSubmitOnboarding()
        this.logoutUser()
        // Approve Onboarding
        cy.login('OA2')
        homePage.navigateToLimitedListPage()
        this.filterLimitedCompanyHumanId()
        this.clickApproveOnboard()
        this.logoutUser()
    }
    insertAddress() {
        cy.readFile("cypress/fixtures/limited/limited.json").then((mockData) => {
            cy.clickBtn("Add Address");
            cy.setAddress('Registered Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, mockData.rows[0].country, randomPostCode());
        });
    }
    limitedCompanyInformationBanner(Status) {
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('.min-w-max .text-skin-muted :eq(0)').then(id => {
                human_id = id.text()
                cy.log(human_id)
            })
            cy.get('.text-3xl').then(name => {
                company_name = name.text()
                cy.get('.text-3xl').should('contain', companyName)
            })
            cy.get('[data-component="Atom: Badge"]').should('have.text', Status)
        })
    }
    vatApplicable(vat) {
        cy.wait(2000)
        vat == 'yes' ? cy.clickTab("Currency & VAT").toggle("Yes") : null;
    }
    insertBankAccount() {
        cy.clickTab("Bank Accounts").wait(500);
        cy.clickBtn("Insert Bank Account");
        cy.setBankAcc(randomBankName(), company_name, accountNumber(), sortCode(), swiftCode(), ibanNumber());
        cy.get('button:contains(Insert):eq(1)').click()
        cy.popup("No")
        cy.setKyc("Bank Statement", valid_from, valid_to, "limited/doc/bank_statement.jpg");
    }
    updateBasicInfo() {
        cy.clickTab("Basic Info").wait(2000);
        cy.clickBtn("Save").popup().wait(100);
    }
    insertCompaniesHouse() {
        cy.clickTab("KYC");
        cy.setKyc("Companies House", valid_from, valid_to, "limited/doc/companies_house.jpg", "Testing");
    }
    insertCreditSafe() {
        cy.setKyc("Credit Safe", valid_from, valid_to, "limited/doc/credit_safe.pdf", "Testing");
    }
    insertProofOfAddress() {
        cy.setKyc("Proof Of Address", valid_from, valid_to, "limited/doc/proof_of_address.jpg", "Testing");
    }
    clickSubmitOnboarding() {
        cy.clickBtn("Submit Onboarding").popup().wait(1000);
    }
    clickApproveOnboard() {
        cy.clickBtn("Approve Onboard").popup();
    }
    clickRejectOnboard() {
        cy.clickBtn("Reject Onboard").popup();
    }
    clickEdit() {
        cy.clickBtn("Edit").popup('No');
    }
    logoutUser() {
        cy.logout()
    }
}
export const limitedPage = new LimitedPage();