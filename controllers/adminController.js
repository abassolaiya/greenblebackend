const InputRates = require("../models/InputRates");
const Blog = require("../models/Blog");

// Create Input Rates
exports.createInputRate = async (req, res) => {
  const { service, rate, city } = req.body;

  try {
    // Check if the location already exists
    let inputRate = await InputRates.findOne({ location: city });

    if (inputRate) {
      // Update the specific service cost
      inputRate[service] = rate;
      await inputRate.save();
      res
        .status(200)
        .json({ message: "Service cost updated successfully", inputRate });
    } else {
      // Create a new entry if the location doesn't exist
      inputRate = await InputRates.create({
        location: city,
        [service]: rate, // Dynamically set the rate for the specified service
      });
      res
        .status(201)
        .json({ message: "Service cost created successfully", inputRate });
    }
  } catch (error) {
    console.error("Error creating/updating input rates:", error);
    res.status(500).json({ message: "Error creating or updating input rates" });
  }
};

// Update Input Rates
exports.updateInputRate = async (req, res) => {
  const { service, rate, city } = req.body;

  try {
    // Find the input rate by city
    let inputRate = await InputRates.findOne({ location: city });

    if (!inputRate) {
      return res.status(404).json({ message: "City not found" });
    }

    // Update the specific service cost
    inputRate[service] = rate;
    await inputRate.save();

    res
      .status(200)
      .json({ message: "Service cost updated successfully", inputRate });
  } catch (error) {
    console.error("Error updating input rates:", error);
    res.status(500).json({ message: "Error updating input rates" });
  }
};

// Get Input Rates
exports.getInputRates = async (req, res) => {
  try {
    const rates = await InputRates.find();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching input rates" });
  }
};

// Create Blog
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
};

// Get Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};
