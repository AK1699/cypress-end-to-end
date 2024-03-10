import _ from "lodash";
import { randomNumber, todayDate, userToJson } from "../utility/functions";
import jwt_decode from "jwt-decode";
import { accountSetUpPage, loginPage } from "../pages/LoginPage";
import { extract_otp } from "../utility/api";
import { faker } from "@faker-js/faker";
const Region = Cypress.env('REGION');

//using this request will send to the back-end and get response
Cypress.Commands.add("internalApiRequest", (apiBody, data) => {
  cy.log(Cypress.env('API_URL'))
  cy.window().then((win) => {
    var tokenValue = win.sessionStorage.getItem('x-hasura-token')
    cy.log(tokenValue)
    cy.request({
      url: Cypress.env('API_URL'),
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenValue}`
      },
      body: {
        query: apiBody,
        // variables: data,
      }
    });
  });
})
//This command for filtering human id and navigate to that page
Cypress.Commands.add("idFilter", (filter, filterValue) => {
  cy.get('button:contains(Filter)').click().then(() => {
    cy.get(`.bg-skin-primary-inverted [id="${filter}"]`).type(filterValue).wait(2000).then(() => {
      cy.get(`.css-11unzgr :contains(${filterValue}):eq(2)`)
        .click()
        .get('button:contains(Search)').click().wait(3000)
        .get(`tbody tr:contains(${filterValue}) .break-normal :eq(0)`)
        .click()
    })
  });
});
//This command for filtering and result will be display in list page
Cypress.Commands.add("listFilter", (filter, filterValue) => {
  cy.get("#" + filter)
    .type(filterValue)
    .wait(2000)
    .get('[class=" italic break-normal break-words text-sm"]')
    .contains(filterValue)
    .click()
    .get('[class="flex flex-row custom-gap items-center justify-center "]')
    .click()
    .wait(2500);
});
//This command for mutiple filter at same time in fee transaction and result will be display in list page
Cypress.Commands.add(
  "feeListFilter",
  (filter, filterValue, filter1, filterValue1) => {
    cy.get('[id="filter"]').click();
    cy.get("#" + filter)
      .type(filterValue)
      .wait(1500)
      .get('[class="break-normal break-words"]')
      .contains(filterValue)
      .click();
    cy.get("#" + filter1)
      .type(filterValue1)
      .wait(1500)
      .get('[class="break-normal break-words"]')
      .contains(filterValue1)
      .click()
      .get('[class="flex flex-row custom-gap items-center justify-center "]')
      .click()
      .wait(2500);
  }
);
//This command for filtering in timesheet page and result will be displayed in list page -- Note this is only for external user
Cypress.Commands.add(
  "tmsListExternalFilter",
  (filter, filterValue, filter1, filterValue1) => {
    cy.get('[id="filter"]').click();
    cy.get("#" + filter)
      .type(filterValue)
      .wait(1500)
      .get('[class="break-normal break-words"]')
      .contains(filterValue)
      .click();
    cy.get('[class="flex flex-row custom-gap items-center justify-center "]')
      .click()
      .wait(2500);
  }
);
//This command for single filter in fee transaction and result will be displayed in list page
Cypress.Commands.add("feeFilter", (filter, filterValue) => {
  cy.get('[id="filter"]').click();
  cy.get("#" + filter)
    .type(filterValue)
    .wait(1500)
    .get('[class="break-normal break-words"]')
    .contains(filterValue)
    .click()
    .get('[class="flex flex-row custom-gap items-center justify-center "]')
    .click()
    .wait(2500);
});
//This command for remove already filter value,add new filter value and result will be displayed in list page
Cypress.Commands.add("changeFilter", (filter, filterValue) => {
  cy.get("#" + filter)
    .type("{backspace}")
    .type(filterValue)
    .wait(2000)
    .get('[class="break-normal break-words"]')
    .contains(filterValue)
    .click()
    .get('[class="flex flex-row custom-gap items-center justify-center "]')
    .click()
    .wait(2500);
});
//This command for filtering placement human id because placement human id contains job title also
Cypress.Commands.add(
  "placementIdFilter",
  (filter, filterValue, filterValue1) => {
    cy.get('[id="filter"]')
      .click()
      .then(() => {
        cy.get("#" + filter)
          .type(filterValue)
          .wait(2000)
          .get('[class=" italic break-normal break-words text-sm"]')
          .contains(filterValue1)
          .click()
          .get(
            '[class="flex flex-row custom-gap items-center justify-center "]'
          )
          .click()
          .wait(2500)
          .get('[class="text-skin-url dark:text-skin-url-inverted "]')
          .eq(0)
          .click()
          .wait(3000);
      });
  }
);
//This command for filtering names like agency name, client name, contractor name
Cypress.Commands.add("dynamicNameFilter", (filter, filterValue) => {
  cy.get('[id="filter"]')
    .click()
    .then(() => {
      cy.get("#" + filter)
        .type(filterValue)
        .wait(1500)
        // .type("{enter}")
        .get('[class="break-normal break-words"]')
        .contains(filterValue)
        .click()
        .get('[class="flex flex-row custom-gap items-center justify-center "]')
        .click()
        .wait(2500)
        .get('[class="text-skin-url dark:text-skin-url-inverted "]')
        .eq(0)
        .click()
        .wait(3000);
    });
});
//This command for reference id (human id) filter in external user login and navigate to that page
Cypress.Commands.add("refFilter", (filter, filterValue) => {
  cy.get('[id="filter"]')
    .click()
    .then(() => {
      cy.get("#" + filter)
        .type(filterValue)
        .wait(1500)
        // .type("{enter}")
        .get('[class="break-normal break-words"]')
        .contains(filterValue)
        .click()
        .get('[class="flex flex-row custom-gap items-center justify-center "]')
        .click()
        .wait(2500)
        .get('[class=" text-skin-primary underline "]')
        .eq(0)
        .click()
        .wait(3000);
    });
});
//This command for multiple filter at same time and result will be displayed in list page
Cypress.Commands.add(
  "multiFilter",
  (filter, filterValue, filter1, filterValue1) => {
    cy.get('[id="filter"]')
      .click()
      .get('[data-component="Organisms: Form: Filter"]')
      .within(() => {
        cy.get("#" + filter)
          .type(filterValue)
          .wait(2000)
          .get('[class="break-normal break-words"]')
          .contains(filterValue)
          .click()
          .get("#" + filter1)
          .type(filterValue1)
          .get('[class="break-normal break-words"]')
          .contains(filterValue1)
          .click();
      });
    cy.get('[class="flex flex-row custom-gap items-center justify-center "]')
      .click()
      .wait(2500);
  }
);
//This command for none react filter and navigate to that page
Cypress.Commands.add("noneReactFilter", (filter, filterValue) => {
  cy.get('[id="filter"]')
    .click()
    .then(() => {
      cy.get("#" + filter)
        .type(filterValue)
        .get('[class="flex flex-row custom-gap items-center justify-center "]')
        .click()
        .wait(1500)
        .get('[class="text-skin-url dark:text-skin-url-inverted "]')
        .eq(0)
        .click()
        .wait(1500);
    });
});
// Navigation bar
Cypress.Commands.add('navigationBar', (navbar, submenu) => {
  cy.url().then(url => {
    if (url.includes('ops')) {
      if (navbar && submenu) {
        cy.get(`[class="group self-center"]:contains(${navbar})`).wait(500).realHover()
        if (submenu == 'Timesheets') {
          cy.get(`.text-primary-inverted:contains(${submenu}):eq(1)`).click()
        } else {
          cy.get(`.text-primary-inverted:contains(${submenu}):eq(0)`).click()
        }
        cy.get('body').realHover()
      } else if (navbar == 'Dashboard') {
        cy.get(`[id="${navbar}"]`).click()
      } else {
        cy.log('Invalid navigation bar!')
      }
    } else if (url.includes('app')) {
      if (navbar && submenu) {
        cy.get(`[id="${navbar}"]:eq(0)`).click().find(`[id="${submenu}"]:contains(${submenu}):eq(0)`).click()
      } else {
        navbar !== 'Dashboard' ? cy.get('[id="sidebar"]').wait(1000).realHover().get(`[id="${navbar}"] .Sidebar_link__tXeYw > .Sidebar_linkText__4nvD6:contains(${navbar}):eq(0)`).click().wait(300) : cy.get(`.Sidebar_link__tXeYw:contains(${navbar}):eq(0)`).click().wait(300)
      }
    }
    else if (url.includes('localhost:3000')) {
      if (navbar && submenu) {
        cy.get(`[class="group self-center"]:contains(${navbar})`).wait(500).realHover()
        cy.get(`.text-primary-inverted:contains(${submenu}):eq(0)`).click()
        cy.get('body').realHover()
      } else if (navbar == 'Dashboard') {
        cy.get(`[id="${navbar}"]`).click()
      } else {
        cy.log('Invalid navigation bar!')
      }
    } else {
      cy.log('Invalid domain!')
    }
  })
})
//This command for logout the application
Cypress.Commands.add("logout", () => {
  cy.clearCookies()
  cy.clearAllSessionStorage()
  cy.clickBtn("Logout");
  cy.intercept('GET', '/api/auth/logout').as('logoutQuery')
  cy.intercept('POST', '/api/sentinel/logoutUser').as('logoutUserQuery')
  cy.wait('@logoutQuery').wait('@logoutUserQuery')
});
//This command for insert the kyc details and uploading documents
Cypress.Commands.add(
  "setKyc",
  (documentName, kyc_from, kyc_to, attachmentName, companyName) => {
    documentName == "Credit Safe" ||
      documentName == "Companies House" ||
      documentName == "VAT" ||
      documentName == "PAYE Statement" ||
      documentName == "National Insurance" ||
      documentName == "Insurance" ||
      documentName == "Photo ID" ||
      documentName == "Proof of Address" ||
      documentName == "Proof of address" ||
      documentName == "Bank Statement" ||
      documentName == "Proof Of Address" ||
      documentName == "Professional Passport" ||
      documentName == "FCSA Registered Document" ||
      documentName == "Companies House Screenshot" ||
      documentName == "Credit Safe UMB" ||
      documentName == "Signed Copy" ||
      documentName == "Signed copy" ||
      documentName == "Right To Work" ||
      documentName == "Proof of ID" ||
      documentName == "Proof of Tax Identification Number" ||
      documentName == "Financial Statement"
      ? cy
        .get(`form:contains(${documentName})`)
        .within(() => {
          cy.setDate("valid_from", kyc_from);
          cy.setDate("valid_to", kyc_to);
          cy.uploadFile(attachmentName);
          cy.clickBtn("Insert")
        })
        .popup("No")
        .wait(1000)
      : null;
    documentName == "Credit safe report"
      ? cy
        .get(`form:contains(${documentName})`)
        .within(() => {
          cy.setDate("valid_from", kyc_from);
          cy.setDate("valid_to", kyc_to);
          cy.uploadFile(attachmentName);
          cy.setInput("details.comment", companyName);
        })
        .clickBtn("Insert")
        .popup("No")
        .wait(1000)
      : null;
    documentName == "LinkedIn"
      ? cy
        .get(`form:contains(${documentName})`)
        .within(() => {
          cy.toggle("Kyc").uploadFile(attachmentName).wait(1000);
        })
        .clickBtn("Insert")
        .popup("No")
        .wait(1000)
      : null;
    documentName == "Proof of submission" || documentName == "Proof of approval"
      ? cy
        .get(`form:contains(${documentName})`)
        .uploadFile(attachmentName)
        .clickBtn("Insert")
        .popup("No")
        .wait(1000)
      : null;
    documentName == "Website domain" || documentName == "Domain"
      ? cy
        .get(
          '[class="ButtonNew_content__SvhcS ButtonNew_icon-align-left__FbOJg flex flex-row gap-2 justify-center items-center"]'
        )
        .contains("Insert")
        .eq(0)
        .click()
        .get(`form:contains(Domain Registered)`)
        .within(() => {
          cy.toggle("Kyc");
          cy.setDate("details.domain_registered_date", kyc_from);
          cy.setInput("details.domain_registered_name", companyName);
          cy.uploadFile(attachmentName);
        })
        .clickBtn("Insert")
        .popup("No")
        .wait(1000)
      : null;

    documentName == "Charges and Negative information" ||
      documentName == "Website Check"
      ? cy
        .get(
          '[class="ButtonNew_content__SvhcS ButtonNew_icon-align-left__FbOJg flex flex-row gap-2 justify-center items-center"]'
        )
        .contains("Insert")
        .click()
        .get(`form:contains(${documentName})`)
        .within(() => {
          cy.toggle("Kyc");
          cy.uploadFile(attachmentName);
        })
        .clickBtn("Insert")
        .popup("No")
        .wait(1000)
      : null;
    documentName == "Insurance Document"
      ? cy
        .get(`form:contains(${documentName})`)
        .within(() => {
          cy.uploadFile(attachmentName);
        })
        .clickBtn("Insert")
        .popup("No")
        .wait(1000)
      : null;
  }
);
//This command for insert the address details
Cypress.Commands.add(
  "setAddress",
  (reference, line1, line2, line3, line4, city, state, country, zipCode) => {
    cy.setInput("name", reference);
    cy.setInput("line_1", line1);
    line2 !== null ? cy.setInput("line_2", line2) : null;
    line3 !== null ? cy.setInput("line_3", line3) : null;
    line4 !== null ? cy.setInput("line_4", line4) : null;
    cy.setInput("city", city);
    state !== null ? cy.setInput("state", state) : null;
    country !== "United Kingdom" && country !== null
      ? cy.setDropDown("country_id", country)
      : null;
    cy.setInput("zipcode", zipCode).clickBtn("Insert").popup('No');
  }
);
//This command for insert the bank account details
Cypress.Commands.add("setBankAcc", (bankName, holderName, accountNumber, sortCode, swiftCode, iban, currency) => {
  cy.setInput("bank_name", bankName);
  cy.setInput("account_holder_name", holderName);
  accountNumber !== null
    ? cy.setInput("account_number", accountNumber)
    : null;
  sortCode !== null ? cy.setInput("sort_code", sortCode) : null;
  swiftCode !== null ? cy.setInput("swift_code", swiftCode) : null;
  iban !== null ? cy.setInput("iban", iban) : null;
}
);
//This command for insert user details (agency and client users)
Cypress.Commands.add(
  "setUser",
  (fName, lName, user_email, phone_number1, phone_number2, user_role) => {
    cy.get('[data-component="Organisms: Form: Dynamic"]').first()
      .then(() => {
        cy.setDropDown("user.email", user_email)
          .setInput("user.first_name", fName)
          .setInput("user.last_name", lName)
          .setInput("tel", phone_number1, 0)
          .dropDown("type", user_role)
        cy.get('[id="preferences.email"]').find('button').as('emailToggle')
        cy.get('@emailToggle').then(btn => {
          if (btn.attr('aria-checked') == 'false') {
            cy.get('@emailToggle').click()
          } else {
            cy.get('@emailToggle').should('have.attr', 'aria-checked', 'true')
          }
        })
        phone_number2 !== null ? cy.setInput("tel", phone_number2, 1) : null;
      });
    cy.clickBtn("Insert").popup("No");
  }
);
//This command for insert service charge based on input value
Cypress.Commands.add("serviceCharge", (funding_model) => {
  var service_type = ["Expenses", "Temporary Placement", "Permanent Placement"];
  var funding_type = ["Funded", "Paid When Paid"];
  var fee_type = ["Funder Fee", "Platform Fee"];
  var type = ["Percentage"];
  var directCombinations = [];
  var indirectCombinations = [];
  if (funding_model == "Direct") {
    service_type.forEach((service_type) => {
      funding_type.forEach((funding_type) => {
        fee_type.forEach((fee_type) => {
          type.forEach((type) => {
            if (!(funding_type === "Paid When Paid" && fee_type === "Funder Fee")) {
              var funder_fee = (Math.random() * 4 + 1).toFixed(3)
              var platform_fee = Math.random().toFixed(3)
              directCombinations.push({
                serviceType: service_type,
                fundingType: funding_type,
                feeType: fee_type,
                type: type,
                funderFee: funder_fee,
                platformFee: platform_fee
              });
            }
          });
        });
      });
    });
    cy.log(directCombinations.length);
    cy.log(directCombinations);
    for (let i = 0; i < directCombinations.length; i++) {
      cy.clickBtn("Insert").then(() => {
        cy.get('[data-component="Organisms: Form: Dynamic"]').eq(0).then(() => {
          cy.dropDown("service_type", directCombinations[i].serviceType).wait(1500);
          cy.dropDown("funding_type", directCombinations[i].fundingType);
          directCombinations[i].fundingType == "Funded" ? cy.dropDown("fee_type", directCombinations[i].feeType) : cy.clickOptions("Percentage").setInput('percent', directCombinations[i].platformFee).setDate('effective_from', todayDate())
          directCombinations[i].feeType == "Funder Fee" ? cy.clickOptions("Percentage").setInput('percent', directCombinations[i].funderFee).setDate("effective_from", todayDate()) : null
          directCombinations[i].fundingType == "Funded" && directCombinations[i].feeType == "Platform Fee" ? cy.clickOptions('Percentage').setInput('percent', directCombinations[i].platformFee).setDate('effective_from', todayDate()) : null
        });
        cy.clickBtn("Insert");
      })
        .popup('No')
        .wait(600)
    }
  } else {
    service_type.forEach((service_type) => {
      funding_type.forEach((funding_type) => {
        type.forEach((type) => {
          var service_charge = (Math.random() * 4 + 1).toFixed(2)
          indirectCombinations.push({
            serviceType: service_type,
            fundingType: funding_type,
            type: type,
            serviceCharge: service_charge
          });
        });
      });
    });
    cy.log(indirectCombinations)
    cy.log(indirectCombinations.length)
    for (let i = 0; i < indirectCombinations.length; i++) {
      cy.clickBtn("Insert").then(() => {
        cy.get('[data-component="Organisms: Form: Dynamic"]')
          .eq(0)
          .then(() => {
            cy.dropDown("service_type", indirectCombinations[i].serviceType).wait(1500);
            cy.dropDown("funding_type", indirectCombinations[i].fundingType);
            cy.clickOptions("Percentage")
            cy.setInput("percent", indirectCombinations[i].serviceCharge).setDate("effective_from", todayDate())
          });
        cy.clickBtn("Insert")
      }).popup('No').wait(600)
    }
  }
}
);
//This command for click button based on button name
Cypress.Commands.add("clickBtn", (btn, index) => {
  if (btn == "Logout") {
    cy.get('.ProfileIcon_icon__NTWAp')
      .click()
      .get('button')
      .contains(btn)
      .click()
  } else if (
    btn == "Reject" ||
    btn == "Reject Prevetting" ||
    btn == "Reject Compliance" ||
    btn == "Reject onboarding" ||
    btn == "Reject Credit" ||
    btn == "Reject Credit Limit" ||
    btn == "Reject onboarding" ||
    btn == "Reject Review" ||
    btn == "Reject Onboard" ||
    btn == "No Resubmission"
  ) {
    cy.get(`button:contains(${btn})`).then(button => {
      cy.log(button.length)
    if (button.length > 1) {
      cy.get(`button:contains(${btn})`).eq(1).click().wait(1000)
    } else {
      cy.get(`button:contains(${btn})`).eq(0).click().wait(1000)
    }
  })
    cy.get('[class="swal2-textarea"]').as('comments').should('be.visible')
    cy.get('@comments').type("Rejected by Cypress automation");
  } else if (btn == "Revert Timesheet") {
    cy.get(`button:contains(${btn})`)
      .click()
      .wait(100)
      .get('[class="swal2-textarea"]').as('comments').should('be.visible')
    cy.get('@comments').type("Revert Timesheet by Cypress automation");
  } else if (btn == "Save & Next") {
    cy.get("button")
    .find(
      '[class="ButtonNew_content__SvhcS ButtonNew_icon-align-right__lq3xZ flex flex-row gap-2 justify-center items-center"]'
    )
    .contains(btn)
    .click()
    // .wait(500)
    // .get("#swal2-title")
    // .should("have.text", "Action Success")
  } else {
    cy.get(`button:contains(${btn})`).eq(0).click()
  }
});
//This command for select value in drop down
Cypress.Commands.add("setDropDown", (dropDownName, dropDownValue) => {
  cy.get(`[id="${dropDownName}"]`).first().then(text => {
    var place_holder = text.text()
    cy.url().then((url) => {
      if (url.includes('ops')) {
        if (place_holder == 'Select...') {
          cy.get(`[id="${dropDownName}"]`).eq(0).type(dropDownValue)
          cy.get('.my-react-select__menu .break-normal').contains(dropDownValue).click()
          cy.log(dropDownValue)
        } else {
          return null;
        }
      } else if (url.includes('app')) {
        if (place_holder == 'Select...') {
          cy.get(`[id="${dropDownName}"]`).eq(0).type(dropDownValue)
          cy.get('.css-26l3qy-menu .break-normal').contains(dropDownValue).click()
          cy.log(dropDownValue)
        } else {
          return null;
        }
      }
    })
  });
});
//This command for click tab based on tab name
Cypress.Commands.add("clickTab", (tabName) => {
  cy.get(`.relative.rounded-full.px-3.p-1.border:contains(${tabName})`).then((tab) => {
    cy.log(tab.length)
    cy.get(`.relative.rounded-full.px-3.p-1.border:contains(${tabName}):eq(0)`).click({ force: true })
    // if (tab.length > 1) {
    //   cy.get(`.relative.rounded-full.px-3.p-1.border:contains(${tabName})`).first().eq(1).click().wait(1000)
    // } else {
    //   cy.get(`.relative.rounded-full.px-3.p-1.border:contains(${tabName})`).first().eq(0).click().wait(1000)
    // }
  })
});
//This command for choose user in drop down
Cypress.Commands.add("selectUser", (user, userName) => {
  switch (user) {
    case "AC":
      user = "agency_consultant";
      break;
    case "HM":
      user = "hiring_manager";
      break;
    case "TMS":
      user = "timesheet_approver";
      break;
    case "IC":
      user = "invoice_contact";
      break;
    default:
      user = user;
      break;
  }
  user == "agency_consultant"
    ? cy
      .get("#" + user + "_user_id")
      .click()
      .type(userName)
      .wait(100)
      .then(() => {
        cy.get('[class=" italic break-normal break-words text-skin-muted"]')
          .contains(userName)
          .click();
      })
    : null;
  user == "hiring_manager" ||
    user == "timesheet_approver" ||
    user == "invoice_contact"
    ? cy
      .get("#" + user + "_user_ids")
      .click()
      .type(userName)
      .wait(100)
      .then(() => {
        cy.get('[class=" italic break-normal break-words text-skin-muted"]')
          .contains(userName)
          .click();
      })
    : null;
  user == "placement_details.existing_contacts.timesheet_approver_user_ids" ||
    user == "placement_details.existing_contacts.invoice_contact_user_ids" ||
    user == "placement_details.existing_contacts.hiring_manager_user_ids" ||
    user == "agency_user_id" ||
    user == "client_user_ids"
    ? cy
      .get(`[id="${user}"]`)
      .click()
      .type(userName)
      .wait(100)
      .then(() => {
        cy.get('[class=" italic break-normal break-words text-skin-muted"]')
          .contains(userName)
          .click();
      })
    : null;
});
//This command for enter value in input field
Cypress.Commands.add("setInput", (fieldName, fieldValue, index) => {
  fieldName == "tel"
    ? cy.get(`[type="${fieldName}"]`).eq(index).type(fieldValue)
    : fieldName == "amount"
      ? cy.get(`[id="${fieldName}"]`).first().type("{home}").type(fieldValue)
      : cy.get(`[id="${fieldName}"]`).first().type("{home}", { force: true }).type(fieldValue)
});
//This command for set date in date field
Cypress.Commands.add("setDate", (dateType, dateValue) => {
  cy.get(`[id="${dateType}"]`).first().type(dateValue).wait(1500).type("{enter}")
});
//This command for click option in mutiple option field
Cypress.Commands.add("clickOptions", (optionName) => {
  cy.get(`[class="break-normal break-words"]:contains(${optionName}):eq(0)`).click()
});
//This command for enable and disable toggle fields
Cypress.Commands.add("toggle", (togglePlace) => {
  togglePlace == "Kyc"
    ? cy.get('[id="details.done"]').click()
    : togglePlace == "Self"
      ? cy.get('[id="type"]').click()
        .clickBtn("Insert").popup('No')
      : cy.get('[id="type"]').click()
        .clickBtn("Save").popup('No')
});
//This command for upload files
Cypress.Commands.add("uploadFile", (fileName) => {
  cy.get('[class="pl-2 "]').then(() => {
    cy.get('input[type="file"]')
      .eq(0)
      .invoke("show")
      .wait(100)
      .selectFile(`./cypress/fixtures/${fileName}`, { force: true })
      .wait(4000)
  });
});
//This command for click ok in are you sure popup and capture action message
Cypress.Commands.add("popup", (value) => {
  value == "Created"
    ? cy
      .get('[class="swal2-actions"]')
      .contains("Yes")
      .click()
      .wait(1000)
      .get("#swal2-title")
      .should("have.text", "Created !")
      .wait(800)
    : value == "No"
      ? cy.get('[class="swal2-actions"]').contains("Yes").click().wait(4000)
      : cy
        .get('[class="swal2-actions"]')
        .contains("Yes")
        .click()
        .wait(1000)
        .get("#swal2-title")
        .should("have.text", "Action Successful")
        .wait(800);
});
//This command for to validate displaying field value correct or wrong
Cypress.Commands.add("fieldCheck", (id, value, index, n) => {
  switch (id) {
    case "placement_id":
      n = 0;
      break;
    case "agency_name":
      n = 1;
      break;
    case "client":
      n = 1;
      break;
    case "client_name":
      n = 2;
      break;
    case "contractor_name":
      n = 3;
      break;
    default:
      n = 0;
      break;
  }
  switch (value) {
    case "daily":
      value = "Days";
      break;
    case "hourly":
      value = "Hours";
      break;
    default:
      break;
  }
  id == "placement_id" ||
    id == "agency_name" ||
    id == "client_name" ||
    id == "client" ||
    id == "contractor_name"
    ? cy.get('[class=" underline "]').eq(n).should("have.text", value)
    : id == "date" ||
      id == "day" ||
      id == "contract_rate_id" ||
      id == "unit_type" ||
      id == "daily" ||
      id == "hourly"
      ? cy.get(`[id="${id}"]`).eq(index).should("have.text", value)
      : id == "payment_company"
        ? cy.get('[id="payment_id"]').eq(n).should("have.text", value)
        : cy.get(`[id="${id}"]`).eq(n).should("have.text", value);
});
//This command for to validate displaying field value correct or wrong --only for external
Cypress.Commands.add("fieldCheckExternal", (id, value) => {
  switch (value) {
    case "daily":
      value = "Days";
      break;
    case "hourly":
      value = "Hours";
      break;
    default:
      break;
  }
  id == "placement_id"
    ? cy
      .get(`[class=" text-skin-primary underline "]`)
      .eq(0)
      .should("have.text", value)
    : cy.get(`[id="${id}"]`).should("have.text", value);
});
//This command for enter field value
Cypress.Commands.add("fieldInput", (id, value, index) => {
  id == "hourly"
    ? cy.get(`[id="${id}"]`).eq(index).type(value)
    : cy
      .get(`[id="${id}"]`)
      .eq(index)
      .type(value)
      .type("{shift}")
      .type("{enter}");
});
//This command for xlsx parse
Cypress.Commands.add("parseXlsx", (inputFile) => {
  return cy.task("parseXlsx", { filePath: inputFile });
});
//This command for add new contacts in temp placement request
Cypress.Commands.add("addNewContact", (email, role, index) => {
  var firstName = faker.person.firstName()
  var lastName = faker.person.lastName()
  cy.get('[class="w-full flex flex-row justify-between border-b py-2"]:contains(New Contacts)')
    .within(() => {
      cy.get('[data-component="Atom: ButtonNew"]').contains("Add New").click();
    });
  cy.isAsterisk("First Name", 0).setInput(
    `placement_details.new_contacts.${index}.first_name`,
    firstName
  );
  cy.isAsterisk("Last Name", 0).setInput(
    `placement_details.new_contacts.${index}.last_name`,
    lastName
  );
  cy.isAsterisk("Email", 0).setInput(
    `placement_details.new_contacts.${index}.email`,
    email
  );
  role == "Hiring Manager" ||
    role == "Timesheet Approver" ||
    role == "Invoice Contact"
    ? cy
      .isAsterisk("Role", 0)
      .selectRole(`placement_details.new_contacts.${index}.type`, role)
    : role == "Hiring Manager,Timesheet Approver" ||
      role == "Timesheet Approver,Hiring Manager"
      ? cy
        .isAsterisk("Role", 0)
        .selectRole(
          `placement_details.new_contacts.${index}.type`,
          "Hiring Manager"
        )
        .selectRole(
          `placement_details.new_contacts.${index}.type`,
          "Timesheet Approve"
        )
      : role == "Invoice Contact,Timesheet Approver" ||
        role == "Timesheet Approver,Invoice Contact"
        ? cy
          .selectRole(
            `placement_details.new_contacts.${index}.type`,
            "Invoice Contact"
          )
          .selectRole(
            `placement_details.new_contacts.${index}.type`,
            "Timesheet Approver"
          )
        : role == "Invoice Contact,Hiring Managaer" ||
          role == "Hiring Manager,Invoice Contact"
          ? cy
            .isAsterisk("Role", 0)
            .selectRole(
              `placement_details.new_contacts.${index}.type`,
              "Invoice Contact"
            )
            .selectRole(
              `placement_details.new_contacts.${index}.type`,
              "Hiring Manager"
            )
          : cy
            .isAsterisk("Role", 0)
            .selectRole(
              `placement_details.new_contacts.${index}.type`,
              "Invoice Contact"
            )
            .selectRole(
              `placement_details.new_contacts.${index}.type`,
              "Hiring Manager"
            )
            .selectRole(
              `placement_details.new_contacts.${index}.type`,
              "Timesheet Approver"
            );
});
//This command for add new contacts in perm placement request
Cypress.Commands.add(
  "addNewContactPerm",
  (fName, lName, email, role, index) => {
    cy.get('[class="w-full flex flex-row justify-between border-b py-2"]')
      .eq(0)
      .within(() => {
        cy.get('[data-component="Atom: ButtonNew"]')
          .contains("Add New")
          .click();
      });
    cy.isAsterisk("First Name", 0).setInput(
      `placement_details.new_contacts.${index}.first_name`,
      fName
    );
    cy.isAsterisk("Last Name", 0).setInput(
      `placement_details.new_contacts.${index}.last_name`,
      lName
    );
    cy.isAsterisk("E-mail Address", 0).setInput(
      `placement_details.new_contacts.${index}.email`,
      email + "+" + randomNumber(1, 100000) + "@gmail.com"
    );
    role == "Hiring Manager" || role == "Invoice Contact"
      ? cy
        .isAsterisk("Role", 0)
        .selectRole(`placement_details.new_contacts.${index}.type`, role)
      : cy
        .isAsterisk("Role", 0)
        .selectRole(
          `placement_details.new_contacts.${index}.type`,
          "Hiring Manager"
        )
        .selectRole(
          `placement_details.new_contacts.${index}.type`,
          "Invoice Contact"
        );
  }
);
//This command for select user role in self service
Cypress.Commands.add("selectRole", (dropDownName, dropDownValue) => {
  cy.get(`[id="${dropDownName}"]`)
    .click(15, 10)
    .then(() => {
      cy.get('[class="break-normal break-words"]')
        .contains(dropDownValue)
        .click();
    });
});
//This command for checking field should contains asteric symbole
Cypress.Commands.add("isAsterisk", (lablelName, index) => {
  cy.get(`[data-component="Atom: Label"]:contains(${lablelName})`)
    .eq(index)
    .should("contain", "*");
});
//This command for checking field should not contain asteric symbole and mandatory word
Cypress.Commands.add("isNonMandatory", (lablelName, widget) => {
  widget == 1 / 4
    ? cy
      .get(
        `[class="custom-p flex flex-col gap-1 justify-start w-1/4"]:contains(${lablelName})`
      )
      .eq(0)
      .within(() => {
        cy.get(
          `[data-component="Atom: Label"]:contains(${lablelName})`
        ).should("not.contain", "*");
        // cy.get('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should("have.text", "");
      })
    : widget == 1 / 3
      ? cy
        .get(
          `[class="custom-p flex flex-col gap-1 justify-start w-1/3"]:contains(${lablelName})`
        )
        .eq(0)
        .within(() => {
          cy.get(
            `[data-component="Atom: Label"]:contains(${lablelName})`
          ).should("not.contain", "*");
          // cy.get('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should("have.text", "");
        })
      : cy
        .get(
          `[class="custom-p flex flex-col gap-1 justify-start w-1/2"]:contains(${lablelName})`
        )
        .eq(0)
        .within(() => {
          cy.get(
            `[data-component="Atom: Label"]:contains(${lablelName})`
          ).should("not.contain", "*");
          // cy.get('[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]').should("have.text", "");
        });
});
//This command for checking field should contain asteric symbole and mandatory word
Cypress.Commands.add("isMandatory", (lablelName, widget) => {
  widget == 1 / 4
    ? cy
      .get(
        `[class="custom-p flex flex-col gap-1 justify-start w-1/4"]:contains(${lablelName})`
      )
      .eq(0)
      .within(() => {
        cy.get(
          `[data-component="Atom: Label"]:contains(${lablelName})`
        ).should("contain", "*");
        cy.get(
          '[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]'
        ).should("have.text", "Mandatory");
      })
    : widget == 1 / 3
      ? cy
        .get(
          `[class="custom-p flex flex-col gap-1 justify-start w-1/3"]:contains(${lablelName})`
        )
        .eq(0)
        .within(() => {
          cy.get(
            `[data-component="Atom: Label"]:contains(${lablelName})`
          ).should("contain", "*");
          cy.get(
            '[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]'
          ).should("have.text", "Mandatory");
        })
      : cy
        .get(
          `[class="custom-p flex flex-col gap-1 justify-start w-1/2"]:contains(${lablelName})`
        )
        .eq(0)
        .within(() => {
          cy.get(
            `[data-component="Atom: Label"]:contains(${lablelName})`
          ).should("contain", "*");
          cy.get(
            '[class="text-skin-danger dark:text-skin-danger-inverted font-raleway-bold text-sm"]'
          ).should("have.text", "Mandatory");
        });
});
//This command for validate field values
Cypress.Commands.add("validate", (id, value) => {
  cy.get(`[id="${id}"]`).should("have.text", value);
});
//This command for upload documents
Cypress.Commands.add("documentUpload", (documentName, attachmentName) => {
  cy.get(`.Card_body__fYwDz.p-2.p-1.px-2:contains(${documentName})`)
    .uploadFile(attachmentName)
    .clickBtn("Insert")
    .popup('No')
    .wait(1000);
});
//This command for invoice amount validation in list page
Cypress.Commands.add("invValidation", (value, index) => {
  cy.get('[role="cell"]').eq(index).should("have.text", value);
});
//uncaught:error handelling
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
//This command for custom assertion
Cypress.Commands.add("customAssertion", (actualValue, expectedValue) => {
  expect(actualValue).to.equal(expectedValue);
});
//This command is to extact the one-time password from the welcome mail
Cypress.Commands.add('OTP', () => {
  cy.readFile('cypress/fixtures/email.json').then(email => {
    var body_content = email.data.log_mail[0].body
    var otpLine = body_content.match(/One-time password is <b>([^<]+)/)
    var line = otpLine.toString()
    cy.log(otpLine)
    const pattern = /<b>([^<]+)/;
    var matches = line.match(pattern)
    const code = matches[1].split(',')
    cy.log(code)
    const otp_code = code[0]
    return cy.wrap(otp_code);
  })
})
//Setting up the raise account
Cypress.Commands.add("newUserAccountSetUp", (subdomain, email_id) => {
  extract_otp(email_id)
  // cy.logout()
  cy.readFile('cypress/fixtures/email.json').then(logMail => {
    var status = logMail.data.log_mail[0].status
    var emailSent = logMail.data.log_mail[0].is_sent
    if (emailSent == true && status == 'sent') {
      cy.OTP().then(otp_code => {
        cy.log(otp_code)
        if (subdomain === 'app') {
          cy.url().then(url => {
            cy.log(url)
            const app_url = url.replace(url, Cypress.env("APP_URL"))
            cy.clearAllCookies()
            cy.clearAllSessionStorage()
            cy.visit(app_url)
            accountSetUpPage.inputUserName(email_id)
            accountSetUpPage.inputOneTimePassword(otp_code)
            accountSetUpPage.clickLogin()
            accountSetUpPage.inputNewPassword()
            accountSetUpPage.inputConfirmPassword()
            accountSetUpPage.clickResetPasswordButton()
            accountSetUpPage.acceptGDPR()
            cy.logout()
          })

        } else if (subdomain === 'ops') {
          cy.url().then(url => {
            const ops_url = url.replace(url, Cypress.env("OPS_URL"))
            cy.clearAllCookies()
            cy.clearAllSessionStorage()
            cy.visit(ops_url)
            accountSetUpPage.inputUserName(email_id)
            accountSetUpPage.inputOneTimePassword(otp_code)
            accountSetUpPage.clickLogin()
            accountSetUpPage.inputNewPassword()
            accountSetUpPage.inputConfirmPassword()
            accountSetUpPage.clickResetPasswordButton()
            cy.logout()
          })
        }
      })
    } else {
      cy.log(`❌ Email has not been sent to the user ❌`)
    }
  })
})
//This command allow any raise user to login
Cypress.Commands.add('login', (username) => {
  loginPage.inputUserName(username)
  loginPage.inputPassword()
  loginPage.clickLoginButton()
  Region == 'prod' ? loginPage.userRoleSelect(username) : null
})
// select the drop down value which has the default values in the dropdown 
Cypress.Commands.add('dropDown', (dropDownName, dropDownValue) => {
  cy.get(`[id="${dropDownName}"]`).first().then(text => {
    var place_holder = text.text()
    cy.url().then((url) => {
      if (url.includes('app')) {
        if (place_holder == 'Select...') {
          cy.get(`[id="${dropDownName}"]`).first().click()
          cy.get(`.css-26l3qy-menu .break-normal:contains(${dropDownValue}):eq(0)`).click()
        }
      } else if (url.includes('ops')) {
        if (place_holder == 'Select...') {
          cy.get(`[id="${dropDownName}"]`).first().click()
          cy.get(`.my-react-select__menu .break-normal:contains(${dropDownValue}):eq(0)`).click()
        }
      }
    })

  });
})
// extract contract approval magic link
Cypress.Commands.add('extractContractMagicLink', () => {
  cy.readFile('cypress/fixtures/placement/contractMagicLink.json').then(magicLink => {
    if (magicLink.data.log_mail[0].is_sent == true) {
      const body_content = magicLink.data.log_mail[0].body
      const extract_link = body_content.match(/([^']*\bmagic\b[^']*)/)
      const magic_url = extract_link[0]
      return cy.wrap(magic_url)
    }
  })
})
Cypress.Commands.add('allowedUserRoles', () => {
  cy.getCookie('token').then(cookie => {
    var token = cookie.value
    var decoded = jwt_decode(token)
    cy.log(decoded)
    var userRole = decoded.allowed_roles
    return cy.wrap(userRole)
  })
})
Cypress.Commands.add('base64UrlToContent', { prevSubject: true }, (subject) => {
  // Extract the base64 data
  const base64Data = subject.split(',')[1];

  // Decode the Base64 data
  const decodedData = Cypress.atob(base64Data);

  try {
    // Attempt to parse the decoded data as JSON
    const jsonData = JSON.parse(decodedData);
    return jsonData;
  } catch (error) {
    // If parsing as JSON fails, treat it as plain text
    return decodedData;
  }
});