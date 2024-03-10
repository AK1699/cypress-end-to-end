import { getContractDetails, getExpenseDetails } from "../utility/api";
import jwt_decode from 'jwt-decode'
import { generatedInvoices, getRandomDate, randomKycDates, randomNumber } from "../utility/functions";
import { invoiceValidations } from "../utility/calculation";
let contractHumanId, contractorEmail, human_id, agencyName, clientName, contractorName, paymentCompanyName, expenseDetails, datelength, gross_total, timesheetApproverEmail, net_total, vat_total
export { contractorEmail, timesheetApproverEmail, gross_total, net_total, vat_total, human_id }


class Expense {
    filterExpenseId() {
        cy.idFilter('human_id',human_id)
    }
    getContract(fundingModel, fundingType) {
        cy.log(fundingModel, fundingType)
        cy.login('PA')
        cy.readFile('cypress/fixtures/testData.json').then(contractId => {
            if (fundingModel == 'Direct' && fundingType == 'Funded') {
                contractHumanId = contractId.directContracts[0].funded.temporaryPlacement
            } else if (fundingModel == 'Direct' && fundingType == 'Paid When Paid') {
                contractHumanId = contractId.directContracts[0].paidWhenPaid.temporaryPlacement
            } else if (fundingModel == 'Indirect' && fundingType == 'Funded') {
                contractHumanId = contractId.indirectContracts[0].funded.temporaryPlacement
            } else if (fundingModel == 'Indirect' && fundingType == 'Paid When Paid') {
                contractHumanId = contractId.indirectContracts[0].paidWhenPaid.temporaryPlacement
            } else {
                cy.log(`Invalid funding data!`)
            }
            cy.log(contractHumanId)
            getContractDetails(contractHumanId)
        })
        cy.readFile("cypress/fixtures/contractDetails.json").then(tempData => {
            contractorEmail = tempData.data.fundo_contract[0].contract_entities[3].business.individual.user.email
            timesheetApproverEmail = tempData.data.fundo_contract[0].timesheet_approver_details[0].email
        })
        cy.logout()
    }
    setFundingTypeAtContract(){
        cy.login('O')
    }
    clickCreateExpense() {
        cy.readFile("cypress/fixtures/contractDetails.json").then(tempData => {
            var contractEndDate = tempData.data.fundo_contract[0].end_date
            var end_date = new Date(contractEndDate)
            const currentDate = new Date()
            const differenceInMillisec = currentDate.getTime() - end_date.getTime();
            const dateDifference = Math.floor(differenceInMillisec / (1000 * 60 * 60 * 24));
            if (dateDifference < 30) {
                cy.clickBtn('Create Expense')
            } else {
                cy.log('🔴The Contract period has exceeded over 30 days from creation of placement🔴')
            }
        })
    }
    insertExpenseClaimForm(fundingType) {
        cy.setDropDown('transaction_id', contractHumanId)
        cy.dropDown('funding_type', fundingType)
        cy.setInput('po_number', `PO#${randomNumber(1, 99999)}`)
        cy.url().then(url => {
            if (url.includes('app')) {
                cy.get('button:contains(Create Expense):eq(1)').click().popup('No').wait(3200)
            } else if (url.includes('ops') && fundingType == 'Paid When Paid') {
                cy.readFile('cypress/fixtures/contractDetails.json').then(transactionData => {
                    var business = transactionData.data.fundo_contract[0].contract_entities.filter(business => business.type == 'provider')
                    var accountNumber = business[0].bank_account.account_number
                    cy.log(accountNumber)
                    cy.get('[id="provider_bank_account_id"]').should('contain', accountNumber)
                })
                cy.get('button:contains(Create Expense):eq(1)').click().popup('No').wait(3200)
            } else if (url.includes('ops') && fundingType == 'Funded') {
                cy.readFile('cypress/fixtures/contractDetails.json').then(transactionData => {
                    var business = transactionData.data.fundo_contract[0].contract_entities.filter(business => business.type == 'funder')
                    var accountNumber = business[0].bank_account.account_number
                    cy.log(accountNumber)
                    cy.get('[id="funder_bank_account_id"]').should('contain', accountNumber)
                })
                cy.get('button:contains(Create Expense):eq(1)').click().popup('No').wait(3200)
            }
        })
    }
    uploadProofOfSubmissionDocument() {
        cy.get('form:contains(Proof of submission)').within(() => {
            cy.get('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`cypress/fixtures/Expense/doc/Proof_Of_Submission.eml`, { force: true }).wait(1200);
            cy.clickBtn('Insert')
        })
        cy.popup('No')
    }
    uploadProofOfApprovalDocument() {
        cy.get('form:contains(Proof of approval)').within(() => {
            cy.get('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`cypress/fixtures/Expense/doc/Proof_Of_Approval.eml`, { force: true }).wait(1200);
            cy.clickBtn('Insert')
        })
        cy.popup('No')
    }
    inputExpenseDetails({ VAT }) {
        cy.readFile('cypress/fixtures/contractDetails.json').then(transactionDetails => {
            var start_date = transactionDetails.data.fundo_contract[0].start_date
            var end_date = transactionDetails.data.fundo_contract[0].end_date
            agencyName = transactionDetails.data.fundo_contract[0].agency_name
            clientName = transactionDetails.data.fundo_contract[0].client_name
            contractorName = transactionDetails.data.fundo_contract[0].contractor_name
            paymentCompanyName = transactionDetails.data.fundo_contract[0].contractor_payment.name
            var date = getRandomDate(start_date, end_date)
            cy.log(date)
            datelength = date.split(', ').length
            cy.log(datelength)
            cy.get(`[id="add"]`).click()
            for (let i = 0; i < datelength; i++) {
                expenseDetails = ['Food bill', 'Travel', 'mileage', 'Train fare'];
                var startDate = new Date(start_date);
                var endDate = new Date(end_date);
                var expenseDates = new Date(date.split(', ')[i]);
                cy.log(expenseDates[0])
                cy.log(endDate)
                if (expenseDates >= startDate && expenseDates <= endDate) {
                    var net_amount = randomNumber(10, 99)
                    var vat_amount = randomNumber(10, 99)
                    cy.get(`.ButtonNew_button__cEuZ4.ButtonNew_icon-only__G6Eee.ButtonNew_small__jW_1U.ButtonNew_primary__nuNbw`).eq(i).click()
                    cy.get(`[id="from_date"]`).eq(i).type(date.split(', ')[i]).type('{enter}')
                    cy.get(`[id="type"]`).eq(i).type(expenseDetails[i])
                    cy.get(`[id="amount"]`).eq(i).type("{home}").type(net_amount).type('{del}')
                    VAT == 'Yes' ? cy.get('[id="tax_applicable"]').eq(i).click() : null
                    VAT == 'Yes' ? cy.get(`[id="tax_amount"]`).eq(i).type("{home}").type(vat_amount).type('{del}') : null
                    cy.get('[id="comment"]').eq(i).type('Automated comments')
                    cy.get('input[type="file"]').eq(i).invoke("show").wait(100).selectFile(`./cypress/fixtures/Expense/doc/expense${i}.jpg`, { force: true }).wait(1200);
                } else {
                    cy.log('⚠️Please Enter the date range between the contract start date and end date⚠️')
                }
            }
            cy.get('[id="remove"]').eq(datelength).click()
            cy.clickBtn('Save').popup('No')
        })
    }
    expenseInformationBanner(status) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.get('[data-component="Organisms: Info"]:eq(0)').within(() => {
                    cy.get('.min-w-max .font-recoleta').then(id => {
                        human_id = id.text()
                        cy.log(human_id)
                        cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                    })
                    cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                    cy.get('.font-recoleta:eq(1)').should('contain', agencyName)
                    cy.get('.font-recoleta:eq(2)').should('contain', clientName)
                    cy.get('.font-recoleta:eq(3)').should('contain', contractorName)
                    cy.get('.font-recoleta:eq(4)').should('contain', paymentCompanyName)
                })
            } else if (url.includes('app')) {
                cy.getCookie('token').then(cookie => {
                    var token = cookie.value
                    var decoded = jwt_decode(token)
                    cy.log(decoded)
                    var userRole = decoded.allowed_roles
                    cy.log(userRole)
                    if (userRole.includes('contractor')) {
                        cy.get('[data-component="Organisms: Info"]:eq(0)').within(() => {
                            cy.get('.min-w-max .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                                cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            cy.get('.font-recoleta:eq(1)').should('contain', agencyName)
                            cy.get('.font-recoleta:eq(2)').should('contain', clientName)
                            cy.get('.font-recoleta:eq(3)').should('contain', paymentCompanyName)
                        })
                    } else if (userRole.includes('timesheet_approver')) {
                        cy.get('[data-component="Organisms: Info"]:eq(0)').within(() => {
                            cy.get('.min-w-max .font-recoleta').then(id => {
                                human_id = id.text()
                                cy.log(human_id)
                                cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                            })
                            cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                            cy.get('.font-recoleta:eq(2)').should('contain', agencyName)
                            cy.get('.font-recoleta:eq(3)').should('contain', contractorName)
                        })
                    }
                })
            }
        })
    }
    clickSubmit() {
        cy.clickBtn('Submit').popup('No').wait(1200)
    }
    clickApprove() {
        cy.clickBtn('Approve').popup('No').wait(1200)
    }
    clickReject() {
        cy.clickBtn('Reject').popup('No')
    }
    clickRevert() {
        cy.clickBtn('Revert').popup('No')
    }
    invoiceGeneration() {
        gross_total = 0
        net_total = 0
        vat_total = 0
        for (let i = 0; i < datelength; i++) {
            cy.get(`form:contains(${expenseDetails[i]}) span:eq(4)`).then(amount => {
                var gross_amount = parseFloat(amount.text().substring(1))
                gross_total += gross_amount;
                cy.log(gross_total)
            })
            cy.get(`form:contains(${expenseDetails[i]}) span:eq(1)`).then(amount => {
                var net_amount = parseFloat(amount.text().substring(1))
                net_total += net_amount;
                cy.log(net_total)
            })
            cy.get(`form:contains(${expenseDetails[i]}) span:eq(3)`).then(amount => {
                var vat_amount = parseFloat(amount.text().substring(1))
                vat_total += vat_amount;
                cy.log(vat_total)
            })
        }
        cy.wrap(null).then(() => {
            cy.get(`form:contains(Total) span:eq(1)`).should('contain', net_total);
            cy.get(`form:contains(Total) span:eq(2)`).should('contain', vat_total);
            cy.get(`form:contains(Total) span:eq(3)`).should('contain', gross_total);
        });
        generatedInvoices(human_id)
        getExpenseDetails(human_id)
        invoiceValidations.expenseInvoices()
    }
}
export const expensePage = new Expense();