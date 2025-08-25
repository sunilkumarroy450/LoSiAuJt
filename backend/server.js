const express = require("express"); // Importing the Express framework
const app = express(); // Initializing an Express application
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const authRouter = require("./routes/index"); // Importing application routes

require("dotenv").config(); // Loading environment variables from .env file
require("./config/db"); // Establishing database connection
//should be called early in your server file to ensure database is connected before any route tries to use it.

app.use(bodyParser.json()); // Parsing incoming JSON requests
app.use(cors()); // Enabling CORS for all routes
app.use("/auth", authRouter); // Mounting auth routes under /auth

app.get("/test", (req, res) => {
  res.json("Ram Ram!!!");
}); // Test route to verify server is running

// LOCAL: only run listen if not in Vercel serverless
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app; // Starting the server and listening on the defined port

/*
1. What if you don't add body-parser?
body-parser is used to parse the body of incoming requests (especially JSON and form data).
Without it, req.body will be undefined in POST/PUT/PATCH requests unless you handle parsing some other way.

However:

Since Express v4.16.0, express.json() and express.urlencoded() are built-in, so technically:

✅ You can skip body-parser and just use:

app.use(express.json()); // replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // replaces bodyParser.urlencoded()


So unless you're using an older version of Express (pre-4.16), you don't need to install and use body-parser separately.


2. What if you don't add cors?
cors is needed only if your frontend and backend are on different origins (i.e., different domains, ports, or protocols). For example:

Frontend: http://localhost:3000

Backend: http://localhost:8080

In this case, if CORS is not enabled, the browser will block API requests due to the Same-Origin Policy, and you'll get a CORS error in the browser console.

So:

✅ If your frontend and backend are on the same origin, CORS is not needed.

❌ If they are on different origins, you must use cors() middleware, or the browser will block requests.


*/

/*
✅ Are These Connected?
No — they serve different purposes and are completely independent.

Here's the breakdown:

🔹 require("./config/db")
This establishes a connection to your MongoDB database using mongoose.connect().

It ensures your app can interact with the database (read/write data).

It should be called early in your server file to ensure database is connected before any route tries to use it.

🔹 app.use(...) lines
These lines are related to setting up Express middleware and routes:

Line	Purpose
app.use(bodyParser.json())	Parses incoming JSON request bodies (e.g., POST data).
app.use(cors())	Enables CORS so your frontend (e.g., running on a different port like 3000) can make requests to your backend.
app.use("/auth", authRouter)	Mounts your route handlers under /auth (e.g., /auth/login, /auth/register).

These do not initiate or depend directly on the database connection, but routes inside authRouter might access the database.

✅ Why They Still Work Together
Even though they're not connected directly, they are part of your app startup sequence. Here's how it flows:

require("./config/db") → Connects to MongoDB.

app.use(...) → Sets up middleware and routes.

app.listen(...) → Starts the server.

If the database isn’t connected and your route handlers depend on it, you could get runtime errors. That’s why it’s important to connect the DB before mounting routes.

✅ Suggested Comment for Clarity
js
Copy
Edit
require("./config/db"); // Establish MongoDB connection before setting up middleware and routes

app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use("/auth", authRouter); // Mount authentication routes at /auth
Let me know if you'd like to conditionally start the server only after the DB is connected (which is a good practice in production).
*/
