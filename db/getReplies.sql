SELECT * FROM replies WHERE comment_id in (SELECT id FROM comments WHERE location = $1 AND complete != true)