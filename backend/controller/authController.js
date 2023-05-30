const formidable = require('formidable');
const validator = require('validator');
const registerModel = require('../models/authModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userRegister = (req, res) => {

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        // console.log(fields);
        const { username, email, password, confirmPassword } = fields;
        const { image } = files;
        const errors = [];
        if (!username) {
            errors.push('Username is required');
        }
        if (!email) {    
            errors.push('Email is required');
        }
        if (email && !validator.isEmail(email)) {
            errors.push('Email is invalid');
        }
        if (!password) {
            errors.push('Password is required');
        }
        if (!confirmPassword) {
            errors.push('Confirm Password is required');
        }
        if (password && confirmPassword && password !== confirmPassword) {
            errors.push('Password and Confirm Password does not match');
        }
        if (password && password.length < 6) {
            errors.push('Password must be at least 6 characters');
        }
        if (Object.keys(files).length === 0) {
            errors.push('Image is required');
        }
        // console.log(errors);
        if (errors.length !== 0) {
            res.status(400).json({
                error: {
                     errorMessage: errors
                }
           })
        }
        else {

            const getImageName = files.image.originalFilename;
            const randNumber = Math.floor(Math.random() * 99999999);
            const newImageName = randNumber + '_' + getImageName;

            files.image.originalFilename = newImageName;

            const newPath = `${__dirname}/../../frontend/public/image/${newImageName}`;

            try{
                const checkUser = await registerModel.findOne({ email : email });
                // console.log(checkUser);
                if (checkUser) {
                    res.status(400).json({
                        error: {
                             errorMessage: ['Your email already exited']
                        }
                   })
                }
                else {
                    fs.copyFile(files.image.filepath, newPath, async (err) => {
                        if(!err){
                            const userCreate = await registerModel.create({
                                username: username,
                                email: email,
                                password: await bcrypt.hash(password, 10),
                                image: files.image.originalFilename
                            });

                            const token = jwt.sign({ 
                                id: userCreate._id , 
                                email : userCreate.email,
                                username : userCreate.username,
                                image : userCreate.image,
                                registerTime : userCreate.createdAt
                            }, process.env.JWT_SECRET, { expiresIn: '1d' });
                            
                            const options = {
                                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                            }
                            
                            res.status(201).cookie('authToken', token, options).json({
                                successMessage: 'You have registered successfully', token
                            });
                        }
                        else{
                            res.status(500).json({
                                error: {
                                     errorMessage: ['Internal Server Error']
                                }
                           })
                        }
                    });
                }
            } catch(error) {
                res.status(500).json({
                    error: {
                         errorMessage: ['Internal Server Error']
                    }
               })
            }
        }
    });
    // console.log('registering user');
    // res.send('This is from authController');
}

module.exports.userLogin = async (req, res) => {
    const error = [];
    const { email, password } = req.body;

    if (!email) {
        error.push('Email is required');
    }
    if (email && !validator.isEmail(email)) {
        error.push('Email is invalid');
    }
    if (!password) {
        error.push('Password is required');
    }

    if (error.length !== 0) {
        res.status(400).json({
            error: {
                errorMessage: error
            }
        })
    }
    else {
        try{
            const checkUser = await registerModel.findOne({ email : email }).select('+password');
            // console.log(checkUser);

            if(checkUser){
                const matchPassword = await bcrypt.compare(password, checkUser.password);
                // console.log(matchPassword);
                if(matchPassword){
                    const token = jwt.sign({ 
                        id: checkUser._id , 
                        email : checkUser.email,
                        username : checkUser.username,
                        image : checkUser.image,
                        registerTime : checkUser.createdAt
                    }, process.env.JWT_SECRET, { expiresIn: '1d' });

                    const options = {
                        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    }
                    
                    res.status(200).cookie('authToken', token, options).json({
                        successMessage: 'You have logged in successfully!', token
                    });
                }
                else{
                    res.status(400).json({
                        error: {
                             errorMessage: ['Password is wrong']
                        }
                   })
                }
            }
            else{
                res.status(400).json({
                    error: {
                         errorMessage: ['Your email is not registered']
                    }
               })
            }
        }
        catch(error) {
            res.status(500).json({
                error: {
                     errorMessage: ['Internal Server Error']
                }
           })
        } 
    }
}