import date from 'date-and-time'
import jwt_decode from 'jwt-decode'
import { getContractDetails, getTmsDetails, getDraftTimesheetChaserEmail, getSubmittedTimesheetChaserEmail, getMagicLinkForClientApprover } from '../utility/api'
import { generatedInvoices, getRandomTimesheetDays, getRandomTimesheetMinutes, randomNumber } from '../utility/functions'
import { invoiceValidations } from '../utility/calculation'
var human_id, timesheetEntries, additionalRateName, timesheetStartDate, timesheetEndDate, contractorName, contractorEmail, startDate, currentDate, endDate, timesheetApproverName, timesheetApproverEmail, contract_id, dateLength, additionalRateName, totalStandardHours, totalStandardMinutes, totalAdditionalHours, totalAdditionalMinutes, totalStandardDays, totalAdditionalDays, totalAdditionalUnits, totalStandardUnits, agencyUserEmail
export { human_id, agencyUserEmail, contractorName, contractorEmail, timesheetApproverName, timesheetApproverEmail, totalStandardHours, totalStandardMinutes, totalAdditionalHours, totalAdditionalMinutes, totalStandardDays, totalAdditionalDays, totalAdditionalUnits, totalStandardUnits }

class Timesheets {
    getTimesheetId(timesheetFrequency, unitType, fundingModel, fundingType) {
        cy.log(fundingModel, unitType, fundingType, timesheetFrequency)
        cy.readFile('cypress/fixtures/testData.json').then(timesheetId => {
            if (fundingModel == 'Direct' && fundingType == 'Funded' && timesheetFrequency == 'Weekly' && unitType == 'Hours') {
                human_id = timesheetId.directTransactions[0].funded.draft.weeklyHourlyTimesheets[0]
                timesheetId.directTransactions[0].funded.draft.weeklyHourlyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Funded' && timesheetFrequency == 'Monthly' && unitType == 'Hours') {
                human_id = timesheetId.directTransactions[0].funded.draft.monthlyHourlyTimesheets[0]
                timesheetId.directTransactions[0].funded.draft.monthlyHourlyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Funded' && timesheetFrequency == 'Weekly' && unitType == 'Days') {
                human_id = timesheetId.directTransactions[0].funded.draft.weeklyDailyTimesheets[0]
                timesheetId.directTransactions[0].funded.draft.weeklyDailyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Funded' && timesheetFrequency == 'Monthly' && unitType == 'Days') {
                human_id = timesheetId.directTransactions[0].funded.draft.monthlyDailyTimesheets[0]
                timesheetId.directTransactions[0].funded.draft.monthlyDailyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Weekly' && unitType == 'Hours') {
                human_id = timesheetId.directTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets[0]
                timesheetId.directTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Monthly' && unitType == 'Hours') {
                human_id = timesheetId.directTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets[0]
                timesheetId.directTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Weekly' && unitType == 'Days') {
                human_id = timesheetId.directTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets[0]
                timesheetId.directTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.shift()
            } else if (fundingModel == 'Direct' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Monthly' && unitType == 'Days') {
                human_id = timesheetId.directTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets[0]
                timesheetId.directTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Funded' && timesheetFrequency == 'Weekly' && unitType == 'Hours') {
                human_id = timesheetId.indirectTransactions[0].funded.draft.weeklyHourlyTimesheets[0]
                timesheetId.indirectTransactions[0].funded.draft.weeklyHourlyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Funded' && timesheetFrequency == 'Monthly' && unitType == 'Hours') {
                human_id = timesheetId.indirectTransactions[0].funded.draft.monthlyHourlyTimesheets[0]
                timesheetId.indirectTransactions[0].funded.draft.monthlyHourlyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Funded' && timesheetFrequency == 'Weekly' && unitType == 'Days') {
                human_id = timesheetId.indirectTransactions[0].funded.draft.weeklyDailyTimesheets[0]
                timesheetId.indirectTransactions[0].funded.draft.weeklyDailyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Funded' && timesheetFrequency == 'Monthly' && unitType == 'Days') {
                human_id = timesheetId.indirectTransactions[0].funded.draft.monthlyDailyTimesheets[0]
                timesheetId.indirectTransactions[0].funded.draft.monthlyDailyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Weekly' && unitType == 'Hours') {
                human_id = timesheetId.indirectTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets[0]
                timesheetId.indirectTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Monthly' && unitType == 'Hours') {
                human_id = timesheetId.indirectTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets[0]
                timesheetId.indirectTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Weekly' && unitType == 'Days') {
                human_id = timesheetId.indirectTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets[0]
                timesheetId.indirectTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.shift()
            } else if (fundingModel == 'Indirect' && fundingType == 'Paid When Paid' && timesheetFrequency == 'Monthly' && unitType == 'Days') {
                human_id = timesheetId.indirectTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets[0]
                timesheetId.indirectTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.shift()
            } else {
                cy.log('**Invalid data!**');
            }
            cy.writeFile('cypress/fixtures/testData.json', timesheetId);
            cy.log(human_id)
            getTmsDetails(human_id)
            cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(email => {
                contractorEmail = email.result.data.fundo_timesheet[0].contract.contract_entities[0].business.individual.user.email
                timesheetApproverEmail = email.result.data.fundo_timesheet[0].contract.contract_business_contacts[2].user.email
                agencyUserEmail = email.result.data.fundo_timesheet[0].contract.contract_business_contacts[0].user.email
                contractorName = email.result.data.fundo_timesheet[0].contractor_name;
                timesheetApproverName = email.result.data.fundo_timesheet[0].contract.contract_business_contacts[2].user.name;
            })
        })
    }
    filterTimesheetId() {
        cy.log(human_id)
        cy.idFilter('human_id', human_id)
    }
    timesheetInformationBanner(status) {
        cy.url().then(url => {
            if (url.includes('ops')) {
                cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(timesheetDetails => {
                    const startDate = new Date(timesheetDetails.result.data.fundo_timesheet[0].start_date);
                    const endDate = new Date(timesheetDetails.result.data.fundo_timesheet[0].end_date);
                    var start_date = date.format(startDate, 'DD MMM YYYY')
                    var end_date = date.format(endDate, 'DD MMM YYYY')
                    contract_id = timesheetDetails.result.data.fundo_timesheet[0].contract.human_id
                    var agencyName = timesheetDetails.result.data.fundo_timesheet[0].agency_name
                    var clientName = timesheetDetails.result.data.fundo_timesheet[0].client_name
                    var contractorName = timesheetDetails.result.data.fundo_timesheet[0].contractor_name
                    var paymentCompanyName = timesheetDetails.result.data.fundo_timesheet[0].contractor_payment_name
                    cy.get('[data-component="Atom: Badge"]:eq(0)').then(data => {
                        if (data.text() == 'Dismissed') {
                            cy.clickBtn('Revert Timesheet').popup('No')
                        }
                    })
                    cy.get('[data-component="Organisms: Info"]:eq(0)').within(() => {
                        cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                        cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                        cy.get('.font-recoleta:eq(1)').should('have.text', start_date)
                        cy.get('.font-recoleta:eq(2)').should('have.text', end_date)
                        cy.get('.font-recoleta:eq(3)').should('contain', contract_id)
                        cy.get('.font-recoleta:eq(4)').should('contain', agencyName)
                        cy.get('.font-recoleta:eq(5)').should('contain', clientName)
                        cy.get('.font-recoleta:eq(6)').should('contain', contractorName)
                        cy.get('.font-recoleta:eq(7)').should('contain', paymentCompanyName)
                    })
                })
            } else if (url.includes('app')) {
                cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(timesheetDetails => {
                    const startDate = new Date(timesheetDetails.result.data.fundo_timesheet[0].start_date);
                    const endDate = new Date(timesheetDetails.result.data.fundo_timesheet[0].end_date);
                    var start_date = date.format(startDate, 'DD MMM YYYY')
                    var end_date = date.format(endDate, 'DD MMM YYYY')
                    contract_id = timesheetDetails.result.data.fundo_timesheet[0].contract.human_id
                    var agencyName = timesheetDetails.result.data.fundo_timesheet[0].agency_name
                    var clientName = timesheetDetails.result.data.fundo_timesheet[0].client_name
                    var contractorName = timesheetDetails.result.data.fundo_timesheet[0].contractor_name
                    var paymentCompanyName = timesheetDetails.result.data.fundo_timesheet[0].contractor_payment_name
                    cy.window().then(win => {
                        var token = win.sessionStorage.getItem('x-hasura-token');
                        var decoded = jwt_decode(token)
                        cy.log(decoded)
                        var userRole = decoded.allowed_roles
                        cy.log(userRole)
                        cy.get('[data-component="Atom: Badge"]:eq(0)').then(data => {
                            if (data.text() == 'Dismissed') {
                                cy.clickBtn('Revert Timesheet').popup('No')
                            }
                        })
                        cy.get('[data-component="Organisms: Info"]:eq(0)').within(() => {
                            if (userRole.includes('contractor')) {
                                cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                                cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                                cy.get('.font-recoleta:eq(1)').should('have.text', start_date)
                                cy.get('.font-recoleta:eq(2)').should('have.text', end_date)
                                cy.get('.font-recoleta:eq(3)').should('contain', contract_id)
                                cy.get('.font-recoleta:eq(4)').should('contain', agencyName)
                                cy.get('.font-recoleta:eq(5)').should('contain', clientName)
                                cy.get('.font-recoleta:eq(6)').should('contain', paymentCompanyName)
                            } else if (userRole.includes('client_timesheet_approver')) {
                                cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                                cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                                cy.get('.font-recoleta:eq(1)').should('have.text', start_date)
                                cy.get('.font-recoleta:eq(2)').should('have.text', end_date)
                                cy.get('.font-recoleta:eq(3)').should('contain', contract_id)
                                cy.get('.font-recoleta:eq(4)').should('contain', agencyName)
                                cy.get('.font-recoleta:eq(5)').should('contain', contractorName)
                            } else if (userRole.includes('agency_consultant')) {
                                cy.get('.min-w-max .font-recoleta').should('contain', human_id)
                                cy.get('[data-component="Atom: Badge"]:eq(0)').should('have.text', status)
                                cy.get('.font-recoleta:eq(1)').should('have.text', start_date)
                                cy.get('.font-recoleta:eq(2)').should('have.text', end_date)
                                cy.get('.font-recoleta:eq(3)').should('contain', contract_id)
                                cy.get('.font-recoleta:eq(4)').should('contain', agencyName)
                                cy.get('.font-recoleta:eq(5)').should('contain', clientName)
                                cy.get('.font-recoleta:eq(6)').should('contain', paymentCompanyName)
                            }
                            else {
                                cy.log('**Invalid user role!**')
                            }
                        })
                    })
                })
            } else {
                cy.log('**Invalid domain!**')
            }
        })
    }
    fillTimesheetEntries({ additionalRateEntry }) {
        cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(tmsres => {
            var timesheetStartDate = tmsres.result.data.fundo_timesheet[0].start_date
            var timesheetEndDate = tmsres.result.data.fundo_timesheet[0].end_date
            var startDate = new Date(timesheetStartDate);
            var endDate = new Date(timesheetEndDate);
            timesheetEntries = [];
            var currentDate = startDate;
            while (currentDate <= endDate) {
                timesheetEntries.push({
                    date: date.format(currentDate, 'DD MMM YYYY'),
                    day: date.format(currentDate, 'dddd')
                })
                currentDate = date.addDays(currentDate, 1);
            }
            dateLength = timesheetEntries.length
            additionalRateName = tmsres.result.data.fundo_timesheet[0]?.contract.contract_rates[1]?.name
            for (let i = 0; i < dateLength; i++) {
                if (tmsres.result.data.fundo_timesheet[0].timesheet_details[i].contract_rate.unit_type == 'daily') {
                    tmsres.result.data.fundo_timesheet[0]?.contract.contract_rates[0]?.name == 'Standard' ? cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:contains(Standard)`).find(`[id="daily"]`).click().wait(300).then(() => {
                        cy.get(`.css-11unzgr .break-normal:contains(${getRandomTimesheetDays()})`).click()
                    }) : null
                    additionalRateName ? additionalRateEntry == 'yes' ? cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) [type='button']`).click().get(`.flex.items-center.p-2:contains(${additionalRateName})`).click().get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:contains(${additionalRateName})`).find(`[id="daily"]`).click().wait(300).then(() => {
                        cy.get(`.css-11unzgr .break-normal:contains(${getRandomTimesheetDays()})`).click()
                    }) : null : null
                }
                else {
                    tmsres.result.data.fundo_timesheet[0]?.contract.contract_rates[0]?.name == 'Standard' ? cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day})`).find(`#hourly`).type(randomNumber(1, 12)) : null
                    tmsres.result.data.fundo_timesheet[0]?.contract.contract_rates[0]?.name == 'Standard' ? cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:contains(Standard) [id="minutes"]`).click().wait(300).then(() => {
                        cy.get(`.css-11unzgr .break-normal:contains(${getRandomTimesheetMinutes()})`).click()
                    }) : null
                    additionalRateName ? additionalRateEntry == 'yes' ? cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) [type='button']`).click().get(`.flex.items-center.p-2:contains(${additionalRateName})`).click().get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) [id="hourly"]`).eq(1).type(randomNumber(1, 12)) : null : null
                    additionalRateName ? additionalRateEntry == 'yes' ? cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:contains(${additionalRateName}) [id="minutes"]`).click().wait(300).then(() => {
                        cy.get(`.css-11unzgr .break-normal:contains(${getRandomTimesheetMinutes()})`).click()
                    }) : null : null
                }
            }
        })
    }
    validateTotalUnits({ additionalRateEntry }) {
        cy.get('#unit_type').then(unitType => {
            cy.wait(3500)
            let unit_type = unitType.text()
            if (unit_type == 'Hours') {
                totalStandardHours = 0;
                totalStandardMinutes = 0;
                totalAdditionalHours = 0;
                totalAdditionalMinutes = 0;
                for (let i = 0; i < dateLength; i++) {
                    cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:Contains(Standard) [id="hourly"]`).then(hour => {
                        var hours = parseFloat(hour.text())
                        // cy.log(hours)
                        totalStandardHours += hours
                        cy.log("totalHours", totalStandardHours)
                    })
                    cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:Contains(Standard) [id="minutes"]`).then(minute => {
                        var minutes = parseFloat(minute.text().match(/\d+/g)[0])
                        // cy.log(minutes)
                        totalStandardMinutes += minutes
                        if (totalStandardMinutes >= 60) {
                            totalStandardHours += Math.floor(totalStandardMinutes / 60);
                            totalStandardMinutes = totalStandardMinutes % 60;
                        }
                        cy.log("totalMinutes", totalStandardMinutes)
                    })
                    additionalRateEntry == 'yes' ?
                        cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:Contains(${additionalRateName}) [id="hourly"]`).then(hour => {
                            var hours = parseFloat(hour.text())
                            totalAdditionalHours += hours
                            cy.log("totalHours", totalAdditionalHours)
                        }) : totalAdditionalHours == 0

                    additionalRateEntry == 'yes' ?
                        cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:Contains(${additionalRateName}) [id="minutes"]`).then(minute => {
                            var minutes = parseFloat(minute.text().match(/\d+/g)[0])
                            totalAdditionalMinutes += minutes
                            if (totalAdditionalMinutes >= 60) {
                                totalAdditionalHours += Math.floor(totalAdditionalMinutes / 60);
                                totalAdditionalMinutes = totalAdditionalMinutes % 60;
                            }
                            cy.log("totalMinutes", totalAdditionalMinutes)
                        }) : totalAdditionalMinutes == 0;
                }
                cy.wrap(null).then(() => {
                    totalStandardUnits = totalStandardHours + (totalStandardMinutes / 60)
                    totalAdditionalUnits = totalAdditionalHours + (totalAdditionalMinutes / 60)
                    var totalMinutes = totalStandardMinutes + totalAdditionalMinutes
                    var totalHours = totalStandardHours + totalAdditionalHours
                    if (totalMinutes >= 60) {
                        totalHours += Math.floor(totalMinutes / 60);
                        totalMinutes = totalMinutes % 60;
                    }
                    cy.log('Additional rate', totalAdditionalHours, totalAdditionalMinutes)
                    cy.log('Standard rate', totalStandardHours, totalStandardMinutes)
                    var totalUnits = `${totalHours} Hours  ${totalMinutes} Minutes`
                    cy.log(totalUnits)
                    cy.get('#units > span').should('contain', totalHours)
                })
            } else if (unit_type == 'Days') {
                totalStandardDays = 0;
                totalAdditionalDays = 0;
                for (let i = 0; i < dateLength; i++) {
                    cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:Contains(Standard) [id="daily"]`).then(unit => {
                        var daysUnit = unit.text()
                        // cy.log(hours)
                        if (daysUnit == 'Full Day') {
                            daysUnit = 1
                        } else if (daysUnit == 'Half Day') {
                            daysUnit = 0.5
                        } else if (daysUnit == 'Not Working') {
                            daysUnit = 0
                        }
                        totalStandardDays += daysUnit
                        cy.log(totalStandardDays)
                    })

                    additionalRateEntry == 'yes' ?
                        cy.get(`.bg-white.rounded-md:contains(${timesheetEntries[i].date}):contains(${timesheetEntries[i].day}) form:Contains(${additionalRateName}) [id="daily"]`).then(unit => {
                            var daysUnit = unit.text()
                            // cy.log(hours)
                            if (daysUnit == 'Full Day') {
                                daysUnit = 1
                            } else if (daysUnit == 'Half Day') {
                                daysUnit = 0.5
                            } else if (daysUnit == 'Not Working') {
                                daysUnit = 0
                            }
                            totalAdditionalDays += daysUnit
                            cy.log(totalAdditionalDays)
                        }) : totalAdditionalDays == 0
                }
                cy.wrap(null).then(() => {
                    totalStandardUnits = totalStandardDays
                    totalAdditionalUnits = totalAdditionalDays
                    cy.log('totalAdditionalDays', totalAdditionalUnits)
                    cy.log('totalStandardDays', totalStandardUnits)
                    var totalUnits = totalAdditionalUnits + totalStandardUnits
                    cy.get('#units> span').should('contain', totalUnits)
                })
            }
        })
    }
    storeApprovedTimesheets() {
        cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(data => {
            var fundingModel = data.result.data.fundo_timesheet[0].contract.funding_model
            var fundingType = data.result.data.fundo_timesheet[0].contract.funding_type
            var timesheetFrequency = data.result.data.fundo_timesheet[0].contract.contract_temp_placement.timesheet_frequency
            var unitType = data.result.data.fundo_timesheet[0].contract.contract_rates[0].unit_type
            cy.get('.min-w-max .font-recoleta').then(id => {
                var timesheetId = id.text()
                cy.get('[data-component="Atom: Badge"]:eq(0)').then(status => {
                    var status = status.text()
                    if (status == 'Approved') {
                        if (fundingModel == 'direct' && fundingType == 'funded' && timesheetFrequency == 'weekly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].funded.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'funded' && timesheetFrequency == 'monthly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].funded.approved.monthlyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'funded' && timesheetFrequency == 'weekly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].funded.approved.weeklyDailyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'funded' && timesheetFrequency == 'monthly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].funded.approved.monthlyDailyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'paid_when_paid' && timesheetFrequency == 'weekly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].paidWhenPaid.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'paid_when_paid' && timesheetFrequency == 'monthly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].paidWhenPaid.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'paid_when_paid' && timesheetFrequency == 'weekly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].paidWhenPaid.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'direct' && fundingType == 'paid_when_paid' && timesheetFrequency == 'monthly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.directTransactions[0].paidWhenPaid.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'funded' && timesheetFrequency == 'weekly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].funded.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'funded' && timesheetFrequency == 'monthly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].funded.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'funded' && timesheetFrequency == 'weekly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].funded.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'funded' && timesheetFrequency == 'monthly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].funded.approved.monthlyDailyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'paid_when_paid' && timesheetFrequency == 'weekly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].paidWhenPaid.approved.weeklyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'paid_when_paid' && timesheetFrequency == 'monthly' && unitType == 'hourly') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].paidWhenPaid.approved.monthlyHourlyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'paid_when_paid' && timesheetFrequency == 'weekly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].paidWhenPaid.approved.weeklyDailyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else if (fundingModel == 'indirect' && fundingType == 'paid_when_paid' && timesheetFrequency == 'monthly' && unitType == 'daily') {
                            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                                testData.indirectTransactions[0].paidWhenPaid.approved.monthlyDailyTimesheets.push(timesheetId)
                                cy.writeFile('cypress/fixtures/testData.json', testData)
                            })
                        } else {
                            cy.log('Invalid data!');
                        }
                    }
                })
            })
        })

    }
    invoiceGeneration() {
        cy.log(human_id)
        generatedInvoices(human_id)
        getContractDetails(contract_id)
        invoiceValidations.timesheetInvoices(human_id)
    }
    uploadProofOfSubmissionDocument() {
        cy.get('form:contains(Proof of submission)').find('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`./cypress/fixtures/timesheet/Proof_Of_Submission.eml`, { force: true }).wait(3000).clickBtn('Insert').popup('No')
    }
    uploadProofOfApprovalDocument() {
        cy.get('form:contains(Proof of approval)').find('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`./cypress/fixtures/timesheet/Proof_Of_Approval.eml`, { force: true }).wait(3000).clickBtn('Insert').popup('No')
    }
    clickSubmit() {
        cy.clickBtn('Submit').popup('No')
    }
    clickSave() {
        cy.clickBtn('Save').popup('No')
    }
    clickDismiss() {
        cy.clickBtn('Dismiss').popup('No')
    }
    clickEdit() {
        cy.clickBtn('Edit').popup('No')
    }
    clickReject() {
        cy.clickBtn('Reject').popup('No')
    }
    clickApprove() {
        cy.clickBtn('Approve').popup('No')
    }
    clickNoResubmission() {
        cy.clickBtn('No Resubmission').popup('No')
    }
    clickRevertTimesheet() {
        cy.clickBtn('Revert Timesheet').popup('No')
    }
    logoutUser() {
        cy.logout()
    }

    // """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""Timesheet Chaser methods""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" 
    filterTimesheetIdForChaser() {
        cy.log(human_id, contractorName, timesheetApproverName)
        cy.get('button:contains(Filter)').click().then(() => {
            cy.get(`.bg-skin-primary-inverted [id="human_id"]`).type(human_id).wait(2000).then(() => {
                cy.get(`.css-11unzgr :contains(${human_id}):eq(2)`)
                    .click()
                    .get('button:contains(Search)').click()
                    .wait(1500);
            })
        });
    }
    chaseContractorTimesheet() {
        cy.get('tbody tr td:eq(3)').then(data => {
            if (data.text() == 'Dismissed') {
                cy.get('tbody tr td:eq(2) .underline').click()
                cy.clickBtn('Revert Timesheet').popup('No')
                cy.go('back')
            }
            cy.get('tbody [type="checkbox"]').check()
            cy.get('button:contains(Chase)').click()
                .wait(1500)
                .get('[id="transaction_id"]').should('contain', human_id)
                .get('[id="status"]').should('contain', 'Draft')
                .get('[id="receiver_names"]').should('contain', contractorName)
                .get('[id="receiver_type"]').should('contain', 'Contractor')
                .get('[id="comment"]').type('Test chase for automation')
                .wait(1500)
            cy.get('button:contains(Chase):eq(1)').click().popup('Yes')
        })
    }
    chaseClientTimesheet() {
        cy.get('tbody tr td:eq(3)').then(data => {
            if (data.text() == 'Dismissed') {
                cy.get('tbody tr td:eq(2) .underline').click()
                cy.clickBtn('Revert Timesheet').popup('No')
                cy.go('back')
            }
            cy.get('tbody [type="checkbox"]').check()
            cy.get('button:contains(Chase)').click()
                .wait(1500)
                .get('[id="transaction_id"]').should('contain', human_id)
                .get('[id="status"]').should('contain', 'Submitted')
                .get('[id="receiver_names"]').should('contain', timesheetApproverName)
                .get('[id="receiver_type"]').should('contain', 'Timesheet Approver')
                .get('[id="comment"]').type('Test chase for automation')
                .wait(1500)
            cy.get('button:contains(Chase):eq(1)').click().popup('Yes')
        })
    }
    checkMailForDraftTimesheet() {
        cy.login('PA')
        cy.wait(120000)
        getDraftTimesheetChaserEmail(contractorEmail)
        cy.readFile('cypress/fixtures/timesheet/draftTimesheetChaser.json').then(emailRes => {
            var is_sent_email = emailRes.data.log_mail[0].is_sent
            var to_mail = emailRes.data.log_mail[0].to
            var subject = emailRes.data.log_mail[0].subject
            expect(is_sent_email).equal(true)
            expect(to_mail).contain(contractorEmail)
            expect(subject).contain('Draft Timesheet Reminder')
            cy.log(subject, is_sent_email, to_mail)
        })
    }
    checkMailForSubmittedTimesheet() {
        cy.login('PA')
        cy.wait(120000)
        getSubmittedTimesheetChaserEmail(timesheetApproverEmail)
        cy.readFile('cypress/fixtures/timesheet/submittedTimesheetChaser.json').then(emailRes => {
            var is_sent_email = emailRes.data.log_mail[0].is_sent
            var to_mail = emailRes.data.log_mail[0].to
            var subject = emailRes.data.log_mail[0].subject
            expect(is_sent_email).equal(true)
            expect(to_mail).contain(timesheetApproverEmail)
            expect(subject).contain('Timesheet Submitted - Please Approve')
            cy.log(subject, is_sent_email, to_mail)
        })
    }
    approveTimesheetViaMagicLink() {
        cy.login('PA')
        cy.wait(120000)
        getMagicLinkForClientApprover(timesheetApproverEmail)
        cy.readFile('cypress/fixtures/timesheet/magicLinkClientTimesheet.json').then(emailRes => {
            var is_sent_email = emailRes.data.log_mail[0].is_sent
            var to_mail = emailRes.data.log_mail[0].to
            var subject = emailRes.data.log_mail[0].subject
            var mail_body = emailRes.data.log_mail[0].body
            // Extract Magic link 
            if (is_sent_email === true) {
                var human_id_mail = mail_body.match(/[A-Z]{3}-[0-9]+/)[0]
                cy.log(human_id_mail, subject, to_mail)
                if (human_id_mail === human_id) {
                    var magic_link = mail_body.match(/https?:\/\/[^'""]+/)[0]
                    cy.log(magic_link)
                    cy.visit(magic_link)
                    cy.get('[data-component="Atom: TextAtom"]').should('contain', "This page serves solely for the purpose of reviewing and confirming the timesheet submitted by the contractor. Please note that Raise assumes no responsibility for any inaccuracies in the information provided.")
                    cy.get('[type="checkbox"]').click()
                    this.clickApprove()
                }
            }

        })
    }
    rejectTimesheetViaMagicLink() {
        cy.login('PA')
        cy.wait(120000)
        getMagicLinkForClientApprover(timesheetApproverEmail)
        cy.readFile('cypress/fixtures/timesheet/magicLinkClientTimesheet.json').then(emailRes => {
            var is_sent_email = emailRes.data.log_mail[0].is_sent
            var to_mail = emailRes.data.log_mail[0].to
            var subject = emailRes.data.log_mail[0].subject
            var mail_body = emailRes.data.log_mail[0].body
            // Extract Magic link 
            if (is_sent_email === true) {
                var human_id_mail = mail_body.match(/[A-Z]{3}-[0-9]+/)[0]
                cy.log(human_id_mail, subject, to_mail)
                if (human_id_mail === human_id) {
                    var magic_link = mail_body.match(/https?:\/\/[^'""]+/)[0]
                    cy.log(magic_link)
                    cy.visit(magic_link)
                    cy.get('[data-component="Atom: TextAtom"]').should('contain', "This page serves solely for the purpose of reviewing and confirming the timesheet submitted by the contractor. Please note that Raise assumes no responsibility for any inaccuracies in the information provided.")
                    cy.get('[type="checkbox"]').click()
                    this.clickReject()
                }
            }

        })
    }
    rejectTimesheetForNoResubmissionViaMagicLink() {
        cy.login('PA')
        cy.wait(120000)
        getMagicLinkForClientApprover(timesheetApproverEmail)
        cy.readFile('cypress/fixtures/timesheet/magicLinkClientTimesheet.json').then(emailRes => {
            var is_sent_email = emailRes.data.log_mail[0].is_sent
            var to_mail = emailRes.data.log_mail[0].to
            var subject = emailRes.data.log_mail[0].subject
            var mail_body = emailRes.data.log_mail[0].body
            // Extract Magic link 
            if (is_sent_email === true) {
                var human_id_mail = mail_body.match(/[A-Z]{3}-[0-9]+/)[0]
                cy.log(human_id_mail, subject, to_mail)
                if (human_id_mail === human_id) {
                    var magic_link = mail_body.match(/https?:\/\/[^'""]+/)[0]
                    cy.log(magic_link)
                    cy.visit(magic_link)
                    cy.get('[data-component="Atom: TextAtom"]').should('contain', "This page serves solely for the purpose of reviewing and confirming the timesheet submitted by the contractor. Please note that Raise assumes no responsibility for any inaccuracies in the information provided.")
                    cy.get('[type="checkbox"]').click()
                    this.clickNoResubmission()
                }
            }

        })
    }

}
export const timesheetPage = new Timesheets();