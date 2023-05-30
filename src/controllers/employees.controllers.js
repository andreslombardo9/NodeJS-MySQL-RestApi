import { pool } from '../dbs.js';

export const getEmployees = async (req, res) => {
    try {
        
        const [rows] = await pool.query('SELECT * FROM  exployee')
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}
export const getEmployee = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM exployee WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            mesagge: 'Employee not found'
        })
        console.log(rows);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}
export const createEmployees = async (req, res) => {
    const { name, salary } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO exployee (name, salary) VALUES (?,?)', [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary,
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM exployee WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({ mesagge: 'Employees not found' });
        res.sendStatus(204)
        res.send('employee deleted')
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const updateEmployees = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    try {
        const [result] = await pool.query('UPDATE exployee SET name = IFNULL(?, name), salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' })

        const [rows] = await pool.query('SELECT * FROM exployee WHERE id = ?', [id])
        console.log(result);
        res.json(rows[0])
    }
    catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

