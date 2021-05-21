CREATE TABLE vehicle_categories
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    UNIQUE INDEX(name)
);

-- CREATE UNIQUE INDEX vehicle_categories_name
-- ON vehicle_categories(name);

