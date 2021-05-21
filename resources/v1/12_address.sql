-- create type address_type
--     as enum('VEHICLE','DRIVER');

CREATE TABLE address
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type enum('VEHICLE','DRIVER') NOT NULL default 'DRIVER',
    item_id INTEGER NOT NULL, -- Might be vehicle OR Driver
    lat float(10,7) NOT NULL,
    clong float(10,7) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE INDEX(type,item_id)
);

-- Create distance difference calculating function!
-- Uncomment below code

-- DELIMITER $$
-- CREATE FUNCTION distance(
--    lat1 FLOAT(10,7),
--    lon1 FLOAT(10,7),
--    lat2 FLOAT(10,7),
--    lon2 FLOAT(10,7)
--   ) RETURNS FLOAT(10,7)
-- DETERMINISTIC
-- BEGIN
--     DECLARE x FLOAT(10,7);
--     DECLARE y FLOAT(10,7);
--     SET x = 69.1 * (lat2 - lat1);
--     SET y = 69.1 * (lon2 - lon1) * cos(lat1 / 57.3);
-- RETURN sqrt(x * x + y * y);
-- END$$
-- DELIMITER;
