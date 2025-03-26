const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// routes
const memeRoutes = require('./Routes/memeRoutes')
const userRoutes = require('./Routes/userRoutes')
const memeOwnerRoutes = require('./Routes/memeOwnerRoutes');

dotenv.config(); // Load environment variables

const app = express();


// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Home route
app.get("/", (req, res) => {
  res.send("Meme Royal is listening! 🎉");
});

// Routes
app.use('/memes', memeRoutes);
app.use('/users', userRoutes);
app.use('/owners', memeOwnerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});