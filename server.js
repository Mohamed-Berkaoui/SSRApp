const express = require("express");
const path = require("path");
const crypto = require("crypto");

var todos = [
  { task: "task1", completed: true, id: 1 },
  { task: "task2", completed: false, id: 2 },
];

const app = express();
app.set("views", "html");
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.render("index.ejs", { tasks: todos });
});

app.get("/addtodo", function (req, res) {
  res.render("addtodo.ejs");
});

app.post("/add", function (req, res) {
  const task = req.body.name;

  todos.push({
    task: task,
    id: crypto.randomBytes(5).toString("hex"),
    completed: false,
  });
res.redirect('/')
}); 



app.post('/update',function(req,res){
 for (let i = 0; i < todos.length; i++) {
    if(todos[i].id==req.body.id){
        todos[i].completed=!todos[i].completed
    }
 }
res.redirect('/')
})

app.post('/delete/:id',function(req,res){
    todos=todos.filter(todo=>todo.id!=req.params.id)
    res.redirect('/')
 }) 
 app.get('/changename/:id',function(req,res){
    const id=req.params.id
    const todo=todos.find(ele=>ele.id==id)
    res.render('updateTodo.ejs',{todo:todo})
 })
 app.post('/changename/:id',function(req,res){
        for (let i = 0; i < todos.length; i++) {
            if(todos[i].id==req.params.id){
                todos[i].task=req.body.task
            }  
        }
        res.redirect('/')
 })
const port = 8000;  
app.listen(port, () => console.log(`server running on port ${port}`));
