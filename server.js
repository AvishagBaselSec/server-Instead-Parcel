const express = require("express");
const app = express();

app.use(express.static(__dirname + "/src"));

app.get("/", function (req, res) {
  res.sendFile("./index.html");
});
app.listen(1234, function () {
  console.log("Server is running on localhost1234");
});
