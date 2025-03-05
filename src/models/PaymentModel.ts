import pool from "../config/db";

export class PaymentModel {
  static async getByPatient(patientId: number) {
    const { rows } = await pool.query(
      "SELECT * FROM payments WHERE patient_id = $1",
      [patientId],
    );
    return rows;
  }

  static async create(
    appointmentId: number,
    // patientId: number,
    amount: number,
    paymentMethod: string,
  ) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insertar pago
      const { rows } = await client.query(
        `INSERT INTO payments (appointment_id, patient_id, amount, payment_method, payment_status) 
         VALUES ($1, (SELECT patient_id FROM appointments WHERE id = $1 LIMIT 1), $2, $3, 'completed') RETURNING *`,
        [
          appointmentId,
          // patientId,
          amount,
          paymentMethod,
        ],
      );

      // Actualizar cita como pagada y completada
      await client.query(
        `UPDATE appointments SET is_paid = true, status = 'completed' WHERE id = $1`,
        [appointmentId],
      );

      await client.query("COMMIT");
      return rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM payments");
    return result.rows;
  }
}
