let express = require('express');
const passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

let userModel = require('../model/user');
let User = userModel.User;

//display pages
module.exports.Home = (req,res,next) => {
    res.render('index', {
        title: 'Home',
        name: req.user ? req.user.name:''
    });
}
module.exports.About = (req,res,next) => {
    res.render('index', {
        title: 'About',
        name: req.user ? req.user.name:''
    });
}
module.exports.Content = (req,res,next) => {
    res.render('index', {
        title: 'Content',
        name: req.user ? req.user.name:''
    });
}
module.exports.Contact = (req,res,next) => {
    res.render('contact', {
        title: 'Contact',
        name: req.user ? req.user.name:''
    });
}
module.exports.Login = (req,res,next) => {
    if (!req.user){
        res.render('auth/login'),
        {
            title:'Login',
            name: req.user ? req.user.name: ''
        }
    }
    //redirects to main page if already logged on 
    else {
        return res.redirect('/')
    }
}
module.exports.processLogin = (req,res,next) => {
    passport.authenticate('local',(err,user,info) =>
    {
        //server error
        if(err){
            return next(err);
        }
        //login error
        if(!user){
            req.flash('AuthenticationError');
            return res.redirect('/login');
        }
        //user logs in
        if (err)
        {
            return next(err);
        }
        return res.redirect('/');
    }
    ) (req,res,next)
}
module.exports.Register = (req,res,next) => {
    //display register page is user isn't logged in
    if(!req.user){
        res.render('auth/register',
        {
            title: 'Register',
            name: req.user ? req.user.name: ''
        })
    }
    else {
        return res.redirect('/');
    }
}
module.exports.processRegisterPage = (req,res,next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name
    })
    User.register(newUser, req.body.password, (err) => {
        if(err){

        
        if(err.name=="UserExistsError") {
            req.flash('registerMessage', 'This user already exists');

        }
        return res.render('auth/register', {
            title: 'Register',
            //message
            name: req.user ? req.user.name:''
        });
    }
        //unsuccesful registration
        else {
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/');
            })
        }
    })
}
module.exports.performLogout = (req,res,next)=> {
    req.logout();
    //redirect to home page
    res.redirect('/');
}