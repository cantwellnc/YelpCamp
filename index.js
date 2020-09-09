// SETUP
const express = require("express"); 
const app = express();
const ejs = require("ejs"); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground"); 
const seedDB = require("./seeds"); 

// connect mongoose to app
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended: true})); 

// Seed database with test data
seedDB(); 

// ROUTES
app.get("/", (req, res)=> {
	res.render("landing"); 
})

// INDEX
app.get("/campgrounds", (req, res)=> {
	// retrieve from db
	Campground.find({},(err, allCampgrounds)=> {
		if(err){
			console.log("error: "+ err); 
		}
		else{
			res.render("campgrounds/campgrounds", {campgrounds:allCampgrounds});
		}
	});

	 
})

// CREATE
app.post("/campgrounds", (req, res)=> {
	// get data from form + add to campgrounds array
	var name = req.body.name; 
		image = req.body.image; 
		description = req.body.description; 
		newCampground = {name: name, image: image, description: description}; 
	// create new campground and save to db
	Campground.create(newCampground, (err, newCampground)=> {
		if(err){
			console.log("error: "+ err); 
		}
		else{
			// redirect back to /campgrounds
			res.redirect("/campgrounds");
		}
	});

})

//NEW
app.get("/campgrounds/new", (req, res)=> {
	res.render("campgrounds/new");
})

// SHOW
app.get("/campgrounds/:id", (req, res)=> {
	// find specific campground user clicked on in DB
	Campground.findById((req.params.id)).populate("comments").exec((err, foundCampground) =>{
		if(err){
			console.log(`error: ${err}`); 
		}
		else{
			// bring back and render a page that displays more info about it
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
})

// =============================================================================================
// COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", (req, res)=> {
	res.render("comments/new"); 
})


app.listen("3000", ()=>{
	console.log("serving on localhost:3000");
})