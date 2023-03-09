const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return next(new ErrorResponse('No token, authorization denied', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)

    req.user = await User.findById(decoded.id)
    next()
  } catch (err) {
    return next(new ErrorResponse('No token, authorization denied', 401))
  }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not unauthorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
