-- Indexes for direct_messages table
CREATE INDEX idx_sender_receiver ON direct_messages(sender_id, receiver_id);
CREATE INDEX idx_created_at ON direct_messages(created_at);
CREATE INDEX idx_read_status ON direct_messages(read);
CREATE INDEX idx_receiver_read ON direct_messages(receiver_id, read);
