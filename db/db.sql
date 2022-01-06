drop table if exists roles CASCADE;
create table roles(
	id BIGSERIAL primary key,
	name VARCHAR(255) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR (255) NULL,
	created_at  TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL
);


drop table if exists users CASCADE;
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

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);
