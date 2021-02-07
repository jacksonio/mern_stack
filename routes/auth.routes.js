const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()
const {check, validationResult} = require('express-validator')


router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min length of password is 6 digits').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data'
                })
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'The user is already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json({message: 'Successfully created'})

        } catch {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
    })
router.post('/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data in login input fields'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User doesn\'t exists'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Some data is wrong'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({
                token,
                userId: user.id
            })


        } catch {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
    })

module.exports = router
