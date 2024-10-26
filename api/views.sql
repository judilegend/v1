-- View for unread messages count per user
CREATE VIEW vw_unread_messages_count AS
SELECT receiver_id, COUNT(*) as unread_count
FROM direct_messages
WHERE `read` = FALSE  -- Utilisation de guillemets inversés pour 'read'
GROUP BY receiver_id;
-- View for latest messages in conversations
CREATE VIEW vw_latest_messages AS
SELECT dm.*
FROM direct_messages dm
JOIN (
    SELECT 
        LEAST(sender_id, receiver_id) as user1,
        GREATEST(sender_id, receiver_id) as user2,
        MAX(created_at) as latest_message_time
    FROM direct_messages
    GROUP BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id)
) latest_messages
ON (LEAST(dm.sender_id, dm.receiver_id) = latest_messages.user1
    AND GREATEST(dm.sender_id, dm.receiver_id) = latest_messages.user2
    AND dm.created_at = latest_messages.latest_message_time);
