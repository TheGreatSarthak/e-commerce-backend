import { createUser } from "../services/userServices.js";
import { getUserByEmail } from "../services/userServices.js";
import { generateToken } from "../config/jwtProvider.js";
import { compare } from "bcrypt";
import createCart from "../services/cartService.js";

const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const jwt = generateToken(user._id);

    await createCart(user);

    return res.status(200).send({ jwt, message: "Registration Successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with email : ", email });
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    const jwt = generateToken(user._id);
    return res.status(200).send({ jwt, message: "Login Successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default { register, login };
