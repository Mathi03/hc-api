import pool from "../config/db";

class BillingModel {
  async create(billing: any) {
    const query = `
      INSERT INTO billing (patient_id, date, amount, payment_status, insurance)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      billing.patientId,
      billing.date,
      billing.amount,
      billing.paymentStatus,
      billing.insurance,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM billing");
    return result.rows;
  }

  async getById(id: number) {
    const result = await pool.query("SELECT * FROM billing WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(id: number, billing: any) {
    const query = `
      UPDATE billing SET patient_id=$1, date=$2, amount=$3, payment_status=$4, insurance=$5
      WHERE id=$6 RETURNING *`;
    const values = [
      billing.patientId,
      billing.date,
      billing.amount,
      billing.paymentStatus,
      billing.insurance,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM billing WHERE id = $1", [id]);
    return { message: "Billing record deleted successfully" };
  }
}

export default new BillingModel();
