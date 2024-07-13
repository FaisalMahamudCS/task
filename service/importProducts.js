const db = require('../connection/db');
const parseCSV = require('./CSVParser');


async function importProducts(filePath, testMode = false) {
    const products = await parseCSV(filePath);
    const results = {
        processed: 0,
        successful: 0,
        skipped: 0,
        failed: []
    };

    for (const product of products) {
        results.processed++;

        // Apply business rules
        if (product.price < 5 && product.stock < 10) {
            results.skipped++;
            continue;
        }
        if (product.price > 1000) {
            results.skipped++;
            continue;
        }
        if (product.discontinued.toLowerCase() === 'yes') {
            product.dtmDiscontinued = new Date().toISOString().slice(0, 19).replace('T', ' ');
        } else {
            product.dtmDiscontinued = null;
        }

        // Insert into database
        if (!testMode) {
            try {
                await db.query(
                    'INSERT INTO tblproductdata (strproductname, strproductdesc, strproductcode, dtmadded, dtmdiscontinued) VALUES ($1, $2, $3, $4, $5)',
                    [product.name, product.description, product.code, new Date().toISOString().slice(0, 19).replace('T', ' '), product.dtmDiscontinued]
                );
                results.successful++;
            } catch (error) {
                results.failed.push({ product, error });
            }
        } else {
            results.successful++; // Simulate successful insertion in test mode
        }
    }

    return results;
}

module.exports = importProducts;