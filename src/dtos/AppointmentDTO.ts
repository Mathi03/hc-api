export class AppointmentDTO {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  // status: "Pending" | "Confirmed" | "Canceled";
  startTime: string;
  endTime: string;

  constructor(data: any) {
    this.patientId = data.patientId;
    this.doctorId = data.doctorId;
    this.appointmentDate = data.appointmentDate;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
  }

  validate() {
    const errors: string[] = [];

    if (!this.patientId) errors.push("Patient ID is required.");
    if (!this.doctorId) errors.push("Doctor ID is required.");
    if (!this.appointmentDate) errors.push("Appointment date is required.");
    if (!this.startTime) errors.push("Start time is required.");
    if (!this.endTime) errors.push("End time is required.");
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
