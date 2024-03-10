import _ from "lodash"
import { gross_total, net_total, vat_total, human_id } from "../pages/ExpensePage";
import { totalStandardUnits, totalAdditionalUnits } from "../pages/TimesheetPage"
import { totalPayrollStandardUnits, totalPayrollAdditionalUnits } from "../pages/PayrollTimesheetPage";
import { feeTransactionsPage } from "../pages/FeeTransaction";
import { amountFormate } from "./functions";
let standardClientRate, standardContractorRate, additionalClientRate, additionalContractorRate, payment_company_vat, net_amount, transaction_type, client_vat_amount, contractor_vat_amount, agency_vat_amount, fee_vat_amount, agency_commission_vat_amount, funder_fee_vat_amount, platform_fee_vat_amount, feeInvoiceGrossAmount, contractorGrossAmount, platformFeeGrossAmount, funderFeeGrossAmount, clientGrossAmount, agencyGrosssAmount, agencyCommissionGrosssAmount, service_charge_percentage, client_vat, provider_vat, platform_fee_percentage, funder_fee_percentage, adhoc_vat_percentage, clientNetAmount, agencyNetAmount, contractorNetAmount, agencyCommissionNetAmount, feeInvoiceNetAmount, platformFeeNetAmount, funderFeeNetAmount;

class Calculation {
    calculateNetAmount(invoice_type) {
        if (invoice_type == 'client_invoice') {
            if (transaction_type == 'perm_placement') {
                return clientNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'sales_invoice') {
                return clientNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'purchase_ledger') {
                clientNetAmount = parseFloat(net_amount).toFixed(2)
                cy.log(clientNetAmount)
                return clientNetAmount
            } else if (transaction_type == 'expense') {
                cy.log(net_total)
                return clientNetAmount = parseFloat(net_total).toFixed(2)
            } else if (transaction_type == 'timesheet') {
                var standardNetAmount = totalStandardUnits * standardClientRate
                var additionalNetAmount = totalAdditionalUnits * additionalClientRate
                cy.log('additionalClientRate', additionalClientRate)
                cy.log(standardNetAmount, additionalNetAmount)
                clientNetAmount = standardNetAmount + additionalNetAmount
                return clientNetAmount
            } else if (transaction_type == 'payroll') {
                var standardNetAmount = totalPayrollStandardUnits * standardClientRate
                var additionalNetAmount = totalPayrollAdditionalUnits * additionalClientRate
                cy.log(standardNetAmount, additionalNetAmount)
                clientNetAmount = parseFloat((standardNetAmount + additionalNetAmount)).toFixed(2)
                return clientNetAmount
            }
        } else if (invoice_type == 'contractor') {
            if (transaction_type == 'expense') {
                cy.log(`**${net_total}**`)
                return contractorNetAmount = parseFloat(net_total).toFixed(2)
            } else if (transaction_type == 'timesheet') {
                var standardNetAmount = totalStandardUnits * standardContractorRate
                var additionalNetAmount = totalAdditionalUnits * additionalContractorRate
                cy.log('additionalContractorRate', additionalContractorRate)
                contractorNetAmount = standardNetAmount + additionalNetAmount
                cy.log(standardNetAmount, additionalNetAmount)
                return contractorNetAmount
            } else if (transaction_type == 'payroll') {
                var standardNetAmount = totalPayrollStandardUnits * standardContractorRate
                var additionalNetAmount = totalPayrollAdditionalUnits * additionalContractorRate
                contractorNetAmount = parseFloat((standardNetAmount + additionalNetAmount)).toFixed(2)
                return contractorNetAmount
            }
        } else if (invoice_type == 'fee_invoice') {
            if (transaction_type == 'perm_placement') {
                return feeInvoiceNetAmount = parseFloat(clientGrossAmount * service_charge_percentage / 100).toFixed(2)
            } else if (transaction_type == 'adhoc_fee') {
                return feeInvoiceNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'sales_invoice') {
                return feeInvoiceNetAmount = parseFloat((clientGrossAmount * service_charge_percentage / 100)).toFixed(2)
            } else if (transaction_type == 'purchase_ledger') {
                return feeInvoiceNetAmount = parseFloat((clientGrossAmount * service_charge_percentage / 100)).toFixed(2)
            } else if (transaction_type == 'expense') {
                return feeInvoiceNetAmount = parseFloat((clientGrossAmount * service_charge_percentage / 100)).toFixed(2)
            } else if (transaction_type == 'timesheet') {
                return feeInvoiceNetAmount = clientGrossAmount * service_charge_percentage / 100
            } else if (transaction_type == 'payroll') {
                return feeInvoiceNetAmount = parseFloat((clientGrossAmount * service_charge_percentage / 100)).toFixed(2)
            }
        } else if (invoice_type == 'funder_fee') {
            if (transaction_type == 'perm_placement') {
                return funderFeeNetAmount = parseFloat(clientGrossAmount * funder_fee_percentage / 100).toFixed(3)
            } else if (transaction_type == 'adhoc_fee') {
                return funderFeeNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'sales_invoice') {
                return funderFeeNetAmount = parseFloat(clientGrossAmount * funder_fee_percentage / 100).toFixed(3)
            } else if (transaction_type == 'expense') {
                return funderFeeNetAmount = parseFloat((clientGrossAmount * funder_fee_percentage / 100)).toFixed(3)
            } else if (transaction_type == 'purchase_ledger') {
                funderFeeNetAmount = parseFloat(clientGrossAmount * funder_fee_percentage / 100).toFixed(3)
                cy.log('funder_fee_net_amount', funderFeeNetAmount)
                return funderFeeNetAmount
            } else if (transaction_type == 'timesheet' || transaction_type == 'payroll') {
                funderFeeNetAmount = clientGrossAmount * funder_fee_percentage / 100
                cy.log('funderfeeNetAmount', funderFeeNetAmount)
                return funderFeeNetAmount
            }
        } else if (invoice_type == 'platform_fee') {
            if (transaction_type == 'perm_placement') {
                return platformFeeNetAmount = parseFloat(clientGrossAmount * platform_fee_percentage / 100).toFixed(3)
            } else if (transaction_type == 'sales_invoice') {
                return platformFeeNetAmount = parseFloat(clientGrossAmount * platform_fee_percentage / 100).toFixed(3)
            }
            else if (transaction_type == 'expense') {
                return platformFeeNetAmount = parseFloat((clientGrossAmount * platform_fee_percentage / 100)).toFixed(3)
            } else if (transaction_type == 'purchase_ledger') {
                platformFeeNetAmount = parseFloat(clientGrossAmount * platform_fee_percentage / 100).toFixed(3)
                cy.log('platform_fee_net_amount', platformFeeNetAmount)
                return platformFeeNetAmount
            } else if (transaction_type == 'timesheet' || transaction_type == 'payroll') {
                platformFeeNetAmount = clientGrossAmount * platform_fee_percentage / 100
                cy.log('platformFeeNetAmount', platformFeeNetAmount)
                return platformFeeNetAmount
            }
        } else if (invoice_type == 'agency_commission') {
            if (transaction_type == 'perm_placement') {
                return agencyCommissionNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'adhoc_fee') {
                return agencyCommissionNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'sales_invoice') {
                return agencyCommissionNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'timesheet') {
                agencyCommissionNetAmount = clientNetAmount - contractorNetAmount
            } else if (transaction_type == 'payroll') {
                agencyCommissionNetAmount = parseFloat((clientNetAmount - contractorNetAmount)).toFixed(2)
            }
        } else if (invoice_type == 'agency_invoice') {
            if (transaction_type == 'perm_placement') {
                return agencyNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'adhoc_fee') {
                return agencyNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'sales_invoice') {
                return agencyNetAmount = parseFloat(net_amount).toFixed(2)
            } else if (transaction_type == 'purchase_ledger') {
                agencyNetAmount = parseFloat(net_amount).toFixed(2)
                cy.log('agency_invoice_net_amount', agencyNetAmount)
                return agencyNetAmount
            } else if (transaction_type == 'expense') {
                agencyNetAmount = parseFloat(net_total).toFixed(2)
                cy.log('agency_invoice_net_amount', agencyNetAmount)
                return agencyNetAmount
            } else if (transaction_type == 'timesheet' || transaction_type == 'payroll') {
                var standardNetAmount = totalStandardUnits * standardClientRate
                var additionalNetAmount = totalAdditionalUnits * additionalClientRate
                cy.log(standardNetAmount, additionalNetAmount)
                agencyNetAmount = standardNetAmount + additionalNetAmount
                return agencyNetAmount
            }
        }
    }
    calculateVatAmount(invoice_type) {
        if (invoice_type === 'client_invoice') {
            if (transaction_type == 'perm_placement') {
                client_vat_amount = parseFloat((clientNetAmount * (client_vat / 100)).toFixed(2))
                return client_vat_amount;
            } else if (transaction_type == 'purchase_ledger') {
                client_vat_amount = parseFloat((clientNetAmount * (client_vat / 100)).toFixed(2))
                cy.log('client_invoice_vat_amount', client_vat_amount)
                return client_vat_amount;
            } else if (transaction_type == 'sales_invoice') {
                client_vat_amount = parseFloat((clientNetAmount * (client_vat / 100)).toFixed(2))
                return client_vat_amount;
            } else if (transaction_type == 'expense') {
                client_vat_amount = parseFloat(vat_total).toFixed(2)
            } else if (transaction_type == 'timesheet') {
                client_vat_amount = parseFloat(clientNetAmount * (client_vat / 100).toFixed(2))
                return client_vat_amount
            } else if (transaction_type == 'payroll') {
                client_vat_amount = parseFloat((clientNetAmount * (client_vat / 100)).toFixed(2))
                return client_vat_amount
            }
        } else if (invoice_type == 'contractor') {
            if (transaction_type == "expense") {
                contractor_vat_amount = parseFloat(vat_total).toFixed(2)
                return contractor_vat_amount;
            } else if (transaction_type == 'timesheet') {
                contractor_vat_amount = parseFloat(contractorNetAmount * (payment_company_vat / 100).toFixed(2))
                return contractor_vat_amount
            } else if (transaction_type == 'payroll') {
                contractor_vat_amount = parseFloat(((contractorNetAmount * (payment_company_vat / 100))).toFixed(2))
                return contractor_vat_amount
            }
        } else if (invoice_type == 'agency_invoice') {
            if (transaction_type == "perm_placement") {
                agency_vat_amount = parseFloat((agencyNetAmount * (client_vat / 100)).toFixed(2))
                return agency_vat_amount;
            } else if (transaction_type == 'purchase_ledger') {
                agency_vat_amount = parseFloat((agencyNetAmount * (client_vat / 100)).toFixed(2))
                return agency_vat_amount;
            } else if (transaction_type == 'sales_invoice') {
                agency_vat_amount = parseFloat((agencyNetAmount * (client_vat / 100)).toFixed(2))
                return agency_vat_amount;
            } else if (transaction_type == 'expense') {
                agency_vat_amount = parseFloat((agencyNetAmount * (client_vat / 100)).toFixed(2))
                return agency_vat_amount;
            } else if (transaction_type == 'timesheet') {
                agency_vat_amount = parseFloat(agencyNetAmount * (client_vat / 100).toFixed(2))
                return agency_vat_amount;
            } else if (transaction_type == 'payroll') {
                agency_vat_amount = parseFloat((agencyNetAmount * (client_vat / 100)).toFixed(2))
                return agency_vat_amount;
            } else if (transaction_type == 'adhoc_fee') {
                agency_vat_amount = parseFloat((agencyNetAmount * (adhoc_vat_percentage / 100)).toFixed(2))
                return agency_vat_amount;
            }
        }
        else if (invoice_type === 'fee_invoice') {
            if (transaction_type == 'perm_placement') {
                fee_vat_amount = parseFloat((feeInvoiceNetAmount * (provider_vat / 100)).toFixed(2))
                return fee_vat_amount;
            } else if (transaction_type == 'purchase_ledger') {
                fee_vat_amount = parseFloat((feeInvoiceNetAmount * (provider_vat / 100)).toFixed(2))
                return fee_vat_amount;
            } else if (transaction_type == 'sales_invoice') {
                fee_vat_amount = parseFloat((feeInvoiceNetAmount * (provider_vat / 100)).toFixed(2))
                return fee_vat_amount;
            } else if (transaction_type == 'expense') {
                fee_vat_amount = parseFloat((feeInvoiceNetAmount * (provider_vat / 100)).toFixed(2))
                return fee_vat_amount;
            } else if (transaction_type == 'timesheet') {
                fee_vat_amount = parseFloat(feeInvoiceNetAmount * (provider_vat / 100).toFixed(2))
                return fee_vat_amount;
            } else if (transaction_type == 'payroll') {
                fee_vat_amount = parseFloat((feeInvoiceNetAmount * (provider_vat / 100)).toFixed(2))
                return fee_vat_amount;
            } else if (transaction_type == 'adhoc_fee') {
                fee_vat_amount = parseFloat(((feeInvoiceNetAmount * (adhoc_vat_percentage / 100))).toFixed(2))
                return fee_vat_amount;
            }
        } else if (invoice_type == 'funder_fee') {
            if (transaction_type == 'perm_placement') {
                funder_fee_vat_amount = parseFloat((funderFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            } else if (transaction_type == 'purchase_ledger') {
                funder_fee_vat_amount = parseFloat((funderFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            } else if (transaction_type == 'sales_invoice') {
                funder_fee_vat_amount = parseFloat((funderFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            } else if (transaction_type == 'expense') {
                funder_fee_vat_amount = parseFloat((funderFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            } else if (transaction_type == 'timesheet') {
                funder_fee_vat_amount = parseFloat(funderFeeNetAmount * (provider_vat / 100).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            } else if (transaction_type == 'payroll') {
                funder_fee_vat_amount = parseFloat((funderFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            } else if (transaction_type == 'adhoc_fee') {
                funder_fee_vat_amount = parseFloat(((funderFeeNetAmount * (adhoc_vat_percentage / 100))).toFixed(2))
                cy.log(funder_fee_vat_amount)
                return funder_fee_vat_amount
            }
        } else if (invoice_type == 'platform_fee') {
            if (transaction_type == 'perm_placement') {
                platform_fee_vat_amount = parseFloat((platformFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log("platformFee", platform_fee_vat_amount)
                return platform_fee_vat_amount;
            } else if (transaction_type == 'purchase_ledger') {
                platform_fee_vat_amount = parseFloat((platformFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log("platformFee", platform_fee_vat_amount)
                return platform_fee_vat_amount;
            } else if (transaction_type == 'sales_invoice') {
                platform_fee_vat_amount = parseFloat((platformFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log("platformFee", platform_fee_vat_amount)
                return platform_fee_vat_amount;
            } else if (transaction_type == 'expense') {
                platform_fee_vat_amount = parseFloat((platformFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log("platformFee", platform_fee_vat_amount)
                return platform_fee_vat_amount;
            } else if (transaction_type == 'timesheet') {
                platform_fee_vat_amount = parseFloat(platformFeeNetAmount * (provider_vat / 100).toFixed(2))
                cy.log("platformFee", platform_fee_vat_amount)
                return platform_fee_vat_amount;
            } else if (transaction_type == 'payroll') {
                platform_fee_vat_amount = parseFloat((platformFeeNetAmount * (provider_vat / 100)).toFixed(2))
                cy.log("platformFee", platform_fee_vat_amount)
                return platform_fee_vat_amount;
            } else if (transaction_type == 'adhoc_fee') {
                platform_fee_vat_amount = parseFloat((platformFeeNetAmount * (adhoc_vat_percentage / 100)).toFixed(2))
                cy.log(platform_fee_vat_amount)
                return platform_fee_vat_amount;
            }
        } else if (invoice_type == 'agency_commission') {
            if (transaction_type == 'perm_placement') {
                agency_commission_vat_amount = parseFloat((agencyCommissionNetAmount * (client_vat / 100)).toFixed(2))
                return agency_commission_vat_amount;
            } else if (transaction_type == 'sales_invoice') {
                agency_commission_vat_amount = parseFloat((agencyCommissionNetAmount * (client_vat / 100)).toFixed(2))
                return agency_commission_vat_amount;
            }
            else if (transaction_type == 'timesheet') {
                agency_commission_vat_amount = client_vat_amount - contractor_vat_amount
                return agency_commission_vat_amount;
            }
            else if (transaction_type == 'payroll') {
                agency_commission_vat_amount = parseFloat((client_vat_amount - contractor_vat_amount).toFixed(2))
                return agency_commission_vat_amount;
            }
            else if (transaction_type == 'adhoc_fee') {
                agency_commission_vat_amount = parseFloat((agencyCommissionNetAmount * (adhoc_vat_percentage / 100)).toFixed(2))
                return agency_commission_vat_amount;
            }
        }
    }
    calculateGrossAmount(invoice_type) {
        if (invoice_type == 'fee_invoice') {
            if (transaction_type == 'perm_placement' || transaction_type == 'expense' || transaction_type == 'adhoc_fee' || transaction_type == 'purchase_ledger' || transaction_type == 'sales_invoice' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                feeInvoiceGrossAmount = parseFloat((feeInvoiceNetAmount + fee_vat_amount).toFixed(2))
                cy.log(clientGrossAmount)
                return feeInvoiceGrossAmount;
            }
        } else if (invoice_type == 'platform_fee') {
            if (transaction_type == 'perm_placement' || transaction_type == 'adhoc_fee' || transaction_type == 'purchase_ledger' || transaction_type == 'sales_invoice' || transaction_type == 'expense' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                cy.log(platformFeeNetAmount, platform_fee_vat_amount)
                platformFeeGrossAmount = (parseFloat(platformFeeNetAmount) + parseFloat(platform_fee_vat_amount)).toFixed(3)
                cy.log("platformFeeGrossAmount", platformFeeGrossAmount)
                return platformFeeGrossAmount;
            }
        } else if (invoice_type == 'funder_fee') {
            if (transaction_type == 'perm_placement' || transaction_type == 'adhoc_fee' || transaction_type == 'purchase_ledger' || transaction_type == 'sales_invoice' || transaction_type == 'expense' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                funderFeeGrossAmount = (parseFloat(funderFeeNetAmount) + parseFloat(funder_fee_vat_amount)).toFixed(3)
                cy.log("funder_fee", funderFeeGrossAmount)
                return funderFeeGrossAmount;
            }
        } else if (invoice_type == 'client_invoice') {
            if (transaction_type == 'perm_placement' || transaction_type == 'adhoc_fee' || transaction_type == 'purchase_ledger' || transaction_type == 'sales_invoice' || transaction_type == 'expense' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                clientGrossAmount = (parseFloat(clientNetAmount) + parseFloat(client_vat_amount)).toFixed(2)
                return clientGrossAmount
            }
        } else if (invoice_type == 'agency_invoice') {
            if (transaction_type == 'perm_placement' || transaction_type == 'adhoc_fee' || transaction_type == 'purchase_ledger' || transaction_type == 'sales_invoice' || transaction_type == 'expense' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                agencyGrosssAmount = (parseFloat(agencyNetAmount) + parseFloat(agency_vat_amount)).toFixed(2)
                return agencyGrosssAmount
            }
        } else if (invoice_type == 'agency_commission') {
            if (transaction_type == 'perm_placement' || transaction_type == 'adhoc_fee' || transaction_type == 'sales_invoice' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                agencyCommissionGrosssAmount = (parseFloat(agencyCommissionNetAmount) + parseFloat(agency_commission_vat_amount)).toFixed(2)
                return agencyCommissionGrosssAmount
            }
        } else if (invoice_type == 'contractor') {
            if (transaction_type == 'expense' || transaction_type == 'timesheet' || transaction_type == 'payroll') {
                this.calculateNetAmount(invoice_type)
                this.calculateVatAmount(invoice_type)
                contractorGrossAmount = parseFloat(parseFloat(contractorNetAmount + contractor_vat_amount).toFixed(2))
                cy.log(contractorGrossAmount)
                // console.log(gross_total)
                return contractorGrossAmount
            }
        }
    }
    adhocFeeInvoices() {
        cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
            net_amount = contractData.data.fundo_contract[0].requisites.amount
            transaction_type = contractData.data.fundo_contract[0].type
            adhoc_vat_percentage = contractData.data.fundo_contract[0].requisites.tax
            var currencySymbol = contractData.data.fundo_contract[0].currency.symbol
            var type = `${contractData.data.fundo_contract[0].requisites.from}-${contractData.data.fundo_contract[0].requisites.to}`
            var funding_model = contractData.data.fundo_contract[0].funding_model
            var human_id = contractData.data.fundo_contract[0].human_id
            if (type == 'agency-funder') {
                cy.get('#invoice').click()
                var agencyInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_invoice'))}`
                cy.log('agency-funder', agencyInvoice)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    cy.get(`tbody tr:contains(Agency-Funder)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyInvoice)
                })
            } else if (type == 'funder-agency') {
                cy.get('#invoice').click()
                var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                cy.log('funder-agency', funderFee)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Funder-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', funderFee)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
                })
            } else if (type == 'provider-agency') {
                cy.get('#invoice').click()
                var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                cy.log('provider-agency', feeInvoice)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                })
            } else if (type == 'agency-provider') {
                cy.get('#invoice').click()
                var agencyInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_invoice'))}`
                cy.log('agency-provider', agencyInvoice)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyInvoice)
                })
            }
        })
    }
    permInvoices() {
        cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
            cy.readFile('cypress/fixtures/permPlacementDetailsResponse.json').then(permDetails => {
                var human_id = contractData.data.fundo_contract[0].human_id
                var currencySymbol = contractData.data.fundo_contract[0].currency.symbol
                var funding_model = contractData.data.fundo_contract[0].funding_model
                var funding_type = contractData.data.fundo_contract[0].funding_type
                transaction_type = permDetails.data.fundo_contract[0].type
                net_amount = permDetails.data.fundo_contract[0].contract_perm_placement.invoice_value
                var client_details = permDetails.data.fundo_contract[0].contract_entities.filter(entity => entity.business.type == "client")
                var provider_details = permDetails.data.fundo_contract[0].contract_entities.filter(entity => entity.business.type == "provider")
                client_vat = client_details[0].business.business_taxes[0].value
                provider_vat = provider_details[0].business.business_taxes[0].value
                if (funding_model == 'indirect') {
                    var agencyBusiness = permDetails.data.fundo_contract[0].contract_entities.filter(entity => entity.business.type == "agency")
                    var serviceChargeDetails = agencyBusiness[0].business.service_charges.filter(type => type.fee_type == 'platform_fee')
                    service_charge_percentage = serviceChargeDetails[0].value
                } else if (funding_model == 'direct') {
                    var agencyBusiness = permDetails.data.fundo_contract[0].contract_entities.filter(entity => entity.business.type == "agency")
                    var platformFeeDetails = agencyBusiness[0].business.service_charges.filter(type => type.fee_type == 'platform_fee')
                    platform_fee_percentage = platformFeeDetails[0].value
                    var funderFeeDetails = agencyBusiness[0].business.service_charges.filter(type => type.fee_type == 'funder_fee')
                    funder_fee_percentage = funderFeeDetails[0].value
                } else {
                    cy.log('Invalid funding model')
                }
                if (funding_model === 'direct' && funding_type === 'funded') {
                    cy.get('#invoice').click()
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                    var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`;
                    var platformFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('platform_fee'))}`;
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('funderFee', funderFee)
                    cy.log('platformFee', platformFee)
                    cy.log('agencyCommission', agencyCommission)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Agency-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                    })
                    feeTransactionsPage.filterContract(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Agency Commission) .font-bold:eq(2)`).should('have.text', agencyCommission)
                        cy.get(`tbody tr:contains(Platform Fee) .font-bold:eq(2)`).should('have.text', `-${platformFee}`)
                        cy.get(`tbody tr:contains(Funder Fee) .font-bold:eq(2)`).should('have.text', `-${funderFee}`)
                    })
                } else if (funding_model === 'direct' && funding_type === 'paid_when_paid') {
                    cy.get('#invoice').click()
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var agencyInvoice = clientInvoice;
                    var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                    var agencyCommission = clientInvoice
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('feeInvoice', feeInvoice)
                    cy.log('agencyInvoice', agencyInvoice)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                        cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                        cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                    })
                    feeTransactionsPage.filterContract(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee) .font-bold:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission) .font-bold:eq(2)`).should('have.text', agencyCommission)
                    })
                } else if (funding_model === 'indirect' && funding_type === 'funded') {
                    cy.get('#invoice').click()
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var agencyInvoice = clientInvoice;
                    var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                    var agencyCommission = clientInvoice;
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('feeInvoice', feeInvoice)
                    cy.log('agencyInvoice', agencyInvoice)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                        cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                        cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                    })
                    feeTransactionsPage.filterContract(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee) .font-bold:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission) .font-bold:eq(2)`).should('have.text', agencyCommission)
                    })
                } else if (funding_model === 'indirect' && funding_type === 'paid_when_paid') {
                    cy.get('#invoice').click()
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var agencyInvoice = clientInvoice;
                    var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                    var agencyCommission = clientInvoice
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('feeInvoice', feeInvoice)
                    cy.log('agencyInvoice', agencyInvoice)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                        cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                        cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                    })
                    feeTransactionsPage.filterContract(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee) .font-bold:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission) .font-bold:eq(2)`).should('have.text', agencyCommission)
                    })
                }
            })
        })
    }
    purchaseLegerInvoices() {
        cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
            transaction_type = contractData.data.fundo_contract[0].type
            net_amount = contractData.data.fundo_contract[0].requisites.amount
            var human_id = contractData.data.fundo_contract[0].human_id
            var funding_model = contractData.data.fundo_contract[0].funding_model
            var funding_type = contractData.data.fundo_contract[0].funding_type
            var currencySymbol = contractData.data.fundo_contract[0].currency.symbol
            var clientBusiness = contractData.data.fundo_contract[0].contract_entities.filter(business => business.type === 'client')
            var providerBusiness = contractData.data.fundo_contract[0].contract_entities.filter(business => business.type === 'provider')
            client_vat = clientBusiness[0].business_tax.value
            provider_vat = providerBusiness[0].business_tax.value
            if (funding_model == 'direct') {
                funder_fee_percentage = contractData.data.fundo_contract[0].requisites.funder_fee
                platform_fee_percentage = contractData.data.fundo_contract[0].requisites.provider_fee
            } else if (funding_model == 'indirect') {
                service_charge_percentage = contractData.data.fundo_contract[0].requisites.provider_fee
            }
            if (funding_model == 'direct' && funding_type == 'funded') {
                cy.get('#invoice').click()
                var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                var platformFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('platform_fee'))}`;
                cy.log('clientInvoice', clientInvoice)
                cy.log('funderFee', funderFee)
                cy.log('platformFee', platformFee)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Agency-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${platformFee}`)
                    cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
                })
            } else if (funding_model == 'indirect' && funding_type == 'funded') {
                cy.get('#invoice').click()
                var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                var agencyInvoice = clientInvoice;
                var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                cy.log('clientInvoice', clientInvoice)
                cy.log('feeInvoice', feeInvoice)
                cy.log('agencyInvoice', agencyInvoice)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                    cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                    cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                })
            }
        })
    }
    salesInvoices() {
        cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
            transaction_type = contractData.data.fundo_contract[0].type
            net_amount = contractData.data.fundo_contract[0].requisites.amount
            var human_id = contractData.data.fundo_contract[0].human_id
            var funding_model = contractData.data.fundo_contract[0].funding_model
            var funding_type = contractData.data.fundo_contract[0].funding_type
            var currencySymbol = contractData.data.fundo_contract[0].currency.symbol
            var clientBusiness = contractData.data.fundo_contract[0].contract_entities.filter(business => business.type === 'client')
            var providerBusiness = contractData.data.fundo_contract[0].contract_entities.filter(business => business.type === 'provider')
            client_vat = clientBusiness[0].business_tax.value
            provider_vat = providerBusiness[0].business_tax.value
            if (funding_model == 'direct') {
                funder_fee_percentage = contractData.data.fundo_contract[0].requisites.funder_fee
                platform_fee_percentage = contractData.data.fundo_contract[0].requisites.provider_fee
            } else if (funding_model == 'indirect') {
                service_charge_percentage = contractData.data.fundo_contract[0].requisites.provider_fee
            }
            if (funding_model == 'direct' && funding_type == 'funded') {
                cy.get('#invoice').click()
                var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                var platformFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('platform_fee'))}`;
                var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`;
                cy.log('clientInvoice', clientInvoice)
                cy.log('funderFee', funderFee)
                cy.log('platformFee', platformFee)
                cy.log('agency_commission', agencyCommission)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Agency-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                    cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${platformFee}`)
                    cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
                })
            } else if (funding_model == 'indirect' && funding_type == 'funded') {
                cy.get('#invoice').click()
                var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                var agencyInvoice = clientInvoice;
                var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`;

                cy.log('clientInvoice', clientInvoice)
                cy.log('feeInvoice', feeInvoice)
                cy.log('agencyInvoice', agencyInvoice)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                    cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                    cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                })
                feeTransactionsPage.filterContract(human_id)
                cy.get('tbody[role="rowgroup"]').each(data => {
                    const text = data.text();
                    cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                    cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                })
            }
        })
    }
    expenseInvoices() {
        cy.get('#invoices').click()
        cy.readFile('cypress/fixtures/contractDetails.json').then(expenseDetails => {
            cy.get('tbody>tr:eq(0)>td>:eq(4)').then(type => {
                transaction_type = type.text().toLowerCase()
                cy.log(`**${transaction_type}**`)
                var funding_model = expenseDetails.data.fundo_contract[0].funding_model
                var funding_type = expenseDetails.data.fundo_contract[0].funding_type
                var currencySymbol = expenseDetails.data.fundo_contract[0].currency.symbol
                var providerBusiness = expenseDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'provider')
                provider_vat = providerBusiness[0].business_tax.value
                var agencyBusiness = expenseDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'agency')
                var expenseServiceCharges = agencyBusiness[0].business.service_charges.filter(service => service.service_type == 'expense')
                if (funding_model == 'direct' && funding_type == 'funded') {
                    funder_fee_percentage = expenseServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'funder_fee')[0].value
                    platform_fee_percentage = expenseServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'indirect' && funding_type == 'funded') {
                    service_charge_percentage = expenseServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'direct' && funding_type == 'paid_when_paid') {
                    service_charge_percentage = expenseServiceCharges.filter(type => type.funding_type == 'paid_when_paid' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'indirect' && funding_type == 'paid_when_paid') {
                    service_charge_percentage = expenseServiceCharges.filter(type => type.funding_type == 'paid_when_paid' && type.fee_type == 'platform_fee')[0].value
                }
                if (funding_model == 'direct' && funding_type == 'funded') {
                    var contractorInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('contractor'))}`
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                    var platformFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('platform_fee'))}`
                    cy.log(`**${gross_total}**`)
                    cy.log('contractorInvoice', contractorInvoice)
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('funderFee', funderFee)
                    cy.log('platformFee', platformFee)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Contractor-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', contractorInvoice)
                        cy.get(`tbody tr:contains(Agency-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                    })
                    feeTransactionsPage.filterExpense(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${platformFee}`)
                        cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
                    })
                } else if (funding_model == 'indirect' && funding_type == "funded") {
                    var contractorInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('contractor'))}`
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var agencyInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_invoice'))}`;
                    var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('feeInvoice', feeInvoice)
                    cy.log('agencyInvoice', agencyInvoice)
                    cy.log('contractor', contractorInvoice)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Contractor-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', contractorInvoice)
                        cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                        cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                        cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                    })
                    feeTransactionsPage.filterExpense(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                    })
                }
            })
        })
    }
    timesheetInvoices(human_id) {
        cy.get('#invoices').click()
        cy.get('tbody>tr:eq(0)>td>:eq(4)').then(type => {
            transaction_type = type.text().toLowerCase()
            cy.log(`**${transaction_type}**`)
            cy.readFile('cypress/fixtures/contractDetails.json').then(contractDetails => {
                cy.log(human_id)
                var funding_model = contractDetails.data.fundo_contract[0].funding_model
                var funding_type = contractDetails.data.fundo_contract[0].funding_type
                var currencySymbol = contractDetails.data.fundo_contract[0].currency.symbol
                var clientBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'client')
                var agencyBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'agency')
                var providerBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'provider')
                var contractorPaymentCompanyBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'umbrella' || business.type === 'limited' || business.type === 'self_employed')
                var temporaryPlacementServiceCharges = agencyBusiness[0].business.service_charges.filter(service => service.service_type == 'temp_placement')
                client_vat = clientBusiness[0].business_tax.value
                cy.log('client_vat', client_vat)
                provider_vat = providerBusiness[0].business_tax.value
                payment_company_vat = contractorPaymentCompanyBusiness[0].business_tax.value
                var standardRates = contractDetails.data.fundo_contract[0].contract_rates.filter(type => type.name == 'Standard')
                var additionalRates = contractDetails.data.fundo_contract[0].contract_rates.filter(type => type.name !== 'Standard')
                standardClientRate = standardRates[0].client_rate
                standardContractorRate = standardRates[0].contractor_rate
                additionalClientRate = additionalRates[0]?.client_rate ? additionalClientRate = 0 : null
                additionalContractorRate = additionalRates[0]?.contractor_rate ? additionalContractorRate = 0 : null;
                if (funding_model == 'direct' && funding_type == 'funded') {
                    funder_fee_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'funder_fee')[0].value
                    platform_fee_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'indirect' && funding_type == 'funded') {
                    service_charge_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'direct' && funding_type == 'paid_when_paid') {
                    service_charge_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'paid_when_paid' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'indirect' && funding_type == 'paid_when_paid') {
                    service_charge_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'paid_when_paid' && type.fee_type == 'platform_fee')[0].value
                }
                if (funding_model == 'direct' && funding_type == 'funded') {
                    var contractorInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('contractor'))}`
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                    var platformFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('platform_fee'))}`
                    var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`
                    cy.log('contractorInvoice', contractorInvoice)
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('funderFee', funderFee)
                    cy.log('platformFee', platformFee)
                    cy.log('agencyCommission', agencyCommission)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Contractor-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', contractorInvoice)
                        cy.get(`tbody tr:contains(Agency-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                    })
                    feeTransactionsPage.filterTimesheet(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${platformFee}`)
                        cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
                    })
                } else if (funding_model == 'indirect' && funding_type == "funded") {
                    var contractorInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('contractor'))}`
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var agencyInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_invoice'))}`;
                    var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                    var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('feeInvoice', feeInvoice)
                    cy.log('agencyInvoice', agencyInvoice)
                    cy.log('contractor', contractorInvoice)
                    cy.log('agencyCommission', agencyCommission)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Contractor-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', contractorInvoice)
                        cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                        cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                        cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                    })
                    feeTransactionsPage.filterTimesheet(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                    })
                }
            })
        })
    }
    payrollTimesheetInvoices(human_id) {
        cy.get('#invoices').click()
        cy.get('tbody>tr:eq(0)>td>:eq(4)').then(type => {
            transaction_type = type.text().toLowerCase().split(" ")[0]
            cy.log(`**${transaction_type}**`)
            cy.log(`**${totalPayrollAdditionalUnits, totalPayrollStandardUnits}**`)
            cy.readFile('cypress/fixtures/contractDetails.json').then(contractDetails => {
                cy.log(human_id)
                var funding_model = contractDetails.data.fundo_contract[0].funding_model
                var funding_type = contractDetails.data.fundo_contract[0].funding_type
                var currencySymbol = contractDetails.data.fundo_contract[0].currency.symbol
                var clientBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'client')
                var agencyBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'agency')
                var providerBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'provider')
                var contractorPaymentCompanyBusiness = contractDetails.data.fundo_contract[0].contract_entities.filter(business => business.type === 'umbrella' || business.type === 'limited' || business.type === 'self_employed')
                var temporaryPlacementServiceCharges = agencyBusiness[0].business.service_charges.filter(service => service.service_type == 'temp_placement')
                client_vat = clientBusiness[0].business_tax.value
                provider_vat = providerBusiness[0].business_tax.value
                payment_company_vat = contractorPaymentCompanyBusiness[0].business_tax.value
                var standardRates = contractDetails.data.fundo_contract[0].contract_rates.filter(type => type.name == 'Standard')
                var additionalRates = contractDetails.data.fundo_contract[0].contract_rates.filter(type => type.name !== 'Standard')
                standardClientRate = standardRates[0].client_rate
                standardContractorRate = standardRates[0].contractor_rate
                additionalClientRate = additionalRates[0]?.client_rate ? additionalClientRate = 0 : null
                additionalContractorRate = additionalRates[0]?.contractor_rate ? additionalClientRate = 0 : null
                if (funding_model == 'direct' && funding_type == 'funded') {
                    funder_fee_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'funder_fee')[0].value
                    platform_fee_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'indirect' && funding_type == 'funded') {
                    service_charge_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'funded' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'direct' && funding_type == 'paid_when_paid') {
                    service_charge_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'paid_when_paid' && type.fee_type == 'platform_fee')[0].value
                } else if (funding_model == 'indirect' && funding_type == 'paid_when_paid') {
                    service_charge_percentage = temporaryPlacementServiceCharges.filter(type => type.funding_type == 'paid_when_paid' && type.fee_type == 'platform_fee')[0].value
                }
                if (funding_model == 'direct' && funding_type == 'funded') {
                    var contractorInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('contractor'))}`
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var funderFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('funder_fee'))}`
                    var platformFee = `${currencySymbol}${amountFormate(this.calculateGrossAmount('platform_fee'))}`
                    var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`
                    cy.log('contractorInvoice', contractorInvoice)
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('funderFee', funderFee)
                    cy.log('platformFee', platformFee)
                    cy.log('agencyCommission', agencyCommission)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Contractor-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', contractorInvoice)
                        cy.get(`tbody tr:contains(Agency-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                    })
                    feeTransactionsPage.filterTimesheet(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${platformFee}`)
                        cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
                    })
                } else if (funding_model == 'indirect' && funding_type == "funded") {
                    var contractorInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('contractor'))}`
                    var clientInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('client_invoice'))}`
                    var agencyInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_invoice'))}`;
                    var feeInvoice = `${currencySymbol}${amountFormate(this.calculateGrossAmount('fee_invoice'))}`
                    var agencyCommission = `${currencySymbol}${amountFormate(this.calculateGrossAmount('agency_commission'))}`
                    cy.log('clientInvoice', clientInvoice)
                    cy.log('feeInvoice', feeInvoice)
                    cy.log('agencyInvoice', agencyInvoice)
                    cy.log('contractor', contractorInvoice)
                    cy.log('agencyCommission', agencyCommission)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Contractor-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', contractorInvoice)
                        cy.get(`tbody tr:contains(Provider-Agency)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', feeInvoice)
                        cy.get(`tbody tr:contains(Provider-Client)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', clientInvoice)
                        cy.get(`tbody tr:contains(Agency-Provider)`).find(`.justify-center .text-skin-primary:eq(0)`).should('have.text', agencyInvoice)
                    })
                    feeTransactionsPage.filterTimesheet(human_id)
                    cy.get('tbody[role="rowgroup"]').each(data => {
                        const text = data.text();
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                    })
                }
            })
        })
    }
}
export const invoiceValidations = new Calculation();