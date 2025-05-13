import jwt from "jsonwebtoken";
import "dotenv/config";
import { getConnection } from "../config/db.js";

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM sys_users WHERE USER_NAME = :username`,
      { username }
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const empId = await user?.EMP_ID;

    console.log("Fetched user:", user); // For debugging

    // Custom password validation logic (temporary logic based on your example)
    const isPasswordValid =
      (password === "1" && user.PWD === "2") || password === user.PWD;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        user_id: user.USER_ID,
        username: user.USER_NAME,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, empId });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Login;
