const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const memeRoutes = require('./Routes/memeRoutes');
const userRoutes = require('./Routes/userRoutes');
const memeOwnerRoutes = require('./Routes/memeOwnerRoutes');
const authRoute = require('./Routes/auth')

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// Payload Limit for file upload
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.send("Meme Royal is listening!");
});

// Routes
app.use('/memes', memeRoutes);
app.use('/users', userRoutes);
app.use('/owners', memeOwnerRoutes);
app.use('/auth', authRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB error:', err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
