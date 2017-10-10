SELECT * FROM comments
LEFT JOIN tags ON tags.comment_id = comments.id
LEFT JOIN locations ON locations.id = comments.location
WHERE locations.id != 'template';
