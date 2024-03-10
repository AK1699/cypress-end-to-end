


class contractorPayment {
    updateContractorPaymentTemplate(invoices) {
        cy.task('readFromCsv', { path: 'Data/contractorPayment' }).then(res => {
            var resLength = res.length
            if (resLength >= 1) {
                for (let i = 0; i < resLength; i++) {
                    res.shift()
                }
            }
            invoices.forEach(invoice => {
                res.push({ ["Invoice Id"]: invoice, ["Reference Id"]: '' });
            });
            cy.log(res)
            console.log(res[0]["Invoice Id"])
            cy.task('writeToCsv', { path: 'Data/contractorPayment', rows: res })
        })
    }
    uploadContractorPaymentTemplate() {
        cy.clickBtn('Uploads')
        cy.get('[data-component="Atom: TextAtom"]:contains(Contractor Payment)').get('input[type="file"]').eq(0).invoke("show").wait(100).selectFile(`cypress/Data/contractorPayment.csv`, { force: true }).wait(4000).popup('No')
    }
}
export const paymentsPage = new contractorPayment();