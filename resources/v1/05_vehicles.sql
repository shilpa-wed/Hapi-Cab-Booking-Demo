CREATE TABLE vehicles
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    vehicle_number VARCHAR (20) NOT NULL,
    vehicle_category_id  INTEGER NOT NULL,
    vehicle_sub_category_id  INTEGER NOT NULL,
    owner_id INTEGER NOT NULL,
    amount float(10,4) NOT NULL,
    model_no text NOT NULL,
    brand_name text NOT NULL,
    manufacturing_year VARCHAR (4) NOT NULL,
    active BOOLEAN NOT NULL default true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    FOREIGN KEY(vehicle_category_id) REFERENCES vehicle_categories(id),
    FOREIGN KEY(vehicle_sub_category_id) REFERENCES vehicle_sub_categories(id),
    UNIQUE INDEX(vehicle_number)
);
