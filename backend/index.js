import express from 'express';
import 'dotenv/config';
import { createDatabaseIfNotExists, sequelize, testConnection } from './config/db.js';
import userRoute from './routes/userRoute.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Running on Port ',PORT);
});

// routes
app.use('/', userRoute);


async function syncDatabase() {
    try {
        await createDatabaseIfNotExists();
        await testConnection();
        await sequelize.sync({alter: true});
        console.log('Database Synchronized!');
    } catch (error) {
        console.log('Error Synchronizing Database: ', error);
    }
}

syncDatabase();