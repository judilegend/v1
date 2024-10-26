DELIMITER //

-- Trigger to update last_activity in conversations
CREATE TRIGGER trg_message_after_insert
AFTER INSERT ON direct_messages
FOR EACH ROW
BEGIN
    -- Update user's last activity
    UPDATE users 
    SET last_activity = NOW()
    WHERE id IN (NEW.sender_id, NEW.receiver_id);
END //

-- Trigger to clean up deleted messages
CREATE TRIGGER trg_message_before_delete
BEFORE DELETE ON direct_messages
FOR EACH ROW
BEGIN
    -- Log deleted messages if needed
    INSERT INTO deleted_messages_log (
        message_id,
        sender_id,
        receiver_id,
        deleted_at
    ) VALUES (
        OLD.id,
        OLD.sender_id,
        OLD.receiver_id,
        NOW()
    );
END //

DELIMITER ;
