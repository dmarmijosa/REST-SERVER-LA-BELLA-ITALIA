create table users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	imagen VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_avaiable BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at  TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL
);


