const Contact = require("../models/Contact");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    // Create a new contact submission
    const newContact = await Contact.create({
      name,
      email,
      phoneNumber,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form",
    });
  }
};

// Retrieve all submissions (optional, for admin)
exports.getContactSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error("Error retrieving submissions:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving submissions",
    });
  }
};
