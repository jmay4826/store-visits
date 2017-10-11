UPDATE comments SET 
complete = true, updated_at = current_timestamp
WHERE id = $1;