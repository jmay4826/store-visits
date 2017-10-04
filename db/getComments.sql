SELECT * FROM comments 
JOIN locations on locations.id = comments.location
WHERE comments.location = $1;