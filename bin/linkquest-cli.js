#!/usr/bin/env node

const fs = require('fs-extra');
const program = require('commander');
const pkg = require('../package.json');
const Linkquest = require('linkquest');

let url;

// Set the version of the program to be the version defined in package.json.
program.version(pkg.version, '-v, --version', 'Outputs the current version of linkquest-cli');

// Set the url to check as an argument to be passed.
program.arguments('<url>').action(urlPassed => url = urlPassed);

/**
 * Set the options that are specific to the cli version of Linkquest.
 * 
 * -h, --host   Tells linkquest to check the entire host and not just the page
 */
program.option('-h, --host', 'Tells linkquest to check the entire host and not just the page', false);

/**
 * Set the options that are specific to the cli version of Linkquest.
 * 
 * -s, --silent   Hides all console output.
 * -o, --output   Specify the directory to save the the "linkquest.json" file that contains the results of the crawl.
 */
program.option('-s, --silent', 'Hides all console  output', false);
program.option('-o, --output <path>', 'Specify the directory to save the the "linkquest.json" file that contains the results of the crawl.', process.cwd());

program.parse(process.argv);

// Bundle the Linkquest options up to make it easier to pass to an instance.
const options = {
  host: program.opts().host
};

const linkquest = new Linkquest(url, options);

/**
 * If the user doesn't have the silent option on we want to log the current link that is being processed by
 * Linkquest and whether it is valid or not.
 */
if (!program.opts().silent) linkquest.onNavigateToLink.add(logUpdates);

/**
 * When Linkquest finishes, we notify the user (regardless of the status of the silent option).
 * 
 * We also write out the json file that contains the data about the links.
 */
linkquest.onComplete.add(saveLinkquestOutput);

linkquest.start();

/**
 * Logs the current link being processed by Linkquest and whether it is valid or not.
 * 
 * @param {string} link The link being processed.
 * @param {boolean} isValid Indicates if the link being processed is valid or not.
 */
function logUpdates(link, isValid) {
  console.info(`[linkquest-cli] link: ${link}, valid: ${isValid}`);
};

/**
 * Saves the valid and invalid links to a JSON file.
 * 
 * @async
 * 
 * @param {Array<string>} validLinks The valid links returned by Linkquest.
 * @param {Array<string>} invalidLinks The invalid links returned by Linkquest.
 */
async function saveLinkquestOutput(validLinks, invalidLinks) {
  console.info('[linkquest-cli] Finished!');

  const outputPath = `${program.opts().output}/linkquest.json`;

  console.info(`[linkquest-cli] Saving results to ${outputPath}`);

  const output = {
    validLinks,
    invalidLinks
  };

  await fs.outputJSON(outputPath, output);
};
