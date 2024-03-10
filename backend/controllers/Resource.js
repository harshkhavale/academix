import Resource from "../models/Resource.js";
import multer from "multer";
import path from "path";

// Multer setup to save files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resources/");
  },
  filename: function (req, file, cb) {
    // Generating a unique filename based on current time and original extension
    const uniqueFilename = Date.now() + path.extname(file.originalname);
    // Storing the filename in the request object for later access
    req.generatedFilename = uniqueFilename;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage }).single("file");

// Create a new resource
export const createResource = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      } else if (err) {
        console.log("multer error: " + err.message);
        return res.status(500).json({ message: err.message });
      }

      const { name, type, classroom, description } = req.body;
      const file = req.generatedFilename; // Using the generated filename
      const newResource = new Resource({
        name,
        type,
        classroom,
        file,
        description,
      });

      const savedResource = await newResource.save();
      res.status(201).json(savedResource);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getResourcesByClassroomId = async (req, res) => {
  try {
    const { classroom_id } = req.params;
    const classrooms = await Resource.find({ classroom: classroom_id });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific resource by ID
export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a resource by ID
export const updateResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a resource by ID
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
