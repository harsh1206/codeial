const express = require('express');

const router = express.Router();

const freindshipController=require('../controllers/freindship_controller');


router.post('/toggle',freindshipController.toggleFriend);

module.exports=router;