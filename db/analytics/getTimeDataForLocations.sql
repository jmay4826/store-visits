SELECT
    locations.name AS name,
    locations.id AS location_id,
    MAX(updated_at - created_at), 
    AVG(updated_at - created_at), 
    (
        SELECT MAX(updated_at - created_at) 
        FROM comments 
        WHERE complete = true
    ) AS all_max, 
    (
        SELECT AVG(updated_at - created_at) 
        FROM comments 
        WHERE complete = true
    ) as all_avg
FROM comments 
JOIN locations on locations.id = comments.location
LEFT JOIN tags on tags.comment_id = comments.id
WHERE complete=true 
GROUP BY locations.name, location_id;