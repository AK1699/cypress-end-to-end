import { faker } from '@faker-js/faker'
import { getSupportUsers, industries, paymentTerms } from "../utility/api";
import { Now, accountNumber, ibanNumber, phoneNumber, randomAddressLine1, randomBankName, randomBrn, randomBusinessName, randomCity, randomDate, randomFirstName, randomFullName, randomKycDates, randomLastName, randomNumber, randomPostCode, randomUrl, shortDate, sortCode, swiftCode, todayDate, vatRegistrationNumber } from "../utility/functions";
let { valid_from, valid_to } = randomKycDates();
let human_id, company_name, supportUser, industry, companyName, fullName, payment_terms

class UmbrellaPage {
    clickCreateUmbrellaCompany() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "umbrella" }).then((rows) => {
            cy.writeFile("cypress/fixtures/umbrella/umbrella.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        getSupportUsers()
        cy.readFile('cypress/fixtures/config/supportUsers.json').then(user => {
            supportUser = user.data.platform_user[0].name
        })
        paymentTerms()
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            payment_terms = value.data.config_option[randomNumber(1, 6)].name
        })
        industries()
        cy.readFile('cypress/fixtures/config/industries.json').then(value => {
            industry = value.data.config_option[randomNumber(1, 4)].name
        })
        cy.clickBtn('Create New Umbrella')
    }
    insertBasicInformation(brn, email) {
        fullName = faker.person.fullName()
        companyName = faker.company.name()
        if (brn || email) {
            cy.readFile('cypress/fixtures/umbrella/umbrella.json').then(mockData => {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", brn);
                cy.get('[class="custom-p flex flex-col gap-1 justify-start w-1/3"]:contains(Company Registration Number)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid number')
                cy.setInput("company.vat_registration_no", vatRegistrationNumber());
                cy.setInput("company.office_email", email);
                cy.get('[class="custom-p flex flex-col gap-1 justify-start w-1/3"]:contains(Email Address):eq(0)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid Email')
                cy.setInput("tel", phoneNumber(), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setDate("company.trading_commenced_date", randomDate())
                cy.setInput("company.website_url", randomUrl());
                cy.setInput("company.contact_name", fullName);
                cy.setInput("company.contact_email", `shelbyumbrella2022+${randomNumber(1, 999)}@gmail.com`);
                cy.setInput("tel", phoneNumber(), 1);
                cy.setDropDown("recommended_id", supportUser);
                cy.setDropDown("payment_terms", payment_terms);
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    industry = value.data.config_option[randomNumber(1, 4)].name
                    cy.setDropDown("industries", industry)
                })
                cy.setDropDown("business_currencies", mockData.rows[0].currency)
                cy.clickBtn("Insert").popup().wait(4000)
            })
        } else {
            cy.readFile('cypress/fixtures/umbrella/umbrella.json').then(mockData => {
                cy.setInput("company.name", companyName)
                cy.setInput("company.brn", randomBrn())
                cy.setInput("company.vat_registration_no", vatRegistrationNumber())
                cy.setInput("company.office_email", `shelbyumbrella2022+${randomNumber(1, 999)}@gmail.com`)
                cy.setInput("tel", phoneNumber(), 0)
                cy.setDate("company.incorporated_date", randomDate())
                cy.setDate("company.trading_commenced_date", randomDate())
                cy.setInput("company.website_url", randomUrl())
                cy.setInput("company.contact_name", fullName)
                cy.setInput("company.contact_email", `shelbyumbrella2022+${randomNumber(1, 999)}@gmail.com`)
                cy.setInput("tel", phoneNumber(), 1)
                cy.setDropDown("recommended_id", supportUser)
                cy.setDropDown("payment_terms", payment_terms)
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    var industry = value.data.config_option[randomNumber(1, 4)].name
                    cy.setDropDown("industries", industry)
                })
                cy.setDropDown("business_currencies", mockData.rows[0].currency)
                cy.clickBtn("Insert").popup().wait(4000)
            })
        }
    }
    umbrellaCompanyInformationBanner(Status, compliance_status) {
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('.min-w-max .text-skin-muted :eq(0)').then(id => {
                human_id = id.text()
                cy.log(human_id)
            })
            cy.get('.text-3xl').then(name => {
                company_name = name.text()
                cy.get('.text-3xl').should('contain', companyName)
            })
            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', Status)
            cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', `Compliance: ${compliance_status}`)
        })
    }
    filterUmbrellaCompanyHumanId() {
        cy.log(human_id)
        cy.idFilter('human_id', human_id)
    }
    clickDocumentsTab() {
        cy.clickTab('Documents').wait(200)
    }
    vatApplicable(vat) {
        cy.wait(2000)
        vat == 'yes' ? cy.clickTab("Currency & VAT").toggle("Yes") : null
    }
    insertPofessionalPassport() {
        cy.setKyc("Professional Passport", valid_from, valid_to, "umbrella/doc/professional_passport.jpg", "Testing");
    }
    insertFCSARegisteredDocument() {
        cy.setKyc("FCSA Registered Document", valid_from, valid_to, "umbrella/doc/fcsa_registered_document.pdf", "Testing");
    }
    clickBypassReview() {
        cy.clickBtn("Bypass Review").popup().wait(1000);
    }
    clickComplianceTab() {
        cy.clickTab('Compliance')
    }
    clickRejectReview() {
        cy.clickBtn('Reject Review').popup('No')
    }
    clickEdit() {
        cy.clickBtn('Edit').popup('No')
    }
    clickApproveReview() {
        cy.clickBtn('Approve').popup('No')
    }
    clickSubmitForReview() {
        cy.clickBtn('Submit For Review').popup('No')
    }
    insertAddress() {
        cy.clickBtn("Add Address");
        cy.readFile('cypress/fixtures/umbrella/umbrella.json').then(mockData => {
            cy.setAddress('Registered Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, mockData.rows[0].country, randomPostCode());
        })
    }
    insertBankAccount() {
        cy.clickTab("Bank Accounts").wait(200);
        cy.clickBtn("Add Bank Account");
        cy.setBankAcc(randomBankName(), company_name, accountNumber(), sortCode(), swiftCode(), ibanNumber());
        cy.clickBtn('Insert').popup("No")
        cy.setKyc("Bank Statement", valid_from, valid_to, "umbrella/doc/bank_statement.jpg");
    }
    updateBasicInfo() {
        cy.clickTab("Basic Info").wait(2500);
        cy.clickBtn("Save").popup('No').wait(1000);
    }
    insertCompaniesHouseScreenShot() {
        cy.clickTab("KYC").wait(500);
        cy.setKyc("Companies House Screenshot", valid_from, valid_to, "umbrella/doc/companies_house_screenshot.jpg", "Testing");
    }
    insertCreditSafe() {
        cy.setKyc("Credit Safe", valid_from, valid_to, "umbrella/doc/credit_safe.pdf", "Testing");
    }
    insertTermsOfBusiness() {
        cy.clickTab("Terms Of Business");
        cy.setKyc("Signed copy", valid_from, valid_to, "umbrella/doc/signed_copy.pdf", "Testing");
    }
    clickSubmitCompliance() {
        cy.clickBtn('Submit Compliance').popup('No').wait(1000)
    }
    logoutUser() {
        cy.logout()
    }
    clickApproveCompliance() {
        cy.clickBtn('Approve Compliance').popup('No').wait(300)
    }
    clickRejectCompliance() {
        cy.clickBtn('Reject Compliance').popup('No').wait(300)
    }
    clickDocumentsTab() {
        cy.clickTab('Documents')
    }
}
export const umbrellaPage = new UmbrellaPage()