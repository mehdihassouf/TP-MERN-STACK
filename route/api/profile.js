const express = require('express');
const router = express.Router();
const auth = require('../../middlware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  GET api/profile
// @desc   update profile

router.put('/user/:user_id' , [
        check('userName', 'UserName is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('gender', 'Gender is required').not().isEmpty(),
        check('dob', 'BirthDay is required').not().isEmpty()
    ], async (req, res) => {
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
            bio
        } = req.body;

        //build profile object 

        const profileFields = {};
        profileFields.userName = userName,
        profileFields.gender = gender,
        profileFields.email = email,
        profileFields.dob = dob,
        profileFields.news = news, 
        profileFields.status= status    
        profileFields.bio = bio,
        profileFields.skills = skills.split(',').map(skill => skill.trim());
        
        console.log(req.params.user_id);
        
        try {
            let profile = await User.findOneAndUpdate(
                    { _id : req.params.user_id  },
                    { $set: profileFields },
                    { new: true }
            )
            
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error ');
        }
    
});

// @route  GET api/profile
// @desc   get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await User.find().populate('user', ['userName', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error ');
    }
});

// @route  GET api/profile/user/:user_id
// @desc   GET profile by id
router.get('/:user', async (req, res) => {
    try {
        const profile = await User.findOne({ _id: req.params.user });
        res.json(profile);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            
                res.status(400).send('invalid id');
            }
        
        res.status(500).send('Server error ');
    }
})
// @route  GET api/profile/user/:userName
// @desc   GET profile by username
router.get('/user/:userName',
    async (req, res) => {


    try {
        const profile = await User.find({ userName : new RegExp(req.params.userName, 'i') })
        res.json(profile);
    } catch (err) {
        if (err.kind == 'ObjectId') {

            res.status(400).send('invalid id');
        }

        res.status(500).send('Server error ');
    }
})

// @route  delete api/profile/user/:user_id
// @desc   delete user & profile
router.delete('/user/:user_id',
    async (req, res) => {

    try {
        //user profile
        await User.findOneAndDelete({ _id : req.params.user_id });
        res.json('deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error ');
    }
})


module.exports = router;

