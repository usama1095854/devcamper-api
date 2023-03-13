const express = require('express')
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPasword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.route('/register').post(register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.get('/logout', logout)
router.put('/updatedetails', protect, updateDetails)
router.put('/updatepassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPasword)

module.exports = router
