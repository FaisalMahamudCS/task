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

        if (parseFloat(product.price) < 5 && parseInt(product.stock) < 10) {
            results.skipped++;
            continue;
        }
        if (parseFloat(product.price) > 1000) {
            results.skipped++;
            continue;
        }
        if (product.discontinued.toLowerCase() === 'true') {
            product.discontinuedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        } else {
            product.discontinuedDate = null;
        }

        // Insert into database
        if (!testMode) {
            try {
                await db.query(
                    'INSERT INTO products (name, price, stock, discontinued, discontinued_date) VALUES (?, ?, ?, ?, ?)',
                    [product.name, product.price, product.stock, product.discontinued, product.discontinuedDate]
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
