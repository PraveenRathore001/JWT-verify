const nodemailer = require('nodemailer');
const cron = require('cron-job');
const User = require("../model/UserSchema");
// const tokenfile=require('../controller/middleware')
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

// const Crypto = require("crypto-js");
const Crypto = require("crypto");
// const { updateOne, db } = require("../model/UserSchema");

const signUp = async (req, res) => {
    const { name, email, password, age } = req.body;
    // console.log(req.body, 'praveen');
    // const userData = new User(req.body);
    try {
        const userExists = await User.findOne({ email: email });
        console.log(userExists);
        if (userExists) {
            return res.json({
                status: 403,
                message: "Email Already Exist",
            });
        } else {
            console.log(req.body.password);
            console.log(userData, "user");
            const hash = Crypto.createHmac("sha256", password).digest("hex");
            userData.password = hash
            console.log(userData.password);
            const addData = await userData.save();
            console.log(addData);
            res.json({
                status: 201,
                message: "Data save Successfully",
                data : addData
            });
        }
    } catch (error) {
        res.json({
            status: 500,
            message: "Somthing Went Wrong",
           
        });
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const isuser = await User.findOne({ email: email })
        console.log(isuser);

        if (isuser != null) {
            // const userpass = await User.findOne({ password: password })
            // const isMatch = await Bcrypt.compare(password, isuser.password);
            let data = Crypto.createHmac("sha256", password).digest("hex");
            if (data == isuser.password) {
                console.log("hii");
                const token = Jwt.sign(
                    { userID: isuser._id },
                    process.env.secret,
                    { expiresIn: "15d" }
                );
                console.log(token);
                
                // mailsender();


            
                  

               
               // cron.schedule('*/05 * * * * *', () => {
                //     console.log('running every sec to 1 from 5');
                    
                //     // console.log('hello evrryone');
                // });
                res.status(200).json({
                    status: 200,
                    message: "Login Successfully",
                    token: token,
                    data: isuser
                })



            } else {
                res.json({
                    message: "password incorrect"
                })
            }
        }
        else {

            res.status(404).json({
                status: 404,
                message: 'login credentials mismatched kindly check it'
            })
        }

    }
    catch (err) {
        res.json({
            message: err

        })

    }
}
const update = async (req, res) => {
    let data = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        
    })
    console.log(data);
    let result = await data.save()
    res.send(result)
    console.log(result);

}



const mailsender = function () {
    let mailTransporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'rishabhshri20@outlook.com',
            pass: 'Rishabh@123'
        }
    });

    let mailDetails = {
        from: 'rishabhshri20@outlook.com',
        to: 'praveenrathore236@gmail.com',
        subject: 'Test mail',
        text: 'Node.js testing mail for GeeksforGeeks'
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }

    })
}
const agegreat=async(req,res)=>{
    const ddd=req.body
    await res.send(db.signuplogins.aggregate([{$match:{age:{$gt:30}}}]))
}





module.exports = { signUp, logIn, update}