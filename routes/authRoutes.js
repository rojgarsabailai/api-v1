const express = require("express");
const routes = express.Router();
const {Login,Register,ForgotPassword,verifyOTP} = require("../controller/auth_controller/loginRegister");
const path = require("path");



//GET ROUTES
routes.route("/register").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', 'sign-up'));
});
routes.route("/login").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', 'login'));
});
routes.route("/forget-password").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', 'forget-password'));
});
routes.route("/new-password").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', 'new-password'));
});

routes.route("/otp-verify").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', 'otp-verify'),{ email: request.query.email });
});







//POST ROUTES
routes.route("/api/v1/login").post(Login);
routes.route("/api/v1/register").post(Register);
routes.route("/api/v1/verify-otp").post(verifyOTP);
routes.route("/api/v1/forgetpassword").post(ForgotPassword);
module.exports = routes;