import oracledb from "oracledb";
import { getConnection } from "../config/db.js";

const SingleTechnicianAllComplaints = async (req, res) => {
  const { emp_id } = req.params;

  if (!emp_id) {
    return res.status(400).json({ message: "EMP_ID is required" });
  }

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT * FROM crm_complaints 
       WHERE TECH_EMP_ID = :emp_id 
         AND UPPER(STATUS) NOT IN ('CLOSED', 'CANCELED','TRANSFERED')`,
      { emp_id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.json({ complaints: result.rows });
  } catch (err) {
    console.error("Complaint fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default SingleTechnicianAllComplaints;
