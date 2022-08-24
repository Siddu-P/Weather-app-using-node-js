const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const { json } = require("express/lib/response");
const { query } = require("express");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
        })

app.post("/",function(req,res){
    
            const query=req.body.Cityname
            //const apikey="{api-key}";
            const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){  
            const weatherdata=JSON.parse(data)
            const temp=weatherdata.main.temp;
            const des=weatherdata.weather[0].description
            const icon=weatherdata.weather[0].icon
            const imageUrl="http://openweathermap.org/img/wn/"+ icon+"@2x.png"
            // console.log(temp)
            // console.log(des)
            res.write("<h1>description: "+des+"</h1>")
            res.write("<p>temp: "+temp+"</p>")
            res.write("<img src="+imageUrl+">")
            res.send()
        })
    })
})

app.listen(3000,function(){
    console.log("sserver started");
})