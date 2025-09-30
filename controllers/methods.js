import { pool } from '../config/database.js';

const getMethods = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM coffee_methods ORDER BY name');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const methodId = req.params.id;
        const results = await pool.query(
            'SELECT * FROM coffee_methods WHERE id = $1',
            [methodId]
        );

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Method not found' });
        }

        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getMethods,
    getMethodById
};