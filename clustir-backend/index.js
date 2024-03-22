const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./Models/index");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

// Database connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  });

// Routes
app.use("/api/user", require("./Router/User"));

// Start the server
const PORT = 4001 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
