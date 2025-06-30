import express from 'express';
import dotenv from 'dotenv';
import connectdb from './db/connectdb.js';
import expenseRoutes from './routes/expenseRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);


connectdb(DATABASE_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
