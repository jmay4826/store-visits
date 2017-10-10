SELECT COUNT(*) AS num_comments, locations.id, locations.name FROM comments
LEFT JOIN tags ON tags.comment_id = comments.id
LEFT JOIN locations ON locations.id = comments.location
WHERE locations.id != 'template'
GROUP BY locations.id
ORDER BY num_comments DESC;