const { registerUser, loginUser } = require('../controllers/userController');
const { registerValidator, handleValidationErrors } = require('../middlewares/validators');

const router = require('express').Router();

router.post('/register', registerValidator, handleValidationErrors, registerUser);
router.post('/login', loginUser);

module.exports = router;