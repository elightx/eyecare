-- DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) DEFAULT "Customer",
    email VARCHAR(100) NOT NULL UNIQUE,
    phone CHAR(10) NOT NULL,
    passwd TEXT NOT NULL,
    address TEXT,
    role VARCHAR(10) DEFAULT "GUEST",
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SELECT * FROM users;

CREATE TABLE IF NOT EXISTS products (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT NOT NULL,
    color VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    product_type ENUM("SUNGLASSES", "GLASSES", "CONTACTS") NOT NULL
);


w

-- SELECT brand FROM products;


CREATE TABLE IF NOT EXISTS review (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL REFERENCES users(id),
    product_id CHAR(36) NOT NULL REFERENCES products(id),
    score DECIMAL(2, 1) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- DROP TABLE cart;

CREATE TABLE IF NOT EXISTS cart (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL REFERENCES users(id),
    product_id CHAR(36) NOT NULL REFERENCES products(id),
    lens_id CHAR(36) REFERENCES lens(id),
    quantity INT NOT NULL
);
-- ALTER TABLE cart ADD CONSTRAINT cart_product_unique UNIQUE (user_id, product_id, lens_id);
-- ALTER TABLE cart ADD CONSTRAINT cart_product_quantity CHECK (quantity > 0);
ALTER TABLE cart ADD CONSTRAINT cart_lens_id CHECK (
    ((SELECT product_type FROM products WHERE id = product_id) IN ("SUNGLASSES", "CONTACTS") AND lens_id IS NULL)
    OR
    ((SELECT product_type FROM products WHERE id = product_id) = "GLASSES" AND lens_id IS NOT NULL)
); 
