import pool from "../config/db";

class MedicalHistoryModel {
  async create(medicalHistory: any) {
    const query = `
      INSERT INTO medical_history (patient_id, date, diagnosis, treatment, exam_results)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      medicalHistory.patientId,
      medicalHistory.date,
      medicalHistory.diagnosis,
      medicalHistory.treatment,
      medicalHistory.examResults,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM medical_history");
    return result.rows;
  }

  async getById(id: number) {
    const result = await pool.query("SELECT * FROM medical_history WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(id: number, medicalHistory: any) {
    const query = `
      UPDATE medical_history SET patient_id=$1, date=$2, diagnosis=$3, treatment=$4, exam_results=$5
      WHERE id=$6 RETURNING *`;
    const values = [
      medicalHistory.patientId,
      medicalHistory.date,
      medicalHistory.diagnosis,
      medicalHistory.treatment,
      medicalHistory.examResults,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number) {
    await pool.query("DELETE FROM medical_history WHERE id = $1", [id]);
    return { message: "Medical history record deleted successfully" };
  }
}

export default new MedicalHistoryModel();
