import { faker } from "@faker-js/faker";
import { buzContacts } from "../utility/api";
import { clientEmail, randomBrn, randomNumber, shortDate, vatRegistrationNumber } from "../utility/functions";
import { homePage } from "./HomePage";



let contractId, agency_name, client_name, contractStartDate, jobTitle, candidateName, hiringManager, timesheetApprover, invoiceContact, clientPaymentTerms, requestId
export { hiringManager, invoiceContact, contractId, agency_name, client_name, contractStartDate }
class permanentPlacementRequest {
    clickNewRequest() {
        cy.clickBtn('New Request')
    }
    getExistingClient(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                client_name = testData.directEntities[0].clients
                buzContacts(client_name)
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var hiring_manager_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("hiring_manager") && user.user.is_active == true);
                    var activeHM = hiring_manager_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    hiringManager = activeHM[0]?.user?.email
                    var timesheet_approver_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("timesheet_approver") && user.user.is_active == true);
                    var activeTMS = timesheet_approver_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    timesheetApprover = activeTMS[0]?.user?.email
                    var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true);
                    var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    invoiceContact = activeIC[0]?.user?.email
                });
            });
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                client_name = testData.indirectEntities[0].clients
                buzContacts(client_name);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var hiring_manager_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("hiring_manager") && user.user.is_active == true);
                    var timesheet_approver_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("timesheet_approver") && user.user.is_active == true);
                    var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true);
                    var activeHM = hiring_manager_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    hiringManager = activeHM[0]?.user.email
                    var activeTMS = timesheet_approver_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    timesheetApprover = activeTMS[0]?.user.email
                    var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    invoiceContact = activeIC[0]?.user?.email
                })
            });
        }
    }
    clickSubmit() {
        cy.clickBtn('Submit').popup('No')
    }
    selectClient() {
        cy.get('header li:contains(Client)').click()
        cy.isAsterisk("Select Client Type", 0) ? cy.clickOptions('Existing Client').clickOptions(client_name) : null
    }
    placementDetails() {
        cy.get('header li:contains(Placement)').click()
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "perm" }).then((rows) => {
            cy.writeFile("cypress/fixtures/placement/perm.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            clientPaymentTerms = value.data.config_option[randomNumber(1, 5)].name
        })
        cy.readFile('cypress/fixtures/placement/perm.json').then(permData => {
            var startDate = permData.rows[0].start_date
            contractStartDate = shortDate(startDate)
            jobTitle = faker.person.jobTitle()
            candidateName = faker.person.fullName()
            var currency = permData.rows[0].currency
            cy.setDate('placement_details.placement_details.placement_start_date', startDate)
            cy.setInput('placement_details.placement_details.job_title', jobTitle)
            cy.setInput('placement_details.placement_details.candidate_name', candidateName)
            cy.setInput('placement_details.placement_details.invoice_amount', faker.finance.amount())
            cy.setDropDown('placement_details.placement_details.currency_id', currency)
            cy.setInput('placement_details.placement_details.po_number', `PO${randomNumber(1, 9999)}`)
            cy.setDropDown('placement_details.legal_information.client_payment_terms', clientPaymentTerms)
        })
    }
    selectExistingClientContracts() {
        cy.setDropDown("placement_details.existing_contacts.hiring_manager_user_ids", hiringManager)
        cy.setDropDown("placement_details.existing_contacts.invoice_contact_user_ids", invoiceContact)
    }
    clickSaveAndNext() {
        cy.clickBtn('Save & Next')
    }
    insertNewClientContacts() {
        invoiceContact = clientEmail()
        hiringManager = clientEmail()
        cy.addNewContact(hiringManager, 'Hiring Manager', 0)
        cy.addNewContact(invoiceContact, 'Invoice Contact', 1)
    }
    inputNewClientDetails() {
        client_name = faker.company.name()
        cy.get('header li:contains(Client)').click()
        cy.clickOptions('New Client')
        // basic Information details
        cy.clickOptions('No')
        cy.setInput('client.new_client.company_name', client_name)
        cy.setInput('client.new_client.registration_no', randomBrn())
        cy.dropDown('client.new_client.incorporated_country', 'United Kingdom')
        cy.setInput('client.new_client.tax_registration_no', vatRegistrationNumber())
        // Registered Address
        cy.setInput('client.new_client.registered_address.line_1', faker.location.streetAddress())
        cy.setInput('client.new_client.registered_address.city', faker.location.city())
        cy.setInput('client.new_client.registered_address.state', faker.location.state())
        cy.dropDown('client.new_client.registered_address.country_id', 'United Kingdom')
        cy.setInput('client.new_client.registered_address.zipcode', faker.location.zipCode())
        // Invoicing Address
        cy.get('[id="client.new_client.invoicing_address.mark_as_invoice_address"]').click()
        // TOB for client
        cy.uploadFile('TOB/client_terms.pdf')
    }
    requestInformationBanner(status) {
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('[class="break-normal font-recoleta font-semibold text-3xl"]').then(id => {
                requestId = id.text()
            })
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(1)').then(id => {
                agency_name = id.text()
            })
            cy.get('[data-component="Atom: Badge"]').should('contain', status)
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(2)').should('contain', client_name)
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(3)').should('contain', contractStartDate)
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(4)').should('contain', jobTitle)
        })
    }
    permanentPlacementGeneration() {
        homePage.navigateToPermanentPlacementListPage()
        cy.idFilter('request_id', requestId).wait(2500)
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('[class="break-normal font-recoleta font-semibold text-3xl"]').then(value => {
                contractId = value.text()
            })
            cy.get('[data-component="Atom: Badge"]:eq(0)').then(value => {
                var text = value.text()
                if (text == 'Pending Client Approval') {
                    cy.get('[data-component="Atom: Badge"]:eq(0)').should('contain.text', 'Pending Client Approval')
                } else if (text == 'Awaiting Raise Approval') {
                    cy.get('[data-component="Atom: Badge"]:eq(0)').should('contain.text', 'Awaiting Raise Approval')
                }
            })
        })
        cy.logout()
    }
}
export const permRequestPage = new permanentPlacementRequest();