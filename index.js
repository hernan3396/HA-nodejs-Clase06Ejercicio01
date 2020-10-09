const mongoose = require("mongoose");

const express = require("express");
const app = express();
app.use(express.json());

const routes = require("./routes.js");
routes(app);

mongoose.connect("mongodb://localhost/Clase06", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => console.log(err));

mongoose.connection.once("open", () => {
  console.log("Servidor corriendo");
});

app.listen(3000);
