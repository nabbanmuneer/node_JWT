const registerModel = require('../models/registerModel');
const locationModel = require('../models/location');
const postModel = require('../models/postModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const passport = require("passport");


const register = async (req, res) => {
    let { email, name, password } = req.body;
    console.log("req", req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const data = new registerModel({
            name: name,
            email: email,
            password: password
        });
        await data.save().then(() => {
            res.status(200).json({ data })
        }).catch((error) => {
            res.sendStatus(400);
        })
    } catch (error) {
        res.sendStatus(404);
    }
}
exports.register = register

const Login = async (req, res) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ msg: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.json({ token });
            });
        })(req, res, next);

    } catch (error) {
        res.sendStatus(404);
    }
}
exports.Login = Login

const logout = (req, res) => {

    req.logout();
    res.json({ message: 'Logout successful.' });

}
exports.logout = logout;

const post = async (req, res) => {
    try {
        const id = req.params;
        const { title, body, location, status } = req.body;
        const locationStatus = await locationModel.find({ name: location });
        if (location) {
            const postdata = new postModel({
                title: title,
                body: body,
                location: loaction,
                useuserId: id,
                status: status
            })
        } else {
            res.status(200).json({ msg: "location not register" });
        }

    } catch (error) {
        res.status(400).json({ msg: "location not register" });
    }
}
exports.post = post;

const searchLocation = async (req, res) => {
    try {
        const { log, lat } = req.body;
        const locationData = await locationModel.find({
            coordinates:
            {
                $elemMatch: {
                    latitude: lat, logitude: log
                }
            }
        })
        await postModel.deleteMany({ location: locationData.name }).then(() => {
            res.status(200).json({ msg: "successfull" })
        }).catch((error) => {
            res.sendStatus(404);
        })
    } catch (error) {
        res.status(400).json({ msg: "location not register" });
    }
}
exports.searchLocation = searchLocation

const status = async (req, res) => {
    try{const active = await postModel.aggregate[{
        $match: {
            status: "active"
        }
    },{ 
        $group: {
             _id: null,
              count: { $sum: 1 } 
            } 
    }
    ]
    const deactive = await postModel.aggregate[{
        $match: {
            status: "deactive"
        }
    },{ 
        $group: {
             _id: null,
              count: { $sum: 1 } 
            } 
    }
    ]
    res.status(200).json({active:active.count,deactive:deactive.count})
    }catch(error){
        res.sendStatus(404)
    }
}
exports.status =status
