//import express,axios and bodyparser modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//create an express application
const app = express();

//declaring a port to use for the server
const port = 3000;

//using the static public folder for styles and images
app.use(express.static("public"));

//using the bodyparser middleware to parse the body of the ejs and use it in the server side
app.use(bodyParser.urlencoded({ extended: false }));

//get and render the home route '/' and passing the result of the cheapshark api endpoint using axios framework
//into the index.ejs as a key value with the name content while also passing the returned value of the fulltime function
app.get("/", async (req, res) => {
  try {
    const response = await axios(
      "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20"
    );
    const result = response.data;
    res.render("index.ejs", { content: result, fulltime: fullTime });
    console.log("correct");
  } catch (error) {
    console.log(error.message.data);
  }
});

//using app.post to receive the discount price value from the front end (ejs) into the backend
//and store it into a const using the req.body bodyparser middleware so that the const can be used in axios to get the
//correct api endpoint
app.post("/filterPrice", async (req, res) => {
  const discount = req.body.discountPrice;

  try {
    const response = await axios(
      "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=" +
        discount
    );
    const priceFilterResult = response.data;
    res.render("index.ejs", { content: priceFilterResult, fulltime: fullTime });
    console.log("filter correct");
  } catch (error) {
    console.log(error.message.data);
  }
});

//listening to the declared server port using app.listen
app.listen(port, () => {
  console.log("Server listening the port :" + port);
});

//get the current full date using a function and returning the value
function fullTime() {
    const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  return (
    day +
    "/" +
    month +
    "/" +
    year +
    " | " +
    hour +
    ":" +
    minutes +
    ":" +
    seconds
  );
}
