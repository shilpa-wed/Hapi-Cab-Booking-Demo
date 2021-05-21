CREATE TABLE payments (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         booking_id INTEGER  NOT NULL,
         payment_mode enum('CASH','CREDIT_CARD','DEBIT_CARD') NOT NULL default 'CASH',
         payment_meta TEXT,
         payable_amount float(10,7) NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
         updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
         deleted_at DATETIME NULL,

         FOREIGN KEY(booking_id) REFERENCES bookings(id)
);
