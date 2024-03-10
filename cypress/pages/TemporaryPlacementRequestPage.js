import { buzContacts, getAgencyClient, getPaymentService, noticePeriod } from "../utility/api";
import _ from 'lodash'
import { randomNumber, contractRates, shortDate, todayDate, Now, umbrellaContractorEmail, limitedContractorEmail, randomBrn, vatRegistrationNumber, randomAddressLine1, clientEmail } from "../utility/functions";
import { faker } from "@faker-js/faker";
import { homePage } from "./HomePage";
let contractor_name, firstName, lastName, paymentCompany, client_name, agency_name, contractorEmail, payment_type, requestId, currency, hiringManager, timesheetApprover, invoiceContact, alphaCode, shortStartDate, shortEndDate, clientNoticePeriod, contractorNoticePeriod, clientPaymentTerms, contractorPaymentTerms, additionalClientRate, additionalContractorRate, standardContractorRate, standardClientRate, jobTitle, contractId
export { shortEndDate, shortStartDate, agency_name, contractor_name, client_name, contractorEmail, hiringManager, timesheetApprover, invoiceContact, contractId, paymentCompany }
class TemporaryRequest {
    clickNewRequest() {
        cy.clickBtn('New Request')
    }
    getExistingContractor(paymentType, fundingModel) {
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (fundingModel === 'Direct' && paymentType == 'Umbrella') {
                contractor_name = testData.directEntities[0].umbrellaContractor
                cy.wait(1500)
                cy.log(contractor_name)
                getPaymentService(contractor_name);
                buzContacts(contractor_name)
                cy.log(contractor_name)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var business = data.res.data.platform_business.filter(name => name.business_contacts[0])
                    contractorEmail = business[0].business_contacts[0].user.email
                    cy.log(contractorEmail)
                    cy.log(data)
                })
            } else if (fundingModel === 'Indirect' && paymentType == 'Umbrella') {
                contractor_name = testData.indirectEntities[0].umbrellaContractor
                getPaymentService(contractor_name)
                buzContacts(contractor_name)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    cy.log(data.res.data.platform_business[0].business_contacts[0].user.name)
                    var business = data.res.data.platform_business.filter(name => name.business_contacts[0])
                    contractorEmail = business[0].business_contacts[0].user.email
                    cy.log(contractorEmail)
                })
            } else if (fundingModel === 'Direct' && paymentType == 'Limited') {
                contractor_name = testData.directEntities[0].limitedContractor
                getPaymentService(contractor_name)
                buzContacts(contractor_name)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    cy.log(data.res.data.platform_business[0].business_contacts[0].user.name)
                    var business = data.res.data.platform_business.filter(name => name.business_contacts[0])
                    contractorEmail = business[0].business_contacts[0].user.email
                    cy.log(contractorEmail)
                })
            } else if (fundingModel === 'Indirect' && paymentType == 'Limited') {
                contractor_name = testData.indirectEntities[0].limitedContractor
                getPaymentService(contractor_name)
                buzContacts(contractor_name)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    cy.log(data.res.data.platform_business[0].business_contacts[0].user.name)
                    var business = data.res.data.platform_business.filter(name => name.business_contacts[0])
                    contractorEmail = business[0].business_contacts[0].user.email
                    cy.log(contractorEmail)
                })
            }
        });
    }
    getExistingClient(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                client_name = testData.directEntities[0].clients
                buzContacts(client_name);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var platform_business = data.res.data.platform_business
                    platform_business.forEach(business => {
                        var hiring_manager_users = business.business_contacts.filter(data => data.type.includes("hiring_manager") && data.user.is_active == true && data.user.is_confirmed == true)
                        hiring_manager_users.forEach(data => {
                            hiringManager = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var timesheet_approver_users = business.business_contacts.filter(data => data.type.includes("timesheet_approver") && data.user.is_active == true && data.user.is_confirmed == true)
                        timesheet_approver_users.forEach(data => {
                            timesheetApprover = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var invoice_contact_users = business.business_contacts.filter(data => data.type.includes("invoice_contact") && data.user.is_active == true)
                        invoice_contact_users.forEach(data => {
                            invoiceContact = data.user.email
                        })
                    })
                });
            });
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                client_name = testData.indirectEntities[0].clients
                buzContacts(client_name);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var platform_business = data.res.data.platform_business
                    platform_business.forEach(business => {
                        var hiring_manager_users = business.business_contacts.filter(data => data.type.includes("hiring_manager") && data.user.is_active == true && data.user.is_confirmed == true)
                        hiring_manager_users.forEach(data => {
                            hiringManager = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var timesheet_approver_users = business.business_contacts.filter(data => data.type.includes("timesheet_approver") && data.user.is_active == true && data.user.is_confirmed == true)
                        timesheet_approver_users.forEach(data => {
                            timesheetApprover = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var invoice_contact_users = business.business_contacts.filter(data => data.type.includes("invoice_contact") && data.user.is_active == true)
                        invoice_contact_users.forEach(data => {
                            invoiceContact = data.user.email
                        })
                    })
                })
            });
        }
    }
    selectContractor(paymentType) {
        cy.log(contractor_name)
        // cy.wrap(contractor_name).trigger('copy')
        cy.isAsterisk("Select Contractor Type", 0) ? cy.clickOptions('Existing Contractor').clickOptions(contractor_name) : null
        cy.clickOptions(paymentType)
    }
    inputNewContractorDetails(paymentType) {
        firstName = faker.person.firstName('male')
        lastName = faker.person.lastName('male')
        this.clickNewRequest()
        cy.get('header li:contains(Contractor)').click()
        cy.clickOptions('New Contractor')
        cy.setInput('contractor.new_contractor.first_name', firstName)
        cy.setInput('contractor.new_contractor.last_name', lastName)
        if (paymentType == 'Umbrella') {
            contractorEmail = umbrellaContractorEmail()
            cy.setInput('contractor.new_contractor.contractor_email', contractorEmail)
        } else if(paymentType == 'Limited'){
            contractorEmail = limitedContractorEmail()
            cy.setInput('contractor.new_contractor.contractor_email', contractorEmail)
        }
        cy.get('[id="contractor.new_contractor.enable_payment_company"]').click()
        cy.clickOptions(paymentType)
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
    }
    selectNewPaymentCompanyByAgencyUser(paymentType) {
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (paymentType == 'Umbrella') {
                paymentCompany = testData.paymentCompanies[0].umbrellaCompanies
                cy.get(`[id="contractor.new_contractor.payment_company.payment_company"]`).type(paymentCompany).wait(1200)
                cy.get(`[class="break-normal break-words"]:contains(${paymentCompany})`).click()
            } else if (paymentType == 'Limited') {
                cy.documentUpload('Right To Work', 'contractor/doc/right_to_work.png').clickBtn('Save & Next');
                cy.documentUpload('Proof of ID', 'contractor/doc/proof_of_id.png').clickBtn('Save & Next');
            }
        })
    }
    selectNewPaymentCompanyByContractorUser(paymentType) {
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (paymentType == 'Umbrella') {
                paymentCompany = testData.paymentCompanies[0].umbrellaCompanies
                cy.get(`[id="contractor.existing_contractor.payment_company.payment_company"]`).type(paymentCompany).wait(1200)
                cy.get(`[class="break-normal break-words"]:contains(${paymentCompany})`).click()
            } else if (paymentType == 'Limited') {
                cy.documentUpload('Right To Work', 'contractor/doc/right_to_work.png').clickBtn('Save & Next');
                cy.documentUpload('Proof of ID', 'contractor/doc/proof_of_id.png').clickBtn('Save & Next');
            }
        })
    }
    selectClient() {
        cy.get('header li:contains(Client)').click()
        cy.isAsterisk("Select Client Type", 0) ? cy.clickOptions('Existing Client').clickOptions(client_name) : null
    }
    selectExistingPaymentCompanyByAgencyUser(paymentType) {
        cy.get('header li:contains(Contractor)').click()
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (paymentType == 'Umbrella') {
                paymentCompany = testData.paymentCompanies[0].umbrellaCompanies
                cy.get(`[id="contractor.existing_contractor.payment_company.payment_company"]`).type(paymentCompany).wait(1200)
                cy.get(`[class="break-normal break-words"]:contains(${paymentCompany})`).click()
            }
        })
    }
    additionalRateDetails(unitType) {
        const { clientRate, contractorRate } = contractRates(unitType)
        additionalContractorRate = contractorRate
        additionalClientRate = clientRate
        //additional rate
        cy.clickBtn("Add New")
            .setInput("placement_details.additional_rate.0.rate_name", 'Overtime')
            .setInput("placement_details.additional_rate.0.contractor_rate", additionalContractorRate)
            .setInput("placement_details.additional_rate.0.client_rate", additionalClientRate)
        unitType == 'Hours' ? cy.setInput("placement_details.additional_rate.0.units", '37.5') : unitType == 'Days' ? cy.setInput("placement_details.additional_rate.0.units", '5') : null
    }
    placementDetails(timesheetFrequency, unitType, { additionalRateEntry }) {
        cy.log(timesheetFrequency, unitType)
        cy.get('header li:contains(Placement)').click()
        cy.readFile('cypress/fixtures/config/noticePeriod.json').then(value => {
            clientNoticePeriod = value.data.config_option[randomNumber(1, 3)].name
            contractorNoticePeriod = value.data.config_option[randomNumber(1, 5)].name
        })
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            clientPaymentTerms = value.data.config_option[randomNumber(1, 5)].name
            contractorPaymentTerms = value.data.config_option[randomNumber(1, 3)].name
        })
        cy.readFile('cypress/fixtures/placement/temp.json').then(tempData => {
            var startDate = tempData.rows[0].start_date
            var endDate = tempData.rows[0].end_date
            currency = tempData.rows[0].currency
            shortStartDate = shortDate(startDate)
            shortEndDate = shortDate(endDate)
            const { clientRate, contractorRate } = contractRates(unitType)
            standardContractorRate = contractorRate
            standardClientRate = clientRate
            jobTitle = faker.person.jobTitle()
            cy.setDate("placement_details.placement_details.placement_start_date", startDate)
            cy.setDate("placement_details.placement_details.placement_end_date", endDate)
            tempData.rows[0].work_location ? cy.setDropDown("placement_details.placement_details.work_location", tempData.rows[0].work_location).isAsterisk("Work Location", 0) : null
            cy.setInput("placement_details.placement_details.job_title", jobTitle)
            //financial information
            cy.dropDown("placement_details.financial_information.timesheet_frequency", timesheetFrequency)
            cy.dropDown("placement_details.financial_information.currency", currency)
            cy.dropDown("placement_details.financial_information.unit_type", unitType)
            cy.setInput("placement_details.financial_information.po_number", `PO#${randomNumber(1, 99999)}`)
            //legal information
            tempData.rows[0].ir35 ? cy.setDropDown("placement_details.legal_information.ir35", tempData.rows[0].ir35) : null;
            cy.dropDown("placement_details.legal_information.client_notice_period", clientNoticePeriod)
            cy.dropDown("placement_details.legal_information.contractor_notice_period", contractorNoticePeriod)
            cy.dropDown("placement_details.legal_information.client_payment_terms", clientPaymentTerms)
            contractorPaymentTerms !== '7 Days' ? cy.setDropDown("placement_details.legal_information.contractor_payment_terms", contractorPaymentTerms) : null
            //standard rate
            cy.setInput("placement_details.standard_rate.contractor_rate", standardContractorRate)
            cy.setInput("placement_details.standard_rate.client_rate", standardClientRate)
            unitType == 'Hours' ? cy.setInput("placement_details.standard_rate.units", '37.5') : unitType == 'Days' ? cy.setInput("placement_details.standard_rate.units", '5') : null
            // additional rate
            additionalRateEntry == 'yes' ? this.additionalRateDetails(unitType) : null
            cy.setDropDown('placement_details.expense_funding_type', 'Not Applicable')
        })
    }
    insertNewClientContacts() {
        timesheetApprover = clientEmail()
        invoiceContact = clientEmail()
        hiringManager = clientEmail()
        cy.addNewContact(hiringManager, 'Hiring Manager', 0)
        cy.addNewContact(timesheetApprover, 'Timesheet Approver', 1)
        cy.addNewContact(invoiceContact, 'Invoice Contact', 2)
    }
    selectExistingClientContacts() {
        cy.log("hiring_manager",hiringManager, "timesheet_approver",timesheetApprover, "invoice_contact",invoiceContact)
        cy.setDropDown("placement_details.existing_contacts.hiring_manager_user_ids", hiringManager)
        cy.setDropDown("placement_details.existing_contacts.timesheet_approver_user_ids", timesheetApprover)
        cy.setDropDown("placement_details.existing_contacts.invoice_contact_user_ids", invoiceContact)
    }
    selectCurrency() {
        cy.readFile('cypress/fixtures/placement/temp.json').then(tempData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == tempData.rows[0].currency)
                alphaCode = currencyData[0].alpha_code
            })
            tempData.rows[0].currency !== 'Pound Sterling' ? cy.dropDown('currency_id', tempData.rows[0].currency) : null
        })
    }
    reviewRequestDetails(unitType, timesheetFrequency, { additionalRateEntry }) {
        cy.get('header li:contains(Review)').click()
        // Contractor Information
        cy.get('.w-full.mt-4:contains(Contractor Information)').within(() => {
            cy.get('[data-component="Molecules: RadioCard"]:eq(0)').should('contain', contractor_name)
            cy.get('[data-component="Molecules: RadioCard"]:eq(1)').should('contain', _.capitalize(payment_type))
            cy.get('[id="contractor.existing_contractor.payment_company.payment_company"]').should('contain', paymentCompany)
        })
        // Client Information
        cy.get('.w-full.mt-4:contains(Client Information)').within(() => {
            cy.get('[data-component="Molecules: RadioCard"]:eq(0)').should('contain', client_name)
        })
        // Placement Details
        cy.get('.w-full.mt-4:contains(Placement Details)').within(() => {
            cy.get('[id="placement_details.placement_details.placement_start_date"]').should('contain', shortStartDate)
            cy.get('[id="placement_details.placement_details.placement_end_date"]').should('contain', shortEndDate)
            cy.get('[id="placement_details.placement_details.job_title"]').should('contain', jobTitle)

        })
        // Financial Information
        cy.get('[class="w-full mt-4 "]:contains(Financial Information):eq(1)').within(() => {
            cy.get('[id="placement_details.financial_information.timesheet_frequency"]').should('contain', timesheetFrequency)
            cy.get('[id="placement_details.financial_information.currency"]').should('contain', currency)
            cy.get('[id="placement_details.financial_information.unit_type"]').should('contain', unitType)
        })
        // Legal Information
        cy.get('[class="w-full mt-4 "]:contains(Legal Information):eq(1)').within(() => {
            cy.get('[id="placement_details.legal_information.client_notice_period"]').should('contain', clientNoticePeriod)
            cy.get('[id="placement_details.legal_information.contractor_notice_period"]').should('contain', contractorNoticePeriod)
            cy.get('[id="placement_details.legal_information.client_payment_terms"]').should('contain', clientPaymentTerms)
            cy.get('[id="placement_details.legal_information.contractor_payment_terms"]').should('contain', '7 Days')
        })
        // Standard Rate
        cy.get('[class="w-full mt-4 "]:contains(Standard Rate):eq(1)').within(() => {
            cy.get('[id="placement_details.standard_rate.contractor_rate"]').should('contain', standardContractorRate)
            cy.get('[id="placement_details.standard_rate.client_rate"]').should('contain', standardClientRate)
        })
        if (additionalRateEntry == 'yes') {
            // Additional Rate
            cy.get('[class=" w-full mt-4"]:contains(Additional Rates)').within(() => {
                cy.get('[id="placement_details.additional_rate.0.rate_name"]').should('contain', 'Overtime')
                cy.get('[id="placement_details.additional_rate.0.contractor_rate"]').should('contain', additionalContractorRate)
                cy.get('[id="placement_details.additional_rate.0.client_rate"]').should('contain', additionalClientRate)
            })
        }
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
            // cy.get('[class="font-recoleta font-semibold text-md"]:eq(3)').should('contain', contractor_name)
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(4)').should('contain', shortStartDate)
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(5)').should('contain', shortEndDate)
            cy.get('[class="font-recoleta font-semibold text-md"]:eq(6)').should('contain', jobTitle)
        })
    }
    temporaryPlacementGeneration() {
        homePage.navigateToTemporaryPlacementListPage()
        cy.idFilter('request_id', requestId)
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.wait(3000)
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
    }
    clickSubmit() {
        cy.clickBtn("Submit").popup('No')
    }
    clickSaveAndNext() {
        cy.clickBtn("Save & Next")
    }
}
export const tempRequestPage = new TemporaryRequest()