import { Sequelize } from "sequelize";
import mysql from 'mysql2/promise';
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect:'mysql'
    }
);

export async function createDatabaseIfNotExists() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
}

export async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established Successfully!');
    }catch(error){
        console.log('Unable to connect to the database');
    }
}