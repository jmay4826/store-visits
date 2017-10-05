CREATE TABLE locations 
(id text primary key,
name text,
latitude text,
longitude text,
floorplan text,
district text,
active boolean);

CREATE TABLE users 
(id serial primary key,
name text,
type text);

CREATE TABLE location_permissions 
(id serial primary key,
userid integer,
location integer,
FOREIGN KEY (userid) REFERENCES users(id),
FOREIGN KEY (location) REFERENCES locations(id)
);

CREATE TABLE comments
(id serial primary key,
content text,
updated_at timestamp,
created_at timestamp,
author integer,
location text,
x integer,
y integer,
image text,
FOREIGN KEY (author) REFERENCES users(id)
FOREIGN KEY (location) REFERENCES locations(id)
);

