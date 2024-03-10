


class Refinement {
    clickCreateRefinement() {
        cy.clickBtn('Create Refinement')
    }
    selectGenerationType(generationType) {
        cy.setDropDown('refinement_type', generationType)
    }
    selectTransactionType() {
        cy.setDropDown('transaction_type', transactionType)
    }
    inputTransactionReference(){
        
    }
}