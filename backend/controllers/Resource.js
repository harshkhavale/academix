import multer from "multer";
import path from "path";
import fs from "fs";
import Resource from "./models/Resource";

// Multer setup to save files to the 'resources' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "resources/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Create a new resource
export const createResource = async (req, res, next) => {
  try {
    const { name, type, description } = req.body;
    const { filename, path: filePath } = req.file;

    // Save resource details to database
    const newResource = await Resource.create({
      name,
      type,
      files: [{ filename, path: filePath }],
      description,
    });

    res.status(201).json(newResource);
  } catch (error) {
    next(error);
  }
};

// Read all resources
export const getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

// Read a specific resource by ID
export const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

// Update a resource by ID
export const updateResource = async (req, res, next) => {
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
    next(error);
  }
};

// Delete a resource by ID
export const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    // Remove the associated file from the server
    fs.unlinkSync(resource.files[0].path);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    next(error);
  }
};
