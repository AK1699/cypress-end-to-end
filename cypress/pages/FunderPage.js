import { faker } from '@faker-js/faker'
import { getSupportUsers } from "../utility/api"
import { Now, accountNumber, funderEmail, ibanNumber, phoneNumber, randomAddressLine1, randomBankName, randomBusinessName, randomCity, randomDate, randomFirstName, randomFullName, randomLastName, randomNumber, randomPostCode, randomUrl, shortDate, sortCode, swiftCode, todayDate } from "../utility/functions"
let human_id, company_name, status, accountUser, creditUser, fullName, companyName
class FunderListPage {
    clickCreateFunder() {
        cy.task("readXlsx", { file: "cypress/Data/mockData.xlsx", sheet: "funder" }).then((rows) => {
            cy.writeFile("cypress/fixtures/funder/funder.json", { rows });
            cy.log(JSON.stringify(rows));
        });
        cy.clickBtn('Create New funder')
    }
    clickOnboard() {
        cy.clickBtn('Onboard').popup()
    }
    insertBasicInformation = (brn, email) => {
        fullName = faker.person.fullName()
        companyName = faker.company.name()
        if (brn || email) {
            cy.readFile('cypress/fixtures/funder/funder.json').then(mockData => {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", brn)
                cy.get('.custom-p:contains(Company Registration Number)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid number')
                cy.setInput("company.vat_registration_no", randomNumber(10, 9999999999999));
                cy.setInput("company.office_email", email)
                cy.get('.custom-p:contains(Email Address):eq(0)').find('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should('have.text', 'Please enter a valid Email')
                cy.setInput("tel", randomNumber(1000000000, 9999999999), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setDate("company.trading_commenced_date", randomDate());
                cy.setInput("company.website_url", randomUrl())
                cy.setInput("company.contact_name", fullName);
                cy.setInput("company.contact_email", `shelbyfunder2022+${randomNumber(1, 9999)}@gmail.com`);
                cy.setInput("tel", randomNumber(10000000000, 9999999999), 1);
                cy.setDropDown("business_currencies", mockData.rows[0].currency);
                cy.get('[id="industries"]').type('{backspace}')
                cy.get('[id="industries"]').type('Banking').wait(1200).get('.my-react-select__menu-list:contains(Banking)').click()
                cy.clickBtn("Insert").popup('No').wait(4000)
            })
        } else {
            cy.readFile('cypress/fixtures/funder/funder.json').then(mockData => {
                cy.setInput("company.name", companyName);
                cy.setInput("company.brn", `SC${randomNumber(100000, 999999)}`)
                cy.setInput("company.vat_registration_no", randomNumber(10, 999999999999));
                cy.setInput("company.office_email", `shelbyfunder2022+${randomNumber(1, 9999)}@gmail.com`)
                cy.setInput("tel", randomNumber(1000000000, 9999999999), 0);
                cy.setDate("company.incorporated_date", randomDate());
                cy.setDate("company.trading_commenced_date", randomDate())
                cy.setInput("company.website_url", randomUrl())
                cy.setInput("company.contact_name", fullName)
                cy.setInput("company.contact_email", `shelbyfunder2022+${randomNumber(1, 9999)}@gmail.com`);
                cy.setInput("tel", randomNumber(1000000000, 9999999999), 1)
                cy.setDropDown("business_currencies", mockData.rows[0].currency)
                cy.get('[id="industries"]').type('{backspace}')
                cy.get('[id="industries"]').type('Banking').wait(1200).get('.my-react-select__menu-list:contains(Banking)').click()
                cy.clickBtn("Insert").popup('No').wait(4000);
            })
        }
    }
    vatApplicable = (vat) => {
        vat == 'yes' ? cy.toggle("Yes") : null;
    }
    insertAddress = () => {
        cy.readFile("cypress/fixtures/funder/funder.json").then((mockData) => {
            cy.clickTab("Address");
            cy.clickBtn("Add Address")
            cy.setAddress('Registered Address', randomAddressLine1(), mockData.rows[0].address_line2, mockData.rows[0].address_line3, mockData.rows[0].address_line4, randomCity(), mockData.rows[0].county, mockData.rows[0].country, randomPostCode());
        });
    }
    insertBankAccount = () => {
        cy.clickTab("Bank Accounts");
        cy.clickBtn("Add Bank Account").setBankAcc(randomBankName(), company_name, accountNumber(), sortCode(), swiftCode(), ibanNumber())
        cy.clickBtn('Insert').popup('No')
    }
    selectFundingModel = (fundingModel) => {
        cy.clickTab("Info").wait(1000).dropDown("funding_model", fundingModel).clickBtn("Save").popup("No");
    }
    addFunderUsers = () => {
        cy.clickTab("Users");
        accountUser = funderEmail();
        creditUser = funderEmail()
        cy.clickBtn("Create (or) Map User").setUser(faker.person.firstName(), faker.person.lastName(), accountUser, phoneNumber(), null, 'Account');
        cy.clickBtn("Create (or) Map User").setUser(faker.person.firstName(), faker.person.lastName(), creditUser, phoneNumber(), null, 'Credit');
    }
    addSupportUser = () => {
        getSupportUsers()
        cy.clickTab("Staff").clickBtn("Add Staff")
        cy.dropDown('type', 'Accounting Manager')
        cy.readFile('cypress/fixtures/config/supportUsers.json').then(user => {
            var supportUser = user.data.platform_user[randomNumber(1,2)].name
            cy.setDropDown("user_id", supportUser);
            cy.clickBtn("Insert").popup("No");
        })
    }
    creditUserSetUP(subdomain) {
        cy.newUserAccountSetUp(subdomain, creditUser)
    }
    accountUserSetUp(subdomain) {
        cy.newUserAccountSetUp(subdomain, accountUser)
    }
    funderInformationBanner = (status) => {
        cy.get('[data-component="Organisms: Info"]').within(() => {
            cy.get('.min-w-max .text-skin-muted :eq(0)').then(id => {
                human_id = id.text()
                cy.log(human_id)
            })
            cy.get('.text-3xl').then(name => {
                company_name = name.text()
                cy.log(company_name)
                cy.get('.text-3xl').should('contain', companyName)
            })
            cy.get('[data-component="Atom: Badge"]').then(text => {
                let Status = text.text()
                cy.log(Status)
                cy.get('[data-component="Atom: Badge"]').should('have.text', status)
            })
        })
    }
}
export const funderPage = new FunderListPage();