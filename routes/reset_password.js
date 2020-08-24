const express = require('express');

const router = express.Router();

const resetPasswordController=require('../controllers/reset_password_controller');


router.get('/finduser', resetPasswordController.find);
router.post('/confirmuser', resetPasswordController.confirmUser);
router.get('/:accesstoken',resetPasswordController.redirectUser);
router.post('/:accesstoken',resetPasswordController.reset)


module.exports=router;