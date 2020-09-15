var mongoose = require("mongoose");
var CampGround = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "M1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsTorUnhD8lhxDJNziR7RWVgAve2qh0zdI3ubdqF5f2a26BKRe&usqp=CAU",
        description: "this is M1",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "M2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQa6MdT8kO6SAHlPgb09sfHxZwtpztTvf-p1w3gsPG45RNuxSS8&usqp=CAU",
        description: "this is M2",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "M3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-cvQB9CrCgqLXOOlZiQw0xQaQaneEGFJw7jvtp7yUgc2Ex8DW&usqp=CAU",
        description: "this is M3",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        }
    }
]

function seedDB(){
    //Remove all Campgrounds
    CampGround.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed campground");
            // Add a few campgrounds
            data.forEach(function(seed){
                CampGround.create(seed, function(err, campground){
                    if (err){
                        console.log(err);
                    }else{
                        console.log('added a campground');
                        //create a Comments
                        Comment.create({
                            text: "This is so good!",
                            author:{
                                id : "588c2e092403d111454fff76",
                                username: "Jack"
                            }
                        }, function(err, comment){
                            if (err){
                                console.log(err)
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("create new comment");
                            }
                        })
                    }
                })
            })
    })
}

module.exports = seedDB;