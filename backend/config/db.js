const mongoose = require("mongoose"); // Importing Mongoose for MongoDB object modeling

const uri = process.env.MONGO_URI; // Getting the MongoDB connection URI from environment variables
console.log(uri, "uri"); // Logging the URI for debugging purposes (consider removing in production)

mongoose
  .connect(uri) // Attempting to connect to MongoDB using the URI
  .then(() => {
    console.log("DataBase Connected..."); // Logging success message on successful connection
  })
  .catch((err) => {
    console.log("DataBase Connection Failed", err); // Logging error message on connection failure
  });

/*
1. mongoose.connect(uri, options)
This is a method used to establish a connection to your MongoDB database.

👉 Purpose:
Connects Mongoose to MongoDB.

You usually call this once when your app starts.

👉 Usage:
js
Copy
Edit
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("Connection error", err));
👉 What it returns:
A promise that resolves when the connection is successful.


✅ 2. mongoose.connection
This is a property — an instance of the connection that Mongoose manages.

👉 Purpose:
Gives you access to the connection object.

Lets you listen for events (connected, error, disconnected, etc.).

Useful for checking connection state, managing multiple connections, or manually handling connection events.

👉 Usage:
js
Copy
Edit
const db = mongoose.connection;

db.on("connected", () => console.log("Mongoose connected"));
db.on("error", (err) => console.log("Mongoose connection error", err));
db.on("disconnected", () => console.log("Mongoose disconnected"));
🚫 You do not use mongoose.connection() (with parentheses) — it's a property, not a function.

🔁 Summary Table
Feature	mongoose.connect()	mongoose.connection
What is it?	A method	A property (connection object)
Purpose	Establishes a new connection to MongoDB	Provides access to the existing connection
Usage style	Function call	Event listener / state access
Common use	Connect to DB at startup	Listen to events, check status
Returns	Promise	Connection object

✅ Example Using Both Together
js
Copy
Edit
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Connection error", err));

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Connection error from db object:", err);
});

db.on("connected", () => {
  console.log("Mongoose connection open");
});

db.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});
  */
