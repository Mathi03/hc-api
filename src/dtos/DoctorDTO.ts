export class DoctorDTO {
  firstName: string;
  lastName: string;
  specialty: string;
  phone?: string;
  email: string;
  workSchedule?: string;

  constructor(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.specialty = data.specialty;
    this.phone = data.phone;
    this.email = data.email;
    this.workSchedule = data.workSchedule;
  }

  validate() {
    const errors: string[] = [];

    if (!this.firstName) errors.push("First name is required.");
    if (!this.lastName) errors.push("Last name is required.");
    if (!this.specialty) errors.push("Specialty is required.");
    if (!this.email) errors.push("Email is required.");
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
