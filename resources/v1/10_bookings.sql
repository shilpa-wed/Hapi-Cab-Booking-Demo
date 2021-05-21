-- create type booking_types
--     as enum('DAILY_RIDE','OUTSTATION','RENTAL');
--
-- create type booking_status_types
--     as enum('REQUESTED','CAB_ASSIGNED','CONFIRMED','NOT_AVAILABLE');


CREATE TABLE bookings (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      booking_type enum('DAILY_RIDE','OUTSTATION','RENTAL') NOT NULL default 'DAILY_RIDE',
      source_address TEXT,
      destination_address TEXT NOT NULL,
      pickup_address TEXT NOT NULL,
      pickup_lat float(10,7) NOT NULL,
      pickup_long float(10,7) NOT NULL,
      destination_lat float(10,7) NOT NULL,
      destination_long float(10,7) NOT NULL,
      status enum('REQUESTED','CAB_ASSIGNED','CONFIRMED','NOT_AVAILABLE') NOT NULL default 'REQUESTED',

      customer_id INTEGER  NOT NULL,
      driver_id INTEGER  ,
      confirmed_by INTEGER  ,
      vehicle_id INTEGER  NOT NULL,
      amount float(10,7) NOT NULL,

      start_time time,
      end_time time,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
      deleted_at DATETIME NULL,


      FOREIGN KEY(customer_id) REFERENCES customers(id),
      FOREIGN KEY(driver_id) REFERENCES drivers(id),
      FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
      FOREIGN KEY(confirmed_by) REFERENCES admin (id),

      INDEX(vehicle_id),
      INDEX(driver_id),
      INDEX(customer_id)
);

-- CREATE INDEX bookings_vehicle_id ON bookings USING btree (vehicle_id);
-- CREATE INDEX bookings_driver_id ON bookings USING btree (driver_id);
-- CREATE INDEX bookings_customer_id ON bookings USING btree (customer_id);