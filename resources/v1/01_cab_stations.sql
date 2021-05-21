CREATE TABLE cab_stations
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    lat float(10,7) NOT NULL,
    clong float(10,7) NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    address TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

