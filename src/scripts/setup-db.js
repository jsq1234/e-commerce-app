// require('dotenv').config({ path: '.env.local' });
const { sql } = require("@vercel/postgres");
const { random, Random } = require("random-js");

async function createTables() {
  try {
    // Drop tables in reverse order of their dependencies
    const tablesToDrop = [
      "cart_items",
      "billing_addresses",
      "products",
      "users",
    ];

    for (const tableName of tablesToDrop) {
      try {
        await sql.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
        console.log(`Table ${tableName} dropped successfully`);
      } catch (error) {
        console.error(`Error dropping table ${tableName}:`, error);
      }
    }

    console.log("Deleted all tables!");

    // Create tables in order of dependencies
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(15) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("User table created successfully!");

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        discount_percentage DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
        rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
        stock INTEGER NOT NULL DEFAULT 0,
        image VARCHAR(1000) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Products table created successfully!");

    await sql`
      CREATE TABLE IF NOT EXISTS billing_addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        address_line1 VARCHAR(255) NOT NULL,
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Billing addresses table created successfully!");

    await sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Cart items table created successfully!");

    await sql`
      CREATE VIEW cart_products_view AS
        SELECT c.user_id, p.id as product_id, p.title, p.price, c.quantity, p.image, p.discount_percentage FROM cart_items c JOIN products p ON p.id = c.product_id;
    `;

    console.log("Created cart-product view succesfully!");
  } catch (error) {
    console.error("Failed to create tables: ", error);
    process.exit(1);
  }
}

async function seedDatabase() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  let products = data.products;

  await Promise.all(
    products.map((product) => {
      const randomInt = new Random().integer(20, 100);
      console.log(product.discountPercentage);
      return sql`INSERT INTO products(title, price, discount_percentage, image, stock)
      VALUES (${product.title}, ${product.price}, ${
        product.discountPercentage ?? 0
      }, ${product.images[0]}, ${randomInt}) ON CONFLICT (id) DO NOTHING;`;
    })
  );
}

(async function () {
  try {
    await createTables();
    console.log("Tables created successfully!");
    console.log("Inserting values");
    await seedDatabase();
    console.log("Inserted values successfully!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
