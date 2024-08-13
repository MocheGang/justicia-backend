// controllers/userController.js
import db from '../config/db.js';

// Créer un nouvel utilisateur (signup)
export const createUser = (req, res) => {
    const { nom, prenom, email, password } = req.body;
    const sql = 'INSERT INTO user (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, "utilisateur")';

    db.query(sql, [nom, prenom, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
};

// Se connecter (login)
export const loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user: result[0] });
    });
};

// Se déconnecter (logout)
export const logoutUser = (req, res) => {
    const { user_id } = req.body;
    const sql = 'INSERT INTO logout (user_id) VALUES (?)';

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        res.status(200).json({ message: 'User logged out successfully' });
    });
};

// Obtenir les détails d'un utilisateur par son ID
export const getUser = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result[0]);
    });
};
