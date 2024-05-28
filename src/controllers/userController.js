import {
  getUserProfileByToken,
  getAllUsers as _getAllUsers,
} from "../services/userServices.js";

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1]; //Bearer token
    if (!jwt) {
      return res.status(404).send({ error: "Token not found!" });
    }
    const user = await getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await _getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default { getUserProfile, getAllUsers };
