
DO
$do$
declare timer timestamp:= current_timestamp;
declare timer2 timestamp:= current_timestamp;
BEGIN 
   FOR i IN 1..6000 LOOP
   	  timer:= timer - interval '1' seconds;
	  -- RAISE NOTICE 'Time: %', timer;
	
    INSERT INTO public.monitor(
      value, type, "device", "time")
      VALUES (random() , 'cpu', 'deviceA', timer);

	  INSERT INTO public.monitor(
			value, type, "device", "time")
			VALUES (floor(random()* 5 + 1) /10  , 'cpu', 'deviceB', timer);

    INSERT INTO public.monitor(
			value, type, "device", "time")
			VALUES (floor(random()* 3 + 7) /10  , 'cpu', 'deviceC', timer);
   END LOOP;
   FOR i IN 1..6000 LOOP
   	  timer2:= timer2 + interval '1' seconds;
	  -- RAISE NOTICE 'Time: %', timer2;
	
    INSERT INTO public.monitor(
      value, type, "device", "time")
      VALUES (random() , 'cpu', 'deviceA', timer2);

	  INSERT INTO public.monitor(
			value, type, "device", "time")
			VALUES (floor(random()* 5 + 1) /10 , 'cpu', 'deviceB', timer2);

    INSERT INTO public.monitor(
			value, type, "device", "time")
			VALUES (floor(random()* 3 + 7) /10  , 'cpu', 'deviceC', timer2);  
   END LOOP;
END
$do$;


-- SELECT pg_sleep(1) ;