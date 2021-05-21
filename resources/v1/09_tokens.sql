CREATE TABLE tokens (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      type ENUM('CUSTOMER','DRIVER') NOT NULL DEFAULT 'CUSTOMER',
      token TEXT NOT NULL,
      token_expiry DATETIME NOT NULL,
      login_time DATETIME NOT NULL,
      logout_time DATETIME NULL,
      user_id INTEGER  NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
      deleted_at DATETIME NULL,
      INDEX(token(100))
);

-- CREATE INDEX tokens_token ON tokens USING btree (token);

