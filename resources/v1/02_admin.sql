CREATE TABLE admin
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    cab_station_id  INTEGER NOT NULL,
    address text NOT NULL ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    FOREIGN KEY(cab_station_id) REFERENCES cab_stations(id)
);

