import jwt_decode from 'jwt-decode'
import { buzContacts, contractMagicLink, getAgencyClient, getContractDetails, getPermPlacementDetails } from "../utility/api";
import { invoiceValidations } from "../utility/calculation";
import { Now, amountFormate, generatedInvoices, randomFullName, randomNumber, shortDate, storeContract, todayDate } from "../utility/functions";
import { faker } from '@faker-js/faker';
import { agency_name, client_name, contractId, contractStartDate, hiringManager } from './PermPlacementRequestPage';
let human_id, alphaCode, currencySymbol, formattedStartDate, agencyName, clientName, invoice_contact, hiring_manager, agency_consultant
export { hiring_manager, agency_consultant, human_id }

class PermanentPlacement {
    clickCreatePermPlacement() {
        cy.clickBtn('Create Perm Placement')
    }
    filterContractId() {
        cy.idFilter('human_id', human_id || contractId)
    }
    permanentPlacementInformationBanner(status) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.get('[data-component="Organisms: Info"]').within(() => {
                    cy.get('.font-recoleta:eq(0)').then(id => {
                        human_id = id.text()
                        cy.log(human_id)
                    })
                    cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                    // cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', alphaCode)
                    cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || contractStartDate)
                    cy.get('[data-component="Atom: Link"]:eq(0)').should('contain', agencyName || agency_name)
                    cy.get('[data-component="Atom: Link"]:eq(1)').should('contain', clientName || client_name)
                })
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('agency_admin') || userRole.includes('agency_consultant')) {
                        cy.get('[data-component="Organisms: Info"]').within(() => {
                            cy.get('.min-w-max > .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            // cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', alphaCode)
                            cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || contractStartDate)
                            cy.get('.font-recoleta:eq(2)').should('contain', agencyName || agency_name)
                            cy.get('.font-recoleta:eq(3)').should('contain', clientName || client_name)
                        })
                    } else if (userRole.includes('client_hiring_manager')) {
                        cy.get('[data-component="Organisms: Info"]').within(() => {
                            cy.get('.min-w-max .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            // cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', alphaCode)
                            cy.get('.font-recoleta:eq(1)').should('have.text', formattedStartDate || contractStartDate)
                            cy.get('.font-recoleta:eq(2)').should('contain', agencyName || agency_name)
                            cy.get('.font-recoleta:eq(3)').should('contain', clientName || client_name)
                        })
                    }
                })

            }
        })
    }
    selectCurrency() {
        cy.readFile('cypress/fixtures/placement/perm.json').then(permData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == permData.rows[0].currency)
                alphaCode = currencyData[0].alpha_code
                currencySymbol = currencyData[0].symbol
                cy.log(currencySymbol)
            })
            permData.rows[0].currency !== 'Pound Sterling' ? cy.dropDown('currency_id', permData.rows[0].currency) : null
        })
    }
    selectFundingType(fundingType) {
        fundingType !== 'Funded' ? cy.get(`[id="funding_type"]:eq(1) [class="my-react-select__indicator my-react-select__dropdown-indicator css-tlfecz-indicatorContainer"]`).click().get(`.my-react-select__menu-list [class="break-normal break-words"]:contains(${fundingType})`).eq(0).click() : null
    }
    agencyDetails(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.directEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
                buzContacts(agencyName)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var agency_consultant_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("agency_consultant") && user.user.is_active == true && user.user.is_confirmed == true);
                    cy.log(agency_consultant)
                    if (agency_consultant_users.length > 0) {
                        var activeAC = agency_consultant_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                        agency_consultant = activeAC[0].user.email
                        cy.log(agency_consultant)
                        cy.selectUser("AC", agency_consultant);
                    }
                })
            })
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
                buzContacts(agencyName);
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var agency_consultant_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("agency_consultant") && user.user.is_active == true && user.user.is_confirmed == true);
                    if (agency_consultant_users.length > 0) {
                        var activeAC = agency_consultant_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                        agency_consultant = activeAC[0].user.email;
                        cy.log(agency_consultant)
                        cy.selectUser("AC", agency_consultant);
                    }
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
                    var hiring_manager_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("hiring_manager") && user.user.is_active == true && user.user.is_confirmed == true);
                    var activeHM = hiring_manager_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    hiring_manager = activeHM[0].user.email
                    var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true && user.user.is_confirmed == true);
                    var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    invoice_contact = activeIC[0].user.email
                    cy.log(hiring_manager)
                    cy.selectUser("HM", hiring_manager);
                    cy.log(hiring_manager)
                    cy.selectUser("IC", invoice_contact);
                    cy.log(invoice_contact)
                });
            });
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                clientName = testData.indirectEntities[0].clients
                //get linked clients
                getAgencyClient(agencyName);
                cy.readFile("cypress/fixtures/placement/apiData.json").then((data) => {
                    var client_service = data.res.data.platform_business[0].services_by_to_business;
                    cy.setDropDown("client_id", clientName);
                    buzContacts(clientName);
                    //get client buz contacts
                    cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                        var hiring_manager_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("hiring_manager") && user.user.is_active == true && user.user.is_confirmed == true);
                        var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true && user.user.is_confirmed == true);
                        var activeHM = hiring_manager_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                        hiring_manager = activeHM[0].user.email
                        var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                        invoice_contact = activeIC[0].user.email
                        cy.log(hiring_manager)
                        cy.selectUser("HM", hiring_manager);
                        cy.log(hiring_manager)
                        cy.selectUser("IC", invoice_contact);
                        cy.log(invoice_contact)
                    });
                });
            });
        } else {
            cy.log('unknown funding model!')
        }
    }
    placementDetails() {
        cy.readFile('cypress/fixtures/placement/perm.json').then(permData => {
            var startDate = permData.rows[0].start_date
            formattedStartDate = shortDate(startDate)
            cy.setDate("contract_start_date", startDate);
            cy.setInput("title", faker.person.jobTitle())
            cy.setInput("candidate_name", faker.person.fullName())
            cy.setInput("invoice_value", faker.finance.amount())
            cy.clickBtn("Insert").wait(300).popup("No").wait(4000);
        })
    }
    clickDocumentsTab() {
        cy.clickTab('Documents')
    }
    uploadProofForAgencyApproval() {
        cy.documentUpload("Proof for Agency Approval/Rejection", "placement/doc/proof_of_agency.jpg");
    }
    uploadProofForClientApproval() {
        cy.documentUpload("Proof for Client Approval/Rejection", "placement/doc/proof_of_client.jpeg");
    }
    clickApprove() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.clickBtn('Approve').popup('No').wait(1000);
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('hiring_manager')) {
                        cy.get('li:contains(Invoice Details) button:eq(1)').click({ force: true })
                        cy.clickBtn('Approve').popup('No').wait(1000);
                    } else if (userRole.includes('agency_consultant') || userRole.includes('agency_admin')) {
                        cy.clickBtn('Approve').popup('No').wait(1000);
                    }
                })
            }
        })
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
                        cy.get('li:contains(Invoice Details) button:eq(0)').click({ force: true })
                        cy.clickBtn('Reject').popup('No').wait(1000);
                    } else if (userRole.includes('agency_consultant') || userRole.includes('agency_admin')) {
                        cy.clickBtn('Reject').popup('No').wait(1000);
                    }
                })
            }
        })
    }
    clickCancel() {
        cy.clickBtn('Cancel').popup().wait(1200)
    }
    insertPurchaseOrderNumber() {
        cy.clickTab('Details')
        cy.clickBtn('Add New')
        cy.setInput("po_number", `PO#${randomNumber(1, 99999)}`);
        cy.clickBtn('Insert').popup('No')
    }
    clickSubmitForCreditRiskApproval() {
        cy.clickBtn('Submit for Credit Risk Approval').popup('No')
    }
    clickApproveCredit() {
        cy.clickBtn('Approve Credit').popup('No')
    }
    clickRejectCredit() {
        cy.clickBtn('Reject Credit').popup('No')
    }
    clickRevertCreditRisk() {
        cy.clickBtn('Revert Credit Risk').popup('No')
    }
    clickRevertAgency() {
        cy.clickBtn('Revert Agency').popup('No')
    }
    clickRevertClient() {
        cy.clickBtn('Revert Client').popup('No')
    }
    clickEdit() {
        cy.clickBtn('Edit').popup('No')
    }
    agencyRejectedAmendments(invoiceAmount) {
        cy.clickTab('Details')
        cy.get('[id="contract_perm_placement.invoice_value"]').clear()
        cy.get('[id="contract_perm_placement.invoice_value"]').type('{backspace}').type(invoiceAmount).type('{del}')
        cy.clickBtn('Save').popup('No')
        cy.get('[id="contract_perm_placement.invoice_value"]').should('have.value', `${currencySymbol}${amountFormate(invoiceAmount)}`)
    }
    clientRejectedAmendments(invoiceAmount) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.clickTab('Details')
                cy.get('[id="contract_perm_placement.invoice_value"]').clear()
                cy.get('[id="contract_perm_placement.invoice_value"]').type('{backspace}').type(invoiceAmount).type('{del}')
                cy.clickBtn('Save').popup('No')
                cy.log(currencySymbol)
                cy.get('[id="contract_perm_placement.invoice_value"]').should('have.value', `${currencySymbol}${amountFormate(invoiceAmount)}`)
            } else if (url.includes('app')) {
                cy.window().then((win) => {
                    var token = win.sessionStorage.getItem('x-hasura-token')
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('agency_admin') || userRole.includes('agency_consultant')) {
                        cy.log(currencySymbol)
                        cy.get('[id="contract_perm_placement.invoice_value"]').clear()
                        cy.get('[id="contract_perm_placement.invoice_value"]').type('{backspace}').type(invoiceAmount).type('{del}')
                        cy.clickBtn('Save').popup('No')
                        cy.log(`${currencySymbol}${amountFormate(invoiceAmount)}`)
                        cy.get('[id="contract_perm_placement.invoice_value"]').should('have.value', `${amountFormate(invoiceAmount)}`)
                    }
                })
            }
        })
    }
    clientMagicLinkApproval() {
        const Region = Cypress.env('REGION')
        cy.login('OA1').wait(2000)
        cy.log(hiring_manager || hiringManager)
        contractMagicLink('perm', hiring_manager || hiringManager)
        cy.extractContractMagicLink().then(url => {
            expect(url).includes(`${Region}-app.raisetech.io`)
            cy.visit(url).wait(2500)
            cy.log(url)
            cy.get('[data-component="Atom: TextAtom"]').should('have.text', 'This page serves solely for the purpose of reviewing and confirming the placement submitted by the Agency. Please note that Raise assumes no responsibility for any inaccuracies in the information provided.')
            cy.get('.w-4').check().wait(1200).clickBtn('Approve')
            cy.get('.swal2-confirm:contains(Yes)').click()
            cy.get('[class="font-bold text-2xl"]').should('contain', `You've accepted the placement`)
            cy.get('[data-component="Atom: ButtonNew"]').should('be.visible').wait(5000)
        })
    }
    clientMagicLinkRejection() {
        const Region = Cypress.env('REGION')
        cy.login('OA1')
        cy.log(hiringManager, hiring_manager)
        contractMagicLink('perm', hiring_manager || hiringManager)
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
        })
    }
    logoutUser() {
        cy.logout()
    }
    toolTipMessage() {
        cy.get('[data-component="Organisms: Info"]:eq(1)').should('contain', `${client_name} has to be onboarded before placement approval`)
    }
    invoicesValidation() {
        generatedInvoices(human_id)
        getContractDetails(human_id)
        cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
            var currency = contractData.data.fundo_contract[0].currency.name
            var funding_type = contractData.data.fundo_contract[0].funding_type
            getPermPlacementDetails(human_id, currency, funding_type)
            invoiceValidations.permInvoices()
        })
    }
}
export const permanentPlacementPage = new PermanentPlacement();