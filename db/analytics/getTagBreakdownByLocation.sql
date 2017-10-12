SELECT
    COUNT(comments.id), tags.title, tags.subcategory, tags.category, locations.name

FROM comments 
JOIN locations on locations.id = comments.location
LEFT JOIN tags on tags.comment_id = comments.id
WHERE location != 'template'
GROUP BY locations.name, tags.title, tags.subcategory, tags.category;