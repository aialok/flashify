const packServices = require("../services/pack.services");

const createPack = async (req, res) => {
  try {
    const pack = await packServices.createPack(req.body);
    return res.status(201).json({
      message: "Pack created successfully",
      success: true,
      data: pack,
    });
  } catch (error) {
    console.log(
      "There is an error in creating a pack : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updatePack = async (req, res) => {
  try {
    const pack = await packServices.updatePack(req.params.id, req.body);
    return res.status(200).json({
      message: "Pack updated successfully",
      success: true,
      data: pack,
    });
  } catch (error) {
    console.log(
      "There is an error in updating a pack : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deletePack = async (req, res) => {
  try {
    const pack = await packServices.deletePack(req.params.id);
    return res.status(200).json({
      message: "Pack deleted successfully",
      success: true,
      data: pack,
    });
  } catch (error) {
    console.log(
      "There is an error in deleting a pack : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllPacks = async (req, res) => {
  try {
    const packs = await packServices.getAllPacks();
    return res.status(200).json({
      message: "Packs fetched successfully",
      success: true,
      data: packs,
    });
  } catch (error) {
    console.log(
      "There is an error in fetching packs : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getPackById = async (req, res) => {
  try {
    const pack = await packServices.getPackById(req.params.id);
    return res.status(200).json({
      message: "Pack fetched successfully",
      success: true,
      data: pack,
    });
  } catch (error) {
    console.log("There is an error in fetching pack : controller layer", error); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createPack,
  updatePack,
  deletePack,
  getAllPacks,
  getPackById,
};
