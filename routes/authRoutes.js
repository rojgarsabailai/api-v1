const express = require("express");
const path = require("path");
const routes = express.Router();
const {Login,Register,ForgotPassword,verifyOTP,afterOtpVerified} = require("../controller/auth_controller/loginRegister");
const authenticationCheck = require("../middlewares/auth/authentication.middleware");
const authorizationCheck = require("../middlewares/authorization/authorization.role");

//GET ROUTES

routes.route("/register-1").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', '1sign-up'));
});
routes.route("/register-2").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', '2sign-up'));
});
routes.route("/login").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'login'));
});
routes.route("/forget-password").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'forget-password'));
});
routes.route("/new-password").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'new-password'));
});

routes.route("/otp-verify").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'otp-verify'),{ email: request.query.email });
});

routes.route("/postjob").get(authenticationCheck,authorizationCheck("employer"),(request,response)=>{
    response.render(path.join(__dirname,'..','views','postjob'));
});

routes.route("/admin-dashboard").get(authenticationCheck,authorizationCheck("admin"),(request,response)=>{
    response.send({sucess:true,message:"checking authorization"});
});





//POST ROUTES
routes.route("/api/v1/login").post(Login);
routes.route("/api/v1/register").post(Register);
routes.route("/api/v1/verify-otp").post(verifyOTP);
routes.route("/api/v1/register-2").post(afterOtpVerified);
routes.route("/api/v1/forgetpassword").post(ForgotPassword);

module.exports = routes;