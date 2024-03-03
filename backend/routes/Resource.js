import express from "express";
import multer from "multer";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/Resource.js";

const router = express.Router();

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
router.post("/", upload.single("file"), createResource);

// Get all resources
router.get("/", getAllResources);

// Get a specific resource by ID
router.get("/:id", getResourceById);

// Update a resource by ID
router.put("/:id", updateResource);

// Delete a resource by ID
router.delete("/:id", deleteResource);

export default router;
