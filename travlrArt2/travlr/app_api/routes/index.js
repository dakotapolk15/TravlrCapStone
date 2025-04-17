const express = require('express');
const router = express.Router();
const { expressjwt } = require("express-jwt"); 



const auth = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});


const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;