SELECT * FROM replies 
WHERE comment_id in 
    (SELECT id FROM comments 
    WHERE location = $1 
    AND (comments.complete != true OR comments.updated_at >= (SELECT current_date - INTERVAL '30 days')))