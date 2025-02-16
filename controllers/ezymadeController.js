const asyncHandler = require("express-async-handler");
const Exymade = require("../models/ezymadeModel");

//@desc Save Ezymade Data
//@rout GET all /api/ezymade/save
//@access public
const ezymadeData = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, service, service_fet, sel_details} = req.body;

        if (!name || !email || !phone || !service || !service_fet || !sel_details) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if the email or phone is already used
        const existingUser = await Exymade.findOne({ 
            $or: [{ email }, { phone }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.email === email 
                    ? "Email already exists!" 
                    : "Phone number already exists!" 
            });
        }

        // Create a new entry
        const exymadeEntry = await Exymade.create({
            name,
            email,
            phone,
            service,
            service_fet,
            sel_details,
        });

        res.status(201).json({
            message: "Welcome to Ezymade!",
            data: exymadeEntry
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { ezymadeData };
