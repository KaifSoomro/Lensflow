import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in getProfile controller.",
      error: error.message,
    });
  }
};
