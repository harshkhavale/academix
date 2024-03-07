import User from "../models/User.js";
export const updateUserIsTeacher = async (req, res) => {
  try {
    const { user_id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: user_id },
      { isTeacher: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
    console.log(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
