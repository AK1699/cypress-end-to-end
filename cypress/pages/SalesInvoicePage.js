import { buzContacts, getAgencyClient, getContractDetails } from "../utility/api";
import { invoiceValidations } from "../utility/calculation";
import { Now, generatedInvoices, paymentTerms, randomNumber, shortDate, storeSalesId, todayDate } from "../utility/functions";
let agency_consultant, agencyName, alphaCode, clientName, invoice_contact, human_id

class salesInvoice {
    clickCreateSalesInvoice() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "sales" }).then((rows) => {
            cy.writeFile("cypress/fixtures/salesInvoice/salesInvoice.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        cy.clickBtn("Create Sales Invoice");
    }
    selectCurrency() {
        cy.readFile('cypress/fixtures/salesInvoice/salesInvoice.json').then(mockData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == mockData.rows[0].currency)
                alphaCode = currencyData[0].alpha_code
            })
            cy.dropDown('currency_id', mockData.rows[0].currency)
        })
    }
    filterContractId() {
        cy.idFilter('human_id',human_id)
    }
    inputDescription() {
        cy.readFile('cypress/fixtures/salesInvoice/salesInvoice.json').then(mockData => {
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
                //get linked clients
                getAgencyClient(agencyName);
                cy.setDropDown("client_id", clientName);
                buzContacts(clientName);
                //get client buz contacts
                cy.readFile("cypress/fixtures/placement/buzContacts.json").then((data) => {
                    var invoice_contact_users = data.res.data.platform_business[0].business_contacts.filter((user) => user.type.includes("invoice_contact") && user.user.is_active == true && user.user.is_confirmed == true);
                    var activeIC = invoice_contact_users.filter((user) => user.user.is_confirmed == true && user.user.is_active == true);
                    invoice_contact = activeIC[0].user.email
                    cy.setDropDown('client_user_ids', invoice_contact)
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
                    cy.setDropDown('client_user_ids', invoice_contact)
                });
            });
        } else {
            cy.log('unknown funding model!')
        }
    }
    inputFeeDetails(fundingModel) {
        var funder_fee = (Math.random() * 4 + 1).toFixed(2)
        var platform_fee = Math.random().toFixed(2)
        var service_charge = (Math.random() * 4 + 1).toFixed(2)
        fundingModel == "Direct" ? cy.setInput('requisites.provider_fee', platform_fee).setInput('requisites.funder_fee', funder_fee) : fundingModel == 'Indirect' ? cy.setInput('requisites.provider_fee', service_charge) : null
    }
    inputInvoiceAmount() {
        cy.setInput('requisites.amount', randomNumber(10000, 99999))
    }
    clickInsert() {
        cy.clickBtn("Insert").popup('No').wait(3500);
    }
    clickApprove() {
        cy.clickBtn("Approve").popup().wait(3500);
    }
    clickReject() {
        cy.clickBtn("Reject").popup().wait(3500);
    }
    clickRevert() {
        cy.clickBtn("Revert").popup().wait(3500);
    }
    logoutUser() {
        cy.logout()
    }
    clickSave() {
        cy.clickBtn('Save').popup('No').wait(300)
    }
    clickSubmit() {
        cy.clickBtn('Submit').popup('No').wait(300)
    }
    updateClientPaymentTerms() {
        cy.get(`form:contains(${clientName})`).dropDown('payment_terms', paymentTerms()).clickBtn('Save').popup('No')
    }
    updateAgencyPaymentTerms() {
        cy.get(`form:contains(${agencyName})`).dropDown('payment_terms', paymentTerms()).clickBtn('Save').popup('No')
    }
    insertPurchaseOrderNumber() {
        cy.get('[class="flex flex-col custom-gap "]:contains(Purchase Order Number)').find('button:contains(Insert)').click()
        cy.setInput("po_number", `PO#${randomNumber(1, 99999)}`);
        cy.get(`[class="flex flex-col custom-gap "]:contains(Purchase Order Number) button:contains(Insert)`).click().popup('No').wait(100);
    }
    updateFunderDetails() {
        cy.get('form:contains(Funder)').first().find('button:contains(Save)').click().popup('No').wait(1000)
    }
    updateProviderDetails() {
        cy.get('form:contains(Provider)').dropDown('bank_account_id', 'Raise').clickBtn('Save').popup('No')
    }
    salesInvoiceInformationBanner(status) {
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
    storeSalesContractHumanId(fundingModel) {
        storeSalesId(fundingModel, human_id)
    }
    invoiceAmountValidations(){
        cy.log(human_id)
        generatedInvoices(human_id)
        getContractDetails(human_id)
        invoiceValidations.salesInvoices()
    }
}
export const salesInvoicePage = new salesInvoice();