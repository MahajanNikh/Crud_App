import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "User Data Not found" });
    }

    const savedData = await userData.save();
    res.status(200).json({ savedData, msg: "User Created Succesfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (e) {
    res.status(500).json({ e: e });
  }
};

// find one IMP *****

export const getOne = async (req, res) => {
  try {
    // const userData = await User.findById();
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json(userExist);
  } catch (e) {
    res.status(500).json({ e: e });
  }
};

// For updateing data

export const update = async (req, res) => {
  try {
    const id = req.params.id; // *** Imp
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }
    //IMP line below
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedData, msg: "User Updated Succesfully" });
  } catch (error) {
    res.status(500).json({ error: error });
    // res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExit = await User.findById(id);
    if (!userExit) {
      return res.status(401).json({ msg: "user not Exists" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
