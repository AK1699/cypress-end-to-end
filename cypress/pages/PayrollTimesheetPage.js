import date from 'date-and-time'
import jwt_decode from 'jwt-decode'
import { getContractDetails, getPayrollTimesheetDetails, getTmsDetails } from "../utility/api"
import { generatedInvoices, getRandomTimesheetMinutes, randomNumber, todayDate } from "../utility/functions"
import { invoiceValidations } from '../utility/calculation'
let alphaCode, human_id, agencyName, agency_consultant, dataLength, tempPlacementId, additionalRateName, totalPayrollStandardUnits, totalPayrollAdditionalUnits, totalUnits, totalStandardHours, totalStandardMinutes, totalAdditionalHours, totalAdditionalMinutes, count
export { totalPayrollAdditionalUnits, totalPayrollStandardUnits }


class payrollTimesheet {

    uploadPayrollTimesheetTemplate() {
        cy.get('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`cypress/Data/payrollTimesheetBulkUploadTemplate.csv`, { force: true }).wait(4000)
        cy.get('[class="text-2xl font-semibold font-lato flex justify-center items-center pt-4 capitalize text-center"]').should('have.text', 'File Validated Successfully! Click Proceed to Create Payroll Timesheet')
        cy.get('[class="text-xl font-lato p-1"]').eq(2).should('contain', count)
    }
    getPayrollTimesheetDataForBulkUpload(fundingModel, fundingType) {
        this.agencyDetails(fundingModel)
        cy.log(agencyName)
        if (fundingType == 'Funded' && fundingModel == 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                var tempPlacementId = testData.directContracts[0].funded.temporaryPlacement
                getContractDetails(tempPlacementId)
                cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
                    var startDate = contractData.data.fundo_contract[0].start_date
                    var endDate = contractData.data.fundo_contract[0].end_date
                    cy.setInput("start_date", startDate, 0);
                    cy.setInput("end_date", endDate, 0);
                })
            })
        } else if (fundingType == 'Paid When Paid' && fundingModel == 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                var tempPlacementId = testData.directContracts[0].paidWhenPaid.temporaryPlacement
                getContractDetails(tempPlacementId)
                cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
                    var startDate = contractData.data.fundo_contract[0].start_date
                    var endDate = contractData.data.fundo_contract[0].end_date
                    cy.setInput("start_date", startDate, 0);
                    cy.setInput("end_date", endDate, 0)
                })
            })
        } else if (fundingType == 'Funded' && fundingModel == 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                var tempPlacementId = testData.indirectContracts[0].funded.temporaryPlacement
                getContractDetails(tempPlacementId)
                cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
                    var startDate = contractData.data.fundo_contract[0].start_date
                    var endDate = contractData.data.fundo_contract[0].end_date
                    cy.setInput("start_date", startDate, 0);
                    cy.setInput("end_date", endDate, 0)
                })
            })
        } else if (fundingType == 'Paid When Paid' && fundingModel == 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                var tempPlacementId = testData.indirectContracts[0].paidWhenPaid.temporaryPlacement
                getContractDetails(tempPlacementId)
                cy.readFile('cypress/fixtures/contractDetails.json').then(contractData => {
                    var startDate = contractData.data.fundo_contract[0].start_date
                    var endDate = contractData.data.fundo_contract[0].end_date
                    cy.setInput("start_date", startDate, 0);
                    cy.setInput("end_date", endDate, 0)
                })
            })
        }
        cy.clickBtn('download').wait(5000)
        count = 0;
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.directEntities[0].agencies
                let agencyName = agencyName.replace(/:/g, "_");
                cy.task('readFromCsv', { path: `downloads/${agencyName}_${todayDate()}` }).then(res => {
                    cy.log(agencyName)
                    var resLength = res.length
                    console.log(resLength)
                    console.log(res[0])
                    cy.task('readFromCsv', { path: `Data/payrollTimesheetBulkUploadTemplate` }).then(data => {
                        dataLength = data.length
                        if (dataLength >= 1) {
                            for (let i = 0; i < dataLength; i++) {
                                data.shift()
                            }
                            cy.task('writeToCsv', { path: 'payrollTimesheetBulkUploadTemplate', rows: data })
                        }
                        res.forEach(value => {
                            if (count < 5) {
                                data.push({ ["Timesheet Id"]: value["Timesheet Id"], ["Placement Id"]: value["Placement Id"], ["Client Name"]: value["Client Name"], ["Contractor Name"]: value["Contractor Name"], ["Agency Name"]: value["Agency Name"], ["Start Date"]: value["Start Date"], ["End Date"]: value["End Date"], ["Status"]: value["Status"], ["Unit Type"]: value["Unit Type"], ["Rate Name"]: value["Rate Name"], ["Total Units"]: value["Total Units"] = randomNumber(1, 24) })
                                count++;
                            }
                        });
                        cy.log(count)
                        cy.task('writeToCsv', { path: 'payrollTimesheetBulkUploadTemplate', rows: data })
                    })
                })
            })
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                let agencyName = agencyName.replace(/:/g, "_");
                cy.task('readFromCsv', { path: `downloads/${agencyName}_${todayDate()}` }).then(res => {
                    cy.log(agencyName)
                    var resLength = res.length
                    console.log(resLength)
                    console.log(res[0])
                    cy.task('readFromCsv', { path: `Data/payrollTimesheetBulkUploadTemplate` }).then(data => {
                        dataLength = data.length
                        cy.log(dataLength)
                        if (dataLength >= 1) {
                            for (let i = 0; i < dataLength; i++) {
                                data.shift()
                            }
                            cy.task('writeToCsv', { path: 'payrollTimesheetBulkUploadTemplate', rows: data })
                        }
                        res.forEach(value => {
                            if (count < 5) {
                                data.push({ ["Timesheet Id"]: value["Timesheet Id"], ["Placement Id"]: value["Placement Id"], ["Client Name"]: value["Client Name"], ["Contractor Name"]: value["Contractor Name"], ["Agency Name"]: value["Agency Name"], ["Start Date"]: value["Start Date"], ["End Date"]: value["End Date"], ["Status"]: value["Status"], ["Unit Type"]: value["Unit Type"], ["Rate Name"]: value["Rate Name"], ["Total Units"]: value["Total Units"] = randomNumber(1, 24) })
                                count++;
                            }
                        });
                        cy.log(count)
                        cy.task('writeToCsv', { path: 'payrollTimesheetBulkUploadTemplate', rows: data })
                        cy.log(data)
                    })
                })
            })
        } else {
            cy.log('unknown funding model!')
        }
    }
    validateGeneratedPayrollTimesheets() {
        cy.task('readFromCsv', { path: `Data/payrollTimesheetBulkUploadTemplate` }).then(data => {
            for (let i = 0; i < count; i++) {
                cy.get(`tr:contains(${data[i]["Timesheet Id"]}):eq(0)`).then(() => {
                    cy.get(`tr:contains(${data[i]["Timesheet Id"]}) td:eq(10)`).should('contain', 'Submitted')
                })
            }
            cy.get(`button:contains(Filter)`).click()
            cy.setDropDown('linked_timesheet_id', data[0]["Timesheet Id"]).clickBtn('Search')
            cy.get(`.break-normal.break-all`).eq(0).click().wait(3000)

        })
    }
    clickCreatePayroll() {
        cy.clickBtn('insert')
    }
    clickDownload() {
        cy.clickBtn('Download')
    }
    clickTemplate() {
        cy.clickBtn('Template')
    }
    selectFundingType(fundingType) {
        cy.dropDown('funding_type', fundingType)
    }
    filterPayrollTimesheet() {
        cy.idFilter('human_id',human_id)
    }
    selectCurrency() {
        cy.readFile('cypress/fixtures/payrollTimesheet/payrollTimesheet.json').then(mockData => {
            cy.readFile('cypress/fixtures/config/currency.json').then(currency => {
                var currencyData = currency.data.config_currency.filter(currency => currency.name == mockData.rows[0].currency)
                alphaCode = currencyData[0].alpha_code
            })
            cy.dropDown('currency_id', mockData.rows[0].currency)
        })
    }
    agencyDetails(fundingModel) {
        if (fundingModel === 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.directEntities[0].agencies
                cy.setDropDown("agency_id", agencyName);
            })
        } else if (fundingModel === 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                agencyName = testData.indirectEntities[0].agencies
                cy.setDropDown("agency_id", agencyName)
            })
        } else {
            cy.log('unknown funding model!')
        }
    }
    selectTemporaryPlacement(fundingModel, fundingType) {
        cy.log(fundingModel, fundingType)
        if (fundingType == 'Funded' && fundingModel == 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                tempPlacementId = testData.directContracts[0].funded.temporaryPlacement
                cy.setDropDown('contract_id', tempPlacementId)
            })
        } else if (fundingType == 'Paid When Paid' && fundingModel == 'Direct') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                tempPlacementId = testData.directContracts[0].paidWhenPaid.temporaryPlacement
                cy.setDropDown('contract_id', tempPlacementId)
            })
        } else if (fundingType == 'Funded' && fundingModel == 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                tempPlacementId = testData.indirectContracts[0].funded.temporaryPlacement
                cy.setDropDown('contract_id', tempPlacementId)
            })
        } else if (fundingType == 'Paid When Paid' && fundingModel == 'Indirect') {
            cy.readFile('cypress/fixtures/testData.json').then(testData => {
                tempPlacementId = testData.indirectContracts[0].paidWhenPaid.temporaryPlacement
                cy.setDropDown('contract_id', tempPlacementId)
            })
        } else {
            cy.log('Invalid data!');
        }
    }
    selectDates() {
        cy.get('[id="start_date_value"]').then(value => {
            var start_date = value.text()
            cy.setInput("start_date", start_date, 0);
            cy.get('[id="end_date_value"]').then(value => {
                var end_date = value.text()
                // Define the start date and end date in milliseconds since the Unix epoch
                const startDate = new Date(start_date).getTime();
                const endDate = new Date(end_date).getTime();
                const randomTimestamp = Math.random() * (endDate - startDate) + startDate;
                const randomDate = new Date(randomTimestamp);
                const formattedRandomDate = randomDate.toISOString().split('T')[0];
                cy.log("Random Date:", formattedRandomDate);
                cy.setInput('end_date', formattedRandomDate, 0)
            })
        })
    }
    fillPayrollTimesheetDetails({ additionalRateEntry }) {
        cy.readFile('cypress/fixtures/payrollTimesheet/apiData.json').then(payrollDetail => {
            cy.clickBtn('Add Detail').wait(200)
            cy.get(`.flex.items-center.p-2:contains(Standard)`).click()
            cy.get('[id="unit_type"]:eq(0)').then(unit_type => {
                var unitType = unit_type.text()
                if (unitType == 'Days') {
                    let standaradTotalUnits = Math.floor(Math.random() * 800) + 200;
                    let additionalTotalUnits = Math.floor(Math.random() * 50) + 10;
                    let standardUnitsLength = standaradTotalUnits.toString().split("").length;
                    let additionalUnitsLength = additionalTotalUnits.toString().split("").length;
                    additionalRateName = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[1]?.name
                    var additionalContractorRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[1].contractor_rate
                    var additionalClientRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[1].client_rate
                    var standardContractorRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[0].contractor_rate
                    var standardClientRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[0].client_rate
                    for (let i = 0; i < standardUnitsLength; i++) {
                        cy.get(`form:contains(Standard) [id="hourly"]`).type(standaradTotalUnits.toString().split("")[i]);
                    }
                    if (additionalRateEntry == 'yes') {
                        cy.get('[class="relative"] button').click()
                        cy.get(`.flex.items-center.p-2:contains(${additionalRateName})`).click()
                        for (let i = 0; i < additionalUnitsLength; i++) {
                            cy.get(`form:contains(${additionalRateName}) [id="hourly"]`).type(additionalTotalUnits.toString().split("")[i]);
                        }
                        cy.get(`form:contains(Standard)`).find(`[id="contractor_rate"]`).should('have.text', standardContractorRate)
                        cy.get(`form:contains(Standard)`).find(`[id="client_rate"]`).should('have.text', standardClientRate)
                        cy.get(`form:contains(${additionalRateName})`).find(`[id="contractor_rate"]`).should('have.text', additionalContractorRate)
                        cy.get(`form:contains(${additionalRateName})`).find(`[id="client_rate"]`).should('have.text', additionalClientRate)
                    }

                } else if (unitType == 'Hours') {
                    let standaradTotalUnits = Math.floor(Math.random() * 50) + 20;
                    let additionalTotalUnits = Math.floor(Math.random() * 20) + 10;
                    let standardUnitsLength = standaradTotalUnits.toString().split("").length;
                    let additionalUnitsLength = additionalTotalUnits.toString().split("").length;
                    additionalRateName = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[1]?.name
                    var additionalContractorRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[1].contractor_rate
                    var additionalClientRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[1].client_rate
                    var standardContractorRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[0].contractor_rate
                    var standardClientRate = payrollDetail.data.fundo_timesheet[0].contract.contract_rates[0].client_rate
                    for (let i = 0; i < standardUnitsLength; i++) {
                        cy.get(`form:contains(Standard) [id="hourly"]`).type(standaradTotalUnits.toString().split("")[i]);
                    }
                    cy.get(`form:contains(Standard) [id="minutes"] [class="my-react-select__indicator my-react-select__dropdown-indicator css-tlfecz-indicatorContainer"]`).click().wait(300).then(() => {
                        cy.get(`.my-react-select__menu-list .break-words:contains(${getRandomTimesheetMinutes()})`).click()
                    })
                    if (additionalRateEntry == 'yes') {
                        cy.get('[class="relative"] button').click()
                        cy.get(`.flex.items-center.p-2:contains(${additionalRateName})`).click()
                        for (let i = 0; i < additionalUnitsLength; i++) {
                            cy.get(`form:contains(${additionalRateName}) [id="hourly"]`).type(additionalTotalUnits.toString().split("")[i]);
                        }
                        cy.get(`form:contains(${additionalRateName}) [id="minutes"] [class="my-react-select__indicator my-react-select__dropdown-indicator css-tlfecz-indicatorContainer"]`).click().wait(300).then(() => {
                            cy.get(`.my-react-select__menu-list .break-words:contains(${getRandomTimesheetMinutes()})`).click()
                        })
                        cy.get(`form:contains(Standard)`).find(`[id="contractor_rate"]`).should('have.text', standardContractorRate)
                        cy.get(`form:contains(Standard)`).find(`[id="client_rate"]`).should('have.text', standardClientRate)
                        cy.get(`form:contains(${additionalRateName})`).find(`[id="contractor_rate"]`).should('have.text', additionalContractorRate)
                        cy.get(`form:contains(${additionalRateName})`).find(`[id="client_rate"]`).should('have.text', additionalClientRate)
                    }
                }
                cy.clickBtn("Save").popup('No').wait(2500)
            });
        })
    }
    payrollTimesheetBannerInformation(status) {
        cy.get('.min-w-max > .font-recoleta').then(id => {
            human_id = id.text()
            cy.log(human_id)
            getPayrollTimesheetDetails(human_id)
        })
        cy.readFile('cypress/fixtures/payrollTimesheet/apiData.json').then(timesheetDetails => {
            const startDate = new Date(timesheetDetails.data.fundo_timesheet[0].start_date);
            const endDate = new Date(timesheetDetails.data.fundo_timesheet[0].end_date);
            var start_date = date.format(startDate, 'DD MMM YYYY')
            var end_date = date.format(endDate, 'DD MMM YYYY')
            var contract_id = timesheetDetails.data.fundo_timesheet[0].contract_human_id
            var agencyName = timesheetDetails.data.fundo_timesheet[0].agency_name
            var clientName = timesheetDetails.data.fundo_timesheet[0].client_name
            var contractorName = timesheetDetails.data.fundo_timesheet[0].contractor_name
            var paymentCompanyName = timesheetDetails.data.fundo_timesheet[0].contractor_payment_name
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
    }
    uploadProofOfSubmissionDocument() {
        cy.get('form:contains(Proof of submission)').find('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`cypress/fixtures/payrollTimesheet/doc/Proof_Of_Submission.eml`, { force: true }).wait(3000).clickBtn('Insert').popup('No')
    }
    uploadProofOfApprovalDocument() {
        cy.get('form:contains(Proof of approval)').find('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`cypress/fixtures/payrollTimesheet/doc/Proof_Of_Approval.eml`, { force: true }).wait(3000).clickBtn('Insert').popup('No')
    }
    clickInsert() {
        cy.clickBtn("Insert").popup('No').wait(3000)
    }
    clickProceed() {
        cy.clickBtn('Proceed').wait(800).get("#swal2-title").should("have.text", "Action Successful").wait(800);
    }
    clickApprove() {
        cy.clickBtn('Approve').popup('No').wait(3000)
    }
    clickSubmit() {
        cy.clickBtn('Submit').popup('No')
    }
    validateTotalUnits() {
        cy.get('[id="unit_type"]:eq(0)').then(unit_type => {
            var unitType = unit_type.text()
            cy.log(unitType)
            getTmsDetails(human_id)
            cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(details => {
                var additionalUnits = details.result.data.fundo_timesheet[0].timesheet_details[1]?.units
                if (unitType == 'Days') {
                    cy.get('form:contains(Standard) [id="hourly"]').then(unit => {
                        totalPayrollStandardUnits = unit.text()
                        cy.log(totalPayrollStandardUnits)
                    })
                    additionalUnits ?
                        cy.get(`form:contains(${additionalRateName}) [id="hourly"]`).then(unit => {
                            totalPayrollAdditionalUnits = unit.text()
                            cy.log(totalPayrollAdditionalUnits)
                        }) : totalPayrollAdditionalUnits == 0;
                    cy.wrap(null).then(() => {
                        additionalRateName ? totalUnits = parseInt(totalPayrollStandardUnits) + parseInt(totalPayrollAdditionalUnits) : totalUnits = parseInt(totalPayrollStandardUnits)
                        cy.log(totalUnits)
                        cy.get('[id="units"]').should('contain', totalUnits)
                    })
                } else if (unitType == 'Hours') {
                    totalStandardHours = 0;
                    totalStandardMinutes = 0;
                    totalAdditionalHours = 0;
                    totalAdditionalMinutes = 0;
                    cy.get(`form:Contains(Standard) [id="hourly"]`).then(hour => {
                        var hours = parseFloat(hour.text())
                        // cy.log(hours)
                        totalStandardHours += hours
                        cy.log("totalHours", totalStandardHours)
                    })
                    cy.get(`form:Contains(Standard) [id="minutes"]`).then(minute => {
                        var minutes = parseFloat(minute.text().match(/\d+/g)) ? parseFloat(minute.text().match(/\d+/g)[0]) : 0;
                        // cy.log(minutes)
                        if (minutes !== null || minutes !== 'undefined') {
                            totalStandardMinutes += minutes
                            if (totalStandardMinutes >= 60) {
                                totalStandardHours += Math.floor(totalStandardMinutes / 60);
                                totalStandardMinutes = totalStandardMinutes % 60;
                            }
                            cy.log("totalMinutes", totalStandardMinutes)
                        } else {
                            totalStandardMinutes = 0
                        }
                    })
                    additionalUnits ?
                        cy.get(`form:Contains(${additionalRateName}) [id="hourly"]`).then(hour => {
                            var hours = parseFloat(hour.text())
                            totalAdditionalHours += hours
                            cy.log("totalHours", totalAdditionalHours)
                        }) : totalAdditionalHours == 0;
                    additionalUnits ?
                        cy.get(`form:Contains(${additionalRateName}) [id="minutes"]`).then(minute => {
                            var minutes = parseFloat(minute.text().match(/\d+/g)) ? parseFloat(minute.text().match(/\d+/g)[0]) : 0;
                            if (minutes !== null || minutes !== 'undefined') {
                                totalAdditionalMinutes += minutes
                                if (totalAdditionalMinutes >= 60) {
                                    totalAdditionalHours += Math.floor(totalAdditionalMinutes / 60);
                                    totalAdditionalMinutes = totalAdditionalMinutes % 60;
                                }
                                cy.log("totalMinutes", totalAdditionalMinutes)
                            } else {
                                totalAdditionalMinutes = 0;
                            }
                        }) : totalAdditionalMinutes == 0;
                    cy.wrap(null).then(() => {
                        totalPayrollStandardUnits = totalStandardHours + (totalStandardMinutes / 60)
                        totalPayrollAdditionalUnits = totalAdditionalHours + (totalAdditionalMinutes / 60)
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
                }
            })

        })
    }
    validateBulkUploadedTotalUnits() {
        cy.get('[id="unit_type"]:eq(0)').then(unit_type => {
            var unitType = unit_type.text()
            getTmsDetails(human_id)
            cy.readFile('cypress/fixtures/timesheet/tmsResponse.json').then(details => {
                var additionalUnit = details.result.data.fundo_timesheet[0].timesheet_details[1].units
                if (unitType == 'Days') {
                    cy.get('form:contains(Standard) [id="hourly"]').then(unit => {
                        totalPayrollStandardUnits = unit.text()
                        cy.log(totalPayrollStandardUnits)
                    })
                }
            })

        })
    }
    invoiceGeneration() {
        generatedInvoices(human_id)
        getContractDetails(tempPlacementId)
        invoiceValidations.payrollTimesheetInvoices(human_id)
    }
    logoutUser() {
        cy.logout()
    }
}
export const payrollTimesheetPage = new payrollTimesheet()