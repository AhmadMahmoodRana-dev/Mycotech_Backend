import oracledb from "oracledb";
import { getConnection } from "../config/db.js";

const InventoryItems = async (req, res) => {

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT ITEM_ID, ITEM_DESC, PART_NO, ITEM_PRICE, ITEM_TYPE FROM inv_items 
      `
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No Inventory found" });
    }

    // // Map rows with column names
    // const inventory = result.rows.map((row) => ({
    //   ITEM_ID: row[0],
    //   ITEM_DESC: row[1],
    //   PART_NO: row[2],
    //   ITEM_PRICE: row[3],
    //   ITEM_TYPE: row[4],
    // }));

    res.json({ inventory: result.rows });
  } catch (err) {
    console.error("Inventory fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default InventoryItems;
