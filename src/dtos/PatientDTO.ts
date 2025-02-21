export class PatientDTO {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  address?: string;
  phone?: string;
  email: string;
  socialSecurityNumber?: string;

  constructor(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthDate = data.birthDate;
    this.gender = data.gender;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.socialSecurityNumber = data.socialSecurityNumber;
  }

  validate() {
    const errors: string[] = [];

    if (!this.firstName) errors.push("First name is required.");
    if (!this.lastName) errors.push("Last name is required.");
    if (!this.birthDate) errors.push("Birth date is required.");
    if (!this.gender) errors.push("Gender is required.");
    if (!this.email) errors.push("Email is required.");
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
