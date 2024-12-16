const express = require("express");
const router = express.Router();
const {
  submitContactForm,
  getContactSubmissions,
} = require("../controllers/contactController");

router.post("/", submitContactForm);

// (Optional) Route to retrieve all submissions
router.get("/", getContactSubmissions);

module.exports = router;
