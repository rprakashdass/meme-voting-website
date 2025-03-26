require('dotenv').config();
const mongoose= require('mongoose')
const URI= process.env.URI
mongoose.connect(URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB error:', err));
module.exports=mongoose;