--
-- PostgreSQL database dump
--

CREATE DATABASE grafana
    WITH 
    OWNER = postgres
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



DO
$do$
declare timer timestamp:= current_timestamp;
declare timer2 timestamp:= current_timestamp;
BEGIN 
   FOR i IN 1..10000 LOOP
   	  timer:= timer - interval '1' seconds;
	  -- RAISE NOTICE 'Time: %', timer;
	
      INSERT INTO public.monitor(
		value, type, "device", "time")
		VALUES (random() , 'cpu', 'deviceA', timer);

	  INSERT INTO public.monitor(
			value, type, "device", "time")
			VALUES (floor(random()* 5 +1) /10  , 'cpu', 'deviceB', timer);
   END LOOP;
   FOR i IN 1..10000 LOOP
   	  timer2:= timer2 + interval '1' seconds;
	  -- RAISE NOTICE 'Time: %', timer2;
	
      INSERT INTO public.monitor(
		value, type, "device", "time")
		VALUES (random() , 'cpu', 'deviceA', timer2);

	  INSERT INTO public.monitor(
			value, type, "device", "time")
			VALUES (floor(random()* 5 +1) /10 , 'cpu', 'deviceB', timer2);
   END LOOP;
END
$do$;


-- SELECT pg_sleep(1) ;