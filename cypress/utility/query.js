import { todayDate } from "./functions";
import { startOfWeek, startOfMonth, startOfQuarter, startOfYear, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const today = new Date();
const thisWeekStartDate = startOfWeek(today, { locale: enGB });
const startingDateOfThisWeek = format(thisWeekStartDate, 'yyyy-MM-dd')
const thisMonthStartDate = startOfMonth(today, { locale: enGB });
const startingDateOfThisMonth = format(thisMonthStartDate, 'yyyy-MM-dd')
const thisQuarterStartDate = startOfQuarter(today, { locale: enGB })
const startingDateOfThisQuarter = format(thisQuarterStartDate, 'yyyy-MM-dd')
const thisYearStartDate = startOfYear(today, { locale: enGB })
const startingDateOfThisYear = format(thisYearStartDate, 'yyyy-MM-dd')
//get business human id using uuid
export const getHumanId = (uuid) => {
  return `{
    platform_business(where:{id:{_eq: "${uuid}"}}){
      human_id
    }
  }`
};
//get timesheet details
export const tms_details = (tms_id) => {
  return `{
    fundo_timesheet(where: {human_id: {_eq: "${tms_id}"}}) {
      id
      start_date
      end_date
      status
      human_id
      agency_name
      client_name
      contractor_name
      contractor_payment_name
      type
      timesheet_details(where: {contract_rate: {effective_to: {_is_null: true}}}) {
        id
        date
        units
        contract_rate {
          name
          unit_type
          standard_units
          client_rate
          contractor_rate
        }
      }
      transaction_id
      contract {
        id
        status
        funding_type
        funding_model
        title
        human_id
        type
        contract_temp_placement {
          timesheet_frequency
        }
        contract_rates {
          id
          unit_type
          name
          contractor_rate
          client_rate
          standard_units
        }
        contract_business_contacts {
          type
          user {
            id
            name
            email
          }
        }
        contract_entities(where: {type: {_eq: "contractor"}}) {
          business {
            human_id
            individual {
              user {
                first_name
                last_name
                email
                is_active
                is_confirmed
              }
            }
          }
        }
        contractor_payment_id
        contractor_payment_name
      }
    }
  }
  `
};
//get temp placement req details
export const temp_request = (request_uuid) => {
  return `{
    platform_request(where: {id: {_eq: "${request_uuid}"}}, limit: 1) {
      id
      sid
      human_id
      data
      status
      created_at
      client {
        id
        name
        status
      }
      contractor {
        id
        name
      }
    }
  }`
};
//get business service details
export const service_details = (request_uuid, currency_id) => {
  return `{
    platform_request(where:{id:{_eq: "${request_uuid}"}}){
      id
      sid
      human_id
      status
      created_at
      business{
        name
        human_id
        bank_account{
          id
          bank_name
          account_number
          account_holder_name
          country_id
          currencies
        }
        business_taxes(where:{currency_id:{_eq:"${currency_id}"},effective_to:{_is_null:true}}){
          value
          currency_id
        }
      }
    }
  }`
};
//get payment company details
export const getPaymentcompany = (uuid, currency_id) => {
  return `{
    platform_business(where:{id:{_eq: "${uuid}"}}){
      id
      name
      human_id
      funding_model
      bank_account{
        id
        bank_name
        account_number
        account_holder_name
        iban
        sort_code
        swift_code
        country_id
      }
      business_taxes(where:{currency_id:{_eq: "${currency_id}"},effective_to:{_is_null:true}}){
        value
        currency_id
      }
    }
  }`
};
//get contract details
export const contractDetails = (request_uuid) => {
  return {
    variables: {},
    graphql: [
      {
        module: "platform",
        entity: "request",
        order_by: {},
        distinct_on: {},
        alias: "records",
        where: { id: { _eq: request_uuid } },
        fields: {
          id: true,
          sid: true,
          human_id: true,
          contract: {
            fields: {
              id: true,
              type: true,
              status: true,
              title: true,
              human_id: true,
              funding_model: true,
              start_date: true,
              end_date: true,
              contract_rate: {
                fields: {
                  id: true,
                  unit_type: true,
                  name: true,
                  contractor_rate: true,
                  client_rate: true,
                  standard_units: true,
                },
              },
              contract_entities: {
                where: {
                  type: { _eq: "contractor" },
                },
                fields: {
                  business: {
                    fields: {
                      human_id: true,
                      individual: {
                        fields: {
                          user: {
                            fields: {
                              first_name: true,
                              last_name: true,
                              email: true,
                              is_active: true,
                              is_confirmed: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              contract_business_contacts: {
                fields: {
                  id: true,
                  type: true,
                  user: {
                    fields: {
                      name: true,
                      email: true,
                      cognito_id: true,
                      is_active: true,
                      is_confirmed: true,
                    },
                  },
                },
              },
            },
          },
        },
        limit: 1,
        skipAttributeCriteria: true,
        skipWhere: false,
        action_list_code: "platform_request",
      },
    ],
  };
};
//get business contact details
export const getBuzContacts = (buzName) => {
  return `{
    platform_business(where: {name: {_eq: "${buzName}"}, business_contacts: {type: {_is_null: false}}}) {
      name
      business_contacts(where: {transaction_id: {_is_null: true}, user: {is_active: {_eq: true}, is_confirmed: {_eq: true}}}, distinct_on: type) {
        type
        user {
          name
          first_name
          last_name
          is_active
          is_confirmed
          email
        }
      }
    }
  }`
}
// quering the notice period drop down values from the config option table
export const query_notice_period = () => {
  return `{
      config_option(where: {module: {_eq: "fundo"}, entity: {_eq: "contract"}, type: {_eq: "notice_period"}, deleted_at: {_is_null: true}}) {
        id
        name
      }
    }`
}
// quering the payment terms drop down values from the config option table
export const query_payment_terms = () => {
  return `{
    config_option(where: {module: {_eq: "fundo"}, entity: {_eq: "funding"}, type: {_eq: "payment_terms"}, deleted_at: {_is_null: true}}) {
      name
    }
  }`
}
// quering the industry drop down values from the config option table
export const query_industries = () => {
  return `{
    config_option(where: {module: {_eq: "fundo"}, entity: {_eq: "agency"}, type: {_eq: "industry"}, deleted_at: {_is_null: true}}) {
      name
    }
  }`
}
//get contractor payment company details
export const paymentService = (buzName) => {
  return `{
    platform_business(where: {name: {_eq: "${buzName}"}}) {
      name
      human_id
      payment_type
      services_by_from_business(where: {type: {_in: ["contractor-selfemployed", "contractor-umbrella", "contractor-limited"]}, effective_to: {_is_null: true}, to_business: {status: {_eq: "onboarded"}}}) {
        type
        to_business {
          name
          human_id
          type
          status
        }
      }
    }
  }
  `
};
//This query for get contract buz contact details
export const contractBuzContact = (uuid) => {
  return {
    variables: {},
    graphql: [
      {
        module: "fundo",
        entity: "contract",
        order_by: {},
        distinct_on: {},
        alias: "records",
        where: { id: { _eq: uuid } },
        fields: {
          id: true,
          type: true,
          status: true,
          title: true,
          human_id: true,
          funding_model: true,
          start_date: true,
          end_date: true,
          contract_entities: {
            where: {
              type: { _eq: "contractor" },
            },
            fields: {
              business: {
                fields: {
                  human_id: true,
                  individual: {
                    fields: {
                      user: {
                        fields: {
                          first_name: true,
                          last_name: true,
                          email: true,
                          is_active: true,
                          is_confirmed: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          contract_business_contacts: {
            fields: {
              id: true,
              type: true,
              user: {
                fields: {
                  name: true,
                  email: true,
                  cognito_id: true,
                  is_active: true,
                  is_confirmed: true,
                },
              },
            },
          },
        },
        limit: 1,
        skipAttributeCriteria: true,
        skipWhere: false,
        action_list_code: "fundo_contract",
      },
    ],
  };
};
export const contractInfo = (uuid) => {
  return {
    variables: {},
    graphql: [
      {
        module: "fundo",
        entity: "contract",
        order_by: {},
        distinct_on: {},
        alias: "records",
        where: { id: { _eq: uuid } },
        fields: {
          id: true,
          type: true,
          status: true,
          title: true,
          human_id: true,
          funding_model: true,
          start_date: true,
          end_date: true,
          contract_temp_placement: {
            fields: {
              timesheet_frequency: true,
            },
          },
          contract_rates: {
            fields: {
              unit_type: true,
              contractor_rate: true,
              client_rate: true,
            },
          },
          contract_timesheets: {
            fields: {
              id: true,
              human_id: true,
              transaction_type: true,
              start_date: true,
              end_date: true,
              timesheet_details: {
                fields: {
                  id: true,
                  date: true,
                  units: true,
                  minutes: "unit_fraction",
                  hourly: "units",
                  daily: "units",
                },
              },
            },
          },
          placement_invoice_sets: {
            fields: {
              transaction_type: true,
              invoices: {
                fields: {
                  human_id: true,
                  generation_type: true,
                  type: true,
                },
              },
            },
          },
        },
        limit: 1,
        skipAttributeCriteria: true,
        skipWhere: false,
        action_list_code: "fundo_contract",
      },
    ],
  };
};
// tms and business tax data for invoice calculation query
export const tmsTransactionDetails = (human_id) => {
  return {
    graphql: [
      {
        module: "fundo",
        entity: "timesheet",
        order_by: {},
        distinct_on: {},
        alias: "records",
        where: {
          human_id: {
            _eq: human_id,
          },
        },
        fields: {
          id: true,
          start_date: true,
          end_date: true,
          status: true,
          human_id: true,
          agency_name: true,
          client_name: true,
          total_units: true,
          contractor_name: true,
          contractor_payment_name: true,
          invoice_sets: {
            fields: {
              unit_type: true,
              service_charge: {
                fields: {
                  id: true,
                  value: true,
                  effective_to: true,
                  effective_from: true,
                },
              },
              invoices: {
                fields: {
                  id: true,
                  human_id: true,
                  type: true,
                  amount: true,
                  tax_amount: true,
                  total_amount: true,
                },
              },
            },
          },
          timesheet_details: {
            fields: {
              id: true,
              date: true,
              units: true,
              minutes: "unit_fraction",
              contract_rate: {
                fields: {
                  id: true,
                  unit_type: true,
                  name: true,
                  contractor_rate: true,
                  client_rate: true,
                  standard_units: true,
                  is_default: true,
                },
              },
            },
          },
          contract: {
            fields: {
              id: true,
              status: true,
              funding_type: true,
              title: true,
              human_id: true,
              type: true,
              funding_model: true,
              base_currency_id: true,
              contract_entities: {
                fields: {
                  type: true,
                  bank_account: {
                    fields: {
                      id: true,
                      bank_name: true,
                      account_holder_name: true,
                      account_number: true,
                      country_id: true,
                    },
                  },
                  business_tax: {
                    fields: {
                      value: true,
                      currency_id: true,
                    },
                  },
                  invoicing_address: {
                    fields: {
                      id: true,
                      name: true,
                      line_1: true,
                      line_2: true,
                      line_3: true,
                      line_4: true,
                      city: true,
                      country_id: true,
                      zipcode: true,
                    },
                  },
                },
              },
              contract_temp_placement: {
                fields: {
                  timesheet_frequency: true,
                },
              },
              contractor_payment_id: true,
              contractor_payment_name: true,
            },
          },
        },
        limit: 1,
        action_list_code: "fundo_timesheet",
      },
    ],
  };
};
// contract details and entitiy tax details
export const transactionDetails = (human_id) => {
  return `{
    fundo_contract(where: {human_id: {_eq: "${human_id}"}}, limit: 1) {
      id
      human_id
      start_date
      type
      end_date
      type
      end_date
      status
      agency_name
      client_name
      contractor_name
      contract_rates(where: {effective_to: {_is_null: true}}) {
        id
        name
        client_rate
        contractor_rate
      }
      contractor_payment {
        id
        name
      }
      funding_type
      funding_model
      requisites
      hiring_manager_details {
        id
        name
        email
      }
      timesheet_approver_details {
        id
        name
        email
      }
      invoice_contact_details {
        id
        name
        email
      }
      currency {
        id
        name
        symbol
        alpha_code
      }
      base_currency_id
      contract_perm_placement {
        id
        invoice_value
      }
      invoices {
        human_id
        type
        amount
        tax_amount
        total_amount
      }
      contract_entities {
        type
        business {
          individual {
            user {
              id
              name
              email
            }
          }
          service_charges(where: {effective_to: {_is_null: true}}) {
            id
            value
            service_type
            fee_type
            funding_type
            effective_to
            effective_from
          }
        }
        bank_account {
          id
          bank_name
          account_number
          account_holder_name
          country_id
        }
        business_tax {
          value
          currency_id
        }
        invoicing_address {
          id
          name
          line_1
          line_2
          line_3
          line_4
          city
          country_id
          zipcode
        }
      }
    }
  }`
};
//invoice amount query
export const invoiceDetails = (inv1, inv2, inv3, inv4) => {
  return {
    graphql: [
      {
        module: "fundo",
        entity: "invoice",
        order_by: {},
        distinct_on: {},
        alias: "records",
        where: {
          human_id: {
            _in: [inv1, inv2, inv3, inv4],
          },
        },
        fields: {
          human_id: true,
          amount: true,
          tax_amount: true,
          total_amount: true,
          invoice_set: {
            fields: {
              fee_transactions: {
                fields: {
                  human_id: true,
                  amount: true,
                  tax_amount: true,
                  total_amount: true,
                },
              },
            },
          },
        },
        limit: 1,
        action_list_code: "fundo_timesheet",
      },
    ],
  };
};
// get agency's client service
export const clientService = (name) => {
  return `{
  platform_business(where: {name: {_eq: "${name}"}}) {
    services_by_to_business(where: {type: {_eq: "client-agency"}}, limit: 1) {
      type
      from_business {
        name
      }
    }
  }
}
`
};

//this query for invoice generation value
export const getInvoices = (human_id) => {
  return `{
    fundo_timesheet(where:{human_id:{_eq:"${human_id}"}}){
      contract{
        funding_model
      }
      invoice_sets{
        invoices{
          type
          amount
        }
      }
    }
  }`
};
//get contract human id using uuid
export const contractHumanId = (uuid) => {
  return `{
  fundo_contract(where:{id:{_eq:"${uuid}"}}){
    status
    human_id
    funding_model
  }
}`
};
//get contract invoices detais
export const contractInv = (uuid) => {
  return `{
    fundo_invoice(where: {invoice_set: {transaction_id: {_eq: "${uuid}"}}}) {
      invoice_set {
        invoices {
          human_id
          total_amount
          type
          generation_type
          amount
          tax_amount
          funding_model
        }
      }
    }
  }
  `
};

//get payroll timesheet details
export const payrollTimesheetDetails = (human_id) => {
  return `{
    fundo_timesheet(where: {human_id: {_eq: "${human_id}"}}) {
      human_id
      status
      start_date
      end_date
      contract_human_id
      client_name
      agency_name
      contractor_name
      contractor_payment_name
      funder_name
      contract {
        id
        status
        funding_type
        funding_model
        title
        human_id
        type
        contract_temp_placement {
          timesheet_frequency
        }
        contract_rates(where: {effective_to: {_is_null: true}}) {
          id
          unit_type
          name
          contractor_rate
          client_rate
          standard_units
        }
        contract_business_contacts {
          type
          user {
            id
            name
            email
          }
        }
      }
    }
  }`
};

//get user business id
export const userBuzId = (email) => {
  return `{
    platform_user(where: {email: {_eq: "${email}"}}) {
      id
      business_contacts(where: {preferences: {_neq: {}}}) {
        type
        business_id
      }
    }
  }
  `
};

//get associated client buz details
export const associatedBuzDetails = (uuid, entity) => {
  return `{
    platform_business(order_by:{updated_at:desc},where:{associated_business_ids:{_has_key:"${uuid}"}type:{_eq:${entity}},status:{_eq:"onboarded"}){
      name
      human_id
      status
      compliance_status
      company{
        brn
        website_url
      }
      individual{
        user{
          id
          first_name
          last_name
          email
          contact_phone
        }
      }
      to_credit_limits{
        amount
        currency_id
        outstanding_balance
        available_credit_limit
        overdue_balance
        aged_debt_balance
      }
    }
  }`
};
//get associated contract details
export const associatedContractDetails = (uuid, type, by) => {
  return `{
    fundo_contract(order_by:{[${by}]:desc},where:{agency_id:{_eq:"${uuid}"},type:{_eq:${type}}, status:{_neq:"draft"}}){
      id
      human_id
      status
      agency_id
      associated_user_ids
      start_date
      end_date
      timesheet_frequency
      title
     client_name
      contractor_name
      contract_perm_placement{
        total_amount
      }
      currency{
        id
        symbol
        alpha_code
      }
      country{
        id
        name
        alpha_2_code
      }
      agency_consultant_details{
        id 
        name
      }
    
    }
  }`
};
export const providerFee = (uuid) => {
  return `{
    fundo_invoice_set(where: {agency_id: {_eq: "${uuid}"}}) {
      agency_name
      funder_name
      client_name
      contractor_name
      generated_for
      timesheet_frequency
      placement {
        id
        title
      }
      invoices(where: {type: {_eq: "provider-agency"}}) {
        type
        human_id
        raised_date
        funding_type
        amount
        tax_amount
        total_amount
        due_date
        status
        outstanding_balance
        is_part_paid
        timesheet {
          id
          end_date
          timesheet_details {
            contract_rate {
              is_default
            }
          }
        }
        currency {
          id
          alpha_code
        }
      }
    }
  }
  `
};
export const expense = (human_id) => {
  return `{
    fundo_expense(where: {human_id: {_eq: "${human_id}"}}) {
      id
      human_id
      status
      agency {
        id
        human_id
        name
        service_charges(where: {effective_to: {_is_null: true}, service_type: {_eq: "expense"}}) {
          id
          value
          type
          funding_type
          service_type
          fee_type
          effective_from
          effective_to
        }
      }
      contract {
        id
        human_id
        currency {
          id
          symbol
          name
          alpha_code
        }
        timesheet_approver_details {
          id
          name
          email
        }
      }
      contractor {
        individual {
          user {
            email
            name
          }
        }
      }
    }
  }`
}
// query to get the configured currency from the portal
export const currency = () => {
  return `{
    config_currency{
      id
      name
      symbol
      alpha_code
    }
  }`
}
// query to get the configured country from the portal
export const country = () => {
  return `{
    config_country {
      id
      name
      alpha_3_code
    }
  }`
}
// query to get the configured industry types from config_option table
export const industry = () => {
  return `{
    config_option(where: {type: {_eq: "industry"}, is_active: {_eq: true}}}) {
      id
      name
      is_active
    }
  }`
}
// query to get the configured Agency user types from config_option table
export const agencyUserTypes = () => {
  return `{
    config_option(where: {module: {_eq: "fundo"}, entity: {_eq: "agency"}, type: {_eq: "user_type"}, is_active: {_eq: true}}) {
      id
      name
      is_active
    }
  }`
}
// query to get the configured client user types from config_option table
export const clientUserTypes = () => {
  return `{
    config_option(where: {module: {_eq: "fundo"}, entity: {_eq: "client"}, type: {_eq: "user_type"}, is_active: {_eq: true}}) {
      id
      name
      is_active
    }
  }`
}
// query to get the support users from the portal
export const supportUsers = () => {
  return `{
      platform_user(limit: 50, order_by: {name: asc_nulls_last}, where: {_and: {business_contacts: {business: {type: {_eq: "provider"}}}}}) {
        id
        name
        email
        first_name
        last_name
      }
    }`
}
// query to get the business details
export const businessDetails = (uuid) => {
  return `{
      platform_business(where: {id: {_eq: "${uuid}"}}) {
        id
        human_id
        name
        status
        funding_model
      }
  }`
}
//query to get the welcome mail details
export const getting_otp = (email_id) => {
  const Region = Cypress.env('REGION');
  if (Region === 'beta') {
    return `{
        log_mail(where: {subject: {_eq: "[${Region.toUpperCase()}] Welcome To Raise"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          is_sent
          to
          from
          status
          subject
          body
        }
    }`
  } else if (Region) {
    return `{
        log_mail(where: {subject: {_eq: "[${Region}] Welcome To Raise"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          is_sent
          to
          from
          status
          subject
          body
        }
    }`
  } else {
    return `{
      log_mail(where: {subject: {_eq: "Welcome To Raise"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
        id
        is_sent
        to
        from
        status
        subject
        body
      }
  }`
  }
}

// query to get the auto generated timesheets
export const timesheets = (uuid) => {
  return `{
    fundo_timesheet(where:{transaction_id:{_eq:"${uuid}"}}){
      id
      status
      human_id
      start_date
      end_date
    }
  }`
}
// query to get the generated invoices for the specific transaction id
export const Invquery = (transaction_human_id) => {
  return `{
    fundo_invoice(where: {invoice_set: {generated_for: {_eq: "${transaction_human_id}"}}}) {
      id
      human_id
      status
      finance_status
      amount
      tax_amount
      outstanding_balance
      is_debit
      type
      generation_type
      funding_model
      funding_type
      invoice_set {
        fee_transactions {
          id
          human_id
          type
          amount
          tax_amount
          payment_status
          status
        }
      }
    }
  }`
}
// query to get the perm placement details
export const permPlacementDetails = (human_id, currencyName, funding_type) => {
  return `{
    fundo_contract(where: {human_id: {_eq: "${human_id}"}}) {
      id
      type
      contract_perm_placement {
        id
        invoice_value
        candidate_name
        total_amount
        is_active
        contract_start_date
        description
      }
      contract_entities {
        id
        business {
          id
          name
          human_id
          type
          business_taxes(where: {effective_to: {_is_null: true}, currency: {name: {_eq: "${currencyName}"}}}) {
            id
            value
            type
            is_vat_applicable
            effective_to
            currency {
              id
              name
              alpha_code
            }
          }
          service_charges(where: {service_type: {_eq: "perm_placement"}, effective_to: {_is_null: true}, funding_type: {_eq: "${funding_type}"}}) {
            value
            type
            fee_type
            funding_type
            service_type
            effective_to
          }
        }
      }
    }
  }
  `
}
// query to get the purchase ledger details
export const puchaseLedgerDetails = (human_id) => {
  return `{
    fundo_contract(where: {human_id: {_eq: "${human_id}"}}) {
      id
      type
      requisites
      contract_entities {
        id
        business {
          id
          name
          human_id
          type
          business_taxes(where: {effective_to: {_is_null: true}}) {
            id
            value
            type
            is_vat_applicable
            effective_to
            currency {
              id
              name
              alpha_code
            }
          }
        }
      }
    }
}`
}
// query to get the sales invoice details
export const salesInvoiceDetails = (human_id) => {
  return `{
    fundo_contract(where: {human_id: {_eq: "${human_id}"}}) {
      id
      type
      requisites
      contract_entities {
        id
        business {
          id
          name
          human_id
          type
          business_taxes(where: {effective_to: {_is_null: true}}) {
            id
            value
            type
            is_vat_applicable
            effective_to
            currency {
              id
              name
              alpha_code
            }
          }
        }
      }
    }
}`
}
// query to get the adhoc fee invoice details
export const adhocFeeDetails = (human_id) => {
  return `{
      fundo_contract(where: {human_id: {_eq: "${human_id}"}}) {
        id
        type
        requisites
        contract_entities {
          id
          business {
            id
            name
            human_id
            type
            business_taxes(where: {effective_to: {_is_null: true}}) {
              id
              value
              type
              is_vat_applicable
              effective_to
              currency {
                id
                name
                alpha_code
              }
            }
          }
        }
      }
  }`
}
// query to get Contract approval magic link
export const queryContractApprovalmagicLink = (contractType, email_id) => {
  const Region = Cypress.env('REGION');
  if (contractType == 'temp') {
    if (Region == 'beta') {
      return `{
        log_mail(where: {subject: {_eq: "[${Region.toUpperCase()}] Action required : Placement submitted for verification"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          subject
          is_sent
          cc
          body
        }
    }`
    } else if (Region) {
      return `{
        log_mail(where: {subject: {_eq: "[${Region}] Action required : Placement submitted for verification"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          subject
          is_sent
          cc
          body
        }
      }`
    } else {
      return `{
        log_mail(where: {subject: {_eq: "Action required : Placement submitted for verification"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          subject
          is_sent
          cc
          body
        }
      }`
    }
  } else if (contractType == 'perm') {
    if (Region == 'beta') {
      return `{
        log_mail(where: {subject: {_eq: "[${Region.toUpperCase()}] Action required : Placement submitted for verification"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          subject
          is_sent
          cc
          body
        }
    }`
    } else if (Region) {
      return `{
        log_mail(where: {subject: {_eq: "[${Region}] Action required : Placement submitted for verification"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          subject
          is_sent
          cc
          body
        }
      }`
    } else {
      return `{
        log_mail(where: {subject: {_eq: "Action required : Placement submitted for verification"}, to: {_has_key: "${email_id}"}}, order_by: {created_at: desc}) {
          id
          subject
          is_sent
          cc
          body
        }
      }`
    }
  }

}
// Config options for the refinement
export const refinementOptions = () => {
  return `{
    config_option(where: {module: {_eq: "fundo"}, entity: {_eq: "refinement"}, type: {_eq: "type"}}) {
      name
      is_active
    }
  }`
}
// Hiring manager dashboard 
export const query_hiring_manager_dashboard = (hiring_manager_email) => {
  return `WITH ActiveContractors AS (
    SELECT COUNT(DISTINCT fc.contractor_id) AS "Active contractor"
    FROM platform.user pu
    JOIN platform.business_contact pbc ON pu.id = pbc.user_id AND pu.email = '${hiring_manager_email}'
    JOIN fundo.contract fc ON fc.id = pbc.transaction_id AND fc.type = 'temp_placement'
),

PendingApprovalForPlacementChange AS (
    SELECT COUNT(pcrfa.status) AS "Pending approval for placement details change"
    FROM platform.user pu
    JOIN platform.business_contact pbc ON pu.id = pbc.user_id AND pu.email = '${hiring_manager_email}' 
    AND pbc.effective_to IS NULL AND pbc.type = '[ "hiring_manager" ]'
    JOIN fundo.contract fc ON fc.id = pbc.transaction_id AND fc.status IN ('active','expired') AND fc.type ='temp_placement' 
    JOIN platform.change_request_flow_approval pcrfa ON fc.id = pcrfa.transaction_id AND pcrfa.business_type = 'client'
    AND pcrfa.status = 'pending' AND pcrfa.is_active AND pcrfa.is_most_recent 
    GROUP BY pcrfa.status
),
Tempplacementpendingapproval AS(
    SELECT count(*) AS "Temp Placement pending approval"
    FROM fundo.contract fc
    JOIN platform.business_contact pbc
    ON fc.id = pbc.transaction_id AND fc.status = 'pending_approval_client' AND fc.type = 'temp_placement' AND pbc.type::text ILIKE '%hiring_manager%' 
    AND pbc.effective_to IS NULL
    JOIN platform.user pu
    ON pu.id = pbc.user_id AND pu.email = '${hiring_manager_email}' 
),
Permplacementpendingapproval AS (
    SELECT count(*) AS "Perm placement pending approval"
    FROM fundo.contract fc
    JOIN platform.business_contact pbc
    ON fc.id = pbc.transaction_id AND fc.status = 'pending_approval_client' AND fc.type = 'perm_placement' AND (pbc.type::text ILIKE '%hiring_manager%' 
    OR pbc.type::text ILIKE '%invoice_contact%') 
    AND pbc.effective_to IS NULL
    JOIN platform.user pu
    ON pu.id = pbc.user_id AND pu.email = '${hiring_manager_email}' 
    GROUP BY fc.type
),
Activetemporaryplacements AS (
    SELECT COUNT(fc.status) AS "Active temporary placements"
    FROM platform.user pu
    JOIN platform.business_contact pbc
    ON pu.id = pbc.user_id AND pu.email = '${hiring_manager_email}' AND pbc.effective_to IS NULL AND pbc.type = '[ "hiring_manager" ]'
    JOIN fundo.contract fc
    ON fc.id = pbc.transaction_id AND fc.status = 'active' AND fc.type ='temp_placement' 
    GROUP BY fc.status
),
ActiveTempPlacements AS ( SELECT pb.name Contractor_name,(fc.end_date-Current_date)+1 AS "Contract Days Left"
   FROM platform.user pu
   JOIN platform.business_contact pbc
   ON pu.id = pbc.user_id AND pu.email ='${hiring_manager_email}' 
   JOIN fundo.contract fc
   ON fc.id = pbc.transaction_id AND fc.status = 'active' AND fc.type ='temp_placement'
   JOIN platform.business pb 
   ON pb.id=fc.contractor_id
   ORDER BY (fc.end_date-Current_date)+1 ASC
   LIMIT 5
),
NewPlacementStarting AS (
  SELECT fc.type AS "Placement this week",COUNT(fc1.type) AS "This week",COUNT(fc2.type) AS "This month",COUNT(fc3.type) AS "This Quarter",COUNT(fc4.type) AS "This Year"
  FROM platform.user pu
  JOIN platform.business_contact pbc
  ON pu.id = pbc.user_id AND pu.email = '${hiring_manager_email}' AND pbc.type::text LIKE '%hir%' AND pbc.effective_to ISNULL 
  JOIN fundo.contract fc
  ON fc.id = pbc.transaction_id
  LEFT JOIN fundo.contract fc1
  ON fc1.id = pbc.transaction_id AND fc1.start_date >= date_trunc('week',CURRENT_DATE) AND fc1.status IN ('active','scheduled','expired')
  LEFT JOIN fundo.contract fc2
  ON fc2.id = pbc.transaction_id AND fc2.start_date >= date_trunc('month',CURRENT_DATE) AND fc2.status IN ('active','scheduled','expired')
  LEFT JOIN fundo.contract fc3
  ON fc3.id = pbc.transaction_id AND fc3.start_date >= DATE_TRUNC('quarter',CURRENT_DATE) AND fc3.status IN ('active','scheduled','expired')
  LEFT JOIN fundo.contract fc4
  ON fc4.id = pbc.transaction_id AND fc4.start_date >= DATE_TRUNC('year',CURRENT_DATE) AND fc4.status IN ('active','scheduled','expired')
  GROUP BY fc.type
)
SELECT * FROM ActiveContractors, PendingApprovalForPlacementChange,Tempplacementpendingapproval,Permplacementpendingapproval,Activetemporaryplacements,ActiveTempPlacements,NewPlacementStarting;`
}
// Timesheet Approver - Dashboard
export const query_timesheet_approver_dashboard = (timesheet_approver_email) => {
  return `SELECT count(*) AS "Timesheet pending approval"
  FROM fundo.timesheet ft
  JOIN fundo.contract fc
  ON ft.transaction_id = fc.id AND ft.status = 'submitted' AND ft.type = 'autogenerated'
  JOIN platform.business_contact pbc
  ON fc.id = pbc.transaction_id
  JOIN platform.user pu
  ON pu.id = pbc.user_id AND pu.email = '${timesheet_approver_email}'`
}
// Invoice Contact - Dashboard
export const query_invoice_contact_dashboard = (invoice_contact_email) => {
  return `WITH InvoicesOverdue AS ( SELECT pb.name AS "Business name",COUNT(fi.status) AS "Invoices overdue"
  FROM fundo.invoice fi
  JOIN fundo.contract fc 
  ON fc.id = fi.contract_id AND due_date < current_date AND fi.type IN ('provider-client','agency-client') AND fi.status = 'open'
  JOIN platform.business_contact pbc
  ON fc.id = pbc.transaction_id AND pbc.effective_to IS NULL 
  JOIN platform.business pb
  ON pb.id = pbc.business_id
  JOIN platform.user pu
  ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}'
  GROUP BY fi.status,pb.name
),

InvoicesDisallowed AS ( SELECT pb.name AS "Business name",COUNT(fi1.is_disallowed) AS "Invoices Disallowed"
  FROM fundo.invoice fi
  JOIN fundo.contract fc 
  ON fc.id = fi.contract_id 
  LEFT JOIN fundo.invoice fi1 
  ON fc.id = fi1.contract_id AND fi1.due_date < current_date AND fi1.type IN ('provider-client','agency-client') AND fi1.status = 'open' AND fi1.is_disallowed 
  JOIN platform.business_contact pbc
  ON fc.id = pbc.transaction_id AND pbc.effective_to IS NULL 
  JOIN platform.business pb
  ON pb.id = pbc.business_id
  JOIN platform.user pu
  ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}'
  GROUP BY fi1.is_disallowed,pb.name
),
OutstandingInvoices AS ( SELECT pb.name AS "Business name",cc.alpha_code AS "Currency",COUNT(fi.status) AS "Outstanding invoices"
  FROM fundo.invoice fi
  JOIN fundo.contract fc 
  ON fc.id = fi.contract_id AND fi.type IN ('provider-client','agency-client') AND fi.status = 'open'
  JOIN platform.business_contact pbc
  ON fc.id = pbc.transaction_id 
  JOIN platform.business pb
  ON pb.id = pbc.business_id
  JOIN platform.user pu
  ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}'
  JOIN config.currency cc
  ON cc.id = fi.currency_id 
  GROUP BY fi.status,cc.alpha_code,pb.name
),
Invoices0to30Days AS ( SELECT pb.name AS "Business name",cc.name,cc.alpha_code,CONCAT(cc.symbol, TO_CHAR(SUM(fi.outstanding_balance), 'FM999,999,999.00')) AS "Total Cost 0-30",COUNT(*) "0-30 days count"
   FROM fundo.invoice fi
   JOIN fundo.invoice_set fis
   ON fis.id = fi.invoice_set_id AND ((CURRENT_DATE - fi.raised_date)  BETWEEN 0 AND 30) AND  fi.type IN ('provider-client','agency-client') AND fi.status = 'open' AND fi.is_active
   JOIN fundo.contract fc 
   ON fc.id = fis.contract_id
   JOIN platform.business_contact pbc
   JOIN platform.business pb
   ON pb.id = pbc.business_id
   ON pbc.transaction_id = fc.id AND pbc.type = '["invoice_contact"]' AND pbc.effective_to IS NULL
   JOIN platform.user pu 
   ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}' AND fis.associated_user_ids @> jsonb_build_array(pu.id)
   JOIN config.currency cc 
   ON cc.id = fi.currency_id 
   GROUP BY cc.name,cc.alpha_code,pb.name,cc.symbol
),
Invoices31to60Days AS ( SELECT pb.name AS "Business name",cc.name,cc.alpha_code,CONCAT(cc.symbol, TO_CHAR(SUM(fi.outstanding_balance), 'FM999,999,999.00')) AS "Total Cost 31-60",COUNT(*) "31-60 days count"
   FROM fundo.invoice fi
   JOIN fundo.invoice_set fis
   ON fis.id = fi.invoice_set_id AND ((CURRENT_DATE - fi.raised_date)  BETWEEN 31 AND 60) AND  fi.type IN ('provider-client','agency-client') AND fi.status = 'open' AND fi.is_active
   JOIN fundo.contract fc 
   ON fc.id = fis.contract_id
   JOIN platform.business_contact pbc 
   ON pbc.transaction_id = fc.id AND pbc.type = '["invoice_contact"]' AND pbc.effective_to IS NULL
   JOIN platform.business pb
   ON pb.id = pbc.business_id
   JOIN platform.user pu 
   ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}' AND fis.associated_user_ids @> jsonb_build_array(pu.id)
   JOIN config.currency cc 
   ON cc.id = fi.currency_id 
   GROUP BY cc.name,cc.alpha_code,pb.name,cc.symbol
),
Invoices61to90Days AS ( SELECT pb.name AS "Business name",cc.name,cc.alpha_code,CONCAT(cc.symbol, TO_CHAR(SUM(fi.outstanding_balance), 'FM999,999,999.00')) AS "Total Cost 61-90",COUNT(*) "61-90 days count"
   FROM fundo.invoice fi
   JOIN fundo.invoice_set fis
   ON fis.id = fi.invoice_set_id AND ((CURRENT_DATE - fi.raised_date)  BETWEEN 61 AND 90) AND  fi.type IN ('provider-client','agency-client') AND fi.status = 'open' AND fi.is_active
   JOIN fundo.contract fc 
   ON fc.id = fis.contract_id
   JOIN platform.business_contact pbc ON pbc.transaction_id = fc.id AND pbc.type = '["invoice_contact"]' AND pbc.effective_to IS NULL
   JOIN platform.business pb
   ON pb.id = pbc.business_id
   JOIN platform.user pu 
   ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}' AND fis.associated_user_ids @> jsonb_build_array(pu.id)
   JOIN config.currency cc 
   ON cc.id = fi.currency_id 
   GROUP BY cc.name,cc.alpha_code,pb.name,cc.symbol
),
Invoices91to120Days AS ( SELECT pb.name AS "Business name",cc.name,cc.alpha_code,CONCAT(cc.symbol, TO_CHAR(SUM(fi.outstanding_balance), 'FM999,999,999.00')) AS "Total Cost 91-120",COUNT(*) "90-120 days count"
   FROM fundo.invoice fi
   JOIN fundo.invoice_set fis
   ON fis.id = fi.invoice_set_id AND ((CURRENT_DATE - fi.raised_date)  BETWEEN 90 AND 120) AND  fi.type IN ('provider-client','agency-client') AND fi.status = 'open' AND fi.is_active
   JOIN fundo.contract fc 
   ON fc.id = fis.contract_id
   JOIN platform.business_contact pbc 
   ON pbc.transaction_id = fc.id AND pbc.type = '["invoice_contact"]' AND pbc.effective_to IS NULL
   JOIN platform.business pb
   ON pb.id = pbc.business_id
   JOIN platform.user pu 
   ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}' AND fis.associated_user_ids @> jsonb_build_array(pu.id)
   JOIN config.currency cc 
   ON cc.id = fi.currency_id 
   GROUP BY cc.name,cc.alpha_code,pb.name,cc.symbol
),
Invoicesmore120Days AS ( SELECT pb.name AS "Business name",cc.name,cc.alpha_code,CONCAT(cc.symbol, TO_CHAR(SUM(fi.outstanding_balance), 'FM999,999,999.00')) AS "Total Cost>120",COUNT(*) ">120 days count"
   FROM fundo.invoice fi
   JOIN fundo.invoice_set fis
   ON fis.id = fi.invoice_set_id AND ((CURRENT_DATE - fi.raised_date)> 120) AND  fi.type IN ('provider-client','agency-client') AND fi.status = 'open' AND fi.is_active
   JOIN fundo.contract fc 
   ON fc.id = fis.contract_id
   JOIN platform.business_contact pbc 
   ON pbc.transaction_id = fc.id AND pbc.type = '["invoice_contact"]' AND pbc.effective_to IS NULL
   JOIN platform.business pb
   ON pb.id = pbc.business_id
   JOIN platform.user pu 
   ON pu.id = pbc.user_id AND pu.email = '${invoice_contact_email}' AND fis.associated_user_ids @> jsonb_build_array(pu.id)
   JOIN config.currency cc 
   ON cc.id = fi.currency_id 
   GROUP BY cc.name,cc.alpha_code,pb.name,cc.symbol
)
SELECT * FROM InvoicesOverdue,InvoicesDisallowed,OutstandingInvoices,Invoices0to30Days,Invoices31to60Days,Invoices61to90Days,Invoices91to120Days,Invoicesmore120Days;`
}

//Contractor - Dashboard 
export const query_contractor_dashboard = (contractor_email) => {
  return `WITH TimesheetToSubmit AS ( SELECT count(*) AS "Timesheet to submit"
  FROM platform.user pu
  JOIN platform.individual pi
  ON pu.id = pi.user_id AND pu.email = '${contractor_email}'
  JOIN platform.business pb
  ON pi.id = pb.parent_id
  JOIN fundo.contract fc
  ON fc.contractor_id = pb.id 
  JOIN fundo.timesheet ft
  ON ft.transaction_id = fc.id AND ft.status = 'draft' AND ft.details :: text ilike '%false%'
),
TimesheetPendingApproval AS ( SELECT count(*) AS "Timesheets pending approval"
  FROM platform.user pu
  JOIN platform.individual pi 
  ON pu.id = pi.user_id AND pu.email = '${contractor_email}'
  JOIN platform.business pb
  ON pi.id = pb.parent_id
  JOIN fundo.contract fc
  ON fc.contractor_id = pb.id 
  JOIN fundo.timesheet ft
  ON ft.transaction_id = fc.id AND ft.status = 'submitted' AND ft.details :: text ilike '%false%'
),
PendingApprovalForPlacementDetailsChange AS ( SELECT COUNT(pcrfa.status) AS "Pending approval for placement details change"
   FROM platform.user pu
   JOIN platform.individual pi 
   ON pu.id = pi.user_id AND pu.email = '${contractor_email}'
   JOIN platform.business pb
   ON pi.id = pb.parent_id
   JOIN fundo.contract fc
   ON fc.contractor_id =pb.id AND fc.status IN ('active','expired') AND fc.type ='temp_placement' 
   JOIN platform.change_request_flow_approval pcrfa
   ON fc.id = pcrfa.transaction_id AND pcrfa.business_type = 'contractor' AND pcrfa.status = 'pending' AND pcrfa.is_active AND pcrfa.is_most_recent 
   GROUP BY pcrfa.status
),
PlacementToAccept AS ( SELECT count(*) AS "Placement to accept"
  FROM platform.user pu
  JOIN platform.individual pi 
  ON pu.id = pi.user_id AND pu.email = '${contractor_email}'
  JOIN platform.business pb
  ON pi.id = pb.parent_id
  JOIN fundo.contract fc
  ON fc.contractor_id = pb.id AND fc.status = 'pending_approval_contractor'
),
YearToDate AS (   SELECT CONCAT (cc.symbol,TO_CHAR(sum(fi.total_amount),'FM999,999,999.00')) AS "Year to Date"
FROM platform.user pu
JOIN platform.individual pi 
ON pu.id = pi.user_id AND pu.email ='${contractor_email}'
JOIN platform.business pb
ON pi.id = pb.parent_id
JOIN fundo.contract fc
ON fc.contractor_id = pb.id
JOIN fundo.invoice fi
ON fi.contract_id = fc.id AND fi.type ='contractor-agency' AND fi.raised_date>= DATE_TRUNC('year', current_date)
JOIN config.currency cc
ON cc.id = fi.currency_id 
GROUP BY cc.symbol
),
LastInvoice AS (   
  SELECT CONCAT (cc.symbol,TO_CHAR(fi.total_amount,'FM999,999,999.00')) AS "Last Invoice"
  FROM platform.user pu
  JOIN platform.individual pi 
  ON pu.id = pi.user_id AND pu.email = '${contractor_email}'
  JOIN platform.business pb
  ON pi.id = pb.parent_id
  JOIN fundo.contract fc
  ON fc.contractor_id = pb.id
  JOIN fundo.invoice fi
  ON fi.contract_id = fc.id AND fi.type ='contractor-agency'
  JOIN config.currency cc
  ON cc.id = fi.currency_id 
  GROUP BY fi.total_amount,cc.symbol,fi.created_at
  ORDER BY fi.created_at DESC
  LIMIT 1
),
CurrentPlacement AS ( SELECT COUNT(*) AS "Current Placement"
  FROM platform.user pu
  JOIN platform.individual pi 
  ON pu.id = pi.user_id AND pu.email ='${contractor_email}'
  JOIN platform.business pb
  ON pi.id = pb.parent_id 
  JOIN fundo.contract fc
  ON fc.contractor_id = pb.id AND fc.status ='active' AND fc.is_active AND fc.deleted_at IS NULL AND fc.start_date <= CURRENT_DATE AND fc.end_date>= CURRENT_DATE
),
ContractDaysLeft AS ( SELECT fc.title AS "Current placement",(fc.end_date-CURRENT_DATE)+1 AS "Contract Days Left"
  FROM platform.user pu
  JOIN platform.individual pi 
  ON pu.id = pi.user_id AND pu.email ='${contractor_email}'
  JOIN platform.business pb
  ON pi.id = pb.parent_id
  JOIN fundo.contract fc
  ON fc.contractor_id = pb.id AND fc.status ='active' AND CURRENT_DATE BETWEEN fc.start_date AND fc.end_date
  ORDER BY (fc.end_date-CURRENT_DATE)+1 ASC
  LIMIT 5
),
UpcomingPlacements AS ( SELECT COUNT(fc.id) AS "Upcoming Placement",fc.title,TO_CHAR(fc.start_date, 'DD Mon YYYY') AS start_date
FROM platform.user pu
JOIN platform.individual pi 
ON pu.id = pi.user_id AND pu.email = '${contractor_email}'
JOIN platform.business pb ON pi.id = pb.parent_id
LEFT JOIN fundo.contract fc ON fc.contractor_id = pb.id AND fc.start_date > CURRENT_DATE
GROUP BY fc.title, start_date
)
SELECT * FROM TimesheetToSubmit,TimesheetPendingApproval,PendingApprovalForPlacementDetailsChange,PlacementToAccept,YearToDate,LastInvoice,CurrentPlacement,ContractDaysLeft,UpcomingPlacements;`
}

// Timesheet Chase Contractor - Draft TMS
export const query_draft_timesheet_chase = (contractorEmail) => {
  const Region = Cypress.env('REGION');
  if (Region === 'beta') {
    return `{
      log_mail(order_by: { created_at: desc }, limit: 20, where: { to: { _contains: "${contractorEmail}" }, subject: { _like: "[${Region.toUpperCase()}] Draft Timesheet Reminder" } }) {
        id
        is_sent
        subject
        to
      }
    } `
  } else if (Region) {
    return `{
      log_mail(order_by: { created_at: desc }, limit: 20, where: { to: { _contains: "${contractorEmail}" }, subject: { _like: "[${Region}] Draft Timesheet Reminder" } }) {
        id
        is_sent
        subject
        to
      }
    } `
  } else {
    return `{
      log_mail(order_by: { created_at: desc }, limit: 20, where: { to: { _contains: "${contractorEmail}" }, subject: { _like: "Draft Timesheet Reminder" } }) {
        id
        is_sent
        subject
        to
      }
    } `
  }
}
// Timesheet Chase Contractor - Submitted TMS
export const query_submitted_timesheet_chase = (timesheetApproverEmail) => {
  const Region = Cypress.env('REGION');
  if (Region === 'beta') {
    return `{
      log_mail(order_by: { created_at: desc }, limit: 20, where: { to: { _contains: "${timesheetApproverEmail}" }, subject: { _like: "[${Region.toUpperCase()}] Timesheet Submitted - Please Approve" } }) {
        id
        is_sent
        subject
        to
      }
    } `
  } else if (Region) {
    return `{
      log_mail(order_by: { created_at: desc }, limit: 20, where: { to: { _contains: "${timesheetApproverEmail}" }, subject: { _like: "[${Region}] Timesheet Submitted - Please Approve" } }) {
        id
        is_sent
        subject
        to
      }
    } `
  } else {
    return `{
      log_mail(order_by: { created_at: desc }, limit: 20, where: { to: { _contains: "${timesheetApproverEmail}" }, subject: { _like: "Timesheet Submitted - Please Approve" } }) {
        id
        is_sent
        subject
        to
      }
    }`
  }
}

// Placement Chaser - Pending client approval
export const query_pending_client_approval_chase = (hiring_manager_email) => {
  const Region = Cypress.env('REGION');
  if (Region === 'beta') {
    return `{
      log_mail(where: {subject: {_like: "[${Region.toUpperCase()}] Action required : Placement submitted for verification"}, to: {_contains: "${hiring_manager_email}"}},limit: 10, order_by: {created_at: desc}) {
        id
        is_sent
        subject
        to
      }
    }
    `
  } else if (Region) {
    return `{
      log_mail(where: {subject: {_like: "[${Region}] Action required : Placement submitted for verification"}, to: {_contains: "${hiring_manager_email}"}},limit: 10, order_by: {created_at: desc}) {
        id
        is_sent
        subject
        to
      }
    }`
  } else {
    return `{
      log_mail(where: {subject: {_like: "Action required : Placement submitted for verification"}, to: {_contains: "${hiring_manager_email}"}},limit: 10, order_by: {created_at: desc}) {
        id
        is_sent
        subject
        to
      }
    }`
  }
}


export const query_timesheet_approval_magiclink = (timesheetApproverEmail) => {
  const Region = Cypress.env('REGION');
  if (Region === 'beta') {
    return `{
      log_mail(where: {subject: {_like: "[${Region.toUpperCase()}] Timesheet Submitted - Please Approve"}, to: {_contains: "${timesheetApproverEmail}"}},limit: 5, order_by: {created_at: desc}) {
        is_sent
        subject
        to
    		body
    		id
      }
    }`
  } else if (Region) {
    return `{
      log_mail(where: {subject: {_like: "[${Region}] Timesheet Submitted - Please Approve"}, to: {_contains: "${timesheetApproverEmail}"}},limit: 5, order_by: {created_at: desc}) {
        is_sent
        subject
        to
    		body
    		id
      }
    }`
  } else {
    return `{
      log_mail(where: {subject: {_like: "Timesheet Submitted - Please Approve"}, to: {_contains: "${timesheetApproverEmail}"}},limit: 5, order_by: {created_at: desc}) {
        is_sent
        subject
        to
    		body
    		id
      }
    }`
  }

}

export const isPlacementScheduleAllowed = (agencyName) => {
  return `{
      platform_business(where: {business: {name: {_eq: "${agencyName}"}}}) {
        id
        preferences
      }
    }`
}