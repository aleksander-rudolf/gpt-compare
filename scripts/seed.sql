-- Insert into users table
INSERT INTO users (username, password, email, role, created_at) VALUES
('admin', '$2a$10$CFqt/YjVW499hgEP.fRPhe11felUabsbPrLMtNeNWA3zU0AiOhqrq', 'admin@gptcompare.com', 'admin', '2024-04-01 00:00:00');

-- Insert into ai_models table
INSERT INTO ai_models (model_name, description) VALUES
('gpt-3.5-turbo', 'gpt-3.5-turbo'),
('gpt-4', 'gpt-4');

-- Insert into tokens table
INSERT INTO tokens (min_value, max_value) VALUES
(1, 1000);

-- Insert into temperatures table
INSERT INTO temperatures (temperature) VALUES
(0.1),
(0.15),
(0.2),
(0.25),
(0.3),
(0.35),
(0.4),
(0.45),
(0.5),
(0.55),
(0.6),
(0.65),
(0.7),
(0.75),
(0.8),
(0.85),
(0.9),
(0.95),
(1.0);
