const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@rout GET all /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => 
{
    try {
        const {username,email,password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const userAvailable = await User.findOne({email});
        // console.log(userAvailable);

        if (userAvailable) {
            return res.status(400).json({ message: "User already registered" });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
                        username,
                        email,
                        password: hashedPassword,
                    });
        
        // console.log("Hashed password", hashedPassword);
        if (user) {
            res.status(201).json({_id: user.id, email: user.email, message: "Register the user" });
        }
        else {
            return res.status(400).json({ message: "User data is not valid" });
        }
    } 
    catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
    
});

//@desc Login user
//@rout POST all /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate JWT Token
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "20m",
                    issuer: "Ronir",
                }
            );

            return res.status(200).json({ accessToken, id: user.id });
        } else {
            return res.status(401).json({ message: "Email or password is not valid" });
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

//@desc currect user info
//@rout POST all /api/users/currect
//@access private
const currentUser = asyncHandler(async (req, res) => 
{
    res.json({ message: req.user});
});

module.exports = { registerUser, loginUser, currentUser };
