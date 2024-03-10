import { _getTmsDetails, contractMagicLink, getBusinessName, getRandomFullName, invoices, paymentCompanyDetails } from "./api";
import jwt_decode from 'jwt-decode';
import csv from '@fast-csv/parse'
import { writeToPath } from "@fast-csv/format";
import { differenceInDays, parse, addDays, format } from 'date-fns';
//This function will return random number based on input
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
//This function will return current date formate fo YYYY-mm-dd
export const todayDate = () => {
  const today = new Date();
  const currentDate = today.toISOString().split('T')[0];
  return currentDate;
};
//This function converts the date formate yyyy-mm-dd to short date
export const shortDate = (value) => {
  const date = new Date(value);
  const months = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const shortDate = date.toLocaleDateString('en-GB', options);
  const formattedDate = shortDate.replace(months, months.substring(0, 3));
  return formattedDate;
}
//This function returns current system time
export const Now = () => {
  const now = new Date().toLocaleTimeString();
  return now;
};
//This function generates random contract rates
export const contractRates = (unitType) => {
  if (unitType === 'Hours') {
    var clientRate = Math.floor(Math.random() * 90) + 10;
    var contractorRate = Math.round(clientRate / 2);
    return { clientRate, contractorRate }
  } else {
    var clientRate = Math.floor(Math.random() * 800) + 200;
    var contractorRate = Math.round(clientRate / 2);
    return { clientRate, contractorRate }
  }
}
//This function returns the random date till current date
export const randomDate = () => {
  const startDate = new Date("2021-01-01");
  const endDate = new Date();
  const minTime = startDate.getTime();
  const maxTime = endDate.getTime();
  const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  var date = (new Date(randomTime)).toISOString('en-GB')
  var random_date = date.split('T')[0]
  return random_date;
}
//This function returns random url
export const randomUrl = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const urlLength = Math.floor(Math.random() * 10) + 5;
  let url = '';
  for (let i = 0; i < urlLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    url += characters.charAt(randomIndex);
  }
  return `http://${url}.com`;
}
//This function returns First Name
export const randomFirstName = () => {
  const firstNames = ['Joan', 'Alice', 'Michael', 'Emma', 'David', 'Olivia', 'James', 'Sophia', 'Jack', 'James', 'Bruce', 'Tony', 'Lara', 'Ben', 'Dwayne', 'Logan'];
  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const firstName = firstNames[randomFirstNameIndex];
  return firstName;
}
//This function returns Last Name
export const randomLastName = () => {
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Reacher', 'Bond', 'Wayne', 'Stark', 'Croft', 'Tennison', 'Paul'];
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
  const lastName = lastNames[randomLastNameIndex];
  return lastName;
}
//This function returns the random address line1
export const randomAddressLine1 = () => {
  const array = ['Rhosydd', 'Bank St', '105 High St', '18 Warwick Rd', '54 High St', '33-35 Wigan Rd', '28 Brandreth Rd', 'Leckwith Rd', '89 Maison Dieu Rd', '46 Lawton St', 'The Quay', '124 Bath Rd', 'Millfield Ave', 'Unit 2 Riviera Way Retail Park', '10 Westminster St', '188 Kings Rd', "Unit 6 The Pod, St Andrew's Quay", 'Ferriby Rd', '396 Fulwood Rd', '44 Bury New Rd', '2-6 High St', 'Bentalls Pipps Hill Industrial', 'Scott St', 'Ross House, The Square', '99 King St']
  const randomAddress = Math.floor(Math.random() * array.length);
  const addressLine1 = array[randomAddress];
  return addressLine1;
}
//This function returns random post code
export const randomPostCode = () => {
  const array = ['HU6 7RX', 'LS13 1NG', 'HG1 5JS', 'YO15 3ET', 'LS6 3NX', 'LS6 3DP', 'LS22 4JA', 'YO51 9HS', 'S35 8PP', 'LS1 5AT', 'S12 3XR', 'TW12 2LJ', 'HA9 9AG', 'UB6 9RS', 'TW7 6BG', 'UB3 3EA', 'HA8 7DB', 'UB10 9JY', 'PE1 1SQ', 'PE1 1NA', 'PE1 1HA', 'EC4M 9DT', 'G11 7RE', 'CF24 3BP', 'IV2 6HE', 'N16 8JP', 'LA1 4NQ', 'BD8 7RS', 'EH3 8AN'];
  const randomPostCodes = Math.floor(Math.random() * array.length);
  const postCode = array[randomPostCodes];
  return postCode;
}
//This function returns random city
export const randomCity = () => {
  const array = ['Aberdeen City', 'Aberdeenshire', 'Angus', 'Antrim', 'Argyll', 'Avon', 'Ayrshire', 'Bedfordshire', 'Berkshire', 'Buckinghamshire', 'Cambridgeshire', 'Carmarthenshire', 'Cheshire', 'Cheshire East', 'Cheshire West and Chester', 'City of Bristol', 'City of Edinburgh', 'Cleveland', 'Clwyd', 'Conwy', 'Cornwall', 'County Antrim', 'County Durham', 'Cumbria', 'Derbyshire', 'Devon', 'Dorset', 'Dorset County', 'Down', 'East Lothian', 'East Riding of Yorkshire', 'East Sussex', 'Essex', 'Fife', 'Glasgow City', 'Greater London', 'Hampshire', 'Hertfordshire', 'Herts', 'London', 'Middlesex', 'North Yorkshire', 'Oxfordshire', 'Sussex', 'West Midlands', 'West Sussex', 'West Lothian', 'Yorkshire', 'Oxfordshire'];
  const randomCities = Math.floor(Math.random() * array.length);
  const city = array[randomCities];
  return city;
}
//This function returns random payment term
export const paymentTerms = () => {
  const array = ['Payment On Receipt', '7 Days', '14 Days', '15 Days', '21 Days', '28 Days', '35 Days', '40 Days', '45 Days', '60 Days', '90 Days', '30 Days After Month End', '30 Days'];
  const randomPaymentTerms = Math.floor(Math.random() * array.length);
  const payment_terms = array[randomPaymentTerms];
  return payment_terms
}
// This function returns random Industry
export const industry = () => {
  const array = ['Financial Services', 'Professional Services', 'Estate', 'Construction', 'Healthcare', 'Training', 'Finance', 'Media', 'Information Technology', 'Charity', 'Food'];
  const randomIndustries = Math.floor(Math.random() * array.length);
  const industries = array[randomIndustries]
  return industries
}
//This function returns the random national insurance number
export const nationalInsuranceNumber = () => {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const insuranceNumber = `${char[randomNumber(1, 26)]}${char[randomNumber(1, 26)]}${randomNumber(100000, 999999)}${char[randomNumber(1, 26)]}`
  return insuranceNumber
}
//This function returns random Bank Name
export const randomBankName = () => {
  const array = ['Bank of England', 'Bank of Ireland', 'Bank of Scotland', 'Barclays Bank', 'Citibank', 'Clydesdale Bank', 'HSBC Bank', 'Lloyds TSB Bank', 'National Westminster Bank (NatWest)', 'Nationwide Building Society', 'Royal Bank of Scotland (RBS)', 'Santander Bank', 'Standard Chartered Bank', 'The Co-operative Bank']
  const randomBankNames = Math.floor(Math.random() * array.length);
  const bankName = array[randomBankNames]
  return bankName
}
//This function returns random start date and end date
export const randomContractDates = () => {
  const startDate = new Date();
  const randomDays = Math.floor(Math.random() * 365) + 1;
  startDate.setDate(startDate.getDate() + randomDays);
  const randomFutureDays = Math.floor(Math.random() * 365) + 1;
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + randomFutureDays);
  const start_date = startDate.toISOString('en-GB').split('T')[0];
  const end_date = endDate.toISOString('en-GB').split('T')[0]
  return { start_date, end_date }
}
//This function returns random valid from and valid to dates
export const randomKycDates = () => {
  const currentDate = new Date();
  const validFrom = addDays(currentDate, -7);
  const validTo = addDays(currentDate, 7);
  const valid_from = format(validFrom, 'yyyy-MM-dd');
  const valid_to = format(validTo, 'yyyy-MM-dd');
  return { valid_from, valid_to }
}
//This function returns random disallowed days
export const disallowedDays = () => {
  const array = ['90', '60', '30', '14', '7', '120']
  const randomDisallowedDays = Math.floor(Math.random() * array.length)
  const disallowed_days = array[randomDisallowedDays]
  return disallowed_days;
}
//This function returns the random funder email id
export const funderEmail = () => {
  const username = 'shelbyfunder2022+'
  const domain = '@gmail.com'
  const funder_email = `${username}${randomNumber(1, 9999999999)}${domain}`
  return funder_email
}
//This function returns the random agency email id
export const agencyEmail = () => {
  const username = 'shelbyagency2022+'
  const domain = '@gmail.com'
  const agency_email = `${username}${randomNumber(1, 9999999999)}${domain}`
  return agency_email
}
//This function returns the random agency email id
export const clientEmail = () => {
  const username = 'shelbyclient2022+'
  const domain = '@gmail.com'
  const client_email = `${username}${randomNumber(1, 9999999999)}${domain}`
  return client_email
}
//This function returns the random umbrella ontractor email id
export const umbrellaContractorEmail = () => {
  const username = 'shelbycontractorumb2022+'
  const domain = '@gmail.com'
  const contractor_email = `${username}${randomNumber(1, 9999999999)}${domain}`
  return contractor_email
}
//This function returns the random limited contractor email id
export const limitedContractorEmail = () => {
  const username = 'shelbycontractorltd2022+'
  const domain = '@gmail.com'
  const contractor_email = `${username}${randomNumber(1, 9999999999)}${domain}`
  return contractor_email
}
//This function returns the random self employed contractor email id
export const selfEmployedContractorEmail = () => {
  const username = 'shelbyselfemployed+'
  const domain = '@gmail.com'
  const contractor_email = `${username}${randomNumber(1, 9999999999)}${domain}`
  return contractor_email
}
//This function returns the random phone number
export const phoneNumber = () => {
  const phone = randomNumber(1000000000, 9999999999)
  return phone
}
//This function returns the support type role
export const supportType = () => {
  const array = ['Sales Account Manager', 'Credit Controller', 'Payment Assistant']
  const randomSupportType = Math.floor(Math.random() * array.length)
  const support_type = array[randomSupportType]
  return support_type;
}
//This function returns sort code
export const sortCode = () => {
  const sort_code = randomNumber(100000, 999999)
  return sort_code
}
//This function returns swift code
export const swiftCode = () => {
  const swift_code = `GB${randomNumber(100000, 999999)}`
  return swift_code
}
//This function returns account number
export const accountNumber = () => {
  const account_number = randomNumber(10000000, 99999999)
  return account_number
}
//This function returns iban
export const ibanNumber = () => {
  const iban = `GB${randomNumber(1000000000000, 9999999999999)}`
  return iban
}
//This function returns vat registration number
export const vatRegistrationNumber = () => {
  const vat_registration_no = randomNumber(1000000000000, 9999999999999)
  return vat_registration_no
}
//This function returns brn
export const randomBrn = () => {
  const brn = `SC${randomNumber(100000, 999999)}`
  return brn
}
//This function returns the currency formatted value
export const amountFormate = (stringValue) => {
  var value = parseFloat(stringValue);
  var amountFormatted = value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return amountFormatted;
}
// This function is used to store the funder name in the testData.json
export const storeFunderName = () => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    var funding_model = testData.data.platform_business[0].funding_model[0]
    const funderName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((funderData) => {
      if (funding_model == 'direct') {
        funderData.directEntities[0].funders = funderName;
      } else {
        funderData.indirectEntities[0].funders = funderName;
      }
      cy.writeFile('cypress/fixtures/testData.json', funderData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(data)
      })
    });
  });
}
//This function is used to store the agency name in the testData.json file
export const storeAgencyName = (funding_model) => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const agencyName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((agencyData) => {
      if (funding_model == 'Direct') {
        agencyData.directEntities[0].agencies = agencyName;
      } else {
        agencyData.indirectEntities[0].agencies = agencyName;
      }
      cy.writeFile('cypress/fixtures/testData.json', agencyData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      })
    });
  });
}
//This function is used to store the client name in the testData.json file
export const storeClientName = (funding_model) => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const clientName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((clientData) => {
      if (funding_model == 'Direct') {
        clientData.directEntities[0].clients = clientName;
      } else {
        clientData.indirectEntities[0].clients = clientName;
      }
      cy.writeFile('cypress/fixtures/testData.json', clientData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      })
    });
  });
}
//This function is used to store the umbrella company in the testData.json file
export const storeUmbrellaName = () => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const umbrellaName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((UmbrellaData) => {
      UmbrellaData.paymentCompanies[0].umbrellaCompanies = umbrellaName;
      cy.writeFile('cypress/fixtures/testData.json', UmbrellaData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      });
    });
  });
}
//This function is used to store limited company in the testData.json file
export const storeLimitedName = () => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const limitedName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((limitedData) => {
      limitedData.paymentCompanies[0].limitedCompanies = limitedName;
      cy.writeFile('cypress/fixtures/testData.json', limitedData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      });
    });
  });
}
//This function is used to store the limited company maped contractor in the testData.json file
export const storeLimitedContractor = (funding_model) => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const limitedContractorName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((contractorData) => {
      if (funding_model === 'Direct') {
        contractorData.directEntities[0].limitedContractor = limitedContractorName;
      } else {
        contractorData.indirectEntities[0].limitedContractor = limitedContractorName;
      }
      cy.writeFile('cypress/fixtures/testData.json', contractorData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      });
    });
  });
}
//This function is used to store the umbrella company maped contractor in the testData.json file
export const storeUmbrellaContractor = (funding_model) => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const umbrellaContractorName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((contractorData) => {
      if (funding_model === 'Direct') {
        contractorData.directEntities[0].umbrellaContractor = umbrellaContractorName;
      } else {
        contractorData.indirectEntities[0].umbrellaContractor = umbrellaContractorName;
      }
      cy.writeFile('cypress/fixtures/testData.json', contractorData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      });
    });
  });
}
//This function is used to store the self employed contractor in the testData.json file
export const storeSelfEmployedContractor = (funding_model) => {
  cy.readFile('cypress/fixtures/businessResponse.json').then((testData) => {
    const selfEmployedContractorName = testData.data.platform_business[0].name;
    cy.readFile('cypress/fixtures/testData.json').then((contractorData) => {
      if (funding_model === 'Direct') {
        contractorData.directEntities[0].selfEmployedContractor = selfEmployedContractorName;
      } else {
        contractorData.indirectEntities[0].selfEmployedContractor = selfEmployedContractorName;
      }
      cy.writeFile('cypress/fixtures/testData.json', contractorData)
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        cy.log(JSON.stringify(data))
      });
    });
  });
}
// To store the permanent placement human id in testData.json
export const storePermanentPlacementID = (funding_model, funding_type, human_id) => {
  const contractHumanId = human_id
  cy.readFile('cypress/fixtures/testData.json').then((id) => {
    if (funding_model == 'Direct' && funding_type == 'Funded') {
      id.directContracts[0].funded.permanentPlacement = contractHumanId;
    } else if (funding_model == 'Direct' && funding_type == 'Paid When Paid') {
      id.directContracts[0].paidWhenPaid.permanentPlacement = contractHumanId;
    } else if (funding_model == 'Indirect' && funding_type == 'Funded') {
      id.indirectContracts[0].funded.permanentPlacement = contractHumanId;
    } else if (funding_model == 'Indirect' && funding_type == 'Paid When Paid') {
      id.indirectContracts[0].paidWhenPaid.permanentPlacement = contractHumanId;
    } else {
      return null;
    }
    cy.writeFile('cypress/fixtures/testData.json', id)
    cy.readFile('cypress/fixtures/testData.json').then(data => {
      cy.log(JSON.stringify(data))
    });
  })
}
// To store the temporary placement human id in testData.json
export const storeTemporaryPlacementId = (funding_model, funding_type, human_id) => {
  const contractHumanId = human_id
  cy.readFile('cypress/fixtures/testData.json').then((tempId) => {
    if (funding_model == 'Direct' && funding_type == 'Funded') {
      tempId.directContracts[0].funded.temporaryPlacement = contractHumanId;
    } else if (funding_model == 'Direct' && funding_type == 'Paid When Paid') {
      tempId.directContracts[0].paidWhenPaid.temporaryPlacement = contractHumanId;
    } else if (funding_model == 'Indirect' && funding_type == 'Funded') {
      tempId.indirectContracts[0].funded.temporaryPlacement = contractHumanId;
    } else if (funding_model == 'Indirect' && funding_type == 'Paid When Paid') {
      tempId.indirectContracts[0].paidWhenPaid.temporaryPlacement = contractHumanId;
    } else {
      return null;
    }
    cy.writeFile('cypress/fixtures/testData.json', tempId)
    cy.readFile('cypress/fixtures/testData.json').then(data => {
      cy.log(JSON.stringify(data))
    });
  })
}
// To store the PurchaseLedger human id in testData.json
export const storePurchaseLedgerId = (funding_model, human_id) => {
  const contractHumanId = human_id
  cy.readFile('cypress/fixtures/testData.json').then((id) => {
    if (funding_model == 'Direct') {
      id.directContracts[0].funded.purchaseLedger = contractHumanId;
    } else if (funding_model == 'Indirect') {
      id.indirectContracts[0].funded.purchaseLedger = contractHumanId;
    }
    else {
      return null;
    }
    cy.writeFile('cypress/fixtures/testData.json', id)
    cy.readFile('cypress/fixtures/testData.json').then(data => {
      cy.log(JSON.stringify(data))
    });
  })
}
// To store the sales invoice human id in testData.json
export const storeSalesId = (funding_model, human_id) => {
  const contractHumanId = human_id
  cy.readFile('cypress/fixtures/testData.json').then((id) => {
    if (funding_model == 'Direct') {
      id.directContracts[0].funded.salesInvoice = contractHumanId;
    } else if (funding_model == 'Indirect') {
      id.indirectContracts[0].funded.salesInvoice = contractHumanId;
    }
    else {
      return null;
    }
    cy.writeFile('cypress/fixtures/testData.json', id)
    cy.readFile('cypress/fixtures/testData.json').then(data => {
      cy.log(JSON.stringify(data))
    });
  })
}
// To store the adhoc fee human id in testData.json
export const storeAdhocFeeId = (funding_model, type, human_id) => {
  const contractHumanId = human_id
  cy.readFile('cypress/fixtures/testData.json').then((id) => {
    if (funding_model == 'Direct' && type == 'Provider-Agency') {
      id.directContracts[0].funded.Adhoc['provider-agency'] = contractHumanId;
    } else if (funding_model == 'Direct' && type == 'Agency-Provider') {
      id.directContracts[0].funded.Adhoc['agency-provider'] = contractHumanId;
    } else if (funding_model == 'Direct' && type == 'Funder-Agency') {
      id.directContracts[0].funded.Adhoc['funder-agency'] = contractHumanId;
    } else if (funding_model == 'Direct' && type == 'Agency-Funder') {
      id.directContracts[0].funded.Adhoc['agency-funder'] = contractHumanId;
    } else if (funding_model == 'Indirect' && type == 'Agency-Provider') {
      id.indirectContracts[0].funded.Adhoc['agency-provider'] = contractHumanId;
    } else if (funding_model == 'Indirect' && type == 'Funder-Agency') {
      id.indirectContracts[0].funded.Adhoc['funder-agency'] = contractHumanId;
    } else if (funding_model == 'Indirect' && type == 'Agency-Funder') {
      id.indirectContracts[0].funded.Adhoc['agency-funder'] = contractHumanId;
    } else if (funding_model == 'Indirect' && type == 'Provider-Agency') {
      id.indirectContracts[0].funded.Adhoc['provider-agency'] = contractHumanId;
    } else {
      return null;
    }
    cy.writeFile('cypress/fixtures/testData.json', id)
    cy.readFile('cypress/fixtures/testData.json').then(data => {
      cy.log(JSON.stringify(data))
    });
  })
}
//This function is used to store the timesheets based on their funding model and funding type and also the timesheet frequency
export const storeTimesheets = (timesheetFrequency, unitType, fundingModel, fundingType) => {
  cy.readFile('cypress/fixtures/testData.json').then(testData => {
    cy.readFile('cypress/fixtures/generatedTMS.json').then((tmsData) => {
      var timesheetLength = tmsData.body.data.fundo_timesheet.length
      if (timesheetFrequency == 'Weekly' && unitType == 'Hours' && fundingModel == 'Direct' && fundingType == 'Funded') {
        var arrLength = testData.directTransactions[0].funded.draft.weeklyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].funded.draft.weeklyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].funded.draft.weeklyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Weekly' && unitType == 'Days' && fundingModel == 'Direct' && fundingType == 'Funded') {
        var arrLength = testData.directTransactions[0].funded.draft.weeklyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].funded.draft.weeklyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].funded.draft.weeklyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Monthly' && unitType == 'Hours' && fundingModel == 'Direct' && fundingType == 'Funded') {
        var arrLength = testData.directTransactions[0].funded.draft.monthlyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].funded.draft.monthlyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].funded.draft.monthlyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Monthly' && unitType == 'Days' && fundingModel == 'Direct' && fundingType == 'Funded') {
        var arrLength = testData.directTransactions[0].funded.draft.monthlyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].funded.draft.monthlyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].funded.draft.monthlyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Weekly' && unitType == 'Hours' && fundingModel == 'Direct' && fundingType == 'Paid When Paid') {
        var arrLength = testData.directTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Weekly' && unitType == 'Days' && fundingModel == 'Direct' && fundingType == 'Paid When Paid') {
        var arrLength = testData.directTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Monthly' && unitType == 'Hours' && fundingModel == 'Direct' && fundingType == 'Paid When Paid') {
        var arrLength = testData.directTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Monthly' && unitType == 'Days' && fundingModel == 'Direct' && fundingType == 'Paid When Paid') {
        var arrLength = testData.directTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.directTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.directTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Weekly' && unitType == 'Hours' && fundingModel == 'Indirect' && fundingType == 'Funded') {
        var arrLength = testData.indirectTransactions[0].funded.draft.weeklyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].funded.draft.weeklyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].funded.draft.weeklyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Weekly' && unitType == 'Days' && fundingModel == 'Indirect' && fundingType == 'Funded') {
        var arrLength = testData.indirectTransactions[0].funded.draft.weeklyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].funded.draft.weeklyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].funded.draft.weeklyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Monthly' && unitType == 'Hours' && fundingModel == 'Indirect' && fundingType == 'Funded') {
        var arrLength = testData.indirectTransactions[0].funded.draft.monthlyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].funded.draft.monthlyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].funded.draft.monthlyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Monthly' && unitType == 'Days' && fundingModel == 'Indirect' && fundingType == 'Funded') {
        var arrLength = testData.indirectTransactions[0].funded.draft.monthlyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].funded.draft.monthlyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].funded.draft.monthlyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Weekly' && unitType == 'Hours' && fundingModel == 'Indirect' && fundingType == 'Paid When Paid') {
        var arrLength = testData.indirectTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].paidWhenPaid.draft.weeklyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Weekly' && unitType == 'Days' && fundingModel == 'Indirect' && fundingType == 'Paid When Paid') {
        var arrLength = testData.indirectTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].paidWhenPaid.draft.weeklyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
      else if (timesheetFrequency == 'Monthly' && unitType == 'Hours' && fundingModel == 'Indirect' && fundingType == 'Paid When Paid') {
        var arrLength = testData.indirectTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].paidWhenPaid.draft.monthlyHourlyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      } else if (timesheetFrequency == 'Monthly' && unitType == 'Days' && fundingModel == 'Indirect' && fundingType == 'Paid When Paid') {
        var arrLength = testData.indirectTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.length
        cy.log(arrLength)
        if (arrLength >= 1) {
          for (let j = 0; j < arrLength; j++) {
            testData.indirectTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.shift()
          }
        }
        for (let i = 0; i < timesheetLength; i++) {
          var timesheet = tmsData.body.data.fundo_timesheet[i].human_id
          testData.indirectTransactions[0].paidWhenPaid.draft.monthlyDailyTimesheets.push(timesheet)
        }
        cy.writeFile('cypress/fixtures/testData.json', testData)
        cy.readFile('cypress/fixtures/testData.json').then(data => {
          cy.log(JSON.stringify(data))
        });
      }
    })
  })
}
// This function returns the generated invoices
export const generatedInvoices = (human_id) => {
  cy.log(human_id)
  invoices(human_id)
  cy.readFile('cypress/fixtures/Invoice.json').then((Invtype) => {
    // var Invoices = Invtype.body.data.fundo_invoice.length
    var funding_model = Invtype.body.data.fundo_invoice[0].funding_model
    // cy.log(Invoices)
    var generation_type = Invtype.body.data.fundo_invoice[0].generation_type
    if (generation_type === 'perm_placement') {
      cy.get('[id="invoice"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoice"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 1 || funding_model === 'indirect' && invoicesAggregate == 3) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    } else if (generation_type == 'timesheet') {
      cy.get('[id="invoices"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoices"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 2 || funding_model === 'indirect' && invoicesAggregate == 4) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    } else if (generation_type == 'payroll_timesheet') {
      cy.get('[id="invoices"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoices"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 2 || funding_model === 'indirect' && invoicesAggregate == 4) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    } else if (generation_type == 'purchase_ledger') {
      cy.get('[id="invoice"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoice"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 1 || funding_model === 'indirect' && invoicesAggregate == 3) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    } else if (generation_type == 'sales_invoice') {
      cy.get('[id="invoice"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoice"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 1 || funding_model === 'indirect' && invoicesAggregate == 3) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    } else if (generation_type == 'adhoc_fee') {
      cy.get('[id="invoice"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoice"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 1 || funding_model === 'indirect' && invoicesAggregate == 1) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    } else if (generation_type == 'expense') {
      cy.get('[id="invoices"]').then(count => {
        var invoicesAggregate = parseInt(count.text().match(/\d+/)[0])
        cy.log(invoicesAggregate)
        const invoiceDetails = []
        cy.get('[id="invoices"]').click()
        for (let i = 0; i < invoicesAggregate; i++) {
          cy.get(`tbody>tr:eq(${i})>td:eq(2)`).each((invoice) => {
            cy.get(`tbody>tr:eq(${i})>td:eq(5)`).each((type) => {
              invoiceDetails.push({
                INVOICE_ID: invoice.text(), TYPE: type.text(),
              })
              if (funding_model === 'direct' && invoicesAggregate == 2 || funding_model === 'indirect' && invoicesAggregate == 4) {
                cy.log(`The funding model of the contract is **${funding_model}**`)
                cy.log(`🟢The generated invoice is **${invoiceDetails[i].INVOICE_ID}** ${'and the type of the invoice is'} **${invoiceDetails[i].TYPE}**🟢`)
              } else {
                cy.log(`🔴**Invoices are not generated or either generated for wrong funding model🔴**`)
              }
            })
          })
        }
      })
    }
    else {
      return null
    }
  })
}
//This function will return date formate of dd-month in short -YYYY
export const dateFormate = (dateData) => {
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(dateData);
  date =
    ("0" + date.getDate()).slice(-2) +
    " " +
    m[date.getMonth()] +
    " " +
    date.getFullYear();
  return date;
};
//This function will return day
export const dayFormate = (dateData) => {
  const d = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = new Date(dateData);
  day = d[day.getDay()];
  return day;
};
//This function is for to change value based on input field for validate data in ui
export const uniteFormate = (value) => {
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
  return value;
};
//This function is for to change value based on input field for validate data in ui
export const dailySwitch = (value) => {
  switch (value) {
    case 1:
      value = "Full Day";
      break;
    case 0:
      value = "Not Working";
      break;
    case 0.5:
      value = "Half Day";
    default:
      break;
  }
  return value;
};
//This function is for remove characters from input value
export const charRemove = (value) => {
  const result = value.replace(/[a-zA-Z]/g, "");
  return result;
};
//This function is for uppercase the first letter of input
export const upperCase = (frequency) => {
  frequency = frequency.charAt(0).toUpperCase() + frequency.slice(1);
  return frequency;
};
//This function for validate timesheet details in header by internal user login
export const tmsHeaderDataByInternal = (data) => {
  cy.idFilter("human_id", data.result.data.records[0].human_id);
  cy.fieldCheck("placement_id", data.result.data.records[0].contract.human_id);
  cy.fieldCheck("title", data.result.data.records[0].contract.title);
  cy.fieldCheck("agency_name", data.result.data.records[0].agency_name);
  cy.fieldCheck("client_name", data.result.data.records[0].client_name);
  cy.fieldCheck("contractor_name", data.result.data.records[0].contractor_name);
  cy.fieldCheck(
    "payment_id",
    data.result.data.records[0].contract.contractor_payment_name
  );
  cy.fieldCheck(
    "timesheet_frequency",
    upperCase(
      data.result.data.records[0].contract.contract_temp_placement
        .timesheet_frequency
    )
  );
  cy.fieldCheck(
    "start_date",
    dateFormate(data.result.data.records[0].start_date)
  );
  cy.fieldCheck("end_date", dateFormate(data.result.data.records[0].end_date));
};
//This function for validate timesheet details in header by external user login
export const tmsHeaderDataByExternal = (data, type) => {
  cy.fieldCheckExternal("title", data.result.data.records[0].contract.title);
  cy.fieldCheckExternal("agency_name", data.result.data.records[0].agency_name);
  type !== "timesheet_approver"
    ? cy.fieldCheckExternal(
      "client_name",
      data.result.data.records[0].client_name
    )
    : null;
  type !== "contractor"
    ? cy.fieldCheckExternal(
      "contractor_name",
      data.result.data.records[0].contractor_name
    )
    : null;
  cy.fieldCheckExternal(
    "payment_company_name",
    data.result.data.records[0].contract.contractor_payment_name
  );
  cy.fieldCheckExternal(
    "timesheet_frequency",
    upperCase(
      data.result.data.records[0].contract.contract_temp_placement
        .timesheet_frequency
    )
  );
  cy.fieldCheckExternal(
    "start_date",
    dateFormate(data.result.data.records[0].start_date)
  );
  cy.fieldCheckExternal(
    "end_date",
    dateFormate(data.result.data.records[0].end_date)
  );
};
//This function for validate date order,rate name and rates , only for daily rate
export const dailyFrequency = (data, type) => {
  for (let i in data.result.data.records[0].timesheet_details) {
    cy.fieldCheck(
      "date",
      dateFormate(data.result.data.records[0].timesheet_details[i].date),
      i
    );
    cy.fieldCheck(
      "day",
      dayFormate(data.result.data.records[0].timesheet_details[i].date),
      i
    );
    type !== "External"
      ? cy.fieldCheck(
        "contract_rate_id",
        data.result.data.records[0].timesheet_details[i].contract_rate.name,
        i
      )
      : cy.fieldCheck(
        "contract_rate_name",
        data.result.data.records[0].timesheet_details[i].contract_rate.name,
        i
      );
    cy.fieldCheck(
      "unit_type",
      data.result.data.records[0].timesheet_details[i].contract_rate.unit_type,
      i
    );
    data.result.data.records[0].status == "draft"
      ? cy.fieldInput("daily", "Full Day", i)
      : cy.fieldCheck(
        "daily",
        dailySwitch(data.result.data.records[0].timesheet_details[i].units),
        i
      );
  }
  if (data.result.data.records[0].contract.contract_rates.length > 1) {
    for (
      let i = 0;
      i < data.result.data.records[0].timesheet_details.length;
      i += 1
    ) {
      cy.get('[class="w-20 p-2 pt-3"]')
        .eq(i)
        .click()
        .then(() => {
          cy.get(
            '[class="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/4 sm:px-0 lg:max-w-3xl"]'
          ).click();
        });
    }
    for (
      let i = 1;
      i < data.result.data.records[0].timesheet_details.length * 2;
      i += 2
    ) {
      data.result.data.records[0].status == "draft"
        ? cy.fieldInput("daily", "Full Day", i)
        : cy.fieldCheck(
          "daily",
          dailySwitch(data.result.data.records[0].timesheet_details[0].units),
          i
        );
    }
  }
};
//This function for validate date order,rate name and rates , only for hourly rate
export const hourlyFrequency = (data, type) => {
  for (let i in data.result.data.records[0].timesheet_details) {
    cy.fieldCheck(
      "date",
      dateFormate(data.result.data.records[0].timesheet_details[i].date),
      i
    );
    cy.fieldCheck(
      "day",
      dayFormate(data.result.data.records[0].timesheet_details[i].date),
      i
    );
    type !== "External"
      ? cy.fieldCheck(
        "contract_rate_id",
        data.result.data.records[0].timesheet_details[i].contract_rate.name,
        i
      )
      : cy.fieldCheck(
        "contract_rate_name",
        data.result.data.records[0].timesheet_details[i].contract_rate.name,
        i
      );
    cy.fieldCheck(
      "unit_type",
      data.result.data.records[0].timesheet_details[i].contract_rate.unit_type,
      i
    );
    data.result.data.records[0].status == "draft"
      ? cy.fieldInput("hourly", "8", i)
      : cy.fieldCheck(
        "hourly",
        data.result.data.records[0].timesheet_details[i].units,
        i
      );
  }
  // data.result.data.records[0].status == "draft"
  //   ? cy
  //       .get(`[id="minutes"]`)
  //       .eq(0)
  //       .click()
  //       .type("15 Minutes")
  //       .wait(300)
  //       .then(() => {
  //         cy.get(
  //           `[class="break-normal break-words"]:contains("15 Minutes")`
  //         ).click();
  //       })
  //   : null;
  if (data.result.data.records[0].contract.contract_rates.length > 1) {
    for (
      let i = 0;
      i < data.result.data.records[0].timesheet_details.length;
      i += 1
    ) {
      cy.get('[class="w-20 p-2 pt-3"]')
        .eq(i)
        .click()
        .then(() => {
          cy.get(
            '[class="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/4 sm:px-0 lg:max-w-3xl"]'
          ).click();
        });
    }
    for (
      let i = 1;
      i < data.result.data.records[0].timesheet_details.length * 2;
      i += 2
    ) {
      data.result.data.records[0].status == "draft"
        ? cy.fieldInput("hourly", "8", i)
        : cy.fieldCheck(
          "hourly",
          data.result.data.records[0].timesheet_details[0].units,
          i
        );
    }
  }
};

export const chaserForSubmit = (data) => {
  cy.multiFilter(
    "contractor_id",
    data.rows[0]?.contractor_name,
    "status",
    "Draft"
  );
  for (let i = 1; i <= 5; i++) {
    cy.get('[type="checkbox"]').eq(i).click();
  }
  cy.clickBtn("Chase").wait(300);
  cy.get('[class="Card_body__fYwDz p-2  p-1 px-2 "]').within(() => {
    for (let i = 0; i < 5; i++) {
      cy.fieldCheck("status", "Draft", i);
      cy.fieldCheck("contractor", data.rows[0]?.contractor_name, i);
    }
  });
  cy.get(
    '[class="Card_footer__LO1C8 justify-center border-t bg-skin-disabled dark:bg-skin-disabled-inverted rounded-b-md"]'
  ).within(() => {
    cy.clickBtn("Chase");
  });
  cy.popup();
};
export const chaserForApprove = (data) => {
  cy.multiFilter("client_id", data.rows[0]?.client_name, "status", "Submitted");
  for (let i = 1; i <= 5; i++) {
    cy.get('[type="checkbox"]').eq(i).click();
  }
  cy.clickBtn("Chase").wait(300);
  cy.get('[class="Card_body__fYwDz p-2  p-1 px-2 "]').within(() => {
    for (let i = 0; i < 5; i++) {
      cy.fieldCheck("status", "Submitted", i);
    }
  });
  cy.get(
    '[class="Card_footer__LO1C8 justify-center border-t bg-skin-disabled dark:bg-skin-disabled-inverted rounded-b-md"]'
  ).within(() => {
    cy.clickBtn("Chase");
  });
  cy.popup();
};
//This function for select existing contractor in self service
export const existingContractor = (data) => {
  cy.isAsterisk("Select Contractor Type", 0);
  cy.get('[class="break-normal break-words"]')
    .contains(data.rows[0].existing_contractor_name)
    .click();
  data.rows[0].payment_company_selected_by == "Agency" ||
    data.rows[0].payment_company_selected_by == "agency"
    ? cy
      .isNonMandatory(
        "Want to determine the Umbrella company for this placement?",
        1 / 3
      )
      .setDropDown(
        "contractor.existing_contractor.payment_company.payment_company",
        data.rows[0].payment_company_name
      )
    : cy.isNonMandatory(
      "Want to determine the Umbrella company for this placement?",
      1 / 3
    );
  cy.clickBtn("Save & Next");
};
//This function for select existing client in self service
export const existingClient = (data) => {
  cy.isAsterisk("Select Client Type", 0);
  cy.get('[class="break-normal break-words"]')
    .contains(data.rows[0].existing_client_name)
    .click();
  cy.clickBtn("Save & Next");
};
//This function for insert new client details in self service
export const newContractor = (data) => {
  cy.isAsterisk("Select Contractor Type", 0);
  cy.clickOptions("New Contractor");
  cy.isMandatory("First Name", 1 / 4).setInput(
    "contractor.new_contractor.first_name",
    data.rows[0].contractor_fName
  );
  cy.isMandatory("Last Name", 1 / 4).setInput(
    "contractor.new_contractor.last_name",
    data.rows[0].contractor_lName
  );
  cy.isMandatory("E-mail", 1 / 4).setInput(
    "contractor.new_contractor.contractor_email",
    data.rows[0].contractor_email + "+" + randomNumber(1, 100000) + "@gmail.com"
  );
  data.rows[0].payment_company_selected_by == "Agency" ||
    data.rows[0].payment_company_selected_by == "agency"
    ? cy
      .isNonMandatory(
        "Want to determine the Umbrella company for this placement?",
        1 / 4
      )
      .setDropDown(
        "contractor.new_contractor.payment_company.payment_company",
        data.rows[0].payment_company_name
      )
    : cy.isNonMandatory(
      "Want to determine the Umbrella company for this placement?",
      1 / 4
    );
  cy.clickBtn("Save & Next");
};
//This function for insert client basic details in self service
export const newClient = (data) => {
  cy.isAsterisk("Select Client Type", 0);
  cy.clickOptions("New Client").wait(300);
  cy.clickOptions("No").wait(300);
  cy.isMandatory("Company Name", 1 / 3).setInput(
    "client.new_client.company_name",
    data.rows[0].client_company_name
  );
  cy.isMandatory("Registration Number", 1 / 3).setInput(
    "client.new_client.registration_no",
    "SC" + randomNumber(1, 10000000)
  );
  // cy.isMandatory("Incorporated Country", 1 / 3);
  cy.setDropDown(
    "client.new_client.incorporated_country",
    data.rows[0].incorporated_country
  );
  cy.isNonMandatory("Tax Registration Number", 1 / 3).setInput(
    "client.new_client.tax_registration_no",
    randomNumber(1, 10000000)
  );
  clientAddress(data, "reg");
  data.rows[0].same_as_reg_address !== "No" ||
    data.rows[0].same_as_reg_address !== "No"
    ? cy
      .get(
        '[id="client.new_client.invoicing_address.mark_as_invoice_address"]'
      )
      .click()
    : clientAddress(data, "inv");
  cy.uploadFile("im1.jpg");
  cy.clickBtn("Save & Next");
};
//This function for insert client address details in self service new client
export const clientAddress = (data, value) => {
  value == "reg"
    ? cy
      .get('[class="flex flex-wrap p-2 "]')
      .eq(1)
      .within(() => {
        cy.isMandatory("Address Line 1", 1 / 2)
          .setInput(
            "client.new_client.registered_address.line_1",
            data.rows[0].reg_address_line1
          )
          .isNonMandatory("Address Line 2", 1 / 2)
          .setInput(
            "client.new_client.registered_address.line_2",
            data.rows[0].reg_address_line2
          )
          .isMandatory("Town/City", 1 / 4)
          .setInput(
            "client.new_client.registered_address.city",
            data.rows[0].reg_address_city
          )
          .isNonMandatory("County", 1 / 4)
          .setInput(
            "client.new_client.registered_address.state",
            data.rows[0].reg_address_county
          )
          .isMandatory("Country", 1 / 4)
          .setDropDown(
            "client.new_client.registered_address.country_id",
            data.rows[0].reg_address_country
          )
          .isMandatory("Post Code", 1 / 4)
          .setInput(
            "client.new_client.registered_address.zipcode",
            data.rows[0].reg_address_postcode
          );
      })
    : cy
      .get('[class="flex flex-wrap p-2 "]')
      .eq(2)
      .within(() => {
        cy.isMandatory("Address Line 1", 1 / 2)
          .setInput(
            "client.new_client.invoicing_address.line_1",
            data.rows[0].inv_address_line1
          )
          .isNonMandatory("Address Line 2", 1 / 2)
          .setInput(
            "client.new_client.invoicing_address.line_2",
            data.rows[0].inv_address_line2
          )
          .isMandatory("Town/City", 1 / 4)
          .setInput(
            "client.new_client.invoicing_address.city",
            data.rows[0].inv_address_city
          )
          .isNonMandatory("County", 1 / 4)
          .setInput(
            "client.new_client.invoicing_address.state",
            data.rows[0].inv_address_county
          )
          .isMandatory("Country", 1 / 4)
          .setDropDown(
            "client.new_client.invoicing_address.country_id",
            data.rows[0].inv_address_country
          )
          .isMandatory("Post Code", 1 / 4)
          .setInput(
            "client.new_client.invoicing_address.zipcode",
            data.rows[0].inv_address_postcode
          );
      });
};
//This function for country name validation in ui
export const country = (country) => {
  switch (country) {
    case "b06c68c2-e298-4272-aa38-62fe267ee97b":
      country = "United Kingdom";
      break;
    default:
      country = "incorrect";
  }
  return country;
};
//This function for currency validation in ui
export const currency = (currency) => {
  switch (currency) {
    case "bb9ecacf-f2de-4f71-aee8-9016492861dc":
      currency = "Pound Sterling£, GBP";
      break;
    default:
      currency = "incorrect";
  }
  return currency;
};
//This function for currency validation with currency code in ui
export const bankCurrency = (currency) => {
  switch (currency) {
    case "bb9ecacf-f2de-4f71-aee8-9016492861dc":
      currency = "Pound Sterling, £, GBP";
      break;
    default:
      currency = "incorrect";
  }
  return currency;
};
//This function for currency validation with currency symbole in ui
export const currencyWithoutCode = (currency) => {
  switch (currency) {
    case "bb9ecacf-f2de-4f71-aee8-9016492861dc":
      currency = "Pound Sterling, £";
      break;
    default:
      currency = "incorrect";
  }
  return currency;
};
//This function for notice period validation in ui
export const noticePeriod = (np) => {
  switch (np) {
    case "2_weeks":
      np = "2 Weeks";
      break;
    case "1_month":
      np = "1 Month";
      break;
    case "15_days":
      np = "15 Days";
      break;
    case "10_days":
      np = "10 Days";
      break;
    default:
      np = "incorrect";
  }
  return np;
};
//This function validate payment company for self service
export const validatePayment = (uuid, currency_id) => {
  paymentCompanyDetails(uuid, currency_id);
  cy.readFile("../platform-cypress/cypress/fixtures/payment.json").then(
    (data) => {
      cy.validate(
        "entities.payment_company.business_id",
        `${data.res.data.records[0].name}${data.res.data.records[0].human_id}`
      );
      cy.validate(
        "entities.payment_company.bank_account",
        `${data.res.data.records[0].bank_account.account_holder_name}${data.res.data.records[0].bank_account.bank_name
        }, ${data.res.data.records[0].bank_account.account_number}, ${country(
          data.res.data.records[0].bank_account.country_id
        )}`
      );
      cy.validate(
        "entities.payment_company.business_tax_id",
        `${data.res.data.records[0].business_taxes[0].value
        } % ${currencyWithoutCode(
          data.res.data.records[0].business_taxes[0].currency_id
        )}`
      );
    }
  );
};
//This function number formate
export const numberFormate = (number) => {
  var forMate = number.toLocaleString("en-US");
  return `${forMate}.00`;
};
// This function for onboard client for self service
export const onboardClient = (data, value) => {
  cy.logout();
  cy.login("OA1");
  cy.navToEntity("internal", "Clients");
  var human_id = data.res.data.records[0].human_id;
  var client_name =
    data.res.data.records[0].data.client.new_client.company_name;
  cy.dynamicNameFilter("human_id", client_name);
  cy.readFile("../platform-cypress/cypress/fixtures/client.json").then(
    (data) => {
      cy.setInput(
        "company.office_email",
        data.rows[0].email + "+" + randomNumber(1, 1000) + "@gmail.com"
      );
      cy.setInput("tel", randomNumber(1, 1000000000), 0);
      cy.setDate("company.incorporated_date", data.rows[0].incorporated_date);
      cy.setInput("company.website_url", data.rows[0].website_url);
      cy.setInput("tel", randomNumber(1, 1000000000), 1);
      cy.setDropDown("industries", data.rows[0].industries);
      cy.clickBtn("Save").popup();
      cy.clickBtn("Request Credit Limit").popup().wait(1000);
      cy.logout();
      cy.login("CRA");
      cy.navToEntity("internal", "Clients");
      cy.dynamicNameFilter("human_id", client_name);
      cy.clickTab("Review Credit").wait(200);
      cy.clickBtn("Add Credit Limit").then(() => {
        cy.setInput("amount", data.rows[0].funder_limit, 0);
        data.rows[0].bad_debt !== null && data.rows[0].bad_debt !== 0
          ? cy.setInput("bad_debt_amount", data.rows[0].bad_debt)
          : null;
        cy.setInput("credit_limit_reference", data.rows[0].credit_reference);
        cy.setInput(
          "bad_debt_limit_reference",
          data.rows[0].bad_debt_reference
        );
        cy.setDate("valid_from", todayDate());
      });
      cy.clickBtn("Insert").get(".swal2-confirm").contains("Yes").click();
      cy.clickBtn("Approve Credit Limit").popup().wait(1000);
      cy.logout();
      cy.login("OA1");
      cy.navToEntity("internal", "Clients");
      cy.dynamicNameFilter("human_id", client_name);
      cy.clickTab("Compliance").wait(700);
      cy.clickTab("KYC").wait(500);
      cy.setKyc(
        "Companies House Screenshot",
        data.rows[0].kyc_from,
        data.rows[0].kyc_to,
        "im4.jpeg",
        "good for nothing"
      );
      cy.clickTab("Basic Info").wait(1000);
      cy.setDropDown("mailing_address_id", "Invoicing Address");
      cy.clickBtn("Save").popup();
      cy.clickTab("Staff");
      cy.clickBtn("Add Staff");
      cy.setDropDown("type", "Payment Assistant");
      cy.setDropDown("user_id", data.rows[0].staff_name);
      cy.clickBtn("Insert").popup().wait(500);
      cy.clickBtn("Submit Compliance").popup().wait(500);
      cy.logout();
      cy.login("CA");
      cy.navToEntity("internal", "Clients");
      cy.dynamicNameFilter("human_id", client_name);
      cy.clickTab("Compliance");
      cy.clickBtn("Approve").popup();
      cy.logout();
      cy.login("CRA");
      cy.navToRequest(`${value}_placement`);
      cy.idFilter("id", human_id).wait(1000);
    }
  );
};
// validating amount with symble
export const currencySymble = (currency_id, amount) => {
  if (amount < 0) {
    var amountValue = amount * -1;
  } else {
    var amountValue = amount;
  }
  const decimalPlaces = 2;
  // Round the number to the specified decimal places
  amountValue = Number(amountValue.toFixed(decimalPlaces));
  // Convert the number to a string and pad with leading zeros
  amountValue = amountValue.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
  switch (currency_id) {
    case "bb9ecacf-f2de-4f71-aee8-9016492861dc":
      currency_id = "£";
      break;
    case "804b2152-d5ac-4b4d-ae7e-9623350e62a1":
      currency_id = "€";
      break;
    default:
      break;
  }
  if (amount < 0) {
    return `-${currency_id}${amountValue}`;
  } else {
    return `${currency_id}${amountValue}`;
  }
};
//This function for formatting phone number
export const phoneNumberFormate = (number) => {
  let formattedNumber = number.toString().replace(/^(\d{2})/, "$1 ");
  return `+${formattedNumber}`;
};
//This function for convert ui status formate
export const statusChange = (status) => {
  switch (status) {
    case "pending_approval_client":
      status = "Pending Client Approval";
      break;
    case "pending_approval_agency":
      status = "Pending Agency Approval";
      break;
    case "pending_approval_contractor":
      status = "Pending Contractor Approval";
      break;
    case "pending_raise_approval":
      status = "Pending Raise Approval";
      break;
    case "active":
      status = "Active";
      break;
    case "expired":
      status = "Expired";
      break;
    case "rejected_client":
      status = "Rejected Client";
      break;
    default:
      status = status;
  }
  return status;
};
//This function for title case converter
export const convertToTitleCase = (str) => {
  switch (str) {
    case "perm_placement":
      str = "perm_invoices";
      break;
    default:
      str = str;
      blur;
  }
  // Split the string into words
  var words = str.split("_");
  // Capitalize the first letter of each word
  var titleCaseWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  // Join the words with spaces
  var titleCaseStr = titleCaseWords.join(" ");
  return titleCaseStr;
};
// returns a lower case same as in data base
export const lowerCase = (text) => {
  const words = text.split(' ');
  const lower_case = words.join('_').toLowerCase();
  return lower_case;
}
export const allowedUserRoles = () => {
  cy.getCookie('token').then(cookie => {
    var token = cookie.value
    var decoded = jwt_decode(token)
    cy.log(decoded)
    userRole = decoded.allowed_roles
  })
}
export const getRandomTimesheetMinutes = () => {
  var minutesInput = ['0 Minutes', '15 Minutes', '30 Minutes', '45 Minutes']
  var minutes = minutesInput[Math.floor(Math.random() * minutesInput.length)]
  cy.log(minutes)
  return minutes
}
export const getRandomTimesheetDays = () => {
  var daysInput = ['Full Day', 'Half Day'];
  var days = daysInput[Math.floor(Math.random() * daysInput.length)]
  cy.log(days)
  return days
}
export const getRandomDate = (startDate, endDate) => {
  const start_date = new Date(startDate);
  const end_date = new Date(endDate);
  const array = [];
  for (let i = 0; i < 3; i++) {
    const randomDate = new Date(start_date.getTime() + Math.random() * (end_date.getTime() - start_date.getTime()));
    const formattedDate = new Date(randomDate).toISOString().split('T')[0];
    array.push(formattedDate);
  }
  const dates = array.join(", ")
  return dates
}
export const contractDaysLeftCount = () => {
  const contractDaysLeft = []
  cy.readFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json').then(dates => {
    var endDateLength = dates.data.top5_contractor_contract_days_left.length
    for (let i = 0; i < endDateLength; i++) {
      const end_date = dates.data.top5_contractor_contract_days_left[i].end_date
      const currentDate = parse(todayDate(), 'yyyy-MM-dd', new Date())
      const count = differenceInDays(end_date, currentDate) + 1
      contractDaysLeft.push(count)
    }
  })
  return cy.wrap(contractDaysLeft);
}

export const esignRequiredForClientSchedule = ({ clientEsign, agencyEsign }) => {
  cy.get('[id="placement_details.schedule_details.eSign_required_for_agency_client_schedule.client"]').as('clientEsign')
  cy.get('[id="placement_details.schedule_details.eSign_required_for_agency_client_schedule.agency"]').as('agencyEsign')
  if (clientEsign == 'Yes' && agencyEsign == 'Yes') {
    cy.get('@clientEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(0, 100, 0)') {
        cy.get('@clientEsign').click()
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      } else {
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      }
    })
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(0, 100, 0)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      }
    })
  } else if (clientEsign == 'No' && agencyEsign == 'No') {
    cy.get('@clientEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@clientEsign').click()
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
  } else if (clientEsign == 'Yes' && agencyEsign == 'No') {
    cy.get('@clientEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(0, 100, 0)') {
        cy.get('@clientEsign').click()
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      } else {
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      }
    })
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
  } else if (agencyEsign == 'Yes' && clientEsign == 'No') {
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
    cy.get('@clientEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@clientEsign').click()
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@clientEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
  }
}
export const esignRequiredForContractorSchedule = ({ contractorEsign, agencyEsign }) => {
  cy.get('[id="placement_details.schedule_details.eSign_required_for_agency_contractor_schedule.contractor"]').as('contractorEsign')
  cy.get('[id="placement_details.schedule_details.eSign_required_for_agency_contractor_schedule.agency"]').as('agencyEsign')
  if (contractorEsign == 'Yes' && agencyEsign == 'Yes') {
    cy.get('@contractorEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(0, 100, 0)') {
        cy.get('@contractorEsign').click()
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      } else {
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      }
    })
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(0, 100, 0)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      }
    })
  } else if (contractorEsign == 'No' && agencyEsign == 'No') {
    cy.get('@contractorEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@contractorEsign').click()
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
  } else if (contractorEsign == 'Yes' && agencyEsign == 'No') {
    cy.get('@contractorEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(0, 100, 0)') {
        cy.get('@contractorEsign').click()
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      } else {
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(0, 100, 0)')
      }
    })
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
  } else if (agencyEsign == 'Yes' && contractorEsign == 'No') {
    cy.get('@agencyEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@agencyEsign').click()
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@agencyEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
    cy.get('@contractorEsign').then(checkBox => {
      if (checkBox.css('background-color') !== 'rgb(243, 244, 246)') {
        cy.get('@contractorEsign').click()
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      } else {
        cy.get('@contractorEsign').should('have.css', 'background-color', 'rgb(243, 244, 246)')
      }
    })
  }
}