import express from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
  getResourcesByClassroomId,
} from "../controllers/Resource.js";

const router = express.Router();

// Create a new resource
router.post("/", createResource);

// Get all resources
router.get("/", getAllResources);

// Get a specific resource by ID
router.get("/:id", getResourceById);
router.get("/classroom/:classroom_id", getResourcesByClassroomId);

// Update a resource by ID
router.put("/:id", updateResource);

// Delete a resource by ID
router.delete("/:id", deleteResource);

export default router;
