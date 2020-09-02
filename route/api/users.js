const express = require('express');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

const router = express.Router();

// @route    POST api/users
// @desc     Register user

router.post('/', [
    check('userName', 'UserName is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('gender', 'Gender is required').not().isEmpty(),
    check('dob', 'BirthDay is required').not().isEmpty()
],
    
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {
            userName,
            gender,
            email,
            dob,
            news,
            status,
            skills,
            bio,
            avatar,
        } = req.body;

        

        skills = skills.split(',').map(skill => skill.trim());
        try {
            //see if user alreaady exist 
                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ errors : [{msg : 'User already exists'}] });
                }
            //gett user gravator
            if (!avatar) {
                avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
            }

            if (!news) {
                news = false;
            }
            
            user = new User({
                userName,
                gender,
                email,
                dob,
                news,
                status,
                skills,
                bio,
                avatar

            });
            await user.save();

            const payload = {
                user: {
                    id : user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error ');
        }


})

module.exports = router;

