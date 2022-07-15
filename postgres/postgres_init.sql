--
-- PostgreSQL database dump
--
CREATE DATABASE grafana
    WITH 
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;	

CREATE TABLE IF NOT EXISTS public.monitor
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    value float NOT NULL,
    type text COLLATE pg_catalog."default",
    "device" text COLLATE pg_catalog."default",
    "time" timestamp with time zone NOT NULL,
    CONSTRAINT monitor_pkey PRIMARY KEY (id)
);