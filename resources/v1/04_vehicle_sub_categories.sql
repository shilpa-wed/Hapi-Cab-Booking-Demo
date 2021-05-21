CREATE TABLE vehicle_sub_categories
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (20) NOT NULL,
    vehicle_category_id  INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    FOREIGN KEY(vehicle_category_id) REFERENCES vehicle_categories(id),
    UNIQUE INDEX(name)
);

-- CREATE UNIQUE INDEX vehicle_sub_categories_name
-- ON vehicle_sub_categories(name);