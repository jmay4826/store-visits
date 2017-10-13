SELECT locations.id, locations.name, locations.district, locations.latitude, locations.longitude FROM locations 
JOIN location_permissions on location_permissions.location = locations.id
WHERE location_permissions.userid = $1;