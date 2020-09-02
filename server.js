const express = require('express');
const connectDB = require('./config/db');

const app = express();

//db connect 
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

//routes 

app.use('/api/users', require('./routes/API/users'));
app.use('/api/profile', require('./routes/API/profile'));


// process.env.PORT pour definir le port pondent
//l'hebergement sur heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server start on %s' , PORT));
