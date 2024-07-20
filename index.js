import express from "express";
import bodyParser from "body-parser";
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
let blogs=[];
var toEdit=0;

app.get("/",(req,res)=>{ 
    var date=new Date();
    var year=date.getFullYear();
    res.render("index.ejs",{blogs,year});
});

app.post("/createNew",(req,res)=>{
    res.render("createpage.ejs");
});

app.post("/postbutton",(req,res)=>{
    var date=new Date(); 
    blogs.push({
                title : req.body["newtitle"],
                content : req.body["newcontent"],
                date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
                day: `${date.getHours()}:${date.getMinutes()}`
                });
    res.redirect("/"); 
});

app.post("/editpost",(req,res)=>{
    toEdit=req.body["editbutton"];
    res.render("changepostpage.ejs",{blogs,toEdit});    
});

app.post("/changepostbutton",(req,res)=>{
    blogs[toEdit].title=req.body["changeBlogValue"];
    blogs[toEdit].content=req.body["changeContentValue"];
    res.redirect("/");
});

app.post("/deletepost",(req,res)=>{
    toEdit=req.body["delbutton"];
    blogs.splice(toEdit,1);
    res.redirect("/");
});

app.listen("3000",()=>{
    console.log(`listening at port 3000`);
});


