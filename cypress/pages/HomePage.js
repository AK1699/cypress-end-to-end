import { contractDaysLeftCount } from "../utility/functions"
import { timesheetApprover } from "./TemporaryPlacementRequestPage"


class HomePage {
    navigateToAgencyListPage() {
        cy.navigationBar("Businesses", "Agencies")
    }
    navigateToFunderListPage() {
        cy.navigationBar("Businesses", "Funders")
    }
    navigateToClientListPage() {
        cy.navigationBar("Businesses", "Clients")
    }
    navigateToContractorListPage() {
        cy.navigationBar("Businesses", "Contractors")
    }
    navigateToUmbrellaListPage() {
        cy.navigationBar("Businesses", "Umbrella Companies")
    }
    navigateToLimitedListPage() {
        cy.navigationBar("Businesses", "Limited Companies")
    }
    navigateToProviderListPage() {
        cy.navigationBar("Businesses", "Providers")
    }
    navigateToTemporaryPlacementListPage() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.navigationBar("Contracts", "Temp Placements")
            } else if (url.includes('app')) {
                cy.navigationBar('Temp Placements')
            } else {
                return null;
            }
        })
    }
    navigateToPermanentPlacementListPage() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.navigationBar("Contracts", "Perm Placements")
            } else if (url.includes('app')) {
                cy.navigationBar('Perm Placements')
            } else {
                return null;
            }
        })
    }
    navigateToTimesheetListPage() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.navigationBar("Transactions", "Timesheets")
            } else if (url.includes('app')) {
                cy.navigationBar('Timesheets')
            } else {
                return null;
            }
        })
    }
    navigateToPayrollTimesheetListPage() {
        cy.navigationBar("Transactions", "Payroll Timesheets")
    }
    navigateToExpenseListPage() {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.navigationBar("Transactions", "Expenses")
            } else if (url.includes('app')) {
                cy.navigationBar('Expenses')
            } else {
                return null;
            }
        })
    }
    navigateToSalesInvoiceListPage() {
        cy.navigationBar("Contracts", "Sales Invoice")
    }
    navigateToPurchaseLedgerListPage() {
        cy.navigationBar("Contracts", "Purchase Ledger")
    }
    navigateToAdhocFeeListPage() {
        cy.navigationBar("Contracts", "Adhoc Fee")
    }
    navigateToFeeTransactionsListPage() {
        cy.navigationBar("Transactions", "Fee Transactions")
    }
    navigateToInvoiceAdjustmentListPage() {
        cy.navigationBar("Transactions", "Invoice Adjustments")
    }
    navigateToInvoicesListPage() {
        cy.navigationBar("Transactions", "Invoices")
    }
    navigateToPaymentsListPage() {
        cy.navigationBar('Transactions', 'Payments')
    }
    navigateToTemporaryPlacementRequestListPage() {
        cy.navigationBar('Requests', 'Temp Placements')
    }
    navigateToPermanentPlacementRequestListPage() {
        cy.navigationBar('Requests', 'Perm Placements')
    }
    hiringManagerDashboardWidgets() {
        this.tempPlacementsApprovalPendingWidget()
        this.permPlacementsApprovalPendingWidget()
        this.activeContractorsWidget()
        this.activeTemporaryPlacementsWidget()
        this.newPlacementsStarting()
        this.pendingApprovalForPlacementDetailsChange()

    }
    tempPlacementsApprovalPendingWidget() {
        cy.log("**Temp Placement pending approval**")
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var tempPlacementApprovalPendingAggregate = count.res[0]['Temp Placement pending approval']
            cy.get('[data-component="Molecules: Card"]:contains(Temp Placements Approval Pending):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Temp Placements Approval Pending')
                cy.get('[class="flex gap-x-2"]').should('have.text', tempPlacementApprovalPendingAggregate)
            })
        })
    }
    pendingApprovalForPlacementDetailsChange() {
        cy.log("**Pending approval for placement details change**")
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var pendingApprovalForPlacementDetailsChangeAggregate = count.res[0]['Pending approval for placement details change']
            cy.get('[data-component="Molecules: Card"]:contains(Pending Approval for Placement Details Change):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Pending Approval for Placement Details Change')
                cy.get('[class="flex gap-x-2"]').should('contain', pendingApprovalForPlacementDetailsChangeAggregate)
            })
        })
    }
    permPlacementsApprovalPendingWidget() {
        cy.log("**Perm placement pending approval**")
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var permPlacementApprovalPendingAggregate = count.res[0]['Perm placement pending approval']
            cy.get('[data-component="Molecules: Card"]:contains(Perm Placements Approval Pending):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Perm Placements Approval Pending')
                cy.get('[class="flex gap-x-2"]').should('have.text', permPlacementApprovalPendingAggregate)
            })
        })
    }
    activeContractorsWidget() {
        cy.log("**Active contractor**")
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var activeContractorsAggregate = count.res[0]['Active contractor']
            cy.log(activeContractorsAggregate)
            cy.get('[data-component="Molecules: Card"]:contains(Active Contractors):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Active Contractors')
                cy.get('[class="flex gap-x-2"]').should('have.text', activeContractorsAggregate)
            })
        })
    }
    activeTemporaryPlacementsWidget() {
        cy.log("**Active temporary placements**")
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var activeTemporaryPlacementsAggregate = count.res[0]['Active temporary placements']
            cy.get('[data-component="Molecules: Card"]:contains(Active Temporary Placements)').within(() => {
                cy.get('header').should('have.text', 'Active Temporary Placements')
                cy.get('[class="!font-recoleta max-xs:text-3xl max-xs:font-semibold font-bold top-2 text-5xl 2xl:text-4xl"]:eq(0)').should('contain', activeTemporaryPlacementsAggregate)
            })

        })
        this.contractDaysLeft()
    }
    contractDaysLeft() {
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var contractor1 = count.res[0]['Contract Days Left']
            var contractorname1 = count.res[0]['contractor_name']
            var contractor2 = count.res[2]['Contract Days Left']
            var contractorname2 = count.res[2]['contractor_name']
            var contractor3 = count.res[4]['Contract Days Left']
            var contractorname3 = count.res[4]['contractor_name']
            var contractor4 = count.res[6]['Contract Days Left']
            var contractorname4 = count.res[6]['contractor_name']
            var Contractor5 = count.res[8]['Contract Days Left']
            var contractorname5 = count.res[8]['contractor_name']
            cy.get('[data-component="Molecules: Card"]:contains(Active Temporary Placements)').within(() => {
                cy.get('.break-words.truncate:eq(0)').should('contain', contractorname1)
                cy.get('[class="text-right undefined"]:eq(0)').should('contain', contractor1)
                cy.get('.break-words.truncate:eq(1)').should('contain', contractorname2)
                cy.get('[class="text-skin-primary font-semibold"]:eq(1)').should('contain', contractor2)
                cy.get('.break-words.truncate:eq(2)').should('contain', contractorname3)
                cy.get('[class="text-skin-primary font-semibold"]:eq(2)').should('contain', contractor3)
                cy.get('.break-words.truncate:eq(3)').should('contain', contractorname4)
                cy.get('[class="text-skin-primary font-semibold"]:eq(3)').should('contain', contractor4)
                cy.get('.break-words.truncate:eq(4)').should('contain', contractorname5)
                cy.get('[class="text-skin-primary font-semibold"]:eq(4)').should('contain', Contractor5)
            })

        })

    }
    newPlacementsStarting() {
        cy.log("**New Placements Starting**")
        cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(count => {
            var thisWeekTemporaryPlacements = count.res[1]['This week']
            var thisWeekPermanentPlacements = count.res[0]['This week']
            var thisMonthTemporaryPlacements = count.res[1]['This month']
            var thisMonthPermanentPlacements = count.res[0]['This month']
            var thisQuarterTemporaryPlacements = count.res[1]['This Quarter']
            var thisQuarterPermanentPlacements = count.res[0]['This Quarter']
            var thisYearTemporaryPlacements = count.res[1]['This Year']
            var thisYearPermanentPlacements = count.res[0]['This Year']
            cy.get(`[data-component="Molecules: Card"]:contains(New Placements Starting)`).within(() => {
                cy.get(`.text-right.undefined:eq(2)`).should('have.text', thisWeekTemporaryPlacements)
                cy.get(`.text-right.undefined:eq(4)`).should('have.text', thisMonthTemporaryPlacements)
                cy.get(`.text-right.undefined:eq(6)`).should('have.text', thisQuarterTemporaryPlacements)
                cy.get(`.text-right.undefined:eq(8)`).should('have.text', thisYearTemporaryPlacements)
                cy.get(`.text-right.undefined:eq(3)`).should('have.text', thisWeekPermanentPlacements)
                cy.get(`.text-right.undefined:eq(5)`).should('have.text', thisMonthPermanentPlacements)
                cy.get(`.text-right.undefined:eq(7)`).should('have.text', thisQuarterPermanentPlacements)
                cy.get(`.text-right.undefined:eq(9)`).should('have.text', thisYearPermanentPlacements)
            })
        })
    }
    timesheetApproverDashboardWidget() {
        cy.log("**Timesheet pending approval**")
        cy.readFile('cypress/fixtures/dashboard_count/timesheet_approver_dashboard_aggregate.json').then(count => {
            var timesheet_approver_dashboard_aggregate = count[0]['Timesheet pending approval']
            cy.log(timesheet_approver_dashboard_aggregate)
            cy.get('[data-component="Molecules: Card"]:contains(Timesheets Pending Approval):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Timesheets Pending Approval')
                cy.get('[class="flex gap-x-2"]').should('have.text', timesheet_approver_dashboard_aggregate)
            })
        })
    }
    invoiceContactDashboardWidget() {
        this.invoiceOverdueWidget()
        this.invoiceDisallowedWidget()
        this.outstandingInvoicesWidget()
    }
    invoiceOverdueWidget() {
        cy.log("**Invoices Overdue**")
        cy.readFile('cypress/fixtures/dashboard_count/invoice_contact_dashboard_aggregate.json').then(count => {
            var invoice_contact_dashboard_aggregate = count[0]['Invoices overdue']
            cy.log(invoice_contact_dashboard_aggregate)
            cy.get('[data-component="Molecules: Card"]:contains(Invoices Overdue):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Invoices Overdue')
                cy.get('.font-recoleta:eq(0)').should('have.text', invoice_contact_dashboard_aggregate)
            })
        })
    }
    invoiceDisallowedWidget() {
        cy.log("**Invoices Disallowed**")
        cy.readFile('cypress/fixtures/dashboard_count/invoice_contact_dashboard_aggregate.json').then(count => {
            var invoice_contact_dashboard_aggregate = count[0]['Invoices Disallowed']
            cy.log(invoice_contact_dashboard_aggregate)
            cy.get('[data-component="Molecules: Card"]:contains(Invoices Disallowed):eq(1)').within(() => {
                cy.get('header').should('have.text', 'Invoices Disallowed')
                cy.get('[class="flex gap-x-2"]').should('have.text', invoice_contact_dashboard_aggregate)
            })
        })
    }
    outstandingInvoicesWidget() {
        cy.log("**Outstanding invoices**")
        cy.readFile('cypress/fixtures/dashboard_count/invoice_contact_dashboard_aggregate.json').then(count => {
            var outstandingInvoicesAggregate = count[0]['Outstanding invoices']
            var outStandingInvoiceCount = count[0]['Outstanding invoices']
            var to30Days = count[0]['0-30 days count']
            var to60Days = count[0]['31-60 days count']
            var to90Days = count[0]['61-90 days count']
            var to120Days = count[0]['90-120 days count']
            var moreThan120Days = count[0]['>120 days count']
            var totalCost0to30Days = count[0]['Total Cost 0-30']
            var totalCost31to60Days = count[0]['Total Cost 31-60']
            var totalCost61to90Days = count[0]['Total Cost 61-90']
            var totalCost91to120Days = count[0]['Total Cost 91-120']
            var totalCostmore120Days = count[0]['Total Cost>120']
            cy.get('[data-component="Molecules: Card"]:contains(Outstanding Invoices)').then(() => {
                cy.get('.text-skin-primary:eq(2)').should('have.text', 'Outstanding Invoices')
                cy.get('[class="!font-recoleta max-xs:text-3xl max-xs:font-semibold font-bold top-2 text-5xl 2xl:text-4xl"]').should('contain', outStandingInvoiceCount)
                cy.get('[class="text-right font-lato"]:eq(0)').should('contain', to30Days)
                cy.get('[class="text-right font-lato"]:eq(1)').should('contain', to60Days)
                cy.get('[class="text-right font-lato"]:eq(2)').should('contain', to90Days)
                cy.get('[class="text-right font-lato"]:eq(3)').should('contain', to120Days)
                cy.get('[class="text-right font-lato"]:eq(4)').should('contain', moreThan120Days)
                cy.get('[class="text-right md:min-w-40 text-right"]:eq(0)').should('contain', totalCost0to30Days)
                cy.get('[class="text-right md:min-w-40 text-right"]:eq(1)').should('contain', totalCost31to60Days)
                cy.get('[class="text-right md:min-w-40 text-right"]:eq(2)').should('contain', totalCost61to90Days)
                cy.get('[class="text-right md:min-w-40 text-right"]:eq(3)').should('contain', totalCost91to120Days)
                cy.get('[class="text-right md:min-w-40 text-right"]:eq(4)').should('contain', totalCostmore120Days)


            })
        })
    }
    contractorDasboardWidget() {
        this.placementsToAcceptWidget()
        this.pendingApprovalForPlacementDetailsChangeWidget()
        this.timesheetsToSubmitWidget()
        this.timesheetsPendingApprovalWidget()
        this.incomeWidget()
        this.currentPlacementsWidget()
        this.upcomingPlacementsWidget()
    }
    placementsToAcceptWidget() {
        cy.log("**Placement to accept**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            var placementsToAccept = count[0]['Placement to accept']
            cy.get('[data-component="Molecules: Card"]:eq(1)').should('contain', placementsToAccept)
        })
    }
    pendingApprovalForPlacementDetailsChangeWidget() {
        cy.log("**Pending approval for placement details change**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            var pendingApprovalForPlacementDetailsChange = count[0]['Pending approval for placement details change']
            cy.get('[data-component="Molecules: Card"]:eq(2)').should('contain', pendingApprovalForPlacementDetailsChange)
        })
    }
    timesheetsToSubmitWidget() {
        cy.log("**Timesheet to submit**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            var timesheetsToSubmit = count[0]['Timesheet to submit']
            cy.get('[data-component="Molecules: Card"]:eq(3)').should('contain', timesheetsToSubmit)

        })
    }
    timesheetsPendingApprovalWidget() {
        cy.log("**Timesheets pending approval**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            var timesheetPendingApproval = count[0]['Timesheets pending approval']
            cy.get('[data-component="Molecules: Card"]:eq(4)').should('contain', timesheetPendingApproval)

        })
    }
    incomeWidget() {
        cy.log("**Income**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            cy.get('[data-component="Molecules: Card"]:eq(5)').within(() => {
                cy.get('[class="flex flex-row items-center justify-between custom-gap"]:eq(0)').should('have.text', 'Income')
                var yearToDate = count[0]['Year to Date']
                cy.get('[class="text-skin-primary font-semibold undefined "]:eq(0)').should('contain', yearToDate)
                var lastInvoice = count[0]['Last Invoice']
                cy.get('[class="text-skin-primary font-semibold undefined "]:eq(1)').should('contain', lastInvoice)
            })
        })
    }
    currentPlacementsWidget() {
        cy.log("**Current Placements**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            cy.get('[data-component="Molecules: Card"]:eq(6):contains(Current Placements)').then(() => {
                var currentPlacements = count[0]['Current Placement']
                cy.get('[class="!font-recoleta max-xs:text-3xl max-xs:font-semibold font-bold top-2 text-5xl 2xl:text-4xl"]:eq(1)').should('contain', currentPlacements)
                var placementTitle1 = count[0]['Current placement']
                cy.get('[class="undefined xs:max-w-36 md:max-w-48 lg:max-w-64  break-words truncate"]:eq(0)').should('contain', placementTitle1)
                var placement1 = count[0]['Contract Days Left']
                cy.get('[class="text-skin-primary font-semibold"]:eq(0)').should('contain', placement1)
                var placementTitle2 = count[1]['Current placement']
                cy.get('[class="undefined xs:max-w-36 md:max-w-48 lg:max-w-64  break-words truncate"]:eq(1)').should('contain', placementTitle2)
                var placement2 = count[1]['Contract Days Left']
                cy.get('[class="text-skin-primary font-semibold"]:eq(1)').should('contain', placement2)
                var placementTitle3 = count[2]['Current placement']
                cy.get('[class="undefined xs:max-w-36 md:max-w-48 lg:max-w-64  break-words truncate"]:eq(2)').should('contain', placementTitle3)
                var placement3 = count[2]['Contract Days Left']
                cy.get('[class="text-skin-primary font-semibold"]:eq(2)').should('contain', placement3)
                // var placement4 = count[3]['Contract Days Left']
                // cy.get('[class="text-skin-primary font-semibold"]:eq(3)').should('contain',placement4)
                // var placement5 = count[4]['Contract Days Left']
                // cy.get('[class="text-skin-primary font-semibold"]:eq(3)').should('contain',placement5)

            })
        })
    }
    upcomingPlacementsWidget() {
        cy.log("**Upcoming Placements**")
        cy.readFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json').then(count => {
            cy.get('[data-component="Molecules: Card"]:eq(7):contains(Upcoming Placements)').then(() => {
                var upComingPlacementsCount = count[0]['Upcoming Placement']
                cy.get('[class="!font-recoleta max-xs:text-3xl max-xs:font-semibold font-bold top-2 text-5xl 2xl:text-4xl"]:eq(2)').should('contain', upComingPlacementsCount)
                var placement1Title = count[0]['title']
                cy.get('[class="undefined xs:max-w-36 md:max-w-48 lg:max-w-64  break-words truncate"]:eq(3)').should('contain', placement1Title)
                var placement1Stardate = count[0]['start_date']
                cy.get('[class="text-right font-lato"]:eq(3)').should('contain', placement1Stardate)
            })
        })
    }
}
export const homePage = new HomePage();