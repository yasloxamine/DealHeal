//import express,axios and bodyparser modules
import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

//create an express application
const app = express();

//declaring a port to use for the server
const port = 3000;

app.use(express.static("public"));

//get and render the home route '/'
app.get("/",async (req,res)=>{
  
    try {
       const response = await axios("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20");
const result = response.data;
res.render("index.ejs",{content:result,fulltime:fullTime}); 
console.log("correct");
    } catch (error) {
        console.log(error.message.data);
    }

});

//listening to the declared server port using app.listen
app.listen(port,()=>{
console.log("Server listening the port :"+port);
});

//get the current full date using a function
function fullTime(){
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const hour = new Date().getHours(); 
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    return day+"/"+month+"/"+year+" | "+hour+":"+minutes+":"+seconds;
}







