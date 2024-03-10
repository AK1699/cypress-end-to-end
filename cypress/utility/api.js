import {
  getHumanId, tms_details, temp_request, service_details, contractDetails, getPaymentcompany, getBuzContacts, paymentService, contractBuzContact, contractInfo,
  tmsTransactionDetails, transactionDetails, clientService, getInvoices, contractHumanId, contractInv, tmsHumanId, userBuzId, associatedBuzDetails, associatedContractDetails,
  salesLedger, agencyCommissionReport, providerFee, currency, country, supportUsers, funderDetails, businessDetails, getting_otp, Invquery, permPlacementDetails, puchaseLedgerDetails,
  salesInvoiceDetails, adhocFeeDetails, expense, refinementOptions, payrollTimesheetDetails, query_notice_period, query_payment_terms, queryContractApprovalmagicLink, query_industries,
  query_active_contractors, query_temporary_plcaement_approvals_pending, query_hiring_manager_dashboard, query_draft_timesheet_chase, query_submitted_timesheet_chase, query_pending_client_approval_chase,
  query_contractor_dashboard, query_timesheet_approval_magiclink, isPlacementScheduleAllowed
} from "./query";
//get Agecy human_id
export const getAgencyHumanId = (uuid) => {
  cy.internalApiRequest(getHumanId(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/agency/apiData.json", { res });
  });
};
//get clinet human_id
export const getClientHumanId = (uuid) => {
  cy.internalApiRequest(getHumanId(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/client/apiData.json", { res });
  });
};
//get limited human_id
export const getLimitedHumanId = (uuid) => {
  cy.internalApiRequest(getHumanId(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/limited/apiData.json", { res });
  });
};
//get umbrella human_id
export const getUmbrellaHumanId = (uuid) => {
  cy.internalApiRequest(getHumanId(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/umbrella/apiData.json", { res });
  });
};
//get timesheet uuid
export const _getTmsuuid = (tms_human_id) => {
  cy.apiRequest(tms_id(tms_human_id)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/apiData.json", { res });
  });
};
//get request related details (placement details, client and contractor)
export const requestDetails = (request_uuid) => {
  cy.apiRequest(temp_request(request_uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/apiData.json", { res });
  });
};
// get request related business details (provider,Funder bank and tax details)
export const requestBuzDetails = (request_uuid, currency_id) => {
  cy.apiRequest(service_details(request_uuid, currency_id)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/apiDataV2.json", { res });
  });
};
//get contract contact details
export const placementDetails = (request_uuid) => {
  cy.apiRequest(contractDetails(request_uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/temp.json", { res });
  });
};
//get payement company bank and tax details
export const paymentCompanyDetails = (uuid) => {
  cy.apiRequest(getPaymentcompany(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/payment.json", { res });
  });
};
//get business user deatails (email and is_comfirmed , is_active)
export const buzContacts = (buzName) => {
  cy.internalApiRequest(getBuzContacts(buzName)).then((res) => {
    var res = res.body;
    cy.writeFile("cypress/fixtures/placement/buzContacts.json", { res });
  });
};
//get contractor payment company details
export const getPaymentService = (buzName) => {
  cy.internalApiRequest(paymentService(buzName)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/placement/paymentService.json", { res });
  });
};
//get placement associated users details (AC,HM,TMS,IC)
export const getContractContacts = (uuid) => {
  cy.internalApiRequest(contractBuzContact(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/placement/buzContacts.json", { res });
  });
};
//get palcement rates, timesheet and invoice details
export const getContractInfo = (uuid) => {
  cy.internalApiRequest(contractInfo(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/placement/apiData.json", { res });
  });
};
//get timesheet details , business tax , bank account for invoice calaculation
export const getTransactionDetails = (human_id) => {
  cy.internalApiRequest(tmsTransactionDetails(human_id)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/invoice/apiData.json", { res });
  });
};
//for get contract details
export const getContractDetails = (human_id) => {
  cy.internalApiRequest(transactionDetails(human_id)).then(res => {
    cy.writeFile("cypress/fixtures/contractDetails.json", res.body);
  });
};
// get Agency services
export const getAgencyClient = (uuid) => {
  cy.internalApiRequest(clientService(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/placement/apiData.json", { res });
  });
};
// get drop down options for the refinement
export const getRefinementOptions = () => {
  cy.internalApiRequest(refinementOptions()).then((res) => {
    cy.writeFile('cypress/fixtures/config/refinementOptions.json', res.body)
  })
}
//get timesheet details
export const getTmsDetails = (tms_id) => {
  cy.internalApiRequest(tms_details(tms_id)).then((res) => {
    const result = res.body;
    cy.writeFile("cypress/fixtures/timesheet/tmsResponse.json", { result });
  });
};

//getting invoices for ivoice generation validation
export const getInvoiceIfo = (human_id) => {
  cy.internalApiRequest(getInvoices(human_id)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/timesheet/apiData.json", { res });
  });
};

//get invoices mock data from mockaroo...
export const getInvMockData = () => {
  cy.mockarooApi("invoices").then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/invoice/inv.json", { res });
  });
};
//get  manual invoices mock data from mockaroo...
export const getManualInvoiceMockData = (module, fixtureName) => {
  cy.mockarooApi(module).then((res) => {
    res = res.body;
    cy.writeFile(`cypress/fixtures/${fixtureName}/${fixtureName}.json`, {
      res,
    });
  });
};
// function to get contract approval magic link mail
export const contractMagicLink = (contractType, email_id) => {
  cy.wait(120000)
  cy.internalApiRequest(queryContractApprovalmagicLink(contractType, email_id)).then(res => {
    cy.writeFile('cypress/fixtures/placement/contractMagicLink.json', res.body)
  })
}
// get manual invoices buz contacts details
export const getManualInvoiceBuzContacts = (buzName, fixtureName) => {
  cy.internalApiRequest(getBuzContacts(buzName)).then((res) => {
    res = res.body;
    cy.writeFile(`cypress/fixtures/${fixtureName}/buzContacts.json`, { res });
  })
};
// get agency client services for purchase ledger
export const getManualInvoiceAgencyServices = (uuid, fixtureName) => {
  cy.internalApiRequest(clientService(uuid)).then((res) => {
    res = res.body;
    cy.writeFile(`cypress/fixtures/${fixtureName}/apiData.json`, { res });
  });
};

// get contract human id for filter purpose
export const getContractHumanId = (uuid, fixtureName) => {
  cy.internalApiRequest(contractHumanId(uuid)).then((res) => {
    res = res.body;
    cy.writeFile(`cypress/fixtures/${fixtureName}/apiData.json`, { res });
  });
};

//get invoice details using transaction id
export const getInvoiceData = (uuid, fixtureName) => {
  cy.internalApiRequest(contractInfo(uuid)).then((res) => {
    res = res.body;
    cy.writeFile(`cypress/fixtures/${fixtureName}/apiData.json`, { res });
  });
};

//get timesheet human_id

export const getPayrollTimesheetDetails = (uuid) => {
  cy.internalApiRequest(payrollTimesheetDetails(uuid)).then((res) => {
    cy.writeFile(`cypress/fixtures/payrollTimesheet/apiData.json`, res.body);
  });
};

//get payroll timesheet invoices
export const getPayrollInv = (human_id) => {
  cy.internalApiRequest(getInvoices(human_id)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/payrollTimesheet/apiData.json", { res });
  });
};
//get user business id
export const getUserBuzId = (email) => {
  cy.log(email);
  cy.internalApiRequest(userBuzId(email)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/permission/apiData.json", { res });
  });
};
//get associated client buz details
export const getAssociatedClientDetails = (uuid) => {
  cy.internalApiRequest(associatedBuzDetails(uuid, "client")).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/permission/apiData1.json", { res });
  });
};
//get associated contractor buz details
export const getAssociatedContractorDetails = (uuid) => {
  cy.internalApiRequest(associatedBuzDetails(uuid, "contractor")).then(
    (res) => {
      res = res.body;
      cy.writeFile("cypress/fixtures/permission/apiData2.json", { res });
    }
  );
};
//get associated contractor buz details
export const getAssociatedContractDetails = (uuid, type, orderBy) => {
  cy.internalApiRequest(associatedContractDetails(uuid, type, orderBy)).then(
    (res) => {
      res = res.body;
      type == "temp_placement"
        ? cy.writeFile("cypress/fixtures/permission/apiData3.json", { res })
        : cy.writeFile("cypress/fixtures/permission/apiData4.json", { res });
    }
  );
};
//get associated sales ledger details
export const getAssociatedSalesLedger = (uuid) => {
  cy.internalApiRequest(salesLedger(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/permission/apiData5.json", { res });
  });
};
//get agency commission report details
export const getAgencyCommission = (uuid) => {
  cy.internalApiRequest(agencyCommissionReport(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/permission/apiData6.json", { res });
  });
};
//get provider fee report details
export const getProviderFeeReport = (uuid) => {
  cy.internalApiRequest(providerFee(uuid)).then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/permission/apiData7.json", { res });
  });
};
//get permission mock data
export const getPermissionMockData = () => {
  cy.mockarooApi("permission").then((res) => {
    res = res.body;
    cy.writeFile("cypress/fixtures/permission/permission.json", { res });
  });
};

// getting the configured currency from the portal
export const getCurrency = () => {
  cy.internalApiRequest(currency()).then(res => {
    cy.writeFile('cypress/fixtures/config/currency.json', res.body)
    cy.log(res.body)
  })
}

// getting the configured countries from the portal
export const getCountry = () => {
  cy.internalApiRequest(country()).then(res => {
    cy.writeFile('cypress/fixtures/config/country.json', res.body)
  })
}

// getting the support users from the portal
export const getSupportUsers = () => {
  cy.internalApiRequest(supportUsers()).then(res => {
    cy.writeFile('cypress/fixtures/config/supportUsers.json', res.body)
    cy.log(JSON.stringify(res.body))
  })
}
//getting the business details
export const getBusinessDetails = (uuid) => {
  cy.internalApiRequest(businessDetails(uuid)).then(res => {
    cy.writeFile('cypress/fixtures/businessResponse.json', res.body)
    cy.log(JSON.stringify(res.body))
  })
}
// api request to extract one-time password
export const extract_otp = (email_id) => {
  cy.internalApiRequest(getting_otp(email_id)).then(res => {
    cy.writeFile('cypress/fixtures/email.json', res.body)
  })
}
// api request to get the generated invoices
export const invoices = (human_id) => {
  cy.internalApiRequest(Invquery(human_id)).then((res) => {
    cy.writeFile('cypress/fixtures/Invoice.json', res)
  })
}
// api request to get the permanent placement details
export const getPermPlacementDetails = (human_id, currency, funding_type) => {
  cy.internalApiRequest(permPlacementDetails(human_id, currency, funding_type)).then(res => {
    cy.writeFile('cypress/fixtures/permPlacementDetailsResponse.json', res.body)
  })
}
// api request to get the purchase ledger details
export const getPurchaseLedgerDetails = (human_id) => {
  cy.internalApiRequest(puchaseLedgerDetails(human_id)).then(res => {
    cy.writeFile('cypress/fixtures/purchaseLedgerDetailsResponse.json', res.body)
  })
}
// api request to get the sales Invoice details
export const getSalesInvoiceDetails = (human_id) => {
  cy.internalApiRequest(salesInvoiceDetails(human_id)).then(res => {
    cy.writeFile('cypress/fixtures/salesInvoiceDetailsResponse.json', res.body)
  })
}
// api request to get the Adhoc fee details
export const getAdhocFeeDetails = (human_id) => {
  cy.internalApiRequest(adhocFeeDetails(human_id)).then(res => {
    cy.writeFile('cypress/fixtures/adhocFee/adhocFeeDetailsResponse.json', res.body)
  })
}
// api request to get the expense details
export const getExpenseDetails = (human_id) => {
  cy.internalApiRequest(expense(human_id)).then(res => {
    cy.writeFile('cypress/fixtures/Expense/expenseResponse.json', res.body)
  })
}
// Using randommer.io to get randomNames
export const getRandomFullName = () => {
  const count = 1
  const countryCode = 'en_GB'
  cy.request({
    url: `https://randommer.io/api/Name?nameType=fullname&quantity=${count}&culturecode=${countryCode}`,
    method: "GET",
    headers: {
      'x-Api-Key': "4b183d370a7e499ba9ba0b73485834dc"
    }
  }).then((res) => {
    cy.writeFile('cypress/fixtures/randomFullName.json', res)
  })
}
// Using randommer.io to get randomBusinessNames
export const getBusinessName = () => {
  const count = 1
  const countryCode = 'en_GB'
  cy.request({
    url: `https://randommer.io/api/Name/BusinessName?number=${count}&cultureCode=${countryCode}`,
    method: "POST",
    headers: {
      'x-Api-Key': "4b183d370a7e499ba9ba0b73485834dc"
    }
  }).then((res) => {
    cy.writeFile('cypress/fixtures/randomBusinessName.json', res)
  })
}
export const noticePeriod = () => {
  cy.internalApiRequest(query_notice_period()).then(res => {
    cy.writeFile('cypress/fixtures/config/noticePeriod.json', res.body)
  })
}
export const paymentTerms = () => {
  cy.internalApiRequest(query_payment_terms()).then(res => {
    cy.writeFile('cypress/fixtures/config/paymentTerms.json', res.body)
  })
}
export const industries = () => {
  cy.internalApiRequest(query_industries()).then(res => {
    cy.writeFile('cypress/fixtures/config/industries.json', res.body)
  })
}
// Hiring Manager Dashboard
export const getHiringManagerDashboard = (hiring_manager_email) => {
  cy.task('connectDB', query_hiring_manager_dashboard(hiring_manager_email)).then(res => {
    cy.writeFile('cypress/fixtures/dashboard_count/hiring_manager_dashboard_aggregate.json', { res })
  })
}

//Timesheet Approver Dashboard
export const getTimesheetApproverDashboard = (timesheet_approver_email) => {
  cy.task('connectDB', query_timesheet_approver_dashboard(timesheet_approver_email)).then(res => {
    cy.writeFile('cypress/fixtures/dashboard_count/timesheet_approver_dashboard_aggregate.json', res)
  })
}

//Invoice Contact Dashboard
export const getInvoiceContactDashboard = (invoice_contact_email) => {
  cy.task('connectDB', query_invoice_contact_dashboard(invoice_contact_email)).then(res => {
    cy.writeFile('cypress/fixtures/dashboard_count/invoice_contact_dashboard_aggregate.json', res)
  })
}

//Contractor Dashboard 
export const getContractorDashboard = (contractor_email) => {
  cy.task('connectDB', query_contractor_dashboard(contractor_email)).then(res => {
    cy.writeFile('cypress/fixtures/dashboard_count/contractor_dashboard_aggregate.json', res)
  })
}
// Draft Timesheet
export const getDraftTimesheetChaserEmail = (contractorEmail) => {
  cy.internalApiRequest(query_draft_timesheet_chase(contractorEmail)).then(emailRes => {
    cy.writeFile('cypress/fixtures/timesheet/draftTimesheetChaser.json', emailRes.body)
  })
}
// Submitted Timesheet
export const getSubmittedTimesheetChaserEmail = (timesheetApproverEmail) => {
  cy.internalApiRequest(query_submitted_timesheet_chase(timesheetApproverEmail)).then(emailRes => {
    cy.writeFile('cypress/fixtures/timesheet/submittedTimesheetChaser.json', emailRes.body)
  })
}
// Chase the PendingClientapproval
export const getPendingClientApprovalchaser = (hiring_manager_email) => {
  cy.internalApiRequest(query_pending_client_approval_chase(hiring_manager_email)).then(emailRes => {
    cy.writeFile('cypress/fixtures/placement/pendingClientApprovalChaser.json', emailRes.body)
  })
}
// Approve or Reject the timesheet by using magiclink

export const getMagicLinkForClientApprover = (timesheetApproverEmail) => {
  // cy.wait(120000)
  cy.internalApiRequest(query_timesheet_approval_magiclink(timesheetApproverEmail)).then(emailRes => {
    cy.writeFile('cypress/fixtures/timesheet/magicLinkClientTimesheet.json', emailRes.body)
  })
}

export const getAgencyFeatures = (agencyName) => {
  cy.internalApiRequest(isPlacementScheduleAllowed(agencyName)).then(res => {
    cy.writeFile('cypress/fixtures/placementScehdule.json', res.body)
  })
}