SELECT 
    name,
    location, 
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
WHERE complete=true 
GROUP BY location