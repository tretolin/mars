use nostromo;
#INSERT INTO parking_records (id_vehicle, check_in, check_out) VALUES(5, "2022-11-10 19:33:52", null)
UPDATE parking_records as pr SET check_out = "2022-11-11 20:22:57"
WHERE pr.id_vehicle = 4 AND pr.check_out IS NULL;
