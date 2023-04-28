// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express");
const app = express();

// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
const auth = require("./routes/Auth");
const users = require("./routes/Users");
const Categories = require("./routes/Categories");
const Medicines = require("./routes/Medicines");
const Requests = require("./routes/Requests");

// ====================  RUN THE APP  ====================
app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/Users",users);
app.use("/Categories",Categories);
app.use("/Medicines",Medicines);
app.use("/Requests",Requests);
