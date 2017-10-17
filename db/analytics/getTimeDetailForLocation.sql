SELECT
    comments.content,
    comments.created_at,
    comments.updated_at,
    comments.author,
    comments.completed_by,
    SUM(updated_at - created_at) AS resolution_time
FROM comments 
JOIN locations on locations.id = comments.location
LEFT JOIN tags on tags.comment_id = comments.id
WHERE complete=true AND locations.id = ${locationid}
GROUP BY comments.content, comments.created_at, comments.updated_at, comments.author, comments.completed_by
ORDER BY resolution_time DESC