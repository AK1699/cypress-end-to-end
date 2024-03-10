import { Given } from 'cypress-cucumber-preprocessor/steps';
import { homePage } from '../../pages/HomePage'
import { paymentsPage } from '../../pages/PaymentsPage';
import { payrollTimesheetPage } from '../../pages/PayrollTimesheetPage';
import { clientEmail, connectDB, contractDaysLeftCount, extractContractMagicLink, generatedInvoices, randomBusinessName, randomFullName, randomNumber, todayDate } from '../../utility/functions';
import { agencyPage } from '../../pages/AgencyPage';
import { faker, ur } from '@faker-js/faker';
import { contractMagicLink, getCurrency, getDraftTimesheetChaserEmail, getHiringManagerDashboard, getPendingClientApprovalchaser, getSubmittedTimesheetChaserEmail, getMagicLinkForClientApprover } from '../../utility/api';
import { temporaryPlacementPage } from '../../pages/TemporaryPlacementPage';
import { startOfWeek, format, startOfMonth, startOfQuarter, startOfYear, differenceInDays, parse } from 'date-fns';
import { da, enGB } from 'date-fns/locale';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { timesheetPage } from '../../pages/TimesheetPage';
Given('test login', () => {
  cy.visit('https://staging1-ops.raisetech.io/')
  cy.get('iframe').then(data=>{
    cy.wrap(data.contents().find('body')).should('not.be.empty')
  })
  // cy.login('shelbyagency2022+3907787801@gmail.com')
  // cy.login('OA1')
  // cy.intercept('GET', '/auth/login').as('loginQuery')
  // cy.visit('https://staging1-app.raisetech.io/auth/login').wait('@loginQuery')
  // cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "funder" }).then((rows) => {
  //   cy.writeFile("cypress/fixtures/funder/funder.json", { rows });
  //   cy.log(JSON.stringify(rows));
  //   cy.readFile('cypress/fixtures/funder/funder.json').then(mockData => {
  //     var currencies = mockData.rows[0].currency.split(',')
  //     var currenciesLength = mockData.rows[0].currency.split(',').length
  //     cy.log(currenciesLength)
  //     for (let i = 0; i < currenciesLength; i++) {
  //       cy.log(currencies[i])
  //     }
  //   })
  // });
})
