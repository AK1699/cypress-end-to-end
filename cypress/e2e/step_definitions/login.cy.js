import { Given } from "cypress-cucumber-preprocessor/steps";

Given('login as Onboarding agent Maker user', () => {
    cy.login('OA1')
})
Given('login as Financial Management user', () => {
    cy.login('FM')
})
Given('login as Onboarding agent Checker user', () => {
    cy.login('OA2')
})
Given('login as Compliance Manager user', () => {
    cy.login('CM')
})
Given('login as Compliance approver user', () => {
    cy.login('CA')
})
Given('login as Credit Risk Assistant user', () => {
    cy.login('CRA')
})
Given('login as Credit Risk Manager user', () => {
    cy.login('CRM')
})
Given('login as Payment Assistant user', () => {
    cy.login('PA')
})
Given('login as Payment Approver user', () => {
    cy.login('PAP')
})
Given('login as User Management role', () => {
    cy.login('PUM')
})