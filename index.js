import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let blogs = [];
var toEdit = 0;
let value=0;
var add ="styles/main.css";

app.post("/togdark",(req,res)=>{
    if(value===0){
        value=1;       
    }
    else{
        value=0;
    }
    res.redirect("/");
});
app.get("/", (req, res) => {
    var date = new Date();
    var year = date.getFullYear();
    if(value===1){
        add="styles/dark.css";
    }
    else{
        add="styles/main.css";
    }
    res.render("index.ejs", { blogs, year ,value ,add});
});

app.post("/createNew", (req, res) => {
    var date = new Date();
    var year = date.getFullYear();
    res.render("createpage.ejs",{year,value,add});
});



app.post("/postbutton", (req, res) => {
    var date = new Date();
    var min=date.getMinutes();
    if(date.getMinutes<10){
        var min=`0${date.getMinutes()}`;
    }
    blogs.push({
        title: req.body["newtitle"],
        content: req.body["newcontent"],
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        day: `${date.getHours()}:${min}`
    });
    res.redirect("/");
});

app.post("/editpost", (req, res) => {
    var date = new Date();
    var year = date.getFullYear();
    toEdit = req.body["editbutton"];
    res.render("changepostpage.ejs", { blogs, toEdit, year ,add});
});

app.post("/changepostbutton", (req, res) => {
    blogs[toEdit].title = req.body["changeBlogValue"];
    blogs[toEdit].content = req.body["changeContentValue"];
    res.redirect("/");
});

app.post("/deletepost", (req, res) => {
    toEdit = req.body["delbutton"];
    blogs.splice(toEdit, 1);
    res.redirect("/");
});

app.post("/discard", (req,res) => {
    res.redirect("/");
});



app.listen("3000", () => {
    console.log(`listening at port 3000`);
});



