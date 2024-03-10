import { faker } from '@faker-js/faker'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'
import { buzContacts, contractMagicLink, getAgencyClient, getContractInfo, getPaymentService, getPendingClientApprovalchaser } from "../utility/api";
import { Now, amountFormate, contractRates, phoneNumber, randomBankName, randomBrn, randomNumber, shortDate, sortCode, swiftCode, todayDate } from "../utility/functions";
import { timesheets } from "../utility/query";
import { contractId, client_name, agency_name, contractor_name, shortStartDate, shortEndDate, paymentCompany, hiringManager } from './TemporaryPlacementRequestPage';
let human_id, alphaCode, currencySymbol, limitedCompanyName, formattedStartDate, formattedEndDate, agencyName, payment_company, clientName, contractorName, payment_type, timesheet_approver, invoice_contact, hiring_manager, contractor, agency_consultant
export { hiring_manager, contractor, agency_consultant, human_id, limitedCompanyName }

class TemporaryPlacement {
    clickCreateTempPlacementButton() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "temp" }).then((rows) => {
            cy.writeFile("cypress/fixtures/placement/temp.json", { rows })
            cy.log(JSON.stringify(rows))
        })
        cy.clickBtn("Create Temp Placement")
    }
    filterContractId() {
        cy.log(human_id, contractId)
        cy.idFilter('human_id', human_id = contractId)
    }
    selectFundingType(fundingType) {
        fundingType !== 'Funded' ? cy.get(`[id="funding_type"]:eq(1) [class="my-react-select__indicator my-react-select__dropdown-indicator css-tlfecz-indicatorContainer"]`).click().get(`.my-react-select__menu-list [class="break-normal break-words"]:contains(${fundingType})`).eq(0).click() : null
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
    clientMagicLinkApproval() {
        const Region = Cypress.env('REGION')
        cy.login('OA1')
        cy.log(hiringManager, hiring_manager)
        contractMagicLink('temp', hiring_manager || hiringManager)
        cy.extractContractMagicLink().then(url => {
            expect(url).includes(`${Region}-app.raisetech.io`)
            cy.visit(url).wait(2500)
            cy.log(url)
            cy.get('[data-component="Atom: TextAtom"]').should('have.text', 'This page serves solely for the purpose of reviewing and confirming the placement submitted by the Agency. Please note that Raise assumes no responsibility for any inaccuracies in the information provided.')
            cy.get('.w-4').check().clickBtn('Approve')
            cy.get('.swal2-confirm:contains(Yes)').click()
            cy.get('[class="font-bold text-2xl"]').should('contain', `You've approved the placement`)
            cy.get('[data-component="Atom: ButtonNew"]').should('be.visible')
            cy.clearAllCookies()
            cy.clearAllSessionStorage()
        })
    }
    clientMagicLinkRejection() {
        const Region = Cypress.env('REGION')
        cy.login('OA1')
        cy.log(hiringManager, hiring_manager)
        contractMagicLink('temp', hiring_manager || hiringManager)
        cy.logout()
        cy.extractContractMagicLink().then(url => {
            expect(url).includes(`${Region}-app.raisetech.io`)
            cy.visit(url).wait(2500)
            cy.get('[data-component="Atom: TextAtom"]').should('have.text', 'This page serves solely for the purpose of reviewing and confirming the placement submitted by the Agency. Please note that Raise assumes no responsibility for any inaccuracies in the information provided.')
            cy.get('.w-4').check().clickBtn('Reject')
            cy.get('.text-md').should('have.text', 'If you choose to reject the placement the Agency will be notified before they are able to amend and resubmit the placement for your review')
            cy.get('.swal2-confirm:contains(Yes)').click()
            cy.get('[class="font-bold text-2xl"]').should('contain', `You've rejected the placement`)
            cy.get('[data-component="Atom: ButtonNew"]').should('be.visible').wait(5000)
            cy.clearAllCookies()
            cy.clearAllSessionStorage()
        })
    }
    agencyDetails(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.directEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
                buzContacts(agencyName)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var platform_business = data.res.data.platform_business
                    platform_business.forEach(business => {
                        var agency_consulant_users = business.business_contacts.filter(data => data.type.includes("agency_consultant") && data.user.is_active == true && data.user.is_confirmed == true)
                        agency_consulant_users.forEach(data => {
                            agency_consultant = data.user.email
                        })
                    })
                    cy.setDropDown("agency_consultant_user_id", agency_consultant);
                })
            })
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
                buzContacts(agencyName);
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var platform_business = data.res.data.platform_business
                    platform_business.forEach(business => {
                        var agency_consulant_users = business.business_contacts.filter(data => data.type.includes("agency_consultant") && data.user.is_active == true && data.user.is_confirmed == true)
                        agency_consulant_users.forEach(data => {
                            agency_consultant = data.user.email
                        })
                    })
                    cy.setDropDown("agency_consultant_user_id", agency_consultant);
                })
            })
        } else {
            cy.log('unknown funding model!')
        }
    }
    clientDetails(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.directEntities[0].agencies
                clientName = testData.directEntities[0].clients
                //get linked clients
                getAgencyClient(agencyName);
                cy.setDropDown("client_id", clientName);
                buzContacts(clientName);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var platform_business = data.res.data.platform_business
                    platform_business.forEach(business => {
                        var hiring_manager_users = business.business_contacts.filter(data => data.type.includes("hiring_manager") && data.user.is_active == true && data.user.is_confirmed == true)
                        hiring_manager_users.forEach(data => {
                            hiring_manager = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var timesheet_approver_users = business.business_contacts.filter(data => data.type.includes("timesheet_approver") && data.user.is_active == true && data.user.is_confirmed == true)
                        timesheet_approver_users.forEach(data => {
                            timesheet_approver = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var invoice_contact_users = business.business_contacts.filter(data => data.type.includes("invoice_contact") && data.user.is_active == true)
                        invoice_contact_users.forEach(data => {
                            invoice_contact = data.user.email
                        })
                    })
                    cy.setDropDown('hiring_manager_user_ids', hiring_manager);
                    cy.setDropDown('timesheet_approver_user_ids', timesheet_approver);
                    cy.setDropDown('invoice_contact_user_ids', invoice_contact);
                });
            });
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                clientName = testData.indirectEntities[0].clients
                //get linked clients
                getAgencyClient(agencyName);
                cy.setDropDown("client_id", clientName);
                buzContacts(clientName);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var platform_business = data.res.data.platform_business
                    platform_business.forEach(business => {
                        var hiring_manager_users = business.business_contacts.filter(data => data.type.includes("hiring_manager") && data.user.is_active == true && data.user.is_confirmed == true)
                        hiring_manager_users.forEach(data => {
                            hiring_manager = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var timesheet_approver_users = business.business_contacts.filter(data => data.type.includes("timesheet_approver") && data.user.is_active == true && data.user.is_confirmed == true)
                        timesheet_approver_users.forEach(data => {
                            timesheet_approver = data.user.email
                        })
                    })
                    platform_business.forEach(business => {
                        var invoice_contact_users = business.business_contacts.filter(data => data.type.includes("invoice_contact") && data.user.is_active == true)
                        invoice_contact_users.forEach(data => {
                            invoice_contact = data.user.email
                        })
                    })
                    cy.setDropDown('hiring_manager_user_ids', hiring_manager);
                    cy.setDropDown('timesheet_approver_user_ids', timesheet_approver);
                    cy.setDropDown('invoice_contact_user_ids', invoice_contact);
                });
            });
        } else {
            cy.log('unknown funding model!')
        }
    }
    contractorDetails(fundingModel) {
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (fundingModel === 'Direct') {
                // var arr = [testData.directEntities[0].umbrellaContractor, testData.directEntities[0].limitedContractor, testData.directEntities[0].selfEmployedContractor]
                // contractorName = arr[randomNumber(0, 2)]
                contractorName = testData.directEntities[0].umbrellaContractor
                cy.wait(1500)
                cy.setDropDown("contractor_id", contractorName);
                getPaymentService(contractorName);
                buzContacts(contractorName)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var business = data.res.data.platform_business.filter(name => name.business_contacts[0])
                    contractor = business[0].business_contacts[0].user.email
                    cy.log(contractor)
                })
            } else {
                // var arr = [testData.indirectEntities[0].umbrellaContractor, testData.indirectEntities[0].limitedContractor, testData.indirectEntities[0].selfEmployedContractor]
                // contractorName = arr[randomNumber(0, 2)]
                contractorName = testData.indirectEntities[0].umbrellaContractor
                cy.setDropDown("contractor_id", contractorName);
                getPaymentService(contractorName);
                buzContacts(contractorName)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    cy.log(data.res.data.platform_business[0].business_contacts[0].user.name);
                    var business = data.res.data.platform_business.filter(name => name.business_contacts[0])
                    contractor = business[0].business_contacts[0].user.email
                    cy.log(contractor)
                })
            }
            cy.readFile("cypress/fixtures/placement/paymentService.json").then((data) => {
                const platformBusiness = data.res.data.platform_business;
                platformBusiness.forEach(business => {
                    const payment_service = business.services_by_from_business.filter(service => service.type === "contractor-limited" || "contrator-umbrella" || "contrator-selfemployed");
                    payment_service.forEach(paymentCompanyDetails => {
                        payment_company = paymentCompanyDetails.to_business.name
                        payment_type = paymentCompanyDetails.to_business.type
                    })
                })
                if (payment_type == "limited") {
                    cy.log(payment_company)
                    cy.setDropDown("contractor_payment_company_id", payment_company)
                } else if (payment_type == "umbrella") {
                    cy.log(payment_company)
                    cy.setDropDown("contractor_payment_company_id", payment_company);
                } else if (payment_type == "selfemployed") {
                    cy.log(payment_company)
                    cy.setDropDown("contractor_payment_company_id", payment_company);
                } else {
                    cy.log('Unknown payment type')
                }
            });
        });
    }
    placementDetails() {
        cy.readFile('cypress/fixtures/placement/temp.json').then(tempData => {
            var startDate = tempData.rows[0].start_date
            var endDate = tempData.rows[0].end_date
            formattedStartDate = shortDate(startDate)
            formattedEndDate = shortDate(endDate)
            var jobTitle = faker.person.jobTitle()
            cy.setInput("title", jobTitle)
            cy.setDate("start_date", startDate);
            cy.setDate("end_date", endDate);
            cy.setInput("po_number", `PO#${randomNumber(1, 99999)}`)
            cy.setDropDown('expense_funding_type', 'Not Applicable')
        })
    }
    timesheetDetails(timesheetFrequency) {
        timesheetFrequency !== "Weekly" ? cy.clickOptions(timesheetFrequency) : null
    }
    standardRateDetails(unitType) {
        const { clientRate, contractorRate } = contractRates(unitType);
        unitType !== "Hours" ? cy.get(`[data-component="Molecules: RadioCard"] [class="break-normal break-words"]:contains(${unitType})`).click() : null
        cy.setInput("contractor_rate", contractorRate);
        cy.setInput("client_rate", clientRate);
        unitType === 'Hours' ? cy.setInput("standard_units", '37.5') : unitType == 'Days' ? cy.setInput("standard_units", '5') : null
        cy.clickBtn("Insert").wait(300).popup("No").wait(4000);
    }
    additionalRateDetails(unitType, { additionalRateEntry }) {
        const { clientRate, contractorRate } = contractRates(unitType);
        additionalRateEntry == 'Yes' ? cy.clickTab('Rates').clickBtn('Add additional rate').then(() => {
            cy.get('[id="name"]:eq(1)').type('Overtime Rate')
            cy.get('[id="contractor_rate"]:eq(1)').type(contractorRate)
            cy.get('[id="client_rate"]:eq(1)').type(clientRate)
            unitType === 'Hours' ? cy.get('[id="standard_units"]:eq(1)').type('37.5') : unitType == 'Days' ? cy.get('[id="standard_units"]:eq(1)').type('5') : null
            cy.clickBtn('Insert').popup('No').wait(2500)
        }) : null
    }
    clientViewTemporaryPlacementDetailsValidation() {
        cy.readFile('cypress/fixtures/transactionDetails.json').then(details => {
            cy.get('ul[class="flex flex-col gap-2 font-recoleta font-semibold"]').within(() => {
                cy.log("true")
            })
        })
    }
    contractorViewTemporaryPlacementDetailsValidation() {

    }
    temporaryPlacementInformationBanner(status) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.get('[data-component="Organisms: Info"]').within(() => {
                    cy.get('.font-recoleta:eq(0)').then(id => {
                        human_id = id.text()
                        cy.log(human_id)
                    })
                    if (status == 'Active') {
                        cy.get('[data-component="Atom: Badge"]:eq(0)').should('contain', 'Active')
                    } else if (status == 'Expired') {
                        cy.get('[data-component="Atom: Badge"]:eq(0)').should('contain', 'Expired')
                    }
                    else if (status == 'Pending Compliance Approval') {
                        cy.get('[data-component="Atom: Badge"]:eq(0)').should('contain', 'Pending Compliance Approval')
                    }
                    else {
                        cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                    }
                    // cy.get('[data-component="Atom: Badge"]:eq(2)').should('have.text', alphaCode)
                    // cy.get('[class="font-bold text-xl"]:eq(2)').should('have.text', timesheetFrequency)
                    cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || shortStartDate)
                    cy.get('.font-recoleta:eq(2)').should('have.text', formattedEndDate || shortEndDate)
                    cy.get('.font-recoleta:eq(3)').should('contain', agencyName || agency_name)
                    cy.get('.font-recoleta:eq(4)').should('contain', clientName || client_name)
                    // cy.get('.font-recoleta:eq(5)').should('contain', contractorName || contractor_name)
                    // cy.get('.font-recoleta:eq(6)').should('contain', paymentCompany || payment_company)
                })
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    cy.log(token)
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('agency_admin') || userRole.includes('agency_consultant')) {
                        cy.get('[data-component="Organisms: Info"]').within(() => {
                            cy.get('.min-w-max .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            // cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', timesheetFrequency)
                            cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || shortStartDate)
                            cy.get('.font-recoleta:eq(2)').should('have.text', formattedEndDate || shortEndDate)
                            cy.get('.font-recoleta:eq(3)').should('contain', agencyName || agency_name)
                            cy.get('.font-recoleta:eq(4)').should('contain', clientName || client_name)
                            cy.get('.font-recoleta:eq(5)').should('contain', contractorName || contractor_name)
                            cy.get('.font-recoleta:eq(6)').should('contain', paymentCompany || payment_company)
                        })
                    } else if (userRole.includes('client_hiring_manager')) {
                        cy.get('[data-component="Organisms: Info"]').within(() => {
                            cy.get('.min-w-max .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            // cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', timesheetFrequency)
                            cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || shortStartDate)
                            cy.get('.font-recoleta:eq(2)').should('have.text', formattedEndDate || shortEndDate)
                            cy.get('.font-recoleta:eq(3)').should('contain', agencyName || agency_name)
                            cy.get('.font-recoleta:eq(4)').should('contain', clientName || client_name)
                        })
                    } else if (userRole.includes('contractor')) {
                        cy.get('[data-component="Organisms: Info"]').within(() => {
                            cy.get('.min-w-max .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            // cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', timesheetFrequency)
                            cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || shortStartDate)
                            cy.get('.font-recoleta:eq(2)').should('have.text', formattedEndDate || shortEndDate)
                            cy.get('.font-recoleta:eq(3)').should('contain', agencyName || agency_name)
                            cy.get('.font-recoleta:eq(4)').should('contain', clientName || client_name)
                            cy.get('.font-recoleta:eq(5)').should('contain', paymentCompany || payment_company)
                        })
                    }
                })
            }
        })
    }
    clienttoolTipMessage() {
        cy.get('[data-component="Organisms: Info"]:eq(1)').should('contain', `${client_name} has to be onboarded before placement approval`)
    }
    limitedCompanytoolTipMessage() {
        cy.get('[data-component="Organisms: Info"]:eq(1)').should('contain', `${limitedCompanyName} has to be onboarded before placement approval`)
    }
    clickSubmitForAgencyApproval() {
        cy.clickBtn('Submit For Agency Approval').popup().wait(1200)
    }
    clickCancel() {
        cy.clickBtn('Cancel').popup().wait(1200)
    }
    clickUpdateEntities() {
        cy.clickBtn('Update Entities').popup().wait(1200)
    }
    clickDocumentsTab() {
        cy.clickTab("Documents").wait(1500);
    }
    uploadProofForAgencyApproval() {
        cy.documentUpload("Proof for Agency Approval/Rejection", "placement/doc/proof_of_agency.jpg");
    }
    clickApprove() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.clickBtn('Approve').popup('No').wait(1000);
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    cy.window().then((win) => {
                        var token = win.sessionStorage.getItem('x-hasura-token')
                        var decoded = jwt_decode(token)
                        cy.log(decoded)
                        var userRole = decoded.allowed_roles
                        cy.log(userRole)
                        if (userRole.includes('hiring_manager')) {
                            cy.get('li:contains(Placement Dates) button:eq(1)').click({ force: true })
                            cy.clickBtn('Approve').popup('No').wait(1000);
                        } else if (userRole.includes('agency_consultant') || userRole.includes('agency_admin')) {
                            cy.clickBtn('Approve').popup('No').wait(1000);
                        }
                    })
                })
            }
        })
    }
    selectExistingPaymentCompanyByContractorUser(paymentType) {
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (paymentType == 'Umbrella') {
                payment_company = testData.paymentCompanies[0].umbrellaCompanies
                cy.get(`button:contains(Add Payment Company)`).click().wait(1200)
                cy.get('[data-component="Organisms: Form: Dynamic: Body"]').should('contain.text', 'Are you working through a limited company or via an umbrella?').then(() => {
                    cy.clickOptions(paymentType)
                    cy.setDropDown('umbrella_company', payment_company)
                })
                cy.clickBtn('Insert').popup('No')
            }
            if (paymentType == 'Limited') {
                payment_company = testData.paymentCompanies[0].limitedCompanies
                cy.get(`button:contains(Add Payment Company)`).click().wait(1200)
                cy.get('[data-component="Organisms: Form: Dynamic: Body"]').should('contain.text', 'Are you working through a limited company or via an umbrella?').then(() => {
                    cy.clickOptions(paymentType)
                    cy.setDropDown('payment_company', payment_company)
                })
                cy.clickBtn('Insert').popup('No')
            }
        })
    }
    selectNewPaymentCompanyByContractorUser(paymentType) {
        cy.readFile('cypress/fixtures/testData.json').then(testData => {
            if (paymentType == 'Umbrella') {
                payment_company = testData.paymentCompanies[0].umbrellaCompanies
                cy.get(`button:contains(Add Payment Company)`).click().wait(1200)
                cy.get('[data-component="Organisms: Form: Dynamic: Body"]').should('contain.text', 'Are you working through a limited company or via an umbrella?').then(() => {
                    cy.clickOptions(paymentType)
                    cy.setDropDown('umbrella_company', payment_company)
                })
                cy.clickBtn('Insert').popup('No')
            } else if (paymentType == 'Limited') {
                limitedCompanyName = faker.company.name()
                this.updateContractorPersonalDetails()
                cy.get(`button:contains(Add Payment Company)`).click().wait(1200)
                cy.get('[data-component="Organisms: Form: Dynamic: Body"]').should('contain.text', 'Are you working through a limited company or via an umbrella?').then(() => {
                    cy.clickOptions(paymentType)
                })
                cy.clickBtn('Limited Company')
                // Basic Info Details
                cy.get('[class="w-full mt-4 "]:contains(Basic Info)').then(() => {
                    cy.setInput('company.name', limitedCompanyName)
                    cy.setInput('company.brn', randomBrn())
                    cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
                        var paymentCompanyPaymentTerms = value.data.config_option[randomNumber(1, 6)].name
                        cy.dropDown('company.payment_terms', paymentCompanyPaymentTerms)
                    })
                })
                // Bank Account Details
                cy.dropDown('bank_account.country_id', 'United Kingdom')
                cy.setInput('bank_account.bank_name', randomBankName())
                cy.setInput('bank_account.account_holder_name', limitedCompanyName)
                cy.setInput('bank_account.account_number', faker.finance.accountNumber())
                cy.setInput('bank_account.sort_code', sortCode())
                cy.setInput('bank_account.swift_code', swiftCode())
                cy.setInput('bank_account.iban', faker.finance.iban())
                cy.uploadFile('limited/doc/bank_statement.jpg')
                cy.get('button:contains(Insert):eq(1)').click().popup('No')
            }
        })
    }
    updateContractorPersonalDetails() {
        this.clickUpdate()
        this.uploadProofOfId()
        this.uploadRightToWork()
        this.uploadProofOfAddress()
        cy.setInput("tel", phoneNumber(), 0)
        this.clickSave()
    }
    uploadRightToWork() {
        cy.get('[class="p-1 pb-2 lg:p-2 flex flex-col gap-1 justify-start w-full md:w-1/3"]:contains(Right to Work)').within(() => {
            cy.uploadFile('contractor/doc/right_to_work.png')
        })
    }
    uploadProofOfId() {
        cy.get('[class="p-1 pb-2 lg:p-2 flex flex-col gap-1 justify-start w-full md:w-1/3"]:contains(Proof of ID)').within(() => {
            cy.uploadFile('contractor/doc/proof_of_id.png')
        })
    }
    uploadProofOfAddress() {
        cy.get('[class="p-1 pb-2 lg:p-2 flex flex-col gap-1 justify-start w-full md:w-1/3"]:contains(Proof of Address)').within(() => {
            cy.uploadFile('contractor/doc/proof_of_address.jpg')
        })
    }
    uploadProofForClientApproval() {
        cy.documentUpload("Proof for Client Approval/Rejection", "placement/doc/proof_of_client.jpeg");
    }
    clickSave() {
        cy.clickBtn('Save').popup('No')
    }
    clickUpdate() {
        cy.clickBtn('update')
    }
    clickAccept() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.clickBtn('Accept').popup('No').wait(1000);
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('contractor')) {
                        cy.get('li:contains(Standard Rate) button:eq(1)').click({ force: true })
                        cy.clickBtn('Accept').popup('No').wait(1000);
                    }
                })
            }
        })
    }
    uploadProofForContractorAcceptance() {
        cy.documentUpload("Proof for Contractor Acceptance/Rejection", "placement/doc/proof_of_contractor.jpg");
    }
    clickReject() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.clickBtn('Reject').popup('No').wait(1000);
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('hiring_manager')) {
                        cy.get('li:contains(Placement Dates) button:eq(0)').click({ force: true })
                        cy.clickBtn('Reject').popup('No').wait(1000);
                    } else if (userRole.includes('contractor')) {
                        cy.get('li:contains(Standard Rate) button:eq(0)').click({ force: true })
                        cy.clickBtn('Reject').popup('No').wait(1000);
                    } else if (userRole.includes('agency_consultant')) {
                        cy.clickBtn('Reject').popup('No').wait(1000);
                    }
                })
            }
        })
    }
    clickEdit() {
        cy.clickBtn('Edit').popup('No').wait(1000)
    }
    agencyRejectedChanges(contractor_rate, client_rate) {
        cy.readFile('cypress/fixtures/placement/temp.json').then(tempData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == tempData.rows[0].currency)
                currencySymbol = currencyData[0].symbol
                cy.clickTab('Rates')
                cy.get('[id="contractor_rate"]').clear()
                cy.get('[id="contractor_rate"]').type('{backspace}{backspace}{backspace}').type(contractor_rate).type('{del}')
                cy.get('[id="client_rate"]').clear()
                cy.get('[id="client_rate"]').type('{backspace}{backspace}{backspace}').type(client_rate).type('{del}')
                cy.clickBtn('Save').popup('No').wait(1000)
                cy.get('[id="contractor_rate"]').should('have.value', `${currencySymbol}${amountFormate(contractor_rate)}`)
                cy.get('[id="client_rate"]').should('have.value', `${currencySymbol}${amountFormate(client_rate)}`)
            })
        })
    }
    clientRejectedChanges(start_date, end_date) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.clickTab('Info')
                cy.get('[id="start_date"]').clear()
                cy.setDate('start_date', start_date)
                cy.get('[id="end_date"]').clear()
                cy.setDate('end_date', end_date)
                cy.clickBtn('Save').popup().wait(1200)
                formattedStartDate = shortDate(start_date)
                formattedEndDate = shortDate(end_date)
                cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate)
                cy.get('.font-recoleta:eq(2)').should('have.text', formattedEndDate)
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('agency_admin') || userRole.includes('agency_consultant')) {
                        cy.get('[id="start_date"]').clear()
                        cy.setDate('start_date', start_date)
                        cy.get('[id="end_date"]').clear()
                        cy.setDate('end_date', end_date)
                        cy.clickBtn('Save').popup('No').wait(1200)
                        formattedStartDate = shortDate(start_date)
                        formattedEndDate = shortDate(end_date)
                        cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate)
                        cy.get('.font-recoleta:eq(2)').should('have.text', formattedEndDate)
                    }
                })
            }
        })

    }
    contractorRejectedChanges(contractor_rate) {
        cy.readFile('cypress/fixtures/placement/temp.json').then(tempData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == tempData.rows[0].currency)
                currencySymbol = currencyData[0].symbol
                cy.clickTab('Rates')
                cy.get('[id="contractor_rate"]').clear()
                cy.get('[id="contractor_rate"]').type('{backspace}{backspace}{backspace}').type(contractor_rate).type('{del}')
                cy.clickBtn('Save').popup('No').wait(1000)
                cy.get('[id="contractor_rate"]').should('have.value', `${currencySymbol}${amountFormate(contractor_rate)}`)
            })
        })
    }
    timesheetsGenerationCheck() {
        cy.url().then((url) => {
            var parsedUrl = new URL(url);
            var path = parsedUrl.pathname;
            var splitedUrl = path.split("/");
            var uuid = splitedUrl[5];
            getContractInfo(uuid);
            cy.internalApiRequest(timesheets(uuid)).then((res) => {
                cy.writeFile('cypress/fixtures/generatedTMS.json', res)
                cy.readFile('cypress/fixtures/generatedTMS.json').then((tmsData) => {
                    var timesheets = tmsData.body.data.fundo_timesheet.length
                    if (timesheets !== 0) {
                        for (let i = 0; i < timesheets; i++) {
                            cy.log(`🟢The autogenerated timesheet is ${tmsData.body.data.fundo_timesheet[i].human_id}🟢`)
                        }
                    } else {
                        cy.log(`🔴The timesheets are not generated for this temp placement🔴`)
                    }
                })
            })
        })
    }
    navigateToListPageFromPlacementPage() {
        cy.log(human_id)
        cy.get(':nth-child(2) > a').click()
    }
    filterPlacementIdForChaser() {
        cy.get('button:contains(Filter)').click().then(() => {
            cy.get(`.bg-skin-primary-inverted [id="human_id"]`).type(human_id).wait(2000).then(() => {
                cy.get(`.css-11unzgr :contains(${human_id}):eq(2)`)
                    .click()
                    .get('button:contains(Search)').click()
                    .wait(1500);
            })
        });
    }
    chasePendingClientApproval() {
        cy.get('tbody [type="checkbox"]').check()
        cy.clickBtn('Chase').popup('No')
        cy.wait(120000)
    }
    checkMailForPendingClientPlacementChaser() {
        cy.log(hiring_manager)
        getPendingClientApprovalchaser(hiring_manager)
        cy.readFile('cypress/fixtures/placement/pendingClientApprovalChaser.json').then(emailres => {
            var is_sent_email = emailres.data.log_mail[0].is_sent
            var to_mail = emailres.data.log_mail[0].to
            var subject = emailres.data.log_mail[0].subject
            expect(is_sent_email).equal(true)
            expect(to_mail).contain(hiring_manager)
            expect(subject).contain('Action required : Placement submitted for verification')
            cy.log(is_sent_email, to_mail, subject)
        })
    }
    // changeRequestInformation({ agencyToClient_agencyStatus, agencyToClient_clientStatus, agencyToContractor_agencyStatus, agencyToContractor_contractorStatus }) {
    //     cy.get('[id="change_request"]:eq(0)').click()
    //     cy.get('button [id="header"]:eq(0)').click()
    //     // Agency-Client Schedule
    //     cy.get('[class="rounded-md bg-skin-paper p-2 shadow"]:contains(agency-client)').within(() => {
    //         cy.get('table tbody tr:eq(0) td:eq(0)').should('contain', agencyName)
    //         cy.get('table tbody tr:eq(1) td:eq(0)').should('contain', clientName)
    //         cy.get('table tbody tr:eq(0) td:eq(1)').should('contain', agencyToClient_agencyStatus)
    //         cy.get('table tbody tr:eq(1) td:eq(1)').should('contain', agencyToClient_clientStatus)
    //     })
    //     if (agencyToClient_agencyStatus == 'Approved' && agencyToClient_clientStatus == 'Approved') {
    //         cy.get('[id="header"]:contains(agency-client)').within(() => {
    //             cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', 'Approved')
    //         })
    //     }else if(agencyToClient_agencyStatus == 'Rejected' || agencyToClient_clientStatus == 'Rejected')
    //     // Agency-Contractor Schedule
    //     cy.get('[id="header"]:contains(agency-contractor)').within(() => {
    //         cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', agencyToContractorScheduleStatus)
    //     })
    //     //overall
    //     cy.get('button [id="header"]:eq(0)').within(() => {
    //         cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', changeRequestStatus)
    //     })
    // }
}
export const temporaryPlacementPage = new TemporaryPlacement();