const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Min pass 6 symbols')
      .isLength({min: 6}),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array(), message: 'wrong registration data'});
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({ email });

    if(candidate){
      return res.status(400).json({message: 'User exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const uer = new User({email, password: hashedPassword});

    await user.save();

    res.status(201).json({message: 'User created'});
  } catch (e) {
    res.status(500).json({message: '500 error - register'});
  }
});

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Wrong email').normalizeEmail().isEmail(),
    check('password', 'Min pass 6 symbols').exists(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array(), message: 'wrong registration data'});
    }

    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({message: 'No such user'});
    }

    const isMatch = bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({message: 'Wrong password'});
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      config.get('jwtSecret'),
      {
        expiresIn: '1h'
      }
    );

    res.json({token, userId: user.id});
  } catch (e) {
    res.status(500).json({message: '500 error - login'});
  }
});

module.exports = router;