use nostromo;

SELECT * FROM vehicles
INNER JOIN parking_records ON parking_records.id_vehicle=vehicles.idVehicle
AND parking_records.check_out IS NOT NULL;