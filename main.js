// import

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

// database connection-----
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Your database is connected sucessfully"));

// middle ware ----
app.use(express.urlencoded({extended:true}));
app.use("/css",express.static('css'));
app.use( express.static( "public" ) );
app.use(express.json());
app.use(
    session({
        secret:"My secret key",
        saveUninitialized: true,
        resave: true
    })
    );
    
    // storing session message
    app.use((req, res, next) => {
        res.locals.message = req.session.message;
        delete req.session.message;
        next();
    });
    
    // for image view
    // app.use(express.static("/img"));
app.set("view engine", "ejs");
app.use(express.static("uploads"));
// set template engine

// routes prefix
app.use("", require("./routes/routes"));

// app.get("/", (req, res) => {
//     // res.send("Hello dilip");
//     // res.render('index.ejs');
// });

app.listen(PORT , () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
