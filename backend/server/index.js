require('dotenv').config();
const express = require('express');
const cors = require('cors');

const satelliteRoutes = require('../api/satellite');
const orbitRoutes = require('../api/orbit');
const launchRoutes = require('../api/launch');
const functionalityRoutes = require('../api/functionality');
const relationRoutes = require('../api/sat_functionality');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/satellite', satelliteRoutes);
app.use('/api/orbit', orbitRoutes);
app.use('/api/launch', launchRoutes);
app.use('/api/functionality', functionalityRoutes);
app.use('/api/relation', relationRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
