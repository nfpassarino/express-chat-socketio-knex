const fileContainer = require('../FileContainer');

const config = require('knex') ({
    client: 'mariadb',
    connection: {
        host: '127.0.0.1',
        user: 'maria',
        password: 'maria',
        database: 'products'
    },
    pool: { min: 0, max: 8 }
});

exports.fetchAllProducts = async () => {
    const productContainer = new fileContainer(config, 'products');
    return productContainer.getAll();
};

exports.fetchProductById = async (id) => {
    const productContainer = new fileContainer(config, 'products');
    const obj = productContainer.getById(Number(id));
    return obj;
};

exports.fetchRandomProduct = async () => {
    const productContainer = new fileContainer(config, 'products');
    const objects = await productContainer.fetchAllProducts();
    return objects[Math.floor(Math.random() * objects.length)];
};

exports.writeNewProduct = async (newProduct) => {
    const productContainer = new fileContainer(config, 'products');
    const product = await productContainer.save(newProduct);
    return product;
};

exports.updateProduct = async (id, newProduct) => {
    const productContainer = new fileContainer(config, 'products');
    const product = await productContainer.updateById(Number(id), newProduct);
    return product;
};

exports.deleteProduct = async (id) => {
    const productContainer = new fileContainer(config, 'products');
    await productContainer.deleteById(Number(id));
    return await fetchAllProducts();
};
