use nostromo;

SELECT * FROM vehicles as vh
LEFT JOIN parking_records as pr 
ON pr.id_vehicle = vh.idVehicle
WHERE pr.id_vehicle IS NULL OR pr.check_out IS NOT NULL AND pr.check_in IS NULL
;