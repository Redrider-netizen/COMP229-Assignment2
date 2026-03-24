const Service = require('../Models/service.model');

// Get All
exports.getAll = async (req, res, next) => {
  try {
    const services = await Service.find();

    const formatted = services.map(service => ({
      title: service.title,
      description: service.description,
      _id: service._id
    }));

    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

// Get By ID
exports.getById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: {
        title: service.title,
        description: service.description,
        _id: service._id
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add
exports.add = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: {
        title: service.title,
        description: service.description,
        _id: service._id
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update
exports.update = async (req, res, next) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Service updated successfully."
    });
  } catch (error) {
    next(error);
  }
};

// Delete
exports.remove = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Service deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};