const Reference = require("../Models/reference.model");

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const refs = await Reference.find();

    const formatted = refs.map((r) => ({
      firstname: r.firstname,
      lastname: r.lastname,
      email: r.email,
      position: r.position,
      company: r.company,
      _id: r._id,
    }));

    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getById = async (req, res, next) => {
  try {
    const ref = await Reference.findById(req.params.id);
    if (!ref) return res.status(404).json({ success: false, message: "Reference not found." });

    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: {
        firstname: ref.firstname,
        lastname: ref.lastname,
        email: ref.email,
        position: ref.position,
        company: ref.company,
        _id: ref._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ADD
exports.add = async (req, res, next) => {
  try {
    const ref = await Reference.create(req.body);

    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: {
        firstname: ref.firstname,
        lastname: ref.lastname,
        email: ref.email,
        position: ref.position,
        company: ref.company,
        _id: ref._id,
      },
    });
  } catch (err) {
    console.log("Error creating reference:", err);
    next(err);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const updated = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Reference not found." });

    res.json({
      success: true,
      message: "Reference updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Reference not found." });

    res.json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};