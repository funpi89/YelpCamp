var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    });
});

router.post("/", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username : req.user.username
    }
    var new_campground = {name:name, image:image, description:desc, author: author};
    // create a new campground and save in DB
    Campground.create(new_campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to the campgrounds page
            res.redirect("/campgrounds");
        }
    });
   
});

router.get("/new", middleware.isLoggedIn, function (req, res) { 
    res.render("campgrounds/new");
 });

 // show more info about one campground
router.get("/:id", function (req, res) {
Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if(err){
        console.log(err);
    }else{
        console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
    }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){    
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;