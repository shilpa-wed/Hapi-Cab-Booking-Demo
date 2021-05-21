-- create type user_type
--     as enum('CUSTOMER','DRIVER');
-- create type passport_provider_type
--     as enum('GOOGLE','GITHUB','LOCAL');

CREATE TABLE passport (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 user_type ENUM('CUSTOMER','DRIVER') NOT NULL DEFAULT 'CUSTOMER',
 provider_type enum('GOOGLE','GITHUB','LOCAL') NOT NULL DEFAULT 'GOOGLE',
 password TEXT NOT NULL,
 service_provider_id TEXT,
 user_id INTEGER  NOT NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
 updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
 deleted_at DATETIME NULL,
 UNIQUE INDEX(user_type,user_id,provider_type)
);

-- CREATE UNIQUE INDEX passport_user_type
-- ON passport(user_type,user_id,provider_type);

