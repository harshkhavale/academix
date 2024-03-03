import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

// Multer setup to save thumbnail to the 'thumbnails' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/database/");
  },
  filename: function (req, file, cb) {
    // Extracting file extension
    const ext = path.extname(file.originalname);
    // Generating a unique filename based on current time and original extension
    const uniqueFilename = Date.now() + ext;
    // Storing the filename in the request object for later access
    req.generatedFilename = uniqueFilename;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage }).single("profile");

const register = async (req, res) => {
  console.log("Registering");
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      }
      const { fullname, email, password, isTeacher } = req.body;
      const profile = req.generatedFilename;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        profile,
        isTeacher,
      });
      const user = await newUser.save();
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "3d",
        }
      );
      console.log(user);
      const returnUser = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profile: user.profile,
        isTeacher: user.isTeacher,
        token: token,
      };
      res.status(201).json(returnUser);
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // If password is correct, generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "3d",
      }
    );

    // Send user information along with token in the response
    const returnUser = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      isTeacher: user.isTeacher,
      profile: user.profile,
      token: token,
    };
    res.status(200).json(returnUser);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { register, login, upload };
