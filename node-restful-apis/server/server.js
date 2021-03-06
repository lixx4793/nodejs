const express = require("express") ;
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

const {mongoose} = require("./db/db_config.js");
const {Todo} = require("./orm_models/Todo.js");
const {User} = require("./orm_models/User.js");

var app = express();
//  set up server port for heroku deployment
var port = process.env.PORT || 3000;

// declare middle ware using
app.use(bodyParser.json());

// Handle post request that save a todo object to db
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


//  handle get request that return all todo from db
app.get("/todos", (req, res) =>{
  Todo.find().then( (todos) => {
    res.send({todos});
  }, (e)=> {
    res.status(400).send(e);
  });
});

// handle get request that search a id from db
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send("Id is invalid");
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send("Id is not found");
    }
      res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })
});

//  Listen to port 3000
app.listen(port, () => {
  console.log(`Listening port ${port}`);
})
module.exports = {app};
