import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world !");
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "Username is taken, try another name." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to database
    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // JWT token generation
    if (userDoc) {
      const token = jwt.sign(
        { id: userDoc._id }, // Payload
        process.env.JWT_SECRET, // Ensure this is defined in your .env
        { expiresIn: "7d" } // Options
      );

      // Send the token back to the client in a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res
        .status(201)
        .json({ user: userDoc, message: "User created successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userDoc.password); // Use compare instead of compareSync
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT token generation
    const token = jwt.sign(
      { id: userDoc._id }, // Payload
      process.env.JWT_SECRET, // Ensure this is defined in your .env
      { expiresIn: "7d" } // Options
    );

    // Send the token back to the client in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ user: userDoc, message: "Logged in successfully" });
  } catch (error) {
    console.log("Error Logging in: ", error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/fetch-user", async (req, res) => {
  const { token } = req.cookies;

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Find the user by ID and exclude the password from the response
    const userDoc = await User.findById(decoded.id).select("-password");

    // Check if the user was found
    if (!userDoc) {
      return res.status(404).json({ message: "No user found" });
    }

    // Send the user data in the response
    res.status(200).json({ user: userDoc });
  } catch (error) {
    console.log("Error in fetching user: ", error.message);
    return res.status(400).json({ message: error.message });
  }
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  connectToDB(); // Ensure DB connection before starting the server
  console.log(`Server is running on http://localhost:${PORT}`);
});
