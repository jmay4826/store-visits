SELECT comments.* FROM comments 
JOIN locations on locations.id = comments.location
WHERE comments.location = $1 AND comments.complete != true;