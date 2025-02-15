const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;

// app.get('/api/ronir', (req, res) =>{
//     // res.send("we are working");
//     // res.json({ message: "we are working"});
//     res.status(200).json({ message: "we are working"});
// });

app.use(cors());

app.use(express.json()); //use in-build middle ware 
app.use("/api/ronir", require("./routes/ronirRoutes")); // known as midel ware
app.use("/api/users", require("./routes/userRoutes")); // user will have token to use it.
app.use("/api/ezymade", require("./routes/ezymadeRoutes")); // user for Ezymade
app.use(errorHandler); //custom middle ware for error handler (json)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
