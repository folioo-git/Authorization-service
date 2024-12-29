create database if not exists folioo;
use folioo;
create table if not exists user(
    uuid int auto_increment primary key,
    email varchar(100) unique not null,
    password varchar(200),
    auth_provider enum('github','google','basic') default 'basic' not null,
    account_status boolean default true not null,
    created_at datetime default current_timestamp not null
);