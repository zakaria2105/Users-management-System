const { sequelize, Department, User } = require("../models");
const user = require("../models/user");

const usersController = {};

usersController.create = async (req, res) => {
  const { id, name, email, password, departmentId } = req.body;
  try {
    const department = await Department.findOne({ where: id });
    const user = await User.create({
      name,
      email,
      password,
      departmentId: department.id,
    });
    return res.json(user);
    return res.json({ message: "row inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

usersController.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

usersController.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

usersController.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });
    await user.destroy();
    return res.json({ message: "row deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

usersController.update = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, departmentId } = req.body;
  try {
    const user = await User.findOne({ where: { id } });

    user.name = name;
    user.email = email;
    user.password = password;
    user.departmentId = departmentId;

    await user.save();

    return res.json({ message: "row updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

usersController.departmentUsers = async (req, res) => {
  const id = req.params.id;
  try {
    const departmentUsers = await User.findAll({ where: { departmentId: id } });
    return res.json({ departmentUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { usersController };
