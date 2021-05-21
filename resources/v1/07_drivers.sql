CREATE TABLE drivers (
       id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       first_name VARCHAR (20) NOT NULL,
       last_name VARCHAR (20) NOT NULL,
       mobile_no VARCHAR (20) NOT NULL,
       email VARCHAR (50) ,
       birth_date DATETIME NULL,
       address TEXT NOT NULL,
       city TEXT NOT NULL,
       state TEXT NOT NULL,
       country TEXT NOT NULL,
       driving_license_number TEXT NOT NULL,
       active BOOLEAN NOT NULL default true,

       created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
       updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
       deleted_at DATETIME NULL,

       UNIQUE INDEX(mobile_no),
       INDEX(email)
);

-- CREATE UNIQUE INDEX drivers_mobile_no
-- ON drivers(mobile_no);
-- CREATE INDEX drivers_email ON drivers USING btree (email);

