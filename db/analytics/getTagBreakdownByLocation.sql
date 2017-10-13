SELECT
    COUNT(comments.id), tags.title, tags.subcategory, tags.category
    FROM comments 
JOIN locations on locations.id = comments.location
LEFT JOIN tags on tags.comment_id = comments.id
WHERE location != 'template'
GROUP BY tags.title, tags.subcategory, tags.category;



