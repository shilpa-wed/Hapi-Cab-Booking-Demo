CREATE TABLE customers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (20) NOT NULL,
    last_name VARCHAR (20) NOT NULL,
    mobile_no VARCHAR (20) NOT NULL,
    email VARCHAR (50) ,
    birth_date DATETIME NULL,
    address TEXT NULL,
    city TEXT NULL,
    state TEXT NULL,
    country TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE INDEX(mobile_no),
    INDEX(email)
);

-- CREATE UNIQUE INDEX customer_mobile_no
-- ON customers(mobile_no);
-- CREATE INDEX customer_email ON customers USING btree (email);

