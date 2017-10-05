SELECT locations.id, locations.name, locations.district FROM locations 
-- JOIN location_permissions on location_permissions.location = locations.id
-- WHERE location_permissions.user = $1;