const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 7000;
const cors = require("cors");
const fs = require("fs");
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var corsOptions = {
  origin: ["https://images.socializ.us", "http://localhost:19006"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/server-image/ajouter-image", (req, res) => {
  let filename = `${Date.now()}_${req.body.nom}`;
  let filePath = `/images/${filename}`;
  let buffer = Buffer.from(req.body.base64.split(",")[1], "base64");
  fs.writeFileSync(path.join(__dirname, filePath), buffer);
  res.status(200).send({
    link: `https://images.socializ.us/server-image/image/${filename}`,
  });
});

app.get("/server-image/image/:nom", (req, res) => {
  res.sendFile(path.join(__dirname, "./images", req.params.nom));
});
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});