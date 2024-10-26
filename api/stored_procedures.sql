DROP PROCEDURE IF EXISTS sp_get_conversation;

CREATE PROCEDURE sp_get_conversation(
    IN p_user1_id INT,
    IN p_user2_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        dm.*,
        sender.username as sender_name,
        receiver.username as receiver_name
    FROM direct_messages dm
    JOIN users sender ON dm.sender_id = sender.id
    JOIN users receiver ON dm.receiver_id = receiver.id
    WHERE (dm.sender_id = p_user1_id AND dm.receiver_id = p_user2_id)
       OR (dm.sender_id = p_user2_id AND dm.receiver_id = p_user1_id)
    ORDER BY dm.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
CREATE PROCEDURE sp_get_conversation_v2(
    IN p_user1_id INT,
    IN p_user2_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        dm.*,
        sender.username as sender_name,
        receiver.username as receiver_name
    FROM direct_messages dm
    JOIN users sender ON dm.sender_id = sender.id
    JOIN users receiver ON dm.receiver_id = receiver.id
    WHERE (dm.sender_id = p_user1_id AND dm.receiver_id = p_user2_id)
       OR (dm.sender_id = p_user2_id AND dm.receiver_id = p_user1_id)
    ORDER BY dm.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
DELIMITER //

-- Procedure to get conversation between two users
CREATE PROCEDURE sp_get_conversation(
    IN p_user1_id INT,
    IN p_user2_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        dm.*,
        sender.username as sender_name,
        receiver.username as receiver_name
    FROM direct_messages dm
    JOIN users sender ON dm.sender_id = sender.id
    JOIN users receiver ON dm.receiver_id = receiver.id
    WHERE (dm.sender_id = p_user1_id AND dm.receiver_id = p_user2_id)
       OR (dm.sender_id = p_user2_id AND dm.receiver_id = p_user1_id)
    ORDER BY dm.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END //

-- Procedure to mark messages as read
CREATE PROCEDURE sp_mark_messages_read(
    IN p_receiver_id INT,
    IN p_sender_id INT
)
BEGIN
    UPDATE direct_messages
    SET `read` = TRUE  -- Utilisation des guillemets inversés pour 'read'
    WHERE receiver_id = p_receiver_id 
    AND sender_id = p_sender_id
    AND `read` = FALSE;  -- Utilisation des guillemets inversés pour 'read'
END //

DELIMITER ;
