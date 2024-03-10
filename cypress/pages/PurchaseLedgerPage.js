import { buzContacts, getAgencyClient, getContractDetails, getCurrency } from "../utility/api";
import { invoiceValidations } from "../utility/calculation";
import { Now, generatedInvoices, paymentTerms, randomDate, randomNumber, shortDate, storePurchaseLedgerId, todayDate } from "../utility/functions";
let agency_consultant, agencyName, alphaCode, clientName, hiring_manager, invoice_contact, human_id
var Region = Cypress.env('REGION')

class purchaseLedger {
    clickCreatePurchaseLedger() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "purchase_ledger" }).then((rows) => {
            cy.writeFile("cypress/fixtures/purchaseLedger/purchaseLedger.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        cy.clickBtn("Create New Purchase Ledger");
    }
    filterContractId() {
        cy.idFilter('human_id',human_id)
    }
    selectCurrency() {
        getCurrency()
        cy.readFile('cypress/fixtures/purchaseLedger/purchaseLedger.json').then(mockData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == mockData.rows[0].currency)
                alphaCode = currencyData[0].alpha_code
            })
            cy.dropDown('currency_id', mockData.rows[0].currency)
        })
    }
    inputDescription() {
        cy.readFile('cypress/fixtures/purchaseLedger/purchaseLedger.json').then(mockData => {
            cy.setInput("title", `${mockData.rows[0].description} ${shortDate(todayDate())} ${Now()}`)
        })
    }
    agencyDetails(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.directEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
                buzContacts(agencyName)
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var agency_consultant_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("agency_consultant") && user.user.is_active == true);
                    cy.log(agency_consultant)
                    if (agency_consultant_users.length > 0) {
                        var activeAC = agency_consultant_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                        agency_consultant = activeAC[0].user.email
                        cy.log(agency_consultant)
                        cy.setDropDown('agency_user_id', agency_consultant)
                    }
                })
            })
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
                buzContacts(agencyName);
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var agency_consultant_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("agency_consultant") && user.user.is_active == true);
                    if (agency_consultant_users.length > 0) {
                        var activeAC = agency_consultant_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                        agency_consultant = activeAC[0].user.email;
                        cy.log(agency_consultant)
                        cy.setDropDown('agency_user_id', agency_consultant)
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
                cy.log(clientName)
                //get linked clients
                getAgencyClient(agencyName);
                cy.setDropDown("client_id", clientName);
                buzContacts(clientName);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true && user.user.is_confirmed == true);
                    var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    invoice_contact = activeIC[0].user.email
                    cy.setDropDown("client_user_ids", invoice_contact);
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
                    var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true && user.user.is_confirmed == true);
                    var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    invoice_contact = activeIC[0].user.email
                    cy.setDropDown("client_user_ids", invoice_contact);
                })
            });
        } else {
            cy.log('unknown funding model!')
        }
    }
    inputRaisedDate() {
        cy.setDate('requisites.raised_date', randomDate())
    }
    feeToggle(vat, fundingModel) {
        var funder_fee = (Math.random() * 4 + 1).toFixed(2)
        var platform_fee = Math.random().toFixed(2)
        var service_charge = (Math.random() * 4 + 1).toFixed(2)
        vat == 'yes' && fundingModel == "Direct" ? cy.get('[id="requisites.is_fee_invoice"]').click().setInput('requisites.provider_fee', platform_fee).setInput('requisites.funder_fee', funder_fee) : vat == 'yes' && fundingModel == 'Indirect' ? cy.get('[id="requisites.is_fee_invoice"]').click().setInput('requisites.provider_fee', service_charge) : null
    }
    inputInvoiceAmount() {
        cy.setInput('requisites.amount', randomNumber(10000, 99999))
    }
    clickInsert() {
        cy.clickBtn("Insert").popup('No').wait(3500);
    }
    clickApprove() {
        cy.reload()
        cy.clickBtn("Approve").popup().wait(3500);
        cy.intercept('POST', `https://hasura-${Region}-read.raisetech.io/v1/graphql`).as('queryLoad').wait('@queryLoad')
    }
    clickReject() {
        cy.reload()
        cy.clickBtn("Reject").popup().wait(3500);
    }
    clickRevert() {
        cy.reload()
        cy.clickBtn("Revert").popup().wait(3500);
    }
    clickSave() {
        cy.clickBtn('Save').popup('No')
        cy.intercept('POST', `https://hasura-${Region}-read.raisetech.io/v1/graphql`).as('queryLoad').wait('@queryLoad')
    }
    clickSubmit() {
        cy.reload()
        cy.clickBtn('Submit').popup('No').wait(300)
        cy.intercept('POST', `https://hasura-${Region}-read.raisetech.io/v1/graphql`).as('queryLoad').wait('@queryLoad')
    }
    logoutUser() {
        cy.logout()
    }
    updateAgencyPaymentTerms() {
        cy.get(`form:contains(${agencyName})`).then(() => {
            cy.setDropDown("payment_terms", paymentTerms());
            cy.clickBtn('Save').popup('No')
        });
    }
    updateClientPaymentTerms() {
        cy.get(`form:contains(${clientName})`).then(() => {
            cy.setDropDown("payment_terms", paymentTerms());
            cy.clickBtn("Save").popup('No')
        });
    }
    insertPurchaseOrderNumber() {
        cy.get('[class="flex flex-col custom-gap "]:contains(Purchase Order Number)').find('button:contains(Insert)').click()
        cy.setInput("po_number", `PO#${randomNumber(1, 99999)}`);
        cy.get(`[class="flex flex-col custom-gap "]:contains(Purchase Order Number) button:contains(Insert)`).click().popup('No').wait(100);
    }
    updateFunderDetails() {
        cy.get('form:contains(Funder)').then(() => {
            this.clickSave()
        })
    }
    storePurchaseledgerContractHumanId(fundingModel) {
        storePurchaseLedgerId(fundingModel, human_id)
    }
    invoiceAmountValidations() {
        generatedInvoices(human_id)
        getContractDetails(human_id)
        invoiceValidations.purchaseLegerInvoices()
    }
    purchaseLedgerInformationBanner(status) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.get('[data-component="Organisms: Info"]').within(() => {
                    cy.get('.font-recoleta:eq(0)').then(id => {
                        human_id = id.text()
                        cy.log(human_id)
                    })
                    cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                    cy.get('[data-component="Atom: Badge"]:eq(1)').should('have.text', alphaCode)
                    cy.get('[data-component="Atom: Link"]:eq(0)').should('contain', agencyName)
                    cy.get('[data-component="Atom: Link"]:eq(1)').should('contain', clientName)
                })
            }
            else {
                return null;
            }
        })
    }
}
export const purchaseLedgerPage = new purchaseLedger();