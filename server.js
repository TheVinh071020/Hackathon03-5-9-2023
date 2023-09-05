const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

const userRoutes = require("./routes/users.routes")

server.use("/api/v1/users", userRoutes)

server.listen(3000, () => {
  console.log("Server is running on: http://localhost:3000");
});
