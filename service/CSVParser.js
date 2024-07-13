const fs = require('fs');
const csv = require('csv-parser');

function CSVParser(filePath) {
    const products = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Clean and validate data
                const product = {
                    code: row['Product Code'] ? row['Product Code'].trim() : null,
                    name: row['Product Name'] ? row['Product Name'].trim() : null,
                    description: row['Product Description'] ? row['Product Description'].trim() : null,
                    stock: row['Stock'] ? parseInt(row['Stock'], 10) : null,
                    price: row['Cost in GBP'] ? parseFloat(row['Cost in GBP'].replace(/[^0-9.]/g, '')) : null,
                    discontinued: row['Discontinued'] ? row['Discontinued'].trim() : 'no'
                };

                // Only add valid products
                if (product.code && product.name && product.description && !isNaN(product.stock) && !isNaN(product.price)) {
                    products.push(product);
                }
            })
            .on('end', () => {
                resolve(products);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = CSVParser;
