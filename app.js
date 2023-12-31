const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

let items = ["Buy food", "cook food", "eat food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;

app.set('view engine', 'ejs');

app.get("/", function(req, res){
 let day = date.getDate();

 res.render("list", {listTitle: day, newListItems: items});
});

////////////////Home route
app.post("/", (req, res) => {

  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

  });


///////////////////work route
app.get("/work", function(req, res){
  res.render("list", {listTitle: "work list", newListItems: workItems});
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

//////////////////////about route
app.get("/about", function(req, res){
  res.render("about");
});


app.listen(port, function(){
  console.log("Server is running on port 3000");
});
