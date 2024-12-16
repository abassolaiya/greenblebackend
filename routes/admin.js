const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createInputRate,
  getInputRates,
  updateInputRate,
  createBlog,
  getBlogs,
} = require("../controllers/adminController");
const router = express.Router();

// Input rates management
router.post("/input-rates", protect, admin, createInputRate);
router.get("/input-rates", protect, admin, getInputRates);
router.put("/input-rates", protect, admin, updateInputRate);
// router.put('/input-rates/:id', createInputRate)

// Blog management
router.post("/blogs", protect, admin, createBlog);
router.get("/blogs", getBlogs);

module.exports = router;
