import { buzContacts, getAdhocFeeDetails, getContractDetails } from "../utility/api";
import { invoiceValidations } from "../utility/calculation";
import { Now, generatedInvoices, paymentTerms, randomNumber, shortDate, todayDate } from "../utility/functions";
let agency_consultant, agencyName, human_id, alphaCode, funderName
export { human_id }


class AdhocFee {
    clickCreateAdhocFee() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "adhoc_fee" }).then((rows) => {
            cy.writeFile("cypress/fixtures/adhocFee/adhocFee.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        cy.clickBtn('Create Adhoc Fee')
    }
    filterContractId() {
        cy.idFilter('human_id', human_id)
    }
    selectCurrency() {
        cy.readFile('cypress/fixtures/AdhocFee/adhocFee.json').then(mockData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == mockData.rows[0].currency)
                alphaCode = currencyData[0].alpha_code
            })
            cy.setDropDown("currency_id", mockData.rows[0].currency);
        })
    }
    agencyDetails(fundingModel, type) {
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
                        if (type == 'Agency-Funder' || type == 'Funder-Agency') {
                            cy.get('#funder_id').then(text => {
                                funderName = text.text().split('FUN-')[0]
                                cy.log(funderName)
                            })
                        }
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
                        if (type == 'Agency-Funder' || type == 'Funder-Agency') {
                            cy.get('#funder_id').then(text => {
                                funderName = text.text().split('FUN-')[0]
                                cy.log(funderName)
                            })
                        }
                    }
                })
            })
        } else {
            cy.log('unknown funding model!')
        }
    }
    selectAdhocFeeType(type) {
        cy.setDropDown("type", type);
    }
    inputDescription() {
        cy.readFile('cypress/fixtures/adhocFee/adhocFee.json').then(mockData => {
            cy.setInput("title", `${mockData.rows[0].description} ${shortDate(todayDate())} ${Now()}`);
        })
    }
    inputVat() {
        cy.setInput("requisites.amount", randomNumber(10000, 99999));
        cy.setInput("requisites.tax", '20');
    }
    clickInsert() {
        cy.clickBtn('Insert').popup('No').wait(1000)
    }
    updatePaymentTerms() {
        paymentTerms()
        cy.readFile('cypress/fixtures/config/paymentTerms.json').then(value => {
            var payment_terms = value.data.config_option[randomNumber(1, 6)].name
            cy.clickBtn("Save").popup('No').wait(1000);
            cy.setDropDown("payment_terms", payment_terms).clickBtn("Save").popup('No').wait(1000);
        })
    }
    clickSubmit() {
        cy.clickBtn("Submit").popup("No")
    }
    clickApprove() {
        cy.clickBtn("Approve").popup("No")
    }
    clickReject() {
        cy.clickBtn("Reject").popup("No")
    }
    clickRevert() {
        cy.clickBtn("Revert").popup("No")
    }
    logoutUser() {
        cy.logout()
    }
    adhocFeeInformationBanner(status, type) {
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
                    if (type == 'Agency-Funder' || type == "Funder-Agency") {
                        cy.get('[data-component="Atom: Link"]:eq(1)').should('contain', funderName)
                    }
                })
            }
            else {
                return null;
            }
        })
    }
    invoicesValidation() {
        generatedInvoices(human_id)
        getContractDetails(human_id)
        cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
            var currency = contractData.data.fundo_contract[0].currency.name
            getAdhocFeeDetails(human_id, currency)
            invoiceValidations.adhocFeeInvoices()
        })
    }
}
export const adhocFeePage = new AdhocFee();