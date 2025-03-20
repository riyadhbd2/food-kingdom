import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// login user
const loginUser = async (req, res) => {

};

// create token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn: "7d" });
}
// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking user exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email is not valid" });
    }

    if (!password || !email) {
        return res.json({ success: false, message: "Eamail and Password required" });
    }
    // strong password checking
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;

    //     ^	Start of the string.
    // (?=.*[a-z])	Ensures at least one lowercase letter (a-z).
    // (?=.*[A-Z])	Ensures at least one uppercase letter (A-Z).
    // (?=.*\d)	Ensures at least one digit (0-9).
    // (?=.*[@#$%^&*!])	Ensures at least one special character (@#$%^&*!).
    // [A-Za-z\d@#$%^&*!]{8,}	Ensures a minimum of 8 characters, only allowing letters (A-Z, a-z), numbers (0-9), and special characters (@#$%^&*!).
    // $	End of the string.

    if (!strongPasswordRegex.test(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (@#$%^&*!).",
      });
    }
    //   hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   create new user
    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    })
    // save user data in database
    const user = await newUser.save();
    // token generate
    const token = createToken(user._id);
    res.json({success: true, token})
  } catch (error) {
    console.error(error);
    res.json({success: false, message: "Error"})
  }
};

export { loginUser, registerUser };
