SELECT COUNT(*) AS num_comments, locations.id, locations.name FROM comments
LEFT JOIN tags ON tags.comment_id = comments.id
LEFT JOIN locations ON locations.id = comments.location
WHERE locations.id != 'template' AND comments.complete != true
GROUP BY locations.id
ORDER BY num_comments DESC;

-- SELECT COUNT(*) AS author_count, comments.author FROM comments
-- WHERE comments.location != 'template'
-- GROUP BY comments.author
-- ORDER BY author_count DESC;