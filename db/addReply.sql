INSERT INTO replies
(content, comment_id, author, created_at)
VALUES (${content}, ${comment_id}, ${author}, current_timestamp);
