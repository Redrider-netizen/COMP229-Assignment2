const User = require("../../models/user.model");

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    const formatted = users.map((u) => ({
      firstname: u.firstname,
      lastname: u.lastname,
      email: u.email,
      password: u.password,
      created: u.created,
      updated: u.updated,
      id: u._id,
    }));

    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        created: user.created,
        updated: user.updated,
        id: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ADD
exports.add = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        created: user.created,
        updated: user.updated,
        id: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const body = { ...req.body, updated: Date.now() };

    const updated = await User.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "User not found." });

    res.json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.remove = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "User not found." });

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};