import { homePage } from "./HomePage"
class FeeTransactions {
    filterContract(human_id) {
        homePage.navigateToFeeTransactionsListPage()
        cy.get('button:contains(Filter)').click()
        cy.get('[id="generated_for_placement"]').type(human_id)
        cy.get(`[class="break-normal break-words"]:contains(${human_id})`).click()
        cy.get('button:contains(Search)').click()
    }
    filterExpense(human_id){
        homePage.navigateToFeeTransactionsListPage()
        cy.get('button:contains(Filter)').click()
        cy.get('[id="generated_for_expense"]').type(human_id)
        cy.get(`[class="break-normal break-words"]:contains(${human_id})`).click()
        cy.get('button:contains(Search)').click()
    }
    filterTimesheet(human_id){
        homePage.navigateToFeeTransactionsListPage()
        cy.get('button:contains(Filter)').click()
        cy.get('[id="generated_for_timesheet"]').type(human_id)
        cy.get(`[class="break-normal break-words"]:contains(${human_id})`).click()
        cy.get('button:contains(Search)').click()
    }

}
export const feeTransactionsPage = new FeeTransactions();