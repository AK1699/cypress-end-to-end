import { allowedUserRoles } from "../utility/functions";
import jwt_decode from 'jwt-decode';
var userRole
export { userRole }
const Region = Cypress.env('REGION')
class Login {
    inputUserName = (userType) => {
        // converting the excel user credentials to json and storing in the users.json file.
        cy.task("readXlsx", { file: "cypress/Data/Users.xlsx", sheet: "users" }).then((rows) => {
            const Users = rows.filter((row) => row.region === Region);
            cy.writeFile("cypress/fixtures/users.json", { rows: Users });
            // cy.log(JSON.stringify(Users));
        });
        // cy.clearAllLocalStorage()
        // storing the internal userType as array
        const internalUsers = ["OA1", "OA2", "PA", "PAP", "COA", "CA", "CM", "PUM", "FM", "CRA", "CRM", "CL"]
        if (internalUsers.includes(userType)) {
            cy.intercept('GET', '/auth/login').as('loginPageLoad')
            cy.visit(Cypress.env('OPS_URL')).wait('@loginPageLoad')
            // cy.lighthouse()
        } else {
            cy.intercept('GET', '/auth/login').as('loginPageLoad')
            cy.visit(Cypress.env('APP_URL')).wait('@loginPageLoad')
            // cy.lighthouse()
        }
        cy.readFile("cypress/fixtures/users.json").then((user) => {
            switch (userType) {
                case "OA1":
                    userType = user.rows[0].onboarding_agent_1;
                    break;
                case "OA2":
                    userType = user.rows[0].onboarding_agent_2;
                    break;
                case "CM":
                    userType = user.rows[0].compliance_manager;
                    break;
                case "CA":
                    userType = user.rows[0].compliance_approver;
                    break;
                case "COA":
                    userType = user.rows[0].collection_assistant;
                    break;
                case "CL":
                    userType = user.rows[0].collections_lead;
                    break;
                case "PA":
                    userType = user.rows[0].payment_assistant;
                    break;
                case "PAP":
                    userType = user.rows[0].payment_approver;
                    break;
                case "FM":
                    userType = user.rows[0].financial_management;
                    break;
                case "CRA":
                    userType = user.rows[0].credit_risk_assistant;
                    break;
                case "CRM":
                    userType = user.rows[0].credit_risk_manager;
                    break;
                case "PUM":
                    userType = user.rows[0].provider_user_management
                    break;
                default:
                    userType = userType;
                    break;
            }
            cy.get("#auth_login_email").type(userType);
        })
    }
    inputPassword = (password) => {
        Region !== "prod" ? cy.get("#auth_login_password").type('Platform.1', { log: false }) : null;
        Region == 'prod' ? cy.get("#auth_login_password").type('A_c_h_a@1699', { log: false }) : null;
    }
    clickLoginButton = () => {
        cy.get('[type="submit"]').click()
        cy.intercept('POST', `https://hasura-${Region}-read.raisetech.io/v1/graphql`).as('hasuraApiQuery')
        cy.intercept('POST', '/api/sentinel/metadata').as('metaDataQuery')
        cy.intercept('POST', '/v1/graphql').as('graphqlQuery')
        cy.intercept('GET', '/api/auth/session').as('sessionQuery')
        .wait(['@hasuraApiQuery','@metaDataQuery', '@graphqlQuery', '@sessionQuery'])
    }
    userRoleSelect(userRole) {
    switch (userRole) {
        case "OA1":
            userRole = 'Onboarding Agent (Operations)'
            break;
        case "OA2":
            userRole = 'Onboarding Agent (Operations)'
            break;
        case "CM":
            userRole = 'Compliance Manager (Risk)'
            break;
        case "CA":
            userRole = 'Compliance Approver (Risk)'
            break;
        case "COA":
            userRole = 'Collection Assistant (Collections)'
            break;
        case "CL":
            userRole = 'Collection Lead (Collections)'
            break;
        case "PA":
            userRole = 'Payment Assistant (Finance)'
            break;
        case "PAP":
            userRole = 'Payment Approver (Finance)'
            break;
        case "FM":
            userRole = 'Financial Management (Finance)'
            break;
        case "CRA":
            userRole = 'Credit Risk Assistant (Risk)'
            break;
        case "CRM":
            userRole = 'Credit Risk Manager (Risk)'
            break;
        case "PUM":
            userRole = 'User Management (Management)'
            break;
        default:
            userRole = userRole;
            break;
    }
    cy.get(`[class="break-normal break-words"]:eq(0)`).then(role => {
        var userType = role.text()
        cy.log(userType)
        if (userType !== userRole) {
            cy.get('[class="hidden xl:block"]').click()
            cy.get('.css-11unzgr .break-normal').contains(userRole).click()
        }
    })

}
}
export const loginPage = new Login();

class AccountSetUp {
    inputUserName(email) {
        cy.get('[id="auth_login_email"]').type(email)
    }
    inputOneTimePassword(otp_code) {
        cy.get('[id="auth_login_password"]').type(otp_code)
    }
    clickLogin() {
        cy.clickBtn('Login')
    }
    inputNewPassword() {
        cy.get('[id="auth_login_new_password"]').type('Platform.1')
    }
    inputConfirmPassword() {
        cy.get('[id="auth_login_confirm_new_password"]').type('Platform.1')
    }
    clickResetPasswordButton() {
        cy.get('button:contains(Reset Password)').click()
    }
    acceptGDPR() {
        cy.get('[class="pl-5"]').should('contain', ' I Agree to the Terms and Conditions')
        cy.get('[class="pl-5"] [type="checkbox"]').check().clickBtn('Submit')
    }
}
export const accountSetUpPage = new AccountSetUp();

class PasswordReset {
    clickHereButton = () => {
        cy.get('button:contains(Here)').click()
    }
    inputEmailAddress = (email) => {
        cy.get('[id="auth_forgot_email"]').type(email)
    }
    clickRequestCodeButton = () => {
        cy.get('[id="auth_forgot_send_code"]').click()
    }
    inputVerificationCode = (code) => {
        cy.get('[id="auth_forgot_code"]').type(code)
    }
    inputNewPassword = (password) => {
        cy.get('[id="auth_forgot_password"]').type(password)
    }
    inputConfirmPassword = (password) => {
        cy.get('[id="auth_forgot_confirm_password"]').type(password)
    }
    clickPasswordResetButton = () => {
        cy.get('[id="auth_forgot_reset_password"]').click()
    }
}
export const passwordResetPage = new PasswordReset();