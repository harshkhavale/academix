// controllers/Classroom.js
import Classroom from "../models/Classroom.js";
import multer from "multer";
import path from "path";

// Multer setup to save thumbnail to the 'thumbnails' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/thumbnails/");
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
const upload = multer({ storage: storage }).single("thumbnail");

// Create a new subject
export const createClassroom = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      }

      const { name, teacher_id, description, uuid } = req.body;
      const thumbnail = req.generatedFilename; // Using the generated filename
      const newClassroom = new Classroom({
        name,
        teacher_id,
        description,
        uuid,
        thumbnail,
      });
      const savedClassroom = await newClassroom.save();
      res.status(201).json(savedClassroom);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subjects
export const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate("resources enrolled");
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific subject by ID
export const getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate(
      "resources enrolled"
    );
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subject by ID
export const updateClassroom = async (req, res) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a subject by ID
export const deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    // Remove the associated thumbnail from the server
    fs.unlinkSync(classroom.thumbnail);
    res.json({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassroomsByTeacherId = async (req, res) => {
  try {
    const { teacher_id } = req.params;
    const classrooms = await Classroom.find({ teacher_id });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subjects by user enrollment
export const getClassroomsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const classrooms = await Classroom.find({ enrolled: user_id });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
