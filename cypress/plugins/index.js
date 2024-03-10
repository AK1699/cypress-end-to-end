/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
// 	// `on` is used to hook into various events Cypress emits
// 	// `config` is the resolved Cypress config
// };
// module.exports = (on, config) => {
//     on('before:browser:launch', (browser = {}, args) => {
//         if (browser.family === 'chrome') {
//             args.push('--disable-dev-shm-usage');
//         }
//         return args;
//     });
//  }
// //   <<<---   cucumber preprocessor plugin   --->>>
// const cucumber = require("cypress-cucumber-preprocessor").default;

// module.exports = (on, config) => {
// 	on("file:preprocessor", cucumber());
// };

// //   <<<---   cucumber preprocessor plugin   --->>>
// const createEsbuildPlugin =
// 	require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
// const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
// const nodePolyfills =
// 	require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
// const addCucumberPreprocessorPlugin =
// 	require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin

// module.exports = async (on, config) => {
// 	await addCucumberPreprocessorPlugin(on, config) // to allow json to be produced
// 	// To use esBuild for the bundler when preprocessing
// 	on(
// 		'file:preprocessor',
// 		createBundler({
// 			plugins: [nodePolyfills(), createEsbuildPlugin(config)],
// 		})
// 	)
// 	return config
// }
//   <<<---   cucumber preprocessor plugin   --->>>
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
	on('file:preprocessor', cucumber())
}

// <--   Excel plugin   --->
const readXlsx = require("../plugins/read-xlsx");
module.exports = (on, config) => {
	on("task", {
		readXlsx: readXlsx.read,
	});
};
// <--   Excel plugin   --->


// <--CSV plugin-->
const fs = require('fs-extra');

module.exports = (on, config) => {
  on('task', {
    updateCSVRows({ filePath, newData }) {
      // Read existing data from the CSV file
      const existingData = fs.readFileSync(filePath, 'utf-8');

      // Split the CSV content into rows
      const rows = existingData.split('\n').map(row => row.split(','));

      // Update the rows based on a condition (e.g., matching the first column)
      newData.forEach(newRow => {
        const rowIndex = rows.findIndex(existingRow => existingRow[0] === newRow[0]);
        if (rowIndex !== -1) {
          // Update the existing row with the new data
          rows[rowIndex] = newRow;
        } else {
          // If the row doesn't exist, add it to the end of the CSV
          rows.push(newRow);
        }
      });

      // Convert the updated rows back to CSV format
      const updatedCSVContent = rows.map(row => row.join(',')).join('\n');

      // Write the updated CSV content back to the file
      fs.writeFileSync(filePath, updatedCSVContent, 'utf-8');

      return null; // Task functions must return a value
    }
  });
};
