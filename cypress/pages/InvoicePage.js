


class Invoices {
    validateAdhocFeeInvoices() {
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
    validatePermInvoices() {
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
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${platformFee}`)
                        cy.get(`tbody tr:contains(Funder Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${funderFee}`)
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
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
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
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
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
                        cy.get(`tbody tr:contains(Platform Fee)`).find(`[class="text-skin-danger "]:eq(2)`).should('have.text', `-${feeInvoice}`)
                        cy.get(`tbody tr:contains(Agency Commission)`).find(`[class="text-skin-primary "]:eq(2)`).should('have.text', agencyCommission)
                    })
                }
            })
        })
    }
    validatePurchaseLegerInvoices() {
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
    validateSalesInvoices() {
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
    validateExpenseInvoices() {
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
}
export const invoicesPage = new Invoices();