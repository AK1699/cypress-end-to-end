const { defineConfig } = require("cypress");
const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')
const cucumber = require("cypress-cucumber-preprocessor").default;
const readXlsx = require("./cypress/plugins/read-xlsx");
const csv = require('@fast-csv/parse');
const { writeToPath } = require("@fast-csv/format");

require('dotenv').config()
const { Client } = require('pg')

module.exports = defineConfig({
  projectId: '54yzia',
  env: {...process.env,
    hideCredentials: true,   },
  modifyObstructiveCode: true,
  experimentalMemoryManagement: true,
  experimentalSingleTabRunMode:true,
  e2e: {
    waitForAnimations: true,
    requestTimeout: 60000,
    pageLoadTimeout: 50000,
    responseTimeout: 60000,
    defaultCommandTimeout: 80000,
    chromeWebSecurity: true,
    viewportHeight: 1050,
    viewportWidth: 1680,
    video: false,
    watchForFileChanges: false,
    experimentalStudio: true,
    // numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      on("task", {
        readPdf(pdfPath) {
          return new Promise((resolve) => {
            const filePath = path.resolve(pdfPath);
            const dataBuffer = fs.readFileSync(filePath);
            pdf(dataBuffer).then((data) => {
              resolve(data)
            })
          })
        }
      })
      on("file:preprocessor", cucumber());
      on("task", {
        readXlsx: readXlsx.read,
      });
      on("task", {
        readFromCsv({ path }) {
          return new Promise(resolve => {
            let dataArray = [];
            csv.parseFile(`cypress/${path}.csv`, { headers: true })
              .on('data', (data) => {
                dataArray.push(data)
              })
              .on('end', () => {
                resolve(dataArray)
              })
          })
        }
      });
      on("task", {
        writeToCsv({ path, rows }) {
          return new Promise((resolve, reject) => {
            const options = { headers: true, writeHeaders: true };
            writeToPath(`cypress/Data/${path}.csv`, rows, options)
              .on('error', (error) => {
                console.error("CSV Writing Error:", error);
                reject(error);
              })
              .on('finish', () => {
                resolve(null);
              });
          });
        }
      })
      on("task", {
        async connectDB(query) {
          const client = new Client({
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            database: "postgres",
            ssl: true,
            port: 5980
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.feature",
  },
});
