import { getSupportUsers, industries, paymentTerms } from "../utility/api";
import { faker } from "@faker-js/faker";
import { Now, accountNumber, amountFormate, clientEmail, disallowedDays, ibanNumber, phoneNumber, randomAddressLine1, randomBankName, randomBrn, randomBusinessName, randomCity, randomDate, randomFirstName, randomFullName, randomKycDates, randomLastName, randomNumber, randomPostCode, randomUrl, shortDate, sortCode, supportType, swiftCode, todayDate, vatRegistrationNumber } from "../utility/functions";
import { client_name, hiringManager as tempPlacementHiringManager, timesheetApprover, invoiceContact as tempPlacementInvoiceContact } from "./TemporaryPlacementRequestPage";
import { client_name as clientName, hiringManager as permPlacementHiringManager, invoiceContact as permPlacementInvoiceContact } from "./PermPlacementRequestPage";
let { valid_from, valid_to } = randomKycDates();
let human_id, company_name, industry, payment_terms, funding_model, supportUser, hiringManagerEmail, timesheetApproverEmail, invoiceContactEmail, companyName

class ClientPage {
    clickCreateClient() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "client" }).then((rows) => {
            cy.writeFile("cypress/fixtures/client/client.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        paymentTerms()
        industries()
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            payment_terms = value.data.config_option[randomNumber(1, 6)].name
        })
        cy.clickBtn('Create Client')
    }
    insertBasicInformation(brn, email) {
        companyName = faker.company.name()
        cy.readFile('cypress/fixtures/client/client.json').then(mockData => {
            if (brn || email) {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", brn);
                cy.get('.custom-p:contains(Company Registration Number)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid number')
                cy.setInput("company.vat_registration_no", vatRegistrationNumber());
                cy.setInput("company.office_email", email);
                cy.get('.custom-p:contains(Email Address):eq(0)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid Email')
                cy.setInput("tel", phoneNumber(), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setInput("company.website_url", randomUrl());
                cy.setInput("tel", phoneNumber(), 1);
                cy.setDropDown("payment_terms", payment_terms);
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    industry = value.data.config_option[randomNumber(1, 4)].name
                    cy.dropDown("industries", industry);
                })
                cy.dropDown("business_currencies", mockData.rows[0].currency);
                cy.clickBtn("Insert").popup("No").wait(1500);
            } else {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", randomBrn());
                cy.setInput("company.vat_registration_no", vatRegistrationNumber());
                cy.setInput("company.office_email", clientEmail());
                cy.setInput("tel", phoneNumber(), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setInput("company.website_url", randomUrl());
                cy.setInput("tel", phoneNumber(), 1);
                cy.setDropDown("payment_terms", payment_terms);
                cy.readFile('cypress/fixtures/config/industries.json').then(value => {
                    var industry = value.data.config_option[randomNumber(1, 4)].name
                    cy.dropDown("industries", industry);
                })
                cy.dropDown("business_currencies", mockData.rows[0].currency);
                cy.clickBtn("Insert").popup("No").wait(1500);
            }
        })
    }
    clientInformationBanner(Status, compliance_status) {
        cy.get('[data-component="Organisms: Info"]:eq(0)').within(() => {
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
    insertCreditSafeReport() {
        cy.setKyc("Credit safe report", valid_from, valid_to, "client/doc/credit_safe_report.pdf", "credit safe report");
    }
    insertAddress() {
        cy.readFile("cypress/fixtures/client/client.json").then((mockData) => {
            cy.clickTab("Address").wait(300);
            cy.clickBtn("Add Address");
            cy.setAddress('Registered Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, mockData.rows[0].country, randomPostCode());
        });
    }
    vatApplicable(vat) {
        cy.wait(2000)
        vat == 'yes' ? cy.clickTab("Currency & VAT").toggle("Yes") : null
    }
    mapAgency(fundingModel) {
        if (fundingModel == 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                cy.clickTab("Agencies");
                cy.clickBtn("Add Agency");
                cy.setDropDown("to_business_id", testData.directEntities[0].agencies).clickBtn("Insert").popup("No").wait(500);
            })
        } else {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                cy.clickTab("Agencies");
                cy.clickBtn("Add Agency");
                cy.setDropDown("to_business_id", testData.indirectEntities[0].agencies).clickBtn("Insert").popup("No").wait(500);
            })
        }
    }
    clickRequestCreditLimit() {
        cy.clickBtn('Request Credit Limit').popup("No").wait(500);
    }
    filterClientHumanId() {
        cy.idFilter('human_id', human_id || client_name || clientName)
    }
    addCreditLimit() {
        cy.readFile("cypress/fixtures/client/client.json").then((mockData) => {
            cy.clickTab("Review Credit").wait(2000);
            cy.clickBtn("Add Credit Limit").then(() => {
                cy.setInput("amount", mockData.rows[0].funder_limit, 0);
                mockData.rows[0].bad_debt_limit !== null && mockData.rows[0].bad_debt_limit !== 0 ? cy.setInput("bad_debt_amount", mockData.rows[0].bad_debt_limit) : null;
                cy.setInput("credit_limit_reference", `REF${randomNumber(1, 9999)}`);
                cy.setInput("bad_debt_limit_reference", `REF${randomNumber(1, 9999)}`);
                cy.setDate("valid_from", valid_from);
            }).wait(1000).clickBtn("Insert").popup("No").wait(500);
        })
    }
    uploadTermsOfBusiness() {
        cy.clickTab('Terms of Business')
        cy.clickBtn('Insert')
        cy.dropDown('type', 'Client Terms')
        cy.uploadFile('TOB/client_terms.pdf')
        cy.clickBtn('Insert').popup('No')
    }
    updateCreditLimit(credit_limit) {
        cy.clickTab("Review Credit").wait(1000);
        cy.get('[id="amount"]').clear()
        cy.get('[id="bad_debt_amount"]').clear()
        cy.setInput('amount', credit_limit, 0)
        cy.get('[id="amount"]').type('{backspace}')
        cy.clickBtn("Save").popup("No").wait(500);
        cy.log(amountFormate(credit_limit))
        cy.reload()
        cy.get('form .font-semibold').should('contain', amountFormate(credit_limit))
    }
    clickReviewCreditTab() {
        cy.clickTab('Review Credit')
    }
    clickRejectCreditLimit() {
        cy.clickBtn('Reject Credit Limit').popup('No').wait(300)
    }
    clickApproveCreditLimit() {
        cy.clickBtn('Approve Credit Limit').popup('No').wait(300)
    }
    clickComplianceTab() {
        cy.clickTab("Compliance").wait(500);
    }
    addClientUsers() {
        cy.clickBtn("Create (or) Map User");
        hiringManagerEmail = clientEmail()
        cy.setUser(randomFirstName(), randomLastName(), hiringManagerEmail, phoneNumber(), null, 'Hiring Manager');
        cy.clickBtn("Create (or) Map User");
        timesheetApproverEmail = clientEmail()
        cy.setUser(randomFirstName(), randomLastName(), timesheetApproverEmail, phoneNumber(), null, 'Timesheet Approver');
        cy.clickBtn("Create (or) Map User");
        invoiceContactEmail = clientEmail()
        cy.setUser(randomFirstName(), randomLastName(), invoiceContactEmail, phoneNumber(), null, 'Invoice Contact');
    }
    clickKycTab() {
        cy.clickTab('KYC').wait(500);
    }
    insertCompaniesHouseScreenShot() {
        cy.setKyc("Companies House Screenshot", valid_from, valid_to, "client/doc/companies_house_screenshot.jpg", "Testing");
    }
    insertFinancialStatement() {
        cy.setKyc("Financial Statement", valid_from, valid_to, "client/doc/financial_statement.png", "Testing");
    }
    insertLinkedIn() {
        cy.setKyc("LinkedIn", valid_from, valid_to, "client/doc/linkedIn.png", "Testing");
    }
    insertDomain() {
        cy.setKyc("Domain", valid_from, valid_to, "client/doc/domain.png", "Testing");
    }
    insertWebsiteCheck() {
        cy.setKyc("Website Check", valid_from, valid_to, "client/doc/website_check.png", "Testing");
    }
    insertKycDetails({ mandatoryKycFields }) {
        if (mandatoryKycFields == 'yes') {
            cy.get('[id="preferences.credit_safe_enquiry_3_months"]').should('be.visible')
            this.insertCompaniesHouseScreenShot()
        } else {
            this.insertFinancialStatement()
            this.insertLinkedIn()
            this.insertDomain()
            this.insertWebsiteCheck()
            this.insertCreditSafe()
        }
    }
    insertCreditSafe() {
        cy.setInput("preferences.credit_safe_enquiry_3_months", randomNumber(1, 999));
        cy.setInput("preferences.credit_safe_enquiry_6_months", randomNumber(1, 9999));
        cy.setInput("preferences.credit_safe_enquiry_9_months", randomNumber(1, 99999));
        cy.clickBtn("Save").popup("No").wait(500);
    }
    clickBasicInfoTab() {
        cy.clickTab('Basic Info')
    }
    updateBasicInfo() {
        this.clickBasicInfoTab()
        cy.wait(3000)
        cy.setDropDown('mailing_address_id', 'Registered Address')
        cy.clickBtn("Save").popup("No").wait(1000);
    }
    addSupportUsers() {
        cy.clickTab("Staff");
        cy.clickBtn("Add Staff");
        cy.setDropDown("type", supportType());
        getSupportUsers()
        industries()
        cy.readFile('cypress/fixtures/config/industries.json').then(value => {
            industry = value.data.config_option[randomNumber(1, 2)].name
            cy.log(industry)
        })
        cy.readFile('cypress/fixtures/config/supportUsers.json').then(user => {
            supportUser = user.data.platform_user[randomNumber(1, 3)].name
            cy.setDropDown("user_id", supportUser);
        })
        cy.clickBtn("Insert").popup("No").wait(500);

    }
    fillBasicInfoDetails() {
        industries()
        cy.readFile('cypress/fixtures/config/industries.json').then(value => {
            industry = value.data.config_option[randomNumber(1, 2)].name
            cy.log(industry)
            // Basic info 
            cy.setInput("company.office_email", clientEmail());
            cy.setInput("tel", phoneNumber(), 0);
            cy.setDate("company.incorporated_date", randomDate());
            cy.setInput("company.website_url", randomUrl());
            cy.setInput("tel", phoneNumber(), 1);
            cy.dropDown("industries", industry);
            cy.clickBtn("Save").popup("No").wait(1500);
        })
        // Credit Safe Report
        this.insertCreditSafeReport()
    }
    clickSubmitCompliance() {
        cy.clickBtn("Submit Compliance").popup("No").wait(500);
    }
    clickApprove() {
        cy.clickBtn('Approve').popup("No").wait(500);
    }
    clickReject() {
        cy.clickBtn('Reject').popup("No").wait(500);
    }
    clickCreditLimitRequestTab() {
        cy.clickTab('Credit Limit Request')
    }
    clickEdit() {
        cy.clickBtn('Edit').popup('No').wait(300)
    }
    hiringManagerAccountSetup(subdomain) {
        cy.log(hiringManagerEmail, tempPlacementHiringManager, permPlacementHiringManager)
        cy.newUserAccountSetUp(subdomain, hiringManagerEmail || tempPlacementHiringManager || permPlacementHiringManager)
    }
    timesheetApproverAccountSetup(subdomain) {
        cy.log(timesheetApproverEmail, timesheetApprover)
        cy.newUserAccountSetUp(subdomain, timesheetApproverEmail || timesheetApprover)
    }
    invoiceContactAccountSetup(subdomain) {
        cy.log(invoiceContactEmail, tempPlacementInvoiceContact, permPlacementInvoiceContact)
        cy.newUserAccountSetUp(subdomain, invoiceContactEmail || tempPlacementInvoiceContact || permPlacementInvoiceContact)
    }
}
export const clientPage = new ClientPage();