import { faker } from '@faker-js/faker';
import { buzContacts, getSupportUsers, industries, paymentTerms } from "../utility/api";
import { Now, accountNumber, agencyEmail, disallowedDays, ibanNumber, phoneNumber, randomAddressLine1, randomBankName, randomBrn, randomBusinessName, randomCity, randomDate, randomFirstName, randomFullName, randomKycDates, randomLastName, randomNumber, randomPostCode, randomUrl, shortDate, sortCode, supportType, swiftCode, todayDate, vatRegistrationNumber } from "../utility/functions";
let { valid_from, valid_to } = randomKycDates();
let human_id, company_name, payment_terms, industry, funding_model, agencyName, agencyConsultant, supportUser, agencyConsultantEmail, agencyAdminEmail, agencyReadOnlyEmail, directorEmail, fullName, companyName
export { agencyConsultant }
class AgencyPage {
    isRequestAllowed() {
        cy.get('[id="is_request_allowed"]').find('button').as('selfServe')
        cy.get('@selfServe').then(btn => {
            if (btn.attr('aria-checked') === 'false') {
                cy.get('@selfServe').click()
                cy.clickBtn('Save').popup('No')
            } else {
                cy.get('@selfServe').should('have.attr', 'aria-checked', 'true')
            }
        })
    }
    scheduleFeature() {
        cy.clickTab('Features')
        cy.get('[id="preferences.allow_system_schedule"]').find('button').as('placementScehdule')
        cy.get('@placementScehdule').then(btn => {
            if (btn.attr('aria-checked') === 'false') {
                cy.get('@placementScehdule').click()
                cy.clickBtn('Save').popup('No')
            } else {
                cy.get('@placementScehdule').should('have.attr', 'aria-checked', 'true')
            }
        })
    }
    selectAgency(fundingModel) {
        if (fundingModel === 'Direct') {
            return cy.readFile('cypress/fixtures/testData.json').then((testData) => {
                cy.log(testData)
                agencyName = testData.directEntities[0].agencies
                buzContacts(agencyName)
                return cy.readFile("cypress/fixtures/placement/buzContacts.json").then(data => {
                    var platform_business = data.res.data.platform_business
                    var business_contacts = platform_business.filter(user => user.business_contacts)
                    business_contacts.forEach((business) => {
                        business.business_contacts.forEach((contact) => {
                            if (contact.type.includes("agency_consultant") && contact.user.is_confirmed == true && contact.user.is_active == true) {
                                cy.log(contact.type)
                                agencyConsultant = contact.user.email
                                cy.log(agencyConsultant)
                            }
                        });
                    });
                })
            })
        } else if (fundingModel === 'Indirect') {
            return cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                buzContacts(agencyName);
                return cy.readFile("cypress/fixtures/placement/buzContacts.json").then(data => {
                    var platform_business = data.res.data.platform_business
                    var business_contacts = platform_business.filter(user => user.business_contacts)
                    business_contacts.forEach((business) => {
                        business.business_contacts.forEach((contact) => {
                            if (contact.type.includes("agency_consultant") && contact.user.is_confirmed == true && contact.user.is_active == true) {
                                cy.log(contact.type)
                                agencyConsultant = contact.user.email
                                cy.log(agencyConsultant)
                            }
                        });
                    });
                })
            })
        }
    }
    clickCreateAgency() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "agency" }).then((rows) => {
            cy.writeFile("cypress/fixtures/agency/agency.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        getSupportUsers()
        cy.readFile('cypress/fixtures/config/supportUsers.json').then(user => {
            supportUser = user.data.platform_user[randomNumber(1, 3)].name
        })
        paymentTerms()
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            payment_terms = value.data.config_option[randomNumber(1, 6)].name
        })
        industries()
        cy.readFile('cypress/fixtures/config/industries.json').then(value => {
            industry = value.data.config_option[randomNumber(1, 4)].name
        })
        cy.clickBtn('Create Agency')
    }
    insertBasicInformation(brn, email) {
        fullName = faker.person.fullName()
        companyName = faker.company.name()
        cy.readFile('cypress/fixtures/agency/agency.json').then(mockData => {
            if (brn || email) {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", brn);
                cy.get('.custom-p:contains(Company Registration Number)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid number')
                cy.setInput("company.vat_registration_no", vatRegistrationNumber());
                cy.setInput("company.office_email", email);
                cy.get('.custom-p:contains(Email Address):eq(0)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid Email')
                cy.setInput("tel", phoneNumber(), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setDate("company.trading_commenced_date", randomDate())
                cy.setInput("company.website_url", randomUrl());
                cy.setInput("company.contact_name", fullName);
                cy.setInput("company.contact_email", agencyEmail());
                cy.setInput("tel", phoneNumber(), 1);
                cy.setDropDown("payment_terms", payment_terms);
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    industry = value.data.config_option[randomNumber(1, 4)].name
                    cy.dropDown("industries", industry);
                })
                cy.dropDown("business_currencies", mockData.rows[0].currency);
                cy.setDropDown("recommended_id", supportUser);
                cy.clickBtn("Insert").popup("No").wait(1500);
            } else {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", randomBrn());
                cy.setInput("company.vat_registration_no", vatRegistrationNumber());
                cy.setInput("company.office_email", agencyEmail());
                cy.setInput("tel", phoneNumber(), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setDate("company.trading_commenced_date", randomDate())
                cy.setInput("company.website_url", randomUrl());
                cy.setInput("company.contact_name", fullName);
                cy.setInput("company.contact_email", agencyEmail());
                cy.setInput("tel", phoneNumber(), 1);
                cy.setDropDown("payment_terms", payment_terms);
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    var industry = value.data.config_option[randomNumber(1, 4)].name
                    cy.dropDown("industries", industry);
                })
                cy.dropDown("business_currencies", mockData.rows[0].currency);
                cy.setDropDown("recommended_id", supportUser);
                cy.clickBtn("Insert").popup("No").wait(1500);
            }
        })
    }
    agencyInformationBanner(Status, compliance_status) {
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('.min-w-max .text-sm :nth-child(1)').then(id => {
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
    vatApplicable = (vat) => {
        cy.wait(2000)
        vat == 'yes' ? cy.clickTab("Currency & VAT").toggle("Yes") : null
    }
    clickSubmitPrevetting() {
        cy.clickBtn("Submit Prevetting").popup("No").wait(1000);
    }
    clickApprovePrevetting() {
        this.clickComplianceTab()
        cy.clickBtn("Approve Prevetting").popup("No").wait(1000);
    }
    clickRejectPrevetting() {
        cy.clickBtn("Reject Prevetting").popup("No").wait(1000);
    }
    clickSubmitOnboarding() {
        cy.clickBtn("Submit Onboarding").popup("No").wait(1000);
    }
    clickEdit() {
        cy.clickBtn("Edit").popup("No").wait(1000);
    }
    filterAgencyHumanID() {
        cy.log(agencyName)
        cy.idFilter('human_id', (human_id || agencyName))
    }
    clickComplianceTab() {
        cy.clickTab('Compliance')
    }
    insertAddress() {
        cy.readFile("cypress/fixtures/agency/agency.json").then((mockData) => {
            cy.clickTab("Address");
            cy.clickBtn("Add Address")
            cy.setAddress('Registered Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, mockData.rows[0].country, randomPostCode());
        });
    }
    insertBankAccount() {
        cy.clickTab("Bank Accounts");
        cy.clickBtn("insert").setBankAcc(randomBankName(), company_name, accountNumber(), sortCode(), swiftCode(), ibanNumber())
        cy.clickBtn('Insert').popup('No')
        //Bank Statement
        cy.setKyc("Bank Statement", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    enableSelfServeRequest() {
        cy.clickTab("Basic Info").wait(2500);
        cy.get('[id="is_request_allowed"]').click().wait(200);
        cy.clickBtn("Save").popup("No").wait(1000);
    }
    uploadAgencyLogo() {
        cy.uploadFile("agency/doc/logo.jpg").wait(1000);
        cy.clickBtn("Insert").popup("No").wait(1000);
    }
    insertKycDetails({ mandatoryKycFields }) {
        if (mandatoryKycFields == 'yes') {
            this.insertCreditSafeDetails()
            this.insertCompaniesHouseDetails()
            this.insertVatDetails()
            this.insertPayeDetails()
            this.insertInsuranceDetails()
        } else {
            this.insertCreditSafeDetails()
            this.insertCompaniesHouseDetails()
            this.insertLinkedInDetails()
            this.insertWebsiteDomainDetails()
            this.insertChargesAndNegativeInformationDetails()
            this.insertVatDetails()
            this.insertPayeDetails()
            this.insertInsuranceDetails()
        }
    }
    insertCreditSafeDetails() {
        cy.clickTab("KYC").wait(1000);
        cy.setKyc("Credit Safe", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertCompaniesHouseDetails() {
        cy.setKyc("Companies House", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertLinkedInDetails() {
        cy.setKyc("LinkedIn", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertChargesAndNegativeInformationDetails() {
        cy.setKyc("Charges and Negative information", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertWebsiteDomainDetails() {
        cy.setKyc("Website domain", valid_from, valid_to, "agency/doc/cy_1.jpeg", "Testing");
    }
    insertVatDetails() {
        cy.setKyc("VAT", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertPayeDetails() {
        cy.setKyc("PAYE Statement", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertInsuranceDetails() {
        cy.setKyc("Insurance", valid_from, valid_to, "agency/doc/cy_1.jpeg");
    }
    insertDirectorUser() {
        cy.readFile("cypress/fixtures/agency/agency.json").then((mockData) => {
            cy.clickTab("Directors").wait(300);
            cy.clickBtn("insert").then(() => {
                cy.setInput("user.first_name", randomFirstName())
                cy.setInput("user.last_name", randomLastName())
                directorEmail = agencyEmail()
                cy.setInput("user.email", directorEmail)
                cy.setInput("tel", phoneNumber(), 0)
                cy.setDate("date_of_birth", randomDate());
                mockData.rows[0].director_nationality !== null ? cy.setDropDown("nationalities", mockData.rows[0].director_nationality) : null;
            }).clickBtn("Insert").popup("No").wait(1000);
        })
    }
    insertDirectorAddress() {
        cy.readFile("cypress/fixtures/agency/agency.json").then((mockData) => {
            cy.clickBtn("Add Address");
            cy.setAddress('Residential Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, 'United Kingdom', randomPostCode());
        })
    }
    insertDirectorPassportId() {
        cy.setKyc("Photo ID", valid_from, valid_to, "agency/doc/cy_3.jpeg");
    }
    insertDirectorProofOfAddress() {
        cy.setKyc("Proof of Address", valid_from, valid_to, "agency/doc/cy_4.jpeg");
    }
    insertTermsOfBusinessDetails() {
        cy.clickTab("Terms of Business").wait(200);
        cy.setKyc("Signed Copy", valid_from, valid_to, "agency/doc/cy_4.jpeg");
    }
    clickSubmitCompliance() {
        cy.clickBtn("Submit Compliance").popup("No").wait(1000);
    }
    clickApproveCompliance() {
        this.clickComplianceTab()
        cy.clickBtn("Approve Compliance").popup("No").wait(1000);
    }
    clickRejectCompliance() {
        this.clickComplianceTab()
        cy.clickBtn("Reject Compliance").popup("No").wait(1000);
    }
    mapFunder = (fundingModel) => {
        if (fundingModel == 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(funder => {
                var directFunder = funder.directEntities[0].funders
                cy.clickTab("Allocation").wait(2000);
                cy.clickBtn("Add Funder");
                cy.setDropDown("from_business_id", directFunder).wait(200);
                cy.dropDown("disallowed_days", disallowedDays()).wait(200);
                cy.get('[id="funding_model"]').then((el) => {
                    funding_model = el.text()
                    cy.log(funding_model)
                    if (funding_model === 'Direct') {
                        cy.dropDown('funding_properties.client_invoice_format.from', 'Agency')
                        cy.dropDown('funding_properties.client_invoice_format.on_behalf_of', 'Funder')
                        cy.clickBtn("Insert").popup("No").wait(2000);
                    } else {
                        cy.clickBtn("Insert").popup("No").wait(2000);
                    }
                })
            })
        } else {
            cy.readFile('cypress/fixtures/testData.json').then(funder => {
                var indirectFunder = funder.indirectEntities[0].funders
                cy.clickTab("Allocation").wait(2000);
                cy.clickBtn("Add Funder");
                cy.setDropDown("from_business_id", indirectFunder).wait(200);
                cy.setDropDown("disallowed_days", disallowedDays()).wait(200);
                cy.get('[id="funding_model"]').then((el) => {
                    funding_model = el.text()
                    if (funding_model === 'Direct') {
                        cy.dropDown('funding_properties.client_invoice_format.from', 'Agency')
                        cy.dropDown('funding_properties.client_invoice_format.on_behalf_of', 'Funder')
                        cy.clickBtn("Insert").popup("No").wait(1000);
                    } else {
                        cy.clickBtn("Insert").popup("No").wait(1000);
                    }
                })
            })
        }
    }
    insertServiceCharges(fundingModel) {
        cy.log(fundingModel)
        if (fundingModel === 'Direct') {
            cy.clickTab('Service Charges').wait(3000)
            cy.serviceCharge(fundingModel);
        } else {
            cy.clickTab("Service Charges");
            cy.serviceCharge(fundingModel);
        }
    }
    insertAgencyUsers() {
        cy.clickTab("Agency Users").wait(500);
        cy.clickBtn("Create (or) Map User");
        agencyConsultantEmail = agencyEmail()
        cy.setUser(faker.person.firstName(), faker.person.lastName(), agencyConsultantEmail, phoneNumber(), phoneNumber(), 'Agency Consultant').wait(500);
        cy.clickBtn("Create (or) Map User");
        agencyAdminEmail = agencyEmail()
        cy.setUser(faker.person.firstName(), faker.person.lastName(), agencyAdminEmail, phoneNumber(), phoneNumber(), 'Agency Admin').wait(500);
        cy.clickBtn("Create (or) Map User");
        agencyReadOnlyEmail = agencyEmail()
        cy.setUser(faker.person.firstName(), faker.person.lastName(), agencyReadOnlyEmail, phoneNumber(), phoneNumber(), 'Agency Read Only').wait(500);
    }
    insertStaffUsers() {
        cy.clickTab("Staff").wait(200);
        cy.popup('No') // Bug
        cy.clickBtn("Add Staff");
        cy.setDropDown("type", supportType());
        cy.setDropDown("user_id", supportUser);
        cy.clickBtn("Insert").popup("No").wait(1000);
    }
    clickRequestCreditLimit() {
        cy.clickBtn('Request Credit Limit').popup('No').wait(800)
    }
    clickReviewCreditTab() {
        cy.clickTab('Review Credit')
    }
    AddCreditLimit() {
        cy.readFile('cypress/fixtures/agency/agency.json').then(mockData => {
            cy.clickTab("Review Credit").wait(1000);
            cy.clickBtn("Add Funder Limit").wait(500);
            cy.setInput("amount", mockData.rows[0].funder_limit, 0);
            mockData.rows[0].bad_debt !== null && mockData.rows[0].bad_debt !== 0 ? cy.setInput("bad_debt_amount", mockData.rows[0].bad_debt) : null;
            cy.setInput("credit_limit_reference", `REF${randomNumber(1, 9999)}`);
            cy.setInput("bad_debt_limit_reference", `REF${randomNumber(1, 9999)}`);
            cy.wait(2500)
            cy.clickBtn("Insert").popup("No").wait(1500);
        })

    }
    clickApproveOnboarding() {
        cy.clickTab("Review Credit").wait(1000);
        cy.clickBtn("Approve onboarding").popup("No");
    }
    clickRejectOnboarding() {
        cy.clickTab("Review Credit").wait(1000);
        cy.clickBtn('Reject onboarding').popup('No').wait(1000)
    }
    clickPrevettingTab() {
        cy.clickTab('Prevetting')
    }
    clickAllocationTab() {
        cy.clickTab('Allocation')
    }
    directorAccountSetUp(subdomain) {
        cy.newUserAccountSetUp(subdomain, directorEmail)
    }
    adminAccountSetUp(subdomain) {
        cy.newUserAccountSetUp(subdomain, agencyAdminEmail)
    }
    readOnlyAccountSetUp(subdomain) {
        cy.newUserAccountSetUp(subdomain, agencyReadOnlyEmail)
    }
    consultantAccountSetUp(subdomain) {
        cy.newUserAccountSetUp(subdomain, agencyConsultantEmail)
    }
    logoutUser() {
        cy.logout()
    }
}
export const agencyPage = new AgencyPage();