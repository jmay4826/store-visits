SELECT comments.* FROM comments 
JOIN locations on locations.id = comments.location
WHERE (comments.complete != true OR comments.updated_at >= (SELECT current_date - INTERVAL '30 days')) AND comments.location = $1;