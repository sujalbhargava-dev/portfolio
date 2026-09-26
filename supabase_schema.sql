-- Run this entire script in your Supabase SQL Editor to set up your tables

-- 1. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Insert default admin user (password is 'sujal', hashed with bcrypt)
INSERT INTO users (email, password) 
VALUES ('sujalbhargava2341@gmail.com', '$2b$10$YourHashedPasswordHerePleaseUpdate')
ON CONFLICT (email) DO NOTHING;
-- Note: bcrypt hashes generate dynamically, we will handle default user creation from the backend to ensure correct hashing if needed, or you can just register via your frontend.

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    emoji TEXT DEFAULT '⚡',
    category TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- Insert default skills
INSERT INTO skills (name, emoji, category, subtitle, sort_order) VALUES 
('Python', '🐍', 'lang', 'Primary Language', 1),
('C++', '⚙️', 'lang', 'OOP & Algorithms', 2),
('C', '🔵', 'lang', 'Systems & Logic', 3),
('MySQL', '🐬', 'db', 'RDBMS', 1),
('SQL', '🗄️', 'db', 'Query Language', 2),
('HTML', '🌐', 'web', 'Structure', 1),
('CSS', '🎨', 'web', 'Styling', 2),
('JavaScript', '✨', 'web', 'Interactivity', 3),
('VS Code', '📝', 'tools', 'Primary Editor', 1),
('Git', '🐙', 'tools', 'Version Control', 2),
('GitHub', '🐱', 'tools', 'Code Hosting', 3),
('Code::Blocks', '💻', 'tools', 'C/C++ IDE', 4),
('Object-Oriented Programming', '01', 'concepts', '', 1),
('Data Structures & Algorithms', '02', 'concepts', '', 2),
('Database Management Systems', '03', 'concepts', '', 3)
ON CONFLICT DO NOTHING;

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    project_type TEXT DEFAULT 'Desktop App',
    features JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    github_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- Insert default projects
INSERT INTO projects (title, description, project_type, features, tech_stack, github_url, sort_order) VALUES 
('Shopping Cart Management System', 'A fully-functional desktop shopping cart application built with Python and Tkinter.', 'Desktop App', '["CRUD operations", "Discount calculation"]', '["Python", "Tkinter", "MySQL"]', '', 1),
('Payroll Management System', 'A comprehensive database-driven payroll system designed for organizations.', 'Database System', '["Attendance tracking", "Salary calculation"]', '["MySQL", "SQL"]', '', 2)
ON CONFLICT DO NOTHING;

-- 5. Features Table (Moved from local features.json)
CREATE TABLE IF NOT EXISTS features (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL
);

-- Insert default features
INSERT INTO features (id, status) VALUES 
('dark-mode', 'public'),
('global-search', 'public'),
('color-themes', 'testing')
ON CONFLICT (id) DO NOTHING;

-- 6. Supabase Storage Bucket for Profile Photos
-- You will need to create a public bucket named "portfolio-assets" manually in the Supabase Dashboard
-- Go to Storage -> Create Bucket -> Name it "portfolio-assets" -> Check "Public bucket"
