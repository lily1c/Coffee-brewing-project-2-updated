import pool from '../config/database.js';

const getMethods = async (req, res) => {
    console.time('getMethods');
    try {
        const results = await pool.query('SELECT * FROM coffee_methods ORDER BY name');
        console.timeEnd('getMethods');
        res.status(200).json(results.rows);
    } catch (error) {
        console.timeEnd('getMethods');
        res.status(409).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    console.time('getMethodById');
    try {
        const methodId = req.params.id;
        const results = await pool.query(
            'SELECT * FROM coffee_methods WHERE id = $1',
            [methodId]
        );

        if (results.rows.length === 0) {
            console.timeEnd('getMethodById');
            return res.status(404).json({ error: 'Method not found' });
        }

        console.timeEnd('getMethodById');
        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.timeEnd('getMethodById');
        res.status(409).json({ error: error.message });
    }
};

export default {
    getMethods,
    getMethodById
};