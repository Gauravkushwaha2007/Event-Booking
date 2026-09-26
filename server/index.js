const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('api/auth', authRoutes);
app.use('api/events', eventRoutes);
app.use('api/bookings', bookingRoutes)

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error while connecting to DB:', error);
    }
}
connectToDB();

app.get('/', (req, res) => {
    res.send('Hello');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});