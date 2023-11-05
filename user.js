const pool = require('./db');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const authModule = require('./firebase/authModule');
const transporter = require('./library/email'); 

class User {

    static async login(email, password) {
        const hashedPassword = md5(password); // Hash the password using MD5

        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, hashedPassword]);

        if (result.rows.length === 0) {
            return null; // User not found or invalid credentials
        }

        return authModule.signUpWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('User created:', user);
                return user
            })
            .catch((error) => {
                console.error('Error creating user:', error); 
            });


        // return result.rows[0];
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM users');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    static async create(user) {
        const { first_name, last_name, email, phone, password, birthday } = user;

        // Perform validation checks
        const errors = [];

        if (!first_name) {
            errors.push("First name is required.");
        }

        if (!last_name) {
            errors.push("Last name is required.");
        }

        if (!email) {
            errors.push("Email is required.");
        }

        if (!phone) {
            errors.push("Phone number is required.");
        }

        if (!password) {
            errors.push("Password is required.");
        }

        if (!birthday) {
            errors.push("Birthday is required.");
        }

        if (errors.length > 0) {
            return { success: false, errors };
        }

        const hashedPassword = md5(password)
        const query = `INSERT INTO users (first_name, last_name, email, phone, password, birthday, created_at, last_modified) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING * `;
        const values = [first_name, last_name, email, phone, hashedPassword, birthday];
        const { rows } = await pool.query(query, values);

        // return authModule.signUpWithEmailAndPassword(email, password)
        //     .then((user) => {
        //         console.log('User created:', user);
        //         return user;
        //     })
        //     .catch((error) => {
        //         console.error('Error creating user:', error);
        //     });

        // return rows[0]

        // Send email
        const mailOptions = {
            from: 'naveeine@gmail.com',
            to: email,
            subject: 'Welcome to My App',
            text: `Hello ${first_name} ${last_name},\nWelcome to My App!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        return { success: true, user: rows[0] };

    }

    static async update(id, user) {
        const { first_name, last_name, email, phone, password, birthday } = user;
        const hashedPassword = md5(password)
        const query = `UPDATE users SET first_name=$1, last_name=$2, email=$3, phone=$4, password=$5, birthday=$6, last_modified=NOW() WHERE id=$7 RETURNING *`;
        const values = [first_name, last_name, email, phone, hashedPassword, birthday, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}

module.exports = User;
