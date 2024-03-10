import { randomNumber } from "../utility/functions";
import { homePage } from "./HomePage"
class ProviderPage {
    navigateProviderToListPage() {
        homePage.navigateToProviderListPage()
    }
    filterProviderID(providerID) {
        cy.idFilter("human_id", providerID)
    }
    addInternalUsers() {
        var region = Cypress.env("REGION");
        cy.clickTab("Users")
        if (region = "staging") {
            var OA1 = `staging.testing.raise+OA1${randomNumber(1, 999)}@gmail.com`
            var OA2 = `staging.testing.raise+OA2${randomNumber(1, 999)}@gmail.com`
            var CA = `staging.testing.raise+CA${randomNumber(1, 999)}@gmail.com`
            var CM = `staging.testing.raise+CM${randomNumber(1, 999)}@gmail.com`
            var PA1 = `staging.testing.raise+PA1${randomNumber(1, 999)}@gmail.com`
            var PAP = `staging.testing.raise+PAP${randomNumber(1, 999)}@gmail.com`
            var CRA = `staging.testing.raise+CRA${randomNumber(1, 999)}@gmail.com`
            var CRM = `staging.testing.raise+CRM${randomNumber(1, 999)}@gmail.com`
            var COA = `staging.testing.raise+COA${randomNumber(1, 999)}@gmail.com`
            var CL = `staging.testing.raise+CL${randomNumber(1, 999)}@gmail.com`
            var PUM = `staging.testing.raise+PUM${randomNumber(1, 999)}@gmail.com`
            var FM = `staging.testing.raise+FM${randomNumber(1, 999)}@gmail.com`
            cy.clickBtn('Create New User')
            cy.setUser('Onboarding', 'Agent 1', OA1, '12346789',null, 'Onboarding Agent')
            cy.clickBtn('Create New User')
            cy.setUser('Onboarding', 'Agent 2', OA2, '12346789',null, 'Onboarding Agent')
            cy.clickBtn('Create New User')
            cy.setUser('Compliance', 'Approver', CA, '12346789',null, 'Compliance Approver')
            cy.clickBtn('Create New User')
            cy.setUser('Compliance', 'Manager', CM, '12346789',null, 'Compliance Manager')
            cy.clickBtn('Create New User')
            cy.setUser('Payment', 'Assistant', PA1, '12346789',null, 'Payment Assistant')
            cy.clickBtn('Create New User')
            cy.setUser('Payment', 'Approver', PAP, '12346789',null, 'Payment Approver')
            cy.clickBtn('Create New User')
            cy.setUser('Credit Risk', 'Assistant', CRA, '12346789',null, 'Credit Risk Assistant')
            cy.clickBtn('Create New User')
            cy.setUser('Credit Risk', 'Manager', CRM, '12346789',null, 'Credit Risk Manager')
            cy.clickBtn('Create New User')
            cy.setUser('Collections', 'Assistant', COA, '12346789',null, 'Collections Assistant')
            cy.clickBtn('Create New User')
            cy.setUser('Collections', 'Lead', CL, '12346789',null, 'Collections Lead')
            cy.clickBtn('Create New User')
            cy.setUser('Provider', 'User Management', PUM, '12346789',null, 'Provider User Management')
            cy.clickBtn('Create New User')
            cy.setUser('Financial', 'Management', FM, '12346789',null, 'Financial Management')
            var users = [OA1, OA2, CA, CM, PA1, PAP, CRA, CRM, COA, CL, PUM, FM]
            for(let i=0; i<users.length; i++){
                cy.login("PUM")
                cy.newUserAccountSetUp('ops', users[i]) 
            }
        } else if (region = "beta") {
            var OA1 = `beta.testing.raisetech+OA1${randomNumber(1, 999)}@gmail.com`
            var OA2 = `beta.testing.raisetech+OA2${randomNumber(1, 999)}@gmail.com`
            var CA = `beta.testing.raisetech+CA${randomNumber(1, 999)}@gmail.com`
            var CM = `beta.testing.raisetech+CM${randomNumber(1, 999)}@gmail.com`
            var PA1 = `beta.testing.raisetech+PA1${randomNumber(1, 999)}@gmail.com`
            var PAP = `beta.testing.raisetech+PAP${randomNumber(1, 999)}@gmail.com`
            var CRA = `beta.testing.raisetech+CRA${randomNumber(1, 999)}@gmail.com`
            var CRM = `beta.testing.raisetech+CRM${randomNumber(1, 999)}@gmail.com`
            var COA = `beta.testing.raisetech+COA${randomNumber(1, 999)}@gmail.com`
            var CL = `beta.testing.raisetech+CL${randomNumber(1, 999)}@gmail.com`
            var PUM = `beta.testing.raisetech+PUM${randomNumber(1, 999)}@gmail.com`
            var FM = `beta.testing.raisetech+FM${randomNumber(1, 999)}@gmail.com`
            cy.clickBtn('Create New User')
            cy.setUser('Onboarding', 'Agent 1', OA1, '12346789',null, 'Onboarding Agent')
            cy.clickBtn('Create New User')
            cy.setUser('Onboarding', 'Agent 2', OA2, '12346789',null, 'Onboarding Agent')
            cy.clickBtn('Create New User')
            cy.setUser('Compliance', 'Approver', CA, '12346789',null, 'Compliance Approver')
            cy.clickBtn('Create New User')
            cy.setUser('Compliance', 'Manager', CM, '12346789',null, 'Compliance Manager')
            cy.clickBtn('Create New User')
            cy.setUser('Payment', 'Assistant', PA1, '12346789',null, 'Payment Assistant')
            cy.clickBtn('Create New User')
            cy.setUser('Payment', 'Approver', PAP, '12346789',null, 'Payment Approver')
            cy.clickBtn('Create New User')
            cy.setUser('Credit Risk', 'Assistant', CRA, '12346789',null, 'Credit Risk Assistant')
            cy.clickBtn('Create New User')
            cy.setUser('Credit Risk', 'Manager', CRM, '12346789',null, 'Credit Risk Manager')
            cy.clickBtn('Create New User')
            cy.setUser('Collections', 'Assistant', COA, '12346789',null, 'Collections Assistant')
            cy.clickBtn('Create New User')
            cy.setUser('Collections', 'Lead', CL, '12346789',null, 'Collections Lead')
            cy.clickBtn('Create New User')
            cy.setUser('Provider', 'User Management', PUM, '12346789',null, 'Provider User Management')
            cy.clickBtn('Create New User')
            cy.setUser('Financial', 'Management', FM, '12346789',null, 'Financial Management')
           
            var users = [OA1, OA2, CA, CM, PA1, PAP, CRA, CRM, COA, CL, PUM, FM]
            for(let i=0; i<users.length; i++){
                cy.login("PUM")
                cy.newUserAccountSetUp('ops', users[i])
            }
        }
    }

} export const providerPage = new ProviderPage()