const { Command } = require('commander');
const importProducts = require('./service/importProducts');

const program = new Command();

program
.option('-f, --file <path>',  './stock.csv', './stock.csv') // Default value set here
.option('-t, --test', 'Run in test mode')
    .parse(process.argv);

const options = program.opts();

if (!options.file) {
    console.error('Please provide a path to the CSV file using -f or --file option');
    process.exit(1);
}
importProducts(options.file, options.test)
    .then((results) => {
        console.log('Import Summary:');
        console.log(`Processed: ${results.processed}`);
        console.log(`Successful: ${results.successful}`);
        console.log(`Skipped: ${results.skipped}`);
        console.log(`Duplicates: ${results.duplicates}`);
        if (results.failed.length > 0) {
            console.log(`Failed: ${results.failed.length}`);
            console.log('Failed Entries:', results.failed);
        }
    })
    .catch((error) => {
        console.error('Error during import:', error);
    });