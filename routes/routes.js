const express = require('express');
const router = express.Router();
const User = require("../models/users");
const multer = require('multer');
const users = require('../models/users');
const Login = require("../models/login");
const register = require('../models/register');
const fs = require('fs');

// for google authentication--
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: '809318911396-k49tfu12oqt228hiqlitcq254srfqrrq.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        Login.findOne({ googleId: profile.id }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            // Create a new user if not found
            const newUser = new Login({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails,
                // mobileNumber: profile.mobileNumber,
                // password: profile.password

            //   emails: profile.emails
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          } else {
            return done(null, user);
          }
        });
      }
    )
  );

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});
  
  router.use(passport.initialize());
  router.use(passport.session());
  
  // Routes
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
  
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/con' }),
    (req, res) => {
      res.redirect('/');
    }
  );
  
//   app.get('/', (req, res) => {
//     res.send(req.isAuthenticated() ? `Hello, ${req.user.displayName}!` : 'Guest');
//   });
  


//image upload----
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
}).single('image');

// var uploadMultiple = upload.fields([{name: 'image',maxCount: 1}, {name: 'p1_5',maxCount: 1}]);
// var upload = upload.array("image");

//insert an user into database route----
router.post("/add", upload, (req, res) =>{
    const user = new User({ 
        tname: req.body.tname,
        sp_1: req.body.sp_1,
        sp_2: req.body.sp_2,
        village: req.body.village,
        captain: req.body.captain,
        phone: req.body.phone,
        image: req.file.filename,
        p1_1: req.body.p1_1,
        p1_2: req.body.p1_2,
        p1_3: req.body.p1_3,
        p1_4: req.body.p1_4,
        // p1_5: req.files.filename,
        p2_1: req.body.p2_1,
        p2_2: req.body.p2_2,
        p2_3: req.body.p2_3,
        p2_4: req.body.p2_4,
        // p2_5: req.files.filename,
        p3_1: req.body.p3_1,
        p3_2: req.body.p3_2,
        p3_3: req.body.p3_3,
        p3_4: req.body.p3_4,
        // p3_5: req.files.filename,
        p4_1: req.body.p4_1,
        p4_2: req.body.p4_2,
        p4_3: req.body.p4_3,
        p4_4: req.body.p4_4,
        // p4_5: req.files.filename,
        p5_1: req.body.p5_1,
        p5_2: req.body.p5_2,
        p5_3: req.body.p5_3,
        p5_4: req.body.p5_4,
        // p5_5: req.files.filename,
        p6_1: req.body.p6_1,
        p6_2: req.body.p6_2,
        p6_3: req.body.p6_3,
        p6_4: req.body.p6_4,
        // p6_5: req.files.filename,
        p7_1: req.body.p7_1,
        p7_2: req.body.p7_2,
        p7_3: req.body.p7_3,
        p7_4: req.body.p7_4,
        // p7_5: req.files.filename,
        p8_1: req.body.p8_1,
        p8_2: req.body.p8_2,
        p8_3: req.body.p8_3,
        p8_4: req.body.p8_4,
        // p8_5: req.files.filename,
        p9_1: req.body.p9_1,
        p9_2: req.body.p9_2,
        p9_3: req.body.p9_3,
        p9_4: req.body.p9_4,
        // p9_5: req.files.filename,
        p10_1: req.body.p10_1,
        p10_2: req.body.p10_2,
        p10_3: req.body.p10_3,
        p10_4: req.body.p10_4,
        // p10_5: req.files.filename,
        p11_1: req.body.p11_1,
        p11_2: req.body.p11_2,
        p11_3: req.body.p11_3,
        p11_4: req.body.p11_4,
        // p11_5: req.files.filename,
        p12_1: req.body.p12_1,
        p12_2: req.body.p12_2,
        p12_3: req.body.p12_3,
        p12_4: req.body.p12_4,
        // p12_5: req.files.filename,
        p13_1: req.body.p13_1,
        p13_2: req.body.p13_2,
        p13_3: req.body.p13_3,
        p13_4: req.body.p13_4,
        // p13_5: req.files.filename,
    });
    user.save((err) =>{
        if(err){
            res.json({ message: err.message, type: "danger"}); 
        } else{
            req.session.message = {
                type: "success",
                message: "Team added successfully!",
            };
            res.redirect("/teams");  
        }
    });
});

// app.use(express.static("public"));
router.get("/", (req, res) => {
    // res.render(__dirname + '/view/index.ejs');
    // res.send("Kya kr rhe ho");
    // res.render('index', { title:"LEHARI BRAND"});
    User.find().exec((err,users) => {
        if(err){
            res.json({message: err.message});
        } else{
            res.render('index',{
                title:"LEHARI",
                users: users,
            });
        }
    });
});
router.get("/add", (req, res) => {
    res.render('add_user', { title : "User page"});
});

// main signup page-----
router.get("/con",(req, res) => {
    res.render("google_user");
});

// admin page---
router.get("/admin", (req, res) => {
    User.find().exec((err,users) => {
        if(err){
            res.json({message: err.message});
        } else{
            res.render('admin',{
                title:"LEHARI",
                users: users,
            });
        }
    });
    // res.render('admin', {title : "Admin page"});
});

// admin2.ejs
router.get("/admin2", (req,res) => {
    res.render("admin2");
});

// edit team---
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err){
            res.redirect("/");
        } else{
            if(user == null){
                res.redirect("/");
            }
            else{
                res.render("add_user2", {
                    title: "Edit User",
                    user: user,
                });
            }
        }
    });
});

// contact page---
router.get("/contact", (req, res) =>{
    res.render('contact', {title: "Contact Page"});
})

// team page---
router.get("/teams", (req, res)  =>{
    // res.render("teams", { title: "Team-View"});
    User.find().exec((err,users) => {
        if(err){
            res.json({message: err.message});
        } else{
            res.render('teams',{
                title:"LEHARI",
                users: users,
            });
        }
    })
});

// signup page----
router.get("/sign", (req,res) => {
    res.render('signup',{title: "Sign Up"});
});

router.post("/sign", async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

        // sign_name: req.body.sign_name,
        // team_village: req.body.team_village,
        // team_id: req.body.team_id,
        // team_pass: req.body.team_pass
    }
    await register.insertMany([data]);
    res.render("login", { title: "login"});
});

// login page---
router.get("/login", (req,res) => {
    res.render("login", { title: "login"});
});

router.get("/team/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err){
            res.redirect("teams");
        } else{
            if(user == null){
                res.redirect("teams");
            }
            else{
                res.render("team", {
                    title: "View Team",
                    user: user,
                });
            }
        }
    });
});

// router.get("/team/:id", (req,res) => {
//     const Id = req.params.Id;

//     // Assuming you have a function to fetch team data by ID from your database
//     // const teamData = fetchTeamDataById(teamId);
    
//     // database ti data niklva ru logic
//     User.findById(id, (err, user) => {
//                 if(err){
//                     res.redirect("/");
//                 } else{
//                     if(user == null){
//                         res.redirect("/");
//                     }
//                     else{
//                         res.render("edit_users", {
//                             title: "Edit User",
//                             user: user,
//                         });
//                     }
//                 }
//             });

//     res.render('team', { team: teamData });
// });

// router.get("/edit/:id", (req, res) => {
//     let id = req.params.id;
//     User.findById(id, (err, user) => {
//         if(err){
//             res.redirect("/");
//         } else{
//             if(user == null){
//                 res.redirect("/");
//             }
//             else{
//                 res.render("edit_users", {
//                     title: "Edit User",
//                     user: user,
//                 });
//             }
//         }
//     });
// });

router.post("/login", async(req, res) => {
    try {
        const check = await register.findOne({ team_id: req.body.team_id});
        if(check.team_pass === req.body.team_pass){
            res.render("add_user",{title: "User page"});
        }
        else{
            req.session.message = {
                type: "danger",
                message: "Wrong Password",
            };
            // res.send("Wrong password");
            res.redirect("/login");
            // res.render("login", {title: "login"});
        }
    } 
    catch {
        // res.send("Please..... Enter a valid id and password");
        req.session.message = {
            type: "danger",
            message: "input wrong id and password",
        };
        // res.send("Wrong password");
        res.redirect("/login");
    }
});

// Edit an user route---
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err){
            res.redirect("/");
        } else{
            if(user == null){
                res.redirect("/");
            }
            else{
                res.render("edit_users", {
                    title: "Edit User",
                    user: user,
                });
            }
        }
    });
});

// Update User route 
router.post("/update/:id", upload, (req, res) => {
    let id = req.params.id;
    let new_image = "";

    if(req.file) {
        new_image = req.file.filename;
        try {
            // if we want to change image---
            fs.unlinkSync("./uploads/" + req.body.old_image);
        } catch(err){
            console.log(err);
        }
    } else{
        //else old image hi rhega--
        new_image = req.body.old_image;
    }

    User.findByIdAndUpdate(id, {
        tname: req.body.tname,
        sp_1: req.body.sp_1,
        sp_2: req.body.sp_2,
        village: req.body.village,
        captain: req.body.captain,
        phone: req.body.phone,
        image: req.file.filename,
        p1_1: req.body.p1_1,
        p1_2: req.body.p1_2,
        p1_3: req.body.p1_3,
        p1_4: req.body.p1_4,
        // p1_5: req.files.filename,
        p2_1: req.body.p2_1,
        p2_2: req.body.p2_2,
        p2_3: req.body.p2_3,
        p2_4: req.body.p2_4,
        // p2_5: req.files.filename,
        p3_1: req.body.p3_1,
        p3_2: req.body.p3_2,
        p3_3: req.body.p3_3,
        p3_4: req.body.p3_4,
        // p3_5: req.files.filename,
        p4_1: req.body.p4_1,
        p4_2: req.body.p4_2,
        p4_3: req.body.p4_3,
        p4_4: req.body.p4_4,
        // p4_5: req.files.filename,
        p5_1: req.body.p5_1,
        p5_2: req.body.p5_2,
        p5_3: req.body.p5_3,
        p5_4: req.body.p5_4,
        // p5_5: req.files.filename,
        p6_1: req.body.p6_1,
        p6_2: req.body.p6_2,
        p6_3: req.body.p6_3,
        p6_4: req.body.p6_4,
        // p6_5: req.files.filename,
        p7_1: req.body.p7_1,
        p7_2: req.body.p7_2,
        p7_3: req.body.p7_3,
        p7_4: req.body.p7_4,
        // p7_5: req.files.filename,
        p8_1: req.body.p8_1,
        p8_2: req.body.p8_2,
        p8_3: req.body.p8_3,
        p8_4: req.body.p8_4,
        // p8_5: req.files.filename,
        p9_1: req.body.p9_1,
        p9_2: req.body.p9_2,
        p9_3: req.body.p9_3,
        p9_4: req.body.p9_4,
        // p9_5: req.files.filename,
        p10_1: req.body.p10_1,
        p10_2: req.body.p10_2,
        p10_3: req.body.p10_3,
        p10_4: req.body.p10_4,
        // p10_5: req.files.filename,
        p11_1: req.body.p11_1,
        p11_2: req.body.p11_2,
        p11_3: req.body.p11_3,
        p11_4: req.body.p11_4,
        // p11_5: req.files.filename,
        p12_1: req.body.p12_1,
        p12_2: req.body.p12_2,
        p12_3: req.body.p12_3,
        p12_4: req.body.p12_4,
        // p12_5: req.files.filename,
        p13_1: req.body.p13_1,
        p13_2: req.body.p13_2,
        p13_3: req.body.p13_3,
        p13_4: req.body.p13_4,
        // p13_5: req.files.filename,
    }, (err, result) => {
        if(err){
            res.json({ message: err.message, type: "danger"});
        } else{
            req.session.message = {
                type: 'success',
                message: 'User updated successfully!',
            };
            res.redirect("/");
        }
    });
});

// Delete User route---
router.get("/delete/:id", (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, result) => {
        if(result.image != "") {
            try{
                fs.unlinkSync("./uploads/" + result.image);
            } catch(err){
                console.log(err);
            }
        }

        if(err){
            res.json({message: err.message});
        } else{
            req.session.message = {
                type: "info",
                message: "User deleted successfully!",
            };
            res.redirect("/");
        }
    })
})

module.exports = router;