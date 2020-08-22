# Moby Dick - Whale Hunter

1. Start node server:
    `node server/server.js`

2. Start react app:
    `yarn start`

3. Setup Database
create database moby_dick;
CREATE TABLE tokens(id int CONSTRAINT tokens_pk PRIMARY KEY, name TEXT, contract TEXT, block_creation int, last_block int, uniswap TEXT);
CREATE TABLE hodlers(id int CONSTRAINT hodlers_pk PRIMARY KEY, address TEXT, amount float, is_contract BOOLEAN, num_tz INT, created_at DATE);
 CREATE TABLE transfers(id int CONSTRAINT transfers_pk PRIMARY KEY, sender_id int REFERENCES hodler s(id), recipient_id int REFERENCES hodlers(id), amount float, created_at date);
