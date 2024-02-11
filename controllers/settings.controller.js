import Settings from "../models/settings.model.js";

export const updateSettings = async (req, res) => {
  try {
    await Settings.findByIdAndUpdate(req.body._id, req.body);
    await getSettings(req, res);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const getSettings = async (req, res) => {
  try {
    res.status(200).json(await Settings.findOne());
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};
