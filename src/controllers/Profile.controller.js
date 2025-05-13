import { getConnection } from "../config/db.js";

const getProfile = async (req, res) => {
  const { emp_id } = req.params;

  if (!emp_id) {
    return res.status(400).json({ message: "EMP_ID is required" });
  }

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM hr_employees WHERE EMP_ID = :emp_id`,
      { emp_id }
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getProfile;
