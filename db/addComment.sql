INSERT INTO comments (content, author, location, x, y, image, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)
RETURNING *;