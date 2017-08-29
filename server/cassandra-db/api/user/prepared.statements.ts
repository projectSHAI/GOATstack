// Prepared statements
export const insertUser = `INSERT INTO users (id, email, created, password, salt, role, username ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
export const findByEmail = 'SELECT email, firstName, lastName, middleName, role, userName FROM users WHERE email = ?';
export const allUsers = 'SELECT email, firstName, lastName, middleName, role, userName FROM users';