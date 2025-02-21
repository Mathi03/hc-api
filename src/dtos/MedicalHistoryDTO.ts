export class MedicalHistoryDTO {
  patientId: number;
  date: string;
  diagnosis: string;
  treatment?: string;
  examResults?: string;

  constructor(data: any) {
    this.patientId = data.patientId;
    this.date = data.date;
    this.diagnosis = data.diagnosis;
    this.treatment = data.treatment;
    this.examResults = data.examResults;
  }

  validate() {
    const errors: string[] = [];

    if (!this.patientId) errors.push("Patient ID is required.");
    if (!this.date) errors.push("Date is required.");
    if (!this.diagnosis) errors.push("Diagnosis is required.");
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
