import { getConnection } from "../config/db.js";

const getProfile = async (req, res) => {
  const { emp_id } = req.params;

  if (!emp_id) {
    return res.status(400).json({ message: "EMP_ID is required" });
  }

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT e.*, 
              d1.VALUE_SET_DESCRIPTION AS DESIGNATION_NAME,
              d2.VALUE_SET_DESCRIPTION AS DEPARTMENT_NAME,
              d3.VALUE_SET_DESCRIPTION AS REGION_NAME
       FROM hr_employees e
       LEFT JOIN data_values d1
         ON e.DESIGNATION = d1.VALUE_SET_VALUE
        AND d1.VALUE_SET_ID = 52
       LEFT JOIN data_values d2
         ON e.DEPT_ID = d2.VALUE_SET_VALUE
        AND d2.VALUE_SET_ID = 169
        LEFT JOIN data_values d3
         ON e.REGION = d3.VALUE_SET_VALUE
        AND d3.VALUE_SET_ID = 170
       WHERE e.EMP_ID = :emp_id`,
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
