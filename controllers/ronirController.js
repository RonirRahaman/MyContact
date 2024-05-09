const asyncHandler = require("express-async-handler");
const Contact = require("../models/ronirModel");

//@desc Get all contacts
//@rout GET all /api/ronir
//@access private
const getContacts = asyncHandler(async (req, res) =>
{
    try {
        const connects = await Contact.find({user_id: req.user.id});
        res.status(200).json(connects);
    } 
    catch (error) {
        console.error("Error creating contact:", error.message);
        res.status(500).json({ message: "Incorrect user details" });
    }
});

//@desc POst all contacts
//@rout Create /api/ronir
//@access private
const createContact = asyncHandler(async (req, res) => 
{
    try {
        const { name, email, phone, type } = req.body;

        if (!name || !email || !phone) {
            res.status(400);
            throw new Error("Incorrect parameters");
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id
        });
        res.status(201).json({contact,message: "Created Successfully"});
    } 
    catch (error) {
        console.error("Error creating contact:", error.message);
        res.status(500).json({ message: "Failed to create contact" });
    }
});

//@desc Get all contacts
//@rout GET /api/ronir
//@access private
const getContact = asyncHandler(async (req, res) =>
{
    try {
        const contactId = req.params.id;
        const connect = await Contact.find({user_id: contactId});

        if (!connect) {
            res.status(404);
            throw new Error("Contact not found");
        }
        res.status(200).json(connect);
    } 
    catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "Invalid contact ID" });
    }
       
});

//@desc Update contacts
//@rout PUT /api/ronir/:id
//@access private
const updateContact = asyncHandler(async (req, res) =>
{
    try {
        const contactId = req.params.id;
        const connect = await Contact.findById(contactId);

        if (!connect) {
            res.status(404);
            throw new Error("Contact not found");
        }

        if (connect.user_id.toString() !== req.user.id) {
            res.status(404);
            throw new Error("User don't have permission to update other user contacts");
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            req.body,
            { new: true}
        );

        res.status(200).json({updatedContact, message: "Updated Successfully"});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "Failed to Update" });
    }
});

//@desc Get all contacts
//@rout Delete /api/ronir
//@access private
const deleteContact = asyncHandler(async (req, res) =>
{
    try {
        const contactId = req.params.id;
        const connect = await Contact.findById(contactId);

        if (!connect) {
            res.status(404);
            throw new Error("Contact not found");
        }

        if (connect.user_id.toString() !== req.user.id) {
            res.status(404);
            throw new Error("User don't have permission to update other user contacts");
        }

        // await Contact.remove();
        await Contact.findOneAndDelete({_id: contactId});
        res.status(200).json({connect, message: "Contact Deleted Successfully"});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "Failed to Delete" });
    }
    // res.status(200).json({ message: `Delete contact for ${req.params.id}`});
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
