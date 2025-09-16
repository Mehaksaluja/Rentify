const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
dotenv.config();
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const PORT = process.env.PORT || 5000;
connectDb();

app.use('/api/v1/auth', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
})