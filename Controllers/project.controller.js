const Project = require("../models/project.model");

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.find();

    const formatted = projects.map((p) => ({
      title: p.title,
      completion: p.completion,
      description: p.description,
      id: p._id,
    }));

    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });

    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: {
        title: project.title,
        completion: project.completion,
        description: project.description,
        id: project._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ADD
exports.add = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: {
        title: project.title,
        completion: project.completion,
        description: project.description,
        id: project._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Project not found." });

    res.json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Project not found." });

    res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};