export class AppointmentDTO {
  patientId: number;
  doctorId: number;
  dateTime: string;
  status: "Pending" | "Confirmed" | "Canceled";

  constructor(data: any) {
    this.patientId = data.patientId;
    this.doctorId = data.doctorId;
    this.dateTime = data.dateTime;
    this.status = data.status;
  }

  validate() {
    const errors: string[] = [];

    if (!this.patientId) errors.push("Patient ID is required.");
    if (!this.doctorId) errors.push("Doctor ID is required.");
    if (!this.dateTime) errors.push("Date and time are required.");
    if (!this.status) errors.push("Status is required.");
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
