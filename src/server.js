require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("../src/router/routes");

const API_KEY = process.env.ACCESS_TOKEN;

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);
// app.get("/", (req, res) => {
//   res.json("ok");
// });
app.listen(PORT, () => console.log("Server is on 🚀 " + PORT));
