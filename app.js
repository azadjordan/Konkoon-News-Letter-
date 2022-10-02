const express = require("express")
const bp = require("body-parser")
const request = require("request")
const https = require("https")
const app = express()

app.use(bp.urlencoded({
  extended: true
}))
app.use(express.static("public"))


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);
  const url = "https://us12.admin.mailchimp.com/lists/6829fa7796";

  const data = {
    members:[{
      email_address:email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const options = {
    method: "POST",
    auth: "azadKey:973a5b8c8e27fb37b8fb0f86a62b6380-us12"
  };



const jsonData = JSON.stringify(data);


const request = https.request(url, options, function(response){
  response.on("data", function(req,res){
    console.log(JSON.parse(data));
  });

  request.write(jsonData)
  request.end();

});



})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})


//API KEY
// 973a5b8c8e27fb37b8fb0f86a62b6380-us12

//audience ID
// 6829fa7796
