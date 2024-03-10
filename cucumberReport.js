const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "cypress/cucumber-json",
  reportPath: "cypress/reports/html",
  openReportInBrowser: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "121.0.6167.184",
    },
    device: "Local test machine",
    platform: {
      name: "mac",
      version: "16.04",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Raise" },
      { label: "Release", value: "Sprint - 2402" },
      // { label: "Execution Start Time", value: "May 25th 2023, 02:31 PM IST" },
      // { label: "Execution End Time", value: "May 25th 2023, 02:56 PM IST" },
    ],
  },
});