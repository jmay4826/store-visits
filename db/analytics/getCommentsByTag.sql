SELECT
    locations.name AS location_name,
    locations.id AS location_id,
    comments.id AS comment_id,
    comments.content,
    comments.created_at,
    comments.updated_at,
    comments.author,
    comments.complete,
    comments.completed_by,
    comments.image,
    SUM(updated_at - created_at) AS resolution_time
FROM comments 
JOIN locations on locations.id = comments.location
LEFT JOIN tags on tags.comment_id = comments.id
WHERE tags.category=${category} AND tags.subcategory=${subcategory} AND tags.title=${title} AND comments.location != 'template'
GROUP BY comments.id, comments.created_at, comments.updated_at, comments.author, comments.completed_by, locations.name, locations.id, comments.complete, comments.image, comments.id