import { faker } from '@faker-js/faker'
import { Now, accountNumber, ibanNumber, industry, limitedContractorEmail, nationalInsuranceNumber, phoneNumber, randomAddressLine1, randomBankName, randomBrn, randomCity, randomDate, randomFirstName, randomFullName, randomKycDates, randomLastName, randomNumber, randomPostCode, randomUrl, selfEmployedContractorEmail, shortDate, sortCode, swiftCode, todayDate, umbrellaContractorEmail, vatRegistrationNumber } from "../utility/functions";
let { valid_from, valid_to } = randomKycDates();
let human_id, contractor_name, limitedContractorEmailId, umbrellaContractorEmailid, selfEmployedContractorEmailid, firstName, lastName, middleName
import { contractorEmail } from './TemporaryPlacementRequestPage';
class ContractorPage {
    selectPaymentType(paymentType) {
        cy.log(paymentType)
        cy.setDropDown("payment_type", paymentType);
        cy.clickBtn("Save").popup("No").wait(200);
    }
    clickPaymentCompanyTab(paymentType) {
        cy.log(paymentType)
        cy.clickTab(paymentType)
    }
    filterContractorHumanId() {
        cy.idFilter('human_id', human_id)
    }
    clickCreateContractor() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "contractor" }).then((rows) => {
            cy.writeFile("cypress/fixtures/contractor/contractor.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        cy.clickBtn('Create New Contractor')
    }
    insertBasicInformation(paymentType, email) {
        firstName = faker.person.firstName('male')
        middleName = faker.person.middleName('male')
        lastName = faker.person.lastName('male')
        if (paymentType === 'Limited') {
            cy.readFile("cypress/fixtures/contractor/contractor.json").then((mockData) => {
                cy.setInput("user.first_name", firstName);
                mockData.rows[0].middle_name !== null ? cy.setInput("user.middle_name", middleName) : null
                cy.setInput("user.last_name", lastName)
                limitedContractorEmailId = limitedContractorEmail()
                cy.setInput("user.email", limitedContractorEmailId);
                cy.setInput("tel", phoneNumber(), 0)
                cy.setInput("trn", vatRegistrationNumber())
                cy.setDate("date_of_birth", randomDate())
                mockData.rows[0].gender !== null ? cy.setDropDown("gender", mockData.rows[0].gender) : null;
                cy.clickBtn("Insert").popup("No").wait(2000)
            })
        } else if (paymentType === 'Umbrella') {
            cy.readFile("cypress/fixtures/contractor/contractor.json").then((mockData) => {
                cy.setInput("user.first_name", firstName);
                mockData.rows[0].middle_name !== null ? cy.setInput("user.middle_name", middleName) : null
                cy.setInput("user.last_name", lastName)
                umbrellaContractorEmailid = umbrellaContractorEmail()
                cy.setInput("user.email", umbrellaContractorEmailid)
                cy.setInput("tel", phoneNumber(), 0);
                cy.setInput("trn", vatRegistrationNumber());
                cy.setDate("date_of_birth", randomDate())
                mockData.rows[0].gender !== null ? cy.setDropDown("gender", mockData.rows[0].gender) : null;
                cy.clickBtn("Insert").popup("No").wait(2000);
            })
        } else if (paymentType === 'Self Employed') {
            cy.readFile("cypress/fixtures/contractor/contractor.json").then((mockData) => {
                cy.setInput("user.first_name", firstName);
                mockData.rows[0].middle_name !== null ? cy.setInput("user.middle_name", middleName) : null;
                cy.setInput("user.last_name", lastName)
                selfEmployedContractorEmailid = selfEmployedContractorEmail()
                cy.setInput("user.email", selfEmployedContractorEmailid);
                cy.setInput("tel", phoneNumber(), 0);
                cy.setInput("trn", vatRegistrationNumber());
                cy.setDate("date_of_birth", randomDate())
                mockData.rows[0].gender !== null ? cy.setDropDown("gender", mockData.rows[0].gender) : null;
                cy.clickBtn("Insert").popup("No").wait(2000);
            })
        } else if (email) {
            cy.readFile("cypress/fixtures/contractor/contractor.json").then((mockData) => {
                cy.setInput("user.first_name", firstName);
                mockData.rows[0].middle_name !== null ? cy.setInput("user.middle_name", middleName) : null;
                cy.setInput("user.last_name", lastName)
                cy.setInput("user.email", email);
                cy.get('.custom-p:contains(Email Address):eq(0)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid Email')
                cy.setInput("tel", phoneNumber(), 0);
                cy.setInput("trn", vatRegistrationNumber());
                cy.setDate("date_of_birth", randomDate())
                mockData.rows[0].gender !== null ? cy.setDropDown("gender", mockData.rows[0].gender) : null;
                cy.clickBtn("Insert").popup("No").wait(2000);
            })
        }
    }
    contractorInformationBanner(Status) {
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('.min-w-max .text-skin-muted :eq(0)').then(id => {
                human_id = id.text()
                cy.log(human_id)
            })
            cy.get('.text-3xl').then(name => {
                contractor_name = name.text()
                cy.get('.text-3xl').should('contain', `${firstName} ${lastName}`)
            })
            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', Status)
        })
    }
    insertAddress() {
        cy.readFile('cypress/fixtures/contractor/contractor.json').then(mockData => {
            cy.clickBtn("Add Address");
            cy.setAddress('Residential Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, mockData.rows[0].country, randomPostCode());
        })
    }
    insertBankAccount() {
        cy.clickTab('Bank Accounts')
        cy.clickBtn("insert");
        cy.setBankAcc(randomBankName(), contractor_name, accountNumber(), sortCode(), swiftCode(), ibanNumber());
        cy.clickBtn('Insert').popup('No')
        cy.setKyc("Bank Statement", valid_from, valid_to, "contractor/doc/insurance.jpg");
    }
    vatApplicable(vat) {
        cy.readFile('cypress/fixtures/contractor/contractor.json').then(mockData => {
            cy.clickTab("Currency & VAT").wait(200);
            cy.clickBtn("Add Currency");
            cy.setDropDown("currency_id", mockData.rows[0].currency);
            cy.wait(200);
            vat === 'yes' ? cy.toggle("Self") : null
        })
    }
    insertNationalInsuranceNumber() {
        cy.setInput("id_no", nationalInsuranceNumber()).clickBtn('Insert').popup('No');
        // cy.get(`form:contains(National Insurance):eq(1)`).within(() => {
        //     cy.setDate("valid_from", valid_from);
        //     cy.setDate("valid_to", valid_to);
        //     cy.uploadFile('contractor/doc/insurance.jpg');
        //     cy.clickBtn("Insert")
        // })
        // cy.popup("No")
    }
    insertRightToWork() {
        cy.setKyc("Right To Work", valid_from, valid_to, "contractor/doc/right_to_work.png");
    }
    insertProofOfAddress() {
        cy.setKyc("Proof of address", valid_from, valid_to, "contractor/doc/proof_of_address.jpg");
    }
    insertProofOfId() {
        cy.setKyc("Proof of ID", valid_from, valid_to, "contractor/doc/proof_of_id.png");
    }
    insertProofOfTaxIdentificationNumber() {
        cy.clickTab('Documents')
        cy.setKyc("Proof of Tax Identification Number", valid_from, valid_to, "contractor/doc/signed_copy.jpeg");
    }
    updateBasicInfo() {
        cy.get('[id="basic"]').eq(1).click().wait(1000);
        cy.setInput('company.vat_registration_no', vatRegistrationNumber())
        cy.clickBtn("Save").wait(500).popup().wait(1000);
    }
    updatePaymentCompanyDetails(paymentType) {
        cy.log(paymentType)
        if (paymentType === 'Limited') {
            cy.readFile('cypress/fixtures/testData.json').then(payment_company => {
                var limited_company = payment_company.paymentCompanies[0].limitedCompanies
                cy.clickBtn("Add Limited Company");
                cy.setDropDown("to_business_id", limited_company).clickBtn("Insert").popup("No").wait(1000);
            })
        } else if (paymentType === 'Umbrella') {
            cy.readFile('cypress/fixtures/testData.json').then(payment_company => {
                var umbrella_company = payment_company.paymentCompanies[0].umbrellaCompanies
                cy.clickBtn("Add Umbrella Company");
                cy.setDropDown("to_business_id", umbrella_company).clickBtn("Insert").popup("No").wait(1000);
            })
        } else if (paymentType === 'Self Employed') {
            this.insertAddress()
            this.vatApplicable('yes')
            this.insertBankAccount()
            this.insertProofOfTaxIdentificationNumber()
            this.updateBasicInfo()
        }
    }
    insertTermsOfBusiness() {
        cy.clickTab("Terms of Business").wait(200);
        cy.clickBtn("Insert")
        cy.dropDown('type', 'Agency Terms')
        cy.uploadFile('TOB/agency_terms.pdf')
        cy.clickBtn('Insert').popup('No')
    }
    mapAgency(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                var directAgency = testData.directEntities[0].agencies
                cy.clickTab("Agencies").wait(200).clickBtn("Add Agency");
                cy.setDropDown("to_business_id", directAgency);
                cy.clickBtn("Insert").popup().wait(1000);
            })
        } else {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                var indirectAgency = testData.indirectEntities[0].agencies
                cy.clickTab("Agencies").wait(200).clickBtn("Add Agency");
                cy.setDropDown("to_business_id", indirectAgency);
                cy.clickBtn("Insert").popup().wait(1000);
            })
        }
    }
    clickOnboard() {
        cy.clickBtn("Onboard").popup();
    }
    contractorAccountSetUp(subdomain, paymentType) {
        if (paymentType === 'Limited') {
            cy.newUserAccountSetUp(subdomain, (limitedContractorEmailId || contractorEmail))
        } else if (paymentType === 'Umbrella') {
            cy.newUserAccountSetUp(subdomain, (umbrellaContractorEmailid || contractorEmail))
        } else if (paymentType === 'Self Employed') {
            cy.newUserAccountSetUp(subdomain, selfEmployedContractorEmailid)
        }
    }
}
export const contractorPage = new ContractorPage()